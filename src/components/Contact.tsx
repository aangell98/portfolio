import { useI18n } from '../i18n'
import { LINKS } from '../data/content'
import Reveal, { Kicker } from './ui/Reveal'
import Magnetic from './ui/Magnetic'

export default function Contact() {
  const { t } = useI18n()

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <div className="flex justify-center">
            <Kicker>{t.contact.kicker}</Kicker>
          </div>
        </Reveal>
        <Reveal i={1}>
          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">
            {t.contact.heading}
          </h2>
        </Reveal>
        <Reveal i={2}>
          <p className="mx-auto mt-5 max-w-xl text-mist/70">{t.contact.body}</p>
        </Reveal>

        <Reveal i={3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={LINKS.email}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-brand px-8 py-3.5 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_30px_rgba(70,199,224,0.5)]"
              >
                {t.contact.email}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={LINKS.cvEn}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                {t.contact.cvEn}
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={LINKS.cvEs}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-cyan/60 hover:text-cyan"
              >
                {t.contact.cvEs}
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal i={4}>
          <div className="mt-10 flex items-center justify-center gap-6 text-sm">
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" className="text-mist/70 transition-colors hover:text-cyan">
              LinkedIn
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a href={LINKS.github} target="_blank" rel="noreferrer" className="text-mist/70 transition-colors hover:text-cyan">
              GitHub
            </a>
            <span className="h-4 w-px bg-white/10" />
            <a href={LINKS.email} className="text-mist/70 transition-colors hover:text-cyan">
              angelluislara@hotmail.es
            </a>
          </div>
        </Reveal>
      </div>

      <footer className="relative mx-auto mt-24 max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="max-w-md text-center text-xs text-mist/40 sm:text-left">{t.contact.built}</p>
          <a href="#home" className="font-mono text-xs uppercase tracking-widest text-mist/50 transition-colors hover:text-cyan">
            {t.contact.backTop} &#8593;
          </a>
        </div>
        <p className="py-6 text-center text-xs text-mist/30">
          &copy; {new Date().getFullYear()} Ángel Luis Lara Martín
        </p>
      </footer>
    </section>
  )
}
