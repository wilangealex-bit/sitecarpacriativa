import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Portfolio from '../components/Portfolio';
import Reviews from '../components/Reviews';
import Catalog from '../components/Catalog';
import Footer from '../components/Footer';
import FloatingButtons from '../components/FloatingButtons';

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      <Hero />
      <Portfolio />
      <Reviews />
      <Catalog />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
