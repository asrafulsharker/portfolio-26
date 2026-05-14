'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ── Data ─────────────────────────────────────────────────────────────────────
const PAGE_DATA = {
  hero: {
    eyebrow: 'Gallery & Blog',
    title: 'Inquiry & Visuals',
    subtitle:
      'Technical thoughts, project post-mortems, and candid reflections on the evolving landscape of Artificial Intelligence.',
  },
  gallery: {
    title: 'Visual Research Archive',
    subtitle: 'A collection of visual research artifacts and deep dives into the architecture of modern AI and software development.',
    filters: ['All Images', 'Neural Nets', 'Last Work'],
    items: [
      {
        id: 'v1',
        title: 'Computational Core',
        category: 'Neural Nets',
        description: 'Architecture of the primary research cluster used for large-scale training.',
        color: '#0d1117',
        accent: '#38bdf8',
        pattern: 'grid',
        span: 1,
      },
      {
        id: 'v2',
        title: 'Kinetic Lab',
        category: 'Last Work',
        description: 'Daily environment for our physical interaction and sensing experiments.',
        color: '#f8faff',
        accent: '#1a2f6b',
        pattern: 'lines',
        span: 1,
      },
      {
        id: 'v3',
        title: 'Distributed Systems',
        category: 'Neural Nets',
        description: 'Mapping distributed data flows across intercontinental research nodes.',
        color: '#0a1628',
        accent: '#00d4ff',
        pattern: 'radial',
        span: 1,
      },
      {
        id: 'v4',
        title: 'Latent Space Mapping',
        category: 'Neural Nets',
        description: 'Visualisation of high-dimensional embedding distributions in the LLM prototype.',
        color: '#050d1f',
        accent: '#818cf8',
        pattern: 'waves',
        span: 1,
      },
      {
        id: 'v5',
        title: 'Hardware Interface',
        category: 'Last Work',
        description: 'Custom PCB design for low-latency signal processing in neural interfaces.',
        color: '#1a0e00',
        accent: '#fb923c',
        pattern: 'circuit',
        span: 1,
      },
      {
        id: 'v6',
        title: 'AI Studies',
        category: 'Neural Nets',
        description: 'Exploring the flexible boundaries between silicon and artificial agents.',
        color: '#0d0d0d',
        accent: '#4ade80',
        pattern: 'dots',
        span: 1,
      },
    ],
  },
  posts: [
    {
      id: 'p1',
      tag: 'Deep Learning',
      tagColor: 'blue',
      date: 'Feb 14, 2024',
      title: 'The Convergence of Vision Transformers and LLMs',
      excerpt:
        'Exploring how multi-modal training is blurring the lines between structural text understanding and visual feature extraction in the latest foundation models.',
      readTime: '9 min',
      href: '#',
    },
    {
      id: 'p2',
      tag: 'Engineering',
      tagColor: 'teal',
      date: 'Jan 22, 2024',
      title: 'State Management in Real-time Research Dashboards',
      excerpt:
        'Lessons learned building high-throughput data visualisation tools using React Server Components and visual query builders for live experiments.',
      readTime: '6 min',
      href: '#',
    },
    {
      id: 'p3',
      tag: 'Research Note',
      tagColor: 'amber',
      date: 'Jan 5, 2024',
      title: 'Transparency in Black-Box Decision Systems',
      excerpt:
        'A philosophical and technical deep-dive into the explainability problem in neural networks and why it matters for all AI applications.',
      readTime: '12 min',
      href: '#',
    },
  ],
};

