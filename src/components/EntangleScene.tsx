import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

/* ============================================================================
 * Quantum Universe — a reimagining of the Entangle (TFG) cosmic web.
 * A tilted spiral galaxy of glowing quantum nodes (cyan / purple / green / gold
 * "bridge" stars) that ignites from a singularity on load, drifts through a
 * nebula, and weaves an entanglement network. Mouse acts as a gentle gravity.
 * ========================================================================== */

// Always-available pointer (works even when DOM overlays sit above the canvas).
const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

const PALETTE = {
  cyan: new THREE.Color('#3FD2E8'),
  glow: new THREE.Color('#9bf1ff'),
  purple: new THREE.Color('#9D6FDB'),
  green: new THREE.Color('#3BF0B0'),
  gold: new THREE.Color('#FFC864'),
  blue: new THREE.Color('#4F86FF'),
}

const TAU = Math.PI * 2

// Point the camera looks at (the galaxy core sits a touch right of centre).
const GAZE = new THREE.Vector3(0.8, 0, 0)

/* Gaussian-ish random for natural scatter. */
function gauss() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5
}

/* Soft radial sprite for star halos (bright core, colored falloff). */
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

/* Very soft, wide sprite for nebula clouds. */
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

/* ----------------------------------------------------------------------------
 * Shared star shader: genesis expansion from a singularity, Heisenberg jitter,
 * twinkle, and a glow-textured radiant sprite.
 * -------------------------------------------------------------------------- */
const STAR_VERTEX = /* glsl */ `
  attribute float aScale;
  attribute float aSeed;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uDpr;
  varying vec3 vColor;
  varying float vGlow;

  float easeOutCubic(float t){ t = clamp(t,0.0,1.0); return 1.0 - pow(1.0 - t, 3.0); }

  void main(){
    vColor = aColor;

    // Staggered genesis: each star ignites and travels out from the core.
    float stagger = fract(aSeed * 3.7) * 0.5;
    float travel = clamp((uProgress - stagger) / 0.5, 0.0, 1.0);
    float eased = easeOutCubic(travel);

    // Swirl while travelling outward (galactic rotation feel).
    float radial = length(position);
    vec3 dir = radial > 0.001 ? normalize(position) : vec3(0.0,0.0,1.0);
    vec3 tangent = normalize(cross(vec3(0.0,1.0,0.0), dir) + vec3(0.0001));
    float swirl = sin(eased * 3.14159) * radial * 0.18;
    vec3 pos = mix(vec3(0.0), position, eased) + tangent * swirl;

    // Heisenberg jitter — quantum uncertainty once settled.
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
  }
`

const STAR_FRAGMENT = /* glsl */ `
  precision highp float;
  uniform sampler2D uMap;
  varying vec3 vColor;
  varying float vGlow;
  void main(){
    vec4 tex = texture2D(uMap, gl_PointCoord);
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.32, 0.0, d);
    vec3 col = vColor * vGlow + vec3(1.0) * core * 0.45 * vGlow;
    gl_FragColor = vec4(col, tex.a * vGlow);
  }
`

type StarField = {
  positions: Float32Array
  colors: Float32Array
  scales: Float32Array
  seeds: Float32Array
}

/* Spiral galaxy: dense warm core, cool sweeping arms, faint spherical halo. */
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
      // Spherical halo for depth.
      const r = maxR * (0.5 + Math.random() * 0.7)
      const theta = Math.random() * TAU
      const phi = Math.acos(2 * Math.random() - 1)
      x = r * Math.sin(phi) * Math.cos(theta)
      y = r * Math.cos(phi) * 0.6
      z = r * Math.sin(phi) * Math.sin(theta)
      rNorm = Math.min(r / maxR, 1)
    } else {
      // Spiral arm.
      const r = Math.pow(Math.random(), 0.62) * maxR
      rNorm = r / maxR
      const arm = (i % ARMS) / ARMS * TAU
      const scatter = 0.12 + rNorm * 0.42
      const angle = arm + r * SPIN + gauss() * scatter
      x = Math.cos(angle) * r + gauss() * scatter * 0.6
      z = Math.sin(angle) * r + gauss() * scatter * 0.6
      y = gauss() * (0.55 - rNorm * 0.35) // thinner disk outward
    }

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z

    // Colour: warm core (gold/purple) -> cool arms (cyan/green); rare bridge gold.
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

/* Foreground entanglement network: bright bonded nodes + filaments. */
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
  // Bonds between near neighbours (the collaboration web).
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
    lines: new Float32Array(linePos),
    lineSeeds: new Float32Array(lineSeed),
    lineEnds: new Float32Array(lineEnd),
  }
}

