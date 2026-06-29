import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* Classic GLSL simplex noise (Ashima) for organic vertex displacement */
const noiseGLSL = /* glsl */ `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const vertex = /* glsl */ `
  uniform float uTime;
  uniform float uAmp;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;
  ${noiseGLSL}
  void main(){
    float n = snoise(normal * 1.4 + uTime * 0.28);
    float n2 = snoise(normal * 3.0 - uTime * 0.18) * 0.5;
    float disp = (n + n2) * uAmp;
    vDisp = disp;
    vec3 pos = position + normal * disp;
    vec4 mv = modelViewMatrix * vec4(pos,1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const fragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vNormal;
  varying vec3 vView;
  varying float vDisp;
  void main(){
    float fres = pow(1.0 - max(dot(vNormal, vView), 0.0), 2.2);
    vec3 grad = mix(uColorA, uColorB, clamp(vDisp * 1.6 + 0.5, 0.0, 1.0));
    vec3 core = vec3(0.04, 0.08, 0.16);
    vec3 col = core + grad * (fres * 1.4 + 0.12);
    gl_FragColor = vec4(col, 1.0);
  }
`

function Orb() {
  const solid = useRef<THREE.Mesh>(null)
  const wire = useRef<THREE.LineSegments>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const geo = useMemo(() => new THREE.IcosahedronGeometry(2, 24), [])
  const wireGeo = useMemo(() => new THREE.IcosahedronGeometry(2.06, 5), [])
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmp: { value: 0.34 },
      uColorA: { value: new THREE.Color('#46C7E0') },
      uColorB: { value: new THREE.Color('#8b5cf6') },
    }),
    [],
  )

  // shared wobble for wireframe so it tracks the solid
  const wireUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uAmp: { value: 0.34 } }),
    [],
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t
    wireUniforms.uTime.value = t
    if (solid.current) solid.current.rotation.y = t * 0.12
    if (wire.current) wire.current.rotation.y = t * 0.12
  })

  const wireMat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: wireUniforms,
        vertexShader: vertex.replace('varying float vDisp;', 'varying float vDisp;').replace('vNormal = normalize(normalMatrix * normal);\n    vView = normalize(-mv.xyz);', ''),
        fragmentShader: `precision highp float; varying float vDisp; void main(){ gl_FragColor = vec4(mix(vec3(0.27,0.78,0.88), vec3(0.55,0.36,0.96), clamp(vDisp*1.6+0.5,0.0,1.0)), 0.5); }`,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [wireUniforms],
  )

  return (
    <group>
      <mesh ref={solid} geometry={geo}>
        <shaderMaterial ref={matRef} uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} />
      </mesh>
      <lineSegments ref={wire} args={[new THREE.WireframeGeometry(wireGeo), wireMat]} />
    </group>
  )
}

function Field({ count = 120 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const { positions, sprite } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.2 + Math.random() * 3.5
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th)
      pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th)
      pos[i * 3 + 2] = r * Math.cos(ph)
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
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.04
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.11} map={sprite} transparent opacity={0.8} depthWrite={false} blending={THREE.AdditiveBlending} color="#9becff" />
    </points>
  )
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  useFrame(() => {
    if (!group.current) return
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.45, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.3, 0.05)
  })
  return <group ref={group}>{children}</group>
}

export default function EntangleScene() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#7fe9ff" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#8b5cf6" />
      <Rig>
        <Orb />
        <Field />
      </Rig>
    </Canvas>
  )
}
