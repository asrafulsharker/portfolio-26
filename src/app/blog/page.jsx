'use client';
import { useState } from 'react';
import Link from 'next/link';
import blogData from './blog.json';
import styles from './BlogPage.module.css';
import NavForFullPage from '../../components/layout/NavForFullPage';


// ── Tag pill ─────────────────────────────────────────────────────────────────
function Tag({ label }) {
  return <span className={styles.tag}>{label}</span>;
}

// ── Social icon ───────────────────────────────────────────────────────────────
function SocialIcon({ type }) {
  if (type === 'scholar') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
    </svg>
  );
  if (type === 'github') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero({ data }) {
  return (
    <div className={styles.hero} style={{ backgroundImage: `url(${data.image})` }}>
      <div className={styles.heroOverlay} />
      <div className={`${styles.heroContent} container`}>
        <Tag label={data.tag} />
        <h1 className={styles.heroTitle}>{data.title}</h1>
        <p className={styles.heroExcerpt}>{data.excerpt}</p>
        <Link href={data.ctaHref} className={styles.heroCta}>{data.cta}</Link>
      </div>
    </div>
  );
}

// ── Author sidebar card ───────────────────────────────────────────────────────
function AuthorCard({ author }) {
  return (
    <div className={styles.authorCard}>
      <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
      <div className={styles.authorName}>{author.name}</div>
      <div className={styles.authorRole}>{author.role}</div>
      <p className={styles.authorBio}>{author.bio}</p>
      <div className={styles.authorSocials}>
        {author.socials.map(s => (
          <a key={s.label} href={s.href} className={styles.authorSocialBtn} aria-label={s.label} target="_blank" rel="noopener noreferrer">
            <SocialIcon type={s.icon} />
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Newsletter sidebar card ───────────────────────────────────────────────────
function NewsletterCard({ data }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <div className={styles.newsletterCard}>
      <h4 className={styles.newsletterHeading}>{data.heading}</h4>
      <p className={styles.newsletterSub}>{data.subtext}</p>
      {done ? (
        <p className={styles.newsletterThanks}>Thanks for subscribing! 🎉</p>
      ) : (
        <>
          <input
            type="email"
            placeholder={data.placeholder}
            className={styles.newsletterInput}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button className={styles.newsletterBtn} onClick={() => email && setDone(true)}>
            {data.cta}
          </button>
        </>
      )}
    </div>
  );
}

// ── Trending sidebar ──────────────────────────────────────────────────────────
function TrendingCard({ posts }) {
  return (
    <div className={styles.trendingCard}>
      <h4 className={styles.trendingHeading}>→ Trending Reflections</h4>
      <ol className={styles.trendingList}>
        {posts.slice(0, 5).map((p, i) => (
          <li key={p.id} className={styles.trendingItem}>
            <span className={styles.trendingNum}>{String(i + 1).padStart(2, '0')}</span>
            <Link href={p.href} className={styles.trendingTitle}>{p.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── Featured post ─────────────────────────────────────────────────────────────
function FeaturedPost({ post }) {
  return (
    <Link href={post.href} className={styles.featuredCard}>
      <div className={styles.featuredImg} style={{ backgroundImage: `url(${post.image})` }}>
        <Tag label={post.tag} />
      </div>
      <div className={styles.featuredInfo}>
        <h2 className={styles.featuredTitle}>{post.title}</h2>
        <p className={styles.featuredExcerpt}>{post.excerpt}</p>
        <div className={styles.postMeta}>
          <span>{post.date}</span>
          <span className={styles.metaDot} />
          <span>{post.readTime}</span>
        </div>
        <span className={styles.readMore}>Read more →</span>
      </div>
    </Link>
  );
}

// ── Grid post card ────────────────────────────────────────────────────────────
function GridCard({ post }) {
  return (
    <Link href={post.href} className={styles.gridCard}>
      {post.image && (
        <div className={styles.gridImg} style={{ backgroundImage: `url(${post.image})` }}>
          <Tag label={post.tag} />
        </div>
      )}
      {!post.image && (
        <div className={styles.gridNoImg}>
          <Tag label={post.tag} />
        </div>
      )}
      <div className={styles.gridInfo}>
        <h3 className={styles.gridTitle}>{post.title}</h3>
        <p className={styles.gridExcerpt}>{post.excerpt}</p>
        <div className={styles.postMeta}>
          <span>{post.date}</span>
          <span className={styles.metaDot} />
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// ── Archive card ──────────────────────────────────────────────────────────────
function ArchiveCard({ post }) {
  return (
    <Link href={post.href} className={styles.archiveCard}>
      <div className={styles.archiveImg} style={{ backgroundImage: `url(${post.image})` }}>
        <div className={styles.archiveOverlay} />
        <div className={styles.archiveInfo}>
          <Tag label={post.tag} />
          <h4 className={styles.archiveTitle}>{post.title}</h4>
          <span className={styles.archiveDate}>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const { hero, categories, author, newsletter, featured, grid, archive } = blogData;
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [archiveIdx, setArchiveIdx] = useState(0);
  const visibleArchive = archive.slice(archiveIdx, archiveIdx + 4);

  return (
    <div>
              <NavForFullPage/>

    
    <div className={styles.page}>

      {/* Hero */}
      <Hero data={hero} />

      {/* Main body */}
      <div className={`${styles.body} container`}>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.catFilters}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <span className={styles.sortLabel}>Sort by: New</span>
        </div>

        {/* Content + Sidebar */}
        <div className={styles.layout}>

          {/* Left: posts */}
          <div className={styles.posts}>
            <FeaturedPost post={featured} />
            <div className={styles.gridPosts}>
              {grid.map(post => <GridCard key={post.id} post={post} />)}
            </div>
          </div>

          {/* Right: sidebar */}
          <aside className={styles.sidebar}>
            <AuthorCard author={author} />
            <NewsletterCard data={newsletter} />
            <TrendingCard posts={grid} />
          </aside>
        </div>

        {/* Archive section */}
        <div className={styles.archiveSection}>
          <div className={styles.archiveHeader}>
            <h2 className={styles.archiveHeading}>More from the Archive</h2>
            <div className={styles.archiveNav}>
              <button
                className={styles.archiveNavBtn}
                onClick={() => setArchiveIdx(Math.max(0, archiveIdx - 1))}
                disabled={archiveIdx === 0}
                aria-label="Previous"
              >‹</button>
              <button
                className={styles.archiveNavBtn}
                onClick={() => setArchiveIdx(Math.min(archive.length - 4, archiveIdx + 1))}
                disabled={archiveIdx >= archive.length - 4}
                aria-label="Next"
              >›</button>
            </div>
          </div>
          <div className={styles.archiveGrid}>
            {visibleArchive.map(post => <ArchiveCard key={post.id} post={post} />)}
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
