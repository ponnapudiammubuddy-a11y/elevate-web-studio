import { Sparkles, Zap, Users, MessageCircle, CheckCircle } from 'lucide-react';
import heroMockup from '@/assets/hero-mockup.png';

const features = [
  {
    icon: Zap,
    title: "Complete Web Solutions",
    description: "End-to-end web services from design to deployment"
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description: "Your vision and goals drive every decision we make"
  },
  {
    icon: MessageCircle,
    title: "Clear Communication",
    description: "Transparent updates and responsive support throughout"
  },
  {
    icon: CheckCircle,
    title: "Full Doubt-Solving",
    description: "Every question answered, every concern addressed"
  }
];

export const HomeAboutSection = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-slate-900/50 to-background" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 container mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">About THAHASEEN WEB</span>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Professional{' '}
              <span className="gradient-text">Web Solutions</span>
              <br />
              That Drive Results
            </h2>
            
            {/* Description paragraphs */}
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              THAHASEEN WEB is a professional, client-first web solutions brand dedicated to transforming your digital presence. We combine technical expertise with creative vision to deliver websites that not only look stunning but also perform exceptionally.
            </p>
            
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Our approach is simple: understand your business, anticipate your needs, and exceed your expectations. From initial consultation to final delivery, we ensure every step is smooth, transparent, and focused on achieving your goals.
            </p>
            
            {/* Feature Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="group p-4 rounded-xl glass-card border border-white/5 hover:border-primary/30 transition-all duration-300 hover:translate-y-[-2px]"
                  style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 group-hover:from-primary/30 group-hover:to-purple-500/30 transition-colors">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right - Device Mockup */}
          <div className="animate-fade-in flex items-center justify-center" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-purple-500/30 to-cyan-500/30 blur-3xl scale-110" />
              
              {/* Mockup image */}
              <img 
                src={heroMockup} 
                alt="Website mockup preview" 
                className="relative z-10 w-full max-w-lg rounded-2xl shadow-2xl shadow-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
