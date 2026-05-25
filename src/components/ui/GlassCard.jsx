import { useRef, useState } from 'react';
import { motion } from 'motion/react';

/**
 * GlassCard — monochrome edition.
 * Mouse-tracking spotlight glow uses white instead of purple.
 */
const GlassCard = ({ children, className = '', hoverable = true }) => {
  const cardRef = useRef(null);
  const [rotateX, setRotateX]     = useState(0);
  const [rotateY, setRotateY]     = useState(0);
  const [glowPos, setGlowPos]     = useState({ x: 50, y: 50 });
  const [hovered, setHovered]     = useState(false);

  const handleMouseMove = (e) => {
    if (!hoverable || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRotateX(((y - rect.height / 2) / rect.height) * 8);
    setRotateY(((rect.width  / 2 - x) / rect.width)  * 8);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setRotateX(0); setRotateY(0);
    setGlowPos({ x: 50, y: 50 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: hoverable
          ? `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
          : 'none',
        background: `
          radial-gradient(
            circle at ${glowPos.x}% ${glowPos.y}%,
            ${hovered ? 'rgba(59, 130, 246, 0.08)' : 'rgba(59, 130, 246, 0.02)'},
            transparent 60%
          ),
          rgba(9, 9, 11, 0.75)
        `,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${hovered ? 'var(--accent-primary)' : 'var(--border-light)'}`,
        borderRadius: '20px',
        boxShadow: hovered ? '0 20px 50px rgba(0,0,0,0.4), 0 0 0 1px var(--accent-glow-subtle)' : '0 4px 20px rgba(0,0,0,0.2)',
        transition: 'transform 0.2s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
