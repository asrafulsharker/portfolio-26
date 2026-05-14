'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

// ─── Shared publication data (imported by both this section AND /publications page) ───
// Move this to: src/data/publications.js  and import in both files
export const PUBLICATIONS_DATA = {
  sectionTitle: 'Featured Publications',
  sectionSubtitle: 'Key contributions to neural architecture, deep learning, and agricultural AI research.',
  items: [
    {
      id: 'p1',
      year: '2025',
      type: 'Journal',
      venue: 'Elsevier',
      status: 'Q1',
      statusColor: '#1a2f6b',
      title: 'EDDNet30: A Spatial Attention and Multi-Scale Fusion Model for Enhanced Eye Disease Classification with Explainable AI',
      description: 'Introduces a novel dilated convolution strategy for maintaining spatial context without increasing computational overhead in medical imaging.',
      authors: 'Md. Asraful Sharker Nishi, Sharmin Akter Priya, Priya Saha, Md. Asraful Sharker',
      date: '05 Sep 2023',
      downloads: 124,
      views: 812,
      links: [{ label: 'PDF', icon: 'download', href: '#' }, { label: 'Code', icon: 'code', href: '#' }],
    },
    {
      id: 'p2',
      year: '2025',
      type: 'Conference',
      venue: 'Scopus',
      status: 'Scopus',
      statusColor: '#0f766e',
      title: 'Attention-based multi-scale fusion for brain tumor classification with explainable AI',
      description: 'A framework for robust feature alignment across heterogeneous datasets in low-resource medical environments.',
      authors: 'Md. Asraful Sharker Nishi, Priya Saha, Priyanka Baishakhi, Tania Khanom, Sourav Sharma',
      date: '01 Aug 2024',
      downloads: 89,
      views: 543,
      links: [{ label: 'Cite', icon: 'quote', href: '#' }, { label: 'Poster', icon: 'image', href: '#' }],
    },
    {
      id: 'p3',
      year: '2024',
      type: 'Journal',
      venue: 'Elsevier',
      status: 'Q1',
      statusColor: '#1a2f6b',
      title: 'COLD-12: A multi-level feature extraction hybrid CNN Model for accurate cotton disease diagnosis',
      description: 'Multi-scale feature extraction pipeline that achieves state-of-the-art performance on publicly available cotton disease benchmarks.',
      authors: 'Md. Asraful Sharker Nishi, Priya Saha, Priyanka Baishakhi, H S M Ferhat Nabi',
      date: 'March 12, 2024',
      downloads: 201,
      views: 1247,
      links: [{ label: 'PDF', icon: 'download', href: '#' }, { label: 'Code', icon: 'code', href: '#' }],
    },
    {
      id: 'p4',
      year: '2024',
      type: 'Journal',
      venue: 'Elsevier',
      status: 'Q2',
      statusColor: '#7c3aed',
      title: 'XSE-TomatoNet: An explainable AI based tomato leaf disease classification method using EfficientNetB0',
      description: 'Custom squeeze-and-excitation blocks combined with multi-scale feature fusion for high-accuracy plant disease recognition.',
      authors: 'Md. Imran Hossain, Priyanka Baishakhi, Md. Asraful Sharker Nishi, Asraful A. Mena-d',
      date: 'January, 2024',
      downloads: 156,
      views: 934,
      links: [{ label: 'PDF', icon: 'download', href: '#' }, { label: 'Cite', icon: 'quote', href: '#' }],
    },
    {
      id: 'p5',
      year: '2024',
      type: 'Dataset',
      venue: 'Elsevier',
      status: 'Open Access',
      statusColor: '#0f766e',
      title: 'A Comprehensive Annotated Image Dataset for Deep Learning Analysis of Eggplant Leaf Diseases',
      description: 'Large-scale annotated benchmark dataset enabling reproducible research in agricultural plant pathology detection.',
      authors: 'Md. Asraful Sharker Nishi, Priyanka Baishakhi, Md. Sharger Nishi, Marium Bd Ayu, Tahia Fatiha',
      date: 'February, 2024',
      downloads: 312,
      views: 1891,
      links: [{ label: 'PDF', icon: 'download', href: '#' }, { label: 'Cite', icon: 'quote', href: '#' }],
    },
    {
      id: 'p6',
      year: '2023',
      type: 'Dataset',
      venue: 'Elsevier',
      status: 'Open Access',
      statusColor: '#0f766e',
      title: 'A comprehensive dragon fruit image dataset for detecting the maturity and quality grading of dragon fruit',
      description: 'First publicly available multi-class dragon fruit grading dataset with over 12,000 annotated high-resolution images.',
      authors: 'Tahia Fatiha, Md Asraful Sharker Nishi, Priya Baishakhi, Md Nur Islam',
      date: 'February, 2023',
      downloads: 445,
      views: 2203,
      links: [{ label: 'PDF', icon: 'download', href: '#' }, { label: 'Cite', icon: 'quote', href: '#' }],
    },
  ],
};

