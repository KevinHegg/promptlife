import { friendlyRequest } from '../data/story'
import type { RunSnapshot } from './runEngine'

/** A compact board: where the train is, one plain sentence, and what the model has written so far. */
export function DepartureBoard({ snap }: { snap: RunSnapshot | null }) {
  const trip = String(snap?.trip ?? 0).padStart(2, '0')
  const total = snap?.totalTrips ?? 0
  const writingTool = !!snap && !!snap.toolText && !snap.replyText && !snap.done
  const writingReply = !!snap && !!snap.replyText && !snap.done
  return (
    <div className="board">
      <div className="brow">
        <span>{snap?.station ?? 'P01 · SEND'}</span>
        <span>TRIP {trip} / {total}</span>
      </div>
      <div className={`bprog${snap?.playing ? ' running' : ''}`} aria-hidden="true">
        <span style={{ width: `${Math.round((snap?.progress ?? 0) * 100)}%` }} />
      </div>
      <p className="bcap" aria-live="polite">{snap?.caption}</p>
      {/* Always rendered, so the board keeps one height for the whole ride. */}
      <p className="bout">
        {snap?.replyText ? (
          <>
            <span className="blab">ANSWER</span>
            <span className={`rep${writingReply ? ' cursor' : ''}`}>{snap.replyText}</span>
          </>
        ) : snap?.toolText ? (
          <>
            <span className="blab">CALCULATOR REQUEST</span>
            <span className={`tool${writingTool ? ' cursor' : ''}`}>{friendlyRequest(snap.toolText)}</span>
          </>
        ) : (
          <span className="blab">THE ANSWER WILL APPEAR HERE</span>
        )}
      </p>
    </div>
  )
}
