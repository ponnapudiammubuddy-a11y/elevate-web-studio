import { Navbar } from '@/components/Navbar';
import { AboutHeroSection } from '@/components/AboutHeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ProcessSection } from '@/components/ProcessSection';
import { OffersSection } from '@/components/OffersSection';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <AboutHeroSection />
        <ProcessSection />
        <AboutSection />
        <OffersSection />
      </div>
      <Footer />
    </div>
  );
};

export default About;
