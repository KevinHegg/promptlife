import type { Station } from '../../data/network'
import type { FloorView } from '../../data/placeholders'
import { TokenText } from '../../ui/TokenText'
import { Cutaway, Level, LevelText, Vis } from '../Cutaway'
import { MapLevel } from '../MapLevel'

export function StackLevels({ station, view }: { station: Station; view: FloorView }) {
  const final = view.floors[0]?.guess
  return (
    <Cutaway
      stationName={station.name}
      map={<MapLevel station={station} />}
      cutaway={
        <Level>
          <LevelText
            level={2}
            title="Ride the elevator"
            note={view.real ? view.source : 'Placeholder guesses. The trace pipeline will read real ones from every layer.'}
          >
            <p>After “{view.context}”, read the model's best guess for the next token at each floor. Low floors guess common words. High floors settle on the answer.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="v-bars">
                {view.floors.map((f) => (
                  <div className="v-bar" key={f.layer}>
                    <span className="lab">layer {f.layer}</span>
                    <span className="track"><span className={`fill${f.guess === final ? '' : ' alt'}`} style={{ width: `${Math.max(2, f.prob * 100).toFixed(0)}%` }} /></span>
                    <span className="val"><TokenText text={f.guess} /></span>
                  </div>
                ))}
              </div>
              <div className="v-cap">bar length = how sure that floor is of its top guess</div>
            </div>
          </Vis>
        </Level>
      }
      bedrock={
        <Level>
          <LevelText level={3} title="The residual stream">
            <p>Each token carries one long vector up the building. Every layer adds a correction to it instead of replacing it, which is why you can read a guess at any floor.</p>
          </LevelText>
          <Vis>
            <div className="v-col">
              <div className="formula">
                h ← h + Attention(h)
                <br />h ← h + MLP(h)
                <br />repeat for every layer
              </div>
              <div className="worked">
                read a floor: guess = <b>W<sub>out</sub></b> · h
                <br />this trick is called the <b>logit lens</b>
              </div>
            </div>
          </Vis>
        </Level>
      }
    />
  )
}
