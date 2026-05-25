import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

/**
 * ParallaxText — infinite horizontal scrolling marquee that
 * changes speed based on scroll velocity.
 */
const ParallaxText = ({
  children,
  baseVelocity = -2,
  className = '',
  style = {},
  repeat = 4,
}) => {
  const containerRef = useRef(null);

  const { scrollY } = useScroll();

  // Map scroll position to x offset for parallax
  const xRange = useTransform(scrollY, [0, 5000], [0, baseVelocity * 600]);
  const x = useSpring(xRange, { stiffness: 100, damping: 30 });

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex',
        ...style,
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          gap: '40px',
          x,
        }}
      >
        {Array.from({ length: repeat }).map((_, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '40px',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.04)',
              textTransform: 'uppercase',
              letterSpacing: '4px',
              userSelect: 'none',
              WebkitTextStroke: '1px rgba(108, 99, 255, 0.12)',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ParallaxText;
