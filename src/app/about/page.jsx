'use client';

import { useState, useEffect, useRef } from 'react';
import NavForFullPage from '../../components/layout/NavForFullPage';

// ── Data ─────────────────────────────────────────────────────────────────────
const ABOUT_DATA = {
  hero: {
    eyebrow: 'Portfolio',
    title: 'Scientific Inquiry\n& Digital Engineering.',
    subtitle:
      'Bridging the gap between deep learning theory and practical application through rigorous experimentation and design excellence.',
  },
  featuredProject: {
    tags: ['Deep Learning', 'Ag-Tech'],
    title:
      'Web based application for identification of maturity and pollination stages of dragon fruits using deep learning',
    description:
      'A comprehensive end-to-end system utilizing Convolutional Neural Networks to assist farmers and researchers in precision agriculture, ensuring optimal harvest timing.',
    cta: { label: 'View Case Study', href: '#' },
    visual: { color: '#071422', accent: '#38bdf8', pattern: 'glow' },
    imageAlt: 'Dragon fruit deep learning project visualization',
  },
  lab: {
    title: 'Health Informatics Research Lab (HIRL)',
    role: 'CRC Member for Disease Control',
    description:
      'Dedicated to advancing the frontiers of data science within healthcare. Our work at HIRL focuses on creating interpretable AI models that provide actionable insights for clinicians and policy makers.',
    highlights: [
      {
        icon: 'db',
        label: 'Data Interpretation',
        desc: 'Developing algorithms to parse complex medical datasets.',
      },
      {
        icon: 'signal',
        label: 'Bio-Signal Analysis',
        desc: 'Real-time processing of patient vital metrics using edge computing.',
      },
    ],
    visual1: { color: '#071a2e', accent: '#06b6d4', pattern: 'corridor' },
    visual2: { color: '#050d1c', accent: '#818cf8', pattern: 'wave' },
  },
  timeline: {
    title: 'Professional Journey',
    range: '2018 — PRESENT',
    items: [
      {
        id: 't1',
        icon: 'chart',
        role: 'Data Analyst',
        org: 'CDC (Center for Disease Control)',
        type: 'Present',
        typeColor: '#16a34a',
        period: null,
        desc: 'Spearheading statistical analysis for regional epidemiological surveys and public health data infrastructure optimization.',
      },
      {
        id: 't2',
        icon: 'code',
        role: 'Software Engineering Lead',
        org: 'Technify Inc.',
        type: null,
        period: '2020 — 2023',
        desc: 'Architected cloud-native solutions for high-performance SaaS platforms, managing a team of five engineers across full-stack delivery cycles.',
      },
      {
        id: 't3',
        icon: 'research',
        role: 'Research Assistant',
        org: 'Health Informatics Research Lab (HIRL)',
        type: null,
        period: '2018 — 2021',
        desc: 'Implemented deep learning pipelines for medical imaging classification and assisted in publishing peer-reviewed research papers.',
      },
    ],
  },
  contact: {
    title: 'Connect & Collaborate',
    links: [
      { label: 'Email', icon: 'mail', href: 'mailto:asraful@example.com' },
      { label: 'Scholar', icon: 'scholar', href: '#' },
      { label: 'ORCID', icon: 'orcid', href: '#' },
      { label: 'Website', icon: 'globe', href: '#' },
      { label: 'ResearchGate', icon: 'rg', href: '#' },
    ],
  },
};