function Stars({ field, size, progress }: { field: StarField; size: number; progress: React.MutableRefObject<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const map = useMemo(makeGlowTexture, [])
  const { gl } = useThree()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: size },
      uDpr: { value: Math.min(gl.getPixelRatio(), 2) },
      uMap: { value: map },
    }),
    [map, size, gl],
  )
  useFrame((s) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value = s.clock.elapsedTime
      mat.current.uniforms.uProgress.value = progress.current
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
  uniform vec3 uColor;
  varying float vSeed;
  varying float vEnd;
  void main(){
    float p = clamp(uProgress, 0.0, 1.0);
    float flow = 0.4 + 0.4 * sin(uTime * 1.1 + vSeed * 18.0);
    // A packet of entanglement energy travels from one node to the other.
    float head = fract(uTime * 0.22 + vSeed);
    float pulse = smoothstep(0.16, 0.0, abs(vEnd - head));
    vec3 col = uColor + vec3(0.45, 0.65, 0.8) * pulse;
    float alpha = (0.13 * flow + pulse * 0.6) * p;
    gl_FragColor = vec4(col, alpha);
  }
`

function Bonds({ lines, seeds, ends, progress }: { lines: Float32Array; seeds: Float32Array; ends: Float32Array; progress: React.MutableRefObject<number> }) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uProgress: { value: 0 }, uColor: { value: PALETTE.cyan.clone() } }),
    [],
  )
  useFrame((s) => {
    if (mat.current) {
      mat.current.uniforms.uTime.value = s.clock.elapsedTime
      mat.current.uniforms.uProgress.value = progress.current
    }
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

function Nebula() {
  const map = useMemo(makeNebulaTexture, [])
  const clouds = useMemo(() => {
    const arr: { pos: [number, number, number]; scale: number; color: THREE.Color; phase: number }[] = []
    const cols = [PALETTE.cyan, PALETTE.purple, PALETTE.green, PALETTE.blue, PALETTE.purple, PALETTE.cyan]
    for (let i = 0; i < cols.length; i++) {
      arr.push({
        pos: [gauss() * 6, gauss() * 3.2, -3 - Math.random() * 5],
        scale: 7 + Math.random() * 7,
        color: cols[i],
        phase: Math.random() * TAU,
      })
    }
    return arr
  }, [])
  const refs = useRef<(THREE.Sprite | null)[]>([])
  useFrame((s) => {
    const t = s.clock.elapsedTime
    clouds.forEach((c, i) => {
      const sp = refs.current[i]
      if (sp) {
        sp.position.x = c.pos[0] + Math.sin(t * 0.08 + c.phase) * 0.7
        sp.position.y = c.pos[1] + Math.cos(t * 0.06 + c.phase) * 0.5
      }
    })
  })
  return (
    <group>
      {clouds.map((c, i) => (
        <sprite key={i} ref={(el) => (refs.current[i] = el)} position={c.pos} scale={[c.scale, c.scale, 1]}>
          <spriteMaterial
            map={map}
            color={c.color}
            transparent
            opacity={0.17}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
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
    }
  })
  return (
    <sprite ref={ref} position={[0, 0, 0]} scale={[3.4, 3.4, 1]}>
      <spriteMaterial map={map} color={PALETTE.glow} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
    </sprite>
  )
}

function Universe() {
  const group = useRef<THREE.Group>(null)
  const progress = useRef(0)
  const galaxy = useMemo(() => buildGalaxy(4200, 6.2), [])
  const network = useMemo(() => buildNetwork(190, 5.0), [])

  // Respect reduced-motion: skip the genesis and idle rotation.
  const reduced = useMemo(
    () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )
  if (reduced && progress.current === 0) progress.current = 1

  useFrame((state, delta) => {
    if (progress.current < 1) progress.current = Math.min(1, progress.current + delta / 2.6)
    // Heavily damped pointer for a calm, floaty feel.
    mouse.tx += (mouse.x - mouse.tx) * 0.04
    mouse.ty += (mouse.y - mouse.ty) * 0.04
    // The galaxy keeps a slow, constant spin and never reacts to the mouse
    // (reacting with the whole scene was what caused the motion sickness).
    if (group.current && !reduced) group.current.rotation.y += delta * 0.03
    // Comfortable depth: gently orbit the camera and always look at the core.
    const cam = state.camera
    const ax = reduced ? 0 : mouse.tx * 0.6
    const ay = reduced ? 0 : mouse.ty * 0.35
    cam.position.x += (ax - cam.position.x) * 0.03
    cam.position.y += (0.55 + ay - cam.position.y) * 0.03
    cam.lookAt(GAZE)
  })

  return (
    <group ref={group} position={[1.3, 0, 0]} rotation={[-0.95, 0, 0]}>
      <CoreGlow />
      <Nebula />
      <Stars field={galaxy} size={1.05} progress={progress} />
      <Bonds lines={network.lines} seeds={network.lineSeeds} ends={network.lineEnds} progress={progress} />
      <Stars field={network.field} size={1.25} progress={progress} />
    </group>
  )
}

export default function EntangleScene() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 11], fov: 52 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#05080f', 1)}
    >
      <Universe />
      <EffectComposer>
        <Bloom intensity={0.95} luminanceThreshold={0.0} luminanceSmoothing={0.9} mipmapBlur radius={0.72} />
      </EffectComposer>
    </Canvas>
  )
}
