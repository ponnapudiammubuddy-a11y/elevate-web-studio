import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useEffect } from 'react';
import type { Json } from '@/integrations/supabase/types';

export interface SEOSettings {
  id: string;
  page_slug: string;
  page_name: string;
  meta_title: string | null;
  meta_description: string | null;
  primary_keyword: string | null;
  secondary_keywords: string[] | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image: string | null;
  schema_type: string | null;
  schema_data: Json | null;
  no_index: boolean | null;
  no_follow: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface GlobalSEOSettings {
  id: string;
  site_name: string | null;
  site_description: string | null;
  default_og_image: string | null;
  google_analytics_id: string | null;
  google_search_console_verification: string | null;
  robots_txt_content: string | null;
  business_schema: Json | null;
  created_at: string;
  updated_at: string;
}

export interface SitemapEntry {
  id: string;
  url: string;
  page_type: string | null;
  priority: number | null;
  changefreq: string | null;
  last_modified: string | null;
  is_active: boolean | null;
  created_at: string;
}

// Hook to fetch and apply SEO settings for a specific page
export const useSEO = (pageSlug: string) => {
  const { data: seoSettings, isLoading } = useQuery({
    queryKey: ['seo-settings', pageSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .eq('page_slug', pageSlug)
        .maybeSingle();
      
      if (error) throw error;
      return data as SEOSettings | null;
    },
  });

  const { data: globalSettings } = useQuery({
    queryKey: ['global-seo-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('global_seo_settings')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data as GlobalSEOSettings | null;
    },
  });

  // Apply SEO meta tags to the document head
  useEffect(() => {
    if (seoSettings || globalSettings) {
      // Update document title
      if (seoSettings?.meta_title) {
        document.title = seoSettings.meta_title;
      }

      // Update or create meta tags
      const updateMetaTag = (name: string, content: string | null, property = false) => {
        if (!content) return;
        
        const attr = property ? 'property' : 'name';
        let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
        
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attr, name);
          document.head.appendChild(meta);
        }
        meta.content = content;
      };

      // Standard meta tags
      updateMetaTag('description', seoSettings?.meta_description);
      updateMetaTag('keywords', [
        seoSettings?.primary_keyword,
        ...(seoSettings?.secondary_keywords || [])
      ].filter(Boolean).join(', '));

      // Open Graph tags
      updateMetaTag('og:title', seoSettings?.og_title || seoSettings?.meta_title, true);
      updateMetaTag('og:description', seoSettings?.og_description || seoSettings?.meta_description, true);
      updateMetaTag('og:image', seoSettings?.og_image || globalSettings?.default_og_image, true);
      updateMetaTag('og:type', 'website', true);

      // Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', seoSettings?.twitter_title || seoSettings?.meta_title);
      updateMetaTag('twitter:description', seoSettings?.twitter_description || seoSettings?.meta_description);
      updateMetaTag('twitter:image', seoSettings?.twitter_image || seoSettings?.og_image || globalSettings?.default_og_image);

      // Robots meta tag
      const robotsContent = [];
      if (seoSettings?.no_index) robotsContent.push('noindex');
      if (seoSettings?.no_follow) robotsContent.push('nofollow');
      if (robotsContent.length > 0) {
        updateMetaTag('robots', robotsContent.join(', '));
      }

      // Canonical URL
      if (seoSettings?.canonical_url) {
        let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'canonical';
          document.head.appendChild(link);
        }
        link.href = seoSettings.canonical_url;
      }

      // Google Search Console verification
      if (globalSettings?.google_search_console_verification) {
        updateMetaTag('google-site-verification', globalSettings.google_search_console_verification);
      }

      // Structured Data (JSON-LD)
      const existingSchema = document.querySelector('script[type="application/ld+json"]');
      if (existingSchema) {
        existingSchema.remove();
      }

      const schemaData = seoSettings?.schema_data || globalSettings?.business_schema;
      if (schemaData) {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
      }
    }
  }, [seoSettings, globalSettings]);

  return { seoSettings, globalSettings, isLoading };
};

// Hook for admin panel - fetch all SEO settings
export const useAllSEOSettings = () => {
  return useQuery({
    queryKey: ['all-seo-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('page_name');
      
      if (error) throw error;
      return data as SEOSettings[];
    },
  });
};

// Hook for admin panel - update SEO settings
export const useUpdateSEOSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settings: Partial<SEOSettings> & { id: string }) => {
      const updateData = { ...settings };
      const { data, error } = await supabase
        .from('seo_settings')
        .update(updateData as unknown as Record<string, unknown>)
        .eq('id', settings.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['all-seo-settings'] });
      queryClient.invalidateQueries({ queryKey: ['seo-settings'] });
    },
  });
};

// Hook for global SEO settings
export const useGlobalSEOSettings = () => {
  return useQuery({
    queryKey: ['global-seo-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('global_seo_settings')
        .select('*')
        .maybeSingle();
      
      if (error) throw error;
      return data as GlobalSEOSettings | null;
    },
  });
};

// Hook for updating global SEO settings
export const useUpdateGlobalSEOSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (settings: Partial<GlobalSEOSettings> & { id: string }) => {
      const updateData = { ...settings };
      const { data, error } = await supabase
        .from('global_seo_settings')
        .update(updateData as unknown as Record<string, unknown>)
        .eq('id', settings.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['global-seo-settings'] });
    },
  });
};

// Hook for sitemap entries
export const useSitemapEntries = () => {
  return useQuery({
    queryKey: ['sitemap-entries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sitemap_entries')
        .select('*')
        .eq('is_active', true)
        .order('priority', { ascending: false });
      
      if (error) throw error;
      return data as SitemapEntry[];
    },
  });
};

// Hook to update sitemap entry
export const useUpdateSitemapEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (entry: Partial<SitemapEntry> & { id: string }) => {
      const { data, error } = await supabase
        .from('sitemap_entries')
        .update(entry)
        .eq('id', entry.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sitemap-entries'] });
    },
  });
};
