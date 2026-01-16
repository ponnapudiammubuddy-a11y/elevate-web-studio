import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    category: 'E-Commerce',
    description: 'A modern e-commerce platform with seamless checkout and inventory management.',
    color: 'from-primary to-secondary',
  },
  {
    id: 2,
    title: 'Corporate Website',
    category: 'Business',
    description: 'Professional corporate website with clean design and optimized performance.',
    color: 'from-secondary to-accent',
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    category: 'Web App',
    description: 'Intuitive SaaS dashboard with real-time analytics and user management.',
    color: 'from-accent to-primary',
  },
  {
    id: 4,
    title: 'Restaurant Website',
    category: 'Business',
    description: 'Elegant restaurant website with online ordering and reservation system.',
    color: 'from-primary via-secondary to-accent',
  },
  {
    id: 5,
    title: 'Portfolio Website',
    category: 'Personal',
    description: 'Creative portfolio showcasing work with stunning animations.',
    color: 'from-secondary via-accent to-primary',
  },
  {
    id: 6,
    title: 'Real Estate Platform',
    category: 'Business',
    description: 'Property listing platform with advanced search and virtual tours.',
    color: 'from-accent via-primary to-secondary',
  },
];

export const PortfolioSection = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
            Portfolio
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Featured{' '}
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Explore our recent work and see how we've helped businesses 
            establish their digital presence.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer relative aspect-[4/3] rounded-2xl overflow-hidden gradient-border"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              
              {/* Pattern Overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-50" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <span className="text-xs font-medium text-white/80 uppercase tracking-wider mb-2">
                  {project.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:translate-y-0 translate-y-2 transition-transform">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm text-white/80">View Project</span>
                  <ExternalLink className="w-4 h-4 text-white/80" />
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/90 backdrop-blur-xl animate-fade-in" />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-4xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute -top-12 right-0 p-2 rounded-full glass-card hover:bg-muted transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="gradient-border rounded-3xl overflow-hidden">
              {/* Project Image */}
              <div className={`aspect-video bg-gradient-to-br ${selectedProject.color} relative`}>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="font-display font-bold text-3xl">{selectedProject.title.charAt(0)}</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold">{selectedProject.title}</h3>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 bg-card">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {selectedProject.category}
                </span>
                <h3 className="font-display text-2xl font-bold mb-4">{selectedProject.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {selectedProject.description}
                </p>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="btn-gradient"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
