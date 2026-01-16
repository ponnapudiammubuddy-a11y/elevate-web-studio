import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg-animated"
    >
      {/* Floating Shapes */}
      <div className="floating-shape w-96 h-96 bg-primary top-20 -left-48 animation-delay-200" />
      <div className="floating-shape w-[500px] h-[500px] bg-secondary bottom-20 -right-64 animation-delay-1000" />
      <div className="floating-shape w-72 h-72 bg-accent top-1/2 left-1/3 animation-delay-2000" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              Web Design & Development
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up animation-delay-200">
            Premium Web Design &{' '}
            <span className="gradient-text">Development</span>{' '}
            That Elevates Your Business
          </h1>

          {/* Sub-text */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
            I design, redesign, and develop professional websites tailored exactly to client needs. 
            I clearly understand requirements, solve every doubt, and deliver modern, high-quality 
            websites that build trust and real business results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Link
              to="/portfolio"
              className="btn-gradient flex items-center gap-2 group"
            >
              View My Work
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="btn-outline-gradient flex items-center gap-2"
            >
              Get Your Website
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border/30 animate-fade-in-up animation-delay-1000">
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">50+</div>
              <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold gradient-text">15+</div>
              <div className="text-sm text-muted-foreground mt-1">Technologies Used</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
};
