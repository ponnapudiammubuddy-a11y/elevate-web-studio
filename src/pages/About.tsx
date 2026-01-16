import { Navbar } from '@/components/Navbar';
import { AboutSection } from '@/components/AboutSection';
import { ProcessSection } from '@/components/ProcessSection';
import { OffersSection } from '@/components/OffersSection';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <AboutSection />
        <ProcessSection />
        <OffersSection />
      </div>
      <Footer />
    </div>
  );
};

export default About;
