import { 
  Globe, 
  RefreshCw, 
  Code, 
  Layers, 
  ShoppingCart, 
  FileCode, 
  Smartphone, 
  Figma, 
  Palette 
} from 'lucide-react';

const services = [
  {
    icon: Layers,
    title: 'Complete Web Solutions',
    description: 'End-to-end web services covering everything from planning to launch and beyond.',
  },
  {
    icon: ShoppingCart,
    title: 'Business & E-Commerce',
    description: 'Powerful online stores and business websites that drive sales and growth.',
  },
  {
    icon: FileCode,
    title: 'Custom-Coded Websites',
    description: 'Hand-crafted code for unique, high-performance web experiences.',
  },
  {
    icon: Smartphone,
    title: 'Fully Responsive Design',
    description: 'Pixel-perfect experiences across all devices and screen sizes.',
  },
  {
    icon: Figma,
    title: 'Figma to Custom Design',
    description: 'Transform your Figma designs into fully functional websites.',
  },
  {
    icon: Globe,
    title: 'Website Design',
    description: 'Stunning visual designs that capture your brand essence.',
  },
  {
    icon: RefreshCw,
    title: 'Website Re-Design',
    description: 'Breathe new life into outdated websites with modern aesthetics.',
  },
  {
    icon: Code,
    title: 'Web Development',
    description: 'Robust, scalable development using cutting-edge technologies.',
  },
  {
    icon: Palette,
    title: 'Professional UI/UX',
    description: 'User-centered design that enhances engagement and conversions.',
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Our Services
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive{' '}
            <span className="gradient-text">Web Services</span>{' '}
            for Your Success
          </h2>
          <p className="text-muted-foreground text-lg">
            From concept to completion, we offer a full spectrum of web design and 
            development services to elevate your digital presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group relative gradient-border p-6 rounded-2xl hover:scale-[1.02] transition-all duration-300 glow-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
