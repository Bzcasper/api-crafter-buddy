import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function processWithAI(content: string, instruction: string) {
  const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openaiApiKey) {
    throw new Error('OpenAI API key not configured')
  }

  console.log('Processing content with AI')
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an AI assistant that helps process and organize web content. Format the content according to the given template and instructions.'
        },
        {
          role: 'user',
          content: `Please process this content and organize it according to these instructions: ${instruction}\n\nContent: ${content}`
        }
      ],
    }),
  })

  const result = await response.json()
  return result.choices[0].message.content
}

async function extractImages(document: Document): Promise<string[]> {
  const images = document.querySelectorAll('img')
  const imageUrls: string[] = []
  
  images.forEach((img) => {
    const src = img.getAttribute('src')
    if (src && (src.startsWith('http') || src.startsWith('https'))) {
      imageUrls.push(src)
    }
  })

  return imageUrls
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('Received scrape request')
    const { url, searchQuery, customInstruction, semantic_filter, noteId } = await req.json()
    console.log('Scraping URL:', url)

    if (!url) {
      throw new Error('URL is required')
    }

    const userAgents = [
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    ]
    
    const randomUserAgent = userAgents[Math.floor(Math.random() * userAgents.length)]
    console.log('Using User-Agent:', randomUserAgent)

    const response = await fetch(url, {
      headers: {
        'User-Agent': randomUserAgent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Cache-Control': 'max-age=0'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch webpage: ${response.statusText}`)
    }

    const html = await response.text()
    console.log('Successfully fetched HTML content')
    
    const document = new DOMParser().parseFromString(html, "text/html")
    if (!document) {
      throw new Error("Failed to parse HTML content")
    }

    // Extract images
    const imageUrls = await extractImages(document)
    console.log(`Found ${imageUrls.length} images`)

    let content = ''
    let title = document.querySelector('title')?.textContent || url

    if (searchQuery) {
      console.log('Applying search query:', searchQuery)
      const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
      const matchingContent = Array.from(elements)
        .filter(el => el.textContent?.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(el => el.textContent)
        .filter(Boolean)
      
      content = matchingContent.join('\n\n')
    } else {
      console.log('Extracting main content')
      const article = document.querySelector('article')
      const main = document.querySelector('main')
      
      if (article) {
        content = article.textContent || ''
      } else if (main) {
        content = main.textContent || ''
      } else {
        const body = document.querySelector('body')
        content = body?.textContent || ''
      }
    }

    content = content.trim()
      .replace(/\s+/g, ' ')
      .replace(/\n\s*\n/g, '\n\n')

    // Process content with AI
    console.log('Processing content with AI')
    const processedContent = await processWithAI(content, customInstruction || 'Organize and format the content in a clear, structured way.')

    // Process images
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Process each image
    const imagePromises = imageUrls.map(async (imageUrl) => {
      try {
        const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/process-image`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ imageUrl, noteId })
        })

        if (!response.ok) {
          console.error(`Failed to process image ${imageUrl}:`, await response.text())
          return null
        }

        return await response.json()
      } catch (error) {
        console.error(`Error processing image ${imageUrl}:`, error)
        return null
      }
    })

    const imageResults = await Promise.all(imagePromises)
    const successfulImages = imageResults.filter(Boolean)

    console.log('Scraping completed successfully')

    return new Response(
      JSON.stringify({
        title,
        content: processedContent,
        images: successfulImages,
        metadata: {
          url,
          scrapedAt: new Date().toISOString(),
          userAgent: randomUserAgent,
          totalImages: imageUrls.length,
          processedImages: successfulImages.length
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})