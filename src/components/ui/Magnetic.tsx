import { useRef, type ReactNode, type CSSProperties } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: ReactNode
  strength?: number
  className?: string
  style?: CSSProperties
}

export default function Magnetic({ children, strength = 0.4, className, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const mx = e.clientX - (r.left + r.width / 2)
    const my = e.clientY - (r.top + r.height / 2)
    x.set(mx * strength)
    y.set(my * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
