import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { detectQuality, type Quality } from '../lib/quality'

/* ============================================================================
 * Quantum Universe — a reimagining of the Entangle (TFG) cosmic web.
 * A tilted spiral galaxy of glowing quantum nodes that ignites from a
 * singularity, weaves an entanglement network, fires entanglement flashes and
 * lights up around the cursor (a gravity well). Camera-only parallax keeps it
 * comfortable; a quality tier + offscreen pause keep it fast everywhere.
 * ========================================================================== */

// Always-available pointer + scroll (work even under DOM overlays).
const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
const view = { fade: 1 }

const PALETTE = {
  cyan: new THREE.Color('#3FD2E8'),
  glow: new THREE.Color('#9bf1ff'),
  purple: new THREE.Color('#9D6FDB'),
  green: new THREE.Color('#3BF0B0'),
  gold: new THREE.Color('#FFC864'),
  blue: new THREE.Color('#4F86FF'),
}
const FLASH_COLORS = [PALETTE.glow, PALETTE.gold, PALETTE.cyan]

const TAU = Math.PI * 2
const GAZE = new THREE.Vector3(0.8, 0, 0)

/* Gaussian-ish random for natural scatter. */
function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
}

function makeGlowTexture() {
  const s = 128
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0.0, 'rgba(255,255,255,1)')
  g.addColorStop(0.18, 'rgba(255,255,255,0.85)')
  g.addColorStop(0.4, 'rgba(255,255,255,0.32)')
  g.addColorStop(0.75, 'rgba(255,255,255,0.06)')
  g.addColorStop(1.0, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeNebulaTexture() {
  const s = 256
  const c = document.createElement('canvas')
  c.width = c.height = s
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2)
  g.addColorStop(0.0, 'rgba(255,255,255,0.55)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.18)')
  g.addColorStop(0.7, 'rgba(255,255,255,0.04)')
  g.addColorStop(1.0, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* Comet streak: faint tapering tail on the left, bright round head on the right. */
function makeCometTexture() {
  const w = 256
  const h = 64
  const c = document.createElement('canvas')
  c.width = w
  c.height = h
  const ctx = c.getContext('2d')!
  const lin = ctx.createLinearGradient(0, 0, w, 0)
  lin.addColorStop(0.0, 'rgba(255,255,255,0)')
  lin.addColorStop(0.5, 'rgba(255,255,255,0.12)')
  lin.addColorStop(0.82, 'rgba(255,255,255,0.55)')
  lin.addColorStop(1.0, 'rgba(255,255,255,1)')
  ctx.fillStyle = lin
  ctx.fillRect(0, 0, w, h)
  const head = ctx.createRadialGradient(w - h / 2, h / 2, 0, w - h / 2, h / 2, h / 2)
  head.addColorStop(0, 'rgba(255,255,255,1)')
  head.addColorStop(0.5, 'rgba(255,255,255,0.55)')
  head.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = head
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'destination-in'
  const vert = ctx.createLinearGradient(0, 0, 0, h)
  vert.addColorStop(0.0, 'rgba(0,0,0,0)')
  vert.addColorStop(0.5, 'rgba(0,0,0,1)')
  vert.addColorStop(1.0, 'rgba(0,0,0,0)')
  ctx.fillStyle = vert
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'source-over'
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

/* ----------------------------------------------------------------------------
 * Star shader: genesis expansion, Heisenberg jitter, twinkle, glow sprite,
 * scroll fade and an optional cursor gravity well (screen-space brightening).
 * -------------------------------------------------------------------------- */
const STAR_VERTEX = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uDpr;
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uInteractive;
  varying vec3 vColor;
  varying float vGlow;
  varying float vHot;

  float easeOutCubic(float t){ t = clamp(t,0.0,1.0); return 1.0 - pow(1.0 - t, 3.0); }

  void main(){
    vColor = aColor;

    float stagger = fract(aSeed * 3.7) * 0.5;
    float travel = clamp((uProgress - stagger) / 0.5, 0.0, 1.0);
    float eased = easeOutCubic(travel);

    float radial = length(position);
    vec3 dir = radial > 0.001 ? normalize(position) : vec3(0.0,0.0,1.0);
    vec3 tangent = normalize(cross(vec3(0.0,1.0,0.0), dir) + vec3(0.0001));
    float swirl = sin(eased * 3.14159) * radial * 0.18;
    vec3 pos = mix(vec3(0.0), position, eased) + tangent * swirl;

    float j = step(0.99, travel);
    pos += j * vec3(
      sin(uTime * 1.7 + aSeed * 17.3),
      sin(uTime * 1.3 + aSeed * 31.7),
      sin(uTime * 1.1 + aSeed * 47.1)
    ) * 0.03;

    float twinkle = 0.6 + 0.4 * sin(uTime * 1.8 + aSeed * 6.28);
    vGlow = twinkle * eased;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float size = aScale * uSize * (0.55 + 0.45 * twinkle) * eased;
    gl_PointSize = clamp(size * (300.0 / -mv.z), 0.0, 90.0) * uDpr;
    gl_Position = projectionMatrix * mv;

    // Cursor gravity well: brighten + enlarge nodes near the pointer (NDC space).
    vec2 ndc = gl_Position.xy / max(gl_Position.w, 0.0001);
    vec2 d = ndc - uMouse;
    d.x *= uAspect;
    float infl = uInteractive * smoothstep(0.22, 0.0, length(d)) * eased;
    vHot = infl;
    gl_PointSize *= (1.0 + infl * 0.7);
  }
`

const STAR_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uMap;
  uniform float uFade;
  varying vec3 vColor;
  varying float vGlow;
  varying float vHot;
  void main(){
    vec4 tex = texture2D(uMap, gl_PointCoord);
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.32, 0.0, d);
    vec3 col = vColor * vGlow + vec3(1.0) * core * 0.45 * vGlow;
    col += vColor * vHot * 0.4 + vec3(0.08) * vHot;
    float a = tex.a * vGlow * (1.0 + vHot * 0.4) * uFade;
    gl_FragColor = vec4(col, a);
  }
`

type StarField = {
  positions: Float32Array
  colors: Float32Array
  scales: Float32Array
  seeds: Float32Array
}

function buildGalaxy(count: number, maxR: number): StarField {
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const seeds = new Float32Array(count)
  const ARMS = 3
  const SPIN = 2.3
  const c = new THREE.Color()

  for (let i = 0; i < count; i++) {
    const haloStar = Math.random() < 0.18
    let x: number, y: number, z: number, rNorm: number

    if (haloStar) {
      const r = maxR * (0.5 + Math.random() * 0.7)
      const theta = Math.random() * TAU
      const phi = Math.acos(2 * Math.random() - 1)
      x = r * Math.sin(phi) * Math.cos(theta)
      y = r * Math.cos(phi) * 0.6
      z = r * Math.sin(phi) * Math.sin(theta)
      rNorm = Math.min(r / maxR, 1)
    } else {
      const r = Math.pow(Math.random(), 0.62) * maxR
      rNorm = r / maxR
      const arm = (i % ARMS) / ARMS * TAU
      const scatter = 0.12 + rNorm * 0.42
      const angle = arm + r * SPIN + gauss() * scatter
      x = Math.cos(angle) * r + gauss() * scatter * 0.6
      z = Math.sin(angle) * r + gauss() * scatter * 0.6
      y = gauss() * (0.55 - rNorm * 0.35)
    }

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    const t = Math.random()
    if (Math.random() < 0.04) c.copy(PALETTE.gold)
    else if (rNorm < 0.32) c.copy(PALETTE.purple).lerp(PALETTE.gold, t * 0.5)
    else if (t < 0.6) c.copy(PALETTE.cyan).lerp(PALETTE.glow, Math.random() * 0.5)
    else if (t < 0.85) c.copy(PALETTE.purple)
    else c.copy(PALETTE.green)
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b

    scales[i] = (0.35 + Math.random() * 0.7) * (1.0 - rNorm * 0.35)
    seeds[i] = Math.random()
  }
  return { positions, colors, scales, seeds }
}

function buildNetwork(count: number, radius: number) {
  const pts: THREE.Vector3[] = []
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const seeds = new Float32Array(count)
  const c = new THREE.Color()
  for (let i = 0; i < count; i++) {
    const v = new THREE.Vector3(gauss(), gauss() * 0.5, gauss())
    if (v.length() < 0.001) v.set(0, 0, 1)
    v.normalize().multiplyScalar(radius * (0.35 + Math.random() * 0.7))
    pts.push(v)
    positions[i * 3] = v.x
    positions[i * 3 + 1] = v.y
    positions[i * 3 + 2] = v.z
    const isBridge = Math.random() < 0.12
    if (isBridge) c.copy(PALETTE.gold)
    else {
      const r = Math.random()
      c.copy(r < 0.62 ? PALETTE.cyan : r < 0.85 ? PALETTE.purple : PALETTE.green)
    }
    colors[i * 3] = c.r
    colors[i * 3 + 1] = c.g
    colors[i * 3 + 2] = c.b
    scales[i] = isBridge ? 2.6 + Math.random() * 1.2 : 1.1 + Math.random() * 1.1
    seeds[i] = Math.random()
  }
  const linePos: number[] = []
  const lineSeed: number[] = []
  const lineEnd: number[] = []
  const maxDist = radius * 0.42
  for (let i = 0; i < count; i++) {
    let links = 0
    for (let j = i + 1; j < count && links < 3; j++) {
      if (pts[i].distanceTo(pts[j]) < maxDist) {
        linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        const s = Math.random()
        lineSeed.push(s, s)
        lineEnd.push(0, 1)
        links++
      }
    }
  }
  return {
    field: { positions, colors, scales, seeds } as StarField,
    pts,
    lines: new Float32Array(linePos),
    lineSeeds: new Float32Array(lineSeed),
    lineEnds: new Float32Array(lineEnd),
  }
}

function Stars({
  field,
  size,
  progress,
  interactive = false,
}: {
  field: StarField
  size: number
  progress: React.MutableRefObject<number>
  interactive?: boolean
}) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const map = useMemo(makeGlowTexture, [])
  const { gl, size: viewport } = useThree()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: size },
      uDpr: { value: Math.min(gl.getPixelRatio(), 2) },
      uMap: { value: map },
      uFade: { value: 1 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAspect: { value: 1 },
      uInteractive: { value: interactive ? 1 : 0 },
    }),
    [map, size, gl, interactive],
  )
  useFrame((s) => {
    const u = mat.current?.uniforms
    if (!u) return
    u.uTime.value = s.clock.elapsedTime
    u.uProgress.value = progress.current
    u.uFade.value = view.fade
    if (interactive) {
      u.uMouse.value.set(mouse.tx, -mouse.ty)
      u.uAspect.value = viewport.width / viewport.height
    }
  })
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[field.positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[field.colors, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[field.scales, 1]} />
        <bufferAttribute attach="attributes-aSeed" args={[field.seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={STAR_VERTEX}
        fragmentShader={STAR_FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

const BOND_VERTEX = /* glsl */ `
  attribute float aSeed;
  attribute float aEnd;
  uniform float uProgress;
  varying float vSeed;
  varying float vEnd;
  void main(){
    vSeed = aSeed;
    vEnd = aEnd;
    vec4 mv = modelViewMatrix * vec4(position * clamp(uProgress, 0.0, 1.0), 1.0);
    gl_Position = projectionMatrix * mv;
  }
`
const BOND_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform float uProgress;
  uniform float uFade;
  uniform vec3 uColor;
  varying float vSeed;
  varying float vEnd;
  void main(){
    float p = clamp(uProgress, 0.0, 1.0);
    float flow = 0.4 + 0.4 * sin(uTime * 1.1 + vSeed * 18.0);
    float head = fract(uTime * 0.22 + vSeed);
    float pulse = smoothstep(0.16, 0.0, abs(vEnd - head));
    vec3 col = uColor + vec3(0.45, 0.65, 0.8) * pulse;
    float alpha = (0.13 * flow + pulse * 0.6) * p * uFade;
    gl_FragColor = vec4(col, alpha);
  }
`

function Bonds({
  lines,
  seeds,
  ends,
  progress,
}: {
  lines: Float32Array
  seeds: Float32Array
  ends: Float32Array
  progress: React.MutableRefObject<number>
}) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uProgress: { value: 0 }, uFade: { value: 1 }, uColor: { value: PALETTE.cyan.clone() } }),
    [],
  )
  useFrame((s) => {
    const u = mat.current?.uniforms
    if (!u) return
    u.uTime.value = s.clock.elapsedTime
    u.uProgress.value = progress.current
    u.uFade.value = view.fade
  })
  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aEnd" args={[ends, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={BOND_VERTEX}
        fragmentShader={BOND_FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  )
}

/* Entanglement flashes: bright arcs snap between distant nodes, then fade. */
function Flashes({ pts, progress, count = 3 }: { pts: THREE.Vector3[]; progress: React.MutableRefObject<number>; count?: number }) {
  const POINTS = 30
  type Flash = { line: THREE.Line; mat: THREE.LineBasicMaterial; t: number; dur: number; delay: number; spawned: boolean }
  const lines = useMemo(() => {
    const arr: Flash[] = []
    for (let i = 0; i < count; i++) {
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(POINTS * 3), 3))
      const mat = new THREE.LineBasicMaterial({
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        color: FLASH_COLORS[i % FLASH_COLORS.length].clone(),
      })
      arr.push({ line: new THREE.Line(geo, mat), mat, t: 0, dur: 1, delay: Math.random() * 3, spawned: false })
    }
    return arr
  }, [count])

  const spawn = (f: Flash) => {
    if (pts.length < 2) return
    const a = pts[Math.floor(Math.random() * pts.length)]
    let b = pts[Math.floor(Math.random() * pts.length)]
    let guard = 0
    while ((b === a || a.distanceTo(b) < 3) && guard++ < 8) b = pts[Math.floor(Math.random() * pts.length)]
    const dir = b.clone().sub(a)
    const len = dir.length()
    const perp = new THREE.Vector3(0, 1, 0).cross(dir)
    if (perp.lengthSq() < 0.0001) perp.set(1, 0, 0)
    perp.normalize()
    const mid = a.clone().add(b).multiplyScalar(0.5).add(perp.multiplyScalar(len * 0.28)).add(new THREE.Vector3(0, len * 0.18, 0))
    const curve = new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone())
    const samples = curve.getPoints(POINTS - 1)
    const attr = f.line.geometry.getAttribute('position') as THREE.BufferAttribute
    for (let i = 0; i < POINTS; i++) attr.setXYZ(i, samples[i].x, samples[i].y, samples[i].z)
    attr.needsUpdate = true
    f.t = 0
    f.dur = 0.8 + Math.random() * 0.9
    f.mat.color.copy(FLASH_COLORS[Math.floor(Math.random() * FLASH_COLORS.length)])
    f.spawned = true
  }

  useFrame((_s, delta) => {
    const ready = progress.current > 0.9
    for (const f of lines) {
      if (!ready) {
        f.mat.opacity = 0
        continue
      }
      if (f.delay > 0) {
        f.delay -= delta
        continue
      }
      if (!f.spawned) spawn(f)
      f.t += delta
      const k = f.t / f.dur
      if (k >= 1) {
        f.mat.opacity = 0
        f.spawned = false
        f.delay = 0.6 + Math.random() * 3.0
      } else {
        f.mat.opacity = Math.sin(k * Math.PI) * 0.85 * view.fade
      }
    }
  })

  return (
    <group>
      {lines.map((f, i) => (
        <primitive key={i} object={f.line} />
      ))}
    </group>
  )
}

function Nebula({ count = 6 }: { count?: number }) {
  const map = useMemo(makeNebulaTexture, [])
  const clouds = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number; color: THREE.Color; phase: number }[] = []
    const cols = [PALETTE.cyan, PALETTE.purple, PALETTE.green, PALETTE.blue, PALETTE.purple, PALETTE.cyan]
    for (let i = 0; i < count; i++) {
      arr.push({
        pos: [gauss() * 6, gauss() * 3.2, -3 - Math.random() * 5],
        scale: 7 + Math.random() * 7,
        color: cols[i % cols.length],
        phase: Math.random() * TAU,
      })
    }
    return arr
  }, [count])
  const refs = useRef<(THREE.Sprite | null)[]>([])
  useFrame((s) => {
    const t = s.clock.elapsedTime
    clouds.forEach((c, i) => {
      const sp = refs.current[i]
      if (sp) {
        sp.position.x = c.pos[0] + Math.sin(t * 0.08 + c.phase) * 0.7
        sp.position.y = c.pos[1] + Math.cos(t * 0.06 + c.phase) * 0.5
        ;(sp.material as THREE.SpriteMaterial).opacity = 0.17 * view.fade
      }
    })
  })
  return (
    <group>
      {clouds.map((c, i) => (
        <sprite key={i} ref={(el) => (refs.current[i] = el)} position={c.pos} scale={[c.scale, c.scale, 1]}>
          <spriteMaterial map={map} color={c.color} transparent opacity={0.17} depthWrite={false} blending={THREE.AdditiveBlending} />
        </sprite>
      ))}
    </group>
  )
}

function CoreGlow() {
  const map = useMemo(makeGlowTexture, [])
  const ref = useRef<THREE.Sprite>(null)
  useFrame((s) => {
    if (ref.current) {
      const p = 1.0 + Math.sin(s.clock.elapsedTime * 1.2) * 0.06
      ref.current.scale.set(3.4 * p, 3.4 * p, 1)
      ;(ref.current.material as THREE.SpriteMaterial).opacity = 0.55 * view.fade
    }
  })
  return (
    <sprite ref={ref} position={[0, 0, 0]} scale={[3.4, 3.4, 1]}>
      <spriteMaterial map={map} color={PALETTE.glow} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  )
}

/* Occasional shooting stars sweeping across the field (high tier only). */
function Comets({ progress, count = 2 }: { progress: React.MutableRefObject<number>; count?: number }) {
  const map = useMemo(makeCometTexture, [])
  type Comet = {
    mesh: THREE.Mesh
    mat: THREE.MeshBasicMaterial
    from: THREE.Vector3
    to: THREE.Vector3
    t: number
    dur: number
    delay: number
    live: boolean
  }
  const comets = useMemo(() => {
    const arr: Comet[] = []
    for (let i = 0; i < count; i++) {
      const geo = new THREE.PlaneGeometry(1, 1)
      const mat = new THREE.MeshBasicMaterial({
        map,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        color: (i % 2 ? PALETTE.glow : PALETTE.cyan).clone(),
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.frustumCulled = false
      arr.push({
        mesh,
        mat,
        from: new THREE.Vector3(),
        to: new THREE.Vector3(),
        t: 0,
        dur: 1,
        delay: 1.2 + Math.random() * 3.5,
        live: false,
      })
    }
    return arr
  }, [count, map])

  const spawn = (c: Comet) => {
    const z = 0.8 + Math.random() * 1.6
    const y0 = 3.0 + Math.random() * 1.4
    const y1 = 2.4 + Math.random() * 1.2
    const far = 8.5
    const bias = 1.4
    if (Math.random() < 0.5) {
      c.from.set(far - bias, y0, z)
      c.to.set(-far - bias, y1, z)
    } else {
      c.from.set(-far - bias, y0, z)
      c.to.set(far - bias, y1, z)
    }
    const len = 2.8 + Math.random() * 1.8
    const th = 0.05 + len * 0.018
    const dir = c.to.clone().sub(c.from)
    c.mesh.rotation.set(0, 0, Math.atan2(dir.y, dir.x))
    c.mesh.scale.set(len, th, 1)
    c.mat.color.copy(Math.random() < 0.5 ? PALETTE.glow : PALETTE.cyan)
    c.t = 0
    c.dur = 1.1 + Math.random() * 0.9
    c.live = true
  }

  useFrame((_s, delta) => {
    const ready = progress.current > 0.82
    for (const c of comets) {
      if (!ready || view.fade < 0.04) {
        c.mat.opacity = 0
        continue
      }
      if (!c.live) {
        c.delay -= delta
        if (c.delay <= 0) spawn(c)
        else {
          c.mat.opacity = 0
          continue
        }
      }
      c.t += delta
      const k = c.t / c.dur
      if (k >= 1) {
        c.live = false
        c.mat.opacity = 0
        c.delay = 2.0 + Math.random() * 4.5
        continue
      }
      c.mesh.position.copy(c.from).lerp(c.to, k)
      c.mat.opacity = Math.sin(k * Math.PI) * 0.98 * view.fade
    }
  })

  return (
    <group>
      {comets.map((c, i) => (
        <primitive key={i} object={c.mesh} />
      ))}
    </group>
  )
}

function Universe({ quality }: { quality: Quality }) {
  const group = useRef<THREE.Group>(null)
  const progress = useRef(0)
  const galaxy = useMemo(() => buildGalaxy(quality === 'low' ? 1500 : 4200, 6.2), [quality])
  const network = useMemo(() => buildNetwork(quality === 'low' ? 120 : 190, 5.0), [quality])

  const reduced = useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  if (reduced && progress.current === 0) progress.current = 1

  useFrame((state, delta) => {
    if (progress.current < 1) progress.current = Math.min(1, progress.current + delta / 2.6)
    mouse.tx += (mouse.x - mouse.tx) * 0.04
    mouse.ty += (mouse.y - mouse.ty) * 0.04
    if (group.current && !reduced) group.current.rotation.y += delta * 0.03
    const cam = state.camera
    const ax = reduced ? 0 : mouse.tx * 0.6
    const ay = reduced ? 0 : mouse.ty * 0.35
    cam.position.x += (ax - cam.position.x) * 0.03
    cam.position.y += (0.55 + ay - cam.position.y) * 0.03
    cam.lookAt(GAZE)
  })

  return (
    <>
      <group ref={group} position={[1.3, 0, 0]} rotation={[-0.95, 0, 0]}>
        <CoreGlow />
        <Nebula count={quality === 'low' ? 2 : 6} />
        <Stars field={galaxy} size={1.05} progress={progress} />
        <Bonds lines={network.lines} seeds={network.lineSeeds} ends={network.lineEnds} progress={progress} />
        <Stars field={network.field} size={1.25} progress={progress} interactive={quality === 'high'} />
        {quality === 'high' && <Flashes pts={network.pts} progress={progress} />}
      </group>
      {quality === 'high' && <Comets progress={progress} />}
    </>
  )
}

export default function EntangleScene() {
  const quality = useMemo(detectQuality, [])
  const [active, setActive] = useState(true)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onScroll = () => {
      const h = window.innerHeight * 0.85
      view.fade = Math.max(0, Math.min(1, 1 - window.scrollY / h))
    }
    onScroll()
    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Pause rendering while the hero is scrolled out of view.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <Canvas
        className="!absolute inset-0"
        frameloop={active ? 'always' : 'never'}
        dpr={quality === 'low' ? 1 : [1, 2]}
        camera={{ position: [0, 0.6, 11], fov: 52 }}
        gl={{ antialias: quality === 'high', alpha: false, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor('#05080f', 1)}
      >
        <Universe quality={quality} />
        {quality === 'high' && (
          <EffectComposer>
            <Bloom intensity={0.95} luminanceThreshold={0.0} luminanceSmoothing={0.9} mipmapBlur radius={0.72} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
