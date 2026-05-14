'use client';

import { useState, useEffect, useRef } from 'react';
import NavForFullPage from '../../components/layout/NavForFullPage';

// ─── Static gallery data (extend or fetch from API/CMS as needed) ───────────
const GALLERY_DATA = {
  sectionTitle: 'Research Visuals',
  sectionSubtitle: 'Where science meets creative expression through AI generation.',
  categories: ['All', 'Stable Diffusion', 'Architecture', 'Data Art', 'Computer Vision', 'Generative'],
  items: [
    {
      id: 'gal1',
      title: 'Latent Space Exploration #01',
      category: 'Stable Diffusion',
      year: '2024',
      description: 'High-dimensional manifold traversal visualized through VAE latent embeddings.',
      tags: ['VAE', 'Latent Space', 'Diffusion'],
      color: '#0a1628',
      accentColor: '#00d4ff',
      pattern: 'waves',
      featured: true,
    },
    {
      id: 'gal2',
      title: 'Hardware Acceleration Study',
      category: 'Architecture',
      year: '2023',
      description: 'Neural processing unit topology rendered as architectural blueprint.',
      tags: ['NPU', 'CUDA', 'Rendering'],
      color: '#0d1f0d',
      accentColor: '#00ff88',
      pattern: 'grid',
      featured: false,
    },
    {
      id: 'gal3',
      title: 'Manifold Visualization',
      category: 'Data Art',
      year: '2024',
      description: 'Topological data analysis of high-dimensional biological feature spaces.',
      tags: ['TDA', 'Manifold', 'Biology'],
      color: '#1a0a2e',
      accentColor: '#c084fc',
      pattern: 'ribbons',
      featured: true,
    },
    {
      id: 'gal4',
      title: 'Attention Heatmap Series',
      category: 'Computer Vision',
      year: '2023',
      description: 'Transformer self-attention weight visualization across multi-head layers.',
      tags: ['Transformer', 'Attention', 'ViT'],
      color: '#1c0a0a',
      accentColor: '#ff6b6b',
      pattern: 'dots',
      featured: false,
    },
    {
      id: 'gal5',
      title: 'GAN Interpolation #07',
      category: 'Generative',
      year: '2024',
      description: 'Spherical interpolation through StyleGAN3 latent space between semantic anchors.',
      tags: ['GAN', 'StyleGAN', 'Interpolation'],
      color: '#0a1a1c',
      accentColor: '#fbbf24',
      pattern: 'hexagon',
      featured: false,
    },
    {
      id: 'gal6',
      title: 'Segmentation Overlay Study',
      category: 'Computer Vision',
      year: '2023',
      description: 'Semantic segmentation masks overlaid on aerial imagery for precision agriculture.',
      tags: ['Segmentation', 'UAV', 'Agriculture'],
      color: '#0f1a0a',
      accentColor: '#4ade80',
      pattern: 'circuit',
      featured: true,
    },
    {
      id: 'gal7',
      title: 'Neural Texture Synthesis',
      category: 'Generative',
      year: '2024',
      description: 'Feed-forward network trained on Perlin noise distributions for procedural texture output.',
      tags: ['Texture', 'Perlin', 'Synthesis'],
      color: '#150a1c',
      accentColor: '#a78bfa',
      pattern: 'noise',
      featured: false,
    },
    {
      id: 'gal8',
      title: 'Diffusion Timeline #03',
      category: 'Stable Diffusion',
      year: '2024',
      description: 'DDPM denoising process captured frame-by-frame across 1000 timesteps.',
      tags: ['DDPM', 'Timesteps', 'Denoising'],
      color: '#0a0f1c',
      accentColor: '#38bdf8',
      pattern: 'radial',
      featured: false,
    },
    {
      id: 'gal9',
      title: 'Feature Map Cascade',
      category: 'Data Art',
      year: '2023',
      description: 'Intermediate CNN activation maps artistically composited into layered visual.',
      tags: ['CNN', 'Activation', 'Feature Map'],
      color: '#1a100a',
      accentColor: '#fb923c',
      pattern: 'lines',
      featured: true,
    },
  ],
};

