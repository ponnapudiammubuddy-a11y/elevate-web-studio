import { Navbar } from '@/components/Navbar';
import { AboutPageContent } from '@/components/AboutPageContent';
import { Footer } from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <AboutPageContent />
      </div>
      <Footer />
    </div>
  );
};

export default About;
