#!/usr/bin/env python3
"""
Prompt Life trace pipeline, side line "Darkroom" -> src/data/traces/darkroom.json + public/darkroom/

D1 Image patches. A picture of Grandma's card (drawn here with Pillow in a handwriting font, the
   same words as the card on our ride) is shown to Qwen/Qwen2-VL-2B-Instruct, a small open
   vision-language model, at several widths. Its processor cuts the picture into 14x14-pixel
   patches and merges each 2x2 block into one token, so the token count follows the picture's
   size. At each width the model is asked to read the card and to answer the flour question;
   both answers are greedy. The text of the card, as text, is 72 tokens on our ride.

D2 Diffusion. A different kind of machine: stable-diffusion-v1-5 starts from pure noise and
   removes a little at each of STEPS steps (DDIM scheduler), steered by a text prompt. Every
   step's image is saved (the VAE decodes the current latents), so you can scrub the timeline.
   Runs: the prompt with seed 1, the same prompt with seed 2, and no text steering (empty prompt,
   guidance 1) with seed 1. Runs on Apple's GPU (mps) in float16.

Usage:
  ~/.cache/promptlife/trace-venv/bin/python scripts/trace/make_darkroom.py [--skip-vl] [--skip-sd]
"""

import argparse
import datetime as _dt
import json
import os
import sys
import time
import warnings

warnings.filterwarnings("ignore")

import torch  # noqa: E402
from PIL import Image, ImageDraw, ImageFont  # noqa: E402

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from screen import hits as screen_hits  # noqa: E402

VL_MODEL = "Qwen/Qwen2-VL-2B-Instruct"
SD_MODEL = "stable-diffusion-v1-5/stable-diffusion-v1-5"
WIDTHS = [1200, 600, 300, 150]
QUESTIONS = [("read", "Read this recipe card word for word."),
             ("flour", "How much flour does this recipe use, and how many people does it serve?")]
STEPS = 30
PROMPT = "a plate of buttermilk biscuits, black ink drawing on white paper"
SD_RUNS = [("prompt", PROMPT, 7.5, 1), ("prompt-seed2", PROMPT, 7.5, 2), ("no-steering", "", 1.0, 1)]
CARD_W, CARD_H = 1200, 560
FONT = "/System/Library/Fonts/Noteworthy.ttc"


def draw_card():
    img = Image.new("RGB", (CARD_W, CARD_H), (250, 244, 228))
    d = ImageDraw.Draw(img)
    for y in range(164, CARD_H - 20, 52):
        d.line([(30, y), (CARD_W - 30, y)], fill=(160, 190, 225), width=2)
    d.line([(30, 112), (CARD_W - 30, 112)], fill=(220, 120, 120), width=3)
    title = ImageFont.truetype(FONT, 54, index=1)
    hand = ImageFont.truetype(FONT, 42, index=0)
    ink = (40, 45, 90)
    d.text((60, 40), "Grandma's Buttermilk Biscuits", font=title, fill=ink)
    for i, t in enumerate(["Serves 8", "2 1/4 cups flour", "1 tablespoon baking powder", "1/2 teaspoon salt",
                           "6 tablespoons butter", "1 cup buttermilk"]):
        d.text((80, 110 + i * 52), t, font=hand, fill=ink)
    d.text((640, 110 + 4 * 52), "Two biscuits per person.", font=hand, fill=ink)
    d.text((640, 110 + 5 * 52), "Bake at 425°F, 12 minutes.", font=hand, fill=ink)
    return img


def record_vl(card, out_dir):
    from transformers import AutoProcessor, Qwen2VLForConditionalGeneration
    proc = AutoProcessor.from_pretrained(VL_MODEL)
    model = Qwen2VLForConditionalGeneration.from_pretrained(VL_MODEL, torch_dtype=torch.float32).eval()
    sizes = []
    for w in WIDTHS:
        h = round(CARD_H * w / CARD_W)
        im = card.resize((w, h), Image.LANCZOS)
        name = "card-%d.png" % w
        im.save(os.path.join(out_dir, name))
        rec = {"width": w, "height": h, "file": "darkroom/" + name, "answers": {}}
        for qid, q in QUESTIONS:
            msgs = [{"role": "user", "content": [{"type": "image"}, {"type": "text", "text": q}]}]
            text = proc.apply_chat_template(msgs, add_generation_prompt=True)
            inputs = proc(text=[text], images=[im], return_tensors="pt")
            grid = inputs["image_grid_thw"][0].tolist()
            rec["grid"] = {"t": grid[0], "h": grid[1], "w": grid[2]}
            rec["patches"] = grid[1] * grid[2]
            rec["tokens"] = int((inputs.input_ids == model.config.image_token_id).sum())
            rec["resizedTo"] = [grid[2] * 14, grid[1] * 14]
            with torch.no_grad():
                out = model.generate(**inputs, max_new_tokens=160, do_sample=False)
            ans = proc.batch_decode(out[:, inputs.input_ids.shape[1]:], skip_special_tokens=True)[0].strip()
            rec["answers"][qid] = {"text": ans, "flagged": bool(screen_hits(ans))}
            print("width %4d tokens %4d %-5s %r" % (w, rec["tokens"], qid, ans[:110]), flush=True)
        sizes.append(rec)
    return {"model": VL_MODEL, "patchSize": 14, "merge": 2, "questions": [{"id": a, "text": b} for a, b in QUESTIONS], "sizes": sizes}


