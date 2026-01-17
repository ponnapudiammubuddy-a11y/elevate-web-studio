import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Contact', href: '/contact' },
  ];

  const services = [
    'Website Design',
    'Website Re-Design',
    'Web Development',
    'E-Commerce Websites',
    'Custom-Coded Websites',
    'UI/UX Solutions',
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp' },
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0a0a1a] to-[#050510]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      
      {/* Main footer content */}
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center font-display font-bold text-white text-xl group-hover:scale-110 transition-transform duration-300">
                T
              </div>
              <span className="font-display font-bold text-2xl">
                THAHASEEN<span className="gradient-text"> WEB</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium web design & development solutions that elevate your business. 
              We create stunning, high-converting websites tailored to your unique needs.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="group/icon relative"
                >
                  {/* Gradient background circle */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center transition-all duration-300 group-hover/icon:shadow-lg group-hover/icon:shadow-primary/50 group-hover/icon:scale-110">
                    <social.icon className="w-5 h-5 text-white" />
                  </div>
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 blur-lg opacity-0 group-hover/icon:opacity-50 transition-opacity duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-5 text-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground hover:pl-2 transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-5 text-foreground">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-muted-foreground hover:text-foreground hover:pl-2 transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-5 text-foreground">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm">
                Ready to start your project? Let's create something amazing together.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Gradient divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8" />

        {/* Bottom copyright bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} <span className="gradient-text font-semibold">THAHASEEN WEB</span>. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with passion for excellence
          </p>
        </div>
      </div>
    </footer>
  );
};
