import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useMediaUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const uploadFile = async (file: File, folder: string = '') => {
    setIsUploading(true);
    setProgress(0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('You must be logged in to upload files');
      }

      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${folder ? folder + '/' : ''}${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload to storage
      const { data, error } = await supabase.storage
        .from('media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(data.path);

      setProgress(100);

      // Save to media_files table
      const { error: dbError } = await supabase
        .from('media_files')
        .insert({
          file_name: file.name,
          file_url: urlData.publicUrl,
          file_type: file.type,
          file_size: file.size,
          uploaded_by: user.id,
        });

      if (dbError) throw dbError;

      toast({
        title: 'Upload successful',
        description: `${file.name} has been uploaded.`,
      });

      return urlData.publicUrl;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const deleteFile = async (fileUrl: string, fileId: string) => {
    try {
      // Extract path from URL
      const url = new URL(fileUrl);
      const pathParts = url.pathname.split('/storage/v1/object/public/media/');
      const filePath = pathParts[1];

      if (filePath) {
        // Delete from storage
        const { error: storageError } = await supabase.storage
          .from('media')
          .remove([filePath]);

        if (storageError) {
          console.error('Storage delete error:', storageError);
        }
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('media_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      toast({
        title: 'File deleted',
        description: 'The file has been removed.',
      });

      return true;
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: 'Delete failed',
        description: error.message,
        variant: 'destructive',
      });
      return false;
    }
  };

  return {
    uploadFile,
    deleteFile,
    isUploading,
    progress,
  };
};
