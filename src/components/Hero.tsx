import { Suspense, lazy, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n'
import { LINKS } from '../data/content'
import Magnetic from './ui/Magnetic'

const EntangleScene = lazy(() => import('./EntangleScene'))

export default function Hero() {
  const { t, lang } = useI18n()
  const [role, setRole] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setRole((r) => (r + 1) % t.hero.roles.length), 2600)
    return () => clearInterval(id)
  }, [t.hero.roles.length])

  const cv = lang === 'es' ? LINKS.cvEs : LINKS.cvEn

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <EntangleScene />
        </Suspense>
      </div>

      {/* legibility gradients over the universe */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-ink via-ink/65 to-transparent lg:via-ink/40" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

      {/* content */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan/30 bg-cyan/5 px-4 py-1.5 text-xs font-mono uppercase tracking-widest text-cyan"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          {t.hero.badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl"
        >
          <span className="block text-white/95">{t.hero.titleA}</span>
          <span className="block text-gradient">{t.hero.titleB}</span>
        </motion.h1>

        <div className="mt-6 flex h-9 items-center font-mono text-lg text-mist sm:text-2xl">
          <span className="mr-3 text-cyan">{'>'}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="text-white/90"
            >
              {t.hero.roles[role]}
            </motion.span>
          </AnimatePresence>
          <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-cyan" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-7 max-w-xl text-base leading-relaxed text-mist/80 sm:text-lg"
        >
          {t.hero.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan to-brand px-7 py-3 text-sm font-semibold text-ink transition-shadow hover:shadow-[0_0_30px_rgba(70,199,224,0.5)]"
            >
              {t.hero.ctaWork}
              <span className="transition-transform group-hover:translate-x-1">&#8594;</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href={cv}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-cyan/60 hover:text-cyan"
            >
              {t.hero.ctaCv}
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-mist/70 transition-colors hover:text-cyan"
            >
              {t.hero.ctaContact}
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-mist/60"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">{t.hero.scroll}</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-mist/30 p-1">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-cyan"
          />
        </span>
      </motion.div>
    </section>
  )
}
