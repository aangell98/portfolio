import { motion, useScroll, useSpring } from 'framer-motion'
import { LanguageProvider } from './i18n'
import { useLenis } from './hooks/useLenis'
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
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -left-40 top-[-15%] h-[42rem] w-[42rem] rounded-full bg-brand/20 blur-[150px]"
          animate={{ x: [0, 70, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute right-[-15%] bottom-[-15%] h-[38rem] w-[38rem] rounded-full bg-cyan/12 blur-[150px]"
          animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="grain pointer-events-none fixed inset-0 z-[1]" />

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
