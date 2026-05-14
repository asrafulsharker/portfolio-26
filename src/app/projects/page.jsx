'use client';

import { useState, useEffect, useRef } from 'react';

// ── Data ─────────────────────────────────────────────────────────────────────
const PROJECTS_DATA = {
  hero: {
    title: 'Project Portfolio',
    subtitle:
      'A comprehensive gallery showcasing the synergy between deep learning research, modern web architecture, and creative visual computing.',
  },
  filters: ['All Works', 'Web Dev', 'Graphics & UI', 'Deep Learning'],
  sections: [
    {
      id: 'research',
      icon: 'triangle',
      label: 'Research & Deep Learning',
      category: 'Deep Learning',
      projects: [
        {
          id: 'r1',
          type: 'featured',
          tag: 'Deep Learning',
          tagColor: '#2563eb',
          status: 'Publication Ready',
          statusColor: '#16a34a',
          title: 'Precision Grading of Dragon Fruit via CNNs',
          description:
            'Developing a robust deep learning framework for the automated quality assessment and disease detection in dragon fruit. Utilizing state-of-the-art CNN architectures to achieve 98.4% accuracy in classification tasks.',
          chips: ['TensorFlow', 'Python', 'CV2'],
          visual: { color: '#e8f4f0', accent: '#1a7a4a', pattern: 'organic' },
          links: [],
        },
        {
          id: 'r2',
          type: 'side',
          icon: 'bar-chart',
          tag: 'Research',
          tagColor: '#7c3aed',
          title: 'Data Efficiency in Ag-Tech',
          description:
            'Optimizing dataset sizes for resource-constrained environments using active learning techniques.',
          cta: { label: 'Read Paper', href: '#' },
        },
      ],
    },
    {
      id: 'web',
      icon: 'square',
      label: 'Web Engineering (SaaS)',
      category: 'Web Dev',
      projects: [
        {
          id: 'w1',
          type: 'card',
          icon: 'snowflake',
          iconBg: '#dbeafe',
          iconColor: '#2563eb',
          title: 'Nexus AI Dashboard',
          description:
            'A high-performance SaaS analytics platform built with Next.js 14 and Tailwind CSS. Features real-time data streaming and a custom-built component library.',
          chips: ['Next.js', 'TypeScript', 'Prisma'],
          links: [{ icon: 'external', href: '#' }, { icon: 'code', href: '#' }],
        },
        {
          id: 'w2',
          type: 'card',
          icon: 'circle-dot',
          iconBg: '#dbeafe',
          iconColor: '#1d4ed8',
          title: 'FinTech Orchestrator',
          description:
            'Scalable payment infrastructure for enterprise clients. Focused on low-latency transactions and enterprise-grade security protocols.',
          chips: ['React', 'Node.js', 'Stripe SDK'],
          links: [{ icon: 'external', href: '#' }, { icon: 'code', href: '#' }],
        },
      ],
    },
    {
      id: 'graphics',
      icon: 'slash',
      label: 'Graphics & Visual Systems',
      category: 'Graphics & UI',
      projects: [
        {
          id: 'g1',
          type: 'visual-light',
          tag: 'Visual Identity',
          title: 'Branding Architecture',
          description:
            'Precision vector designs focused on minimal aesthetics and scalable brand systems using Adobe Creative Cloud.',
          visual: { color: '#f0f4ff', accent: '#3b82f6', pattern: 'sphere' },
        },
        {
          id: 'g2',
          type: 'visual-dark',
          title: 'Real-time Rendering Engine',
          description:
            'Custom C++ and OpenGL shader implementation for high-fidelity particle simulations and volumetric lighting.',
          visual: { color: '#071022', accent: '#38bdf8', pattern: 'matrix' },
          cta: { label: 'View Demo', href: '#' },
          meta: 'C++ · GLSL · HLSL',
        },
      ],
    },
  ],
};

