import { Zap, Palette, Code, Headphones } from 'lucide-react';

const highlights = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Quick turnaround without compromising quality. Your website delivered on time, every time.',
  },
  {
    icon: Palette,
    title: 'Premium UI/UX',
    description: 'Stunning designs that captivate visitors and create memorable user experiences.',
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Tailored solutions built from scratch to match your unique business requirements.',
  },
  {
    icon: Headphones,
    title: 'Full Support',
    description: "Dedicated assistance from concept to launch and beyond. We're always here for you.",
  },
];

export const HighlightsSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Gradient border wrapper */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
              
              {/* Card content */}
              <div className="relative glass-card rounded-2xl p-6 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-primary/20">
                {/* Icon with gradient background */}
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
