import { useActivityLog } from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { 
  Clock, 
  FileText, 
  Share2, 
  MessageSquare, 
  Settings,
  Search,
  Image
} from 'lucide-react';

const entityIcons: Record<string, React.ReactNode> = {
  page_content: <FileText className="w-4 h-4" />,
  social_link: <Share2 className="w-4 h-4" />,
  contact_inquiry: <MessageSquare className="w-4 h-4" />,
  site_settings: <Settings className="w-4 h-4" />,
  seo_settings: <Search className="w-4 h-4" />,
  media_file: <Image className="w-4 h-4" />,
};

const AdminActivityLog = () => {
  const { data: activities, isLoading } = useActivityLog();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Clock className="w-8 h-8" />
          Activity Log
        </h1>
        <p className="text-muted-foreground">Track all content changes and admin actions</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Last 100 actions performed in the admin panel</CardDescription>
        </CardHeader>
        <CardContent>
          {activities?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No activity recorded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities?.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/10 border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {entityIcons[activity.entity_type] || <FileText className="w-4 h-4" />}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{activity.action}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {activity.entity_type.replace('_', ' ')}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(activity.created_at), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminActivityLog;
