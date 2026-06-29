import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const variants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface Props {
  children: ReactNode
  i?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'span'
}

export default function Reveal({ children, i = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      custom={i}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  )
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-cyan/80">
      <span className="h-px w-8 bg-gradient-to-r from-cyan to-transparent" />
      {children}
    </span>
  )
}
