import { ArrowRight, Sparkles, Monitor, Smartphone, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

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

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
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
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
              I design, redesign, and develop professional websites tailored exactly to client needs. 
              I clearly understand requirements, solve every doubt, and deliver modern, high-quality 
              websites that build trust and real business results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-600">
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
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/30 animate-fade-in-up animation-delay-1000">
              <div className="text-center lg:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">50+</div>
                <div className="text-sm text-muted-foreground mt-1">Projects Completed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">100%</div>
                <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold gradient-text">15+</div>
                <div className="text-sm text-muted-foreground mt-1">Technologies Used</div>
              </div>
            </div>
          </div>

          {/* Right Side - Device Mockup / Abstract Illustration */}
          <div className="hidden lg:flex items-center justify-center animate-fade-in-up animation-delay-600">
            <div className="relative">
              {/* Glowing backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/40 via-purple-500/40 to-cyan-500/40 rounded-3xl blur-3xl scale-110" />
              
              {/* Main device frame */}
              <div className="relative glass-card rounded-3xl p-6 border border-white/10">
                {/* Browser mockup */}
                <div className="w-[400px] h-[280px] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden border border-white/5">
                  {/* Browser header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="h-5 bg-slate-700/50 rounded-full w-48 mx-auto" />
                    </div>
                  </div>
                  
                  {/* Content preview */}
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-full" />
                    <div className="h-3 bg-white/10 rounded w-5/6" />
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg" />
                      <div className="h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg" />
                      <div className="h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg" />
                    </div>
                    <div className="flex gap-2 mt-4">
                      <div className="h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-24" />
                      <div className="h-8 border border-white/20 rounded-full w-24" />
                    </div>
                  </div>
                </div>
                
                {/* Floating icons around device */}
                <div className="absolute -top-4 -right-4 w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30 animate-float">
                  <Monitor className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-float animation-delay-1000">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-1/2 -right-6 w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/30 animate-float animation-delay-2000">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
              </div>
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
