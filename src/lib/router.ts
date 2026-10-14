import { useEffect, useState } from 'react'

/** Hash routes work on GitHub Pages without server rewrites: #/ and #/P04. */
export function useHashRoute(): string {
  const read = () => window.location.hash.replace(/^#\/?/, '') || ''
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onChange = () => {
      setRoute(read())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

export const hrefFor = (code: string) => `#/${code}`
