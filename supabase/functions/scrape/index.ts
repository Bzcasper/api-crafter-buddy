import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { extractContent, extractImages, extractTitle } from './utils/contentExtractor.ts';
import { processWithAI } from './utils/aiProcessor.ts';
import { fetchWithUserAgent } from './utils/fetchUtils.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Received scrape request');
    const { url, searchQuery, customInstruction, semantic_filter } = await req.json();
    console.log('Scraping URL:', url);

    if (!url) {
      throw new Error('URL is required');
    }

    const response = await fetchWithUserAgent(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch webpage: ${response.statusText}`);
    }

    const html = await response.text();
    console.log('Successfully fetched HTML content');

    const content = extractContent(html, searchQuery);
    const imageUrls = extractImages(html);
    const title = extractTitle(html, url);

    console.log(`Found ${imageUrls.length} images`);

    // Process content with AI
    console.log('Processing content with AI');
    const processedContent = await processWithAI(
      content, 
      customInstruction || 'Organize and format the content in a clear, structured way.'
    );

    return new Response(
      JSON.stringify({
        title,
        content: processedContent,
        images: imageUrls,
        metadata: {
          url,
          scrapedAt: new Date().toISOString(),
          totalImages: imageUrls.length
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});