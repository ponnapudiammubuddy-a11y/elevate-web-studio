import { useDashboardStats, useContactInquiries, useActivityLog } from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  FileText, 
  Image, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: inquiries } = useContactInquiries();
  const { data: activities } = useActivityLog();

  const recentInquiries = inquiries?.slice(0, 5) || [];
  const recentActivities = activities?.slice(0, 5) || [];

  if (statsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalInquiries || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.unreadInquiries || 0} unread
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{stats?.unreadInquiries || 0}</div>
            <p className="text-xs text-muted-foreground">
              Require attention
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Content Sections</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPages || 0}</div>
            <p className="text-xs text-muted-foreground">
              Across all pages
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Media Files</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalMedia || 0}</div>
            <p className="text-xs text-muted-foreground">
              Images & files
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Inquiries
            </CardTitle>
            <CardDescription>Latest contact form submissions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentInquiries.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No inquiries yet</p>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="flex items-start justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{inquiry.name}</p>
                        {!inquiry.is_read && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{inquiry.email}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(inquiry.created_at), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                    {inquiry.is_read ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest content changes</CardDescription>
          </CardHeader>
          <CardContent>
            {recentActivities.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No activity recorded yet</p>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <TrendingUp className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.entity_type} • {format(new Date(activity.created_at), 'MMM d, h:mm a')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks you can perform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a href="/admin/inquiries" className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">View Inquiries</p>
            </a>
            <a href="/admin/pages" className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Edit Pages</p>
            </a>
            <a href="/admin/social" className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">Social Links</p>
            </a>
            <a href="/admin/seo" className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-center">
              <FileText className="w-8 h-8 mx-auto mb-2 text-primary" />
              <p className="text-sm font-medium">SEO Settings</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
