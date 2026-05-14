import portfolioData from '../data/portfolio.json';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Competencies from '../components/sections/Competencies';
import Publications from '../components/sections/Publications';
import Gallery from '../components/sections/Gallery';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';

export default function Home() {
  const { nav, hero, competencies, publications, gallery, contact, meta } = portfolioData;

  return (
    <>
      <Navbar data={nav} />
      <main>
        <Hero data={hero} />
        <Competencies data={competencies} />
        <Publications data={publications} />
        <Gallery data={gallery} />
        <Contact data={contact} />
      </main>
      {/* <Footer logo={nav.logo} email={contact.email} /> */}
    </>
  );
}
