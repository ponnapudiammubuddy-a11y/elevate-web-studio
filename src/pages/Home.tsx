import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { HeroSubAbout } from '@/components/HeroSubAbout';
import { Footer } from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HeroSubAbout />
      <Footer />
    </div>
  );
};

export default Home;
