import { useState, useEffect } from 'react';
import { useSiteSettings, useUpdateSiteSetting, useLogActivity } from '@/hooks/useAdmin';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { 
  Settings, 
  Globe,
  Mail,
  Save
} from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

interface GeneralSettings {
  site_name: string;
  tagline: string;
  logo_url: string;
  favicon_url: string;
  footer_text: string;
}

interface ContactSettings {
  email: string;
  phone: string;
  address: string;
}

const AdminSettings = () => {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSetting = useUpdateSiteSetting();
  const logActivity = useLogActivity();

  const [generalSettings, setGeneralSettings] = useState<GeneralSettings>({
    site_name: '',
    tagline: '',
    logo_url: '',
    favicon_url: '',
    footer_text: '',
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (settings) {
      const general = settings.find(s => s.setting_key === 'general');
      const contact = settings.find(s => s.setting_key === 'contact');

      if (general?.setting_value) {
        const value = general.setting_value as Record<string, unknown>;
        setGeneralSettings({
          site_name: (value.site_name as string) || '',
          tagline: (value.tagline as string) || '',
          logo_url: (value.logo_url as string) || '',
          favicon_url: (value.favicon_url as string) || '',
          footer_text: (value.footer_text as string) || '',
        });
      }

      if (contact?.setting_value) {
        const value = contact.setting_value as Record<string, unknown>;
        setContactSettings({
          email: (value.email as string) || '',
          phone: (value.phone as string) || '',
          address: (value.address as string) || '',
        });
      }
    }
  }, [settings]);

  const handleSaveGeneral = async () => {
    const setting = settings?.find(s => s.setting_key === 'general');
    if (!setting) return;

    try {
      await updateSetting.mutateAsync({
        id: setting.id,
        setting_value: generalSettings as unknown as Json,
      });
      await logActivity.mutateAsync({
        action: 'Updated general settings',
        entity_type: 'site_settings',
        entity_id: setting.id,
        details: null,
        user_id: null
      });
      toast.success('General settings saved');
    } catch {
      toast.error('Failed to save settings');
    }
  };

  const handleSaveContact = async () => {
    const setting = settings?.find(s => s.setting_key === 'contact');
    if (!setting) return;

    try {
      await updateSetting.mutateAsync({
        id: setting.id,
        setting_value: contactSettings as unknown as Json,
      });
      await logActivity.mutateAsync({
        action: 'Updated contact settings',
        entity_type: 'site_settings',
        entity_id: setting.id,
        details: null,
        user_id: null
      });
      toast.success('Contact settings saved');
    } catch {
      toast.error('Failed to save settings');
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
          <Settings className="w-8 h-8" />
          Site Settings
        </h1>
        <p className="text-muted-foreground">Configure global site settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general" className="gap-2">
            <Globe className="w-4 h-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Mail className="w-4 h-4" />
            Contact
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic site information and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input
                    id="site_name"
                    value={generalSettings.site_name}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, site_name: e.target.value })}
                    placeholder="Your Site Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={generalSettings.tagline}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, tagline: e.target.value })}
                    placeholder="Your site tagline"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logo_url">Logo URL</Label>
                  <Input
                    id="logo_url"
                    value={generalSettings.logo_url}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, logo_url: e.target.value })}
                    placeholder="https://example.com/logo.png"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon_url">Favicon URL</Label>
                  <Input
                    id="favicon_url"
                    value={generalSettings.favicon_url}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, favicon_url: e.target.value })}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="footer_text">Footer Text</Label>
                <Textarea
                  id="footer_text"
                  value={generalSettings.footer_text}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, footer_text: e.target.value })}
                  placeholder="© 2024 Your Company. All rights reserved."
                  rows={2}
                />
              </div>

              <Button onClick={handleSaveGeneral} className="gap-2">
                <Save className="w-4 h-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Business contact details displayed on the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactSettings.email}
                    onChange={(e) => setContactSettings({ ...contactSettings, email: e.target.value })}
                    placeholder="contact@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={contactSettings.phone}
                    onChange={(e) => setContactSettings({ ...contactSettings, phone: e.target.value })}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  value={contactSettings.address}
                  onChange={(e) => setContactSettings({ ...contactSettings, address: e.target.value })}
                  placeholder="123 Main Street, City, Country"
                  rows={2}
                />
              </div>

              <Button onClick={handleSaveContact} className="gap-2">
                <Save className="w-4 h-4" />
                Save Contact Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
