export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="logoG" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7fe9ff" />
            <stop offset="1" stopColor="#1F4E79" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="32" height="32" rx="10" stroke="url(#logoG)" strokeWidth="1.5" />
        {/* stylized A built from a network node */}
        <path d="M9 25 L17 8 L25 25" stroke="url(#logoG)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12.5" y1="19" x2="21.5" y2="19" stroke="#46C7E0" strokeWidth="2" strokeLinecap="round" />
        <circle cx="17" cy="8" r="2.4" fill="#7fe9ff" />
        <circle cx="9" cy="25" r="1.8" fill="#46C7E0" />
        <circle cx="25" cy="25" r="1.8" fill="#46C7E0" />
      </svg>
      <span className="font-sans text-[15px] font-semibold tracking-tight text-white/90">
        Ángel<span className="text-cyan"> Lara</span>
      </span>
    </span>
  )
}
