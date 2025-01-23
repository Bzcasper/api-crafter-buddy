import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json'
};

serve(async (req) => {
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

    // Initialize proxy and user agent
    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ];
    
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)];
    console.log('Using User-Agent:', randomUserAgent);

    // Fetch the webpage content with retry logic
    const maxRetries = 3;
    let attempt = 0;
    let response;
    let html;

    while (attempt < maxRetries) {
      try {
        console.log(`Attempt ${attempt + 1} of ${maxRetries}`);
        response = await fetch(url, {
          headers: {
            'User-Agent': randomUserAgent,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0'
          }
        });

        if (response.ok) {
          html = await response.text();
          break;
        } else {
          console.log(`Attempt ${attempt + 1} failed with status: ${response.status}`);
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
        }
      } catch (error) {
        console.error(`Attempt ${attempt + 1} error:`, error);
        if (attempt === maxRetries - 1) throw error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
      attempt++;
    }

    if (!html) {
      throw new Error('Failed to fetch webpage after multiple attempts');
    }

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
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6');
      const matchingContent = Array.from(elements)
        .filter(el => el.textContent?.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(el => el.textContent)
        .filter(Boolean);
      
      content = matchingContent.join('\n\n');
    } else {
      console.log('Extracting main content');
      const article = document.querySelector('article');
      const main = document.querySelector('main');
      
      if (article) {
        content = article.textContent || '';
      } else if (main) {
        content = main.textContent || '';
      } else {
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
          userAgent: randomUserAgent
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