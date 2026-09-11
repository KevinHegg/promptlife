import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { chapters, glossary, labNames } from "./content";
import type { Chapter, Section } from "./content";
import {
  emptyNotebook,
  mergeNotebook,
  parseNotebook,
  STORAGE_KEY,
} from "./storage";
import type { Notebook } from "./storage";
import "./book.css";

const Lab = lazy(() => import("./Labs"));
const chapterUrl = (id: string, section = "") =>
  `#/chapter/${id}${section ? `/${section}` : ""}`;
function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return { book: raw ? parseNotebook(raw) : emptyNotebook(), error: "" };
  } catch {
    return {
      book: emptyNotebook(),
      error:
        "Saved notebook could not be read. Export your current notes before leaving; browser storage may be unavailable.",
    };
  }
}
function download(filename: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

class AppBoundary extends React.Component<
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
        <p>
          Your saved notebook is kept separately. Check your connection and
          reload to try again.
        </p>
        <button className="primary" onClick={() => window.location.reload()}>
          Reload Prompt Life
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}

function App() {
  const [initial] = useState(loadSaved);
  const [book, setBook] = useState<Notebook>(initial.book);
  const [storageError, setStorageError] = useState(initial.error);
  const [hash, setHash] = useState(window.location.hash);
  const [notice, setNotice] = useState("");
  const [menu, setMenu] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const [search, setSearch] = useState("");
  const path = hash.replace(/^#\/?/, "").split("/");
  const page = path[0] || "chapter";
  const chapterId =
    path[1] ||
    (chapters.some((x) => x.id === book.lastChapter)
      ? book.lastChapter
      : "answer");
  const chapter = chapters.find((x) => x.id === chapterId);
  const index = chapters.findIndex((x) => x.id === chapterId);
  useEffect(() => {
    const change = () => {
      setHash(window.location.hash);
      setMenu(false);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    try {
      if (!initial.error) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(book));
        setStorageError("");
      }
    } catch {
      setStorageError(
        "These changes could not be saved on this device. Export your notebook to keep them.",
      );
    }
  }, [book, initial.error]);
  useEffect(() => {
    document.title =
      page === "chapter" && chapter
        ? `${chapter.title} · Prompt Life`
        : `${page === "notebook" ? "My notebook" : page === "reference" ? "Reference" : page === "experiments" ? "Experiments" : "The course"} · Prompt Life`;
    if (page === "chapter" && chapter)
      setBook((previous) =>
        previous.lastChapter === chapter.id
          ? previous
          : { ...previous, lastChapter: chapter.id },
      );
    const target =
      path[2] === "experiment"
        ? document.getElementById("chapter-experiment")
        : mainRef.current;
    target?.focus({ preventScroll: true });
    if (path[2] === "experiment") target?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [hash]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(timer);
  }, [notice]);
  function saveSnapshot(chapterId: string, title: string, text: string) {
    if (book.snapshots.length >= 200) {
      setNotice(
        "Notebook is full (200 observations). Existing observations are safe. Export a backup from My notebook.",
      );
      return;
    }
    setBook((previous) => ({
      ...previous,
      snapshots: [
        ...previous.snapshots,
        {
          id: crypto.randomUUID(),
          chapter: chapterId,
          title,
          text,
          date: new Date().toISOString(),
        },
      ],
    }));
    setNotice("Observation added to My notebook.");
  }
  function toggleBookmark(id: string) {
    setBook((previous) => ({
      ...previous,
      bookmarks: previous.bookmarks.includes(id)
        ? previous.bookmarks.filter((x) => x !== id)
        : [...previous.bookmarks, id],
    }));
  }
  async function importFile(file: File | undefined) {
    if (!file) return;
    try {
      if (file.size > 5_000_000)
        throw new Error("Choose a notebook smaller than 5 MB.");
      const incoming = parseNotebook(await file.text());
      setBook(mergeNotebook(book, incoming));
      setNotice("Notebook merged. Existing notes have been preserved.");
    } catch (e) {
      setNotice(
        e instanceof Error ? e.message : "Unable to import this notebook.",
      );
    }
  }
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
            { id: "course", label: "The course" },
            { id: "experiments", label: "Experiments" },
            { id: "reference", label: "Reference" },
            { id: "notebook", label: "My notebook" },
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
        <span className="edition">AN INTERACTIVE FIELD GUIDE</span>
      </header>
      <button
        className="mobile-contents"
        aria-expanded={menu}
        aria-controls="course-contents"
        onClick={() => setMenu(!menu)}
      >
        {menu ? "Close contents" : "Course contents"}{" "}
        <span>
          {page === "chapter" && chapter
            ? `${String(index + 1).padStart(2, "0")} / 08`
            : ""}
        </span>
      </button>
      <div className="book-layout">
        <aside
          id="course-contents"
          className={`contents ${menu ? "is-open" : ""}`}
        >
          <p className="eyebrow">UNDERSTANDING LANGUAGE MODELS</p>
          <h2>Inside the answer.</h2>
          <ol>
            {chapters.map((c, i) => (
              <li
                key={c.id}
                className={
                  page === "chapter" && c.id === chapterId ? "active" : ""
                }
              >
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
                  {book.read.includes(c.id) && (
                    <span
                      className="read-indicator"
                      aria-label="Marked as read"
                    >
                      {" "}
                      ✓
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ol>
          <div className="sidebar-note">
            No black boxes.
            <br />
            One idea at a time.
          </div>
          <p className="sidebar-progress">
            {chapters.filter((x) => book.read.includes(x.id)).length} of 8
            chapters marked as read
          </p>
          <a className="sidebar-resume" href={chapterUrl(book.lastChapter)}>
            Resume reading
          </a>
        </aside>
        <main id="main" ref={mainRef} tabIndex={-1}>
          {storageError && (
            <p className="storage-warning" role="alert">
              {storageError}
            </p>
          )}
          {page === "chapter" && chapter && (
            <ChapterView
              key={chapter.id}
              chapter={chapter}
              index={index}
              book={book}
              note={(text) =>
                setBook((previous) => ({
                  ...previous,
                  notes: { ...previous.notes, [chapter.id]: text },
                }))
              }
              bookmark={() => toggleBookmark(chapter.id)}
              markRead={() =>
                setBook((previous) => ({
                  ...previous,
                  read: previous.read.includes(chapter.id)
                    ? previous.read
                    : [...previous.read, chapter.id],
                }))
              }
              save={(title, text) => saveSnapshot(chapter.id, title, text)}
            />
          )}
          {page === "course" && (
            <>
              <div className="chapter-meta">
                <span>THE COURSE / EIGHT CONNECTED CHAPTERS</span>
                <span>START ANYWHERE. GO DEEPER.</span>
              </div>
              <h1>
                Understand the machine.
                <br />
                <em>Question the answer.</em>
              </h1>
              <p className="lede">
                A field guide for curious people. Read carefully, change
                something, and see what follows.
              </p>
              <div className="course-intro prose">
                <p>
                  Begin with the first chapter for a connected explanation, or
                  enter through a question you already have. Each chapter
                  includes an experiment, an optional deeper look, and a chance
                  to apply the idea to a new case. No programming or linear
                  algebra is assumed.
                </p>
                <p>
                  This edition focuses on text-generating transformers and the
                  applications built around them. Experiments identify their
                  simplifications. Nothing here calls a live model or requires
                  an account.
                </p>
              </div>
              <div className="button-row">
                <a className="primary" href={chapterUrl(book.lastChapter)}>
                  Continue reading
                </a>
                <a className="subtle" href={chapterUrl("answer")}>
                  Begin with chapter 1
                </a>
              </div>
              <div className="chapter-catalog">
                {chapters.map((c, i) => (
                  <a
                    className="chapter-link"
                    href={chapterUrl(c.id)}
                    key={c.id}
                  >
                    <span className="chapter-number">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h2>{c.title}</h2>
                      <p>{c.description}</p>
                      <span className="chapter-lab">
                        Experiment · {labNames[c.lab]}
                      </span>
                    </div>
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </>
          )}
          {page === "experiments" && (
            <>
              <div className="chapter-meta">
                <span>THE LABORATORY</span>
              </div>
              <h1>
                Change one thing.
                <br />
                <em>Follow the consequence.</em>
              </h1>
              <p className="lede">
                Each experiment belongs to a chapter. Open it in context, or
                return to explore a different setting.
              </p>
              <div className="experiment-catalog">
                {chapters.map((c, i) => (
                  <a
                    href={chapterUrl(c.id, "experiment")}
                    className="experiment-link"
                    key={c.id}
                  >
                    <span className="eyebrow">
                      {String(i + 1).padStart(2, "0")} / {c.title}
                    </span>
                    <h2>{labNames[c.lab]}</h2>
                    <p>
                      {c.question.replace(
                        /^(Predict: |Before you begin: )/,
                        "",
                      )}
                    </p>
                    <span className="chapter-lab">Open experiment ↗</span>
                  </a>
                ))}
              </div>
            </>
          )}
          {page === "reference" && (
            <>
              <div className="chapter-meta">
                <span>REFERENCE / {glossary.length} CONNECTED CONCEPTS</span>
              </div>
              <h1>
                A word for
                <br />
                <em>what is happening.</em>
              </h1>
              <p className="lede">
                Definitions are starting points. Follow a concept back to the
                explanation and experiment that give it meaning.
              </p>
              <label className="search-label" htmlFor="reference-search">
                Find a concept
              </label>
              <input
                id="reference-search"
                className="search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Try context, weight, or retrieval"
              />
              <dl className="glossary">
                {glossary
                  .filter((x) =>
                    `${x.term} ${x.definition}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
                  )
                  .map((x) => (
                    <div key={x.term}>
                      <dt>{x.term}</dt>
                      <dd>
                        {x.definition}
                        <a href={chapterUrl(x.chapter)}>
                          Explore in chapter{" "}
                          {chapters.findIndex((c) => c.id === x.chapter) + 1} ↗
                        </a>
                      </dd>
                    </div>
                  ))}
              </dl>
              {!glossary.some((x) =>
                `${x.term} ${x.definition}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              ) && <p>No matching concepts. Try a related word.</p>}
            </>
          )}
          {page === "notebook" && (
            <>
              <div className="chapter-meta">
                <span>YOUR WORKING NOTES</span>
                <span>SAVED ON THIS DEVICE</span>
              </div>
              <h1>
                Make the ideas
                <br />
                <em>your own.</em>
              </h1>
              <p className="lede">
                Keep explanations in your words and observations from your
                experiments.
              </p>
              <p className="notebook-notice">
                Notes stay in this browser. Export a backup to move between
                computers. Import merges notes and observations; it does not
                erase your existing work. Earlier Prompt Life progress remains
                separate.
              </p>
              <div className="button-row">
                <button
                  className="primary"
                  onClick={() =>
                    download(
                      "promptlife-notebook.json",
                      JSON.stringify(book, null, 2),
                      "application/json",
                    )
                  }
                >
                  Export notebook
                </button>
                <label className="subtle file-button">
                  Import notebook
                  <input
                    aria-label="Import notebook JSON"
                    type="file"
                    accept=".json,application/json"
                    onChange={(e) => {
                      void importFile(e.target.files?.[0]);
                      e.target.value = "";
                    }}
                  />
                </label>
                <button
                  className="subtle"
                  onClick={() =>
                    download(
                      "promptlife-notes.md",
                      `# My Prompt Life notebook\n\n${chapters
                        .filter((c) => book.notes[c.id])
                        .map((c) => `## ${c.title}\n\n${book.notes[c.id]}`)
                        .join(
                          "\n\n",
                        )}\n\n## Experiment observations\n\n${book.snapshots.map((s) => `### ${s.title}\n\n${s.text}`).join("\n\n")}`,
                      "text/markdown",
                    )
                  }
                >
                  Export readable notes
                </button>
              </div>
              <h2 className="section-heading">Bookmarked chapters</h2>
              {book.bookmarks.some((id) =>
                chapters.some((c) => c.id === id),
              ) ? (
                <div className="bookmark-list">
                  {chapters
                    .filter((c) => book.bookmarks.includes(c.id))
                    .map((c) => (
                      <a key={c.id} href={chapterUrl(c.id)}>
                        {c.title} ↗
                      </a>
                    ))}
                </div>
              ) : (
                <p className="empty-note">
                  Use “Bookmark chapter” while reading to keep a place here.
                </p>
              )}
              <h2 className="section-heading">Your explanations</h2>
              {chapters
                .filter((c) => book.notes[c.id]?.trim())
                .map((c) => (
                  <article className="notebook-card" key={c.id}>
                    <h3>
                      <a href={chapterUrl(c.id)}>{c.title}</a>
                    </h3>
                    <p className="note-text">{book.notes[c.id]}</p>
                  </article>
                ))}
              {!Object.values(book.notes).some((x) => x.trim()) && (
                <p className="empty-note">
                  Every chapter ends with a question for your notebook. Write an
                  explanation there and it will appear here.
                </p>
              )}
              <h2 className="section-heading">Experiment observations</h2>
              {book.snapshots
                .slice()
                .reverse()
                .map((s) => (
                  <article className="notebook-card" key={s.id}>
                    <span className="eyebrow">
                      {new Date(s.date).toLocaleDateString()}
                    </span>
                    <h3>{s.title}</h3>
                    <p className="note-text">{s.text}</p>
                    {chapters.some((c) => c.id === s.chapter) && (
                      <a href={chapterUrl(s.chapter, "experiment")}>
                        Revisit experiment ↗
                      </a>
                    )}
                  </article>
                ))}
              {!book.snapshots.length && (
                <p className="empty-note">
                  Choose “Save observation to notebook” in an experiment to keep
                  its settings and results here.
                </p>
              )}
            </>
          )}
          {(![
            "chapter",
            "course",
            "experiments",
            "reference",
            "notebook",
          ].includes(page) ||
            (page === "chapter" && !chapter)) && (
            <>
              <h1>
                That page is
                <br />
                <em>off the map.</em>
              </h1>
              <p>
                This chapter address does not exist. Your notes are still
                available.
              </p>
              <a className="primary" href="#/course">
                Open the course
              </a>
            </>
          )}
          <footer className="book-footer">
            <span>Prompt Life · An interactive field guide</span>
            <a href="https://github.com/KevinHegg/promptlife">
              Source & project
            </a>
            <span>Edition 1.0 · September 2026</span>
          </footer>
        </main>
      </div>
      <div
        className={`toast ${notice ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
    </>
  );
}

function ProseSection({ section }: { section: Section }) {
  return (
    <section className="prose">
      <h2>{section.title}</h2>
      {section.paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </section>
  );
}
function ChapterView({
  chapter: c,
  index,
  book,
  note,
  bookmark,
  markRead,
  save,
}: {
  chapter: Chapter;
  index: number;
  book: Notebook;
  note: (text: string) => void;
  bookmark: () => void;
  markRead: () => void;
  save: (title: string, text: string) => void;
}) {
  const [choice, setChoice] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const next = chapters[index + 1];
  const prev = chapters[index - 1];
  return (
    <>
      <div className="chapter-meta">
        <span>
          CHAPTER {String(index + 1).padStart(2, "0")} / {c.title.toUpperCase()}
        </span>
        <span>READ · EXPERIMENT · REFLECT</span>
      </div>
      <h1>
        {c.headline}
        <br />
        <em>{c.emphasis}</em>
      </h1>
      <p className="lede">{c.description}</p>
      <div className="chapter-actions">
        <button
          className="text-button"
          aria-pressed={book.bookmarks.includes(c.id)}
          onClick={bookmark}
        >
          {book.bookmarks.includes(c.id) ? "Bookmarked ✓" : "Bookmark chapter"}
        </button>
        <a href={chapterUrl(c.id, "experiment")}>Jump to the experiment</a>
        <a href="#/reference">Open reference</a>
      </div>
      <div className="chapter-rule" />
      <p className="opening-question">{c.question}</p>
      {c.before.map((s) => (
        <ProseSection section={s} key={s.title} />
      ))}
      <div id="chapter-experiment" tabIndex={-1}>
        <AppBoundary>
          <Suspense
            fallback={
              <p className="loading-lab" role="status">
                Preparing the experiment…
              </p>
            }
          >
            <Lab id={c.lab} save={save} />
          </Suspense>
        </AppBoundary>
      </div>
      {c.after.map((s) => (
        <ProseSection section={s} key={s.title} />
      ))}
      <details className="deeper">
        <summary>
          <span className="eyebrow">GO DEEPER</span>
          {c.deeper.title}
        </summary>
        <div className="prose">
          {c.deeper.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </details>
      <aside className="takeaway">
        <span className="eyebrow">TAKE THIS WITH YOU</span>
        <p>{c.takeaway}</p>
      </aside>
      <section className="transfer">
        <span className="eyebrow">TRY A NEW CASE</span>
        <h2>{c.challenge.question}</h2>
        <fieldset>
          <legend className="sr-only">Choose the best explanation</legend>
          {c.challenge.options.map((o, i) => (
            <label key={o.text}>
              <input
                type="radio"
                name={`challenge-${c.id}`}
                checked={choice === i}
                onChange={() => {
                  setChoice(i);
                  setShowAnswer(false);
                }}
              />
              <span>{o.text}</span>
            </label>
          ))}
        </fieldset>
        <button
          className="primary"
          disabled={choice === null}
          onClick={() => setShowAnswer(true)}
        >
          Check my reasoning
        </button>
        {showAnswer && choice !== null && (
          <div className="feedback" role="status">
            <strong>
              {c.challenge.options[choice].correct
                ? "That fits the evidence."
                : "Consider a different mechanism."}
            </strong>
            <p>{c.challenge.options[choice].feedback}</p>
          </div>
        )}
        <p className="lab-caption">
          Optional practice. You can continue reading regardless of your answer.
        </p>
      </section>
      <section className="reflection">
        <span className="eyebrow">IN YOUR WORDS</span>
        <h2>A note to your future self</h2>
        <label htmlFor="reflection">{c.reflection}</label>
        <textarea
          id="reflection"
          rows={5}
          maxLength={20000}
          value={book.notes[c.id] ?? ""}
          onChange={(e) => note(e.target.value)}
          placeholder="Start with what you understand. Keep the questions, too."
        />
        <p className="lab-caption">
          Saved on this device as you write. Export it from{" "}
          <a href="#/notebook">My notebook</a> to keep a backup.
        </p>
      </section>
      <section className="sources">
        <h2>Sources & further reading</h2>
        <p>
          Primary papers can be technical. Use them to examine the mechanisms
          and limits behind this chapter.
        </p>
        <ul>
          {c.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
      <div className="chapter-end">
        <button
          className="subtle"
          onClick={markRead}
          disabled={book.read.includes(c.id)}
        >
          {book.read.includes(c.id)
            ? "Marked as read ✓"
            : "Mark chapter as read"}
        </button>
        <p>Reading progress is a bookmark, not a measure of mastery.</p>
      </div>
      <nav className="chapter-navigation" aria-label="Chapter navigation">
        {prev ? (
          <a href={chapterUrl(prev.id)}>
            <small>PREVIOUS</small>
            {prev.title}
          </a>
        ) : (
          <a href="#/course">
            <small>EXPLORE</small>All chapters
          </a>
        )}
        {next ? (
          <a href={chapterUrl(next.id)}>
            <small>NEXT CHAPTER</small>
            {next.title} →
          </a>
        ) : (
          <a href="#/notebook">
            <small>KEEP EXPLORING</small>Return to your notebook →
          </a>
        )}
      </nav>
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <AppBoundary>
    <App />
  </AppBoundary>,
);
