import { Home } from './pages/Home'
import { StationPage } from './pages/StationPage'
import { useHashRoute } from './lib/router'

export function App() {
  const route = useHashRoute()
  const station = /^P0[1-8]$/.test(route) ? route : null
  return (
    <div className="wrap">
      <main>{station ? <StationPage key={station} code={station} /> : <Home />}</main>
      <footer className="site-foot">
        <span>Prompt Life 1.0 alpha · rebuild branch</span>
        <span>Progress stays on this device.</span>
      </footer>
    </div>
  )
}
