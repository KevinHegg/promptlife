import { STATIONS } from '../data/network'
import { readStations } from '../lib/progress'
import { StampArt } from '../loop/StampArt'
import { LOOPS } from '../stations'
import { hrefFor } from '../lib/router'

/** The commuter pass: one stamp slot per station, and the receipt lines collected so far. */
export function Pass() {
  const progress = readStations()
  const stamped = STATIONS.filter((s) => progress[s.code]?.stampedAt)
  const receipts = stamped.map((s) => LOOPS[s.code]?.stamp.receipt).filter(Boolean)
  return (
    <section className="pass" aria-labelledby="pass-title">
      <div className="section-head">
        <h2 id="pass-title">Your pass</h2>
        <p className="muted">{stamped.length ? `${stamped.length} of ${STATIONS.length} stations stamped.` : 'Finish a station’s loop to earn its stamp.'}</p>
      </div>
      <ol className="pass-grid">
        {STATIONS.map((s) => {
          const at = progress[s.code]?.stampedAt
          const playable = !!LOOPS[s.code]
          return (
            <li key={s.code}>
              <a href={hrefFor(s.code)} className={`pass-slot${at ? ' earned' : ''}${playable ? '' : ' later'}`} aria-label={`${s.code} ${s.name}: ${at ? `stamped ${at}` : playable ? 'not stamped yet' : 'stamp opens later'}`}>
                {at ? <StampArt code={s.code} date={at} size={96} /> : <span className="slot-empty"><b>{s.code}</b>{playable ? 'open' : 'later'}</span>}
              </a>
            </li>
          )
        })}
      </ol>
      {receipts.length > 0 && (
        <div className="receipt-strip">
          <p className="kicker">Receipt so far</p>
          <ul>
            {receipts.map((r) => r && <li key={r.text}><span className="col">{r.column}</span>{r.text}</li>)}
          </ul>
        </div>
      )}
    </section>
  )
}