// ── SVG Pattern ───────────────────────────────────────────────────────────────
function MiniPattern({ pattern, accent, bg }) {
  const uid = useRef(`p${Math.random().toString(36).slice(2, 6)}`).current;
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <rect width="100%" height="100%" fill={bg} />
      {pattern === 'grid' && (
        <>
          <defs>
            <pattern id={uid} width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M20 0L0 0 0 20" fill="none" stroke={accent} strokeWidth="0.4" strokeOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid})`} />
          <circle cx="50%" cy="55%" r="22%" fill={accent} fillOpacity="0.12" />
        </>
      )}
      {pattern === 'lines' && (
        <>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <line key={i} x1="0" y1={`${10 + i * 16}%`} x2="100%" y2={`${14 + i * 16}%`}
              stroke={accent} strokeWidth="0.5" strokeOpacity={0.5 - i * 0.06} />
          ))}
          <rect x="15%" y="25%" width="70%" height="50%" rx="2" fill={accent} fillOpacity="0.07" />
        </>
      )}
      {pattern === 'radial' && (
        <>
          {[8, 18, 30, 44].map(r => (
            <circle key={r} cx="50%" cy="50%" r={`${r}%`} fill="none"
              stroke={accent} strokeWidth="0.6" strokeOpacity={0.55 - r * 0.008} />
          ))}
          {[0,1,2,3,4,5].map(i => {
            const a = (i / 6) * Math.PI * 2;
            return <line key={i} x1="50%" y1="50%" x2={`${50 + Math.cos(a) * 50}%`} y2={`${50 + Math.sin(a) * 50}%`}
              stroke={accent} strokeWidth="0.4" strokeOpacity="0.3" />;
          })}
          <circle cx="50%" cy="50%" r="5%" fill={accent} fillOpacity="0.35" />
        </>
      )}
      {pattern === 'waves' && (
        <>
          {[0,1,2,3].map(i => (
            <ellipse key={i} cx="50%" cy="50%" rx={`${15 + i * 14}%`} ry={`${8 + i * 7}%`}
              fill="none" stroke={accent} strokeWidth="0.6" strokeOpacity={0.5 - i * 0.1} />
          ))}
          <circle cx="50%" cy="50%" r="6%" fill={accent} fillOpacity="0.2" />
        </>
      )}
      {pattern === 'circuit' && (
        <>
          <defs>
            <pattern id={uid} width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M8 0v8h16v-8 M16 8v16 M0 16h8 M24 16h8" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.45" />
              <circle cx="8" cy="8" r="1.5" fill={accent} fillOpacity="0.5" />
              <circle cx="24" cy="8" r="1.5" fill={accent} fillOpacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid})`} />
        </>
      )}
      {pattern === 'dots' && (
        <>
          <defs>
            <pattern id={uid} width="14" height="14" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.1" fill={accent} fillOpacity="0.45" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${uid})`} />
          <ellipse cx="50%" cy="50%" rx="35%" ry="25%" fill={accent} fillOpacity="0.08" />
        </>
      )}
    </svg>
  );
}

// ── Tag Badge ─────────────────────────────────────────────────────────────────
const TAG_STYLES = {
  blue: { bg: '#dbeafe', text: '#1d4ed8' },
  teal: { bg: '#ccfbf1', text: '#0f766e' },
  amber: { bg: '#fef3c7', text: '#b45309' },
  purple: { bg: '#ede9fe', text: '#6d28d9' },
};

function Tag({ label, color = 'blue' }) {
  const s = TAG_STYLES[color] || TAG_STYLES.blue;
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.7rem',
      fontWeight: 600,
      letterSpacing: '0.07em',
      textTransform: 'uppercase',
      padding: '3px 10px',
      borderRadius: '9999px',
      background: s.bg,
      color: s.text,
    }}>
      {label}
    </span>
  );
}

// ── Visual Card ───────────────────────────────────────────────────────────────
function VisualCard({ item, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('ins-visible');
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="ins-vcard" style={{ '--delay': `${index * 70}ms` }}>
      <div className="ins-vcard-img">
        <MiniPattern pattern={item.pattern} accent={item.accent} bg={item.color} />
        <div className="ins-vcard-overlay" />
      </div>
      <div className="ins-vcard-body">
        <p className="ins-vcard-cat">{item.category}</p>
        <h3 className="ins-vcard-title">{item.title}</h3>
        <p className="ins-vcard-desc">{item.description}</p>
      </div>
    </div>
  );
}

