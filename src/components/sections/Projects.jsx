import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { projects } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { WordReveal } from '../ui/TextReveal';

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  
  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      ref={cardRef}
      style={{ position: 'relative', opacity, y, marginBottom: index !== projects.length - 1 ? '120px' : '0' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-row"
    >
      <div style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        alignItems: 'center',
        gap: 'clamp(30px, 6vw, 60px)',
        position: 'relative'
      }} className="project-container">
        
        {/* Large Decorative Number */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          [isEven ? 'left' : 'right']: '-20px',
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          color: 'var(--bg-glass)',
          WebkitTextStroke: '1px var(--border-medium)',
          zIndex: 0,
          pointerEvents: 'none',
          lineHeight: 0.8
        }}>
          0{index + 1}
        </div>

        {/* Visual / Abstract Representation (Since no images provided) */}
        <motion.div 
          style={{
            flex: '1.2',
            position: 'relative',
            aspectRatio: '16/10',
            borderRadius: '24px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-light)',
            overflow: 'hidden',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered ? '0 30px 60px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(225,29,72,0.3)' : '0 10px 30px rgba(0,0,0,0.3)',
            transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          {project.image ? (
            <motion.img 
              src={project.image} 
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: hovered ? 'brightness(1.1)' : 'brightness(0.8)',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'
              }}
            />
          ) : (
            <>
              {/* Animated Background Mesh */}
              <div style={{
                position: 'absolute', inset: '-50%',
                background: 'radial-gradient(ellipse at center, var(--accent-glow) 0%, transparent 50%)',
                opacity: hovered ? 0.6 : 0.2,
                transform: hovered ? 'scale(1.2)' : 'scale(1)',
                transition: 'all 1s ease'
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(9,9,11,0.8), rgba(9,9,11,0.2))',
                zIndex: 1
              }} />
              
              {/* Initial Letter & Decor */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                  position: 'relative', zIndex: 2,
                  fontSize: 'clamp(4rem, 10vw, 8rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  color: 'var(--accent-primary)',
                  textShadow: '0 0 40px var(--accent-glow)'
                }}
              >
                {project.title[0]}
              </motion.div>
            </>
          )}
          
          {/* Floating Category Badge */}
          <div style={{
            position: 'absolute', top: '24px', left: '24px', zIndex: 2,
            padding: '8px 16px', borderRadius: '100px',
            background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-medium)',
            color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600
          }}>
            {project.category}
          </div>

          {/* Action Overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 3,
              background: 'rgba(9, 3, 5, 0.6)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px'
            }}
          >
            {[
              { href: project.github, Icon: FaGithub, label: 'Source code' },
              { href: project.live,   Icon: FaExternalLinkAlt, label: 'Live demo' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                whileHover={{ scale: 1.1, backgroundColor: 'var(--accent-primary)', color: '#fff', borderColor: 'var(--accent-primary)' }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', background: 'var(--bg-raised)', border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)', fontSize: '1.5rem', transition: 'all 0.3s'
                }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Content Details */}
        <div style={{ flex: '1', position: 'relative', zIndex: 1 }} className="project-content">
          <motion.h3 
            variants={fadeIn(isEven ? 'left' : 'right', 'tween', 0.2, 0.6)}
            initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ 
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontFamily: 'var(--font-heading)', 
              fontWeight: 700, color: 'var(--text-primary)', marginBottom: '16px', lineHeight: 1.2
            }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p
            variants={fadeIn(isEven ? 'left' : 'right', 'tween', 0.3, 0.6)}
            initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ 
              fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.8, 
              marginBottom: '32px', padding: '24px', background: 'var(--bg-glass)',
              borderRadius: '16px', border: '1px solid var(--border-light)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
            }}
          >
            {project.description}
          </motion.p>
          
          <motion.div 
            variants={fadeIn(isEven ? 'left' : 'right', 'tween', 0.4, 0.6)}
            initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}
          >
            {project.tags.map((tag) => (
              <span key={tag} style={{
                padding: '8px 16px', borderRadius: '100px',
                fontSize: '0.8rem', fontWeight: 600,
                background: 'rgba(225, 29, 72, 0.1)', color: 'var(--accent-light)',
                border: '1px solid rgba(225, 29, 72, 0.2)',
                letterSpacing: '0.05em'
              }}>
                {tag}
              </span>
            ))}
          </motion.div>
          
          <motion.a
            href={project.live} target="_blank" rel="noopener noreferrer"
            variants={fadeIn(isEven ? 'left' : 'right', 'tween', 0.5, 0.6)}
            initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)',
              paddingBottom: '4px', borderBottom: '2px solid var(--accent-primary)',
              transition: 'all 0.3s ease', cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
          >
            View Live Project <FaArrowRight />
          </motion.a>
        </div>

      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <SectionWrapper id="projects">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '80px' }}>
          <WordReveal delay={0.1} as="p" style={{ 
            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', 
            color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 
          }}>
            Portfolio
          </WordReveal>
          <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
            Featured Work
          </WordReveal>
          <WordReveal delay={0.3} as="p" className="section-subheading" style={{ color: 'var(--text-secondary)' }}>
            A curated selection of my most impactful projects, blending sophisticated design with robust engineering.
          </WordReveal>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .project-container {
            flex-direction: column !important;
            gap: 40px !important;
          }
          .project-content {
            width: 100%;
          }
        }
      `}</style>
    </SectionWrapper>
  );
};

export default Projects;
