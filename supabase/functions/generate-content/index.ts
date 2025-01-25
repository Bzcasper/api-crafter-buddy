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
    const { model, topic, prompt, parameters, platforms } = await req.json()
    console.log('Generating content with:', { model, topic, parameters, platforms })

    let content = ''
    
    if (model === 'gpt-4o' || model === 'gpt-4o-mini') {
      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model === 'gpt-4o' ? 'gpt-4' : 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a content generation expert. Generate content with:
                - Creativity level: ${parameters.creativity}/100
                - Content length: ${parameters.length}/100
                - Tone level: ${parameters.tone}/100 (higher means more formal)
                For platforms: ${platforms.join(', ')}`
            },
            {
              role: 'user',
              content: `Generate engaging content about: ${topic}\n\nPrompt: ${prompt}`
            }
          ],
        }),
      })

      const openAIData = await openAIResponse.json()
      content = openAIData.choices[0].message.content
    } else if (model === 'perplexity') {
      const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('PERPLEXITY_API_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: `You are a content generation expert specializing in ${topic}. Generate content with:
                - Creativity: ${parameters.creativity}/100
                - Length: ${parameters.length}/100
                - Tone: ${parameters.tone}/100
                For platforms: ${platforms.join(', ')}`
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: parameters.creativity / 100,
          max_tokens: Math.floor(parameters.length * 20),
          top_p: 0.9,
          return_images: false,
          return_related_questions: true
        }),
      })

      const perplexityData = await perplexityResponse.json()
      content = perplexityData.choices[0].message.content
    }

    console.log('Content generated successfully')
    
    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
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