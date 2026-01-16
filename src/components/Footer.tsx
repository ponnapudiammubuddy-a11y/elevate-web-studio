import { Link } from 'react-router-dom';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center font-display font-bold text-white text-lg">
              T
            </div>
            <span className="font-display font-bold text-xl">
              THAHASEEN<span className="gradient-text"> WEB</span>
            </span>
          </Link>

          {/* Quick Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} THAHASEEN WEB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
