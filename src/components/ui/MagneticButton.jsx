import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * MagneticButton — element that pulls toward the cursor within a proximity radius.
 * Wrap any child element to make it magnetic.
 */
const MagneticButton = ({
  children,
  className = '',
  style = {},
  strength = 0.35,
  radius = 150,
  as = 'div',
  onClick,
}) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX * distX + distY * distY);

    if (dist < radius) {
      x.set(distX * strength);
      y.set(distY * strength);
      if (!isHovered) setIsHovered(true);
    } else {
      x.set(0);
      y.set(0);
      if (isHovered) setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const Tag = motion[as] || motion.div;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ display: style.display || 'inline-block', ...style }}
      className={className}
    >
      <Tag
        style={{
          display: 'inline-block',
          x: springX,
          y: springY,
        }}
      >
        {children}
      </Tag>
    </div>
  );
};

export default MagneticButton;
