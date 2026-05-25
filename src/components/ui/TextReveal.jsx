import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * Character-by-character text reveal animation.
 * Each character slides up and fades in with staggered delay.
 */
export const CharReveal = ({
  children,
  className = '',
  style = {},
  delay = 0,
  stagger = 0.03,
  duration = 0.5,
  once = true,
  as = 'div',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });
  const text = typeof children === 'string' ? children : '';
  const Tag = as;

  return (
    <Tag ref={ref} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap' }} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0, filter: 'blur(4px)' }}
          animate={isInView ? { y: 0, opacity: 1, filter: 'blur(0px)' } : {}}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.25, 0.4, 0, 1],
          }}
          style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
          aria-hidden="true"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </Tag>
  );
};

/**
 * Word-by-word reveal with clip-mask slide-up effect.
 * Each word slides up from below a clip boundary.
 */
export const WordReveal = ({
  children,
  className = '',
  style = {},
  delay = 0,
  stagger = 0.08,
  duration = 0.6,
  once = true,
  as = 'div',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');
  const Tag = as;

  return (
    <Tag ref={ref} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap', gap: '0 0.3em' }} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block' }}
          aria-hidden="true"
        >
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.25, 0.4, 0, 1],
            }}
            style={{ display: 'inline-block', willChange: 'transform' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

/**
 * Blur-to-clear text reveal — fades from blurred to sharp.
 */
export const BlurReveal = ({
  children,
  className = '',
  style = {},
  delay = 0,
  duration = 0.8,
  once = true,
  as = 'div',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3 });
  const Tag = as;

  return (
    <Tag ref={ref} className={className} style={style}>
      <motion.span
        initial={{ opacity: 0, filter: 'blur(10px)', y: 15 }}
        animate={isInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
        transition={{
          duration,
          delay,
          ease: [0.25, 0.4, 0, 1],
        }}
        style={{ display: 'block', willChange: 'transform, opacity, filter' }}
      >
        {children}
      </motion.span>
    </Tag>
  );
};

export default { CharReveal, WordReveal, BlurReveal };
