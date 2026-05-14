'use client';

import { useState, useEffect, useRef } from 'react';
import NavForFullPage from '../../components/layout/NavForFullPage';

// ── Data ─────────────────────────────────────────────────────────────────────
const PUBS_DATA = {
  hero: {
    title: 'Scholarly Contributions',
    subtitle:
      'Exploring the frontiers of AI, Medical Imaging, and Agricultural Technology through peer-reviewed publications and rigorous inquiry.',
  },
  stats: [
    { value: '12+', label: 'Publications' },
    { value: '450', label: 'Citations' },
    { value: '15', label: 'Co-authors' },
    { value: '08', label: 'Active Projects' },
  ],
  years: ['2025', '2024', '2023'],
  publications: [
    {
      id: 'p1',
      year: '2025',
      type: 'Journal',
      venue: 'Elsevier',
      status: 'Q1',
      statusColor: '#1a2f6b',
      title: 'EDDNet30: A Spatial Attention and Multi-Scale Fusion Model for Enhanced Eye Disease Classification with Explainable AI',
      authors: 'Md. Asraful Sharker Nishi, Sharmin Akter Priya, Priya Saha, Md. Asraful Sharker, Md. Sharger Nishi, Md Asraful Sharker',
      date: '05 Sep 2023',
      doi: '10.1016/j.xxx',
      downloads: 124,
      views: 812,
      links: [{ label: 'PDF', icon: 'pdf' }, { label: 'Cite', icon: 'cite' }],
    },
    {
      id: 'p2',
      year: '2025',
      type: 'Conference',
      venue: 'Autonomous and Autonomous Systems Conference, Systems and Autonomous Engineering (CS) 3.0',
      status: 'Scopus',
      statusColor: '#0f766e',
      title: 'Attention-based multi-scale fusion for brain tumor classification with explainable AI',
      authors: 'Md. Asraful Sharker Nishi, Priya Saha, Priyanka Baishakhi, Tania Khanom, Sourav Sharma, Md. Zahir Talibur, Muhammad Hamzah Arafin',
      date: '01 Aug 2024',
      doi: '10.1016/conf.xxx',
      downloads: 89,
      views: 543,
      links: [{ label: 'PDF', icon: 'pdf' }, { label: 'Cite', icon: 'cite' }],
    },
    {
      id: 'p3',
      year: '2024',
      type: 'Journal',
      venue: 'Elsevier',
      status: 'Q1',
      statusColor: '#1a2f6b',
      title: 'COLD-12: A multi-level feature extraction hybrid CNN Model for accurate cotton disease diagnosis',
      authors: 'Md. Asraful Sharker Nishi, Priya Saha, Priyanka Baishakhi, H S M Ferhat Nabi, Sion',
      date: 'March 12, 2024',
      doi: '10.1016/j.xxx',
      downloads: 201,
      views: 1247,
      links: [{ label: 'PDF', icon: 'pdf' }, { label: 'Cite', icon: 'cite' }],
    },
    {
      id: 'p4',
      year: '2024',
      type: 'Journal',
      venue: 'Elsevier',
      status: 'Q2',
      statusColor: '#7c3aed',
      title: 'XSE-TomatoNet: An explainable AI based tomato leaf disease classification method using EfficientNetB0 with squeeze-and-excitation blocks and multi-scale feature fusion',
      authors: 'Md. Imran Hossain, Priyanka Baishakhi, Md. Asraful Sharker Nishi, Asraful A. Mena-d, Jun D. Bruno, Boris Alley',
      date: 'January, 2024',
      doi: '10.1016/j.xxx',
      downloads: 156,
      views: 934,
      links: [{ label: 'PDF', icon: 'pdf' }, { label: 'Cite', icon: 'cite' }],
    },
    {
      id: 'p5',
      year: '2024',
      type: 'Dataset',
      venue: 'Elsevier',
      status: 'Open Access',
      statusColor: '#0f766e',
      title: 'A Comprehensive Annotated Image Dataset for Deep Learning Analysis of Eggplant Leaf Diseases.',
      authors: 'Md. Asraful Sharker Nishi, Priyanka Baishakhi, Md. Sharger Nishi, Marium Bd Ayu, Tahia Fatiha, Priya Saha Ndi, Md Bato-Nessa',
      date: 'February, Volume 2024',
      doi: '10.1016/data.xxx',
      downloads: 312,
      views: 1891,
      links: [{ label: 'PDF', icon: 'pdf' }, { label: 'Cite', icon: 'cite' }],
    },
    {
      id: 'p6',
      year: '2023',
      type: 'Dataset',
      venue: 'Elsevier',
      status: 'Open Access',
      statusColor: '#0f766e',
      title: 'A comprehensive dragon fruit image dataset for detecting the maturity and quality grading of dragon fruit.',
      authors: 'Tahia Fatiha, Md Asraful Sharker Nishi, Priya Baishakhi, Md Nur Islam, Muhammad Sharif Sahin',
      date: 'February, 2023',
      doi: '10.1016/data.xxx',
      downloads: 445,
      views: 2203,
      links: [{ label: 'PDF', icon: 'pdf' }, { label: 'Cite', icon: 'cite' }],
    },
  ],
};

