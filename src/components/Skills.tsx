import { motion } from 'framer-motion'
import { useI18n } from '../i18n'
import { SKILL_LOGOS } from '../data/content'
import Reveal, { Kicker } from './ui/Reveal'
import { asset } from './ui/Icons'

export default function Skills() {
  const { t } = useI18n()

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <Kicker>{t.skills.kicker}</Kicker>
      </Reveal>
      <Reveal i={1}>
        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t.skills.heading}</h2>
      </Reveal>
      <Reveal i={2}>
        <p className="mt-3 max-w-lg text-mist/70">{t.skills.sub}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-5">
        {SKILL_LOGOS.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 5) * 0.05 + Math.floor(i / 5) * 0.05 }}
            data-hover
            className="group glass flex flex-col items-center justify-center gap-3 rounded-2xl px-3 py-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan/40"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/90 p-2 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <img src={asset(`tech/${s.key}.svg`)} alt={s.label} className="h-full w-full object-contain" loading="lazy" />
            </span>
            <span className="text-xs font-medium text-mist/70 transition-colors group-hover:text-white">{s.label}</span>
          </motion.div>
        ))}
      </div>

      <Reveal i={1}>
        <p className="mt-12 text-sm font-mono uppercase tracking-widest text-mist/50">{t.skills.concepts}</p>
      </Reveal>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {t.skills.conceptItems.map((c, i) => (
          <Reveal key={c} i={i}>
            <span
              data-hover
              className="cursor-default rounded-lg border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-mist/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
            >
              {c}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
