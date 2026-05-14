'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({ data }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(data.links[0]?.href || '');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.inner} container`}>
        <a href="#home" className={styles.logo}>{data.logo}</a>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {data.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.link} ${activeLink === link.href ? styles.active : ''}`}
                onClick={() => setActiveLink(link.href)}
              >
                {link.label}
                {activeLink === link.href && <span className={styles.underline} />}
              </a>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className={styles.icons}>
          {data.showSearch && (
            <button className={styles.iconBtn} aria-label="Search">
              <SearchIcon />
            </button>
          )}
          {data.showThemeToggle && (
            <button className={styles.iconBtn} aria-label="Toggle theme">
              <MoonIcon />
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {data.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
