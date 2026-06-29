import { motion, useScroll, useSpring } from 'framer-motion'
import { LanguageProvider } from './i18n'
import { useLenis } from './hooks/useLenis'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Certifications from './components/Certifications'
import Contact from './components/Contact'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-cyan via-brand to-cyan"
    />
  )
}

function Shell() {
  useLenis()
  return (
    <div className="relative min-h-screen bg-ink">
      {/* fixed ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(31,78,121,0.25),transparent_40%),radial-gradient(circle_at_80%_100%,rgba(70,199,224,0.12),transparent_45%)]" />
      </div>

      <Cursor />
      <ScrollProgress />
      <Nav />

      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  )
}
