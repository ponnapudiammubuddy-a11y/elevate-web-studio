import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-bg-animated opacity-50" />
      
      {/* Floating Shapes */}
      <div className="floating-shape top-20 left-10 w-72 h-72 bg-primary" />
      <div className="floating-shape bottom-20 right-10 w-96 h-96 bg-secondary animation-delay-2000" />
      <div className="floating-shape top-1/2 left-1/2 w-64 h-64 bg-accent animation-delay-1000" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4">
        {/* 404 Number with Gradient */}
        <div className="mb-8 text-center">
          <h1 className="text-[150px] md:text-[200px] font-black leading-none gradient-text tracking-tight">
            404
          </h1>
        </div>

        {/* Glass Card */}
        <div className="glass-card rounded-2xl p-8 md:p-12 max-w-lg text-center glow">
          <div className="mb-6">
            <Search className="w-16 h-16 mx-auto text-muted-foreground opacity-50" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="btn-gradient border-0"
              size="lg"
            >
              <Link to="/">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Link>
            </Button>
            
            <Button
              asChild
              variant="outline"
              className="btn-outline-gradient"
              size="lg"
              onClick={() => window.history.back()}
            >
              <button type="button" onClick={() => window.history.back()}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Go Back
              </button>
            </Button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Or try these pages:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "Services", path: "/services" },
              { label: "Portfolio", path: "/portfolio" },
              { label: "About", path: "/about" },
              { label: "Contact", path: "/contact" },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-primary hover:text-accent transition-colors underline underline-offset-4"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
