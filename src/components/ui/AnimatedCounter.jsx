import { useState, useEffect } from 'react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

/**
 * Counts from 0 up to `target` (string like "5+" or "30+") when in view.
 */
const AnimatedCounter = ({ target }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  // Parse numeric part and suffix
  const numeric = parseInt(target, 10) || 0;
  const suffix = target.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView) return;
    let frame;
    const duration = 1400; // ms
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numeric));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numeric]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
