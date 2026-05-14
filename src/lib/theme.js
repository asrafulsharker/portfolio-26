/**
 * Generates a CSS variable string from the theme config object.
 * All theme values in portfolio.json flow through here — change JSON, change the whole site.
 */
export function generateCSSVariables(theme) {
  const lines = [];

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
    lines.push(`  --color-${cssKey}: ${value};`);
  });

  // Fonts
  Object.entries(theme.fonts).forEach(([key, value]) => {
    lines.push(`  --font-${key}: ${value};`);
  });

  // Border radius
  Object.entries(theme.borderRadius).forEach(([key, value]) => {
    lines.push(`  --radius-${key}: ${value};`);
  });

  // Shadows
  Object.entries(theme.shadows).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
    lines.push(`  --shadow-${cssKey}: ${value};`);
  });

  // Spacing
  Object.entries(theme.spacing).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
    lines.push(`  --spacing-${cssKey}: ${value};`);
  });

  return `:root {\n${lines.join('\n')}\n}`;
}