// ── Blog Post Row ─────────────────────────────────────────────────────────────
function PostRow({ post, index }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('ins-visible');
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <article ref={ref} className="ins-post" style={{ '--delay': `${index * 80}ms` }}>
      <div className="ins-post-meta">
        <Tag label={post.tag} color={post.tagColor} />
        <span className="ins-post-date">{post.date}</span>
        <span className="ins-post-read">{post.readTime} read</span>
      </div>
      <a href={post.href} className="ins-post-title">{post.title}</a>
      <p className="ins-post-excerpt">{post.excerpt}</p>
      <a href={post.href} className="ins-post-cta">
        Read Full Inquiry
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </article>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function InsightsPage() {
  const { hero, gallery, posts } = PAGE_DATA;
  const [activeFilter, setActiveFilter] = useState('All Images');

  const filtered = activeFilter === 'All Images'
    ? gallery.items
    : gallery.items.filter(i => i.category === activeFilter || activeFilter === 'Last Work');

  return (
    <>
      <style>{`
        /* ─ Reset & base ─ */
        .ins-page { min-height: 100vh; padding: 96px 0 80px; background: var(--color-background); }
        .ins-container { width: 100%; max-width: 1140px; margin: 0 auto; padding: 0 24px; }

        /* ─ Fade-up animation ─ */
        .ins-fade { opacity: 0; transform: translateY(22px); }
        .ins-visible { animation: insFade 0.55s cubic-bezier(0.22,1,0.36,1) var(--delay,0ms) both; }
        @keyframes insFade { to { opacity:1; transform:none; } }

        /* ─ Hero ─ */
        .ins-hero { padding-bottom: 64px; border-bottom: 1.5px solid var(--color-border); margin-bottom: 72px; }
        .ins-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 0.72rem; letter-spacing: 0.12em;
          text-transform: uppercase; color: var(--color-accent);
          background: var(--color-accent-soft); padding: 4px 14px;
          border-radius: 9999px; margin-bottom: 20px;
        }
        .ins-hero-eyebrow span { width:6px; height:6px; border-radius:50%; background:var(--color-accent); display:inline-block; animation: dotPulse 2s infinite; }
        @keyframes dotPulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .ins-hero-title {
          font-family: var(--font-heading); font-size: clamp(2.2rem, 5vw, 3.6rem);
          font-weight: 800; color: var(--color-text); line-height: 1.08;
          margin-bottom: 18px; letter-spacing: -0.02em;
        }
        .ins-hero-title em { font-style: normal; color: var(--color-primary-light, #2563eb); }
        .ins-hero-sub { font-size: 1.05rem; color: var(--color-text-muted); max-width: 560px; line-height: 1.65; }

        /* ─ Section header ─ */
        .ins-sec-hd { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
        .ins-sec-title { font-family: var(--font-heading); font-size: 1.55rem; font-weight: 700; color: var(--color-text); margin-bottom: 6px; }
        .ins-sec-sub { font-size: 0.88rem; color: var(--color-text-muted); max-width: 420px; line-height: 1.55; }
        .ins-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .ins-filter-btn {
          padding: 6px 16px; border-radius: 9999px; font-size: 0.8rem; font-weight: 500;
          font-family: var(--font-body); border: 1.5px solid var(--color-border);
          background: var(--color-surface); color: var(--color-text-muted);
          cursor: pointer; transition: all 0.2s;
        }
        .ins-filter-btn:hover { border-color: var(--color-accent); color: var(--color-accent); }
        .ins-filter-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }

        /* ─ Visual grid ─ */
        .ins-vgrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 88px;
        }
        @media (max-width: 900px) { .ins-vgrid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .ins-vgrid { grid-template-columns: 1fr; } }

        /* ─ Visual card ─ */
        .ins-vcard {
          border-radius: var(--radius-lg, 22px); overflow: hidden;
          background: var(--color-surface); border: 1.5px solid var(--color-border);
          opacity: 0; transform: translateY(20px);
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s, border-color 0.22s;
          box-shadow: var(--shadow-card);
          cursor: pointer;
        }
        .ins-vcard:hover { transform: translateY(-5px); box-shadow: var(--shadow-card-hover); border-color: var(--color-accent); }
        .ins-vcard-img { position: relative; aspect-ratio: 4/3; overflow: hidden; }
        .ins-vcard-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%);
          opacity: 0; transition: opacity 0.28s;
        }
        .ins-vcard:hover .ins-vcard-overlay { opacity: 1; }
        .ins-vcard-body { padding: 16px 18px 18px; }
        .ins-vcard-cat { font-family: var(--font-mono); font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); margin-bottom: 5px; }
        .ins-vcard-title { font-family: var(--font-heading); font-size: 0.97rem; font-weight: 700; color: var(--color-text); margin-bottom: 6px; }
        .ins-vcard-desc { font-size: 0.8rem; color: var(--color-text-muted); line-height: 1.5; }

        /* ─ Blog divider layout ─ */
        .ins-blog-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 40px 60px; }
        @media (max-width: 768px) { .ins-blog-wrap { grid-template-columns: 1fr; } }

        /* ─ Blog sidebar ─ */
        .ins-blog-sidebar {}
        .ins-sidebar-title { font-family: var(--font-heading); font-size: 1.55rem; font-weight: 700; color: var(--color-text); margin-bottom: 8px; }
        .ins-sidebar-sub { font-size: 0.88rem; color: var(--color-text-muted); line-height: 1.55; margin-bottom: 28px; }
        .ins-subscribe {
          background: var(--color-background-alt, #eef2ff); border-radius: var(--radius-md, 14px);
          padding: 22px 20px; border: 1.5px solid var(--color-border); margin-top: 32px;
        }
        .ins-subscribe p { font-size: 0.82rem; color: var(--color-text-muted); margin-bottom: 12px; line-height: 1.5; }
        .ins-subscribe-row { display: flex; gap: 8px; }
        .ins-subscribe-row input {
          flex: 1; padding: 8px 12px; border-radius: var(--radius-sm, 8px);
          border: 1.5px solid var(--color-border); background: var(--color-surface);
          font-family: var(--font-body); font-size: 0.82rem; color: var(--color-text);
          outline: none; transition: border-color 0.2s;
        }
        .ins-subscribe-row input:focus { border-color: var(--color-accent); }
        .ins-subscribe-row button {
          padding: 8px 16px; border-radius: var(--radius-sm, 8px);
          background: var(--color-primary, #1a2f6b); color: #fff;
          font-size: 0.8rem; font-weight: 600; font-family: var(--font-body);
          border: none; cursor: pointer; white-space: nowrap;
          transition: background 0.2s;
        }
        .ins-subscribe-row button:hover { background: var(--color-primary-light, #2563eb); }
        .ins-sub-label { font-size: 0.78rem; color: var(--color-text-muted); display: flex; align-items: center; gap: 6px; font-weight: 500; margin-bottom: 10px; }
        .ins-sub-label svg { color: var(--color-accent); }

        /* ─ Posts list ─ */
        .ins-posts-list { display: flex; flex-direction: column; gap: 0; }

        /* ─ Post row ─ */
        .ins-post {
          padding: 28px 0; border-bottom: 1.5px solid var(--color-border);
          opacity: 0; transform: translateY(16px);
        }
        .ins-post:first-child { padding-top: 0; }
        .ins-post-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; flex-wrap: wrap; }
        .ins-post-date { font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-text-muted); }
        .ins-post-read { font-family: var(--font-mono); font-size: 0.72rem; color: var(--color-text-light); }
        .ins-post-title {
          display: block; font-family: var(--font-heading); font-size: 1.18rem;
          font-weight: 700; color: var(--color-text); line-height: 1.3;
          margin-bottom: 8px; text-decoration: none;
          transition: color 0.2s;
        }
        .ins-post-title:hover { color: var(--color-accent); }
        .ins-post-excerpt { font-size: 0.875rem; color: var(--color-text-muted); line-height: 1.65; margin-bottom: 14px; }
        .ins-post-cta {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.82rem; font-weight: 600; color: var(--color-primary, #1a2f6b);
          text-decoration: none; transition: gap 0.2s, color 0.2s;
        }
        .ins-post-cta:hover { gap: 10px; color: var(--color-primary-light, #2563eb); }

        /* ─ View All ─ */
        .ins-view-all {
          display: inline-flex; align-items: center; gap: 8px;
          margin-top: 32px; font-size: 0.87rem; font-weight: 600;
          color: var(--color-text-muted); padding: 9px 20px;
          border: 1.5px solid var(--color-border); border-radius: 9999px;
          background: var(--color-surface); cursor: pointer;
          text-decoration: none; transition: all 0.2s;
        }
        .ins-view-all:hover { color: var(--color-accent); border-color: var(--color-accent); }

        /* ─ Responsive ─ */
        @media (max-width: 640px) {
          .ins-page { padding: 64px 0 60px; }
          .ins-container { padding: 0 16px; }
          .ins-hero { margin-bottom: 48px; }
          .ins-sec-hd { flex-direction: column; }
        }
      `}</style>

      <div className="ins-page" id="insights">
        <div className="ins-container">

          {/* ── Hero ── */}
          <header className="ins-hero ins-fade ins-visible" style={{ '--delay': '0ms' }}>
            <div className="ins-hero-eyebrow">
              <span aria-hidden="true" />
              {hero.eyebrow}
            </div>
            <h1 className="ins-hero-title">
              {hero.title.split('&')[0].trim()} &amp;{' '}
              <em>{hero.title.split('&')[1]?.trim()}</em>
            </h1>
            <p className="ins-hero-sub">{hero.subtitle}</p>
          </header>

          {/* ── Visual Archive ── */}
          <section aria-labelledby="varchive-title" style={{ marginBottom: '88px' }}>
            <div className="ins-sec-hd ins-fade ins-visible" style={{ '--delay': '80ms' }}>
              <div>
                <h2 id="varchive-title" className="ins-sec-title">{gallery.title}</h2>
                <p className="ins-sec-sub">{gallery.subtitle}</p>
              </div>
              <div className="ins-filters" role="group" aria-label="Filter gallery">
                {gallery.filters.map(f => (
                  <button
                    key={f}
                    className={`ins-filter-btn${activeFilter === f ? ' active' : ''}`}
                    onClick={() => setActiveFilter(f)}
                    aria-pressed={activeFilter === f}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="ins-vgrid" role="list">
              {filtered.map((item, i) => (
                <VisualCard key={item.id} item={item} index={i} />
              ))}
            </div>
          </section>

          {/* ── Blog + Sidebar ── */}
          <section aria-labelledby="inquiries-title">
            <div className="ins-blog-wrap">
              {/* Sidebar */}
              <aside>
                <h2 id="inquiries-title" className="ins-sidebar-title ins-fade ins-visible" style={{ '--delay': '0ms' }}>
                  Recent Inquiries
                </h2>
                <p className="ins-sidebar-sub ins-fade ins-visible" style={{ '--delay': '60ms' }}>
                  Technical thoughts, project post-mortems, and candid reflections on the evolving landscape of Artificial Intelligence.
                </p>

                {/* Tag cloud */}
                <div className="ins-fade ins-visible" style={{ '--delay': '120ms', display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  {['#Vision', '#Diffusion', '#PyTorch', '#RLHF', '#MLOps'].map(t => (
                    <a key={t} href="#" style={{
                      fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
                      padding: '4px 12px', borderRadius: '9999px',
                      background: 'var(--color-background-alt, #eef2ff)',
                      color: 'var(--color-text-muted)',
                      border: '1.5px solid var(--color-border)',
                      textDecoration: 'none', transition: 'all 0.2s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                    >{t}</a>
                  ))}
                </div>

                {/* Subscribe box */}
                <div className="ins-subscribe ins-fade ins-visible" style={{ '--delay': '160ms' }}>
                  <div className="ins-sub-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2"/>
                      <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Subscribe to Feed
                  </div>
                  <p>Get new posts delivered directly to your inbox. No spam, unsubscribe anytime.</p>
                  <div className="ins-subscribe-row">
                    <input type="email" placeholder="your@email.com" aria-label="Email address" />
                    <button type="button">Subscribe</button>
                  </div>
                </div>
              </aside>

              {/* Posts */}
              <div>
                <div className="ins-posts-list">
                  {posts.map((post, i) => (
                    <PostRow key={post.id} post={post} index={i} />
                  ))}
                </div>
                <a href="#" className="ins-view-all">
                  View All Posts
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}