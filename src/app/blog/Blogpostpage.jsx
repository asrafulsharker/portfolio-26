'use client';
import { useState } from 'react';
import Link from 'next/link';
import blogData from './blog.json'; // adjust path as needed
import styles from './Blogpostpage.module.css';
import NavForFullPage from '../../components/layout/NavForFullPage';

// ── Data helpers ──────────────────────────────────────────────────────────────
function getPost(slug) { return blogData.posts.find(p => p.slug === slug); }
function getRelated(ids) { return ids.map(id => blogData.posts.find(p => p.id === id)).filter(Boolean); }

// ── Body renderer ─────────────────────────────────────────────────────────────
function BodyBlock({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2 className={styles.bodyHeading}>{block.content}</h2>;
    case 'quote':
      return (
        <blockquote className={styles.bodyQuote}>
          <p className={styles.bodyQuoteText}>"{block.content}"</p>
          {block.author && <cite className={styles.bodyQuoteCite}>— {block.author}</cite>}
        </blockquote>
      );
    case 'paragraph':
    default:
      return <p className={styles.bodyParagraph}>{block.content}</p>;
  }
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setProgress(pct);
    };
  }
  return (
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: `${progress}%` }} />
    </div>
  );
}

// ── Related Card ──────────────────────────────────────────────────────────────
function RelatedCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className={styles.relatedCard}>
      {post.image ? (
        <div className={styles.relatedImg} style={{ backgroundImage: `url(${post.image})` }}>
          <div className={styles.relatedOverlay} />
        </div>
      ) : (
        <div className={styles.relatedImgPlaceholder} />
      )}
      <div className={styles.relatedInfo}>
        <span className={styles.relatedTag}>{post.tag}</span>
        <h4 className={styles.relatedTitle}>{post.title}</h4>
        <div className={styles.relatedMeta}>
          <span>{post.dateFormatted}</span>
          <span className={styles.dot} />
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// ── Share Button ──────────────────────────────────────────────────────────────
function ShareButtons({ title, slug }) {
  const url = `https://asrafulsharker.ai/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const titleEnc = encodeURIComponent(title);
  return (
    <div className={styles.shareRow}>
      <span className={styles.shareLabel}>Share</span>
      <a href={`https://twitter.com/intent/tweet?url=${encoded}&text=${titleEnc}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} aria-label="Share on X">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        X / Twitter
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`} target="_blank" rel="noopener noreferrer" className={styles.shareBtn} aria-label="Share on LinkedIn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <button className={`${styles.shareBtn} ${styles.copyBtn}`} onClick={() => navigator.clipboard?.writeText(url)} aria-label="Copy link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
        Copy link
      </button>
    </div>
  );
}

// ── Main Post Page ────────────────────────────────────────────────────────────
export default function BlogPostPage({ params }) {
  // In App Router: params.slug  |  in Pages Router: pass slug directly
  const slug = params?.slug ?? 'azure-horizon';
  const post = getPost(slug);

  if (!post) {
    return (
      <div className={styles.notFound}>
        <h1>Post not found</h1>
        <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
      </div>
    );
  }

  const related = getRelated(post.relatedIds || []);

  return (
    <div className={styles.page}>
      <NavForFullPage />
      <ReadingProgress />

      {/* ── Hero ── */}
      <div className={styles.hero}>
        {post.image ? (
          <div className={styles.heroImg} style={{ backgroundImage: `url(${post.image})` }}>
            <div className={styles.heroOverlay} />
          </div>
        ) : (
          <div className={styles.heroNoImg} />
        )}
        <div className={`${styles.heroContent} container`}>
          <Link href="/blog" className={styles.backLink}>← Back to Blog</Link>
          <div className={styles.heroMeta}>
            <span className={styles.heroTag}>{post.tag}</span>
            <span className={styles.heroCat}>{post.category}</span>
          </div>
          <h1 className={styles.heroTitle}>{post.title}</h1>
          {post.subtitle && <p className={styles.heroSubtitle}>{post.subtitle}</p>}
          <div className={styles.heroInfo}>
            <img src={post.author.avatar} alt={post.author.name} className={styles.heroAvatar} />
            <div>
              <div className={styles.heroAuthorName}>{post.author.name}</div>
              <div className={styles.heroAuthorMeta}>
                {post.dateFormatted} · {post.readTime} · {post.wordCount?.toLocaleString()} words
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article layout ── */}
      <div className={`${styles.articleWrapper} container`}>
        <div className={styles.articleLayout}>

          {/* ── Body ── */}
          <article className={styles.article}>
            {/* Lead excerpt */}
            <p className={styles.leadExcerpt}>{post.excerpt}</p>

            {/* Body blocks */}
            <div className={styles.body}>
              {post.body.map((block, i) => <BodyBlock key={i} block={block} />)}
            </div>

            {/* Tags */}
            <div className={styles.tagRow}>
              {post.tags.map(t => (
                <span key={t} className={styles.tagPill}>{t}</span>
              ))}
            </div>

            {/* Share */}
            <ShareButtons title={post.title} slug={post.slug} />

            {/* Author bio */}
            <div className={styles.authorBox}>
              <img src={post.author.avatar} alt={post.author.name} className={styles.authorBoxAvatar} />
              <div>
                <div className={styles.authorBoxName}>{post.author.name}</div>
                <div className={styles.authorBoxRole}>{post.author.role}</div>
                <p className={styles.authorBoxBio}>{blogData.blogPage.author.bio}</p>
              </div>
            </div>
          </article>

          {/* ── Sticky sidebar ── */}
          <aside className={styles.sidebar}>
            {/* Table of contents */}
            <div className={styles.tocCard}>
              <h4 className={styles.tocHeading}>In this article</h4>
              <ul className={styles.tocList}>
                {post.body.filter(b => b.type === 'heading').map((b, i) => (
                  <li key={i} className={styles.tocItem}>
                    <span className={styles.tocDot} />
                    <span className={styles.tocText}>{b.content}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Post info */}
            <div className={styles.infoCard}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Published</span>
                <span className={styles.infoValue}>{post.dateFormatted}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Read time</span>
                <span className={styles.infoValue}>{post.readTime}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Words</span>
                <span className={styles.infoValue}>{post.wordCount?.toLocaleString()}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Category</span>
                <span className={styles.infoValue}>{post.category}</span>
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related posts ── */}
        {related.length > 0 && (
          <div className={styles.relatedSection}>
            <h2 className={styles.relatedHeading}>You might also enjoy</h2>
            <div className={styles.relatedGrid}>
              {related.map(p => <RelatedCard key={p.id} post={p} />)}
            </div>
          </div>
        )}

        {/* ── Prev / Next nav ── */}
        <div className={styles.postNav}>
          <Link href="/blog" className={styles.postNavBtn}>
            ← All Posts
          </Link>
          <Link href="/blog" className={styles.postNavBtn}>
            More Articles →
          </Link>
        </div>

      </div>
    </div>
  );
}