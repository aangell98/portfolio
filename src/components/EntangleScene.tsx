import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Global, always-available pointer (works even when overlays sit above the canvas)
const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

const pointVertex = /* glsl */ `
  attribute float aScale;
  attribute float aPhase;
  uniform float uTime;
  uniform float uSize;
  varying float vTwinkle;
  void main() {
    vTwinkle = 0.55 + 0.45 * sin(uTime * 1.6 + aPhase);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aScale * uSize * vTwinkle * (60.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const pointFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vTwinkle;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.05, d);
    vec3 col = mix(uColorA, uColorB, vTwinkle);
    gl_FragColor = vec4(col, core * (0.45 + 0.45 * vTwinkle));
  }
`

function buildGraph(count: number, radius: number) {
  const pts: THREE.Vector3[] = []
  const positions = new Float32Array(count * 3)
  const scales = new Float32Array(count)
  const phases = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    // gently flattened sphere shell
    const v = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
    )
    v.normalize().multiplyScalar(radius * (0.45 + Math.random() * 0.55))
    v.z *= 0.65
    pts.push(v)
    positions[i * 3] = v.x
    positions[i * 3 + 1] = v.y
    positions[i * 3 + 2] = v.z
    scales[i] = 0.6 + Math.random() * 1.4
    phases[i] = Math.random() * Math.PI * 2
  }
  // connect near neighbors (static topology in local space)
  const linePos: number[] = []
  const maxDist = radius * 0.4
  for (let i = 0; i < count; i++) {
    let links = 0
    for (let j = i + 1; j < count && links < 3; j++) {
      if (pts[i].distanceTo(pts[j]) < maxDist) {
        linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        links++
      }
    }
  }
  return { positions, scales, phases, lines: new Float32Array(linePos), pts }
}

function Constellation() {
  const group = useRef<THREE.Group>(null)
  const pointsMat = useRef<THREE.ShaderMaterial>(null)
  const { positions, scales, phases, lines } = useMemo(() => buildGraph(180, 4.4), [])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 4.5 },
      uColorA: { value: new THREE.Color('#46C7E0') },
      uColorB: { value: new THREE.Color('#a78bfa') },
    }),
    [],
  )

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (pointsMat.current) pointsMat.current.uniforms.uTime.value = t
    // ease global mouse
    mouse.tx += (mouse.x - mouse.tx) * 0.06
    mouse.ty += (mouse.y - mouse.ty) * 0.06
    if (group.current) {
      group.current.rotation.y += delta * 0.05
      // parallax toward cursor (always responsive, tracked on window)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.ty * 0.5, 0.08)
      group.current.rotation.y += (mouse.tx * 0.0009)
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.tx * 0.6, 0.06)
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -mouse.ty * 0.4, 0.06)
    }
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#3f9ec4" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={pointsMat}
          uniforms={uniforms}
          vertexShader={pointVertex}
          fragmentShader={pointFragment}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
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
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Constellation />
    </Canvas>
  )
}
