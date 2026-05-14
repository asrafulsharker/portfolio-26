# Asraful Sharker — Portfolio (Next.js)

A fully dynamic, JSON-driven portfolio built with Next.js 14 (App Router).  
**Change one JSON file → entire site updates — content AND styling.**

---

## 🚀 Quick Start

```bash
npm install
npm run dev
# Visit http://localhost:3000
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js         ← Injects CSS variables from JSON theme
│   └── page.js           ← Assembles all sections
├── components/
│   ├── layout/
│   │   ├── Navbar.js / .module.css
│   │   └── Footer.js / .module.css
│   └── sections/
│       ├── Hero.js / .module.css
│       ├── Competencies.js / .module.css
│       ├── Publications.js / .module.css
│       ├── Gallery.js / .module.css
│       └── Contact.js / .module.css
├── data/
│   └── portfolio.json    ← ⭐ SINGLE SOURCE OF TRUTH
├── lib/
│   └── theme.js          ← Converts JSON theme → CSS variables
└── styles/
    └── globals.css       ← Base reset + animation helpers
```

---

## 🎨 How to Customize

### Everything is in `src/data/portfolio.json`:

| Section | What you can change |
|---|---|
| `meta` | Site title, description |
| `theme.colors` | All colors site-wide |
| `theme.fonts` | Font families (heading/body/mono) |
| `theme.fontImport` | Google Fonts URL |
| `theme.borderRadius` | All rounding values |
| `theme.shadows` | Card/nav shadows |
| `nav` | Logo text, links, icons |
| `hero` | Badge, title lines, description, CTA buttons |
| `competencies` | Cards (Research, Stack, Publications, Projects) |
| `publications` | Paper cards with type/year/links |
| `gallery` | Visual items with SVG patterns |
| `contact` | Email, social links |

### Example — Change brand color:
```json
"theme": {
  "colors": {
    "primary": "#7c3aed",       ← was blue, now purple
    "primaryLight": "#8b5cf6",  ← accent shade
    ...
  }
}
```
That one change updates: navbar logo, active link, hero title, card titles, badges, buttons, publication links, footer — everything.

### Example — Add a navigation link:
```json
"nav": {
  "links": [
    { "label": "Blog", "href": "#blog" }
  ]
}
```

### Example — Add a publication:
```json
"publications": {
  "items": [
    {
      "id": "pub3",
      "type": "Workshop",
      "year": "2024",
      "title": "Your Paper Title",
      "description": "Brief description here.",
      "links": [
        { "label": "PDF", "href": "/papers/pub3.pdf", "icon": "download" }
      ]
    }
  ]
}
```

---

## 🛠 Tech Stack

- **Next.js 14** (App Router, Server Components)
- **CSS Modules** (zero runtime CSS-in-JS)
- **JSON-driven theming** via CSS custom properties
- **No external UI libraries** — fully custom

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout |
|---|---|
| `> 900px` | Full desktop — 2-col hero, grids |
| `480–900px` | Tablet — single column, hidden CV |
| `< 480px` | Mobile — stacked, full-width buttons |

---

## ➕ Adding New Sections

1. Add your data to `portfolio.json`
2. Create `src/components/sections/MySection.js` + `.module.css`
3. Import and add `<MySection data={myData} />` in `page.js`

All colors/fonts/radii are available via CSS variables automatically.
