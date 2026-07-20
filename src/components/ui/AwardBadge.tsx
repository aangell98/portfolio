/** A small gold badge to highlight a distinction (e.g. a thesis grade). */
export default function AwardBadge({ label, className = '' }: { label: string; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-300/10 px-2.5 py-0.5 text-xs font-semibold text-amber-200 shadow-[0_0_18px_-6px_rgba(251,191,36,0.7)] ${className}`}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.3 6.2 19.84l1.11-6.46-4.7-4.58 6.49-.94L12 2z" />
      </svg>
      {label}
    </span>
  )
}
