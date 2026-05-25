import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Assembling Sphere — neon ── */
const AssemblingSphere = ({ progress }) => {
  const groupRef = useRef();
  const r1 = useRef(), r2 = useRef(), r3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.45;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.25;
    }
    [r1, r2, r3].forEach((r, i) => {
      if (r.current) {
        r.current.rotation.x = t * (0.35 + i * 0.12);
        r.current.rotation.z = t * (0.18 + i * 0.08);
      }
    });
  });

  const p = Math.min(progress / 100, 1);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]}  intensity={2.5} color="#00f0ff" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#b500ff" />

      {/* Core wireframe sphere */}
      <mesh scale={[p * 0.85, p * 0.85, p * 0.85]}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#0c0636"
          wireframe
          transparent
          opacity={0.4 + p * 0.4}
          emissive="#00f0ff"
          emissiveIntensity={0.2}
          metalness={1}
          roughness={0.05}
        />
      </mesh>

      {/* Orbital rings — neon */}
      {[1.35, 1.75, 2.15].map((r, i) => (
        <mesh key={i} ref={[r1, r2, r3][i]} scale={[p, p, p]}>
          <torusGeometry args={[r, 0.022, 8, 90]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#00f0ff" : "#b500ff"} transparent opacity={0.25 + p * 0.35} />
        </mesh>
      ))}
    </group>
  );
};

/* ── Boot sequence lines ── */
const BOOT_LINES = [
  'Initializing runtime environment...',
  'Loading 3D engine :: three.js v0.184',
  'Mounting React fiber renderer...',
  'Compiling shader programs...',
  'Configuring motion pipeline...',
  'Building interactive components...',
  'Portfolio ready.',
];

const Loader = ({ onComplete }) => {
  const [progress, setProgress]   = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [glitchName, setGlitchName] = useState('Ashay Thorat');

  const GLITCH = '█▓▒░#@&%$!?*';
  const NAME   = 'Ashay Thorat';

  /* Progress */
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(iv);
          setTimeout(() => { setIsVisible(false); onComplete?.(); }, 600);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 70);
    return () => clearInterval(iv);
  }, [onComplete]);

  /* Boot lines */
  useEffect(() => {
    const iv = setInterval(() => setLineIndex(p => Math.min(p + 1, BOOT_LINES.length - 1)), 310);
    return () => clearInterval(iv);
  }, []);

  /* Name glitch */
  useEffect(() => {
    let n = 0;
    const iv = setInterval(() => {
      n++;
      if (n > 14) { setGlitchName(NAME); clearInterval(iv); return; }
      setGlitchName(
        NAME.split('').map(c =>
          c !== ' ' && Math.random() > 0.55
            ? GLITCH[Math.floor(Math.random() * GLITCH.length)]
            : c
        ).join('')
      );
    }, 55);
    return () => clearInterval(iv);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(14px)' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'var(--bg-main)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Grain */}
          <div style={{
            position: 'absolute', inset: 0,
            opacity: 0.04, pointerEvents: 'none',
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: '180px 180px',
          }} />

          {/* Scan lines */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,240,255,0.015) 0px, rgba(0,240,255,0.015) 1px, transparent 1px, transparent 4px)',
            pointerEvents: 'none', zIndex: 1,
          }} />

          {/* 3D canvas */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Canvas camera={{ position: [0, 0, 5], fov: 55 }} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
              <AssemblingSphere progress={progress} />
            </Canvas>
          </div>

          {/* UI overlay */}
          <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '460px', padding: '0 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>

            {/* Glitch name */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#ffffff',
                textShadow: '0 0 40px var(--neon-cyan-glow)',
                userSelect: 'none',
              }}
            >
              {glitchName}
            </motion.div>

            {/* Terminal panel */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              style={{
                width: '100%',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-light)',
                borderRadius: '12px',
                padding: '16px 20px',
                display: 'flex', flexDirection: 'column', gap: '6px',
                minHeight: '168px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 15px var(--neon-purple-glow) inset'
              }}
            >
              {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{
                    fontFamily: "'Courier New', monospace",
                    fontSize: '0.7rem',
                    color: i === lineIndex ? '#ffffff' : 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', gap: '8px',
                  }}
                >
                  <span style={{ color: i === lineIndex ? 'var(--neon-cyan)' : 'var(--neon-purple)' }}>
                    {i === lineIndex ? '▶' : '✓'}
                  </span>
                  {line}
                  {i === lineIndex && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.45, repeat: Infinity }}
                      style={{ color: 'var(--neon-cyan)', textShadow: '0 0 5px var(--neon-cyan)' }}
                    >█</motion.span>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Progress bar */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ height: '1px', background: 'var(--bg-glass)', borderRadius: '1px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%', width: `${Math.min(progress, 100)}%`,
                  background: 'linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))',
                  boxShadow: '0 0 10px var(--neon-cyan)',
                  borderRadius: '1px',
                  transition: 'width 0.15s ease',
                }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: '0.65rem', color: 'var(--neon-cyan)', letterSpacing: '2px', textShadow: '0 0 5px var(--neon-cyan-glow)' }}>
                  LOADING PORTFOLIO
                </span>
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: '0.65rem', color: 'var(--text-primary)', letterSpacing: '1px' }}>
                  {Math.min(Math.floor(progress), 100)}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
