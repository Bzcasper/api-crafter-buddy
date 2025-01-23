import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import FirecrawlApp from 'npm:@mendable/firecrawl-js';
import { processWithAI } from './utils/aiProcessor.ts';

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

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('Firecrawl API key not found');
      throw new Error('Firecrawl API key not configured');
    }

    console.log('Initializing Firecrawl with API key');
    const firecrawl = new FirecrawlApp({ apiKey });

    console.log('Initiating Firecrawl scrape with options:', {
      url,
      searchQuery,
      hasCustomInstruction: !!customInstruction,
      hasSemanticFilter: !!semantic_filter
    });

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
      console.error('Firecrawl scraping failed:', crawlResponse.error);
      throw new Error(`Firecrawl scraping failed: ${crawlResponse.error}`);
    }

    const pageData = crawlResponse.data[0];
    if (!pageData) {
      console.error('No data returned from Firecrawl');
      throw new Error('No content found on the specified URL');
    }

    console.log('Successfully scraped content with Firecrawl');

    // Process content with AI if custom instruction is provided
    let processedContent = pageData.markdown || pageData.text;
    if (customInstruction) {
      console.log('Processing content with AI using custom instruction');
      processedContent = await processWithAI(processedContent, customInstruction);
    }

    const response = {
      title: pageData.title || url,
      content: processedContent,
      images: pageData.images || [],
      metadata: {
        url,
        scrapedAt: new Date().toISOString(),
        totalImages: (pageData.images || []).length
      }
    };

    console.log('Returning processed content');
    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});