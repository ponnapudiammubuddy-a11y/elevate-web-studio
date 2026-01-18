import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useAdmin';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Share2, 
  Image, 
  Settings, 
  Search, 
  LogOut,
  Shield,
  Clock,
  Menu,
  ChevronLeft,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { useDashboardStats } from '@/hooks/useAdmin';

const menuItems = [
  { title: 'Dashboard', url: '/admin/dashboard', icon: LayoutDashboard },
  { title: 'Pages', url: '/admin/pages', icon: FileText },
  { title: 'Inquiries', url: '/admin/inquiries', icon: MessageSquare },
  { title: 'Social Links', url: '/admin/social', icon: Share2 },
  { title: 'Media', url: '/admin/media', icon: Image },
  { title: 'SEO', url: '/admin/seo', icon: Search },
  { title: 'Users', url: '/admin/users', icon: Users, adminOnly: true },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
  { title: 'Activity Log', url: '/admin/activity', icon: Clock },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { data: role } = useUserRole();
  const { data: stats } = useDashboardStats();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <div className="p-4 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <Badge variant="outline" className="text-xs capitalize">{role || 'loading...'}</Badge>
          </div>
        )}
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                // Hide admin-only items from non-admins
                if ('adminOnly' in item && item.adminOnly && role !== 'admin') {
                  return null;
                }
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      onClick={() => navigate(item.url)}
                      className={`w-full justify-start gap-3 ${
                        isActive(item.url) ? 'bg-primary/20 text-primary' : ''
                      }`}
                      tooltip={collapsed ? item.title : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="flex-1 flex items-center justify-between">
                          {item.title}
                          {item.title === 'Inquiries' && stats?.unreadInquiries ? (
                            <Badge variant="destructive" className="ml-2">
                              {stats.unreadInquiries}
                            </Badge>
                          ) : null}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { data: role, isLoading: roleLoading } = useUserRole();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }
      setIsLoading(false);
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate('/admin/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!roleLoading && !role) {
      toast.error('You do not have admin access. Please contact an administrator.');
      navigate('/admin/login');
    }
  }, [role, roleLoading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  if (isLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                View Site
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
