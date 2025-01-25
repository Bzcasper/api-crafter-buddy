import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { model, website, parameters, platforms } = await req.json()
    console.log('Generating content with parameters:', { model, website, parameters, platforms })

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    const platformPrompts = platforms.map(p => 
      `For ${p.name}, consider its specific content format and audience preferences.`
    ).join(' ')

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a content generation expert. Generate content with:
              - Creativity level: ${parameters.creativity}/100
              - Content length: ${parameters.length}/100 (higher means longer content)
              - Tone level: ${parameters.tone}/100 (higher means more formal/professional)
              ${platformPrompts}`
          },
          {
            role: 'user',
            content: `Generate engaging content for website: ${website}`
          }
        ],
      }),
    })

    const data = await response.json()
    console.log('Content generated successfully')

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error generating content:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})