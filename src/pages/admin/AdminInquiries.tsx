import { useState } from 'react';
import { useContactInquiries, useUpdateInquiry, useDeleteInquiry, useLogActivity } from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  MessageSquare, 
  Search, 
  Eye, 
  Trash2, 
  CheckCircle, 
  Mail, 
  Phone,
  Calendar,
  User,
  Filter
} from 'lucide-react';
import type { ContactInquiry } from '@/hooks/useAdmin';

const AdminInquiries = () => {
  const { data: inquiries, isLoading } = useContactInquiries();
  const updateInquiry = useUpdateInquiry();
  const deleteInquiry = useDeleteInquiry();
  const logActivity = useLogActivity();
  
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredInquiries = inquiries?.filter(inquiry => {
    const matchesSearch = 
      inquiry.name.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'unread' && !inquiry.is_read) ||
      (filter === 'read' && inquiry.is_read);
    
    return matchesSearch && matchesFilter;
  }) || [];

  const handleMarkAsRead = async (id: string, isRead: boolean) => {
    try {
      await updateInquiry.mutateAsync({ id, is_read: isRead });
      await logActivity.mutateAsync({
        action: isRead ? 'Marked inquiry as read' : 'Marked inquiry as unread',
        entity_type: 'contact_inquiry',
        entity_id: id,
        details: null,
        user_id: null
      });
      toast.success(isRead ? 'Marked as read' : 'Marked as unread');
    } catch {
      toast.error('Failed to update inquiry');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteInquiry.mutateAsync(deleteId);
      await logActivity.mutateAsync({
        action: 'Deleted inquiry',
        entity_type: 'contact_inquiry',
        entity_id: deleteId,
        details: null,
        user_id: null
      });
      toast.success('Inquiry deleted');
      setDeleteId(null);
    } catch {
      toast.error('Failed to delete inquiry');
    }
  };

  const handleView = async (inquiry: ContactInquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.is_read) {
      await handleMarkAsRead(inquiry.id, true);
    }
  };

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
          <MessageSquare className="w-8 h-8" />
          Contact Inquiries
        </h1>
        <p className="text-muted-foreground">Manage messages from your contact form</p>
      </div>

      {/* Filters */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('unread')}
              >
                Unread
              </Button>
              <Button
                variant={filter === 'read' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('read')}
              >
                Read
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Messages ({filteredInquiries.length})</CardTitle>
          <CardDescription>Click on a message to view details</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No inquiries found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className={`p-4 rounded-lg border transition-all cursor-pointer hover:bg-muted/30 ${
                    !inquiry.is_read ? 'bg-primary/5 border-primary/30' : 'bg-muted/10 border-border'
                  }`}
                  onClick={() => handleView(inquiry)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold">{inquiry.name}</p>
                        {!inquiry.is_read && (
                          <Badge variant="destructive" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                      <p className="text-sm mt-2 line-clamp-2">{inquiry.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(inquiry.created_at), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleView(inquiry);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsRead(inquiry.id, !inquiry.is_read);
                        }}
                      >
                        <CheckCircle className={`w-4 h-4 ${inquiry.is_read ? 'text-green-500' : ''}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteId(inquiry.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!selectedInquiry} onOpenChange={() => setSelectedInquiry(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
            <DialogDescription>
              Received {selectedInquiry && format(new Date(selectedInquiry.created_at), 'MMMM d, yyyy h:mm a')}
            </DialogDescription>
          </DialogHeader>
          
          {selectedInquiry && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <User className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedInquiry.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedInquiry.email}`} className="font-medium hover:text-primary">
                    {selectedInquiry.email}
                  </a>
                </div>
              </div>

              {selectedInquiry.phone && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a href={`tel:${selectedInquiry.phone}`} className="font-medium hover:text-primary">
                      {selectedInquiry.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm text-muted-foreground mb-2">Message</p>
                <p className="whitespace-pre-wrap">{selectedInquiry.message}</p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedInquiry(null)}>
              Close
            </Button>
            {selectedInquiry && (
              <a href={`mailto:${selectedInquiry.email}`}>
                <Button>Reply via Email</Button>
              </a>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Inquiry?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this inquiry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminInquiries;
