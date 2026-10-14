import { PLACEHOLDER_ATTENTION, PLACEHOLDER_FLOORS, PLACEHOLDER_VOTE, type AttentionView, type FloorView, type VoteView } from './placeholders'

/**
 * The numbers each cutaway shows. Placeholders for now; once the trace pipeline writes
 * src/data/traces/hero-trace.json, an adapter here swaps in real values.
 */
export const cutawayData: { attention: AttentionView; floors: FloorView; vote: VoteView } = {
  attention: PLACEHOLDER_ATTENTION,
  floors: PLACEHOLDER_FLOORS,
  vote: PLACEHOLDER_VOTE
}
