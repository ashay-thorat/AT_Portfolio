import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import SectionWrapper from '../ui/SectionWrapper';
import { aboutData } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { WordReveal, BlurReveal } from '../ui/TextReveal';
import AnimatedCounter from '../ui/AnimatedCounter';

/* ── Premium Wireframe Orb ── */
const OrbScene = () => {
  const coreRef = useRef();
  const r1 = useRef(), r2 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mx = state.mouse.x;
    const my = state.mouse.y;

    if (coreRef.current) {
      // Smooth floating rotation + mouse parallax
      coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, t * 0.35 + mx * 0.3, 0.05);
      coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, Math.sin(t * 0.45) * 0.18 - my * 0.3, 0.05);
    }
    if (r1.current) {
      r1.current.rotation.x = t * 0.42;
      r1.current.rotation.z = t * 0.22;
      // Soft pulse glow on ring 1
      r1.current.material.opacity = 0.35 + Math.sin(t * 2) * 0.15;
    }
    if (r2.current) {
      r2.current.rotation.y = t * 0.55;
      r2.current.rotation.x = Math.PI / 3 + t * 0.18;
      // Soft pulse glow on ring 2
      r2.current.material.opacity = 0.2 + Math.cos(t * 1.5) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={3} color="#fafafa" />
      <pointLight position={[-3, -2, 2]} intensity={2} color="#3b82f6" />
      <spotLight position={[0, 5, 3]} intensity={1.5} color="#60a5fa" angle={0.5} penumbra={1} />

      {/* Glow atmosphere */}
      <mesh>
        <sphereGeometry args={[1.3, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

      {/* Core — Obsidian metallic icosahedron */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.1, 2]} />
        <meshStandardMaterial
          color="#18181b"
          emissive="#3b82f6"
          emissiveIntensity={0.08}
          roughness={0.1}
          metalness={0.9}
          wireframe
        />
      </mesh>

      {/* Rings — Silver & Azure */}
      <mesh ref={r1}>
        <torusGeometry args={[1.7, 0.015, 12, 140]} />
        <meshBasicMaterial color="#fafafa" transparent opacity={0.4} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[2.05, 0.01, 12, 140]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.25} />
      </mesh>

      {/* Soft shadow beneath for depth */}
      <ContactShadows position={[0, -2.2, 0]} opacity={0.3} scale={6} blur={2.5} far={4} color="#3b82f6" />
    </>
  );
};

/* ── Stat Card ── */
const StatCard = ({ stat, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', 'spring', index * 0.1, 0.65)}
      style={{
        padding: '28px 24px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-light)',
        borderRadius: '20px',
        textAlign: 'center',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      whileHover={{
        background: 'var(--bg-glass-hover)',
        borderColor: 'var(--accent-primary)',
        y: -6,
        boxShadow: '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px var(--accent-glow-subtle)',
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '50px', height: '50px',
        background: 'radial-gradient(circle at top right, var(--neon-cyan-glow), transparent 70%)',
        borderRadius: '0 16px 0 0',
      }} />
      <div style={{
        fontSize: 'clamp(2rem, 4vw, 2.6rem)',
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        color: '#ffffff',
        marginBottom: '8px',
        lineHeight: 1,
      }}>
        {isInView ? <AnimatedCounter target={stat.value} /> : '0'}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 500 }}>
        {stat.label}
      </div>
    </motion.div>
  );
};

const About = () => (
  <SectionWrapper id="about">
    <WordReveal delay={0.1} as="p" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--accent-secondary)', marginBottom: '12px', fontWeight: 600 }}>
      Introduction
    </WordReveal>
    <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '56px', color: '#fff' }}>
      About Me
    </WordReveal>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>

      {/* Left — 3D Orb */}
      <motion.div
        variants={fadeIn('right', 'tween', 0.2, 0.8)}
        style={{ position: 'relative', height: '360px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* Subtle glow and noise backdrop */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at center, var(--neon-cyan-glow) 0%, transparent 60%)',
          boxShadow: '0 0 80px rgba(0,240,255,0.05) inset',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true, antialias: true }} style={{ width: '100%', height: '100%', background: 'transparent' }}>
          <OrbScene />
        </Canvas>
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
            padding: '6px 18px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-light)',
            borderRadius: '100px',
            fontSize: '0.75rem', color: 'var(--accent-light)',
            letterSpacing: '0.05em', whiteSpace: 'nowrap',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          Software Developer
        </motion.div>
      </motion.div>

      {/* Right — text + stats */}
      <motion.div variants={fadeIn('left', 'tween', 0.3, 0.8)}>
        <BlurReveal delay={0.3} as="p" style={{
          fontSize: 'clamp(1rem, 2vw, 1.1rem)',
          color: 'var(--text-secondary)',
          lineHeight: 1.85,
          marginBottom: '36px',
          fontWeight: 300,
        }}>
          {aboutData.intro}
        </BlurReveal>

        {/* Tech chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
          {['React', 'Next.js', 'Node.js', 'Three.js', 'TypeScript', 'PostgreSQL'].map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.05 }}
              style={{
                padding: '5px 13px',
                fontSize: '0.75rem', fontWeight: 600,
                fontFamily: 'var(--font-body)',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '20px',
                color: 'var(--text-secondary)',
                letterSpacing: '0.4px',
                transition: 'all 0.2s ease',
                cursor: 'default',
              }}
              whileHover={{ color: '#ffffff', borderColor: 'var(--accent-primary)', background: 'var(--bg-glass-hover)', boxShadow: '0 4px 12px var(--accent-glow-subtle)' }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {aboutData.highlights.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </motion.div>
    </div>
  </SectionWrapper>
);

export default About;
