import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useI18n } from '../i18n'
import Reveal, { Kicker } from './ui/Reveal'
import type { ExpItem } from '../data/content'

function TimelineItem({ item, i }: { item: ExpItem; i: number }) {
  return (
    <Reveal i={i}>
      <div className="relative pl-10 sm:pl-14">
        <span className="absolute left-0 top-1.5 grid h-7 w-7 -translate-x-1/2 place-items-center rounded-full border border-cyan/40 bg-ink sm:left-[7px]">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_12px_rgba(70,199,224,0.8)]" />
        </span>
        <div className="glass rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-bold text-white">{item.role}</h3>
            <span className="rounded-full border border-cyan/20 bg-cyan/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan">
              {item.tag}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            <span className="font-medium text-mist/90">{item.org}</span>
            <span className="font-mono text-xs text-mist/50">{item.date}</span>
          </div>
          <ul className="mt-4 space-y-2">
            {item.bullets.map((b, j) => (
              <li key={j} className="flex gap-2 text-sm leading-relaxed text-mist/70">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan/70" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  const { t } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <Kicker>{t.experience.kicker}</Kicker>
      </Reveal>
      <Reveal i={1}>
        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t.experience.heading}</h2>
      </Reveal>

      <div className="mt-14 grid gap-16 lg:grid-cols-2">
        <div ref={ref} className="relative">
          <div className="absolute left-[7px] top-0 h-full w-px bg-white/10" />
          <motion.div
            style={{ height }}
            className="absolute left-[7px] top-0 w-px bg-gradient-to-b from-cyan to-brand"
          />
          <div className="space-y-8">
            {t.experience.items.map((item, i) => (
              <TimelineItem key={i} item={item} i={i} />
            ))}
          </div>
        </div>

        <div>
          <Reveal>
            <Kicker>{t.education.kicker}</Kicker>
          </Reveal>
          <div className="mt-8 space-y-6">
            {t.education.items.map((item, i) => (
              <Reveal key={i} i={i + 1}>
                <div className="glass rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-bold text-white">{item.role}</h3>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-sm">
                    <span className="font-medium text-mist/90">{item.org}</span>
                    <span className="font-mono text-xs text-mist/50">{item.date}</span>
                  </div>
                  <span className="mt-3 inline-block rounded-full border border-cyan/20 bg-cyan/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan">
                    {item.tag}
                  </span>
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="flex gap-2 text-sm leading-relaxed text-mist/70">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan/70" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
