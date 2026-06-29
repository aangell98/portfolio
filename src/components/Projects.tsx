import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'
import { LINKS, type ProjectItem } from '../data/content'
import Reveal, { Kicker } from './ui/Reveal'

function Card({ p, i }: { p: ProjectItem; i: number }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 150, damping: 18 })
  const glowX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glowY = useTransform(my, [0, 1], ['0%', '100%'])

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
    <Reveal i={i}>
      <motion.a
        ref={ref}
        href={p.href}
        target="_blank"
        rel="noreferrer"
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className="group relative block h-full overflow-hidden rounded-3xl border border-white/8 bg-panel/50 p-7"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([x, y]) => `radial-gradient(420px circle at ${x} ${y}, ${p.accent}22, transparent 60%)`,
            ),
          }}
        />
        <span
          className="absolute left-0 top-0 h-1 w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }}
        />

        <div className="relative flex items-start justify-between">
          <span
            className="grid h-11 w-11 place-items-center rounded-xl font-mono text-lg font-bold"
            style={{ background: `${p.accent}1a`, color: p.accent }}
          >
            {'</>'}
          </span>
          <span className="text-mist/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan">
            &#8599;
          </span>
        </div>

        <h3 className="relative mt-5 font-mono text-lg font-bold text-white">{p.name}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-mist/70">{p.blurb}</p>

        {p.metrics && (
          <div className="relative mt-4 flex flex-wrap gap-2">
            {p.metrics.map((m) => (
              <span
                key={m}
                className="rounded-md px-2 py-0.5 font-mono text-[11px] font-medium"
                style={{ background: `${p.accent}14`, color: p.accent }}
              >
                {m}
              </span>
            ))}
          </div>
        )}

        <div className="relative mt-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">
          {p.tags.map((tg) => (
            <span key={tg} className="text-[11px] text-mist/50">
              #{tg.replace(/\s+/g, '')}
            </span>
          ))}
        </div>
      </motion.a>
    </Reveal>
  )
}

export default function Projects() {
  const { t } = useI18n()
  return (
    <section id="work" className="relative py-28">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <Kicker>{t.work.kicker}</Kicker>
            </Reveal>
            <Reveal i={1}>
              <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t.work.heading}</h2>
            </Reveal>
            <Reveal i={2}>
              <p className="mt-3 max-w-lg text-mist/70">{t.work.sub}</p>
            </Reveal>
          </div>
          <Reveal i={2}>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-cyan"
            >
              {t.work.more}
              <span className="transition-transform group-hover:translate-x-1">&#8594;</span>
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.work.projects.map((p, i) => (
            <Card key={p.name} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