// ── SVG Patterns ──────────────────────────────────────────────────────────────
function SceneBg({ pattern, color, accent }) {
  const uid = useRef(`sb${Math.random().toString(36).slice(2, 6)}`).current;
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      <rect width="100%" height="100%" fill={color} />
      {pattern === 'glow' && (
        <>
          <defs>
            <radialGradient id={`g1-${uid}`} cx="35%" cy="60%" r="50%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.25" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`g2-${uid}`} cx="70%" cy="35%" r="40%">
              <stop offset="0%" stopColor="#c084fc" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill={`url(#g1-${uid})`} />
          <rect width="100%" height="100%" fill={`url(#g2-${uid})`} />
          {[0,1,2,3,4].map(i => (
            <line key={i} x1={`${i*22}%`} y1="100%" x2={`${10+i*18}%`} y2="0%"
              stroke={accent} strokeWidth="0.3" strokeOpacity="0.18" />
          ))}
          <circle cx="35%" cy="62%" r="18%" fill={accent} fillOpacity="0.06" />
        </>
      )}
      {pattern === 'corridor' && (
        <>
          {[0,1,2,3].map(i => (
            <rect key={i} x={`${10+i*8}%`} y={`${5+i*8}%`}
              width={`${80-i*16}%`} height={`${90-i*16}%`}
              rx="2" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity={0.4-i*0.08} />
          ))}
          <rect x="20%" y="20%" width="60%" height="60%" fill={accent} fillOpacity="0.05" />
          <circle cx="50%" cy="50%" r="10%" fill={accent} fillOpacity="0.12" />
        </>
      )}
      {pattern === 'wave' && (
        <>
          {[0,1,2,3].map(i => (
            <ellipse key={i} cx="50%" cy="50%" rx={`${18+i*14}%`} ry={`${9+i*7}%`}
              fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity={0.45-i*0.09} />
          ))}
          <circle cx="50%" cy="50%" r="6%" fill={accent} fillOpacity="0.2" />
          <line x1="0" y1="50%" x2="100%" y2="50%" stroke={accent} strokeWidth="0.3" strokeOpacity="0.2" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke={accent} strokeWidth="0.3" strokeOpacity="0.2" />
        </>
      )}
    </svg>
  );
}

