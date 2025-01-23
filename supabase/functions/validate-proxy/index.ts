import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    const { proxy } = await req.json();
    console.log('Validating proxy:', proxy);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    try {
      const start = Date.now();
      const proxyUrl = `http://${proxy.ip}:${proxy.port}`;
      console.log('Using proxy URL:', proxyUrl);

      const response = await fetch('https://api.ipify.org?format=json', {
        signal: controller.signal,
        headers: {
          'User-Agent': proxy.userAgent
        },
        // Configure the proxy
        client: {
          proxy: proxyUrl
        }
      });

      clearTimeout(timeoutId);
      const responseTime = Date.now() - start;

      if (!response.ok) {
        console.log('Proxy validation failed - bad response:', response.status);
        throw new Error(`Invalid response: ${response.status}`);
      }

      const data = await response.json();
      console.log('Proxy validation response:', data);

      const isValid = response.ok && responseTime < 10000;
      console.log(`Proxy validation result: ${isValid} (${responseTime}ms)`);

      return new Response(
        JSON.stringify({ 
          isValid,
          responseTime,
          proxyIp: data.ip,
          message: isValid ? 'Proxy validated successfully' : 'Proxy validation failed'
        }),
        {
          headers: corsHeaders,
          status: 200
        }
      );
    } catch (error) {
      console.error('Proxy validation error:', error);
      return new Response(
        JSON.stringify({ 
          isValid: false,
          error: error.message,
          message: 'Proxy validation failed'
        }),
        {
          headers: corsHeaders,
          status: 200
        }
      );
    }
  } catch (error) {
    console.error('Request processing error:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        message: 'Failed to process request'
      }),
      {
        headers: corsHeaders,
        status: 400
      }
    );
  }
});