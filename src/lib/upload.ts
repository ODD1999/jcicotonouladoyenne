import { put } from '@vercel/blob';

export async function uploadFile(file: File, folder: string = 'documents'): Promise<{ url: string; filename: string }> {
  try {
    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const filename = `${folder}/${timestamp}-${randomString}-${file.name}`;
    
    // Uploader le fichier vers Vercel Blob
    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    
    return {
      url: blob.url,
      filename: blob.pathname,
    };
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}
