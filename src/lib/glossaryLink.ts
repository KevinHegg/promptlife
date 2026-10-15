import { GLOSSARY } from '../data/glossary'

const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[“”"‘’'()]/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const BY_NAME = new Map<string, string>()
for (const e of GLOSSARY) {
  BY_NAME.set(norm(e.term), e.id)
  BY_NAME.set(norm(e.id.replace(/-/g, ' ')), e.id)
  for (const a of e.aka ?? []) if (!BY_NAME.has(norm(a))) BY_NAME.set(norm(a), e.id)
}

/** The glossary entry for a term as a lesson writes it ("token ID" → token-id), if there is one. */
export function glossaryIdFor(term: string): string | undefined {
  const t = norm(term)
  return BY_NAME.get(t) ?? BY_NAME.get(t.replace(/s$/, ''))
}

export const glossaryHref = (id: string) => `#/glossary/${id}`

/** Does an entry match a search? Matches the name, other names and the one-line answer. */
export function matches(e: (typeof GLOSSARY)[number], query: string) {
  const q = norm(query)
  if (!q) return true
  return [e.term, ...(e.aka ?? []), e.short].some((s) => norm(s).includes(q))
}
