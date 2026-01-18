import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { HomeAboutSection } from '@/components/HomeAboutSection';
import { Footer } from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HomeAboutSection />
      <Footer />
    </div>
  );
};

export default Home;
