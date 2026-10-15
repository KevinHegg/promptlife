import { useEffect, useRef, useState } from 'react'
import { HERO_TOKENS, SCENARIO, USER_IDS } from '../../data/heroRun'
import type { Station } from '../../data/network'
import { tokenize, type Piece } from '../../lib/tokenizer'
import { TokenText } from '../../ui/TokenText'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

const EXAMPLES = [' strawberry', 'strawberry', 'Strawberry', 'buttermilk', '¿Cuánta harina necesito?', 'naïve café 🚇']
const HERO_PIECES: Piece[] = HERO_TOKENS.user.map((text, i) => ({ text, id: USER_IDS[i] }))
/** About one sentence. Our recipe question is 79 characters. */
const MAX_CHARS = 100

export function TokenizerLevels({ station }: { station: Station }) {
  const [text, setText] = useState(SCENARIO.user)
  const [pieces, setPieces] = useState<Piece[]>(HERO_PIECES)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    let alive = true
    tokenize(text)
      .then((p) => alive && setPieces(p))
      .catch(() => alive && setError('The tokenizer did not load. Check your connection and reload.'))
    return () => {
      alive = false
    }
  }, [text])

  const chars = Array.from(text).length
  const ratio = pieces.length ? (chars / pieces.length).toFixed(1) : '0'

  return (
    <Cutaway
      stationName={station.name}
      size="tall"
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText level={2} title="A real tokenizer">
            <p>Each token gets its ID number.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <label className="visually-hidden" htmlFor="tok-input">Text to tokenize, up to {MAX_CHARS} characters</label>
              <div className="tok-field">
                <input
                  id="tok-input"
                  ref={inputRef}
                  className="tok-input"
                  value={text}
                  maxLength={MAX_CHARS}
                  placeholder="Type a sentence"
                  onChange={(e) => setText(e.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                />
                {text && (
                  <button
                    type="button"
                    className="tok-clear"
                    onClick={() => {
                      setText('')
                      inputRef.current?.focus()
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="v-examples" role="group" aria-label="Examples">
                <button type="button" className="chip-btn" onClick={() => setText(SCENARIO.user)}>our question</button>
                {EXAMPLES.map((ex) => (
                  <button key={ex} type="button" className="chip-btn" onClick={() => setText(ex)}>
                    <TokenText text={ex} />
                  </button>
                ))}
              </div>
              <div className="v-chips" aria-live="polite">
                {pieces.slice(0, 72).map((p, i) => (
                  <span key={`${i}-${p.id}`} className="v-chip">
                    <b className={p.id === 28420 ? 'hot' : ''}><TokenText text={p.text} /></b>
                    <small>{p.id}</small>
                  </span>
                ))}
                {pieces.length > 72 && <span className="v-cap">+{pieces.length - 72} more</span>}
              </div>
              <p className="v-count">
                {chars}/{MAX_CHARS} characters → <b>{pieces.length}</b> tokens
              </p>
              {error && <p className="v-cap">{error}</p>}
            </div>
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="Byte-pair encoding">
            <p>The vocabulary is built once, before training. Start from single bytes, then keep merging the most common neighboring pair in a huge sample of text. After that, splitting text is a fixed lookup.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="formula">vocabulary = bytes + merge<sub>1</sub> + merge<sub>2</sub> + … + merge<sub>n</sub></div>
              <div className="worked">
                common letter groups become one token: “ flour” = <b>28420</b>
                <br />
                your text: {chars} characters, {pieces.length} tokens, about <b>{ratio}</b> characters each
                <br />
                every later station does work per token, so fewer tokens means less work
              </div>
            </div>
          </Vis>
        </Level>
      }
    />
  )
}
