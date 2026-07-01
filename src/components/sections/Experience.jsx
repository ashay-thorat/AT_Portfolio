import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { experiences } from '../../constants';
import { WordReveal } from '../ui/TextReveal';

const TimelineCard = ({ exp, index, isLast }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      style={{ display: 'flex', gap: 'clamp(20px, 4vw, 40px)', position: 'relative' }}
      className="timeline-item"
    >
      {/* Timeline column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, position: 'relative' }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 200, damping: 20 }}
          style={{
            width: '24px', height: '24px', borderRadius: '50%',
            background: 'var(--bg-base)',
            border: '3px solid var(--accent-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px var(--accent-glow-subtle)',
            zIndex: 2,
            marginTop: '32px'
          }}
        >
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-light)', boxShadow: '0 0 10px var(--accent-glow)' }} />
        </motion.div>
        
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.15 + 0.4, duration: 0.8, ease: "easeInOut" }}
            style={{
              width: '2px', position: 'absolute', top: '56px', bottom: '-32px',
              background: 'linear-gradient(to bottom, var(--accent-primary) 0%, transparent 100%)',
              transformOrigin: 'top',
              zIndex: 1
            }}
          />
        )}
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1, padding: 'clamp(24px, 4vw, 36px)',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-light)',
          borderRadius: '24px', marginBottom: '40px',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="experience-card"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.background = 'var(--bg-glass-hover)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(225,29,72,0.1)';
          e.currentTarget.style.transform = 'translateX(8px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-light)';
          e.currentTarget.style.background = 'var(--bg-glass)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <div style={{ 
          position: 'absolute', top: 0, right: 0, width: '150px', height: '150px', 
          background: 'radial-gradient(circle, var(--accent-glow-subtle) 0%, transparent 70%)',
          opacity: 0.3, pointerEvents: 'none', transform: 'translate(30%, -30%)'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
              {exp.title}
            </h3>
            <p style={{ fontSize: '1rem', color: 'var(--accent-light)', fontWeight: 600 }}>
              {exp.company}
            </p>
          </div>
          <span style={{
            fontSize: '0.8rem', color: 'var(--text-secondary)',
            padding: '6px 16px',
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-medium)',
            borderRadius: '100px', whiteSpace: 'nowrap',
            fontWeight: 600,
            letterSpacing: '0.05em'
          }}>
            {exp.date}
          </span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', zIndex: 1 }}>
          {exp.points.map((point, i) => (
            <li key={i} style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.8, paddingLeft: '24px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: '4px', top: '12px', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', boxShadow: '0 0 10px var(--accent-glow)' }} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Experience = () => (
  <SectionWrapper id="experience">
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <WordReveal delay={0.1} as="p" style={{ 
          fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', 
          color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 
        }}>
          Career Path
        </WordReveal>
        <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
          Work Experience
        </WordReveal>
        <WordReveal delay={0.3} as="p" className="section-subheading" style={{ color: 'var(--text-secondary)', margin: '0 auto' }}>
          My professional journey building high-scale applications and engineering digital products.
        </WordReveal>
      </div>
      
      <div style={{ position: 'relative' }}>
        {experiences.map((exp, i) => (
          <TimelineCard key={exp.company} exp={exp} index={i} isLast={i === experiences.length - 1} />
        ))}
      </div>
    </div>
    
    <style>{`
      @media (max-width: 768px) {
        .timeline-item {
          gap: 16px !important;
        }
        .experience-card {
          padding: 24px !important;
        }
      }
    `}</style>
  </SectionWrapper>
);

export default Experience;
