/**
 * iPhone Safari tucks its bottom toolbar away as you scroll. While it's tucked, a tap near the
 * bottom edge only brings the toolbar back, so the sticky Next button would need a second tap.
 * This marks the page `toolbar-tucked` while that's the case, so CSS can lift the button clear.
 * Only Safari on iPhone and iPad: in-app browsers and desktops have no tucking toolbar.
 */
export function watchSafariToolbar(): () => void {
  const ua = navigator.userAgent
  const ios = /iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)
  const safari = /Version\/[\d.]+.*Safari\//.test(ua) && !/CriOS|FxiOS|EdgiOS/.test(ua)
  if (!ios || !safari || !CSS.supports('height', '100lvh')) return () => {}
  // The large viewport (100lvh) is the height with the toolbar tucked away.
  const probe = document.createElement('div')
  probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100lvh;visibility:hidden;pointer-events:none'
  document.body.appendChild(probe)
  const root = document.documentElement
  const update = () => root.classList.toggle('toolbar-tucked', window.innerHeight >= probe.offsetHeight - 2)
  update()
  const vv = window.visualViewport
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  vv?.addEventListener('resize', update)
  return () => {
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
    vv?.removeEventListener('resize', update)
    probe.remove()
    root.classList.remove('toolbar-tucked')
  }
}
