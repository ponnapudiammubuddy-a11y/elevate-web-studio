import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HeroSubAbout = () => {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      {/* Glassmorphism container */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative p-8 md:p-10 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-slate-900/40 via-slate-800/30 to-slate-900/40 border border-white/10 shadow-2xl animate-fade-in"
            style={{ animationDelay: '0.1s' }}
          >
            {/* Subtle glow effect */}
            <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 blur-sm -z-10" />
            
            {/* Content */}
            <div className="text-center">
              <p 
                className="text-lg md:text-xl text-foreground leading-relaxed mb-4 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
              >
                I'm <span className="font-semibold gradient-text">Thahaseen</span>, a passionate web developer crafting premium digital experiences that convert visitors into customers.
              </p>
              
              <p 
                className="text-muted-foreground leading-relaxed mb-6 opacity-0 animate-fade-in"
                style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
              >
                From stunning designs to flawless functionality — I build websites that make your brand stand out.
              </p>
              
              {/* CTA Link */}
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 group opacity-0 animate-fade-in"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                <span>Learn more about my journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
