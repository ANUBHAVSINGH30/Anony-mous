import { supabase } from '../supabase';

/**
 * Upload an image file to Supabase Storage
 * @param {File} file - The image file to upload
 * @returns {Promise<string|null>} - The public URL of the uploaded image, or null if failed
 */
export const uploadImage = async (file) => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('post-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('post-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} url - The public URL of the image to delete
 */
export const deleteImage = async (url) => {
  try {
    // Extract file path from URL
    const urlParts = url.split('/post-images/');
    if (urlParts.length < 2) return;
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from('post-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting image:', error);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};
