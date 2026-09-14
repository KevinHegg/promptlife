import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { chapters, glossary } from "./content";
import { lessons } from "./lessons";
import { loadProgress, PROGRESS_KEY } from "./progress";
import "./guide.css";

const Simulation = lazy(() => import("./Simulation"));
const chapterUrl = (id: string, simulation = false) =>
  `#/chapter/${id}${simulation ? "/simulation" : ""}`;
const illustration = (id: string) =>
  `${import.meta.env.BASE_URL}illustrations/${id}.svg`;
const termUrl = (term: string) => `#/glossary/${encodeURIComponent(term)}`;
function decode(value = "") {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
class Boundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="error-page">
        <h1>This part could not load.</h1>
        <p>Reload the page to try again.</p>
        <button className="primary" onClick={() => location.reload()}>
          Reload
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
function Guide() {
  const [initial] = useState(() => {
    try {
      return loadProgress(localStorage);
    } catch {
      return {
        progress: { read: [], lastChapter: "landscape" },
        available: false,
      };
    }
  });
  const [progress, setProgress] = useState(initial.progress);
  const [storageError, setStorageError] = useState(!initial.available);
  const [hash, setHash] = useState(location.hash);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [letter, setLetter] = useState("");
  const mainRef = useRef<HTMLElement>(null);
  const path = hash.replace(/^#\/?/, "").split("/");
  const aliases: Record<string, string> = {
    reference: "glossary",
    experiments: "simulations",
    notebook: "course",
  };
  const page = aliases[path[0]] ?? (path[0] || "chapter");
  const chapterId =
    path[1] ||
    (chapters.some((c) => c.id === progress.lastChapter)
      ? progress.lastChapter
      : chapters[0].id);
  const chapter = chapters.find((c) => c.id === chapterId);
  const index = chapters.findIndex((c) => c.id === chapterId);
  useEffect(() => {
    const change = () => {
      setHash(location.hash);
      setMenu(false);
    };
    addEventListener("hashchange", change);
    return () => removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    if (!initial.available) return;
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [progress, initial.available]);
  useEffect(() => {
    document.title = `${page === "chapter" && chapter ? chapter.title : page === "glossary" ? "Glossary" : page === "simulations" ? "Simulations" : "The course"} · Prompt Life`;
    if (page === "chapter" && chapter)
      setProgress((p) =>
        p.lastChapter === chapter.id ? p : { ...p, lastChapter: chapter.id },
      );
    if (page === "glossary") {
      setSearch(decode(path[1]));
      setLetter("");
    }
    const isSimulation =
      page === "chapter" && ["simulation", "experiment"].includes(path[2]);
    const target = isSimulation
      ? document.getElementById("chapter-simulation")
      : mainRef.current;
    target?.focus({ preventScroll: true });
    if (isSimulation) target?.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
  }, [hash]);
  const results = [...glossary]
    .sort((a, b) => a.term.localeCompare(b.term))
    .filter(
      (t) =>
        (!letter || t.term.startsWith(letter)) &&
        `${t.term} ${t.definition}`
          .toLowerCase()
          .includes(search.trim().toLowerCase()),
    );
  const letters = [...new Set(glossary.map((t) => t.term[0]))].sort();
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
          mainRef.current?.scrollIntoView();
        }}
      >
        Skip to content
      </a>
      <header className="site-header">
        <a className="brand" href="#/course" aria-label="Prompt Life course">
          prompt<span>life</span>
          <span className="brand-mark" aria-hidden="true">
            ▥
          </span>
        </a>
        <nav aria-label="Main">
          {[
            { id: "course", label: "Learn" },
            { id: "simulations", label: "Simulations" },
            { id: "glossary", label: "Glossary" },
          ].map((item) => (
            <a
              key={item.id}
              href={`#/${item.id}`}
              aria-current={
                page === item.id || (item.id === "course" && page === "chapter")
                  ? "page"
                  : undefined
              }
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <button
        className="mobile-contents"
        aria-expanded={menu}
        aria-controls="course-contents"
        onClick={() => setMenu(!menu)}
      >
        {menu ? "Close chapters" : "Chapters"}
        <span>
          {page === "chapter" && chapter
            ? `${String(index + 1).padStart(2, "0")} / ${String(chapters.length).padStart(2, "0")}`
            : "Explore the course"}
        </span>
      </button>
      <div className="book-layout">
        <aside
          id="course-contents"
          className={`contents ${menu ? "is-open" : ""}`}
        >
          <p className="eyebrow">INSIDE THE ANSWER</p>
          <ol>
            {chapters.map((c, i) => (
              <li key={c.id}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <a
                  href={chapterUrl(c.id)}
                  aria-current={
                    page === "chapter" && c.id === chapterId
                      ? "page"
                      : undefined
                  }
                >
                  {c.title}
                  {progress.read.includes(c.id) && (
                    <span aria-label="Read"> ✓</span>
                  )}
                </a>
              </li>
            ))}
          </ol>
          <p className="reading-progress">
            {chapters.filter((c) => progress.read.includes(c.id)).length} of{" "}
            {chapters.length} chapters read
          </p>
        </aside>
        <main ref={mainRef} id="main" tabIndex={-1}>
          {storageError && (
            <p className="storage-warning" role="status">
              Reading progress could not be saved in this browser.
            </p>
          )}
          {page === "chapter" && chapter && (
            <>
              <p className="eyebrow">
                CHAPTER {String(index + 1).padStart(2, "0")}
              </p>
              <h1>{chapter.title}</h1>
              <a className="jump-link" href={chapterUrl(chapter.id, true)}>
                Walk through the simulation ↓
              </a>
              <div className="lesson-lead">
                <figure className="lesson-illustration">
                  <img
                    src={illustration(chapter.id)}
                    width="360"
                    height="228"
                    alt={lessons[chapter.id].caption}
                  />
                  <figcaption>{lessons[chapter.id].caption}</figcaption>
                </figure>
                <div>
                  <p className="lesson-intro">{lessons[chapter.id].intro}</p>
                  <nav
                    className="term-links"
                    aria-label="Terms in this chapter"
                  >
                    {lessons[chapter.id].terms.map((term) => (
                      <a key={term} href={termUrl(term)}>
                        {term} ↗
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div id="chapter-simulation" tabIndex={-1}>
                <Boundary key={chapter.id}>
                  <Suspense
                    fallback={
                      <div className="simulation loading" role="status">
                        Loading the simulation…
                      </div>
                    }
                  >
                    <Simulation key={chapter.id} chapter={chapter.id} />
                  </Suspense>
                </Boundary>
              </div>
              <aside className="takeaway">
                <span className="eyebrow">THE IDEA TO KEEP</span>
                <p>{chapter.takeaway}</p>
              </aside>
              {chapter.id === "landscape" && (
                <details className="reading-detail">
                  <summary>A short history of AI</summary>
                  <ol className="history-list">
                    <li>
                      <strong>1955–1956 · A field gets a name.</strong> The
                      Dartmouth proposal and workshop bring together questions
                      about learning, language, and reasoning.
                    </li>
                    <li>
                      <strong>1959 · Learning from experience.</strong> Arthur
                      Samuel’s checkers work demonstrates machine learning.{" "}
                      <a href="https://research.ibm.com/topics/machine-learning">
                        IBM’s history ↗
                      </a>
                    </li>
                    <li>
                      <strong>1986–2012 · Learning representations.</strong>{" "}
                      Backpropagation research and later GPU-powered image
                      classification help establish deep learning.{" "}
                      <a href="https://www.cs.toronto.edu/~hinton/backprop.html">
                        Backpropagation ↗
                      </a>{" "}
                      ·{" "}
                      <a href="https://www.cs.toronto.edu/~kriz/imagenet_classification_with_deep_convolutional.pdf">
                        AlexNet ↗
                      </a>
                    </li>
                    <li>
                      <strong>2013–2017 · New generative approaches.</strong>{" "}
                      VAEs, GANs, and the transformer open different paths to
                      modeling data.
                    </li>
                    <li>
                      <strong>2020–2026 · Diffusion expands.</strong> Image
                      diffusion, text diffusion, and Google’s experiments show
                      that generation can refine many positions together.
                    </li>
                  </ol>
                  <p>
                    Selected milestones, not a sequence of replacements. The
                    methods continue to coexist.
                  </p>
                </details>
              )}
              <details className="reading-detail">
                <summary>Read the fuller explanation</summary>
                {chapter.after.map((section) => (
                  <section key={section.title}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </section>
                ))}
                <section>
                  <h2>{chapter.deeper.title}</h2>
                  {chapter.deeper.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </section>
              </details>
              <details className="reading-detail">
                <summary>Sources & further reading</summary>
                <ul>
                  {chapter.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} target="_blank" rel="noreferrer">
                        {source.title} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
              <div className="chapter-end">
                <button
                  className="subtle"
                  disabled={progress.read.includes(chapter.id)}
                  onClick={() =>
                    setProgress((p) => ({
                      ...p,
                      read: [...new Set([...p.read, chapter.id])],
                    }))
                  }
                >
                  {progress.read.includes(chapter.id)
                    ? "Read ✓"
                    : "Mark as read"}
                </button>
                <span>Progress stays in this browser.</span>
              </div>
              <nav
                className="chapter-navigation"
                aria-label="Chapter navigation"
              >
                <a
                  href={
                    index > 0 ? chapterUrl(chapters[index - 1].id) : "#/course"
                  }
                >
                  <small>PREVIOUS</small>
                  {index > 0 ? chapters[index - 1].title : "All chapters"}
                </a>
                <a
                  href={
                    index < chapters.length - 1
                      ? chapterUrl(chapters[index + 1].id)
                      : "#/glossary"
                  }
                >
                  <small>
                    {index < chapters.length - 1
                      ? "NEXT CHAPTER"
                      : "KEEP EXPLORING"}
                  </small>
                  {index < chapters.length - 1
                    ? chapters[index + 1].title
                    : "Glossary"}{" "}
                  →
                </a>
              </nav>
            </>
          )}
          {(page === "course" || page === "simulations") && (
            <>
              <p className="eyebrow">{chapters.length} CONNECTED CHAPTERS</p>
              <h1>
                {page === "course"
                  ? "See how language models work."
                  : "One scene. One step at a time."}
              </h1>
              <p className="catalog-intro">
                {page === "course"
                  ? "Start with the big picture. Follow the illustrations, step through the simulations, and open the deeper explanations when you want more."
                  : "Follow each process with Back and Next. Every scene keeps the picture and explanation together."}
              </p>
              {page === "course" && (
                <div className="button-row">
                  <a
                    className="primary"
                    href={chapterUrl(
                      chapters.some((c) => c.id === progress.lastChapter)
                        ? progress.lastChapter
                        : chapters[0].id,
                    )}
                  >
                    Continue reading →
                  </a>
                  <a className="subtle" href={chapterUrl(chapters[0].id)}>
                    Start at chapter 1
                  </a>
                </div>
              )}
              <div className="chapter-catalog">
                {chapters.map((c, i) => (
                  <a
                    key={c.id}
                    className="chapter-card"
                    href={chapterUrl(c.id, page === "simulations")}
                  >
                    <img
                      src={illustration(c.id)}
                      width="360"
                      height="228"
                      loading="lazy"
                      alt=""
                    />
                    <div>
                      <span className="eyebrow">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2>{c.title}</h2>
                      <p>
                        {page === "course"
                          ? lessons[c.id].caption
                          : `${lessons[c.id].scenes.length} guided steps`}
                      </p>
                      <span className="card-action">
                        {page === "course"
                          ? "Open chapter"
                          : "Start simulation"}{" "}
                        →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
          {page === "glossary" && (
            <>
              <p className="eyebrow">WORDS USED IN THIS GUIDE</p>
              <h1>Glossary</h1>
              <p className="catalog-intro">
                Plain-language definitions, with a path back to the lesson.
              </p>
              <label className="search-label" htmlFor="glossary-search">
                Find a term
              </label>
              <input
                className="search"
                id="glossary-search"
                type="search"
                placeholder="Try token, diffusion, or attention"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setLetter("");
                }}
              />
              <nav className="alphabet" aria-label="Filter terms by letter">
                <button
                  aria-pressed={!letter}
                  onClick={() => {
                    setLetter("");
                    setSearch("");
                  }}
                >
                  All
                </button>
                {letters.map((l) => (
                  <button
                    key={l}
                    aria-pressed={letter === l}
                    onClick={() => {
                      setLetter(l);
                      setSearch("");
                    }}
                  >
                    {l}
                  </button>
                ))}
              </nav>
              <p className="result-count" role="status">
                {results.length} {results.length === 1 ? "term" : "terms"}
              </p>
              <dl className="glossary">
                {results.map((t) => (
                  <div key={t.term}>
                    <dt>{t.term}</dt>
                    <dd>
                      {t.definition}
                      <a href={chapterUrl(t.chapter)}>
                        See it in “
                        {chapters.find((c) => c.id === t.chapter)?.title}” →
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
              {!results.length && (
                <p>No matching terms. Try a shorter word or choose All.</p>
              )}
            </>
          )}
          {((page === "chapter" && !chapter) ||
            !["chapter", "course", "simulations", "glossary"].includes(
              page,
            )) && (
            <>
              <h1>This page is off the map.</h1>
              <a href="#/course">Open the course →</a>
            </>
          )}
          <footer className="book-footer">
            <span>Prompt Life · A visual field guide</span>
            <a href="https://github.com/KevinHegg/promptlife">
              Source & project
            </a>
          </footer>
        </main>
      </div>
    </>
  );
}
export default function App() {
  return (
    <Boundary>
      <Guide />
    </Boundary>
  );
}
