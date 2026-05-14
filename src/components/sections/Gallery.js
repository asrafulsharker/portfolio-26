import styles from './Gallery.module.css';

export default function Gallery({ data }) {
  return (
    <section className={`${styles.section} section`} id="gallery">
      <div className="container">
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{data.sectionTitle}</h2>
            <p className={styles.subtitle}>{data.sectionSubtitle}</p>
          </div>
          <a href={data.viewAllHref} className={styles.viewAll}>
            {data.viewAllLabel}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
        </div>

        <div className={styles.grid}>
          {data.items.map((item) => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryItem({ item }) {
  return (
    <div className={styles.item}>
      <div className={styles.imageWrap} style={{ background: item.color }}>
        <PatternSVG pattern={item.pattern} accent={item.accentColor} />
      </div>
      <div className={styles.info}>
        <span className={styles.itemTitle}>{item.title}</span>
        <span className={styles.itemCategory}>{item.category}</span>
      </div>
    </div>
  );
}

function PatternSVG({ pattern, accent }) {
  if (pattern === 'waves') {
    return (
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id={`g-${accent}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.3"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0"/>
          </radialGradient>
        </defs>
        {[0,1,2,3,4,5,6,7].map(i => (
          <path
            key={i}
            d={`M${-60 + i * 18},100 C${20 + i * 18},${60 - i * 5} ${120 + i * 18},${140 + i * 5} ${360 + i * 18},100`}
            stroke={accent}
            strokeWidth="1.5"
            fill="none"
            opacity={0.15 + i * 0.1}
          />
        ))}
        {[0,1,2,3].map(i => (
          <ellipse key={i} cx={60 + i * 60} cy={80 + i * 15} rx={4 - i * 0.5} ry={4 - i * 0.5}
            fill={accent} opacity={0.6 - i * 0.1}/>
        ))}
        <circle cx="150" cy="100" r="60" fill={`url(#g-${accent})`}/>
      </svg>
    );
  }

  if (pattern === 'grid') {
    return (
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        {Array.from({length: 8}).map((_, i) =>
          Array.from({length: 6}).map((_, j) => (
            <rect key={`${i}-${j}`} x={i * 38 + 8} y={j * 32 + 4} width="30" height="24" rx="3"
              fill={accent} opacity={Math.random() * 0.12 + 0.04}/>
          ))
        )}
        {[{x:80,y:50,w:60,h:100},{x:160,y:30,w:80,h:140}].map((r,i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={r.h} rx="4"
            stroke={accent} strokeWidth="1.5" fill="none" opacity="0.5"/>
        ))}
        <circle cx="150" cy="100" r="8" fill={accent} opacity="0.8"/>
        <circle cx="150" cy="100" r="16" stroke={accent} strokeWidth="1" fill="none" opacity="0.4"/>
        <circle cx="150" cy="100" r="28" stroke={accent} strokeWidth="0.5" fill="none" opacity="0.25"/>
      </svg>
    );
  }

  if (pattern === 'ribbons') {
    return (
      <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="rib" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#fff" stopOpacity="0.3"/>
            <stop offset="100%" stopColor={accent} stopOpacity="0.5"/>
          </linearGradient>
        </defs>
        {[0,1,2,3].map(i => (
          <path key={i}
            d={`M${-20 + i * 30},${60 + i * 10} Q150,${100 + i * 20} ${320 - i * 30},${60 - i * 10}
                Q150,${80 - i * 10} ${-20 + i * 30},${60 + i * 10}Z`}
            fill="url(#rib)" opacity={0.3 - i * 0.05}
          />
        ))}
        {[0,1,2].map(i => (
          <path key={i}
            d={`M0,${90 + i * 12} C80,${70 - i * 10} 200,${130 + i * 8} 300,${90 - i * 12}`}
            stroke={accent} strokeWidth="2.5" fill="none" opacity={0.7 - i * 0.15}
          />
        ))}
      </svg>
    );
  }

  return null;
}
