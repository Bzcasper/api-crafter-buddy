import { supabase } from "@/integrations/supabase/client";

export interface ContentGenerationParams {
  topic: string;
  content: string;
}

export const contentService = {
  async generateContent({ topic, content }: ContentGenerationParams) {
    console.log('Generating content with Perplexity:', { topic });
    
    const { data, error } = await supabase.functions.invoke('perplexity', {
      body: { topic, content }
    });

    if (error) {
      console.error('Error generating content:', error);
      throw error;
    }

    return data;
  },

  async saveGeneratedContent(content: any) {
    console.log('Saving generated content');
    
    const { data, error } = await supabase
      .from('notes')
      .insert([{
        title: content.title || 'Generated Content',
        content: content.text,
        tags: content.tags || [],
        status: 'completed',
        topic_classification: content.topic
      }])
      .select()
      .single();

    if (error) {
      console.error('Error saving content:', error);
      throw error;
    }

    return data;
  }
};