// ─── SVG Pattern generators ──────────────────────────────────────────────────
function PatternSVG({ pattern, accentColor }) {
  const id = `pat-${Math.random().toString(36).slice(2, 7)}`;
  const a = accentColor + '55';
  const b = accentColor + '22';

  const patterns = {
    waves: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id={`rg-${id}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#rg-${id})`} />
        {[0, 1, 2, 3, 4].map(i => (
          <ellipse key={i} cx="50%" cy="50%" rx={`${20 + i * 14}%`} ry={`${10 + i * 7}%`}
            fill="none" stroke={accentColor} strokeWidth="0.5" strokeOpacity={0.4 - i * 0.07} />
        ))}
      </svg>
    ),
    grid: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`g-${id}`} width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#g-${id})`} />
        <circle cx="50%" cy="50%" r="30%" fill={accentColor} fillOpacity="0.08" />
      </svg>
    ),
    ribbons: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2,3].map(i => (
          <path key={i}
            d={`M ${-20 + i*40},0 Q ${50},${40+i*20} ${80+i*30},100`}
            fill="none" stroke={accentColor} strokeWidth={`${1.5 - i * 0.3}`} strokeOpacity={0.5 - i * 0.1} />
        ))}
        <circle cx="70%" cy="30%" r="18%" fill={accentColor} fillOpacity="0.12" />
      </svg>
    ),
    dots: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`d-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill={accentColor} fillOpacity="0.4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#d-${id})`} />
        <ellipse cx="50%" cy="50%" rx="35%" ry="25%" fill={accentColor} fillOpacity="0.07" />
      </svg>
    ),
    hexagon: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2].map(i => (
          <polygon key={i}
            points={`50,${8+i*12} ${61+i*4},${14+i*6} ${61+i*4},${26+i*6} 50,${32+i*12} ${39-i*4},${26+i*6} ${39-i*4},${14+i*6}`}
            fill="none" stroke={accentColor} strokeWidth="0.7" strokeOpacity={0.6 - i * 0.15}
            transform={`scale(${1 + i * 0.8}) translate(${-50 * i * 0.4}, ${-20 * i * 0.4})`}
          />
        ))}
      </svg>
    ),
    circuit: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={`c-${id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M10,0 L10,10 L30,10 L30,0 M20,10 L20,30 M0,20 L10,20 M30,20 L40,20" fill="none" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.4" />
            <circle cx="10" cy="10" r="2" fill={accentColor} fillOpacity="0.5" />
            <circle cx="30" cy="10" r="2" fill={accentColor} fillOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#c-${id})`} />
      </svg>
    ),
    noise: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id={`n-${id}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend in="SourceGraphic" mode="overlay" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#n-${id})`} opacity="0.4" />
        <circle cx="40%" cy="40%" r="28%" fill={accentColor} fillOpacity="0.15" />
      </svg>
    ),
    radial: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {[1,2,3,4,5,6,7,8].map(i => (
          <line key={i}
            x1="50%" y1="50%"
            x2={`${50 + Math.cos((i / 8) * Math.PI * 2) * 60}%`}
            y2={`${50 + Math.sin((i / 8) * Math.PI * 2) * 60}%`}
            stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.4"
          />
        ))}
        {[15,25,38].map(r => (
          <circle key={r} cx="50%" cy="50%" r={`${r}%`} fill="none" stroke={accentColor} strokeWidth="0.6" strokeOpacity="0.3" />
        ))}
        <circle cx="50%" cy="50%" r="6%" fill={accentColor} fillOpacity="0.25" />
      </svg>
    ),
    lines: (
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        {[0,1,2,3,4,5,6,7].map(i => (
          <line key={i} x1="0" y1={`${i * 14}%`} x2="100%" y2={`${i * 14 + 20}%`}
            stroke={accentColor} strokeWidth="0.6" strokeOpacity={0.5 - i * 0.05} />
        ))}
        <rect x="20%" y="20%" width="60%" height="60%" rx="4" fill={accentColor} fillOpacity="0.06" />
      </svg>
    ),
  };

  return patterns[pattern] || patterns.waves;
}

