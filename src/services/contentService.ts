import { supabase } from "@/integrations/supabase/client"
import { ContentGenerationParams, Website, ContentScheduleEntry } from "@/types/content"
import { toast } from "@/hooks/use-toast"

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
        status: site.status as "draft" | "published" | "archived"
      }))
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
        status: entry.status as "published" | "scheduled" | "failed"
      }))
    } catch (error) {
      console.error('Error fetching schedule:', error)
      throw error
    }
  },

  async saveSettings(userId: string, settings: any) {
    console.log('Saving user settings:', settings)
    
    try {
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: userId,
          content_settings: settings
        })

      if (error) throw error
      toast({
        title: "Settings Saved",
        description: "Your preferences have been updated successfully."
      })
    } catch (error) {
      console.error('Error saving settings:', error)
      throw error
    }
  }
}