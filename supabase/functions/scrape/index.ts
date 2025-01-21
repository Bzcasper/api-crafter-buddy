import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import puppeteer from "https://deno.land/x/puppeteer@16.2.0/mod.ts";

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

    // Launch browser
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    console.log('Navigating to page...');
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Extract content based on semantic filter or custom instruction
    let content = '';
    if (searchQuery) {
      // Use search query to find relevant content
      content = await page.evaluate((query) => {
        const elements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6'));
        return elements
          .filter(el => el.innerText.toLowerCase().includes(query.toLowerCase()))
          .map(el => el.innerText)
          .join('\n\n');
      }, searchQuery);
    } else {
      // Extract main content
      content = await page.evaluate(() => {
        const article = document.querySelector('article');
        if (article) return article.innerText;
        
        const main = document.querySelector('main');
        if (main) return main.innerText;
        
        return document.body.innerText;
      });
    }

    // Take screenshot
    const screenshot = await page.screenshot({ fullPage: true });
    const screenshotBase64 = Buffer.from(screenshot).toString('base64');

    // Get page title
    const title = await page.title();

    await browser.close();
    console.log('Scraping completed successfully');

    return new Response(
      JSON.stringify({
        title,
        content,
        screenshot: `data:image/png;base64,${screenshotBase64}`,
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