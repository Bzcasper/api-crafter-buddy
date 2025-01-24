import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    const apiKey = Deno.env.get('NEWS_API_KEY');
    
    if (!apiKey) {
      throw new Error('NEWS_API_KEY is not set');
    }

    console.log('Fetching news for query:', query);
    
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&language=en&pageSize=9`,
      {
        headers: {
          'X-Api-Key': apiKey,
        },
      }
    );

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch news');
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in fetch-news function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});