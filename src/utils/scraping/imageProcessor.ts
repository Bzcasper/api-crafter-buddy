import { ImageMetadata } from "@/types/scraping";
import { supabase } from "@/integrations/supabase/client";

export const processImage = async (
  imageUrl: string,
  noteId: string,
  onProgress?: (processed: number, total: number) => void
): Promise<ImageMetadata> => {
  console.log('Processing image:', imageUrl);
  
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process-image`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageUrl, noteId })
  });

  if (!response.ok) {
    throw new Error(`Failed to process image ${imageUrl}: ${await response.text()}`);
  }

  return await response.json();
};

export const processImages = async (
  imageUrls: string[],
  noteId: string,
  onProgress?: (processed: number, total: number) => void
): Promise<ImageMetadata[]> => {
  const results: ImageMetadata[] = [];
  
  for (let i = 0; i < imageUrls.length; i++) {
    try {
      const result = await processImage(imageUrls[i], noteId);
      results.push(result);
      onProgress?.(i + 1, imageUrls.length);
    } catch (error) {
      console.error(`Failed to process image ${imageUrls[i]}:`, error);
    }
  }

  return results;
};