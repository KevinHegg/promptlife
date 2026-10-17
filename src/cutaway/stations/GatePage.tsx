import { useState, type ReactNode } from 'react'
import { gatehouse, heistRuns, type PageBlock, type Who } from '../../data/gatehouse'
import { tick, yes } from '../../lib/sound'
import { Howto } from '../../ui/Howto'
import { Dial } from '../../stations/parts'

export const WHO_LABEL: Record<Who, string> = { you: 'You', app: 'The app', makers: 'The model’s makers' }

/** One line on each part of the page, keyed by the recording's block names. */
const ABOUT: Record<string, string> = {
  'Marker: hidden instructions start': 'A label from the model’s makers: what follows is the app’s instructions.',
  'The app’s hidden instructions': 'The app’s hidden instructions, its system prompt. Real apps often write pages of these.',
  'The app’s label for your upload': 'The app’s heading for what it pasted in from your upload.',
  'The card you uploaded': 'Grandma’s card, from your upload. The app found it and pasted it here.',
  'How to call a tool (from the model’s makers)': 'The model’s makers wrote this: how to ask for a tool.',
  'The calculator’s description': 'The app describes its calculator, in a format the model was trained to read.',
  'How to call a tool, continued': 'More from the makers: the exact format for a tool request.',
  'Markers: instructions end, your turn starts': 'Labels: the instructions end, and your turn starts.',
  'Your question': 'Your question: the only part you typed.',
  'Markers: your turn ends, the reply starts': 'Labels: your turn ends, and the reply starts right here.'
}

