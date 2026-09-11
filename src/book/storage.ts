export type Snapshot = {
  id: string;
  chapter: string;
  title: string;
  text: string;
  date: string;
};
export type Notebook = {
  version: 1;
  notes: Record<string, string>;
  bookmarks: string[];
  read: string[];
  lastChapter: string;
  snapshots: Snapshot[];
};
export const STORAGE_KEY = "promptlife:book:v1";
export const emptyNotebook = (): Notebook => ({
  version: 1,
  notes: {},
  bookmarks: [],
  read: [],
  lastChapter: "landscape",
  snapshots: [],
});
const plain = (v: unknown): v is Record<string, unknown> =>
  v !== null && typeof v === "object" && !Array.isArray(v);
export function parseNotebook(raw: string): Notebook {
  const v: unknown = JSON.parse(raw);
  if (
    !plain(v) ||
    v.version !== 1 ||
    !plain(v.notes) ||
    !Array.isArray(v.bookmarks) ||
    !Array.isArray(v.read) ||
    !Array.isArray(v.snapshots) ||
    typeof v.lastChapter !== "string"
  )
    throw new Error("This is not a supported Prompt Life notebook.");
  const ids = (a: unknown[]): string[] => {
    if (a.length > 100 || a.some((x) => typeof x !== "string" || x.length > 80))
      throw new Error("Invalid notebook chapter list.");
    return [...new Set(a as string[])];
  };
  const entries = Object.entries(v.notes);
  if (
    entries.length > 100 ||
    entries.some(
      ([key, value]) =>
        key.length > 80 || typeof value !== "string" || value.length > 20000,
    )
  )
    throw new Error("Invalid notebook notes.");
  if (
    v.snapshots.length > 200 ||
    v.snapshots.some(
      (x) =>
        !plain(x) ||
        ["id", "chapter", "title", "text", "date"].some(
          (k) => typeof x[k] !== "string",
        ) ||
        (x.text as string).length > 20000,
    )
  )
    throw new Error("Invalid experiment records.");
  return {
    version: 1,
    notes: Object.fromEntries(entries) as Record<string, string>,
    bookmarks: ids(v.bookmarks),
    read: ids(v.read),
    lastChapter: v.lastChapter,
    snapshots: v.snapshots as Snapshot[],
  };
}
export function mergeNotebook(current: Notebook, incoming: Notebook): Notebook {
  const notes = { ...current.notes };
  for (const [key, value] of Object.entries(incoming.notes))
    if (
      value &&
      notes[key] !== value &&
      !notes[key]?.includes(`— Imported note —\n${value}`)
    ) {
      notes[key] = notes[key]
        ? `${notes[key]}\n\n— Imported note —\n${value}`
        : value;
      if (notes[key].length > 20000)
        throw new Error(
          "A merged note would exceed 20,000 characters. No imported changes were applied.",
        );
    }
  const merged = {
    ...current,
    notes,
    bookmarks: [...new Set([...current.bookmarks, ...incoming.bookmarks])],
    read: [...new Set([...current.read, ...incoming.read])],
    snapshots: [
      ...new Map(
        [...incoming.snapshots, ...current.snapshots].map((x) => [x.id, x]),
      ).values(),
    ],
  };
  if (merged.snapshots.length > 200)
    throw new Error(
      "Merging would exceed 200 observations. No imported changes were applied.",
    );
  return merged;
}
