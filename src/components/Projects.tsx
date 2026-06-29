import { useMemo, useRef, useState, forwardRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'
import { LINKS, type Category, type ProjectItem } from '../data/content'
import Reveal, { Kicker } from './ui/Reveal'
import { TechIcon, asset } from './ui/Icons'
import ProjectModal from './ProjectModal'

function ProjectMark({ p }: { p: ProjectItem }) {
  if (p.logo) {
    return (
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 p-1.5">
        <img src={asset(p.logo)} alt={p.name} className="h-full w-full object-contain" />
      </span>
    )
  }
  if (p.icon) return <TechIcon name={p.icon} size={24} />
  return (
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan/10 font-mono text-cyan">{'</>'}</span>
  )
}

function CatBadge({ category }: { category: Category }) {
  const { t } = useI18n()
  const map: Record<Category, { label: string; cls: string }> = {
    flagship: { label: t.work.featuredLabel, cls: 'border-violet-400/30 bg-violet-400/10 text-violet-300' },
    work: { label: t.work.filters.work, cls: 'border-cyan/30 bg-cyan/10 text-cyan' },
    personal: { label: t.work.filters.personal, cls: 'border-orange-400/30 bg-orange-400/10 text-orange-300' },
  }
  const m = map[category]
  return (
    <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${m.cls}`}>
      {m.label}
    </span>
  )
}

function RepoLinks({ p }: { p: ProjectItem }) {
  const { t } = useI18n()
  return (
    <div className="flex flex-wrap items-center gap-2">
      {p.live && (
        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-cyan/15 px-3 py-1.5 text-xs font-semibold text-cyan transition-colors hover:bg-cyan/25"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan" />
          </span>
          {t.work.liveLabel}
        </a>
      )}
      {p.repos.map((r) => (
        <a
          key={r.href}
          href={r.href}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-mist/80 transition-colors hover:border-cyan/50 hover:text-cyan"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 005.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.5 7.5 0 014 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          {r.label}
        </a>
      ))}
    </div>
  )
}

function FeaturedCard({ p, onOpen }: { p: ProjectItem; onOpen: (p: ProjectItem) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const glowX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glowY = useTransform(my, [0, 1], ['0%', '100%'])
  const bg = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, ${p.accent}1f, transparent 55%)`)

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }

  return (
    <Reveal>
      <div
        ref={ref}
        onMouseMove={onMove}
        onClick={() => onOpen(p)}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-violet-400/20 bg-panel/50 p-8 transition-colors hover:border-violet-400/40 sm:p-10"
      >
        <motion.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: bg }} />
        <div className="relative grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex items-center justify-center">
            <motion.img
              src={asset(p.logo!)}
              alt={p.name}
              className="h-28 w-28 object-contain drop-shadow-[0_0_30px_rgba(139,92,246,0.35)] sm:h-36 sm:w-36"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <div>
            <CatBadge category={p.category} />
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">{p.name}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mist/75 sm:text-base">{p.blurb}</p>
            {p.metrics && (
              <div className="mt-5 flex flex-wrap gap-2">
                {p.metrics.map((m) => (
                  <span key={m} className="rounded-md bg-violet-400/10 px-2.5 py-1 font-mono text-xs font-medium text-violet-300">
                    {m}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-6">
              <RepoLinks p={p} />
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

const Card = forwardRef<HTMLDivElement, { p: ProjectItem; i: number; onOpen: (p: ProjectItem) => void }>(function Card({ p, i, onOpen }, outerRef) {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 18 })
  const glowX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glowY = useTransform(my, [0, 1], ['0%', '100%'])
  const bg = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, ${p.accent}22, transparent 60%)`)

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={outerRef}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, delay: i * 0.04 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        onClick={() => onOpen(p)}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/8 bg-panel/50 p-6"
      >
        <motion.div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: bg }} />
        <span className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

        <div className="relative flex items-start justify-between gap-3">
          <ProjectMark p={p} />
          <CatBadge category={p.category} />
        </div>

        <h3 className="relative mt-4 font-mono text-base font-bold text-white">{p.name}</h3>
        <p className="relative mt-2 flex-1 text-sm leading-relaxed text-mist/70">{p.blurb}</p>

        {p.metrics && (
          <div className="relative mt-4 flex flex-wrap gap-2">
            {p.metrics.map((m) => (
              <span key={m} className="rounded-md px-2 py-0.5 font-mono text-[11px] font-medium" style={{ background: `${p.accent}14`, color: p.accent }}>
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="relative mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <RepoLinks p={p} />
          <span className="shrink-0 pl-2 font-mono text-[10px] uppercase tracking-wider text-mist/40 transition-colors group-hover:text-cyan">
            {t.work.featuresLabel} +
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
})

export default function Projects() {
  const { t } = useI18n()
  const [filter, setFilter] = useState<'all' | 'work' | 'personal'>('all')
  const [selected, setSelected] = useState<ProjectItem | null>(null)
  const featured = t.work.projects.find((p) => p.category === 'flagship')!
  const rest = useMemo(() => t.work.projects.filter((p) => p.category !== 'flagship'), [t.work.projects])
  const shown = useMemo(() => (filter === 'all' ? rest : rest.filter((p) => p.category === filter)), [rest, filter])

  const filters: { key: 'all' | 'work' | 'personal'; label: string }[] = [
    { key: 'all', label: t.work.filters.all },
    { key: 'work', label: t.work.filters.work },
    { key: 'personal', label: t.work.filters.personal },
  ]

  return (
    <section id="work" className="relative py-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <Kicker>{t.work.kicker}</Kicker>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t.work.heading}</h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mt-3 max-w-lg text-mist/70">{t.work.sub}</p>
        </Reveal>

        <div className="mt-10">
          <FeaturedCard p={featured} onOpen={setSelected} />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                data-hover
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  filter === f.key ? 'text-ink' : 'text-mist/70 hover:text-white'
                }`}
              >
                {filter === f.key && (
                  <motion.span layoutId="filterPill" className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan to-brand" style={{ zIndex: -1 }} />
                )}
                {f.label}
              </button>
            ))}
          </div>
          <a href={LINKS.github} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan">
            {t.work.more}
            <span className="transition-transform group-hover:translate-x-1">&#8594;</span>
          </a>
        </div>

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <Card key={p.id} p={p} i={i} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
