import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

interface ScrapeRequest {
  urls: string[]
  extraction_strategy?: "CosineStrategy" | "LLMExtractionStrategy"
  extraction_strategy_args?: {
    semantic_filter?: string
    provider?: string
    instruction?: string
  }
  screenshot?: boolean
  css_selector?: string
  js?: string[]
}

const CRAWL4AI_URL = "https://crawl4ai.com/crawl"

serve(async (req) => {
  try {
    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        }
      })
    }

    const { urls, extraction_strategy, extraction_strategy_args, screenshot, css_selector, js } = await req.json() as ScrapeRequest

    console.log('Received scrape request:', { urls, extraction_strategy, extraction_strategy_args })

    const response = await fetch(CRAWL4AI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls,
        extraction_strategy,
        extraction_strategy_args,
        screenshot,
        css_selector,
        js,
      }),
    })

    const result = await response.json()
    console.log('Crawl4AI response:', result)

    // Format the response for Obsidian
    const formattedResult = {
      markdown: result.results[0].markdown,
      extracted_content: result.results[0].extracted_content,
      metadata: result.results[0].metadata,
      screenshot: result.results[0].screenshot,
    }

    return new Response(JSON.stringify(formattedResult), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('Error in scrape function:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }
})