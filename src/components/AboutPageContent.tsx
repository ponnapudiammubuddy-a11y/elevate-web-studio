import { useEffect, useState } from 'react';
import { 
  Code2, 
  Palette, 
  Rocket, 
  Target, 
  Award,
  Clock,
  MessageSquare,
  TrendingUp,
  Lightbulb,
  Handshake
} from 'lucide-react';
import statsCard from '@/assets/stats-card.png';

const skills = [
  { name: 'Frontend Development', level: 95 },
  { name: 'UI/UX Design', level: 90 },
  { name: 'Responsive Design', level: 98 },
  { name: 'Performance Optimization', level: 88 },
];

const workApproach = [
  {
    icon: Target,
    title: 'Goal-Oriented Strategy',
    description: 'Every project begins with understanding your business objectives, ensuring the final product drives real results.'
  },
  {
    icon: Lightbulb,
    title: 'Creative Problem Solving',
    description: 'I approach challenges with innovative thinking, finding elegant solutions that others might overlook.'
  },
  {
    icon: Clock,
    title: 'Reliable Delivery',
    description: 'Deadlines are sacred. I plan meticulously and communicate proactively to ensure on-time delivery every time.'
  },
  {
    icon: Handshake,
    title: 'Collaborative Partnership',
    description: 'Your input matters at every stage. I work alongside you, not just for you, creating true partnerships.'
  }
];

const values = [
  { icon: Award, label: 'Excellence', value: 'In Every Pixel' },
  { icon: TrendingUp, label: 'Growth', value: 'Focused Results' },
  { icon: MessageSquare, label: 'Communication', value: 'Always Clear' },
];

export const AboutPageContent = () => {
  const [animateProgress, setAnimateProgress] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimateProgress(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-bg-animated opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <div className="animate-fade-in">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-6">
                The Mind Behind THAHASEEN WEB
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                Transforming Ideas Into{' '}
                <span className="gradient-text">Digital Reality</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                With years of dedicated experience in web development, I've mastered the art of creating websites that don't just look beautiful — they perform exceptionally. My journey began with a simple belief: every business deserves a powerful online presence.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Today, I combine cutting-edge technologies with timeless design principles to deliver solutions that exceed expectations. Whether you're a startup seeking your first website or an established brand ready for a digital transformation, I bring the same passion and precision to every project.
              </p>
            </div>
            
            {/* Right - Stats Card Image */}
            <div className="flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-purple-500/40 to-cyan-500/40 blur-3xl scale-110 animate-glow-pulse" />
                <div className="absolute -top-4 -right-4 w-3 h-3 bg-primary/60 rounded-full animate-float-gentle" />
                <div className="absolute bottom-1/4 -right-8 w-4 h-4 bg-purple-400/50 rounded-full animate-float-gentle" style={{ animationDelay: '2s' }} />
                <img 
                  src={statsCard} 
                  alt="THAHASEEN WEB performance statistics" 
                  className="relative z-10 w-full max-w-md rounded-2xl shadow-2xl shadow-primary/30 transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Skills Progress */}
            <div 
              className="p-8 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 border border-white/10 shadow-2xl animate-fade-in"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-display font-bold">Technical Expertise</h3>
              </div>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm font-bold gradient-text">{skill.level}%</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-700/50 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
                        style={{ 
                          width: animateProgress ? `${skill.level}%` : '0%',
                          transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                          transitionDelay: `${0.2 + index * 0.15}s`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right content */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/30 text-secondary text-sm font-medium mb-6">
                Skills & Capabilities
              </span>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Built on a Foundation of{' '}
                <span className="gradient-text">Expertise</span>
              </h2>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                Years of hands-on experience have shaped my technical toolkit. I stay current with industry trends while maintaining deep expertise in proven technologies that deliver results.
              </p>
              
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Figma', 'Next.js'].map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 rounded-full bg-muted/50 border border-white/5 text-sm font-medium text-foreground hover:border-primary/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Approach Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-12 animate-fade-in">
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium mb-6">
              How I Work
            </span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              My <span className="gradient-text">Approach</span> to Every Project
            </h2>
            
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Success isn't accidental — it's the result of a refined process built on professionalism, clarity, and dedication to your vision.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {workApproach.map((item, index) => (
              <div 
                key={item.title}
                className="group p-6 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 border border-white/10 hover:border-primary/30 transition-all duration-300 hover:translate-y-[-4px] animate-fade-in"
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div 
              className="p-8 md:p-10 rounded-2xl backdrop-blur-xl bg-gradient-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 border border-white/10 shadow-2xl animate-fade-in"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  Core <span className="gradient-text">Values</span> That Drive Me
                </h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                {values.map((value, index) => (
                  <div 
                    key={value.label}
                    className="text-center p-6 rounded-xl bg-muted/20 border border-white/5 hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 mb-4">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{value.label}</h4>
                    <p className="text-sm text-muted-foreground">{value.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
