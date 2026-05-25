import { useState } from 'react';
import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { skills } from '../../constants';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { WordReveal } from '../ui/TextReveal';

const CATEGORIES = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend'  },
  { key: 'tools',    label: 'Tools'    },
];

const SkillCard = ({ skill, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.05, 0.6)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '20px 24px',
        background: hovered ? 'var(--bg-glass-hover)' : 'var(--bg-glass)',
        border: `1px solid ${hovered ? 'var(--accent-primary)' : 'var(--border-light)'}`,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '18px',
        cursor: 'default',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 30px rgba(0,0,0,0.3), 0 0 0 1px var(--accent-glow-subtle)' : 'none',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '46px', height: '46px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '12px',
        background: hovered ? 'var(--accent-glow-subtle)' : 'var(--bg-raised)',
        border: `1px solid ${hovered ? 'var(--accent-glow)' : 'var(--border-medium)'}`,
        color: hovered ? 'var(--accent-primary)' : 'var(--text-secondary)',
        fontSize: '1.4rem',
        flexShrink: 0,
        transition: 'all 0.3s ease',
      }}>
        <skill.icon />
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 600, color: hovered ? '#ffffff' : 'var(--text-primary)', transition: 'color 0.3s' }}>
            {skill.name}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            {skill.level}%
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, var(--accent-primary), var(--accent-light))`,
              borderRadius: '4px',
              boxShadow: hovered ? '0 0 12px var(--accent-glow)' : 'none',
              transition: 'box-shadow 0.3s',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const [active, setActive] = useState('frontend');

  return (
    <SectionWrapper id="skills">
      <WordReveal delay={0.1} as="p" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--accent-primary)', marginBottom: '12px', fontWeight: 600 }}>
        Expertise
      </WordReveal>
      <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '20px', color: '#fff' }}>
        Skills &amp; Technologies
      </WordReveal>
      <WordReveal delay={0.3} as="p" className="section-subheading" style={{ marginBottom: '48px', color: 'var(--text-secondary)' }}>
        A specialized set of tools and frameworks I use to build high-performance digital products.
      </WordReveal>

      {/* Category tabs */}
      <motion.div
        variants={fadeIn('up', 'tween', 0.4, 0.6)}
        initial="hidden" whileInView="show"
        viewport={{ once: true }}
        style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            style={{
              padding: '10px 24px',
              borderRadius: '12px',
              border: '1px solid',
              borderColor: active === cat.key ? 'var(--accent-primary)' : 'var(--border-light)',
              background: active === cat.key ? 'var(--bg-glass-hover)' : 'var(--bg-glass)',
              color: active === cat.key ? '#ffffff' : 'var(--text-secondary)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              backdropFilter: 'blur(10px)',
              boxShadow: active === cat.key ? '0 4px 15px var(--accent-glow-subtle)' : 'none',
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
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}
      >
        {skills[active]?.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
};

export default Skills;
