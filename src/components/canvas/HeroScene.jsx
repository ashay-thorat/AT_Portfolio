import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Preload, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ── Central Hero Object — Professional Modern ── */
const HeroCore = ({ mouse }) => {
  const meshRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = mouse?.x || 0;
    const my = mouse?.y || 0;

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, my * 0.35 + t * 0.05, 0.04);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mx * 0.35 + t * 0.08, 0.04);
    }
    if (ring1.current) { ring1.current.rotation.x = t * 0.22; ring1.current.rotation.z = t * 0.12; }
    if (ring2.current) { ring2.current.rotation.y = t * 0.32; ring2.current.rotation.x = Math.PI / 3 + t * 0.10; }
    if (ring3.current) { ring3.current.rotation.z = t * -0.18; ring3.current.rotation.y = Math.PI / 4 + t * 0.08; }
  });

  return (
    <group>
      {/* Outer diffuse atmosphere */}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>

      {/* Core — Obsidian/Silver TorusKnot */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
        <mesh ref={meshRef} castShadow>
          <torusKnotGeometry args={[0.75, 0.28, 220, 20, 2, 3]} />
          <MeshDistortMaterial
            color="#18181b"
            emissive="#3b82f6"
            emissiveIntensity={0.15}
            roughness={0.08}
            metalness={0.9}
            distort={0.15}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Orbital rings — Silver/Azure wireframe */}
      {[
        { ref: ring1, r: 1.65, tube: 0.012, opacity: 0.5, color: '#fafafa' },
        { ref: ring2, r: 1.95, tube: 0.008, opacity: 0.3, color: '#3b82f6' },
        { ref: ring3, r: 2.20, tube: 0.006, opacity: 0.2, color: '#ffffff' },
      ].map(({ ref, r, tube, opacity, color }, i) => (
        <mesh key={i} ref={ref}>
          <torusGeometry args={[r, tube, 12, 160]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} />
        </mesh>
      ))}
    </group>
  );
};

/* ── Particle Field — Professional ── */
const ParticleField = () => {
  const count = 800;
  const ref = useRef();
  const positions = new Float32Array(count * 3);
  const opacities = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const r = 4 + Math.random() * 6;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) - 1.5;
    opacities[i] = Math.random();
  }

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.getElapsedTime() * 0.015;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.02}
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Scene Root ── */
const HeroScene = ({ mouse }) => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.2} />
        <pointLight position={[0, 8, 8]}   intensity={3} color="#ffffff" />
        <pointLight position={[-8, -4, 6]} intensity={2} color="#3b82f6" />
        <pointLight position={[8, 4, -6]}  intensity={1} color="#60a5fa" />
        <spotLight position={[0, -6, 6]} intensity={1.5} color="#3b82f6" angle={0.5} penumbra={1} />
        <HeroCore mouse={mouse} />
        <ParticleField />
        <Preload all />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
