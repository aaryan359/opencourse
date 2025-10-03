import { supabase } from './supabaseClient';

export const uploadVideoToSupabase = async (file, folder = 'course-videos') => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { data, error } = await supabase.storage
      .from('videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrl,
      path: filePath
    };
  } catch (error) {
    console.error('Error uploading video:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const deleteVideoFromSupabase = async (filePath) => {
  try {
    const { error } = await supabase.storage
      .from('videos')
      .remove([filePath]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Error deleting video:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const validateVideoFile = (file) => {
  const maxSize = 500 * 1024 * 1024;
  const allowedTypes = [
    'video/mp4',
    'video/webm',
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo'
  ];

  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a video file (MP4, WebM, OGG, MOV, or AVI)'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 500MB limit'
    };
  }

  return { valid: true };
};
