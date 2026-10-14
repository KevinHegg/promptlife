/**
 * A last line of defense for raw model text shown on screen (high-temperature samples, candidate
 * lists, free generations). Small models at high temperature can emit anything; the recorded
 * data is screened when it's generated, and anything that slips through is hidden here.
 */
const BLOCKED = [
  'fuck', 'shit', 'cunt', 'bitch', 'bastard', 'cock', 'dick', 'pussy', 'penis', 'vagina', 'masturbat', 'orgasm',
  'porn', 'nude', 'naked', 'boob', 'tits', 'anal', 'rape', 'whore', 'slut', 'nigg', 'fag', 'retard', 'kike', 'spic',
  'chink', 'tranny', 'kill yourself', 'suicide', 'nazi', 'hitler'
]

const pattern = new RegExp(BLOCKED.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'i')

/** Whole-word check for short words that are also parts of ordinary words (e.g. "anal" in "analysis"). */
const WHOLE_WORD = new Set(['anal', 'dick', 'cock', 'spic', 'nude', 'tits'])

export function isClean(text: string): boolean {
  const lower = text.toLowerCase()
  for (const w of BLOCKED) {
    if (!lower.includes(w)) continue
    if (WHOLE_WORD.has(w)) {
      if (new RegExp(`(^|[^a-z])${w}([^a-z]|$)`).test(lower)) return false
    } else return false
  }
  return true
}

export const blockedPattern = pattern
