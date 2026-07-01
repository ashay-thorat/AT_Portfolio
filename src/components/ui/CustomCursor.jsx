import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for touch device
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.hoverable
      ) {
        dotRef.current?.classList.add('cursor-hover');
        ringRef.current?.classList.add('cursor-hover');
      }
    };

    const handleMouseOut = () => {
      dotRef.current?.classList.remove('cursor-hover');
      ringRef.current?.classList.remove('cursor-hover');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    let animId;
    const animate = () => {
      // Dot follows with slight easing
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.9;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.9;

      // Ring follows with more lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPos.current.x}px`;
        dotRef.current.style.top = `${dotPos.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }

      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <style>{`
        .cursor-dot, .cursor-ring {
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 9999;
          pointer-events: none;
          transition: width 0.3s, height 0.3s, background-color 0.3s, box-shadow 0.3s;
        }
        .cursor-dot {
          width: 8px;
          height: 8px;
          background: var(--text-primary);
        }
        .cursor-ring {
          width: 32px;
          height: 32px;
          border: 1px solid var(--text-primary);
          opacity: 0.5;
        }
        .cursor-dot.cursor-hover {
          width: 12px;
          height: 12px;
          background: var(--accent-primary);
          box-shadow: 0 0 12px var(--accent-glow);
        }
        .cursor-ring.cursor-hover {
          width: 48px;
          height: 48px;
          border-color: rgba(225,29,72,0.55);
          box-shadow: 0 0 14px var(--accent-glow-subtle);
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
