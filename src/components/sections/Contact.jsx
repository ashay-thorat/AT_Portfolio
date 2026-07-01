import { useState } from 'react';
import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { contactData, socialLinks } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { HiMail, HiPaperAirplane, HiLocationMarker } from 'react-icons/hi';
import { WordReveal } from '../ui/TextReveal';

const InputField = ({ label, name, type, value, onChange, placeholder, isTextarea = false }) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.02)',
    border: `1px solid ${isFocused ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
    borderRadius: '12px',
    padding: '16px 20px',
    color: 'var(--text-primary)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    boxShadow: isFocused ? '0 0 0 4px rgba(225, 29, 72, 0.1), inset 0 2px 4px rgba(0,0,0,0.2)' : 'inset 0 2px 4px rgba(0,0,0,0.1)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', marginBottom: '8px' }}>
      <label style={{ 
        display: 'block', 
        fontSize: '0.8rem', 
        color: isFocused ? 'var(--accent-primary)' : 'var(--text-muted)', 
        marginBottom: '10px', 
        letterSpacing: '0.1em', 
        textTransform: 'uppercase', 
        fontWeight: 700,
        transition: 'color 0.3s ease'
      }}>
        {label}
      </label>
      {isTextarea ? (
        <textarea
          name={name} value={value} onChange={onChange} required rows={5} placeholder={placeholder}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          style={{ ...baseStyle, resize: 'vertical' }}
        />
      ) : (
        <input
          name={name} type={type} value={value} onChange={onChange} required placeholder={placeholder}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          style={baseStyle}
        />
      )}
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false); setSent(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3500);
    }, 1600);
  };

  const iconBox = {
    width: '46px', height: '46px', borderRadius: '12px',
    background: 'var(--bg-raised)',
    border: '1px solid var(--border-medium)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--accent-primary)', fontSize: '1.3rem', flexShrink: 0,
    transition: 'all 0.3s ease',
  };

  return (
    <SectionWrapper id="contact">
      <WordReveal delay={0.1} as="p" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: 'var(--accent-primary)', marginBottom: '12px', fontWeight: 600 }}>
        Get In Touch
      </WordReveal>
      <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '20px', color: 'var(--text-primary)' }}>
        {contactData.heading}
      </WordReveal>
      <WordReveal delay={0.3} as="p" className="section-subheading" style={{ marginBottom: '56px', color: 'var(--text-secondary)' }}>
        {contactData.subheading}
      </WordReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>

        {/* ── Form ── */}
        <motion.form
          variants={fadeIn('right', 'tween', 0.3, 0.75)}
          initial="hidden" whileInView="show" viewport={{ once: true }}
          onSubmit={handleSubmit}
          style={{
            display: 'flex', flexDirection: 'column', gap: '20px',
            padding: 'clamp(30px, 5vw, 40px)',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ position: 'absolute', top: -100, left: -100, width: '200px', height: '200px', background: 'var(--accent-glow)', filter: 'blur(100px)', opacity: 0.5, borderRadius: '50%' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <InputField label="Name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" />
            <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
            <InputField label="Message" name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." isTextarea={true} />

            <motion.button
              type="submit"
              disabled={sending || sent}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '16px', borderRadius: '12px', marginTop: '10px',
                opacity: sending ? 0.7 : 1,
                background: 'var(--accent-primary)', color: '#fff', fontSize: '1.05rem', fontWeight: 700,
                border: 'none', cursor: sending || sent ? 'default' : 'pointer',
                boxShadow: '0 10px 20px rgba(225,29,72,0.3)',
                transition: 'background 0.3s ease'
              }}
            >
              {sent
                ? '✓ Message Sent!'
                : sending
                  ? <><span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Sending...</>
                  : <><HiPaperAirplane style={{ transform: 'rotate(90deg)', fontSize: '1.2rem' }} /> Send Message</>
              }
            </motion.button>
          </div>
        </motion.form>

        {/* ── Info panel ── */}
        <motion.div
          variants={fadeIn('left', 'tween', 0.4, 0.7)}
          initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {[
            { icon: <HiMail />, label: 'Email', value: contactData.email },
            { icon: <HiLocationMarker />, label: 'Location', value: 'Amravati, Maharashtra, India 🇮🇳' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: '24px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-light)',
                borderRadius: '20px',
                display: 'flex', alignItems: 'center', gap: '20px',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.background = 'var(--bg-glass-hover)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(225,29,72,0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.querySelector('.icon-box').style.background = 'rgba(225, 29, 72, 0.1)';
                e.currentTarget.querySelector('.icon-box').style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.background = 'var(--bg-glass)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.querySelector('.icon-box').style.background = 'var(--bg-raised)';
                e.currentTarget.querySelector('.icon-box').style.color = 'var(--accent-primary)';
              }}
            >
              <div style={iconBox} className="icon-box">{item.icon}</div>
              <div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{item.label}</p>
                <p style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>{item.value}</p>
              </div>
            </div>
          ))}

          {/* Social */}
          <div style={{ marginTop: '10px' }}>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 700 }}>
              Connect with me
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {socialLinks.map((s) => (
                <a
                  key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="social-btn"
                  style={{ 
                    width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    borderRadius: '16px', background: 'var(--bg-glass)', border: '1px solid var(--border-light)', 
                    color: 'var(--text-secondary)', fontSize: '1.3rem'
                  }}
                  aria-label={s.platform}
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div style={{
            padding: '24px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '20px', marginTop: 'auto',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
          }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontStyle: 'italic', fontWeight: 400 }}>
              "I typically respond within 24 hours. Looking forward to collaborating with you!"
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </SectionWrapper>
  );
};

export default Contact;