// ─── Link icons ───────────────────────────────────────────────────────────────
const ICONS = {
  download: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  code: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  quote: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h2c0 0 0 1-.5 2.5M21 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h2c0 0 0 1-.5 2.5"/>
    </svg>
  ),
  image: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
};

// ─── Single card ──────────────────────────────────────────────────────────────
function PubCard({ pub, index }) {
  const TYPE_COLORS = {
    Journal:    { bg: '#dbeafe', text: '#1d4ed8' },
    Conference: { bg: '#fce7f3', text: '#9d174d' },
    Dataset:    { bg: '#dcfce7', text: '#15803d' },
  };
  const tc = TYPE_COLORS[pub.type] || TYPE_COLORS.Journal;

  return (
    <article className="pubs-card" style={{ '--i': index }}>
      {/* Top row */}
      <div className="pubs-card-top">
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="pubs-type-badge" style={{ background: tc.bg, color: tc.text }}>
            {pub.type}
          </span>
          <span className="pubs-status-badge" style={{
            background: pub.statusColor + '18',
            color: pub.statusColor,
            border: `1px solid ${pub.statusColor}30`,
          }}>
            {pub.status}
          </span>
        </div>
        <span className="pubs-year">{pub.year}</span>
      </div>

      {/* Title */}
      <h3 className="pubs-card-title">{pub.title}</h3>

      {/* Description */}
      <p className="pubs-card-desc">{pub.description}</p>

      {/* Authors */}
      <p className="pubs-card-authors">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        {pub.authors}
      </p>

      {/* Footer */}
      <div className="pubs-card-footer">
        <div className="pubs-metrics">
          <span className="pubs-metric">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
            {pub.views.toLocaleString()}
          </span>
          <span className="pubs-metric">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {pub.downloads}
          </span>
        </div>
        <div className="pubs-links">
          {pub.links.map(l => (
            <a key={l.label} href={l.href} className="pubs-link" aria-label={`${l.label}: ${pub.title}`}>
              {ICONS[l.icon]}
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function Publications({ data = PUBLICATIONS_DATA }) {
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);
  const [visible, setVisible] = useState(false);

  const CARD_W = 380; // approx card width + gap

  // Scroll-triggered entrance
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const updateButtons = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    setCanPrev(t.scrollLeft > 8);
    setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
    setCurrent(Math.round(t.scrollLeft / CARD_W));
  }, []);

  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    t.addEventListener('scroll', updateButtons, { passive: true });
    updateButtons();
    return () => t.removeEventListener('scroll', updateButtons);
  }, [updateButtons]);

  const scrollBy = (dir) => {
    const t = trackRef.current;
    if (!t) return;
    t.scrollBy({ left: dir * CARD_W, behavior: 'smooth' });
  };

  // Drag to scroll
  const onMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollStart(trackRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!isDragging) return;
    trackRef.current.scrollLeft = scrollStart - (e.pageX - startX);
  };
  const onMouseUp = () => setIsDragging(false);

  const total = data.items.length;
  const dots = Math.ceil(total / 2);

  return (
    <>
      <style>{`
        /* ── Section ── */
        .pubs-section {
          padding: var(--spacing-section-padding, 96px 0);
          background: var(--color-background, #f8faff);
          overflow: hidden;
        }

        /* ── Header row ── */
        .pubs-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .pubs-header-left {}
        .pubs-eyebrow {
          display: inline-block;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-accent, #3b82f6);
          background: var(--color-accent-soft, #dbeafe);
          padding: 3px 12px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .pubs-section-title {
          font-family: var(--font-heading, 'Sora', sans-serif);
          font-size: clamp(1.4rem, 2.8vw, 2rem);
          font-weight: 800;
          color: var(--color-text, #0f172a);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 8px;
        }
        .pubs-section-sub {
          font-size: 0.88rem;
          color: var(--color-text-muted, #64748b);
          max-width: 440px;
          line-height: 1.6;
        }

        /* ── Nav buttons ── */
        .pubs-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .pubs-nav-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1.5px solid var(--color-border, #e2e8f0);
          background: var(--color-surface, #fff);
          color: var(--color-text-muted, #64748b);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .pubs-nav-btn:hover:not(:disabled) {
          border-color: var(--color-accent, #3b82f6);
          color: var(--color-accent, #3b82f6);
          background: var(--color-accent-soft, #dbeafe);
        }
        .pubs-nav-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        /* ── Slider track ── */
        .pubs-slider-wrap {
          position: relative;
          margin: 0 -24px;
        }
        .pubs-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 8px 24px 16px;
          cursor: grab;
          user-select: none;
        }
        .pubs-track::-webkit-scrollbar { display: none; }
        .pubs-track.dragging { cursor: grabbing; }

        /* Fade edges */
        .pubs-slider-wrap::before,
        .pubs-slider-wrap::after {
          content: '';
          position: absolute;
          top: 0; bottom: 0;
          width: 48px;
          z-index: 2;
          pointer-events: none;
        }
        .pubs-slider-wrap::before {
          left: 0;
          background: linear-gradient(to right, var(--color-background, #f8faff), transparent);
        }
        .pubs-slider-wrap::after {
          right: 0;
          background: linear-gradient(to left, var(--color-background, #f8faff), transparent);
        }

        /* ── Card ── */
        .pubs-card {
          flex: 0 0 360px;
          width: 360px;
          scroll-snap-align: start;
          background: var(--color-surface, #fff);
          border: 1.5px solid var(--color-border, #e2e8f0);
          border-radius: var(--radius-lg, 22px);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          box-shadow: var(--shadow-card, 0 4px 24px rgba(26,47,107,0.08));
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, border-color 0.22s;
          opacity: 0;
          transform: translateY(20px);
        }
        .pubs-section.in-view .pubs-card {
          animation: pubCardIn 0.52s cubic-bezier(0.22,1,0.36,1) calc(var(--i,0) * 60ms) both;
        }
        @keyframes pubCardIn {
          to { opacity: 1; transform: none; }
        }
        .pubs-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-card-hover, 0 12px 40px rgba(26,47,107,0.16));
          border-color: var(--color-accent, #3b82f6);
        }

        /* ── Card internals ── */
        .pubs-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .pubs-type-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 9999px;
        }
        .pubs-status-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 9999px;
        }
        .pubs-year {
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          font-size: 0.75rem;
          color: var(--color-text-light, #94a3b8);
          flex-shrink: 0;
        }
        .pubs-card-title {
          font-family: var(--font-heading, 'Sora', sans-serif);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-primary, #1a2f6b);
          line-height: 1.38;
          letter-spacing: -0.01em;
          /* clamp to 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pubs-card-desc {
          font-size: 0.82rem;
          color: var(--color-text-muted, #64748b);
          line-height: 1.6;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pubs-card-authors {
          font-size: 0.74rem;
          color: var(--color-text-light, #94a3b8);
          line-height: 1.5;
          display: flex;
          gap: 5px;
          align-items: flex-start;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pubs-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--color-border, #e2e8f0);
          flex-wrap: wrap;
        }
        .pubs-metrics {
          display: flex;
          gap: 12px;
        }
        .pubs-metric {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.72rem;
          color: var(--color-text-light, #94a3b8);
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
        }
        .pubs-links {
          display: flex;
          gap: 8px;
        }
        .pubs-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--color-primary-light, #2563eb);
          transition: color 0.2s;
          text-decoration: none;
        }
        .pubs-link:hover { color: var(--color-primary, #1a2f6b); }

        /* ── Dots + Show More row ── */
        .pubs-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 28px;
          flex-wrap: wrap;
          gap: 16px;
        }
        .pubs-dots {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .pubs-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--color-border, #e2e8f0);
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          padding: 0;
        }
        .pubs-dot.active {
          background: var(--color-primary, #1a2f6b);
          width: 22px;
          border-radius: 4px;
        }

        /* ── Show More button ── */
        .pubs-show-more {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 24px;
          border-radius: 9999px;
          background: var(--color-primary, #1a2f6b);
          color: #fff;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: var(--font-body, 'DM Sans', sans-serif);
          text-decoration: none;
          border: 2px solid transparent;
          transition: background 0.22s, transform 0.18s, box-shadow 0.22s;
          box-shadow: 0 4px 16px rgba(26,47,107,0.18);
        }
        .pubs-show-more:hover {
          background: var(--color-primary-light, #2563eb);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(37,99,235,0.3);
        }
        .pubs-show-more svg {
          transition: transform 0.2s;
        }
        .pubs-show-more:hover svg {
          transform: translateX(3px);
        }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .pubs-card { flex: 0 0 300px; width: 300px; }
          .pubs-header { flex-direction: column; align-items: flex-start; }
          .pubs-nav { align-self: flex-end; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className={`pubs-section section${visible ? ' in-view' : ''}`}
        id="publications"
        aria-labelledby="pubs-title"
      >
        <div className="container">
          {/* Header */}
          <div className="pubs-header">
            <div className="pubs-header-left">
              <span className="pubs-eyebrow">Research</span>
              <h2 id="pubs-title" className="pubs-section-title">{data.sectionTitle}</h2>
              <p className="pubs-section-sub">{data.sectionSubtitle}</p>
            </div>
            <div className="pubs-nav" aria-label="Slider navigation">
              <button
                className="pubs-nav-btn"
                onClick={() => scrollBy(-1)}
                disabled={!canPrev}
                aria-label="Previous publications"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className="pubs-nav-btn"
                onClick={() => scrollBy(1)}
                disabled={!canNext}
                aria-label="Next publications"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Slider */}
          <div className="pubs-slider-wrap">
            <div
              ref={trackRef}
              className={`pubs-track${isDragging ? ' dragging' : ''}`}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              role="list"
              aria-label="Publications slider"
            >
              {data.items.map((pub, i) => (
                <PubCard key={pub.id} pub={pub} index={i} />
              ))}
            </div>
          </div>

          {/* Bottom: dots + button */}
          <div className="pubs-bottom">
            <div className="pubs-dots" role="tablist" aria-label="Slider position">
              {Array.from({ length: dots }).map((_, i) => (
                <button
                  key={i}
                  className={`pubs-dot${Math.floor(current / 2) === i ? ' active' : ''}`}
                  onClick={() => {
                    trackRef.current?.scrollTo({ left: i * CARD_W * 2, behavior: 'smooth' });
                  }}
                  aria-label={`Go to slide group ${i + 1}`}
                  role="tab"
                  aria-selected={Math.floor(current / 2) === i}
                />
              ))}
            </div>

            <Link href="/publications" className="pubs-show-more">
              View All Publications
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}