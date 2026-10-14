/** A Tokyo-style station roundel: line letter over station number. */
export function Roundel({ code, color = 'var(--main)', small = false }: { code: string; color?: string; small?: boolean }) {
  const letter = code.charAt(0)
  const num = code.slice(1)
  return (
    <span className={`roundel${small ? ' small' : ''}`} style={{ ['--c' as string]: color }} aria-hidden="true">
      <b>{letter}</b>
      {num && <b>{num}</b>}
    </span>
  )
}
