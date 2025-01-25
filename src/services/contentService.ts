import { supabase } from "@/integrations/supabase/client"
import { ContentGenerationParams, Website, ContentScheduleEntry } from "@/types/content"

export const contentService = {
  async generateContent(params: ContentGenerationParams) {
    console.log('Generating content with parameters:', params)
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: params
      })

      if (error) throw error
      return data
    } catch (error) {
      console.error('Error generating content:', error)
      throw error
    }
  },

  async fetchWebsites(): Promise<Website[]> {
    console.log('Fetching websites')
    
    try {
      const { data, error } = await supabase
        .from('websites')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      
      return (data || []).map(site => ({
        ...site,
        theme_settings: site.theme_settings || {
          fonts: { body: "Inter", heading: "Inter" },
          colors: { accent: "#0ea5e9", primary: "#0f172a", secondary: "#64748b" },
          layout: "default"
        }
      })) as Website[]
    } catch (error) {
      console.error('Error fetching websites:', error)
      throw error
    }
  },

  async fetchSchedule(): Promise<ContentScheduleEntry[]> {
    console.log('Fetching content schedule')
    
    try {
      const { data, error } = await supabase
        .from('content_schedule')
        .select('*')
        .order('time', { ascending: true })

      if (error) throw error
      
      return (data || []).map(entry => ({
        ...entry,
        status: entry.status as ContentScheduleEntry['status']
      }))
    } catch (error) {
      console.error('Error fetching schedule:', error)
      throw error
    }
  }
}