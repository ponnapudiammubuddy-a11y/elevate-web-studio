import { useSEO } from '@/hooks/useSEO';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  pageSlug?: string;
}

export const SEOHead = ({ pageSlug }: SEOHeadProps) => {
  const location = useLocation();
  const slug = pageSlug || location.pathname;
  
  // This hook handles all the SEO meta tag updates
  useSEO(slug);
  
  return null; // This component only handles side effects
};
