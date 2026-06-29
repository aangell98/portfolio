export type Quality = 'high' | 'low'

/**
 * Lightweight device-tier check with no heavy (Three.js) imports, so it can be
 * used to decide whether to even load the WebGL scene. Low-power devices get a
 * static poster instead of the full quantum-universe canvas.
 */
export function detectQuality(): Quality {
  if (typeof window === 'undefined') return 'high'
  const coarse = window.matchMedia?.('(pointer: coarse)').matches
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8
  const cores = navigator.hardwareConcurrency ?? 8
  if (window.innerWidth < 768 || coarse || mem <= 4 || cores <= 4) return 'low'
  return 'high'
}
