import { PLACEHOLDER_ATTENTION, PLACEHOLDER_FLOORS, PLACEHOLDER_VOTE, type AttentionView, type FloorView, type VoteView } from './placeholders'
import { attentionViewsFromTrace, floorsFromTrace, trace, voteFromTrace } from './trace'

const heads = trace ? attentionViewsFromTrace(trace) : []

/** Real numbers from the recorded run when it exists; labeled placeholders otherwise. */
export const cutawayData: { attention: AttentionView[]; floors: FloorView; vote: VoteView } = {
  attention: heads.length ? heads : [PLACEHOLDER_ATTENTION],
  floors: (trace && floorsFromTrace(trace)) || PLACEHOLDER_FLOORS,
  vote: (trace && voteFromTrace(trace)) || PLACEHOLDER_VOTE
}