def record_sd(out_dir):
    from diffusers import DDIMScheduler, StableDiffusionPipeline
    device = "mps" if torch.backends.mps.is_available() else "cpu"
    dtype = torch.float16 if device == "mps" else torch.float32
    pipe = StableDiffusionPipeline.from_pretrained(SD_MODEL, torch_dtype=dtype, variant="fp16" if dtype == torch.float16 else None,
                                                   safety_checker=None, requires_safety_checker=False)
    pipe.scheduler = DDIMScheduler.from_config(pipe.scheduler.config)
    pipe = pipe.to(device)
    pipe.set_progress_bar_config(disable=True)
    sf = pipe.vae.config.scaling_factor

    def decode(lat):
        with torch.no_grad():
            img = pipe.vae.decode(lat / sf).sample
        img = (img / 2 + 0.5).clamp(0, 1)[0].permute(1, 2, 0).float().cpu().numpy()
        return Image.fromarray((img * 255).round().astype("uint8")).resize((256, 256), Image.LANCZOS)

    runs = []
    for rid, prompt, guidance, seed in SD_RUNS:
        d = os.path.join(out_dir, "diffusion", rid)
        os.makedirs(d, exist_ok=True)
        gen = torch.Generator("cpu").manual_seed(seed)
        latents = torch.randn((1, 4, 64, 64), generator=gen, dtype=torch.float32).to(device, dtype)
        frames = []
        decode(latents * pipe.scheduler.init_noise_sigma).save(os.path.join(d, "00.jpg"), quality=82)
        frames.append("darkroom/diffusion/%s/00.jpg" % rid)

        def on_step(p, i, t, kw):
            name = "%02d.jpg" % (i + 1)
            decode(kw["latents"]).save(os.path.join(d, name), quality=82)
            frames.append("darkroom/diffusion/%s/%s" % (rid, name))
            return kw

        t0 = time.time()
        pipe(prompt, num_inference_steps=STEPS, guidance_scale=guidance, latents=latents,
             callback_on_step_end=on_step, callback_on_step_end_tensor_inputs=["latents"])
        print("diffusion %-13s seed %d guidance %.1f: %d frames in %.0fs" % (rid, seed, guidance, len(frames), time.time() - t0), flush=True)
        runs.append({"id": rid, "prompt": prompt, "guidance": guidance, "seed": seed, "frames": frames})
    return {"model": SD_MODEL, "scheduler": "DDIM", "steps": STEPS, "size": 512, "frameSize": 256, "device": device, "runs": runs}


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--skip-vl", action="store_true")
    ap.add_argument("--skip-sd", action="store_true")
    args = ap.parse_args()
    repo = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    out_dir = os.path.join(repo, "public", "darkroom")
    json_path = os.path.join(repo, "src", "data", "traces", "darkroom.json")
    os.makedirs(out_dir, exist_ok=True)
    prev = json.load(open(json_path)) if os.path.exists(json_path) else {}
    card = draw_card()
    card.save(os.path.join(out_dir, "card.png"))
    out = {
        "version": 1,
        "generatedAt": _dt.datetime.now(_dt.timezone.utc).replace(microsecond=0).isoformat(),
        "card": {"file": "darkroom/card.png", "width": CARD_W, "height": CARD_H},
        "patches": prev.get("patches") if args.skip_vl else record_vl(card, out_dir),
        "diffusion": prev.get("diffusion") if args.skip_sd else record_sd(out_dir),
        "notes": [
            "patches: the card image is drawn by this script (Pillow, Noteworthy font) and resized with Lanczos to each width; "
            "the Qwen2-VL processor then resizes to a multiple of 28 pixels (resizedTo) and cuts 14x14 patches, merging 2x2 "
            "into one token (tokens = image placeholder tokens in the prompt). Answers: greedy, max 160 new tokens, CPU float32.",
            "diffusion: %s, DDIM, %d steps, 512x512, frames downscaled to 256x256 JPEG. Frame 00 is the starting noise; frame k "
            "is the VAE decoding of the latents after step k. Seeds from torch.Generator('cpu')." % (SD_MODEL, STEPS),
        ],
    }
    with open(json_path, "w") as f:
        json.dump(out, f, indent=1, ensure_ascii=False)
        f.write("\n")
    print("wrote", json_path)


if __name__ == "__main__":
    main()
