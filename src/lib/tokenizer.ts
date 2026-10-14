/** A real frontier tokenizer (o200k_base, used by GPT-4o-family models), loaded on demand. */
export type Piece = { id: number; text: string }

type Encoding = {
  encode: (text: string) => number[]
  decode: (ids: number[]) => string
}

let loading: Promise<Encoding> | null = null

export function loadTokenizer(): Promise<Encoding> {
  if (!loading) loading = import('gpt-tokenizer/encoding/o200k_base') as Promise<Encoding>
  return loading
}

export async function tokenize(text: string): Promise<Piece[]> {
  const enc = await loadTokenizer()
  return enc.encode(text).map((id) => ({ id, text: enc.decode([id]) }))
}

/** The "Break it" version: one piece per character. */
export function splitByCharacter(text: string): Piece[] {
  return Array.from(text).map((ch) => ({ id: ch.codePointAt(0) ?? 0, text: ch }))
}
