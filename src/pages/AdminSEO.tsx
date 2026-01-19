import { useEffect, useState } from 'react';
import { useAllSEOSettings, useUpdateSEOSettings, useGlobalSEOSettings, useUpdateGlobalSEOSettings, useSitemapEntries, type SEOSettings, type GlobalSEOSettings } from '@/hooks/useSEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Search,
  Globe,
  FileText,
  Settings,
  Save,
  AlertCircle,
  CheckCircle,
  Map,
  Code
} from 'lucide-react';

const AdminSEO = () => {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [editedSettings, setEditedSettings] = useState<Partial<SEOSettings>>({});
  const [editedGlobalSettings, setEditedGlobalSettings] = useState<Partial<GlobalSEOSettings>>({});

  const { data: seoSettings, isLoading: loadingSEO } = useAllSEOSettings();
  const { data: globalSettings, isLoading: loadingGlobal } = useGlobalSEOSettings();
  const { data: sitemapEntries } = useSitemapEntries();
  const updateSEO = useUpdateSEOSettings();
  const updateGlobal = useUpdateGlobalSEOSettings();

  useEffect(() => {
    if (globalSettings) {
      setEditedGlobalSettings(globalSettings);
    }
  }, [globalSettings]);

  const handleSavePageSEO = async () => {
    if (!selectedPage || !editedSettings.id) return;

    try {
      await updateSEO.mutateAsync(editedSettings as { id: string });
      toast.success('SEO settings saved successfully!');
    } catch {
      toast.error('Failed to save SEO settings');
    }
  };

  const handleSaveGlobalSEO = async () => {
    if (!editedGlobalSettings.id) return;

    try {
      await updateGlobal.mutateAsync(editedGlobalSettings as { id: string });
      toast.success('Global SEO settings saved successfully!');
    } catch {
      toast.error('Failed to save global SEO settings');
    }
  };

  const selectedPageData = seoSettings?.find(s => s.id === selectedPage);

  useEffect(() => {
    if (selectedPageData) {
      setEditedSettings(selectedPageData);
    }
  }, [selectedPageData]);

  const getKeywordScore = (primary: string | null, secondary: string[] | null) => {
    let score = 0;
    if (primary && primary.length >= 3) score += 40;
    if (secondary && secondary.length >= 2) score += 30;
    if (secondary && secondary.length >= 4) score += 30;
    return score;
  };

  const getTitleScore = (title: string | null) => {
    if (!title) return 0;
    if (title.length >= 30 && title.length <= 60) return 100;
    if (title.length > 60) return 60;
    return 40;
  };

  const getDescriptionScore = (desc: string | null) => {
    if (!desc) return 0;
    if (desc.length >= 120 && desc.length <= 160) return 100;
    if (desc.length > 160) return 60;
    return 40;
  };

  if (loadingSEO || loadingGlobal) {
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
          <Search className="w-8 h-8" />
          SEO Settings
        </h1>
        <p className="text-muted-foreground">Manage your website's SEO</p>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="pages" className="gap-2">
            <FileText className="w-4 h-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="global" className="gap-2">
            <Globe className="w-4 h-4" />
            Global
          </TabsTrigger>
          <TabsTrigger value="sitemap" className="gap-2">
            <Map className="w-4 h-4" />
            Sitemap
          </TabsTrigger>
          <TabsTrigger value="technical" className="gap-2">
            <Code className="w-4 h-4" />
            Technical
          </TabsTrigger>
        </TabsList>

        {/* Page SEO Tab */}
        <TabsContent value="pages" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Page List */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Pages</CardTitle>
                <CardDescription>Select a page to edit SEO settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {seoSettings?.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${selectedPage === page.id
                        ? 'bg-primary/20 border border-primary/50'
                        : 'bg-muted/30 hover:bg-muted/50 border border-transparent'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{page.page_name}</p>
                        <p className="text-sm text-muted-foreground">{page.page_slug}</p>
                      </div>
                      <Badge variant={page.meta_title && page.meta_description ? 'default' : 'destructive'}>
                        {page.meta_title && page.meta_description ? 'Complete' : 'Incomplete'}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Page SEO Editor */}
            <Card className="glass-card lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedPageData ? `Edit: ${selectedPageData.page_name}` : 'Select a Page'}
                </CardTitle>
                <CardDescription>Configure SEO settings for this page</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedPageData ? (
                  <div className="space-y-6">
                    {/* Meta Title */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="meta_title">Meta Title</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {(editedSettings.meta_title as string)?.length || 0}/60
                          </span>
                          {getTitleScore(editedSettings.meta_title as string) === 100 ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      <Input
                        id="meta_title"
                        value={(editedSettings.meta_title as string) || ''}
                        onChange={(e) => setEditedSettings({ ...editedSettings, meta_title: e.target.value })}
                        placeholder="Enter meta title (30-60 characters ideal)"
                        maxLength={70}
                      />
                    </div>

                    {/* Meta Description */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="meta_description">Meta Description</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {(editedSettings.meta_description as string)?.length || 0}/160
                          </span>
                          {getDescriptionScore(editedSettings.meta_description as string) === 100 ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      <Textarea
                        id="meta_description"
                        value={(editedSettings.meta_description as string) || ''}
                        onChange={(e) => setEditedSettings({ ...editedSettings, meta_description: e.target.value })}
                        placeholder="Enter meta description (120-160 characters ideal)"
                        maxLength={200}
                        rows={3}
                      />
                    </div>

                    {/* Keywords */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primary_keyword">Primary Keyword</Label>
                        <Input
                          id="primary_keyword"
                          value={(editedSettings.primary_keyword as string) || ''}
                          onChange={(e) => setEditedSettings({ ...editedSettings, primary_keyword: e.target.value })}
                          placeholder="e.g., web design"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondary_keywords">Secondary Keywords (comma-separated)</Label>
                        <Input
                          id="secondary_keywords"
                          value={(editedSettings.secondary_keywords as string[] || []).join(', ')}
                          onChange={(e) => setEditedSettings({
                            ...editedSettings,
                            secondary_keywords: e.target.value.split(',').map(k => k.trim()).filter(Boolean)
                          })}
                          placeholder="e.g., custom website, responsive"
                        />
                      </div>
                    </div>

                    {/* Keyword Score */}
                    <div className="p-4 rounded-lg bg-muted/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Keyword Score</span>
                        <span className="text-sm font-bold">
                          {getKeywordScore(editedSettings.primary_keyword as string, editedSettings.secondary_keywords as string[])}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full gradient-bg transition-all duration-300"
                          style={{ width: `${getKeywordScore(editedSettings.primary_keyword as string, editedSettings.secondary_keywords as string[])}%` }}
                        />
                      </div>
                    </div>

                    {/* Open Graph */}
                    <div className="space-y-4">
                      <h3 className="font-semibold">Open Graph Settings</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="og_title">OG Title</Label>
                          <Input
                            id="og_title"
                            value={(editedSettings.og_title as string) || ''}
                            onChange={(e) => setEditedSettings({ ...editedSettings, og_title: e.target.value })}
                            placeholder="Leave empty to use meta title"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="og_image">OG Image URL</Label>
                          <Input
                            id="og_image"
                            value={(editedSettings.og_image as string) || ''}
                            onChange={(e) => setEditedSettings({ ...editedSettings, og_image: e.target.value })}
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Indexing Options */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                      <div>
                        <p className="font-medium">Allow Indexing</p>
                        <p className="text-sm text-muted-foreground">Let search engines index this page</p>
                      </div>
                      <Switch
                        checked={!editedSettings.no_index}
                        onCheckedChange={(checked) => setEditedSettings({ ...editedSettings, no_index: !checked })}
                      />
                    </div>

                    {/* Google Preview */}
                    <div className="space-y-2">
                      <h3 className="font-semibold">Google Preview</h3>
                      <div className="p-4 rounded-lg bg-white text-black">
                        <p className="text-[#1a0dab] text-lg hover:underline cursor-pointer truncate">
                          {(editedSettings.meta_title as string) || 'Page Title'}
                        </p>
                        <p className="text-[#006621] text-sm">
                          www.thahaseenweb.site{selectedPageData.page_slug}
                        </p>
                        <p className="text-[#545454] text-sm line-clamp-2">
                          {(editedSettings.meta_description as string) || 'Add a meta description to see how it appears in search results.'}
                        </p>
                      </div>
                    </div>

                    <Button onClick={handleSavePageSEO} className="w-full btn-gradient gap-2">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a page from the list to edit its SEO settings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Global SEO Tab */}
        <TabsContent value="global" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Global SEO Settings
              </CardTitle>
              <CardDescription>Configure site-wide SEO settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input
                    id="site_name"
                    value={(editedGlobalSettings.site_name as string) || ''}
                    onChange={(e) => setEditedGlobalSettings({ ...editedGlobalSettings, site_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="default_og_image">Default OG Image</Label>
                  <Input
                    id="default_og_image"
                    value={(editedGlobalSettings.default_og_image as string) || ''}
                    onChange={(e) => setEditedGlobalSettings({ ...editedGlobalSettings, default_og_image: e.target.value })}
                    placeholder="https://example.com/default-og.jpg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={(editedGlobalSettings.site_description as string) || ''}
                  onChange={(e) => setEditedGlobalSettings({ ...editedGlobalSettings, site_description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                  <Input
                    id="google_analytics_id"
                    value={(editedGlobalSettings.google_analytics_id as string) || ''}
                    onChange={(e) => setEditedGlobalSettings({ ...editedGlobalSettings, google_analytics_id: e.target.value })}
                    placeholder="G-XXXXXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="google_search_console">Google Search Console Verification</Label>
                  <Input
                    id="google_search_console"
                    value={(editedGlobalSettings.google_search_console_verification as string) || ''}
                    onChange={(e) => setEditedGlobalSettings({ ...editedGlobalSettings, google_search_console_verification: e.target.value })}
                    placeholder="verification_code"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="robots_txt">Robots.txt Content</Label>
                <Textarea
                  id="robots_txt"
                  value={(editedGlobalSettings.robots_txt_content as string) || ''}
                  onChange={(e) => setEditedGlobalSettings({ ...editedGlobalSettings, robots_txt_content: e.target.value })}
                  rows={8}
                  className="font-mono text-sm"
                />
              </div>

              <Button onClick={handleSaveGlobalSEO} className="w-full btn-gradient gap-2">
                <Save className="w-4 h-4" />
                Save Global Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sitemap Tab */}
        <TabsContent value="sitemap" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="w-5 h-5" />
                Sitemap Management
              </CardTitle>
              <CardDescription>View and manage your sitemap entries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/30">
                  <p className="text-sm text-muted-foreground mb-2">
                    Sitemap URL: <code className="px-2 py-1 bg-background rounded">
                      https://www.thahaseenweb.site/sitemap.xml
                    </code>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    The sitemap is automatically generated from the entries below.
                  </p>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">URL</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Priority</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Frequency</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sitemapEntries?.map((entry) => (
                        <tr key={entry.id} className="border-t">
                          <td className="px-4 py-3 text-sm">{entry.url}</td>
                          <td className="px-4 py-3 text-sm capitalize">{entry.page_type}</td>
                          <td className="px-4 py-3 text-sm">{entry.priority}</td>
                          <td className="px-4 py-3 text-sm capitalize">{entry.changefreq}</td>
                          <td className="px-4 py-3">
                            <Badge variant={entry.is_active ? 'default' : 'secondary'}>
                              {entry.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical SEO Tab */}
        <TabsContent value="technical" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Page Speed Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Lazy Loading Images</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Code Splitting</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>CSS Minification</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Image Optimization</span>
                  <Badge variant="default">Enabled</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Mobile SEO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Responsive Design</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Mobile-First CSS</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Touch Friendly</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Viewport Configured</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Structured Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Schema.org Markup</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>LocalBusiness Schema</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>JSON-LD Format</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">URL Structure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Clean URLs</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Canonical Tags</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <span>Trailing Slashes</span>
                  <Badge variant="secondary">Not Used</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSEO;
