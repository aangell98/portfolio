import { useI18n } from '../i18n'
import Reveal, { Kicker } from './ui/Reveal'

export default function Skills() {
  const { t } = useI18n()
  const all = t.skills.groups.flatMap((g) => g.items)
  const marquee = [...all, ...all]

  return (
    <section id="skills" className="relative mx-auto max-w-6xl px-6 py-28">
      <Reveal>
        <Kicker>{t.skills.kicker}</Kicker>
      </Reveal>
      <Reveal i={1}>
        <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t.skills.heading}</h2>
      </Reveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {t.skills.groups.map((g, i) => (
          <Reveal key={g.title} i={i}>
            <div className="glass h-full rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan/10 font-mono text-sm text-cyan">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-semibold text-white">{g.title}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    data-hover
                    className="cursor-default rounded-lg border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm text-mist/80 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan/40 hover:text-cyan"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="marquee flex w-max gap-10 whitespace-nowrap">
          {marquee.map((s, i) => (
            <span key={i} className="font-mono text-2xl font-semibold text-white/10 sm:text-3xl">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
