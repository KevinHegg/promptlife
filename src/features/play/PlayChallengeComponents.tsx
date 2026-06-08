import React from 'react'
import type { PlayChallengeSummary, PlayChallengeStatus } from './types'

type ShellProps = {
  title: string
  eyebrow?: string
  subtitle?: string
  titleId?: string
  onBack?: () => void
  headerChildren?: React.ReactNode
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

export function PlayChallengeShell({ title, eyebrow = 'Play lab', subtitle, titleId, onBack, headerChildren, className = '', children, ...sectionProps }: ShellProps) {
  return (
    <section
      {...sectionProps}
      className={`screen play-challenge-shell ${className}`.trim()}
      aria-labelledby={sectionProps['aria-labelledby'] ?? titleId}
    >
      <PlayChallengeHeader title={title} eyebrow={eyebrow} subtitle={subtitle} titleId={titleId} onBack={onBack}>
        {headerChildren}
      </PlayChallengeHeader>
      {children}
    </section>
  )
}

type HeaderProps = {
  title: string
  eyebrow?: string
  subtitle?: string
  titleId?: string
  onBack?: () => void
  children?: React.ReactNode
}

export function PlayChallengeHeader({ title, eyebrow = 'Play lab', subtitle, titleId, onBack, children = null }: HeaderProps) {
  return (
    <header className="play-challenge-header">
      {onBack && <button className="text-btn" type="button" onClick={onBack}>Back to Play</button>}
      <p className="eyebrow">{eyebrow}</p>
      <h1 id={titleId} tabIndex={-1}>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
      {children}
    </header>
  )
}

export function PlayChallengeBoard({ children, label = 'Play challenge board', className = '' }) {
  return (
    <section className={`play-challenge-board ${className}`.trim()} aria-label={label}>
      {children}
    </section>
  )
}

export function PlayStatusPill({ status, label }: { status: PlayChallengeStatus, label?: string }) {
  const copy = label ?? (
    status === 'completed' ? 'Completed' :
    status === 'review-suggested' ? 'Review suggested' :
    status === 'in-progress' ? 'In progress' :
    status === 'coming-soon' ? 'Foundation ready' :
    status === 'retired' ? 'Retired' :
    'Ready'
  )
  return <span className={`play-status-pill is-${status}`}>{copy}</span>
}

export function PlayProgressRail({ value = 0, label = `${value}% progress` }) {
  const pct = Math.max(0, Math.min(100, Math.round(Number(value) || 0)))
  return (
    <div className="play-progress-rail" aria-label={label}>
      <span style={{ width: `${pct}%` }} />
    </div>
  )
}

type FeedbackPanelProps = {
  tone?: 'neutral' | 'good' | 'review'
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

export function PlayFeedbackPanel({ tone = 'neutral', className = '', children, ...panelProps }: FeedbackPanelProps) {
  return (
    <section {...panelProps} className={`play-feedback-panel is-${tone} ${className}`.trim()} role={panelProps.role ?? 'status'}>
      {children}
    </section>
  )
}

export function PlayActionRow({ children, className = '', ...rowProps }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) {
  return <div {...rowProps} className={`play-action-row ${className}`.trim()}>{children}</div>
}

export function PlayChoiceButton({ selected = false, children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected?: boolean }) {
  return (
    <button className={selected ? 'play-choice-button is-selected' : 'play-choice-button'} type="button" aria-pressed={selected} {...props}>
      {children}
    </button>
  )
}

export function PlayTokenChip({ children, tone = 'default' }: { children: React.ReactNode, tone?: 'default' | 'prompt' | 'response' | 'context' | 'probability' }) {
  return <span className={`play-token-chip is-${tone}`}>{children}</span>
}

export function PlayScrollHint({ children = 'More below' }: { children?: React.ReactNode }) {
  return (
    <p className="play-scroll-hint" aria-hidden="true">
      <span>{children}</span>
    </p>
  )
}

type CompletionPanelProps = {
  title?: string
  titleId?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>

export function PlayCompletionPanel({ title = 'Insight unlocked', titleId = 'play-completion-title', className = '', children, ...panelProps }: CompletionPanelProps) {
  return (
    <section {...panelProps} className={`play-completion-panel ${className}`.trim()} aria-labelledby={panelProps['aria-labelledby'] ?? titleId}>
      <h2 id={titleId}>{title}</h2>
      {children}
    </section>
  )
}

export function PlayChallengeCard({ item, onStart }: { item: PlayChallengeSummary, onStart: (item: PlayChallengeSummary) => void }) {
  return (
    <button
      className={item.disabled ? 'play-challenge-card is-disabled' : 'play-challenge-card'}
      type="button"
      onClick={() => onStart(item)}
      disabled={item.disabled}
      aria-describedby={`play-card-${item.id}-description`}
    >
      {item.image && <img src={item.image} alt="" aria-hidden="true" />}
      <span className="play-challenge-card-copy">
        <span className="play-card-topline">
          <strong>{item.title}</strong>
          <PlayStatusPill status={item.status} label={item.statusText} />
        </span>
        <small id={`play-card-${item.id}-description`}>{item.shortDescription}</small>
        <span className="play-card-explain"><b>10-second idea:</b> {item.tenSecondExplanation}</span>
        <span className="play-card-meta"><b>Action:</b> {item.action}</span>
        <span className="play-card-meta"><b>Model move:</b> {item.modelMove}</span>
        <span className="play-card-meta play-card-time"><b>Time:</b> {item.estimatedTime}</span>
        <span className="play-card-meta"><b>Path:</b> {item.relatedJourneyStages.join(', ')}</span>
        <span className="play-card-progress-row">
          <PlayProgressRail value={item.progress.bestProgressPct} label={`${item.title} progress ${item.progress.bestProgressPct}%`} />
          <span>{item.progressText}</span>
        </span>
        <span className="play-card-meta">{item.attemptsText}. {item.completionText}.</span>
        {item.progress.lastOutcome && <span className="play-card-outcome">{item.progress.lastOutcome}</span>}
      </span>
      <span className="play-card-action">{item.actionLabel}</span>
    </button>
  )
}
