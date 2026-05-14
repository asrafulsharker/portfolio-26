'use client';
import { useState } from 'react';
import styles from './ContactPage.module.css';
import NavForFullPage from '../../components/layout/NavForFullPage';


const CONTACT_DATA = {
  heading: 'Get in Touch',
  subtext:
    'I am always open to discussing new research projects, creative ideas, or opportunities to be part of your visions.',
  email: 'hello@asrafulsharker.ai',
  base: 'Silicon Valley, CA',
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      label: 'Twitter / X',
      href: 'https://twitter.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
  ],
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1800);
  };

  return (
    <section className={styles.page}>
                <NavForFullPage/>
      {/* Background blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />

      <div className={styles.wrapper}>
        {/* ── Left Panel ── */}
        <div className={styles.left}>
          <div className={styles.leftInner}>
            <h1 className={styles.heading}>{CONTACT_DATA.heading}</h1>
            <p className={styles.subtext}>{CONTACT_DATA.subtext}</p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <MailIcon />
                </span>
                <div>
                  <span className={styles.infoLabel}>EMAIL</span>
                  <a href={`mailto:${CONTACT_DATA.email}`} className={styles.infoValue}>
                    {CONTACT_DATA.email}
                  </a>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>
                  <PinIcon />
                </span>
                <div>
                  <span className={styles.infoLabel}>BASE</span>
                  <span className={styles.infoValue}>{CONTACT_DATA.base}</span>
                </div>
              </div>
            </div>

            <div className={styles.socials}>
              {CONTACT_DATA.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className={styles.socialBtn}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Decorative circles */}
          <div className={styles.deco1} />
          <div className={styles.deco2} />
        </div>

        {/* ── Right Panel (Form) ── */}
        <div className={styles.right}>
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className={styles.input}
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className={styles.input}
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="Research Collaboration"
                className={styles.input}
                value={form.subject}
                onChange={handleChange}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                className={styles.textarea}
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${status === 'sending' ? styles.sending : ''} ${status === 'sent' ? styles.sent : ''}`}
              disabled={status !== 'idle'}
            >
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && (
                <>
                  <span className={styles.spinner} /> Sending…
                </>
              )}
              {status === 'sent' && (
                <>
                  <CheckIcon /> Message Sent!
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}