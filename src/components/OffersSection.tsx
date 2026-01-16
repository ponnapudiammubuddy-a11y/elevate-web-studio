import { Gift, Lightbulb, Search, Zap, Wallet } from 'lucide-react';

const offers = [
  {
    icon: Gift,
    title: 'Free Website Consultation',
    description: 'Get expert advice on your web project at no cost.',
  },
  {
    icon: Lightbulb,
    title: 'Free UI/UX Suggestions',
    description: 'Receive professional design recommendations for your site.',
  },
  {
    icon: Search,
    title: 'Free Website Audit',
    description: 'Comprehensive analysis for re-design clients.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery Options',
    description: 'Get your website live in record time.',
  },
  {
    icon: Wallet,
    title: 'Affordable Startup Pricing',
    description: 'Special rates for startups and small businesses.',
  },
];

export const OffersSection = () => {
  return (
    <section id="offers" className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg-animated opacity-30" />
      <div className="absolute inset-0 bg-background/80" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            Special Offers
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Exclusive{' '}
            <span className="gradient-text">Benefits</span>{' '}
            for You
          </h2>
          <p className="text-muted-foreground text-lg">
            We believe in delivering extra value. Take advantage of these special 
            offers to kickstart your web project.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {offers.map((offer, index) => (
            <div
              key={offer.title}
              className={`group glass-card p-6 rounded-2xl relative overflow-hidden hover:scale-[1.02] transition-all duration-300 ${
                index === offers.length - 1 && offers.length % 3 === 2
                  ? 'lg:col-start-2'
                  : ''
              }`}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-primary via-secondary to-accent opacity-50 group-hover:opacity-100 transition-opacity -z-10" />
              <div className="absolute inset-[1px] rounded-[calc(1rem-1px)] bg-card -z-10" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <offer.icon className="w-6 h-6 text-accent" />
              </div>

              {/* Content */}
              <h3 className="font-display text-lg font-semibold mb-2 group-hover:gradient-text transition-all">
                {offer.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {offer.description}
              </p>

              {/* Glow Effect */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
