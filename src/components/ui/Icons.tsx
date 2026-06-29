const BASE = import.meta.env.BASE_URL

export function asset(path: string) {
  return `${BASE}${path.replace(/^\//, '')}`
}

export function TechIcon({ name, size = 22 }: { name: string; size?: number }) {
  return (
    <span
      className="grid place-items-center rounded-lg bg-white/90 p-1.5 shadow-sm"
      style={{ width: size + 14, height: size + 14 }}
    >
      <img src={asset(`tech/${name}.svg`)} alt={name} width={size} height={size} loading="lazy" />
    </span>
  )
}

const MONO: Record<string, { text: string; bg: string; fg: string }> = {
  uclm: { text: 'UCLM', bg: '#7a1f2b', fg: '#ff9aa6' },
  ies: { text: 'IES', bg: '#0e2a22', fg: '#5fe0c8' },
}

const IMG_ORGS: Record<string, { src: string; alt: string }> = {
  microsoft: { src: 'orgs/microsoft.svg', alt: 'Microsoft' },
  tcs: { src: 'orgs/tcs.png', alt: 'Tata Consultancy Services' },
}

export function OrgLogo({ name, size = 44 }: { name: string; size?: number }) {
  const img = IMG_ORGS[name]
  if (img) {
    return (
      <span
        className="grid shrink-0 place-items-center rounded-xl bg-white p-2 shadow-sm"
        style={{ width: size, height: size }}
      >
        <img src={asset(img.src)} alt={img.alt} className="h-full w-full object-contain" />
      </span>
    )
  }
  const m = MONO[name]
  if (!m) return null
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl font-bold shadow-sm"
      style={{ width: size, height: size, background: m.bg, color: m.fg, fontSize: m.text.length > 3 ? 11 : 13 }}
    >
      {m.text}
    </span>
  )
}
