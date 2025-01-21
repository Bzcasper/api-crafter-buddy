import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
  }

  try {
    console.log('Received scrape request');
    const { url, searchQuery, customInstruction, semantic_filter } = await req.json();
    console.log('Scraping URL:', url);

    if (!url) {
      throw new Error('URL is required');
    }

    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    console.log('Successfully fetched HTML content');
    
    // Parse HTML using deno-dom
    const document = new DOMParser().parseFromString(html, "text/html");
    if (!document) {
      throw new Error("Failed to parse HTML content");
    }

    // Extract content based on semantic filter or custom instruction
    let content = '';
    let title = document.querySelector('title')?.textContent || url;

    if (searchQuery) {
      console.log('Applying search query:', searchQuery);
      // Find elements containing the search query
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
      const matchingContent = Array.from(elements)
        .filter(el => el.textContent?.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(el => el.textContent)
        .filter(Boolean);
      
      content = matchingContent.join('\n\n');
    } else {
      console.log('Extracting main content');
      // Extract main content
      const article = document.querySelector('article');
      const main = document.querySelector('main');
      
      if (article) {
        content = article.textContent || '';
      } else if (main) {
        content = main.textContent || '';
      } else {
        // Fallback to body content
        const body = document.querySelector('body');
        content = body?.textContent || '';
      }
    }

    // Clean up the content
    content = content.trim()
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n');

    console.log('Scraping completed successfully');

    return new Response(
      JSON.stringify({
        title,
        content,
        metadata: {
          url,
          scrapedAt: new Date().toISOString(),
        }
      }),
      {
        headers: corsHeaders,
        status: 200
      }
    );
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      {
        headers: corsHeaders,
        status: 500
      }
    );
  }
});