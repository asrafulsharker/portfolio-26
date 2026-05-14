import styles from './Footer.module.css';

export default function Footer({ data }) {
  const year = new Date().getFullYear();

  const links = data?.links || [
    { label: 'Scholar',  href: '#' },
    { label: 'GitHub',   href: '#' },
    { label: 'ORCID',   href: '#' },
    { label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className={styles.footer}>
      {/* Decorative top accent bar */}
      <div className={styles.accentBar} />

      <div className={`${styles.inner} container`}>

        {/* Left */}
        <div className={styles.brand}>
          <span className={styles.logo}>{data?.name || 'Asraful Sharker'}</span>
          <p className={styles.tagline}>
            {data?.tagline || 'Precision in Code and Inquiry. Bridging the gap between theory and execution.'}
          </p>
        </div>

        {/* Center */}
        <nav className={styles.links} aria-label="Footer navigation">
          {links.map(link => (
            <a key={link.label} href={link.href} className={styles.link}
               target="_blank" rel="noopener noreferrer">
              <span className={styles.linkDot} />
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right */}
        <div className={styles.right}>
          <span className={styles.copy}>© {year} AI Research &amp; Development.</span>
          <span className={styles.madewith}>Built with precision &amp; purpose.</span>
        </div>

      </div>
    </footer>
  );
}