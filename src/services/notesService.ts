import { createClient } from '@supabase/supabase-js';
import { Note } from '@/types/notes';
import { ScrapingTemplate, ScrapeOptions, ScrapeResult } from '@/types/scraping';

console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error('Supabase credentials are missing. Please connect to Supabase in the project settings.');
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const CRAWL4AI_URL = "https://crawl4ai.com/crawl";

export const notesService = {
  async createNote(title: string, content: string, tags: string[] = []): Promise<Note> {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, tags }])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  },

  async getNotes(): Promise<Note[]> {
    const { data, error } = await supabase
      .from('notes')
      .select('*');

    if (error) {
      throw error;
    }

    return data;
  },

  async scrapeContent(url: string, options: ScrapeOptions): Promise<ScrapeResult> {
    console.log('Initiating scrape request:', { url, options });
    
    const response = await fetch(CRAWL4AI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        urls: [url],
        extraction_strategy: "CosineStrategy",
        extraction_strategy_args: {
          semantic_filter: options.semantic_filter,
          instruction: options.instruction,
          search_query: options.search_query
        },
        screenshot: options.screenshot,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to scrape content');
    }

    const result = await response.json();
    console.log('Scrape completed:', result);

    return {
      markdown: result.results[0].markdown,
      extracted_content: result.results[0].extracted_content,
      metadata: result.results[0].metadata,
      screenshot: result.results[0].screenshot,
    };
  },

  async createNoteFromScrape(url: string, options: ScrapeOptions): Promise<Note> {
    const scrapeResult = await this.scrapeContent(url, options);
    
    // Create a note with the scraped content
    const note = await this.createNote(
      scrapeResult.metadata.title || url,
      scrapeResult.markdown,
      ['scraped', options.media_folder?.replace('-', '_')]
    );

    return note;
  }
};