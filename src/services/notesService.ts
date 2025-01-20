import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

interface ScrapeOptions {
  urls: string[]
  extraction_strategy?: "CosineStrategy" | "LLMExtractionStrategy"
  semantic_filter?: string
  instruction?: string
  screenshot?: boolean
  css_selector?: string
}

export const notesService = {
  async createNote(title: string, content: string, tags: string[] = []) {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, tags }])
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async getNotes() {
    const { data, error } = await supabase
      .from('notes')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  },

  async updateNote(id: string, updates: Partial<{ title: string; content: string; tags: string[] }>) {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async deleteNote(id: string) {
    const { data, error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async scrapeContent(options: ScrapeOptions) {
    console.log('Initiating scrape request with options:', options);
    
    const { data: { url: functionUrl }, error: functionError } = await supabase
      .functions.invoke('scrape', {
        body: {
          urls: options.urls,
          extraction_strategy: options.extraction_strategy || "CosineStrategy",
          extraction_strategy_args: {
            semantic_filter: options.semantic_filter,
            instruction: options.instruction,
          },
          screenshot: options.screenshot,
          css_selector: options.css_selector,
        },
      });

    if (functionError) {
      console.error('Error calling scrape function:', functionError);
      throw functionError;
    }

    console.log('Scrape completed successfully:', data);
    return data;
  },

  async createNoteFromScrape(url: string, options: Partial<ScrapeOptions> = {}) {
    const scrapeResult = await this.scrapeContent({
      urls: [url],
      ...options,
    });

    const note = await this.createNote(
      scrapeResult.metadata?.title || url,
      scrapeResult.markdown || scrapeResult.extracted_content,
      ['scraped']
    );

    return note;
  }
};
