import type { RunSnapshot } from './runEngine'

export function DepartureBoard({ snap }: { snap: RunSnapshot | null }) {
  const trip = String(snap?.trip ?? 0).padStart(2, '0')
  const total = snap?.totalTrips ?? 0
  const writingTool = !!snap && snap.trip >= 1 && !snap.replyText && !snap.done
  const writingReply = !!snap && !!snap.replyText && snap.trip < total
  return (
    <div className="board">
      <div className="brow">
        <span>TRIP {trip} / {total}</span>
        <span>{snap?.station ?? 'P01 · SEND'}</span>
      </div>
      <p className="bcap" aria-live="polite">{snap?.caption}</p>
      <div className="bout">
        <span className="blab">MODEL WROTE</span>
        <span className={`tool${writingTool ? ' cursor' : ''}`}>{snap?.toolText || '—'}</span>
      </div>
      <div className="bout">
        <span className="blab">REPLY</span>
        <span className={`rep${writingReply ? ' cursor' : ''}`}>{snap?.replyText || '—'}</span>
      </div>
    </div>
  )
}