// ── Reveal ─────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('ab-vis');
    }, { threshold: 0.07 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="ab-reveal" style={{ '--ab-d': `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ── Contact Icon ──────────────────────────────────────────────────────────────
function ContactIcon({ type }) {
  const icons = {
    mail: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5"/>,
    scholar: <><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
    orcid: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M9 8v8M12 8c2 0 4 .9 4 4s-2 4-4 4h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
    globe: <><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/><path d="M12 3c-2 4-2 14 0 18M3 12h18" stroke="currentColor" strokeWidth="1.5"/><path d="M4.2 7.5C6 9 9 10 12 10s6-1 7.8-2.5M4.2 16.5C6 15 9 14 12 14s6 1 7.8 2.5" stroke="currentColor" strokeWidth="1.2"/></>,
    rg: <><rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M8 8h4c1.5 0 2.5 1 2.5 2.5S13.5 13 12 13H8v5M14 13l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>,
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icons[type] || icons.globe}
    </svg>
  );
}

// ── Timeline Icon ─────────────────────────────────────────────────────────────
function TimelineIcon({ type }) {
  if (type === 'chart') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 3v18h18M7 16l4-4 4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (type === 'code') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 18l6-6-6-6M8 6L2 12l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2l3 6.3L22 9.3l-5 4.9 1.2 6.8L12 18l-6.2 3 1.2-6.8L2 9.3l7-.7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const { hero, featuredProject, lab, timeline, contact } = ABOUT_DATA;

  return (
    <>
      <style>{`
        .ab-page { min-height:100vh; padding:88px 0 0; background:#f0f4ff; font-family:'DM Sans',sans-serif; }
        .ab-container { width:100%; max-width:1060px; margin:0 auto; padding:0 28px; }

        /* Reveal */
        .ab-reveal { opacity:0; transform:translateY(20px); }
        .ab-vis { animation:abFade 0.54s cubic-bezier(0.22,1,0.36,1) var(--ab-d,0ms) both; }
        @keyframes abFade { to { opacity:1; transform:none; } }

        /* ── Hero ── */
        .ab-hero { padding:52px 0 0; }
        .ab-eyebrow {
          display:inline-block; font-size:0.7rem; font-weight:600;
          letter-spacing:0.12em; text-transform:uppercase;
          color:#2563eb; background:#dbeafe; padding:3px 12px;
          border-radius:9999px; margin-bottom:18px;
        }
        .ab-hero-title {
          font-family:'Sora',sans-serif; font-size:clamp(1.9rem,4.5vw,3rem);
          font-weight:800; color:#1a2f6b; line-height:1.12;
          letter-spacing:-0.02em; margin-bottom:16px;
          white-space:pre-line;
        }
        .ab-hero-sub { font-size:0.95rem; color:#64748b; max-width:480px; line-height:1.65; margin-bottom:40px; }

        /* ── Featured Project ── */
        .ab-featured {
          display:grid; grid-template-columns:1fr 1fr;
          gap:0; border-radius:20px; overflow:hidden;
          border:1.5px solid #e2e8f0;
          box-shadow:0 8px 40px rgba(26,47,107,0.12);
          margin-bottom:72px;
          background:#fff;
        }
        .ab-featured-visual { position:relative; min-height:300px; overflow:hidden; }
        .ab-featured-content { padding:36px 32px; display:flex; flex-direction:column; justify-content:center; }
        .ab-feat-tags { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; }
        .ab-feat-tag {
          font-size:0.68rem; font-weight:600; letter-spacing:0.07em;
          text-transform:uppercase; padding:3px 10px; border-radius:9999px;
        }
        .ab-feat-title {
          font-family:'Sora',sans-serif; font-size:1.15rem; font-weight:700;
          color:#0f172a; line-height:1.4; margin-bottom:14px;
        }
        .ab-feat-desc { font-size:0.84rem; color:#64748b; line-height:1.65; margin-bottom:24px; }
        .ab-feat-cta {
          display:inline-flex; align-items:center; gap:8px;
          background:#1a2f6b; color:#fff; font-size:0.82rem; font-weight:700;
          padding:10px 22px; border-radius:9999px; text-decoration:none;
          width:fit-content; transition:background 0.2s, transform 0.15s;
        }
        .ab-feat-cta:hover { background:#2563eb; transform:translateX(2px); }

        /* ── Lab ── */
        .ab-lab {
          display:grid; grid-template-columns:1fr 1fr;
          gap:40px; margin-bottom:72px; align-items:center;
        }
        .ab-lab-text {}
        .ab-lab-title {
          font-family:'Sora',sans-serif; font-size:1.45rem; font-weight:800;
          color:#1a2f6b; margin-bottom:6px; line-height:1.2;
        }
        .ab-lab-role { font-size:0.78rem; color:#94a3b8; font-family:'JetBrains Mono',monospace; margin-bottom:16px; }
        .ab-lab-desc { font-size:0.88rem; color:#64748b; line-height:1.68; margin-bottom:24px; }
        .ab-lab-hl { display:flex; flex-direction:column; gap:14px; }
        .ab-lab-hl-item {
          display:flex; gap:12px; align-items:flex-start;
          background:#fff; border:1.5px solid #e2e8f0; border-radius:12px; padding:14px 16px;
          transition:border-color 0.2s, box-shadow 0.2s;
        }
        .ab-lab-hl-item:hover { border-color:#93c5fd; box-shadow:0 4px 16px rgba(26,47,107,0.08); }
        .ab-lab-hl-icon {
          width:34px; height:34px; border-radius:8px;
          background:#dbeafe; color:#2563eb;
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .ab-lab-hl-label { font-size:0.85rem; font-weight:700; color:#1a2f6b; margin-bottom:3px; }
        .ab-lab-hl-desc { font-size:0.78rem; color:#64748b; line-height:1.5; }
        .ab-lab-visuals { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .ab-lab-vis { position:relative; border-radius:14px; overflow:hidden; border:1.5px solid #e2e8f0; }
        .ab-lab-vis-1 { aspect-ratio:1; }
        .ab-lab-vis-2 { aspect-ratio:1; }

        /* ── Timeline ── */
        .ab-timeline-hd {
          display:flex; align-items:baseline; justify-content:space-between;
          margin-bottom:28px; flex-wrap:wrap; gap:8px;
        }
        .ab-timeline-title {
          font-family:'Sora',sans-serif; font-size:1.35rem; font-weight:800; color:#1a2f6b;
        }
        .ab-timeline-range { font-family:'JetBrains Mono',monospace; font-size:0.74rem; color:#94a3b8; }
        .ab-timeline { display:flex; flex-direction:column; gap:0; margin-bottom:72px; position:relative; }
        .ab-timeline::before {
          content:''; position:absolute; left:22px; top:28px; bottom:28px;
          width:1.5px; background:linear-gradient(to bottom,#dbeafe,#e2e8f0);
          z-index:0;
        }
        .ab-tl-item {
          display:grid; grid-template-columns:48px 1fr;
          gap:16px; padding:0 0 24px; position:relative; z-index:1;
        }
        .ab-tl-item:last-child { padding-bottom:0; }
        .ab-tl-dot {
          width:44px; height:44px; border-radius:50%;
          background:#fff; border:2px solid #dbeafe;
          display:flex; align-items:center; justify-content:center;
          color:#2563eb; flex-shrink:0;
          box-shadow:0 2px 10px rgba(26,47,107,0.1);
          transition:border-color 0.2s, background 0.2s;
        }
        .ab-tl-item:hover .ab-tl-dot { background:#dbeafe; border-color:#2563eb; }
        .ab-tl-card {
          background:#fff; border:1.5px solid #e2e8f0; border-radius:14px;
          padding:18px 20px;
          box-shadow:0 2px 10px rgba(26,47,107,0.05);
          transition:transform 0.25s, box-shadow 0.25s, border-color 0.2s;
        }
        .ab-tl-card:hover { transform:translateX(4px); box-shadow:0 6px 24px rgba(26,47,107,0.1); border-color:#93c5fd; }
        .ab-tl-hd { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; margin-bottom:4px; flex-wrap:wrap; }
        .ab-tl-role { font-family:'Sora',sans-serif; font-size:0.97rem; font-weight:700; color:#0f172a; }
        .ab-tl-period { font-family:'JetBrains Mono',monospace; font-size:0.7rem; color:#94a3b8; white-space:nowrap; }
        .ab-tl-present { font-size:0.68rem; font-weight:700; padding:2px 9px; border-radius:9999px; background:#dcfce7; color:#16a34a; }
        .ab-tl-org { font-size:0.78rem; color:#2563eb; margin-bottom:8px; font-weight:500; }
        .ab-tl-desc { font-size:0.82rem; color:#64748b; line-height:1.6; }

        /* ── Contact ── */
        .ab-contact { background:#1a2f6b; padding:56px 40px; text-align:center; }
        .ab-contact-inner { max-width:1060px; margin:0 auto; padding:0 28px; }
        .ab-contact-title {
          font-family:'Sora',sans-serif; font-size:1.6rem; font-weight:800;
          color:#fff; margin-bottom:36px;
        }
        .ab-contact-links { display:flex; justify-content:center; gap:20px; flex-wrap:wrap; }
        .ab-contact-link {
          display:flex; flex-direction:column; align-items:center; gap:8px;
          color:rgba(255,255,255,0.7); text-decoration:none;
          padding:16px 20px; border-radius:14px;
          border:1.5px solid rgba(255,255,255,0.12);
          background:rgba(255,255,255,0.06);
          transition:all 0.22s; min-width:80px;
        }
        .ab-contact-link:hover { background:rgba(255,255,255,0.14); border-color:rgba(255,255,255,0.3); color:#fff; transform:translateY(-3px); }
        .ab-contact-link span { font-size:0.72rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; }

        /* ── Footer ── */
        .ab-footer { background:#f0f4ff; border-top:1.5px solid #e2e8f0; padding:24px 28px; }
        .ab-footer-inner { max-width:1060px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; }
        .ab-footer-brand { font-family:'Sora',sans-serif; font-size:0.9rem; font-weight:700; color:#1a2f6b; }
        .ab-footer-copy { font-size:0.75rem; color:#94a3b8; margin-top:3px; }
        .ab-footer-links { display:flex; gap:16px; }
        .ab-footer-links a { font-size:0.78rem; color:#64748b; text-decoration:none; transition:color 0.2s; }
        .ab-footer-links a:hover { color:#2563eb; }

        /* ── Responsive ── */
        @media (max-width:820px) {
          .ab-featured { grid-template-columns:1fr; }
          .ab-featured-visual { min-height:220px; }
          .ab-lab { grid-template-columns:1fr; }
          .ab-lab-visuals { grid-template-columns:1fr 1fr; }
        }
        @media (max-width:560px) {
          .ab-page { padding-top:64px; }
          .ab-container { padding:0 16px; }
          .ab-contact { padding:40px 16px; }
          .ab-contact-links { gap:12px; }
          .ab-contact-link { padding:12px 14px; min-width:60px; }
          .ab-lab-visuals { display:none; }
        }
      `}</style>

      <div className="ab-page" id="about">
        <NavForFullPage/>

        {/* ── Hero ── */}
        <div className="ab-container">
          <header className="ab-hero">
            <Reveal delay={0}>
              <span className="ab-eyebrow">{hero.eyebrow}</span>
              <h1 className="ab-hero-title">{hero.title}</h1>
              <p className="ab-hero-sub">{hero.subtitle}</p>
            </Reveal>

            {/* ── Featured Project ── */}
            <Reveal delay={80}>
              <div className="ab-featured">
                <div className="ab-featured-visual">
                  <SceneBg pattern={featuredProject.visual.pattern} color={featuredProject.visual.color} accent={featuredProject.visual.accent} />
                  {/* Decorative dragon fruit silhouette */}
                  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <ellipse cx="160" cy="200" rx="80" ry="95" fill="#e8f4e8" fillOpacity="0.12" />
                    <ellipse cx="230" cy="185" rx="65" ry="80" fill="#ef4444" fillOpacity="0.08" />
                    {[0,1,2,3,4,5,6,7].map(i => {
                      const a = (i/8)*Math.PI*2;
                      return <line key={i} x1="160" y1="130"
                        x2={160+Math.cos(a)*45} y2={130+Math.sin(a)*45}
                        stroke="#38bdf8" strokeWidth="0.6" strokeOpacity="0.25" />;
                    })}
                    <circle cx="160" cy="130" r="18" fill="#38bdf8" fillOpacity="0.12" />
                  </svg>
                </div>
                <div className="ab-featured-content">
                  <div className="ab-feat-tags">
                    {featuredProject.tags.map(t => (
                      <span key={t} className="ab-feat-tag"
                        style={ t === 'Deep Learning'
                          ? { background:'#dbeafe', color:'#1d4ed8' }
                          : { background:'#dcfce7', color:'#15803d' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="ab-feat-title">{featuredProject.title}</h2>
                  <p className="ab-feat-desc">{featuredProject.description}</p>
                  <a href={featuredProject.cta.href} className="ab-feat-cta">
                    {featuredProject.cta.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            </Reveal>

            {/* ── Lab Section ── */}
            <Reveal delay={0}>
              <div className="ab-lab">
                <div className="ab-lab-text">
                  <h2 className="ab-lab-title">{lab.title}</h2>
                  <p className="ab-lab-role">{lab.role}</p>
                  <p className="ab-lab-desc">{lab.description}</p>
                  <div className="ab-lab-hl">
                    {lab.highlights.map((h, i) => (
                      <div key={i} className="ab-lab-hl-item">
                        <div className="ab-lab-hl-icon">
                          {h.icon === 'db'
                            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" strokeWidth="1.5"/><path d="M21 12c0 1.66-4.03 3-9 3S3 13.66 3 12M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" stroke="currentColor" strokeWidth="1.5"/></svg>
                            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          }
                        </div>
                        <div>
                          <div className="ab-lab-hl-label">{h.label}</div>
                          <div className="ab-lab-hl-desc">{h.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ab-lab-visuals">
                  <div className="ab-lab-vis ab-lab-vis-1">
                    <SceneBg pattern={lab.visual1.pattern} color={lab.visual1.color} accent={lab.visual1.accent} />
                  </div>
                  <div className="ab-lab-vis ab-lab-vis-2" style={{ alignSelf:'end' }}>
                    <SceneBg pattern={lab.visual2.pattern} color={lab.visual2.color} accent={lab.visual2.accent} />
                  </div>
                </div>
              </div>
            </Reveal>

            {/* ── Timeline ── */}
            <section aria-labelledby="journey-title" style={{ marginBottom: 72 }}>
              <Reveal delay={0}>
                <div className="ab-timeline-hd">
                  <h2 id="journey-title" className="ab-timeline-title">{timeline.title}</h2>
                  <span className="ab-timeline-range">{timeline.range}</span>
                </div>
              </Reveal>
              <div className="ab-timeline" role="list">
                {timeline.items.map((item, i) => (
                  <Reveal key={item.id} delay={i * 80}>
                    <div className="ab-tl-item" role="listitem">
                      <div className="ab-tl-dot">
                        <TimelineIcon type={item.icon} />
                      </div>
                      <div className="ab-tl-card">
                        <div className="ab-tl-hd">
                          <span className="ab-tl-role">{item.role}</span>
                          {item.type
                            ? <span className="ab-tl-present">{item.type}</span>
                            : <span className="ab-tl-period">{item.period}</span>
                          }
                        </div>
                        <div className="ab-tl-org">{item.org}</div>
                        <p className="ab-tl-desc">{item.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          </header>
        </div>

        {/* ── Contact ── */}
        <div className="ab-contact">
          <div className="ab-contact-inner">
            <Reveal delay={0}>
              <h2 className="ab-contact-title">{contact.title}</h2>
              <nav className="ab-contact-links" aria-label="Contact and social links">
                {contact.links.map(l => (
                  <a key={l.label} href={l.href} className="ab-contact-link"
                    aria-label={l.label}
                    {...(l.href.startsWith('http') ? { target:'_blank', rel:'noopener noreferrer' } : {})}>
                    <ContactIcon type={l.icon} />
                    <span>{l.label}</span>
                  </a>
                ))}
              </nav>
            </Reveal>
          </div>
        </div>

      </div>
    </>
  );
}