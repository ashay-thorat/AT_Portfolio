import { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { projects } from '../../constants';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { WordReveal } from '../ui/TextReveal';

/* ── 3D Tilt Card — Neon ── */
const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });

  const handleMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); setHovered(false); };

  return (
    <motion.div variants={fadeIn('up', 'spring', index * 0.08, 0.65)} style={{ perspective: '1200px' }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          borderRadius: '20px',
          border: `1px solid ${hovered ? 'var(--accent-primary)' : 'var(--border-light)'}`,
          background: hovered ? 'var(--bg-glass-hover)' : 'var(--bg-glass)',
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          boxShadow: hovered 
            ? '0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px var(--accent-glow-subtle)' 
            : '0 8px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div style={{
          height: '160px',
          position: 'relative', overflow: 'hidden',
          background: 'rgba(0,0,0,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderBottom: '1px solid var(--border-light)',
        }}>
          {/* Subtle atmosphere backdrop */}
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, var(--accent-glow) 0%, transparent 80%)', opacity: hovered ? 0.6 : 0.15, transition: 'opacity 0.4s ease' }} />

          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(9, 9, 11, 0.85)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px',
              zIndex: 20
            }}
          >
            {[
              { href: project.github, Icon: FaGithub, label: 'Source code' },
              { href: project.live,   Icon: FaExternalLinkAlt, label: 'Live demo' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label}
                href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                whileHover={{ scale: 1.15, backgroundColor: 'var(--accent-primary)', borderColor: 'var(--accent-light)' }} 
                whileTap={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: '52px', height: '52px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%',
                  background: 'var(--bg-raised)',
                  border: '1px solid var(--border-medium)',
                  color: '#ffffff',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>

          {/* Category chip */}
          <span style={{
            position: 'absolute', top: '14px', left: '14px',
            padding: '4px 12px', borderRadius: '100px',
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em',
            background: 'var(--accent-glow-subtle)',
            border: '1px solid var(--accent-glow)',
            color: 'var(--accent-light)',
            backdropFilter: 'blur(8px)',
            zIndex: 10
          }}>
            {project.category}
          </span>

          {/* Initial letter */}
          <div style={{
            width: '64px', height: '64px', borderRadius: '16px',
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-medium)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', fontFamily: 'var(--font-heading)', fontWeight: 800,
            color: 'var(--accent-primary)',
            backdropFilter: 'blur(6px)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}>
            {project.title[0]}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '22px' }}>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px', color: '#ffffff' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '16px' }}>
            {project.description}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                padding: '3px 9px', borderRadius: '20px',
                fontSize: '0.68rem', fontWeight: 600,
                background: 'var(--bg-glass)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-light)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => (
  <SectionWrapper id="projects">
    <WordReveal delay={0.1} as="p" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--accent-secondary)', marginBottom: '12px', fontWeight: 600 }}>
      Portfolio
    </WordReveal>
    <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '20px', color: '#fff' }}>
      Featured Projects
    </WordReveal>
    <WordReveal delay={0.3} as="p" className="section-subheading" style={{ marginBottom: '56px', color: 'var(--text-secondary)' }}>
      A curated collection of digital experiences built with precision and modern engineering.
    </WordReveal>

    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden" whileInView="show"
      viewport={{ once: true, amount: 0.05 }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '22px' }}
    >
      {projects.map((project, i) => (
        <ProjectCard key={project.title} project={project} index={i} />
      ))}
    </motion.div>
  </SectionWrapper>
);

export default Projects;
