import styles from './Competencies.module.css';

const ICONS = {
  brain: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
    </svg>
  ),
  code: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  book: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  robot: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
    </svg>
  ),
};

const CHIP_ICONS = {
  python: '🐍',
  pytorch: '🔥',
  tensorflow: '🧠',
  react: '⚛️',
  postgres: '🐘',
  aws: '☁️',
  git: '🔀',
};

export default function Competencies({ data }) {
  return (
    <section className={`${styles.section} section`} id="research">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>{data.sectionTitle}</h2>
          <div className={styles.divider} />
        </div>

        <div className={styles.grid}>
          {data.cards.map((card) => (
            <CompetencyCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetencyCard({ card }) {
  const isDark = card.variant === 'dark';

  return (
    <div className={`${styles.card} ${isDark ? styles.cardDark : styles.cardLight}`}>
      {/* Icon */}
      <div className={`${styles.iconWrap} ${isDark ? styles.iconWrapDark : styles.iconWrapLight}`}>
        {ICONS[card.icon] || ICONS.brain}
      </div>

      {/* Title */}
      <h3 className={styles.cardTitle}>{card.title}</h3>

      {/* Description */}
      {card.description && (
        <p className={styles.cardDesc}>{card.description}</p>
      )}

      {/* Tags */}
      {card.tags && (
        <div className={styles.tags}>
          {card.tags.map((tag) => (
            <span key={tag} className={`${styles.tag} ${isDark ? styles.tagDark : styles.tagLight}`}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Tech Chips */}
      {card.chips && (
        <div className={styles.chips}>
          {card.chips.map((chip) => (
            <span key={chip.label} className={styles.chip}>
              <span className={styles.chipIcon}>{CHIP_ICONS[chip.icon] || '▪'}</span>
              {chip.label}
            </span>
          ))}
        </div>
      )}

      {/* Publication count */}
      {card.count && (
        <div className={styles.pubBlock}>
          <div className={styles.pubCount}>
            {card.count} <span className={styles.pubLabel}>{card.countLabel}</span>
          </div>
          <div className={styles.venueBlock}>
            <span className={styles.venueLabel}>{card.venuesLabel}</span>
            <div className={styles.venues}>
              {card.venues?.map((v) => (
                <span key={v} className={styles.venueName}>{v}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Robot / project icon */}
      {card.id === 'projects' && (
        <div className={styles.projectIconWrap}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
            <path d="M12 2a4 4 0 0 1 4 4v4H8V6a4 4 0 0 1 4-4z"/><rect x="2" y="10" width="20" height="12" rx="2"/>
            <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2" strokeLinecap="round"/>
            <line x1="12" y1="16" x2="12" y2="16" strokeWidth="2" strokeLinecap="round"/>
            <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )}
    </div>
  );
}
