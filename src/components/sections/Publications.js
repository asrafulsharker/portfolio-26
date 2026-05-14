import styles from './Publications.module.css';

const LINK_ICONS = {
  download: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  code: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  quote: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
    </svg>
  ),
  image: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg>
  ),
};

export default function Publications({ data }) {
  return (
    <section className={`${styles.section} section`} id="publications">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{data.sectionTitle}</h2>
          <p className={styles.subtitle}>{data.sectionSubtitle}</p>
        </div>

        <div className={styles.grid}>
          {data.items.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationCard({ pub }) {
  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        <span className={styles.type}>{pub.type}</span>
        <span className={styles.year}>{pub.year}</span>
      </div>
      <h3 className={styles.cardTitle}>{pub.title}</h3>
      <p className={styles.desc}>{pub.description}</p>
      <div className={styles.links}>
        {pub.links.map((link) => (
          <a key={link.label} href={link.href} className={styles.link}>
            {LINK_ICONS[link.icon]}
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
