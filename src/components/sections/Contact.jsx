import { useState } from 'react';
import { motion } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { contactData, socialLinks } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { HiMail, HiPaperAirplane, HiLocationMarker } from 'react-icons/hi';
import { WordReveal } from '../ui/TextReveal';

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
      <WordReveal delay={0.2} as="h2" className="section-heading" style={{ marginBottom: '20px', color: '#fff' }}>
        {contactData.heading}
      </WordReveal>
      <WordReveal delay={0.3} as="p" className="section-subheading" style={{ marginBottom: '56px', color: 'var(--text-secondary)' }}>
        {contactData.subheading}
      </WordReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', maxWidth: '960px' }}>

        {/* ── Form ── */}
        <motion.form
          variants={fadeIn('right', 'tween', 0.3, 0.75)}
          onSubmit={handleSubmit}
          style={{
            display: 'flex', flexDirection: 'column', gap: '20px',
            padding: '36px 32px',
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-light)',
            borderRadius: '24px',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          }}
        >
          {[
            { name: 'name', label: 'Name', type: 'text', placeholder: 'Your full name' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
          ].map((f) => (
            <div key={f.name}>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                {f.label}
              </label>
              <input
                name={f.name} type={f.type} value={form[f.name]} onChange={handleChange} required
                placeholder={f.placeholder} className="input-dark"
                style={{ background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border-subtle)', transition: 'all 0.3s' }}
              />
            </div>
          ))}

          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
              Message
            </label>
            <textarea
              name="message" value={form.message} onChange={handleChange} required rows={5}
              placeholder="Tell me about your project..." className="input-dark"
              style={{ resize: 'vertical', background: 'rgba(255,255,255,0.02)', borderColor: 'var(--border-subtle)', transition: 'all 0.3s' }}
            />
          </div>

          <motion.button
            type="submit"
            className="btn-primary"
            disabled={sending || sent}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            style={{
              width: '100%', justifyContent: 'center',
              opacity: sending ? 0.7 : 1,
              background: 'var(--accent-primary)',
              boxShadow: '0 4px 15px var(--accent-glow-subtle)'
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
              {sent
                ? '✓ Message Sent!'
                : sending
                  ? <><span style={{ display: 'inline-block', width: '13px', height: '13px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} /> Sending...</>
                  : <><HiPaperAirplane style={{ transform: 'rotate(90deg)' }} /> Send Message</>
              }
            </span>
          </motion.button>
        </motion.form>

        {/* ── Info panel ── */}
        <motion.div
          variants={fadeIn('left', 'tween', 0.4, 0.7)}
          style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          {[
            { icon: <HiMail />, label: 'Email', value: contactData.email },
            { icon: <HiLocationMarker />, label: 'Location', value: 'Amravati,Maharashtra, India 🇮🇳' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                padding: '20px 22px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-light)',
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', gap: '16px',
                backdropFilter: 'blur(16px)',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.background = 'var(--bg-glass-hover)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                e.currentTarget.querySelector('.icon-box').style.background = 'var(--accent-glow-subtle)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-light)';
                e.currentTarget.style.background = 'var(--bg-glass)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.querySelector('.icon-box').style.background = 'var(--bg-raised)';
              }}
            >
              <div style={iconBox} className="icon-box">{item.icon}</div>
              <div>
                <p style={{ fontSize: '0.70rem', color: 'var(--text-muted)', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</p>
              </div>
            </div>
          ))}

          {/* Social */}
          <div>
            <p style={{ fontSize: '0.70rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600 }}>
              Connect with me
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map((s) => (
                <motion.a
                  key={s.platform} href={s.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -4 }} whileTap={{ scale: 0.95 }}
                  style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '13px', background: 'var(--bg-glass)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)', fontSize: '1.1rem', transition: 'all 0.22s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-glow-subtle)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.background = 'var(--bg-glass)'; e.currentTarget.style.boxShadow = 'none'; }}
                  aria-label={s.platform}
                >
                  <s.icon />
                </motion.a>
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
            boxShadow: '0 8px 30px rgba(0,0,0,0.2)'
          }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75, fontStyle: 'italic', fontWeight: 300 }}>
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
