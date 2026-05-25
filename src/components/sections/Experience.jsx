import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { experiences } from '../../constants';
import { WordReveal } from '../ui/TextReveal';

const TimelineCard = ({ exp, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -36 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.10, ease: [0.25, 0.4, 0, 1] }}
      style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}
    >
      {/* Timeline column */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '4px' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.10 + 0.2, type: 'spring', stiffness: 280 }}
          style={{
            width: '18px', height: '18px', borderRadius: '50%',
            border: '2px solid var(--accent-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 15px var(--accent-glow-subtle)',
          }}
        >
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-light)', boxShadow: '0 0 8px var(--accent-glow)' }} />
        </motion.div>
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ delay: index * 0.10 + 0.3, duration: 0.5 }}
          style={{
            width: '1.5px', flex: 1, marginTop: '8px',
            background: 'linear-gradient(180deg, var(--accent-primary) 0%, rgba(59, 130, 246, 0.1) 100%)',
            transformOrigin: 'top',
          }}
        />
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1, padding: '24px',
          background: 'var(--bg-glass)',
          border: '1px solid var(--border-light)',
          borderRadius: '20px', marginBottom: '12px',
          transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          backdropFilter: 'blur(16px)',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-primary)';
          e.currentTarget.style.background = 'var(--bg-glass-hover)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px var(--accent-glow-subtle)';
          e.currentTarget.style.transform = 'translateX(6px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-light)';
          e.currentTarget.style.background = 'var(--bg-glass)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '4px', color: '#ffffff' }}>
              {exp.title}
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              {exp.company}
            </p>
          </div>
          <span style={{
            fontSize: '0.72rem', color: 'var(--text-primary)',
            padding: '5px 14px',
            background: 'var(--bg-raised)',
            border: '1px solid var(--border-medium)',
            borderRadius: '100px', whiteSpace: 'nowrap',
            fontWeight: 600,
            letterSpacing: '0.02em'
          }}>
            {exp.date}
          </span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {exp.points.map((point, i) => (
            <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '18px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, top: '10px', width: '5px', height: '1.5px', borderRadius: '1px', background: 'var(--accent-primary)' }} />
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
    <WordReveal delay={0.1} as="p" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--accent-primary)', marginBottom: '12px', fontWeight: 600 }}>
      Career Path
    </WordReveal>
    <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '20px', color: '#fff' }}>
      Work Experience
    </WordReveal>
    <WordReveal delay={0.3} as="p" className="section-subheading" style={{ marginBottom: '56px', color: 'var(--text-secondary)' }}>
      My professional journey building high-scale applications and engineering digital products.
    </WordReveal>
    <div style={{ maxWidth: '720px' }}>
      {experiences.map((exp, i) => (
        <TimelineCard key={exp.company} exp={exp} index={i} />
      ))}
    </div>
  </SectionWrapper>
);

export default Experience;
