import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { LINKS } from '../data/content'
import Reveal, { Kicker } from './ui/Reveal'
import Magnetic from './ui/Magnetic'

/** On-brand LinkedIn card shown if the official badge cannot render. */
function LinkedInFallback({ es }: { es: boolean }) {
  return (
    <a
      href="https://www.linkedin.com/in/angelllm"
      target="_blank"
      rel="noreferrer"
      className="group flex w-[260px] flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-colors hover:border-cyan/40"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#0A66C2] text-white">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
      </span>
      <div>
        <p className="font-semibold text-white">Ángel Luis Lara Martín</p>
        <p className="mt-0.5 text-sm text-mist/70">{es ? 'Ingeniero Informático · Cloud e IA' : 'Computer Engineer · Cloud & AI'}</p>
      </div>
      <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-1.5 text-xs font-semibold text-white/90 transition-colors group-hover:border-cyan/60 group-hover:text-cyan">
        {es ? 'Ver perfil' : 'View profile'} <span aria-hidden>&#8594;</span>
      </span>
    </a>
  )
}

/**
 * Official LinkedIn profile badge, rendered imperatively into an isolated div so
 * React never reconciles the iframe LinkedIn injects. profile.js only renders on
 * the window 'load' event (already fired in this SPA), so we inject it and call
 * LIRenderAll ourselves. If the badge cannot render (e.g. blocked), we fall back
 * to an on-brand card so the section is never empty.
 */
function LinkedInBadge({ locale, es }: { locale: string; es: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const [official, setOfficial] = useState(false)
  const [near, setNear] = useState(false)

  // Defer LinkedIn's external script until the section is near the viewport.
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(wrap)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!near) return
    setOfficial(false)
    const el = ref.current
    if (!el) return
    el.innerHTML =
      `<div class="badge-base LI-profile-badge" data-locale="${locale}" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="angelllm" data-version="v1">` +
      `<a class="badge-base__link LI-simple-link" href="https://es.linkedin.com/in/angelllm?trk=profile-badge">Ángel Luis Lara Martín</a></div>`
    const SRC = 'https://platform.linkedin.com/badges/js/profile.js'
    const w = window as unknown as { LIRenderAll?: () => void }
    const render = () => {
      if (w.LIRenderAll) {
        w.LIRenderAll()
        return true
      }
      return false
    }
    if (!render() && !document.querySelector(`script[src="${SRC}"]`)) {
      const s = document.createElement('script')
      s.src = SRC
      s.async = true
      s.defer = true
      document.body.appendChild(s)
    }
    let tries = 0
    const iv = window.setInterval(() => {
      if (el.querySelector('iframe')) {
        setOfficial(true)
        window.clearInterval(iv)
        return
      }
      render()
      if (tries++ > 22) window.clearInterval(iv)
    }, 220)
    return () => window.clearInterval(iv)
  }, [near, locale])

  return (
    <div ref={wrapRef} className="relative flex min-h-[300px] items-center justify-center">
      <div ref={ref} style={official ? undefined : { position: 'absolute', opacity: 0, pointerEvents: 'none' }} />
      {!official && <LinkedInFallback es={es} />}
    </div>
  )
}

export default function Contact() {
  const { t, lang } = useI18n()

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
          <div className="mt-12">
            <LinkedInBadge key={lang} locale={lang === 'es' ? 'es_ES' : 'en_US'} es={lang === 'es'} />
          </div>
        </Reveal>

        <Reveal i={5}>
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
