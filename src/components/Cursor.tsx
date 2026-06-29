import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) setEnabled(true)
    else return

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...pos }
    let raf = 0

    const move = (e: MouseEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) dot.current.style.transform = `translate(${pos.x - 3.5}px, ${pos.y - 3.5}px)`
    }

    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest('a, button, [data-hover]')
      if (ring.current) ring.current.classList.toggle('hover', !!el)
    }

    const loop = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18
      ringPos.y += (pos.y - ringPos.y) * 0.18
      if (ring.current) ring.current.style.transform = `translate(${ringPos.x - 19}px, ${ringPos.y - 19}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    raf = requestAnimationFrame(loop)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!enabled) return null
  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
