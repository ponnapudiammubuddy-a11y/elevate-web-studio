/**
 * Site configuration - Single source of truth for site URLs and branding
 */
export const siteConfig = {
  name: 'Thahaseen Web',
  url: 'https://www.thahaseenweb.site',
  ogImage: 'https://www.thahaseenweb.site/og-image.jpg',
  description: 'Professional freelance web developer offering custom website design, website development, and Vercel deployment.',
  author: 'Thahaseen Web',
  
  // Helper function to get full URL for a path
  getUrl: (path: string = '') => {
    const baseUrl = 'https://www.thahaseenweb.site';
    return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  },
  
  // Helper for sitemap URL
  sitemapUrl: 'https://www.thahaseenweb.site/sitemap.xml',
} as const;

export type SiteConfig = typeof siteConfig;
