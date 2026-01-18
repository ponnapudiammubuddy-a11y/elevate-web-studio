-- Create SEO settings table for page-level SEO management
CREATE TABLE public.seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_slug TEXT NOT NULL UNIQUE,
  page_name TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  primary_keyword TEXT,
  secondary_keywords TEXT[],
  canonical_url TEXT,
  og_title TEXT,
  og_description TEXT,
  og_image TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image TEXT,
  schema_type TEXT DEFAULT 'WebPage',
  schema_data JSONB,
  no_index BOOLEAN DEFAULT false,
  no_follow BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create global SEO settings table
CREATE TABLE public.global_seo_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT DEFAULT 'AquaHue Web',
  site_description TEXT,
  default_og_image TEXT,
  google_analytics_id TEXT,
  google_search_console_verification TEXT,
  robots_txt_content TEXT DEFAULT 'User-agent: *
Allow: /',
  business_schema JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create sitemap entries table
CREATE TABLE public.sitemap_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  page_type TEXT DEFAULT 'page',
  priority DECIMAL(2,1) DEFAULT 0.5,
  changefreq TEXT DEFAULT 'weekly',
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT now(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sitemap_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (SEO data needs to be readable)
CREATE POLICY "SEO settings are publicly readable" 
ON public.seo_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Global SEO settings are publicly readable" 
ON public.global_seo_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Sitemap entries are publicly readable" 
ON public.sitemap_entries 
FOR SELECT 
USING (true);

-- Create policies for authenticated admin access
CREATE POLICY "Authenticated users can manage SEO settings" 
ON public.seo_settings 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage global SEO settings" 
ON public.global_seo_settings 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage sitemap entries" 
ON public.sitemap_entries 
FOR ALL 
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_seo_settings_updated_at
BEFORE UPDATE ON public.seo_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_global_seo_settings_updated_at
BEFORE UPDATE ON public.global_seo_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default global SEO settings
INSERT INTO public.global_seo_settings (
  site_name,
  site_description,
  robots_txt_content,
  business_schema
) VALUES (
  'AquaHue Web',
  'Professional Web Design & Development Services',
  'User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /

Sitemap: https://aqua-hue-web.lovable.app/sitemap.xml',
  '{
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "AquaHue Web",
    "description": "Professional Web Design & Development Services",
    "telephone": "+917995983560",
    "url": "https://aqua-hue-web.lovable.app"
  }'::jsonb
);

-- Insert default SEO settings for each page
INSERT INTO public.seo_settings (page_slug, page_name, meta_title, meta_description, primary_keyword, secondary_keywords, schema_type) VALUES
('/', 'Home', 'AquaHue Web | Professional Web Design & Development', 'Transform your vision into stunning digital experiences. Custom web design, development, and SEO services to grow your business online.', 'web design', ARRAY['web development', 'custom websites', 'digital solutions'], 'WebSite'),
('/about', 'About', 'About Us | AquaHue Web', 'Learn about our journey, expertise, and passion for creating exceptional web experiences that drive results.', 'web design agency', ARRAY['about us', 'our team', 'web experts'], 'AboutPage'),
('/services', 'Services', 'Our Services | AquaHue Web', 'Comprehensive web design, development, SEO, and digital marketing services tailored to your business needs.', 'web services', ARRAY['web design services', 'development services', 'SEO services'], 'Service'),
('/portfolio', 'Portfolio', 'Our Portfolio | AquaHue Web', 'Explore our collection of successful web projects and see how we transform ideas into powerful digital solutions.', 'web portfolio', ARRAY['web design portfolio', 'our work', 'case studies'], 'CollectionPage'),
('/contact', 'Contact', 'Contact Us | AquaHue Web', 'Get in touch with us to discuss your project. We are here to help you build your dream website.', 'contact web designer', ARRAY['get in touch', 'contact us', 'hire web developer'], 'ContactPage');

-- Insert sitemap entries
INSERT INTO public.sitemap_entries (url, page_type, priority, changefreq) VALUES
('/', 'page', 1.0, 'weekly'),
('/about', 'page', 0.8, 'monthly'),
('/services', 'page', 0.9, 'monthly'),
('/portfolio', 'page', 0.8, 'weekly'),
('/contact', 'page', 0.7, 'monthly');