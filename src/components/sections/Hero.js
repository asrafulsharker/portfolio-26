import styles from './Hero.module.css';

export default function Hero({ data }) {
  return (
    <section className={styles.hero} id="home">
      <div className={`${styles.inner} container`}>
        {/* Left Content */}
        <div className={styles.content}>
          {/* Badge */}
          <div className={`${styles.badge} animate-fade-up`}>
            {data.badge.dot && <span className={styles.dot} />}
            <span>{data.badge.text}</span>
          </div>

          {/* Title */}
          <h1 className={`${styles.title} animate-fade-up animate-fade-up-delay-1`}>
            {data.titleLines.map((line, i) => (
              <span
                key={i}
                className={line.colored ? styles.colored : ''}
                style={{ display: 'block' }}
              >
                {line.text}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p className={`${styles.desc} animate-fade-up animate-fade-up-delay-2`}>
            {data.description}
          </p>

          {/* CTA Buttons */}
          <div className={`${styles.ctas} animate-fade-up animate-fade-up-delay-3`}>
            {data.cta.map((btn) => (
              <a
                key={btn.label}
                href={btn.href}
                className={`${styles.btn} ${styles[`btn${capitalize(btn.variant)}`]}`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right - CV Preview */}
        {data.cvPreview?.show && (
          <div className={`${styles.cvWrap} animate-fade-up animate-fade-up-delay-2`}>
            <div className={styles.cvCard}>
              <CVMockup />
            </div>
          </div>
        )}
      </div>

      {/* Background decoration */}
      <div className={styles.bgBlob1} aria-hidden />
      <div className={styles.bgBlob2} aria-hidden />
    </section>
  );
}

function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : '';
}

function CVMockup() {
  return (
    <svg viewBox="0 0 340 480" xmlns="http://www.w3.org/2000/svg" className="cv-svg" style={{ width: '100%', height: 'auto' }}>
      {/* CV card background */}
      <rect width="340" height="480" rx="12" fill="white" />

      {/* Header stripe */}
      <rect width="340" height="90" rx="0" fill="#1a2f6b" />
      <rect width="340" height="90" rx="12" fill="#1a2f6b" />
      <rect x="0" y="78" width="340" height="12" fill="#1a2f6b" />

      {/* Avatar circle */}
      <circle cx="50" cy="50" r="26" fill="#3b82f6" opacity="0.4" />
      <circle cx="50" cy="46" r="10" fill="white" opacity="0.7" />
      <ellipse cx="50" cy="62" rx="15" ry="8" fill="white" opacity="0.5" />

      {/* Name text lines */}
      <rect x="84" y="28" width="120" height="8" rx="4" fill="white" opacity="0.9" />
      <rect x="84" y="44" width="80" height="5" rx="3" fill="white" opacity="0.5" />
      <rect x="84" y="56" width="140" height="4" rx="2" fill="white" opacity="0.35" />
      <rect x="84" y="66" width="100" height="4" rx="2" fill="white" opacity="0.35" />

      {/* Section: About */}
      <rect x="20" y="105" width="60" height="5" rx="2" fill="#1a2f6b" opacity="0.7" />
      <rect x="20" y="116" width="300" height="3" rx="2" fill="#94a3b8" opacity="0.5" />
      <rect x="20" y="123" width="280" height="3" rx="2" fill="#94a3b8" opacity="0.4" />
      <rect x="20" y="130" width="240" height="3" rx="2" fill="#94a3b8" opacity="0.35" />

      {/* Section: Experience */}
      <rect x="20" y="148" width="80" height="5" rx="2" fill="#1a2f6b" opacity="0.7" />
      <rect x="20" y="160" width="200" height="4" rx="2" fill="#3b82f6" opacity="0.6" />
      <rect x="20" y="168" width="140" height="3" rx="2" fill="#94a3b8" opacity="0.4" />
      <rect x="20" y="175" width="300" height="3" rx="2" fill="#94a3b8" opacity="0.3" />
      <rect x="20" y="182" width="260" height="3" rx="2" fill="#94a3b8" opacity="0.25" />

      <rect x="20" y="194" width="180" height="4" rx="2" fill="#3b82f6" opacity="0.5" />
      <rect x="20" y="202" width="120" height="3" rx="2" fill="#94a3b8" opacity="0.4" />
      <rect x="20" y="209" width="300" height="3" rx="2" fill="#94a3b8" opacity="0.3" />
      <rect x="20" y="216" width="220" height="3" rx="2" fill="#94a3b8" opacity="0.25" />

      {/* Section: Education */}
      <rect x="20" y="234" width="70" height="5" rx="2" fill="#1a2f6b" opacity="0.7" />
      <rect x="20" y="246" width="220" height="4" rx="2" fill="#3b82f6" opacity="0.5" />
      <rect x="20" y="254" width="150" height="3" rx="2" fill="#94a3b8" opacity="0.4" />
      <rect x="250" y="244" width="70" height="5" rx="3" fill="#dbeafe" />
      <rect x="258" y="247" width="54" height="2" rx="1" fill="#1a2f6b" opacity="0.5" />

      {/* Section: Skills */}
      <rect x="20" y="272" width="50" height="5" rx="2" fill="#1a2f6b" opacity="0.7" />
      {/* skill chips */}
      {[
        [20, 285, 55], [82, 285, 65], [154, 285, 50], [211, 285, 60], [278, 285, 42],
        [20, 300, 70], [97, 300, 55], [159, 300, 45],
      ].map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={12} rx={6} fill="#eff6ff" />
          <rect x={x + 6} y={y + 4} width={w - 12} height={4} rx={2} fill="#3b82f6" opacity="0.5" />
        </g>
      ))}

      {/* Section: Courses */}
      <rect x="20" y="322" width="90" height="5" rx="2" fill="#1a2f6b" opacity="0.7" />
      <rect x="20" y="334" width="300" height="3" rx="2" fill="#94a3b8" opacity="0.3" />
      <rect x="20" y="341" width="250" height="3" rx="2" fill="#94a3b8" opacity="0.25" />
      <rect x="20" y="348" width="270" height="3" rx="2" fill="#94a3b8" opacity="0.2" />

      {/* Blue accent bar */}
      <rect x="0" y="0" width="5" height="480" fill="#3b82f6" opacity="0.6" rx="3" />
    </svg>
  );
}
