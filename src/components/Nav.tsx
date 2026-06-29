import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '../i18n'

export default function Nav() {
  const { t, lang, toggle } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#about', label: t.nav.about },
    { href: '#work', label: t.nav.work },
    { href: '#experience', label: t.nav.experience },
    { href: '#skills', label: t.nav.skills },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? 'border-b border-white/5 bg-ink/70 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="group flex items-center gap-2" aria-label="Home">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan to-brand font-bold text-ink">
              A
            </span>
            <span className="font-mono text-sm tracking-wide text-white/80 group-hover:text-cyan">
              lara<span className="text-cyan">.</span>dev
            </span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative text-sm text-mist/70 transition-colors hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-cyan after:transition-all hover:after:w-full"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggle}
              data-hover
              className="flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-mist/80 transition-colors hover:border-cyan/50 hover:text-cyan"
              aria-label="Toggle language"
            >
              <span className={lang === 'en' ? 'text-cyan' : ''}>EN</span>
              <span className="text-white/20">/</span>
              <span className={lang === 'es' ? 'text-cyan' : ''}>ES</span>
            </button>

            <button
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 md:hidden"
              aria-label="Open menu"
            >
              <span className="space-y-1">
                <span className="block h-0.5 w-5 bg-white/80" />
                <span className="block h-0.5 w-5 bg-white/80" />
                <span className="block h-0.5 w-5 bg-white/80" />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-4">
              <span className="font-mono text-sm text-cyan">lara.dev</span>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-xl text-white"
                aria-label="Close menu"
              >
                &times;
              </button>
            </div>
            <div className="mt-12 flex flex-col items-center gap-7">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  className="text-2xl font-semibold text-white/90"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