/** The recording's block names use straight apostrophes; the app's copy uses curly ones. */
const curl = (s: string) => s.replace(/'/g, '’')

const sumBy = (blocks: PageBlock[], who: Who) => blocks.filter((b) => b.who === who).reduce((a, b) => a + b.tokens, 0)

/** Arrive: the page the model read, as one bar split by who wrote each part. */
export function AuthorBar() {
  const page = gatehouse?.page
  if (!page) return null
  return (
    <figure className="author-fig">
      <div className="author-bar" role="img" aria-label={`Of ${page.total} tokens: you ${sumBy(page.blocks, 'you')}, the app ${sumBy(page.blocks, 'app')}, the model’s makers ${sumBy(page.blocks, 'makers')}.`}>
        {page.blocks.map((b, i) => (
          <span key={i} className={`ab ab-${b.who}`} style={{ flexGrow: b.tokens }} />
        ))}
      </div>
      <figcaption className="author-key">
        {(['you', 'app', 'makers'] as Who[]).map((w) => (
          <span key={w}><i className={`ab ab-${w}`} aria-hidden="true" />{WHO_LABEL[w]}: {sumBy(page.blocks, w)}</span>
        ))}
        <span className="muted">tokens, of {page.total}</span>
      </figcaption>
    </figure>
  )
}

/** Try it: the whole page the model read before answering. Tap each part to see who wrote it. */
export function HiddenPage() {
  const page = gatehouse?.page
  const [shown, setShown] = useState<Set<number>>(new Set())
  if (!page) return <p className="muted">The hidden page arrives with the next trace run.</p>
  const all = shown.size === page.blocks.length
  const reveal = (i: number) => {
    if (shown.has(i)) return
    if (shown.size + 1 === page.blocks.length) yes()
    else tick()
    setShown((s) => new Set(s).add(i))
  }
  const seen = page.blocks.filter((_b, i) => shown.has(i))
  return (
    <div className="hidden-page">
      <Howto>Tap each part of the page to see who wrote it.</Howto>
      <div className="author-tally" aria-live="polite">
        {(['you', 'app', 'makers'] as Who[]).map((w) => (
          <span key={w} className={`at at-${w}`}><b>{sumBy(seen, w)}</b> {WHO_LABEL[w]}</span>
        ))}
        <span className="muted small">tokens found, of {page.total}</span>
      </div>
      <ol className="page-blocks">
        {page.blocks.map((b, i) => {
          const on = shown.has(i)
          return (
            <li key={i}>
              <button type="button" className={`page-block${on ? ` on who-${b.who}` : ''}`} aria-expanded={on} onClick={() => reveal(i)}>
                <span className="pb-text">{b.text.replace(/^\n+|\n+$/g, '')}</span>
                {on && (
                  <span className="pb-tag">
                    <b>{WHO_LABEL[b.who]}</b> · {b.tokens} tokens. {ABOUT[curl(b.what)] ?? curl(b.what)}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ol>
      {all ? (
        <p className="reveal">
          <b>You typed {sumBy(page.blocks, 'you') - (page.blocks.find((b) => b.what === 'The card you uploaded')?.tokens ?? 0)} of the {page.total} tokens</b>, and your upload added {page.blocks.find((b) => b.what === 'The card you uploaded')?.tokens ?? 0} more. The other {page.total - sumBy(page.blocks, 'you')} came from the app and the model’s makers, and you never saw them. To the model it’s all one page.
        </p>
      ) : (
        <button type="button" className="link-btn" onClick={() => setShown(new Set(page.blocks.map((_b, i) => i)))}>Show who wrote everything</button>
      )}
    </div>
  )
}

/** Break it: steal Pantry Bot's secret. Pick a defense; every attack ran 10 times against it. */
export function Heist({ verdicts, takeaway }: { verdicts: Record<string, ReactNode>; takeaway: ReactNode }) {
  const H = gatehouse?.heist
  const [def, setDef] = useState(H?.defenses[0]?.id ?? 'plain')
  const [open, setOpen] = useState<string | null>(null)
  const [tried, setTried] = useState(false)
  if (!H) return <p className="muted">The recorded attacks arrive with the next trace run.</p>
  const d = H.defenses.find((x) => x.id === def) ?? H.defenses[0]
  const first = d.id === H.defenses[0].id
  const rows = H.attacks.map((a) => {
    const runs = heistRuns(d.id, a.id)
    const leaks = runs.filter((r) => r.leaked)
    const pool = (leaks.length ? leaks : runs).filter((r) => r.text)
    const sample = [...pool].sort((x, y) => Number(y.stoppedNaturally) - Number(x.stoppedNaturally) || x.text.length - y.text.length)[0]
    return { a, n: runs.length, leaked: leaks.length, sample }
  })
  const total = rows.reduce((s, r) => s + r.leaked, 0)
  const runsTotal = rows.reduce((s, r) => s + r.n, 0)
  return (
    <div className="break-body">
      <Howto>Pick a defense, then tap an attack to read one of its replies.</Howto>
      <Dial<string>
        stops={H.defenses.map((x) => x.id)}
        value={d.id}
        onChange={(v) => {
          setDef(v)
          if (v !== H.defenses[0].id) setTried(true)
        }}
        label="Defense"
        format={(v) => H.defenses.find((x) => x.id === v)?.label ?? v}
      />
      <div className={`sabotage-what${first ? '' : ' on'}`}>
        <p className="kicker">Pantry Bot’s hidden instructions</p>
        <p className="heist-system">“{d.system}”</p>
      </div>
      <div className="break-result">
        <div className="break-tiles">
          <div className="break-tile">
            <span className="kicker">Gave the secret away</span>
            <b>{total} of {runsTotal}</b>
            <small>replies, across all five attacks</small>
          </div>
        </div>
        <ul className="heist-rows">
          {rows.map(({ a, n, leaked, sample }) => (
            <li key={a.id}>
              <button type="button" className="heist-row" aria-expanded={open === a.id} onClick={() => { setOpen(open === a.id ? null : a.id); tick() }}>
                <span className="hr-label">{a.label}</span>
                <span className="hr-bar"><span style={{ width: `${(leaked / Math.max(1, n)) * 100}%` }} /></span>
                <span className="hr-n">{leaked} of {n}</span>
              </button>
              {open === a.id && (
                <div className="heist-detail">
                  <p className="muted small">{a.id === 'planted' ? <>The user only asks the flour question. Hidden in the card: “{H.plantedNote}”</> : <>The ask: “{a.text}”</>}</p>
                  {sample && (
                    <blockquote className={sample.leaked ? 'leaked' : ''}>
                      {sample.text}{sample.stoppedNaturally ? '' : ' …'}
                    </blockquote>
                  )}
                  <p className="muted small">{sample?.leaked ? 'One of the replies that gave it away.' : leaked ? '' : `None of its ${n} replies gave it away. Here’s one.`}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
        <p className="break-stat">{verdicts[d.id]}</p>
        <p className="muted small">Each attack was run 10 times, drawing tokens the way the model normally does, so replies vary.</p>
      </div>
      {tried && <div className="break-why">{takeaway}</div>}
    </div>
  )
}
