import { useState } from 'react';
import { useSocialLinks, useUpdateSocialLink, useCreateSocialLink, useDeleteSocialLink, useLogActivity } from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Share2, 
  Plus, 
  Edit2, 
  Trash2, 
  GripVertical,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  Github,
  Youtube,
  Twitter,
  Globe
} from 'lucide-react';
import type { SocialLink } from '@/hooks/useAdmin';

const platformIcons: Record<string, React.ReactNode> = {
  WhatsApp: <MessageCircle className="w-5 h-5" />,
  Instagram: <Instagram className="w-5 h-5" />,
  Facebook: <Facebook className="w-5 h-5" />,
  LinkedIn: <Linkedin className="w-5 h-5" />,
  GitHub: <Github className="w-5 h-5" />,
  YouTube: <Youtube className="w-5 h-5" />,
  Twitter: <Twitter className="w-5 h-5" />,
  Website: <Globe className="w-5 h-5" />,
};

const platformOptions = [
  'WhatsApp',
  'Instagram',
  'Facebook',
  'LinkedIn',
  'GitHub',
  'YouTube',
  'Twitter',
  'Website',
  'Other',
];

const AdminSocialLinks = () => {
  const { data: links, isLoading } = useSocialLinks();
  const updateLink = useUpdateSocialLink();
  const createLink = useCreateSocialLink();
  const deleteLink = useDeleteSocialLink();
  const logActivity = useLogActivity();

  const [editLink, setEditLink] = useState<SocialLink | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    platform: '',
    url: '',
    is_visible: true,
  });

  const handleSave = async () => {
    if (!formData.platform || !formData.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editLink) {
        await updateLink.mutateAsync({
          id: editLink.id,
          platform: formData.platform,
          url: formData.url,
          is_visible: formData.is_visible,
        });
        await logActivity.mutateAsync({
          action: `Updated ${formData.platform} link`,
          entity_type: 'social_link',
          entity_id: editLink.id,
          details: null,
          user_id: null
        });
        toast.success('Link updated successfully');
      } else {
        await createLink.mutateAsync({
          platform: formData.platform,
          url: formData.url,
          is_visible: formData.is_visible,
          icon_name: formData.platform,
          display_order: (links?.length || 0) + 1,
        });
        await logActivity.mutateAsync({
          action: `Added ${formData.platform} link`,
          entity_type: 'social_link',
          entity_id: null,
          details: null,
          user_id: null
        });
        toast.success('Link added successfully');
      }
      handleClose();
    } catch {
      toast.error('Failed to save link');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const linkToDelete = links?.find(l => l.id === deleteId);
      await deleteLink.mutateAsync(deleteId);
      await logActivity.mutateAsync({
        action: `Deleted ${linkToDelete?.platform || 'social'} link`,
        entity_type: 'social_link',
        entity_id: deleteId,
        details: null,
        user_id: null
      });
      toast.success('Link deleted');
      setDeleteId(null);
    } catch {
      toast.error('Failed to delete link');
    }
  };

  const handleToggleVisibility = async (link: SocialLink) => {
    try {
      await updateLink.mutateAsync({
        id: link.id,
        is_visible: !link.is_visible,
      });
      toast.success(link.is_visible ? 'Link hidden' : 'Link visible');
    } catch {
      toast.error('Failed to update visibility');
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditLink(link);
    setFormData({
      platform: link.platform,
      url: link.url,
      is_visible: link.is_visible ?? true,
    });
  };

  const handleClose = () => {
    setEditLink(null);
    setIsCreating(false);
    setFormData({ platform: '', url: '', is_visible: true });
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Share2 className="w-8 h-8" />
            Social Media Links
          </h1>
          <p className="text-muted-foreground">Manage your social media presence</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Link
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Social Links ({links?.length || 0})</CardTitle>
          <CardDescription>Drag to reorder, toggle visibility, or edit links</CardDescription>
        </CardHeader>
        <CardContent>
          {links?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Share2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No social links added yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {links?.map((link) => (
                <div
                  key={link.id}
                  className={`p-4 rounded-lg border transition-all ${
                    link.is_visible ? 'bg-muted/10 border-border' : 'bg-muted/5 border-muted opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                    
                    <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center text-white">
                      {platformIcons[link.platform] || <Globe className="w-5 h-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{link.platform}</p>
                      <p className="text-sm text-muted-foreground truncate">{link.url}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`visible-${link.id}`} className="text-sm text-muted-foreground">
                          {link.is_visible ? 'Visible' : 'Hidden'}
                        </Label>
                        <Switch
                          id={`visible-${link.id}`}
                          checked={link.is_visible ?? false}
                          onCheckedChange={() => handleToggleVisibility(link)}
                        />
                      </div>
                      
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(link)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(link.id)}>
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

      {/* Add/Edit Dialog */}
      <Dialog open={isCreating || !!editLink} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editLink ? 'Edit Link' : 'Add New Link'}</DialogTitle>
            <DialogDescription>
              {editLink ? 'Update the social media link details' : 'Add a new social media link to your website'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      <div className="flex items-center gap-2">
                        {platformIcons[platform] || <Globe className="w-4 h-4" />}
                        {platform}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="visible">Show on website</Label>
              <Switch
                id="visible"
                checked={formData.is_visible}
                onCheckedChange={(checked) => setFormData({ ...formData, is_visible: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>
              {editLink ? 'Save Changes' : 'Add Link'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Social Link?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this social link.
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

export default AdminSocialLinks;
