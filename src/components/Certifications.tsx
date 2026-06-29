import { useI18n } from '../i18n'
import Reveal, { Kicker } from './ui/Reveal'

export default function Certifications() {
  const { t } = useI18n()

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16">
      <div className="glass overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Reveal>
              <Kicker>{t.certs.kicker}</Kicker>
            </Reveal>
            <Reveal i={1}>
              <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">{t.certs.heading}</h2>
            </Reveal>
            <Reveal i={2}>
              <p className="mt-3 max-w-md text-sm text-mist/70">{t.certs.sub}</p>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {t.certs.items.map((c, i) => (
              <Reveal key={c.code} i={i}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-white/8 bg-gradient-to-br from-brand/20 to-transparent p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-cyan/10 text-cyan">&#10003;</span>
                    <span className="text-mist/40 transition-colors group-hover:text-cyan">&#8599;</span>
                  </div>
                  <div className="mt-4 font-mono text-lg font-bold text-white">{c.code}</div>
                  <div className="text-xs text-mist/60">{c.name}</div>
                  <div className="mt-3 font-mono text-[10px] uppercase tracking-wider text-cyan/70 opacity-0 transition-opacity group-hover:opacity-100">
                    {t.certs.verify}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
