import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useTime } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { skills } from '../../constants';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { WordReveal } from '../ui/TextReveal';

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend'  },
  { key: 'tools',    label: 'Tools & DevOps' },
];

const SkillCard = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);

  // Float animation for a premium feel
  const time = useTime();
  const floatY = useSpring(useTransform(time, (t) => Math.sin(t / 1000 + index) * 5), {
    stiffness: 100, damping: 30
  });

  return (
    <motion.div
      ref={cardRef}
      variants={fadeIn('up', 'spring', index * 0.05, 0.6)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '24px',
        background: hovered ? 'var(--bg-glass-hover)' : 'var(--bg-glass)',
        border: `1px solid ${hovered ? 'var(--accent-primary)' : 'var(--border-light)'}`,
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        y: hovered ? -8 : floatY,
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.4), inset 0 0 20px rgba(225,29,72,0.1)' : '0 10px 30px rgba(0,0,0,0.2)',
      }}
    >
      {/* Decorative gradient orb inside card */}
      <div style={{
        position: 'absolute', top: '-20%', right: '-20%',
        width: '100px', height: '100px',
        background: hovered ? 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)' : 'radial-gradient(circle, var(--accent-glow-subtle) 0%, transparent 70%)',
        opacity: hovered ? 0.8 : 0.3,
        transition: 'all 0.5s ease',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative', zIndex: 1 }}>
        {/* Icon */}
        <div style={{
          width: '56px', height: '56px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRadius: '16px',
          background: hovered ? 'var(--accent-primary)' : 'var(--bg-raised)',
          border: `1px solid ${hovered ? 'var(--accent-light)' : 'var(--border-medium)'}`,
          color: hovered ? '#fff' : 'var(--text-primary)',
          fontSize: '1.8rem',
          flexShrink: 0,
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
          boxShadow: hovered ? '0 10px 20px var(--accent-glow-subtle)' : 'none',
        }}>
          <skill.icon />
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-heading)', fontWeight: 700, color: hovered ? 'var(--accent-primary)' : 'var(--text-primary)', transition: 'color 0.3s' }}>
            {skill.name}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.05em' }}>
            Proficiency: <span style={{ color: hovered ? 'var(--accent-light)' : 'var(--accent-primary)' }}>{skill.level}%</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ width: '100%', height: '6px', background: 'var(--bg-raised)', borderRadius: '6px', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, var(--accent-primary), var(--accent-light))`,
            borderRadius: '6px',
            boxShadow: hovered ? '0 0 15px var(--accent-glow)' : 'none',
            transition: 'box-shadow 0.3s',
          }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [active, setActive] = useState('frontend');

  return (
    <SectionWrapper id="skills">
      <WordReveal delay={0.1} as="p" style={{ 
        fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', 
        color: 'var(--accent-primary)', marginBottom: '12px', fontWeight: 600, textAlign: 'center' 
      }}>
        Expertise
      </WordReveal>
      <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '20px', color: 'var(--text-primary)', textAlign: 'center' }}>
        Skills & Technologies
      </WordReveal>
      <WordReveal delay={0.3} as="p" className="section-subheading" style={{ 
        marginBottom: '48px', color: 'var(--text-secondary)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' 
      }}>
        A specialized set of tools and frameworks I use to build high-performance digital products and scalable architectures.
      </WordReveal>

      {/* Category tabs */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.4, 0.6)}
        initial="hidden" whileInView="show"
        viewport={{ once: true }}
        style={{ display: 'flex', gap: '12px', marginBottom: '50px', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            style={{
              padding: '12px 28px',
              borderRadius: '100px',
              border: '1px solid',
              borderColor: active === cat.key ? 'var(--accent-primary)' : 'var(--border-light)',
              background: active === cat.key ? 'var(--accent-primary)' : 'var(--bg-glass)',
              color: active === cat.key ? '#ffffff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              backdropFilter: 'blur(10px)',
              boxShadow: active === cat.key ? '0 8px 25px var(--accent-glow-subtle)' : 'none',
              transform: active === cat.key ? 'translateY(-2px)' : 'translateY(0)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Skills grid */}
      <motion.div
        key={active}
        variants={staggerContainer(0.05)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '24px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {skills[active]?.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Skills;
