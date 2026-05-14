'use client';
import { useState } from 'react';
import Link from 'next/link';
import blogData from './blog.json';
import styles from './BlogPage.module.css';
import NavForFullPage from '../../components/layout/NavForFullPage';

// ── Helpers ───────────────────────────────────────────────────────────────────
const { blogPage, posts } = blogData;

function getPost(id) { return posts.find(p => p.id === id); }
function getFeatured() { return posts.find(p => p.featured && !p.heroPost); }
function getHero() { return posts.find(p => p.heroPost); }
function getGrid() { return posts.filter(p => !p.heroPost && !p.featured); }
function getArchive() { return posts.filter(p => p.image); }

// ── Icons ─────────────────────────────────────────────────────────────────────
function SocialIcon({ type }) {
  if (type === 'scholar') return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>;
  if (type === 'github') return <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}

// ── Tag ───────────────────────────────────────────────────────────────────────
function Tag({ label }) {
  return <span className={styles.tag}>{label}</span>;
}

// ── Author Sidebar ────────────────────────────────────────────────────────────
function AuthorCard({ author }) {
  return (
    <div className={styles.authorCard}>
      <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
      <div className={styles.authorName}>{author.name}</div>
      <div className={styles.authorRole}>{author.role}</div>
      <p className={styles.authorBio}>{author.bio}</p>
      <div className={styles.authorSocials}>
        {author.socials.map(s => (
          <a key={s.label} href={s.href} className={styles.socialBtn} aria-label={s.label} target="_blank" rel="noopener noreferrer">
            <SocialIcon type={s.icon} />
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Newsletter Sidebar ────────────────────────────────────────────────────────
function NewsletterCard({ data }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <div className={styles.newsletterCard}>
      <h4 className={styles.nlHeading}>{data.heading}</h4>
      <p className={styles.nlSub}>{data.subtext}</p>
      {done ? (
        <p className={styles.nlThanks}>Thanks for subscribing! 🎉</p>
      ) : (
        <>
          <input type="email" placeholder={data.placeholder} className={styles.nlInput}
            value={email} onChange={e => setEmail(e.target.value)} />
          <button className={styles.nlBtn} onClick={() => email && setDone(true)}>{data.cta}</button>
        </>
      )}
    </div>
  );
}

// ── Trending Sidebar ──────────────────────────────────────────────────────────
function TrendingCard() {
  const trending = posts.slice(0, 5);
  return (
    <div className={styles.trendingCard}>
      <h4 className={styles.trendingHeading}>→ Trending Reflections</h4>
      <ol className={styles.trendingList}>
        {trending.map((p, i) => (
          <li key={p.id} className={styles.trendingItem}>
            <span className={styles.trendingNum}>{String(i + 1).padStart(2, '0')}</span>
            <Link href={`/blog/${p.slug}`} className={styles.trendingTitle}>{p.title}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

// ── Featured Post ─────────────────────────────────────────────────────────────
function FeaturedPost({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.featuredCard}>
      {post.image && (
        <div className={styles.featuredImg} style={{ backgroundImage: `url(${post.image})` }}>
          <Tag label={post.tag} />
        </div>
      )}
      <div className={styles.featuredInfo}>
        {!post.image && <Tag label={post.tag} />}
        <h2 className={styles.featuredTitle}>{post.title}</h2>
        <p className={styles.featuredExcerpt}>{post.excerpt}</p>
        <div className={styles.postMeta}>
          <span>{post.dateFormatted}</span>
          <span className={styles.dot} />
          <span>{post.readTime}</span>
        </div>
        <span className={styles.readMore}>Read more →</span>
      </div>
    </Link>
  );
}

// ── Grid Card ─────────────────────────────────────────────────────────────────
function GridCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.gridCard}>
      {post.image ? (
        <div className={styles.gridImg} style={{ backgroundImage: `url(${post.image})` }}>
          <Tag label={post.tag} />
        </div>
      ) : (
        <div className={styles.gridNoImg}><Tag label={post.tag} /></div>
      )}
      <div className={styles.gridInfo}>
        <h3 className={styles.gridTitle}>{post.title}</h3>
        <p className={styles.gridExcerpt}>{post.excerpt}</p>
        <div className={styles.postMeta}>
          <span>{post.dateFormatted}</span>
          <span className={styles.dot} />
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// ── Archive Card ──────────────────────────────────────────────────────────────
function ArchiveCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.archiveCard}>
      <div className={styles.archiveImg} style={{ backgroundImage: `url(${post.image})` }}>
        <div className={styles.archiveOverlay} />
        <div className={styles.archiveInfo}>
          <Tag label={post.tag} />
          <h4 className={styles.archiveTitle}>{post.title}</h4>
          <span className={styles.archiveDate}>{post.dateFormatted}</span>
        </div>
      </div>
    </Link>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState(blogPage.categories[0]);
  const [archiveStart, setArchiveStart] = useState(0);

  const heroPost   = getHero();
  const featured   = getFeatured();
  const gridPosts  = getGrid();
  const archivePosts = getArchive();

  const filteredGrid = activeCategory === blogPage.categories[0]
    ? gridPosts
    : gridPosts.filter(p => p.category === activeCategory);

  const visibleArchive = archivePosts.slice(archiveStart, archiveStart + 4);
  const ITEMS_PER_PAGE = 4;

  return (
    <div className={styles.page}>
      <NavForFullPage/>

      {/* ── Hero ── */}
      {heroPost && (
        <div className={styles.hero} style={{ backgroundImage: `url(${heroPost.image})` }}>
          <div className={styles.heroOverlay} />
          <div className={`${styles.heroContent} container`}>
            <Tag label={heroPost.tag} />
            <h1 className={styles.heroTitle}>{heroPost.title}</h1>
            <p className={styles.heroExcerpt}>{heroPost.excerpt}</p>
            <Link href={`/blog/${heroPost.slug}`} className={styles.heroCta}>
              {blogPage.hero.cta} →
            </Link>
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className={`${styles.body} container`}>

        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.catFilters}>
            {blogPage.categories.map(cat => (
              <button key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catActive : ''}`}
                onClick={() => setActiveCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
          <span className={styles.sortLabel}>Sort by: New</span>
        </div>

        {/* Layout */}
        <div className={styles.layout}>

          {/* Posts column */}
          <div className={styles.posts}>
            {featured && <FeaturedPost post={featured} />}
            <div className={styles.gridPosts}>
              {filteredGrid.length > 0
                ? filteredGrid.map(p => <GridCard key={p.id} post={p} />)
                : <p className={styles.noResults}>No posts in this category yet.</p>
              }
            </div>
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            <AuthorCard author={blogPage.author} />
            <NewsletterCard data={blogPage.newsletter} />
            <TrendingCard />
          </aside>
        </div>

        {/* Archive */}
        <div className={styles.archiveSection}>
          <div className={styles.archiveHeader}>
            <h2 className={styles.archiveHeading}>More from the Archive</h2>
            <div className={styles.archiveNav}>
              <button className={styles.archiveNavBtn}
                onClick={() => setArchiveStart(Math.max(0, archiveStart - ITEMS_PER_PAGE))}
                disabled={archiveStart === 0}>‹</button>
              <button className={styles.archiveNavBtn}
                onClick={() => setArchiveStart(Math.min(archivePosts.length - ITEMS_PER_PAGE, archiveStart + ITEMS_PER_PAGE))}
                disabled={archiveStart + ITEMS_PER_PAGE >= archivePosts.length}>›</button>
            </div>
          </div>
          <div className={styles.archiveGrid}>
            {visibleArchive.map(p => <ArchiveCard key={p.id} post={p} />)}
          </div>
        </div>

      </div>
    </div>
  );
}