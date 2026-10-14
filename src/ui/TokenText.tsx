/** Shows a token's leading space as a faint dot so learners can see it. */
export function TokenText({ text }: { text: string }) {
  if (/^ +$/.test(text)) {
    return <span className="sp" aria-label="space">␣</span>
  }
  if (text === '\n') return <span aria-label="new line">↵</span>
  if (text.startsWith(' ')) {
    return (
      <>
        <span className="sp" aria-hidden="true">·</span>
        <span className="visually-hidden"> </span>
        {text.slice(1)}
      </>
    )
  }
  return <>{text}</>
}
