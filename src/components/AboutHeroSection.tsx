import { Sparkles, Zap, Users, MessageCircle, CheckCircle } from 'lucide-react';

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

const stats = [
  { label: "Client Satisfaction", value: 100 },
  { label: "On-Time Delivery", value: 98 },
  { label: "Project Success", value: 100 }
];

export const AboutHeroSection = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg-animated opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              Professional{' '}
              <span className="gradient-text">Web Solutions</span>
              <br />
              That Drive Results
            </h1>
            
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
          
          {/* Right - Stats Card */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-white/10 backdrop-blur-xl">
              {/* Gradient glow effect */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-cyan-500/20 blur-sm -z-10" />
              
              {/* Logo/Avatar */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                  <span className="text-4xl font-bold text-white">T</span>
                </div>
                <h3 className="text-2xl font-bold text-foreground">THAHASEEN WEB</h3>
                <p className="text-muted-foreground">Web Design & Development</p>
              </div>
              
              {/* Stats with progress bars */}
              <div className="space-y-5">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{stat.label}</span>
                      <span className="text-sm font-semibold text-cyan-400">{stat.value}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-700/50 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-primary via-purple-500 to-cyan-500 transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${stat.value}%`,
                          animationDelay: `${0.5 + index * 0.2}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
