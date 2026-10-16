import { GlossaryPage } from './pages/GlossaryPage'
import { Home } from './pages/Home'
import { StationPage } from './pages/StationPage'
import { useHashRoute } from './lib/router'
import { SoundToggle } from './ui/SoundToggle'
import { StartOver } from './ui/StartOver'
import { TopBar } from './ui/TopBar'

export function App() {
  const route = useHashRoute()
  const station = /^P0[1-8]$/.test(route) ? route : null
  const glossary = route === 'glossary' || route.startsWith('glossary/')
  return (
    <div className="wrap">
      <TopBar route={route} />
      <main>
        {station ? <StationPage key={station} code={station} /> : glossary ? <GlossaryPage term={route.split('/')[1]} /> : <Home />}
      </main>
      <footer className="site-foot">
        <span>Prompt Life 2.0 alpha</span>
        <span>Progress stays on this device.</span>
        {import.meta.env.PROD && <a href="./archive/">Earlier versions</a>}
        <SoundToggle />
        <StartOver />
      </footer>
    </div>
  )
}
