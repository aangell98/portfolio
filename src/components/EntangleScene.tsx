import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* Iridescent fresnel shader: deep navy core, cyan-to-violet rim glow */
const vertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 3.0);
    float t = 0.5 + 0.5 * sin(uTime * 0.6 + vNormal.x * 2.0 + vNormal.y * 1.5);
    vec3 rim = mix(uColorA, uColorB, t);
    vec3 core = vec3(0.02, 0.04, 0.09);
    vec3 col = core + rim * fres * 1.1;
    float alpha = clamp(fres * 0.95, 0.0, 0.85);
    gl_FragColor = vec4(col, alpha);
  }
`

function Knot({ color, rotationSpeed, tilt }: { color: [string, string]; rotationSpeed: number; tilt: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(color[0]) },
      uColorB: { value: new THREE.Color(color[1]) },
    }),
    [color],
  )

  useFrame((state, delta) => {
    if (mat.current) mat.current.uniforms.uTime.value = state.clock.elapsedTime
    if (mesh.current) {
      mesh.current.rotation.y += delta * rotationSpeed
      mesh.current.rotation.z += delta * rotationSpeed * 0.4
    }
  })

  return (
    <mesh ref={mesh} rotation={[tilt, 0, 0]}>
      <torusKnotGeometry args={[1.25, 0.34, 200, 28, 2, 3]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={vertex}
        fragmentShader={fragment}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Sparkles({ count = 90 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const { positions, sprite } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(127,233,255,1)')
    g.addColorStop(1, 'rgba(127,233,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    return { positions: pos, sprite: new THREE.CanvasTexture(c) }
  }, [count])

  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.03
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={sprite}
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#9becff"
      />
    </points>
  )
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.4, 0.04)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.3, 0.04)
  })
  return <group ref={group}>{children}</group>
}

export default function EntangleScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <Rig>
        <group position={[0.6, 0, 0]} scale={0.9}>
          <Knot color={['#46C7E0', '#7fe9ff']} rotationSpeed={0.18} tilt={0.5} />
          <group rotation={[0, Math.PI / 2, Math.PI / 3]}>
            <Knot color={['#8b5cf6', '#a78bfa']} rotationSpeed={-0.14} tilt={0.2} />
          </group>
        </group>
        <Sparkles />
      </Rig>
    </Canvas>
  )
}
