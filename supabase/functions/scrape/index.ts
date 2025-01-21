import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url, searchQuery, customInstruction, semantic_filter } = await req.json();
    console.log('Starting scrape for URL:', url);

    // Fetch the webpage content
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    
    // Use DOMParser to parse the HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Extract content based on semantic filter or custom instruction
    let content = '';
    let title = doc.title || url;

    if (searchQuery) {
      // Find elements containing the search query
      const textNodes = Array.from(doc.querySelectorAll('p, h1, h2, h3, h4, h5, h6'))
        .filter(el => el.textContent?.toLowerCase().includes(searchQuery.toLowerCase()));
      
      content = textNodes
        .map(node => node.textContent)
        .filter(text => text)
        .join('\n\n');
    } else {
      // Extract main content
      const article = doc.querySelector('article');
      const main = doc.querySelector('main');
      
      if (article) {
        content = article.textContent || '';
      } else if (main) {
        content = main.textContent || '';
      } else {
        // Fallback to body content
        content = doc.body.textContent || '';
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
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});