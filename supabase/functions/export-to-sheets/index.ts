import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const { type } = await req.json()
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    let data;
    switch(type) {
      case 'companies':
        const { data: companies } = await supabaseClient
          .from('companies')
          .select('*')
        data = companies
        break
      case 'contacts':
        const { data: contacts } = await supabaseClient
          .from('contacts')
          .select('*, companies(name)')
        data = contacts
        break
      case 'deals':
        const { data: deals } = await supabaseClient
          .from('deals')
          .select('*, companies(name)')
        data = deals
        break
      default:
        throw new Error('Invalid export type')
    }

    // Format data for Google Sheets
    const sheetsData = formatDataForSheets(data, type)
    
    // Create or update Google Sheet
    const sheetId = await createOrUpdateSheet(type, sheetsData)
    
    return new Response(
      JSON.stringify({ success: true, sheetId }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})

function formatDataForSheets(data: any[], type: string) {
  if (!data || data.length === 0) return []
  
  // Define headers based on type
  const headers = Object.keys(data[0]).filter(key => 
    !['id', 'created_at', 'updated_at', 'created_by'].includes(key)
  )
  
  // Format data rows
  const rows = data.map(item => 
    headers.map(header => {
      if (header.includes('companies')) {
        return item.companies?.name || ''
      }
      return item[header] || ''
    })
  )
  
  return [headers, ...rows]
}

async function createOrUpdateSheet(type: string, data: any[][]) {
  const SHEETS_API_KEY = Deno.env.get('GOOGLE_SHEETS_API_KEY')
  const date = new Date().toISOString().split('T')[0]
  const title = `CRM Export - ${type} - ${date}`
  
  // Create new sheet
  const createResponse = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets?key=${SHEETS_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: { title },
        sheets: [{ data: [{ rowData: data.map(row => ({ values: row.map(cell => ({ userEnteredValue: { stringValue: String(cell) } })) })) }] }]
      })
    }
  )
  
  const { spreadsheetId } = await createResponse.json()
  return spreadsheetId
}