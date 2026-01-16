import { MessageSquare, PenTool, Code, CheckCircle, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    number: '01',
    title: 'Understanding Requirements',
    description: 'We start by deeply understanding your business, goals, and vision to ensure the final product aligns perfectly with your needs.',
  },
  {
    icon: PenTool,
    number: '02',
    title: 'Planning & UI/UX Design',
    description: 'Creating wireframes and stunning visual designs that capture your brand essence while ensuring optimal user experience.',
  },
  {
    icon: Code,
    number: '03',
    title: 'Development',
    description: 'Building your website with clean, efficient code using the latest technologies for performance and scalability.',
  },
  {
    icon: CheckCircle,
    number: '04',
    title: 'Review & Doubt Solving',
    description: 'Thorough testing and revisions, addressing every question and concern until you are completely satisfied.',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Final Delivery',
    description: 'Launching your website with all optimizations in place, ensuring a smooth handover and ongoing support.',
  },
];

export const ProcessSection = () => {
  return (
    <section id="process" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Our Process
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            How We{' '}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A streamlined, transparent process designed to deliver exceptional 
            results while keeping you informed every step of the way.
          </p>
        </div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Step Number & Icon */}
              <div className="relative z-10 shrink-0">
                <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center glow">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                {/* Connector Dot */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"
                  style={{ [index % 2 === 0 ? 'right' : 'left']: '-2rem' }}
                />
              </div>

              {/* Content Card */}
              <div className={`flex-1 gradient-border p-6 rounded-2xl md:max-w-[calc(50%-4rem)] ${
                index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'
              }`}>
                <span className="inline-block text-4xl font-display font-bold gradient-text opacity-50 mb-2">
                  {step.number}
                </span>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
