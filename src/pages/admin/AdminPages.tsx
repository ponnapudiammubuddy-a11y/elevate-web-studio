import { useState } from 'react';
import { usePageContent, useUpdatePageContent, useLogActivity } from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  FileText, 
  Edit2, 
  Eye, 
  EyeOff,
  Save,
  Home,
  Info,
  Briefcase,
  FolderOpen,
  Mail
} from 'lucide-react';
import type { PageContent } from '@/hooks/useAdmin';

const pageIcons: Record<string, React.ReactNode> = {
  '/': <Home className="w-5 h-5" />,
  '/about': <Info className="w-5 h-5" />,
  '/services': <Briefcase className="w-5 h-5" />,
  '/portfolio': <FolderOpen className="w-5 h-5" />,
  '/contact': <Mail className="w-5 h-5" />,
};

const pageNames: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/services': 'Services',
  '/portfolio': 'Portfolio',
  '/contact': 'Contact',
};

const AdminPages = () => {
  const { data: pages, isLoading } = usePageContent();
  const updatePage = useUpdatePageContent();
  const logActivity = useLogActivity();

  const [editSection, setEditSection] = useState<PageContent | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, string>>({});

  // Group pages by slug
  const groupedPages = pages?.reduce((acc, page) => {
    if (!acc[page.page_slug]) {
      acc[page.page_slug] = [];
    }
    acc[page.page_slug].push(page);
    return acc;
  }, {} as Record<string, PageContent[]>) || {};

  const handleEdit = (section: PageContent) => {
    setEditSection(section);
    const content = section.content as Record<string, unknown>;
    const flattened: Record<string, string> = {};
    Object.entries(content).forEach(([key, value]) => {
      flattened[key] = typeof value === 'string' ? value : JSON.stringify(value);
    });
    setEditedContent(flattened);
  };

  const handleSave = async () => {
    if (!editSection) return;

    try {
      const newContent: Record<string, unknown> = {};
      Object.entries(editedContent).forEach(([key, value]) => {
        try {
          newContent[key] = JSON.parse(value);
        } catch {
          newContent[key] = value;
        }
      });

      await updatePage.mutateAsync({
        id: editSection.id,
        content: JSON.parse(JSON.stringify(newContent)),
      });

      await logActivity.mutateAsync({
        action: `Updated ${editSection.section_name} on ${pageNames[editSection.page_slug] || editSection.page_slug}`,
        entity_type: 'page_content',
        entity_id: editSection.id,
        details: null,
        user_id: null
      });

      toast.success('Content saved successfully');
      setEditSection(null);
    } catch {
      toast.error('Failed to save content');
    }
  };

  const handleToggleSection = async (section: PageContent) => {
    try {
      await updatePage.mutateAsync({
        id: section.id,
        is_enabled: !section.is_enabled,
      });
      toast.success(section.is_enabled ? 'Section disabled' : 'Section enabled');
    } catch {
      toast.error('Failed to update section');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const pageOrder = ['/', '/about', '/services', '/portfolio', '/contact'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="w-8 h-8" />
          Page Content
        </h1>
        <p className="text-muted-foreground">Manage your website content</p>
      </div>

      <Tabs defaultValue="/" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto gap-2">
          {pageOrder.filter(slug => groupedPages[slug]).map((slug) => (
            <TabsTrigger key={slug} value={slug} className="gap-2">
              {pageIcons[slug]}
              {pageNames[slug] || slug}
            </TabsTrigger>
          ))}
        </TabsList>

        {pageOrder.map((slug) => (
          <TabsContent key={slug} value={slug} className="space-y-4">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {pageIcons[slug]}
                  {pageNames[slug]} Page
                </CardTitle>
                <CardDescription>
                  Manage content sections for the {pageNames[slug].toLowerCase()} page
                </CardDescription>
              </CardHeader>
              <CardContent>
                {groupedPages[slug]?.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No sections found</p>
                ) : (
                  <div className="space-y-4">
                    {groupedPages[slug]?.map((section) => (
                      <div
                        key={section.id}
                        className={`p-4 rounded-lg border transition-all ${
                          section.is_enabled ? 'bg-muted/10 border-border' : 'bg-muted/5 border-muted opacity-60'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold capitalize">{section.section_name.replace('_', ' ')}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant={section.is_enabled ? 'default' : 'secondary'}>
                                  {section.is_enabled ? 'Enabled' : 'Disabled'}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleToggleSection(section)}
                            >
                              {section.is_enabled ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(section)}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Preview of content */}
                        <div className="mt-4 p-3 rounded bg-muted/30 text-sm">
                          <pre className="whitespace-pre-wrap text-muted-foreground overflow-hidden">
                            {JSON.stringify(section.content, null, 2).slice(0, 200)}...
                          </pre>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={!!editSection} onOpenChange={() => setEditSection(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="capitalize">
              Edit {editSection?.section_name.replace('_', ' ')}
            </DialogTitle>
            <DialogDescription>
              Update the content for this section. Changes will be reflected on the live site.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {Object.entries(editedContent).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={key} className="capitalize">
                  {key.replace('_', ' ')}
                </Label>
                {value.length > 100 ? (
                  <Textarea
                    id={key}
                    value={value}
                    onChange={(e) => setEditedContent({ ...editedContent, [key]: e.target.value })}
                    rows={4}
                  />
                ) : (
                  <Input
                    id={key}
                    value={value}
                    onChange={(e) => setEditedContent({ ...editedContent, [key]: e.target.value })}
                  />
                )}
              </div>
            ))}

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <div>
                <p className="font-medium">Section Enabled</p>
                <p className="text-sm text-muted-foreground">Show this section on the website</p>
              </div>
              <Switch
                checked={editSection?.is_enabled ?? true}
                onCheckedChange={(checked) => {
                  if (editSection) {
                    updatePage.mutateAsync({ id: editSection.id, is_enabled: checked });
                  }
                }}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSection(null)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPages;
