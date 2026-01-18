-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create social_links table
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon_name TEXT,
  display_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create contact_inquiries table
CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create page_content table for managing website sections
CREATE TABLE public.page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug TEXT NOT NULL,
  section_name TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}',
  is_enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(page_slug, section_name)
);

-- Create media_files table
CREATE TABLE public.media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  alt_text TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create activity_log table
CREATE TABLE public.activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin or editor
CREATE OR REPLACE FUNCTION public.is_admin_or_editor(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'editor')
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for social_links (public read, admin/editor write)
CREATE POLICY "Social links are publicly readable" ON public.social_links
  FOR SELECT USING (true);

CREATE POLICY "Admin/Editor can manage social links" ON public.social_links
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for contact_inquiries
CREATE POLICY "Anyone can submit inquiries" ON public.contact_inquiries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin/Editor can view inquiries" ON public.contact_inquiries
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/Editor can update inquiries" ON public.contact_inquiries
  FOR UPDATE USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin can delete inquiries" ON public.contact_inquiries
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for page_content
CREATE POLICY "Page content is publicly readable" ON public.page_content
  FOR SELECT USING (true);

CREATE POLICY "Admin/Editor can manage page content" ON public.page_content
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for media_files
CREATE POLICY "Media files are publicly readable" ON public.media_files
  FOR SELECT USING (true);

CREATE POLICY "Admin/Editor can manage media files" ON public.media_files
  FOR ALL USING (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for activity_log
CREATE POLICY "Admin/Editor can view activity log" ON public.activity_log
  FOR SELECT USING (public.is_admin_or_editor(auth.uid()));

CREATE POLICY "Admin/Editor can insert activity log" ON public.activity_log
  FOR INSERT WITH CHECK (public.is_admin_or_editor(auth.uid()));

-- RLS Policies for site_settings
CREATE POLICY "Site settings are publicly readable" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage site settings" ON public.site_settings
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_social_links_updated_at
  BEFORE UPDATE ON public.social_links
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_page_content_updated_at
  BEFORE UPDATE ON public.page_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default social links
INSERT INTO public.social_links (platform, url, icon_name, display_order, is_visible) VALUES
('WhatsApp', 'https://wa.me/917995983560', 'MessageCircle', 1, true),
('Instagram', 'https://instagram.com', 'Instagram', 2, true),
('Facebook', 'https://facebook.com', 'Facebook', 3, true),
('LinkedIn', 'https://linkedin.com', 'Linkedin', 4, true),
('GitHub', 'https://github.com', 'Github', 5, false),
('YouTube', 'https://youtube.com', 'Youtube', 6, false);

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value) VALUES
('general', '{"site_name": "AquaHue Web", "tagline": "Professional Web Design & Development", "logo_url": "", "favicon_url": "", "footer_text": "© 2024 AquaHue Web. All rights reserved."}'),
('contact', '{"email": "hello@aquahueweb.com", "phone": "+917995983560", "address": ""}');

-- Insert default page content
INSERT INTO public.page_content (page_slug, section_name, content, display_order) VALUES
('/', 'hero', '{"title": "Transform Your Vision Into Digital Reality", "subtitle": "Web Design & Development", "description": "We create stunning, high-performance websites that drive results for your business.", "cta_primary": "View My Work", "cta_secondary": "Get Your Website"}', 1),
('/', 'highlights', '{"title": "Why Choose Us", "items": []}', 2),
('/about', 'hero', '{"title": "About Us", "description": "Learn about our journey and passion for web development."}', 1),
('/services', 'hero', '{"title": "Our Services", "description": "Comprehensive web solutions tailored to your needs."}', 1),
('/portfolio', 'hero', '{"title": "Our Portfolio", "description": "Explore our collection of successful projects."}', 1),
('/contact', 'hero', '{"title": "Get In Touch", "description": "We would love to hear from you."}', 1);