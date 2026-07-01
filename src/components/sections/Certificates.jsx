import { useState } from 'react';
import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { fadeIn, staggerContainer } from '../../utils/motion';
import { WordReveal } from '../ui/TextReveal';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

import awsImage from '../../assets/images/aws.png';
import androidImage from '../../assets/images/android.png';
import redhatImage from '../../assets/images/redhat.png';
import redhatOpenshiftImage from '../../assets/images/redhatopenshift.png';

const certificates = [
  {
    title: 'AWS Academy Graduate - Cloud Architecting',
    issuer: 'AWS Academy',
    date: 'April 2026',
    url: '#',
    image: awsImage,
    skills: ['Cloud Architecture', 'AWS', 'Networking', 'Security']
  },
  {
    title: 'AWS Academy Graduate - Cloud Foundations',
    issuer: 'AWS Academy',
    date: 'April 2026',
    url: '#',
    image: awsImage,
    skills: ['Cloud Basics', 'AWS', 'Infrastructure', 'Cloud Computing']
  },
  {
    title: 'Industrial Training in Android Development',
    issuer: 'Mountreach Solution Pvt Ltd',
    date: 'July 2024',
    url: '#',
    image: androidImage,
    skills: ['Android Development', 'Java', 'Mobile Apps']
  },
  {
    title: 'AWS for Beginners',
    issuer: 'Simplilearn',
    date: 'June 2026',
    url: '#',
    image: awsImage,
    skills: ['AWS', 'Cloud Basics']
  },
  {
    title: 'Red Hat Training: Linux Fundamentals (RH104)',
    issuer: 'Red Hat',
    date: 'March 2026',
    url: '#',
    image: redhatImage,
    skills: ['Linux', 'System Administration', 'Command Line']
  },
  {
    title: 'Red Hat Training: Introduction to OpenShift Applications (DO101)',
    issuer: 'Red Hat',
    date: 'March 2026',
    url: '#',
    image: redhatOpenshiftImage,
    skills: ['OpenShift', 'Kubernetes', 'Containers']
  }
];

const CertCard = ({ cert, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--bg-glass)',
        border: '1px solid',
        borderColor: hovered ? 'var(--accent-primary)' : 'var(--border-light)',
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px var(--accent-glow-subtle)' : '0 10px 30px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        backdropFilter: 'blur(20px)'
      }}
    >
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', height: '100%' }}
        >
          <img src={cert.image} alt={cert.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>

      </div>

      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
          <FaCertificate /> {cert.issuer}
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1.3 }}>
          {cert.title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px', fontWeight: 500 }}>
          Issued: {cert.date}
        </p>

        <div style={{ marginTop: 'auto', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {cert.skills.map(skill => (
            <span key={skill} style={{
              fontSize: '0.75rem', padding: '6px 12px', background: 'var(--bg-raised)',
              borderRadius: '100px', color: 'var(--text-muted)', border: '1px solid var(--border-medium)', fontWeight: 600
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Certificates = () => {
  return (
    <SectionWrapper id="certificates">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <WordReveal delay={0.1} as="p" style={{
            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em',
            color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600
          }}>
            Achievements
          </WordReveal>
          <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '24px', color: 'var(--text-primary)' }}>
            Certifications
          </WordReveal>
          <WordReveal delay={0.3} as="p" className="section-subheading" style={{ color: 'var(--text-secondary)', margin: '0 auto' }}>
            Continuous learning and validation of expertise across modern technology stacks.
          </WordReveal>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}
        >
          {certificates.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Certificates;