// ── SVG Patterns ──────────────────────────────────────────────────────────────
function PatternBg({ pattern, color, accent }) {
  const uid = useRef(`pp${Math.random().toString(36).slice(2, 6)}`).current;
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0 }} aria-hidden="true">
      <rect width="100%" height="100%" fill={color} />
      {pattern === 'organic' && (
        <>
          <circle cx="38%" cy="48%" r="34%" fill={accent} fillOpacity="0.13" />
          <circle cx="62%" cy="52%" r="22%" fill={accent} fillOpacity="0.08" />
          {[0,1,2,3].map(i => (
            <ellipse key={i} cx={`${35+i*8}%`} cy={`${45+i*5}%`} rx={`${18+i*4}%`} ry={`${10+i*3}%`}
              fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity={0.3-i*0.06} />
          ))}
        </>
      )}
      {pattern === 'sphere' && (
        <>
          <defs>
            <radialGradient id={`sg-${uid}`} cx="38%" cy="38%" r="55%">
              <stop offset="0%" stopColor={accent} stopOpacity="0.35" />
              <stop offset="100%" stopColor={accent} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="40%" cy="55%" r="32%" fill={`url(#sg-${uid})`} />
          {[12,22,32].map(r => (
            <circle key={r} cx="40%" cy="55%" r={`${r}%`} fill="none"
              stroke={accent} strokeWidth="0.6" strokeOpacity={0.45 - r*0.009} />
          ))}
          {[0,1,2,3].map(i => {
            const a = (i/4)*Math.PI*2;
            return <line key={i} x1="40%" y1="55%"
              x2={`${40+Math.cos(a)*34}%`} y2={`${55+Math.sin(a)*34}%`}
              stroke={accent} strokeWidth="0.4" strokeOpacity="0.3" />;
          })}
        </>
      )}
      {pattern === 'matrix' && (
        <>
          <defs>
            <pattern id={`mt-${uid}`} width="18" height="18" patternUnits="userSpaceOnUse">
              <text x="2" y="13" fontSize="10" fill={accent} fillOpacity="0.22" fontFamily="monospace">
                {Math.random() > 0.5 ? '1' : '0'}
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#mt-${uid})`} />
          {[0,1,2,3,4,5].map(i => (
            <line key={i} x1={`${i*20}%`} y1="0" x2={`${i*20+10}%`} y2="100%"
              stroke={accent} strokeWidth="0.3" strokeOpacity="0.18" />
          ))}
          <rect x="10%" y="15%" width="80%" height="70%" rx="2"
            fill={accent} fillOpacity="0.04" />
        </>
      )}
    </svg>
  );
}

// ── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ label }) {
  return (
    <span style={{
      fontSize: '0.7rem', fontFamily: 'var(--font-mono)',
      padding: '3px 10px', borderRadius: '9999px',
      background: 'var(--color-background-alt,#eef2ff)',
      color: 'var(--color-text-muted)',
      border: '1px solid var(--color-border)',
      whiteSpace: 'nowrap',
    }}>{label}</span>
  );
}

// ── Section Icon ─────────────────────────────────────────────────────────────
function SectionIcon({ type }) {
  const icons = {
    triangle: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l9 18H3L12 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    square: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    slash: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 4l-8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  };
  return icons[type] || null;
}

