import '../styles/globals.css';
import { generateCSSVariables } from '../lib/theme';
import portfolioData from '../data/portfolio.json';
import Navbar from '../components/layout/Navbar';   // adjust path if needed
import Footer from '../components/layout/Footer';   // adjust path if needed

export const metadata = {
  title: portfolioData.meta.siteTitle,
  description: portfolioData.meta.siteDescription,
};

export default function RootLayout({ children }) {
  const cssVars = generateCSSVariables(portfolioData.theme);
  const { nav, hero, competencies, publications, gallery, contact, meta } = portfolioData;

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href={portfolioData.theme.fontImport} rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
      </head>
      <body>
        {/* <Navbar data={portfolioData.nav} /> */}
        {children}
        <Footer data={portfolioData.footer} logo={nav.logo} email={contact.email} />
      </body>
    </html>
  );
}