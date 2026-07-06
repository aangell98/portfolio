export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="shrink-0">
        <defs>
          <linearGradient id="logoG" x1="6" y1="6" x2="34" y2="34" gradientUnits="userSpaceOnUse">
            <stop stopColor="#8feeff" />
            <stop offset="0.55" stopColor="#46C7E0" />
            <stop offset="1" stopColor="#1F4E79" />
          </linearGradient>
          <radialGradient id="logoGlow" cx="50%" cy="40%" r="60%">
            <stop stopColor="#46C7E0" stopOpacity="0.35" />
            <stop offset="1" stopColor="#46C7E0" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* rounded token with a soft inner glow */}
        <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="#0a1120" />
        <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill="url(#logoGlow)" />
        <rect x="1.5" y="1.5" width="37" height="37" rx="11" stroke="url(#logoG)" strokeWidth="1.4" strokeOpacity="0.9" />
        {/* entanglement orbit */}
        <path d="M7.5 15 A 14 14 0 0 1 32.5 15" stroke="#46C7E0" strokeWidth="1" strokeOpacity="0.35" fill="none" strokeLinecap="round" />
        {/* A built from a node network */}
        <g fill="none" stroke="url(#logoG)" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 29 L20 10 L29 29" strokeWidth="2.4" />
          <path d="M15 21 H25" strokeWidth="2" />
        </g>
        {/* glowing nodes */}
        <circle cx="20" cy="10" r="2.6" fill="#bff4ff" />
        <circle cx="20" cy="10" r="1.2" fill="#ffffff" />
        <circle cx="11" cy="29" r="1.9" fill="#46C7E0" />
        <circle cx="29" cy="29" r="1.9" fill="#46C7E0" />
        <circle cx="30.4" cy="12.2" r="1.2" fill="#8feeff" />
      </svg>
      <span className="font-sans text-[15px] font-semibold tracking-tight text-white/90">
        Ángel<span className="text-cyan"> Lara</span>
      </span>
    </span>
  )
}
