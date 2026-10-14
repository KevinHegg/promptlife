import { useEffect, useState } from 'react'
import { onSoundChange, setSound, soundOn } from '../lib/sound'

export function SoundToggle() {
  const [on, setOn] = useState(soundOn)
  useEffect(() => {
    const off = onSoundChange(setOn)
    return () => { off() }
  }, [])
  return (
    <button type="button" className="link-btn" aria-pressed={on} onClick={() => setSound(!on)}>
      Sound: {on ? 'on' : 'off'}
    </button>
  )
}
