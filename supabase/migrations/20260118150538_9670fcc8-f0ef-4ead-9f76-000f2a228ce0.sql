-- Drop the insecure view that exposes auth.users
DROP VIEW IF EXISTS public.admin_users;

-- Create a secure function to get users (security definer with proper access control)
CREATE OR REPLACE FUNCTION public.get_admin_users()
RETURNS TABLE (
  id UUID,
  email TEXT,
  created_at TIMESTAMPTZ,
  last_sign_in_at TIMESTAMPTZ,
  full_name TEXT,
  avatar_url TEXT,
  role app_role
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;
  
  RETURN QUERY
  SELECT 
    au.id,
    au.email::TEXT,
    au.created_at,
    au.last_sign_in_at,
    p.full_name,
    p.avatar_url,
    ur.role
  FROM auth.users au
  LEFT JOIN public.profiles p ON p.user_id = au.id
  LEFT JOIN public.user_roles ur ON ur.user_id = au.id
  ORDER BY au.created_at DESC;
END;
$$;

-- Create function to update user role (admin only)
CREATE OR REPLACE FUNCTION public.update_user_role(_user_id UUID, _new_role app_role)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;
  
  -- Prevent removing own admin role
  IF _user_id = auth.uid() AND _new_role != 'admin' THEN
    RAISE EXCEPTION 'Cannot remove your own admin role.';
  END IF;
  
  -- Upsert the role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (_user_id, _new_role)
  ON CONFLICT (user_id, role) 
  DO UPDATE SET role = _new_role;
END;
$$;

-- Create function to remove user role (admin only)
CREATE OR REPLACE FUNCTION public.remove_user_role(_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to call this function
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;
  
  -- Prevent removing own role
  IF _user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot remove your own role.';
  END IF;
  
  DELETE FROM public.user_roles WHERE user_id = _user_id;
END;
$$;