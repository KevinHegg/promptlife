import { GlossaryPage } from './pages/GlossaryPage'
import { Home } from './pages/Home'
import { LinePage } from './pages/LinePage'
import { isSideLine } from './data/network'
import { StationPage } from './pages/StationPage'
import { useHashRoute } from './lib/router'
import { SoundToggle } from './ui/SoundToggle'
import { StartOver } from './ui/StartOver'
import { TopBar } from './ui/TopBar'

export function App() {
  const route = useHashRoute()
  const station = /^P0[1-8]$/.test(route) ? route : null
  const glossary = route === 'glossary' || route.startsWith('glossary/')
  const line = isSideLine(route) ? route : null
  return (
    <div className="wrap">
      <TopBar route={route} />
      <main>
        {station ? <StationPage key={station} code={station} /> : line ? <LinePage key={line} code={line} /> : glossary ? <GlossaryPage term={route.split('/')[1]} /> : <Home />}
      </main>
      <footer className="site-foot">
        <span>Prompt Life v2.0.{__BUILD__ || 'dev'}</span>
        <span>Progress stays on this device.</span>
        <SoundToggle />
        <StartOver />
      </footer>
    </div>
  )
}
