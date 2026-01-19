import { ArrowRight, Sparkles, Code, Palette, Layers, Zap, Globe, Monitor } from 'lucide-react';
import { Link } from 'react-router-dom';
import { trackCTAClick } from '@/lib/analytics';

export const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg-animated"
    >
      {/* Enhanced Floating Shapes */}
      <div className="floating-shape w-96 h-96 bg-primary top-20 -left-48 animation-delay-200" />
      <div className="floating-shape w-[500px] h-[500px] bg-secondary bottom-20 -right-64 animation-delay-1000" />
      <div className="floating-shape w-72 h-72 bg-accent top-1/2 left-1/3 animation-delay-2000" />
      
      {/* Extra gradient blobs for depth */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-40" />

      {/* Floating Animated Icons - Left Side */}
      <div className="hidden lg:block absolute left-[8%] top-[20%] animate-float">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md shadow-blue-500/30">
          <Code className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="hidden lg:block absolute left-[5%] top-[50%] animate-float animation-delay-1000">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/30">
          <Palette className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="hidden lg:block absolute left-[12%] bottom-[25%] animate-float animation-delay-2000">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-md shadow-cyan-500/30">
          <Layers className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Floating Animated Icons - Right Side */}
      <div className="hidden lg:block absolute right-[8%] top-[25%] animate-float animation-delay-600">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30">
          <Zap className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="hidden lg:block absolute right-[5%] top-[55%] animate-float animation-delay-1500">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-md shadow-emerald-500/30">
          <Globe className="w-4 h-4 text-white" />
        </div>
      </div>
      <div className="hidden lg:block absolute right-[10%] bottom-[30%] animate-float animation-delay-800">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-md shadow-indigo-500/30">
          <Monitor className="w-4 h-4 text-white" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          
          {/* Main Heading */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 animate-fade-in-up animation-delay-200">
            Professional{' '}
            <span className="gradient-text">Web Developer</span>{' '}
            Building Websites That Grow Your Business
          </h1>

          {/* Sub-text */}
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-3 leading-relaxed animate-fade-in-up animation-delay-400">
            I specialize in website design and development, creating custom solutions that convert visitors into customers. 
            From landing pages and business websites to portfolio websites, every project is crafted with precision and purpose.
          </p>
          
          <p className="text-sm md:text-base text-muted-foreground/80 max-w-lg mx-auto mb-8 animate-fade-in-up animation-delay-500">
            Based in India, delivering modern, responsive websites with clean code and stunning designs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
            <Link
              to="/portfolio"
              className="btn-gradient flex items-center gap-2 group"
              onClick={() => trackCTAClick('view_my_work', 'hero_section', '/portfolio')}
            >
              View My Work
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="btn-outline-gradient flex items-center gap-2"
              onClick={() => trackCTAClick('get_your_website', 'hero_section', '/contact')}
            >
              Get Your Website
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10 pt-6 border-t border-border/30 max-w-xl mx-auto animate-fade-in-up animation-delay-1000">
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text">10+</div>
              <div className="text-xs text-muted-foreground mt-1">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text">100%</div>
              <div className="text-xs text-muted-foreground mt-1">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text">15+</div>
              <div className="text-xs text-muted-foreground mt-1">Technologies Used</div>
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
