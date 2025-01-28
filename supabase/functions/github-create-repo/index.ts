import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { repoName } = await req.json()
    const githubToken = Deno.env.get('GITHUB_ACCESS_TOKEN')
    
    console.log('Starting GitHub repository creation process')
    
    if (!githubToken) {
      console.error('GitHub token not configured')
      throw new Error('GitHub token not configured')
    }

    if (!repoName) {
      console.error('Repository name not provided')
      throw new Error('Repository name is required')
    }

    console.log(`Creating GitHub repository: ${repoName}`)

    // Create repository on GitHub
    const response = await fetch('https://api.github.com/user/repos', {
      method: 'POST',
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: repoName,
        private: false,
        auto_init: true,
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('GitHub API error:', responseData)
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `GitHub API error: ${responseData.message}` 
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: response.status,
        },
      )
    }

    console.log('Repository created successfully:', responseData.html_url)

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { 
          html_url: responseData.html_url,
          clone_url: responseData.clone_url,
        }
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    console.error('Error creating repository:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})