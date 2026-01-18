import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Image, Upload, FolderOpen } from 'lucide-react';

const AdminMedia = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Image className="w-8 h-8" />
            Media Library
          </h1>
          <p className="text-muted-foreground">Manage your images and files</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Files
        </Button>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Media Files</CardTitle>
          <CardDescription>Upload and manage your website assets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-16 border-2 border-dashed border-muted rounded-lg">
            <FolderOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No media files yet</h3>
            <p className="text-muted-foreground mb-4">
              Upload images and files to use across your website
            </p>
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Your First File
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Image className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Images</h3>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <FolderOpen className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-semibold">Documents</h3>
              <p className="text-2xl font-bold mt-2">0</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Upload className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold">Total Size</h3>
              <p className="text-2xl font-bold mt-2">0 MB</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMedia;
