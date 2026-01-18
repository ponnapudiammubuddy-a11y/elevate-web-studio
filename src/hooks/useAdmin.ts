import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Json } from '@/integrations/supabase/types';

// Types
export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'editor';
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon_name: string | null;
  display_order: number | null;
  is_visible: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean | null;
  created_at: string;
}

export interface PageContent {
  id: string;
  page_slug: string;
  section_name: string;
  content: Json;
  is_enabled: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface MediaFile {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  alt_text: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  details: Json | null;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: Json;
  updated_at: string;
}

// Hook to check user role
export const useUserRole = () => {
  return useQuery({
    queryKey: ['user-role'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data?.role as 'admin' | 'editor' | null;
    },
  });
};

// Social Links hooks
export const useSocialLinks = () => {
  return useQuery({
    queryKey: ['social-links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as SocialLink[];
    },
  });
};

export const useUpdateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: Partial<SocialLink> & { id: string }) => {
      const { data, error } = await supabase
        .from('social_links')
        .update(link)
        .eq('id', link.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-links'] });
    },
  });
};

export const useCreateSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (link: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('social_links')
        .insert(link)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-links'] });
    },
  });
};

export const useDeleteSocialLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('social_links')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['social-links'] });
    },
  });
};

// Contact Inquiries hooks
export const useContactInquiries = () => {
  return useQuery({
    queryKey: ['contact-inquiries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as ContactInquiry[];
    },
  });
};

export const useUpdateInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, is_read }: { id: string; is_read: boolean }) => {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .update({ is_read })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-inquiries'] });
    },
  });
};

export const useDeleteInquiry = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_inquiries')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact-inquiries'] });
    },
  });
};

// Page Content hooks
export const usePageContent = () => {
  return useQuery({
    queryKey: ['page-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_slug')
        .order('display_order');
      if (error) throw error;
      return data as PageContent[];
    },
  });
};

export const useUpdatePageContent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (content: Partial<PageContent> & { id: string }) => {
      const { data, error } = await supabase
        .from('page_content')
        .update(content)
        .eq('id', content.id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['page-content'] });
    },
  });
};

// Activity Log hooks
export const useActivityLog = () => {
  return useQuery({
    queryKey: ['activity-log'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data as ActivityLog[];
    },
  });
};

export const useLogActivity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (log: Omit<ActivityLog, 'id' | 'created_at'>) => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('activity_log')
        .insert({ ...log, user_id: user?.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-log'] });
    },
  });
};

// Site Settings hooks
export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');
      if (error) throw error;
      return data as SiteSetting[];
    },
  });
};

export const useUpdateSiteSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, setting_value }: { id: string; setting_value: Json }) => {
      const { data, error } = await supabase
        .from('site_settings')
        .update({ setting_value })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
    },
  });
};

// Dashboard stats hook
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [inquiriesRes, pagesRes, mediaRes] = await Promise.all([
        supabase.from('contact_inquiries').select('id, is_read', { count: 'exact' }),
        supabase.from('page_content').select('id', { count: 'exact' }),
        supabase.from('media_files').select('id', { count: 'exact' }),
      ]);

      const unreadCount = inquiriesRes.data?.filter(i => !i.is_read).length || 0;

      return {
        totalInquiries: inquiriesRes.count || 0,
        unreadInquiries: unreadCount,
        totalPages: pagesRes.count || 0,
        totalMedia: mediaRes.count || 0,
      };
    },
  });
};
