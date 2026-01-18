import { useState } from 'react';
import { X, Sparkles, Send, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GetStartedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  'Website Design',
  'E-commerce Development',
  'Web Application',
  'Landing Page',
  'Website Redesign',
  'Custom Solution',
];

export const GetStartedModal = ({ isOpen, onClose }: GetStartedModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
  });
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_inquiries').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: `Service Request: ${formData.service}`,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: 'Request Submitted!',
        description: "We'll get back to you within 24 hours.",
      });

      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', service: '' });
      }, 2000);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipple({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setTimeout(() => setRipple(null), 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-[fade-in_0.3s_ease-out]" />

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 gradient-bg-animated opacity-30" />

      {/* Floating Shapes */}
      <div className="floating-shape top-10 left-10 w-48 h-48 bg-primary" />
      <div className="floating-shape bottom-10 right-10 w-64 h-64 bg-secondary animation-delay-1000" />
      <div className="floating-shape top-1/2 right-1/4 w-32 h-32 bg-accent animation-delay-2000" />

      {/* Modal Content */}
      <div
        className="relative w-full max-w-lg transform transition-all duration-500 animate-[scale-in_0.3s_ease-out,fade-in_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent opacity-50 blur-xl animate-[pulse-glow_3s_ease-in-out_infinite]" />

        {/* Card */}
        <div className="relative glass-card rounded-2xl p-8 md:p-10 glow overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full glass-card hover:bg-muted/50 transition-all duration-300 hover:scale-110 group"
          >
            <X className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
          </button>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-bg mb-4 animate-[float_3s_ease-in-out_infinite]">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="gradient-text">Start Your</span>
              <br />
              Professional Website
            </h2>
            <p className="text-muted-foreground text-lg">
              Transform your vision into a stunning digital experience. Let's build something amazing together.
            </p>
          </div>

          {/* Success State */}
          {isSuccess ? (
            <div className="text-center py-8 animate-[scale-in_0.4s_ease-out]">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
              <p className="text-muted-foreground">We'll reach out to you shortly.</p>
            </div>
          ) : (
            /* Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Your Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service" className="text-sm font-medium text-foreground">
                  Service Required
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => setFormData({ ...formData, service: value })}
                  required
                >
                  <SelectTrigger className="h-12 bg-muted/50 border-border/50 focus:border-primary focus:ring-primary/20 transition-all duration-300">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="glass-card border-border/50">
                    {services.map((service) => (
                      <SelectItem
                        key={service}
                        value={service}
                        className="focus:bg-primary/10 cursor-pointer"
                      >
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.service}
                onClick={handleButtonClick}
                className="relative w-full h-14 btn-gradient border-0 text-lg font-semibold overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Ripple Effect */}
                {ripple && (
                  <span
                    className="absolute rounded-full bg-white/30 animate-[scale-in_0.6s_ease-out]"
                    style={{
                      left: ripple.x,
                      top: ripple.y,
                      width: 200,
                      height: 200,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                )}

                {/* Shimmer Effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      Start My Project
                    </>
                  )}
                </span>
              </Button>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 pt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Free Consultation
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  24h Response
                </span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