// ─── Single Gallery Card ──────────────────────────────────────────────────────
function GalleryCard({ item, onClick, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('gal-visible'); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className="gal-card"
      style={{ '--card-bg': item.color, '--card-accent': item.accentColor, '--delay': `${index * 60}ms` }}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick(item)}
      aria-label={`View ${item.title}`}
    >
      {item.featured && <span className="gal-badge">Featured</span>}
      <div className="gal-visual">
        <PatternSVG pattern={item.pattern} accentColor={item.accentColor} />
        <div className="gal-shimmer" />
      </div>
      <div className="gal-info">
        <span className="gal-cat">{item.category}</span>
        <h3 className="gal-title">{item.title}</h3>
        <p className="gal-desc">{item.description}</p>
        <div className="gal-tags">
          {item.tags.map(t => <span key={t} className="gal-tag">{t}</span>)}
        </div>
      </div>
      <div className="gal-arrow">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </article>
  );
}

// ─── Lightbox Modal ───────────────────────────────────────────────────────────
function Lightbox({ item, onClose, onPrev, onNext }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  return (
    <div>
      <NavForFullPage/> 
   
    <div className="lb-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={item.title}>
      <div className="lb-modal" onClick={e => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <div className="lb-visual" style={{ '--card-bg': item.color, '--card-accent': item.accentColor }}>
          <PatternSVG pattern={item.pattern} accentColor={item.accentColor} />
        </div>
        <div className="lb-content">
          <div className="lb-meta">
            <span className="gal-cat">{item.category}</span>
            <span className="lb-year">{item.year}</span>
          </div>
          <h2 className="lb-title">{item.title}</h2>
          <p className="lb-desc">{item.description}</p>
          <div className="gal-tags">
            {item.tags.map(t => <span key={t} className="gal-tag">{t}</span>)}
          </div>
        </div>
        <div className="lb-nav">
          <button className="lb-btn" onClick={onPrev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Prev
          </button>
          <button className="lb-btn" onClick={onNext} aria-label="Next">
            Next
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </div>
     </div>
  );
}

// ─── Main Gallery Page ────────────────────────────────────────────────────────
export default function GalleryPage() {
  const { sectionTitle, sectionSubtitle, categories, items } = GALLERY_DATA;
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [layout, setLayout] = useState('grid'); // 'grid' | 'masonry'

  const filtered = items.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || item.title.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const currentIndex = lightboxItem ? filtered.findIndex(i => i.id === lightboxItem.id) : -1;
  const openLightbox = item => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);
  const prevItem = () => setLightboxItem(filtered[(currentIndex - 1 + filtered.length) % filtered.length]);
  const nextItem = () => setLightboxItem(filtered[(currentIndex + 1) % filtered.length]);

  return (
    <>
      <style>{`
        /* ── Page wrapper ── */
        .gallery-page {
          min-height: 100vh;
          padding: 96px 0 80px;
          background: var(--color-background);
        }
        /* ── Header ── */
        .gal-header {
          text-align: center;
          margin-bottom: 52px;
        }
        .gal-eyebrow {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-accent);
          background: var(--color-accent-soft);
          padding: 4px 14px;
          border-radius: var(--radius-full);
          margin-bottom: 18px;
        }
        .gal-heading {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-family: var(--font-heading);
          color: var(--color-text);
          margin-bottom: 14px;
          line-height: 1.1;
        }
        .gal-subhead {
          font-size: 1.05rem;
          color: var(--color-text-muted);
          max-width: 520px;
          margin: 0 auto;
        }
        /* ── Toolbar ── */
        .gal-toolbar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          margin-bottom: 36px;
        }
        .gal-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          flex: 1;
        }
        .gal-filter-btn {
          padding: 7px 18px;
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          font-family: var(--font-body);
          font-weight: 500;
          background: var(--color-surface);
          color: var(--color-text-muted);
          border: 1.5px solid var(--color-border);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .gal-filter-btn:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
        .gal-filter-btn.active {
          background: var(--color-primary);
          color: #fff;
          border-color: var(--color-primary);
        }
        .gal-search {
          position: relative;
          flex-shrink: 0;
        }
        .gal-search svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-text-muted);
          pointer-events: none;
        }
        .gal-search input {
          padding: 8px 14px 8px 38px;
          border-radius: var(--radius-full);
          border: 1.5px solid var(--color-border);
          font-family: var(--font-body);
          font-size: 0.87rem;
          background: var(--color-surface);
          color: var(--color-text);
          outline: none;
          width: 200px;
          transition: border-color 0.2s;
        }
        .gal-search input:focus { border-color: var(--color-accent); }
        .gal-layout-toggle {
          display: flex;
          gap: 4px;
          background: var(--color-surface);
          border: 1.5px solid var(--color-border);
          border-radius: var(--radius-sm);
          padding: 3px;
        }
        .gal-layout-btn {
          padding: 5px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          color: var(--color-text-muted);
          transition: all 0.2s;
        }
        .gal-layout-btn.active {
          background: var(--color-primary);
          color: #fff;
        }
        /* ── Count ── */
        .gal-count {
          font-size: 0.83rem;
          color: var(--color-text-muted);
          margin-bottom: 24px;
          font-family: var(--font-mono);
        }
        .gal-count span { color: var(--color-accent); font-weight: 600; }
        /* ── Grid ── */
        .gal-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .gal-grid.masonry {
          grid-template-columns: repeat(3, 1fr);
          grid-auto-rows: auto;
        }
        .gal-grid.masonry .gal-card:nth-child(3n+1) { grid-row: span 1; }
        .gal-grid.masonry .gal-card:nth-child(3n+2) { grid-row: span 2; }

        @media (max-width: 1024px) {
          .gal-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .gal-grid { grid-template-columns: 1fr; }
          .gal-search input { width: 100%; }
          .gal-toolbar { flex-direction: column; align-items: stretch; }
          .gal-search { width: 100%; }
        }
        /* ── Card ── */
        .gal-card {
          background: var(--color-surface);
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1.5px solid var(--color-border);
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), box-shadow 0.32s, border-color 0.25s;
          opacity: 0;
          transform: translateY(24px);
          will-change: transform, opacity;
          box-shadow: var(--shadow-card);
        }
        .gal-card.gal-visible {
          animation: galFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) var(--delay, 0ms) both;
        }
        @keyframes galFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .gal-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-card-hover);
          border-color: var(--card-accent, var(--color-accent));
        }
        .gal-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          z-index: 2;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: var(--card-accent, var(--color-accent));
          color: #000;
          padding: 3px 10px;
          border-radius: var(--radius-full);
        }
        .gal-visual {
          width: 100%;
          aspect-ratio: 4/3;
          background: var(--card-bg, #0a1628);
          position: relative;
          overflow: hidden;
        }
        .gal-visual svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .gal-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%);
          background-size: 200% 100%;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .gal-card:hover .gal-shimmer {
          opacity: 1;
          animation: shimmer 1.2s ease infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .gal-info {
          padding: 20px 22px 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .gal-cat {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent);
        }
        .gal-title {
          font-size: 1.05rem;
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--color-text);
          line-height: 1.3;
        }
        .gal-desc {
          font-size: 0.84rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          flex: 1;
        }
        .gal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .gal-tag {
          font-size: 0.72rem;
          font-family: var(--font-mono);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          background: var(--color-background-alt);
          color: var(--color-text-muted);
          border: 1px solid var(--color-border);
        }
        .gal-arrow {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 34px;
          height: 34px;
          border-radius: var(--radius-full);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          opacity: 0;
          transform: translate(4px, -4px);
          transition: opacity 0.25s, transform 0.25s;
        }
        .gal-card:hover .gal-arrow { opacity: 1; transform: translate(0,0); }

        /* ── Empty state ── */
        .gal-empty {
          grid-column: 1 / -1;
          text-align: center;
          padding: 72px 24px;
          color: var(--color-text-muted);
        }
        .gal-empty svg { margin: 0 auto 16px; opacity: 0.3; }
        .gal-empty h3 { font-size: 1.2rem; margin-bottom: 8px; color: var(--color-text); }
        .gal-empty p { font-size: 0.9rem; }

        /* ── Lightbox ── */
        .lb-overlay {
          position: fixed;
          inset: 0;
          background: rgba(10,15,30,0.82);
          backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lb-modal {
          background: var(--color-surface);
          border-radius: var(--radius-xl);
          overflow: hidden;
          width: 100%;
          max-width: 760px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 0 32px 80px rgba(0,0,0,0.4);
          animation: lbSlide 0.3s cubic-bezier(0.22,1,0.36,1);
          border: 1.5px solid var(--color-border);
        }
        @keyframes lbSlide { from { transform: translateY(20px); opacity: 0; } to { transform: none; opacity: 1; } }
        .lb-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 2;
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background: rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s;
        }
        .lb-close:hover { background: rgba(0,0,0,0.6); }
        .lb-visual {
          width: 100%;
          aspect-ratio: 16/7;
          background: var(--card-bg);
          position: relative;
          flex-shrink: 0;
        }
        .lb-visual svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .lb-content {
          padding: 28px 32px 20px;
          overflow-y: auto;
        }
        .lb-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }
        .lb-year {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--color-text-muted);
        }
        .lb-title {
          font-size: 1.6rem;
          font-family: var(--font-heading);
          font-weight: 700;
          color: var(--color-text);
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .lb-desc {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          line-height: 1.65;
          margin-bottom: 16px;
        }
        .lb-nav {
          display: flex;
          justify-content: space-between;
          padding: 14px 32px 24px;
          border-top: 1px solid var(--color-border);
          flex-shrink: 0;
        }
        .lb-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.87rem;
          font-weight: 600;
          color: var(--color-text-muted);
          padding: 8px 18px;
          border-radius: var(--radius-full);
          background: var(--color-background-alt);
          border: 1.5px solid var(--color-border);
          cursor: pointer;
          transition: all 0.2s;
        }
        .lb-btn:hover { color: var(--color-accent); border-color: var(--color-accent); }

        @media (max-width: 640px) {
          .lb-content { padding: 20px 20px 12px; }
          .lb-nav { padding: 12px 20px 20px; }
          .lb-title { font-size: 1.25rem; }
        }
      `}</style>

      <section className="gallery-page section" id="gallery">
        <NavForFullPage/>
        <div className="container">
          {/* Header */}
          <header className="gal-header">
            <span className="gal-eyebrow">Portfolio</span>
            <h1 className="gal-heading">{sectionTitle}</h1>
            <p className="gal-subhead">{sectionSubtitle}</p>
          </header>

          {/* Toolbar */}
          <div className="gal-toolbar">
            <div className="gal-filters" role="group" aria-label="Filter by category">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`gal-filter-btn${activeCategory === cat ? ' active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="gal-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <input
                type="search"
                placeholder="Search visuals…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                aria-label="Search gallery"
              />
            </div>

            <div className="gal-layout-toggle" role="group" aria-label="Switch layout">
              {['grid', 'masonry'].map(l => (
                <button
                  key={l}
                  className={`gal-layout-btn${layout === l ? ' active' : ''}`}
                  onClick={() => setLayout(l)}
                  aria-pressed={layout === l}
                >
                  {l === 'grid' ? '⊞ Grid' : '⊟ Masonry'}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="gal-count">
            Showing <span>{filtered.length}</span> of {items.length} visuals
          </p>

          {/* Grid */}
          <div className={`gal-grid${layout === 'masonry' ? ' masonry' : ''}`} role="list">
            {filtered.length > 0 ? (
              filtered.map((item, i) => (
                <GalleryCard key={item.id} item={item} onClick={openLightbox} index={i} />
              ))
            ) : (
              <div className="gal-empty" role="status">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <h3>No results found</h3>
                <p>Try a different category or search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={closeLightbox}
          onPrev={prevItem}
          onNext={nextItem}
        />
      )}
    </>
  );
}