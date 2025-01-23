import { supabase } from "@/integrations/supabase/client";
import { Note } from "@/types/notes";
import { ScrapeOptions, ScrapeResult } from "@/types/scraping";

export const scraping = {
  async scrapeContent(url: string, options: ScrapeOptions): Promise<ScrapeResult> {
    console.log('Initiating scrape request:', { url, options });
    
    const { data, error } = await supabase.functions.invoke('scrape', {
      body: {
        url,
        searchQuery: options.search_query,
        customInstruction: options.instruction,
        semantic_filter: options.semantic_filter
      }
    });

    if (error) {
      console.error('Scraping failed:', error);
      throw new Error('Failed to scrape content: ' + error.message);
    }

    return {
      markdown: data.content,
      extracted_content: data.content,
      metadata: {
        title: data.title,
        images: [data.screenshot]
      },
      screenshot: data.screenshot,
      topic_classification: data.topic_classification
    };
  },

  async createNoteFromScrape(url: string, options: ScrapeOptions): Promise<Note> {
    console.log('Creating note from scrape:', { url, options });
    
    const { data: note, error: createError } = await supabase
      .from('notes')
      .insert([{
        title: 'Scraping in progress...',
        content: 'Content is being scraped...',
        source_url: url,
        status: 'pending',
        obsidian_path: options.obsidian_path
      }])
      .select()
      .single();

    if (createError) throw createError;

    try {
      const scrapeResult = await this.scrapeContent(url, options);
      
      const { data: updatedNote, error: updateError } = await supabase
        .from('notes')
        .update({
          title: scrapeResult.metadata.title || url,
          content: scrapeResult.markdown,
          tags: ['scraped', options.media_folder?.replace('-', '_')],
          status: 'completed',
          ai_processed_content: scrapeResult.markdown,
          template_used: options.media_folder,
          topic_classification: scrapeResult.topic_classification
        })
        .eq('id', note.id)
        .select()
        .single();

      if (updateError) throw updateError;
      return updatedNote;
    } catch (error) {
      const { data: errorNote } = await supabase
        .from('notes')
        .update({
          status: 'error',
          error_message: error.message
        })
        .eq('id', note.id)
        .select()
        .single();

      throw error;
    }
  }
};