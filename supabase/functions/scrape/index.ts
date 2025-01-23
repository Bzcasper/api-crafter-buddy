import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import FirecrawlApp from 'npm:@mendable/firecrawl-js';

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

    const firecrawl = new FirecrawlApp({ 
      apiKey: Deno.env.get('FIRECRAWL_API_KEY') 
    });

    console.log('Initiating Firecrawl scrape');
    const crawlResponse = await firecrawl.crawlUrl(url, {
      limit: 1, // Start with single page for compatibility
      scrapeOptions: {
        formats: ['markdown', 'html'],
        searchQuery: searchQuery,
        customInstructions: customInstruction,
        semanticFilter: semantic_filter
      }
    });

    if (!crawlResponse.success) {
      throw new Error(`Firecrawl scraping failed: ${crawlResponse.error}`);
    }

    const pageData = crawlResponse.data[0];
    console.log('Successfully scraped content with Firecrawl');

    return new Response(
      JSON.stringify({
        title: pageData.title || url,
        content: pageData.markdown || pageData.text,
        images: pageData.images || [],
        metadata: {
          url,
          scrapedAt: new Date().toISOString(),
          totalImages: (pageData.images || []).length
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