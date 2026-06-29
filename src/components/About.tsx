import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useI18n } from '../i18n'
import Reveal, { Kicker } from './ui/Reveal'

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!inView) return
    const match = value.match(/[\d.,]+/)
    if (!match) {
      setDisplay(value)
      return
    }
    const raw = match[0]
    const target = parseFloat(raw.replace(/,/g, '').replace(/\.(?=\d{3}\b)/g, ''))
    if (isNaN(target)) {
      setDisplay(value)
      return
    }
    const hasComma = raw.includes(',')
    const hasDotThousand = /\.\d{3}\b/.test(raw)
    const fmt = (n: number) => {
      const v = Math.round(n)
      if (hasComma) return v.toLocaleString('en-US')
      if (hasDotThousand) return v.toLocaleString('de-DE')
      return String(v)
    }
    let start = 0
    const dur = 1400
    const t0 = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      const cur = start + (target - start) * eased
      setDisplay(value.replace(raw, fmt(cur)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  return <span ref={ref}>{display}</span>
}

export default function About() {
  const { t } = useI18n()
  return (
    <section id="about" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <Kicker>{t.about.kicker}</Kicker>
      </Reveal>

      <div className="mt-6 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <Reveal i={1}>
            <h2 className="max-w-xl text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              {t.about.heading}
            </h2>
          </Reveal>
          <div className="mt-7 space-y-5">
            {t.about.body.map((p, i) => (
              <Reveal key={i} i={i + 2}>
                <p className="max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 self-center">
          {t.about.stats.map((s, i) => (
            <Reveal key={i} i={i}>
              <div className="glass group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <div className="text-3xl font-extrabold text-gradient sm:text-4xl">
                  <CountUp value={s.value} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-mist/60">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