// ── Reveal hook ───────────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.classList.add('pub-vis');
    }, { threshold: 0.06 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`pub-reveal ${className}`} style={{ '--pub-delay': `${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ value, label, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="pub-stat">
        <span className="pub-stat-val">{value}</span>
        <span className="pub-stat-lbl">{label}</span>
      </div>
    </Reveal>
  );
}

// ── Publication Row ───────────────────────────────────────────────────────────
function PubRow({ pub, delay }) {
  const ref = useReveal();
  return (
    <article
      ref={ref}
      className="pub-row pub-reveal"
      style={{ '--pub-delay': `${delay}ms` }}
      aria-label={pub.title}
    >
      {/* Left meta column */}
      <div className="pub-meta-col">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
          <span className="pub-badge pub-badge-type">{pub.type}</span>
          <span className="pub-badge pub-badge-venue">{pub.venue}</span>
        </div>
        <span className="pub-badge" style={{
          background: pub.statusColor + '18',
          color: pub.statusColor,
          border: `1px solid ${pub.statusColor}30`,
          fontWeight: 700,
        }}>{pub.status}</span>
      </div>

      {/* Content */}
      <div className="pub-content">
        <h3 className="pub-title">{pub.title}</h3>
        <p className="pub-authors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1 }}>
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {pub.authors}
        </p>
        <div className="pub-footer">
          <div className="pub-metrics">
            <span className="pub-metric">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {pub.date}
            </span>
            <span className="pub-metric">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              {pub.views.toLocaleString()}
            </span>
            <span className="pub-metric">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {pub.downloads}
            </span>
          </div>
          <div className="pub-links">
            {pub.links.map(l => (
              <a key={l.label} href="#" className={`pub-link-btn ${l.icon === 'pdf' ? 'pub-link-pdf' : 'pub-link-cite'}`}
                aria-label={`${l.label} for ${pub.title}`}>
                {l.icon === 'pdf'
                  ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5"/><path d="M14 2v6h6M9 13h6M9 17h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  : <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h2c0 0 0 1-.5 2.5M21 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h2c0 0 0 1-.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                }
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Year Divider ──────────────────────────────────────────────────────────────
function YearDivider({ year }) {
  return (
    <div className="pub-year-div" role="separator" aria-label={`Publications from ${year}`}>
      <div className="pub-year-line" />
      <span className="pub-year-pill">{year}</span>
      <div className="pub-year-line" />
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function PublicationsPage() {
  const { hero, stats, publications } = PUBS_DATA;
  const [filter, setFilter] = useState('All');
  const [email, setEmail] = useState('');

  const typeFilters = ['All', 'Journal', 'Conference', 'Dataset'];

  const filtered = filter === 'All'
    ? publications
    : publications.filter(p => p.type === filter);

  // Group by year
  const byYear = filtered.reduce((acc, p) => {
    if (!acc[p.year]) acc[p.year] = [];
    acc[p.year].push(p);
    return acc;
  }, {});
  const years = Object.keys(byYear).sort((a, b) => b - a);

  return (
    <>
      <style>{`
        /* ─ Root ─ */
        .pub-page {
          min-height: 100vh;
          padding: 80px 0 0;
          background: #f0f4ff;
          font-family: 'DM Sans', sans-serif;
        }
        .pub-container { width:100%; max-width:900px; margin:0 auto; padding:0 24px; }

        /* ─ Reveal ─ */
        .pub-reveal { opacity:0; transform:translateY(18px); }
        .pub-vis { animation: pubFade 0.52s cubic-bezier(0.22,1,0.36,1) var(--pub-delay,0ms) both; }
        @keyframes pubFade { to { opacity:1; transform:none; } }

        /* ─ Hero ─ */
        .pub-hero {
          text-align: center;
          padding: 56px 0 48px;
          background: linear-gradient(180deg, #e8eeff 0%, #f0f4ff 100%);
          margin-bottom: 0;
        }
        .pub-hero-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.9rem, 4.5vw, 2.9rem);
          font-weight: 800;
          color: #1a2f6b;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 14px;
        }
        .pub-hero-sub {
          font-size: 0.95rem;
          color: #64748b;
          max-width: 520px;
          margin: 0 auto 32px;
          line-height: 1.65;
        }

        /* ─ Stats ─ */
        .pub-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 40px;
        }
        .pub-stat {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px 16px;
          text-align: center;
          box-shadow: 0 2px 12px rgba(26,47,107,0.06);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .pub-stat:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(26,47,107,0.12); }
        .pub-stat-val {
          display: block;
          font-family: 'Sora', sans-serif;
          font-size: 1.9rem;
          font-weight: 800;
          color: #1a2f6b;
          line-height: 1;
          margin-bottom: 6px;
        }
        .pub-stat-lbl {
          font-size: 0.76rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 500;
        }

        /* ─ Filters ─ */
        .pub-filter-bar {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 40px;
        }
        .pub-filter-btn {
          padding: 7px 20px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          border: 1.5px solid #e2e8f0;
          background: #fff;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pub-filter-btn:hover { border-color: #2563eb; color: #2563eb; }
        .pub-filter-btn.active { background: #1a2f6b; color: #fff; border-color: #1a2f6b; }

        /* ─ Body ─ */
        .pub-body { background: #f0f4ff; padding: 0 0 80px; }

        /* ─ Year divider ─ */
        .pub-year-div {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 36px 0 20px;
        }
        .pub-year-line { flex: 1; height: 1px; background: #dbe4f0; }
        .pub-year-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          padding: 4px 14px;
          border-radius: 9999px;
          background: #1a2f6b;
          color: #fff;
        }

        /* ─ Publication row ─ */
        .pub-row {
          background: #fff;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px 24px;
          margin-bottom: 14px;
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 20px;
          box-shadow: 0 2px 10px rgba(26,47,107,0.05);
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s, border-color 0.22s;
        }
        .pub-row:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(26,47,107,0.11); border-color: #93c5fd; }

        /* ─ Meta column ─ */
        .pub-meta-col { display: flex; flex-direction: column; gap: 8px; padding-top: 3px; }

        /* ─ Badges ─ */
        .pub-badge {
          display: inline-block;
          font-size: 0.67rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 9999px;
        }
        .pub-badge-type { background: #dbeafe; color: #1d4ed8; }
        .pub-badge-venue { background: #f1f5f9; color: #475569; max-width: 160px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        /* ─ Content ─ */
        .pub-content { display: flex; flex-direction: column; gap: 0; }
        .pub-title {
          font-family: 'Sora', sans-serif;
          font-size: 0.97rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
          margin-bottom: 8px;
          transition: color 0.2s;
        }
        .pub-row:hover .pub-title { color: #1a2f6b; }
        .pub-authors {
          font-size: 0.78rem;
          color: #64748b;
          line-height: 1.5;
          margin-bottom: 14px;
          display: flex;
          gap: 6px;
          align-items: flex-start;
        }

        /* ─ Footer ─ */
        .pub-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
        .pub-metrics { display: flex; gap: 14px; }
        .pub-metric {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.74rem;
          color: #94a3b8;
          font-family: 'JetBrains Mono', monospace;
        }
        .pub-links { display: flex; gap: 8px; }
        .pub-link-btn {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.76rem; font-weight: 600;
          padding: 5px 12px; border-radius: 7px;
          text-decoration: none; cursor: pointer;
          transition: all 0.2s; border: 1.5px solid;
        }
        .pub-link-pdf {
          background: #eff6ff; color: #1d4ed8;
          border-color: #bfdbfe;
        }
        .pub-link-pdf:hover { background: #dbeafe; border-color: #93c5fd; }
        .pub-link-cite {
          background: #f8faff; color: #475569;
          border-color: #e2e8f0;
        }
        .pub-link-cite:hover { background: #eef2ff; border-color: #c7d2fe; color: #3730a3; }

        /* ─ Subscribe ─ */
        .pub-subscribe {
          background: #1a2f6b;
          border-radius: 20px;
          padding: 52px 40px;
          text-align: center;
          margin: 48px 0 64px;
        }
        .pub-subscribe h2 {
          font-family: 'Sora', sans-serif;
          font-size: 1.55rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 10px;
        }
        .pub-subscribe p { font-size: 0.88rem; color: rgba(255,255,255,0.65); margin-bottom: 28px; line-height: 1.6; }
        .pub-subscribe-form { display: flex; gap: 10px; max-width: 440px; margin: 0 auto; }
        .pub-subscribe-form input {
          flex: 1; padding: 11px 16px;
          border-radius: 9999px;
          border: 1.5px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.1);
          color: #fff; font-size: 0.87rem;
          font-family: 'DM Sans', sans-serif;
          outline: none; transition: border-color 0.2s;
        }
        .pub-subscribe-form input::placeholder { color: rgba(255,255,255,0.4); }
        .pub-subscribe-form input:focus { border-color: rgba(255,255,255,0.5); }
        .pub-subscribe-form button {
          padding: 11px 24px; border-radius: 9999px;
          background: #2563eb; color: #fff;
          font-size: 0.85rem; font-weight: 700;
          font-family: 'DM Sans', sans-serif;
          border: none; cursor: pointer; white-space: nowrap;
          transition: background 0.2s, transform 0.15s;
        }
        .pub-subscribe-form button:hover { background: #1d4ed8; transform: scale(1.03); }

        /* ─ Responsive ─ */
        @media (max-width: 720px) {
          .pub-stats { grid-template-columns: repeat(2, 1fr); }
          .pub-row { grid-template-columns: 1fr; gap: 12px; }
          .pub-meta-col { flex-direction: row; flex-wrap: wrap; }
          .pub-subscribe { padding: 36px 20px; }
          .pub-subscribe-form { flex-direction: column; }
        }
        @media (max-width: 480px) {
          .pub-stats { grid-template-columns: repeat(2, 1fr); }
          .pub-container { padding: 0 16px; }
          .pub-page { padding-top: 64px; }
        }
      `}</style>

      <div className="pub-page" id="publications">
 <NavForFullPage/>
        {/* ── Hero ── */}
        <header className="pub-hero">
          <div className="pub-container">
            <Reveal delay={0}>
              <h1 className="pub-hero-title">{hero.title}</h1>
              <p className="pub-hero-sub">{hero.subtitle}</p>
            </Reveal>

            {/* Stats */}
            <div className="pub-stats">
              {stats.map((s, i) => (
                <StatCard key={s.label} value={s.value} label={s.label} delay={i * 60} />
              ))}
            </div>

            {/* Filter */}
            <Reveal delay={260}>
              <div className="pub-filter-bar" role="group" aria-label="Filter by publication type">
                {typeFilters.map(f => (
                  <button key={f}
                    className={`pub-filter-btn${filter === f ? ' active' : ''}`}
                    onClick={() => setFilter(f)}
                    aria-pressed={filter === f}
                  >{f}</button>
                ))}
              </div>
            </Reveal>
          </div>
        </header>

        {/* ── Publication List ── */}
        <div className="pub-body">
          <div className="pub-container">
            {years.map(year => (
              <div key={year}>
                <YearDivider year={year} />
                {byYear[year].map((pub, i) => (
                  <PubRow key={pub.id} pub={pub} delay={i * 60} />
                ))}
              </div>
            ))}

            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '64px 24px', color: '#94a3b8' }}>
                <p style={{ fontSize: '1rem' }}>No publications found for this filter.</p>
              </div>
            )}

            {/* Subscribe */}
            <Reveal delay={0}>
              <div className="pub-subscribe">
                <h2>Subscribe to Research Updates</h2>
                <p>Get the latest publications, pre-prints, and research announcements delivered directly to your inbox.</p>
                <div className="pub-subscribe-form">
                  <input
                    type="email"
                    placeholder="Enter your research e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    aria-label="Email for research updates"
                  />
                  <button type="button">Subscribe Now</button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </>
  );
}