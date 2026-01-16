import { CheckCircle, Users, Zap, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Complete Web Solutions',
    description: 'End-to-end web services from design to deployment',
  },
  {
    icon: Users,
    title: 'Client-First Approach',
    description: 'Your vision and goals drive every decision we make',
  },
  {
    icon: Shield,
    title: 'Clear Communication',
    description: 'Transparent updates and responsive support throughout',
  },
  {
    icon: CheckCircle,
    title: 'Full Doubt-Solving',
    description: 'Every question answered, every concern addressed',
  },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              About THAHASEEN WEB
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Professional{' '}
              <span className="gradient-text">Web Solutions</span>{' '}
              That Drive Results
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              THAHASEEN WEB is a professional, client-first web solutions brand dedicated to 
              transforming your digital presence. We combine technical expertise with creative 
              vision to deliver websites that not only look stunning but also perform exceptionally.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our approach is simple: understand your business, anticipate your needs, and exceed 
              your expectations. From initial consultation to final delivery, we ensure every step 
              is smooth, transparent, and focused on achieving your goals.
            </p>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative">
            <div className="gradient-border p-8 rounded-2xl">
              <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-2xl gradient-bg flex items-center justify-center glow">
                    <span className="font-display font-bold text-4xl text-white">T</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-2">THAHASEEN WEB</h3>
                  <p className="text-muted-foreground">Web Design & Development</p>
                  
                  {/* Animated Stats */}
                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                      <span className="text-sm font-semibold text-primary">100%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-full gradient-bg animate-pulse" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">On-Time Delivery</span>
                      <span className="text-sm font-semibold text-secondary">98%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-[98%] bg-secondary" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Project Success</span>
                      <span className="text-sm font-semibold text-accent">100%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full w-full bg-accent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl gradient-bg opacity-20 animate-float" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-accent/20 animate-float animation-delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};
