import { Sparkles } from 'lucide-react';

export const AboutHeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg-animated opacity-90" />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Get to Know Us</span>
        </div>
        
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          About{' '}
          <span className="gradient-text">THAHASEEN WEB</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
          We are a passionate team dedicated to crafting premium web experiences that elevate businesses. 
          With expertise in design, development, and strategy, we transform your vision into stunning digital reality.
        </p>
        
        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">50+</div>
            <div className="text-sm text-muted-foreground">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">5+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
