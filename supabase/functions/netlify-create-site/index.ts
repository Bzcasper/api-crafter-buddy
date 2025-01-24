import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { siteName, repoUrl } = await req.json()
    const netlifyToken = Deno.env.get('NETLIFY_ACCESS_TOKEN')
    
    if (!netlifyToken) {
      throw new Error('Netlify token not configured')
    }

    console.log('Creating Netlify site:', siteName)

    // Create site on Netlify
    const response = await fetch('https://api.netlify.com/api/v1/sites', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${netlifyToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: siteName,
        repo: {
          provider: 'github',
          repo_path: repoUrl,
          repo_branch: 'main',
        },
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Netlify API error:', error)
      throw new Error(`Netlify API error: ${error.message}`)
    }

    const site = await response.json()
    console.log('Site created successfully:', site.url)

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          site_id: site.id,
          site_url: site.url,
          admin_url: site.admin_url,
        },
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error creating Netlify site:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})