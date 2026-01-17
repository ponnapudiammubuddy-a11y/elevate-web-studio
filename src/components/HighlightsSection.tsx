import { Zap, Palette, Code, Headphones } from 'lucide-react';

const highlights = [
  {
    icon: Zap,
    title: 'Fast Delivery',
    description: 'Modern websites delivered on time',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Palette,
    title: 'Premium UI/UX',
    description: 'Clean, modern & user-focused designs',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code,
    title: 'Custom Development',
    description: 'Websites built exactly to client needs',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Headphones,
    title: 'Full Support',
    description: 'Clear communication & doubt solving',
    color: 'from-pink-500 to-purple-500',
  },
];

export const HighlightsSection = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-background via-[#0a0a1a] to-background">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
            Why Choose <span className="gradient-text">THAHASEEN WEB</span>?
          </h2>
          <p className="text-muted-foreground">What makes us different</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="group relative"
              style={{ 
                animation: 'fade-in-up 0.6s ease-out forwards',
                animationDelay: `${index * 150}ms`,
                opacity: 0,
              }}
            >
              {/* Animated gradient border */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-40 group-hover:opacity-100 transition-all duration-500" />
              
              {/* Hover glow effect */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
              
              {/* Card content */}
              <div className="relative glass-card rounded-2xl p-6 h-full transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-2xl group-hover:shadow-primary/30 bg-[#0d0d1a]/90">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-cyan-400 transition-all duration-300">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Keyframes for slide-up animation */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};
