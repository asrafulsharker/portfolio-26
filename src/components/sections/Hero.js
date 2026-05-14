'use client';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import ProfileImg from '../../data/image/profile.jpg';

// ── Social links data ─────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    color: '#24292e',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    color: '#0077b5',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@asrafulsharker.ai',
    color: '#1e40af',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'Scholar',
    href: 'https://scholar.google.com',
    color: '#4285f4',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
      </svg>
    ),
  },
  {
    label: 'ORCID',
    href: 'https://orcid.org',
    color: '#a6ce39',
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z" />
      </svg>
    ),
  },
];

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

// ── Animated photo card ───────────────────────────────────────────────────────
function ProfileCard({ data }) {
  return (
    <div className={styles.cardOuter}>
      <img src="https://asrafulme.netlify.app/static/media/gg.3cf6bcfde6f8d910c0f4.jpg" alt="Asraful Sharker" className={styles.cardBg} aria-hidden />
      {/* Orbit rings */}
      <div className={styles.ring1} />
      <div className={styles.ring2} />

      {/* Floating stat badges */}
      <div className={`${styles.floatBadge} ${styles.floatBadge1}`}>
        <span className={styles.floatBadgeIcon}>📄</span>
        <div>
          <div className={styles.floatBadgeNum}>12+</div>
          <div className={styles.floatBadgeLabel}>Publications</div>
        </div>
      </div>
      <div className={`${styles.floatBadge} ${styles.floatBadge2}`}>
        <span className={styles.floatBadgeIcon}>🏆</span>
        <div>
          <div className={styles.floatBadgeNum}>3+</div>
          <div className={styles.floatBadgeLabel}>Years Research</div>
        </div>
      </div>
      <div className={`${styles.floatBadge} ${styles.floatBadge3}`}>
        <span className={styles.floatBadgeIcon}>🤝</span>
        <div>
          <div className={styles.floatBadgeNum}>Open</div>
          <div className={styles.floatBadgeLabel}>to Collab</div>
        </div>
        
      </div>

      {/* Main card */}
      <div className={styles.card}>
        {/* Photo area */}
        <div className={styles.photoWrap}>
          <img
            src="https://asrafulme.netlify.app/static/media/gg.3cf6bcfde6f8d910c0f4.jpg"
            alt="Asraful Sharker"
            className={styles.photo}
            onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
          />
          {/* Fallback avatar if image missing */}
          <div className={styles.photoFallback} style={{ display: 'none' }}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>

          {/* Status pill */}
          <div className={styles.statusPill}>
            <span className={styles.statusDot} />
            Available for research
          </div>
        </div>

        {/* Info strip */}
        <div className={styles.cardInfo}>
          <div className={styles.cardName}>{data?.author?.name || 'Md. Asraful Sharker Nirob'}</div>
          <div className={styles.cardRole}>{data?.author?.role || 'AI Researcher & Frontend Developer'}</div>

          {/* Social row inside card */}
          <div className={styles.cardSocials}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} className={styles.cardSocialBtn}
                style={{ '--social-color': s.color }}
                aria-label={s.label} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────────────────────
export default function Hero({ data }) {
  const contentRef = useRef(null);

  // Staggered entrance animation
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.classList.add(styles.contentVisible);
  }, []);

  return (
    <section className={styles.hero} id="home">
      {/* Animated grid background */}
      <div className={styles.gridBg} aria-hidden />

      {/* Background blobs */}
      <div className={styles.bgBlob1} aria-hidden />
      <div className={styles.bgBlob2} aria-hidden />
      <div className={styles.bgBlob3} aria-hidden />

      <div className={`${styles.inner} container`}>
        {/* ── Left Content ── */}
        <div className={styles.content} ref={contentRef}>

          {/* Badge */}
          <div className={`${styles.badge} ${styles.animItem}`} style={{ '--i': 0 }}>
            {data.badge.dot && <span className={styles.dot} />}
            <span>{data.badge.text}</span>
          </div>

          {/* Title */}
          <h1 className={`${styles.title} ${styles.animItem}`} style={{ '--i': 1 }}>
            {data.titleLines.map((line, i) => (
              <span key={i} className={line.colored ? styles.colored : ''} style={{ display: 'block' }}>
                {line.text}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className={`${styles.desc} ${styles.animItem}`} style={{ '--i': 2 }}>
            {data.description}
          </p>

          {/* CTA Buttons */}
          <div className={`${styles.ctas} ${styles.animItem}`} style={{ '--i': 3 }}>
            {data.cta.map((btn) => (
              <a key={btn.label} href={btn.href}
                className={`${styles.btn} ${styles[`btn${capitalize(btn.variant)}`]}`}>
                {btn.variant === 'primary' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                  </svg>
                )}
                {btn.variant === 'outline' && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 6 }}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                )}
                {btn.label}
              </a>
            ))}
          </div>

          {/* Social Links row */}
          <div className={`${styles.socialRow} ${styles.animItem}`} style={{ '--i': 4 }}>
            <span className={styles.socialRowLabel}>Find me on</span>
            {SOCIAL_LINKS.map(s => (
              <a key={s.label} href={s.href} className={styles.socialLink}
                style={{ '--social-color': s.color }}
                aria-label={s.label} target="_blank" rel="noopener noreferrer">
                {s.icon}
                <span className={styles.socialLinkLabel}>{s.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: Profile Card ── */}
        {data.cvPreview?.show && (
          <div className={`${styles.cardWrap} ${styles.animItem}`} style={{ '--i': 2 }}>
            <ProfileCard data={data} />
          </div>
        )}
      </div>
    </section>
  );
}