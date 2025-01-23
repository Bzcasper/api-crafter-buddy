import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import Sharp from 'https://esm.sh/sharp@0.32.6'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { imageUrl, noteId } = await req.json()
    console.log('Processing image:', imageUrl, 'for note:', noteId)

    // Download image
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const imageBuffer = await response.arrayBuffer()
    
    // Process image with Sharp
    const image = Sharp(new Uint8Array(imageBuffer))
    const metadata = await image.metadata()
    
    // Compress image while maintaining quality
    const processedBuffer = await image
      .resize(1200, 1200, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .toBuffer()

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Generate unique filename
    const filename = `${crypto.randomUUID()}.jpg`
    const storagePath = `${noteId}/${filename}`

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('scraped-images')
      .upload(storagePath, processedBuffer, {
        contentType: 'image/jpeg',
        upsert: false
      })

    if (uploadError) {
      throw uploadError
    }

    // Save metadata to database
    const { error: dbError } = await supabase
      .from('image_metadata')
      .insert({
        note_id: noteId,
        storage_path: storagePath,
        original_url: imageUrl,
        filename,
        mime_type: 'image/jpeg',
        size_bytes: processedBuffer.byteLength,
        width: metadata.width,
        height: metadata.height,
        compression_quality: 85,
        metadata: {
          original_format: metadata.format,
          original_size: imageBuffer.byteLength,
          compression_ratio: imageBuffer.byteLength / processedBuffer.byteLength
        }
      })

    if (dbError) {
      throw dbError
    }

    return new Response(
      JSON.stringify({
        success: true,
        storagePath,
        metadata: {
          width: metadata.width,
          height: metadata.height,
          size: processedBuffer.byteLength
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error processing image:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})