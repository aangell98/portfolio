import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function buildNetwork(count: number, radius: number) {
  const positions = new Float32Array(count * 3)
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    // distribute in a flattened sphere
    const v = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
    )
    v.normalize().multiplyScalar(radius * (0.55 + Math.random() * 0.45))
    v.z *= 0.6
    pts.push(v)
    positions[i * 3] = v.x
    positions[i * 3 + 1] = v.y
    positions[i * 3 + 2] = v.z
  }

  // connect near neighbors
  const linePos: number[] = []
  const maxDist = radius * 0.42
  for (let i = 0; i < count; i++) {
    let links = 0
    for (let j = i + 1; j < count && links < 3; j++) {
      if (pts[i].distanceTo(pts[j]) < maxDist) {
        linePos.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        links++
      }
    }
  }
  return { positions, lines: new Float32Array(linePos) }
}

function Network() {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const { positions, lines } = useMemo(() => buildNetwork(220, 4.2), [])

  const sprite = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const ctx = c.getContext('2d')!
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(127,233,255,1)')
    g.addColorStop(0.3, 'rgba(70,199,224,0.8)')
    g.addColorStop(1, 'rgba(70,199,224,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    const tex = new THREE.CanvasTexture(c)
    return tex
  }, [])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.08
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * 0.25, 0.05)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pointer.x * 0.12, 0.05)
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.02
    group.current.scale.setScalar(s)
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lines, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#2f7da0" transparent opacity={0.35} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          map={sprite}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#9becff"
        />
      </points>
    </group>
  )
}

export default function ParticleNetwork() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 9], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Network />
    </Canvas>
  )
}
