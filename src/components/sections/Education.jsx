import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { WordReveal } from '../ui/TextReveal';
import { FaGraduationCap } from 'react-icons/fa';

import gpa from '../../assets/images/gpa.png';
import ssgmce from '../../assets/images/ssgmce.png';

const educationData = [
  {
    degree: 'BE in Information Technology (Direct Second Year)',
    institution: 'shri sant gajanan maharaj college of engineering, Shegaon, MH',
    date: 'Sep 2025 - June 2028',
    description: 'Currently pursuing my Bachelor of Engineering in IT. Achieved a CGPA of 8.0/10 in Semester 3.',
    courses: ['Information Technology', 'Data Structures', 'Software Engineering'],
    image: ssgmce
  },
  {
    degree: 'Diploma in Computer Engineering',
    institution: 'Government Polytechnic Arvi, Wardha, MH',
    date: 'Sep 2022 - June 2025',
    description: 'Graduated with a Diploma in Computer Engineering, securing an aggregate of 85.8%.',
    courses: ['Computer Networks', 'Database Management', 'Web Development'],
    image: gpa
  }
];

const EduCard = ({ edu, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} style={{
      display: 'flex',
      flexDirection: isEven ? 'row' : 'row-reverse',
      alignItems: 'center',
      gap: '40px',
      marginBottom: index !== educationData.length - 1 ? '60px' : '0',
      position: 'relative',
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(40px)',
      transition: 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
      transitionDelay: `${index * 0.15}s`
    }} className="edu-row">

      {/* Content Side */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isEven ? 'flex-end' : 'flex-start', textAlign: isEven ? 'right' : 'left' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          color: 'var(--accent-primary)', fontSize: '0.9rem', fontWeight: 700,
          letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px',
          background: 'var(--bg-raised)', padding: '6px 16px', borderRadius: '100px',
          border: '1px solid var(--border-medium)'
        }}>
          <FaGraduationCap /> {edu.date}
        </div>

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.2 }}>
          {edu.degree}
        </h3>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '16px' }}>
          {edu.institution}
        </p>

        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '24px', maxWidth: '500px' }}>
          {edu.description}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
          {edu.courses.map(course => (
            <span key={course} style={{
              fontSize: '0.8rem', padding: '6px 14px', background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px', color: 'var(--text-secondary)', border: '1px solid var(--border-light)'
            }}>
              {course}
            </span>
          ))}
        </div>
      </div>

      {/* Center Timeline Node */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="timeline-node-container">
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-glass)',
          border: '2px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2, position: 'relative', backdropFilter: 'blur(10px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)', color: 'var(--accent-primary)', fontSize: '1.5rem'
        }}>
          <FaGraduationCap />
        </div>

        {/* Glow behind node */}
        <div style={{ position: 'absolute', inset: -20, background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)', zIndex: 1, opacity: 0.5 }} />
      </div>

      {/* Image Side */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: isEven ? 'flex-start' : 'flex-end',
        padding: isEven ? '0 0 0 30px' : '0 30px 0 0'
      }} className="image-side">
        <div style={{
          width: '100%',
          maxWidth: '450px',
          height: '280px',
          borderRadius: '24px',
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          border: '1px solid var(--border-light)',
          background: 'var(--bg-glass)'
        }}>
          <img
            src={edu.image}
            alt={edu.institution}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.8) contrast(1.1)',
              transition: 'transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',
            pointerEvents: 'none'
          }} />
        </div>
      </div>

    </div>
  );
};

const Education = () => {
  return (
    <SectionWrapper id="education">
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>

        {/* Background line */}
        <div style={{
          position: 'absolute', left: '50%', top: '150px', bottom: '100px', width: '2px',
          background: 'linear-gradient(to bottom, transparent, var(--border-medium), transparent)',
          transform: 'translateX(-50%)', zIndex: 0
        }} className="timeline-line" />

        <div style={{ textAlign: 'center', marginBottom: '80px', position: 'relative', zIndex: 1 }}>
          <WordReveal delay={0.1} as="p" style={{
            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em',
            color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600
          }}>
            Academic Background
          </WordReveal>
          <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
            Education
          </WordReveal>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {educationData.map((edu, i) => (
            <EduCard key={edu.degree} edu={edu} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .edu-row {
            flex-direction: column !important;
            gap: 24px !important;
            align-items: flex-start !important;
          }
          .edu-row > div:first-child {
            align-items: flex-start !important;
            text-align: left !important;
          }
          .edu-row > div:first-child > div:last-child {
            justify-content: flex-start !important;
          }
          .timeline-node-container {
            display: none !important;
          }
          .image-side {
            display: none !important;
          }
          .timeline-line {
            left: 0 !important;
            display: none !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
};

export default Education;
