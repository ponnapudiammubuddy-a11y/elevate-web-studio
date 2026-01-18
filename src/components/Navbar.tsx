import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { GetStartedModal } from './GetStartedModal';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass-card py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center font-display font-bold text-white text-lg">
              T
            </div>
            <span className="font-display font-bold text-xl text-foreground group-hover:text-primary transition-colors">
              THAHASEEN<span className="gradient-text"> WEB</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 relative ${
                  location.pathname === item.href
                    ? 'text-primary nav-link-active'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden lg:block btn-gradient text-sm py-2.5 px-6 hover:scale-105 active:scale-95 transition-transform duration-200"
          >
            Get Started
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg glass-card"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 glass-card transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  location.pathname === item.href
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="btn-gradient text-center mt-2 hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Get Started Modal */}
      <GetStartedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};
