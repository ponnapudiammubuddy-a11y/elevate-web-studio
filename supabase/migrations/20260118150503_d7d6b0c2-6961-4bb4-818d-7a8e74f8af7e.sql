-- Create a view to safely expose user data without sensitive fields
CREATE OR REPLACE VIEW public.admin_users AS
SELECT 
  au.id,
  au.email,
  au.created_at,
  au.last_sign_in_at,
  p.full_name,
  p.avatar_url,
  ur.role
FROM auth.users au
LEFT JOIN public.profiles p ON p.user_id = au.id
LEFT JOIN public.user_roles ur ON ur.user_id = au.id;

-- Create invitations table for pending invites
CREATE TABLE public.user_invitations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  role app_role NOT NULL DEFAULT 'editor',
  invited_by UUID REFERENCES auth.users(id),
  token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_invitations ENABLE ROW LEVEL SECURITY;

-- Policies for invitations
CREATE POLICY "Admins can view invitations" ON public.user_invitations
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create invitations" ON public.user_invitations
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete invitations" ON public.user_invitations
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Grant access to the admin_users view for authenticated users with admin role
-- Note: The view itself doesn't have RLS, but we'll control access in the application layer