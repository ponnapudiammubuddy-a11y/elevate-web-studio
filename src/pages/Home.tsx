import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { HighlightsSection } from '@/components/HighlightsSection';
import { Footer } from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HighlightsSection />
      <Footer />
    </div>
  );
};

export default Home;
