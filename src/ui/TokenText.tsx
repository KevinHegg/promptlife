/** Shows a token's whitespace so learners can see it: a faint dot for a leading space, ↵ for a new line. */
export function TokenText({ text }: { text: string }) {
  if (/^ +$/.test(text)) {
    return <span className="sp" aria-label="space">␣</span>
  }
  const body = text.replace(/\n/g, '↵')
  if (body.startsWith(' ')) {
    return (
      <>
        <span className="sp" aria-hidden="true">·</span>
        <span className="visually-hidden"> </span>
        {body.slice(1)}
      </>
    )
  }
  return <>{body}</>
}
