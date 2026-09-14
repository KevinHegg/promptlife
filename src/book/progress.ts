export type Progress = { read: string[]; lastChapter: string };
export const PROGRESS_KEY = "promptlife:progress:v1";
export function parseProgress(raw: string): Progress {
  const value = JSON.parse(raw);
  if (
    !value ||
    !Array.isArray(value.read) ||
    value.read.length > 100 ||
    value.read.some(
      (id: unknown) => typeof id !== "string" || id.length > 80,
    ) ||
    typeof value.lastChapter !== "string" ||
    value.lastChapter.length > 80
  )
    throw new Error("Invalid progress data");
  return {
    read: [...new Set(value.read)] as string[],
    lastChapter: value.lastChapter,
  };
}
export function loadProgress(storage: Pick<Storage, "getItem">) {
  try {
    const saved = storage.getItem(PROGRESS_KEY);
    if (saved) return { progress: parseProgress(saved), available: true };
    return {
      progress: { read: [], lastChapter: "landscape" },
      available: true,
    };
  } catch {
    return {
      progress: { read: [], lastChapter: "landscape" },
      available: false,
    };
  }
}
