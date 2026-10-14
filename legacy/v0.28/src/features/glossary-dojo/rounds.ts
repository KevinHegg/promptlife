import type {
  GlossaryDojoRound,
  GlossaryDojoRoundMode,
  GlossaryDojoRoundSourceMode
} from './types'

export function fingerprintTargetTermIds(termIds: string[] = []) {
  return [...new Set(termIds.map(String).filter(Boolean))].sort().join('|')
}

export function modeFromSourceMode(sourceMode: GlossaryDojoRoundSourceMode): GlossaryDojoRoundMode {
  if (sourceMode === 'repeat_round') return 'repeat'
  if (sourceMode === 'review_missed') return 'reviewMissed'
  return 'normal'
}

export function sourceRoundIdFromRound(round: Pick<GlossaryDojoRound, 'sourceMode' | 'repeatedFromRoundId' | 'reviewFromRoundId'>) {
  return round.sourceMode === 'repeat_round'
    ? round.repeatedFromRoundId
    : round.sourceMode === 'review_missed'
      ? round.reviewFromRoundId
      : undefined
}

export function isNormalSourceMode(sourceMode?: GlossaryDojoRoundSourceMode) {
  return sourceMode === 'new_round'
}