// ── Fade wrapper ──────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('prj-vis');
    }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="prj-reveal" style={{ '--prj-delay': `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ── Research Section ──────────────────────────────────────────────────────────
function ResearchSection({ section }) {
  const featured = section.projects.find(p => p.type === 'featured');
  const side = section.projects.find(p => p.type === 'side');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'stretch' }}
      className="prj-research-grid">
      {/* Featured */}
      <Reveal delay={0}>
        <div className="prj-card prj-featured">
          <div className="prj-featured-img">
            <PatternBg pattern={featured.visual.pattern} color={featured.visual.color} accent={featured.visual.accent} />
            <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 8, zIndex: 1 }}>
              <span className="prj-badge" style={{ background: featured.tagColor + '22', color: featured.tagColor }}>{featured.tag}</span>
              <span className="prj-badge" style={{ background: featured.statusColor + '22', color: featured.statusColor }}>{featured.status}</span>
            </div>
          </div>
          <div className="prj-card-body">
            <h3 className="prj-card-title">{featured.title}</h3>
            <p className="prj-card-desc">{featured.description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 14 }}>
              {featured.chips.map(c => <Chip key={c} label={c} />)}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Side */}
      <Reveal delay={80}>
        <div className="prj-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{
              width: 44, height: 44, borderRadius: 10,
              background: 'var(--color-background-alt,#eef2ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16, color: '#7c3aed',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className="prj-badge" style={{ background: '#ede9fe', color: '#7c3aed', marginBottom: 10, display: 'inline-block' }}>{side.tag}</span>
            <h3 className="prj-card-title">{side.title}</h3>
            <p className="prj-card-desc" style={{ marginTop: 8 }}>{side.description}</p>
          </div>
          {side.cta && (
            <a href={side.cta.href} className="prj-cta-link" style={{ marginTop: 20 }}>
              {side.cta.label}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </a>
          )}
        </div>
      </Reveal>
    </div>
  );
}

// ── Web Section ───────────────────────────────────────────────────────────────
function WebSection({ section }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      className="prj-two-col">
      {section.projects.map((p, i) => (
        <Reveal key={p.id} delay={i * 80}>
          <div className="prj-card" style={{ height: '100%' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: p.iconBg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: p.iconColor,
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {p.icon === 'snowflake'
                    ? <><path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>
                    : <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8"/>}
                </svg>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {p.links.map((l, li) => (
                  <a key={li} href={l.href} style={{
                    width: 30, height: 30, borderRadius: 6,
                    border: '1.5px solid var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-text-muted)', transition: 'all 0.2s',
                    background: 'var(--color-surface)',
                  }}
                    aria-label={l.icon === 'external' ? 'Open project' : 'View code'}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                  >
                    {l.icon === 'external'
                      ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                      : <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    }
                  </a>
                ))}
              </div>
            </div>
            <h3 className="prj-card-title">{p.title}</h3>
            <p className="prj-card-desc" style={{ marginTop: 8, marginBottom: 14 }}>{p.description}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {p.chips.map(c => <Chip key={c} label={c} />)}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ── Graphics Section ──────────────────────────────────────────────────────────
function GraphicsSection({ section }) {
  const light = section.projects.find(p => p.type === 'visual-light');
  const dark = section.projects.find(p => p.type === 'visual-dark');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}
      className="prj-two-col">
      {/* Light card */}
      <Reveal delay={0}>
        <div className="prj-card prj-gfx-card" style={{ overflow: 'hidden', padding: 0, height: '100%' }}>
          <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
            <PatternBg pattern={light.visual.pattern} color={light.visual.color} accent={light.visual.accent} />
          </div>
          <div className="prj-card-body">
            <span className="prj-badge" style={{ background: '#dbeafe', color: '#1d4ed8', marginBottom: 8, display: 'inline-block' }}>Visual Identity</span>
            <h3 className="prj-card-title">{light.title}</h3>
            <p className="prj-card-desc" style={{ marginTop: 8 }}>{light.description}</p>
          </div>
        </div>
      </Reveal>

      {/* Dark card */}
      <Reveal delay={80}>
        <div className="prj-card prj-gfx-dark" style={{ overflow: 'hidden', padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ position: 'relative', flex: 1, minHeight: 200, overflow: 'hidden' }}>
            <PatternBg pattern={dark.visual.pattern} color={dark.visual.color} accent={dark.visual.accent} />
            {/* Overlay content */}
            <div style={{
              position: 'absolute', inset: 0, padding: '24px',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              background: 'linear-gradient(to top, rgba(5,12,30,0.85) 0%, transparent 50%)',
            }}>
              <h3 style={{ color: '#fff', fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 700, marginBottom: 8 }}>
                {dark.title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', lineHeight: 1.55, marginBottom: 16 }}>
                {dark.description}
              </p>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                {dark.cta && (
                  <a href={dark.cta.href} style={{
                    padding: '7px 18px', borderRadius: '9999px',
                    background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(6px)',
                    color: '#fff', fontSize: '0.8rem', fontWeight: 600,
                    textDecoration: 'none', border: '1px solid rgba(255,255,255,0.25)',
                    transition: 'background 0.2s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.28)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
                  >{dark.cta.label}</a>
                )}
                {dark.meta && (
                  <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                    {dark.meta}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const { hero, filters, sections } = PROJECTS_DATA;
  const [active, setActive] = useState('All Works');

  const visible = sections.filter(s =>
    active === 'All Works' || s.category === active
  );

  return (
    <>
      <style>{`
        .prj-page { min-height: 100vh; padding: 96px 0 100px; background: var(--color-background); }
        .prj-container { width: 100%; max-width: 1140px; margin: 0 auto; padding: 0 24px; }

        /* Reveal animation */
        .prj-reveal { opacity: 0; transform: translateY(22px); }
        .prj-vis { animation: prjFade 0.55s cubic-bezier(0.22,1,0.36,1) var(--prj-delay,0ms) both; }
        @keyframes prjFade { to { opacity:1; transform:none; } }

        /* Hero */
        .prj-hero { margin-bottom: 52px; }
        .prj-hero-title {
          font-family: var(--font-heading); font-size: clamp(2rem,5vw,3.2rem);
          font-weight: 800; color: var(--color-primary,#1a2f6b);
          letter-spacing: -0.02em; line-height: 1.08; margin-bottom: 14px;
        }
        .prj-hero-sub { font-size: 1rem; color: var(--color-text-muted); max-width: 560px; line-height: 1.65; margin-bottom: 28px; }

        /* Filters */
        .prj-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .prj-filter-btn {
          padding: 6px 18px; border-radius: 9999px; font-size: 0.8rem; font-weight: 500;
          font-family: var(--font-body); border: 1.5px solid var(--color-border);
          background: var(--color-surface); color: var(--color-text-muted);
          cursor: pointer; transition: all 0.2s;
        }
        .prj-filter-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .prj-filter-btn.active { background: var(--color-primary,#1a2f6b); color:#fff; border-color:var(--color-primary,#1a2f6b); }

        /* Section heading */
        .prj-section { margin-bottom: 56px; }
        .prj-section-hd {
          display: flex; align-items: center; gap: 10px;
          font-family: var(--font-heading); font-size: 1.22rem; font-weight: 700;
          color: var(--color-text); margin-bottom: 24px;
          padding-bottom: 14px; border-bottom: 1.5px solid var(--color-border);
        }
        .prj-section-hd-icon {
          width: 28px; height: 28px; border-radius: 6px;
          background: var(--color-background-alt,#eef2ff);
          display:flex;align-items:center;justify-content:center;
          color: var(--color-accent);
        }

        /* Card */
        .prj-card {
          background: var(--color-surface); border: 1.5px solid var(--color-border);
          border-radius: var(--radius-lg,22px); padding: 24px;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s, border-color 0.22s;
          box-shadow: var(--shadow-card);
        }
        .prj-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); border-color: var(--color-accent); }

        /* Featured */
        .prj-featured { padding: 0; overflow: hidden; }
        .prj-featured-img { position: relative; height: 240px; overflow: hidden; }
        .prj-card-body { padding: 22px 24px 24px; }
        .prj-card-title { font-family: var(--font-heading); font-size: 1.05rem; font-weight: 700; color: var(--color-text); line-height:1.3; }
        .prj-card-desc { font-size: 0.84rem; color: var(--color-text-muted); line-height:1.6; margin-top:8px; }

        /* Badge */
        .prj-badge {
          display: inline-block; font-size: 0.68rem; font-weight: 600;
          letter-spacing: 0.07em; text-transform: uppercase;
          padding: 3px 10px; border-radius: 9999px;
        }

        /* CTA link */
        .prj-cta-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.82rem; font-weight: 600;
          color: var(--color-primary,#1a2f6b); text-decoration: none;
          transition: gap 0.2s, color 0.2s;
        }
        .prj-cta-link:hover { gap: 10px; color: var(--color-accent); }

        /* Responsive */
        @media (max-width: 860px) {
          .prj-research-grid { grid-template-columns: 1fr !important; }
          .prj-two-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .prj-page { padding: 64px 0 72px; }
          .prj-container { padding: 0 16px; }
        }
      `}</style>

      <div className="prj-page" id="projects">
        <div className="prj-container">

          {/* Hero */}
          <header className="prj-hero prj-reveal prj-vis" style={{ '--prj-delay': '0ms' }}>
            <h1 className="prj-hero-title">{hero.title}</h1>
            <p className="prj-hero-sub">{hero.subtitle}</p>
            <div className="prj-filters" role="group" aria-label="Filter projects">
              {filters.map(f => (
                <button key={f}
                  className={`prj-filter-btn${active === f ? ' active' : ''}`}
                  onClick={() => setActive(f)}
                  aria-pressed={active === f}
                >{f}</button>
              ))}
            </div>
          </header>

          {/* Sections */}
          {visible.map((section, si) => (
            <section key={section.id} className="prj-section" aria-labelledby={`sec-${section.id}`}>
              <Reveal delay={si * 40}>
                <div className="prj-section-hd" id={`sec-${section.id}`}>
                  <span className="prj-section-hd-icon" aria-hidden="true">
                    <SectionIcon type={section.icon} />
                  </span>
                  {section.label}
                </div>
              </Reveal>

              {section.id === 'research' && <ResearchSection section={section} />}
              {section.id === 'web' && <WebSection section={section} />}
              {section.id === 'graphics' && <GraphicsSection section={section} />}
            </section>
          ))}

        </div>
      </div>
    </>
  );
}