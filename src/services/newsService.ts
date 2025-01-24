import { supabase } from "@/integrations/supabase/client";

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export const newsService = {
  async fetchRealEstateNews(): Promise<NewsArticle[]> {
    console.log('Fetching real estate news');
    
    const { data, error } = await supabase.functions.invoke('fetch-news', {
      body: { query: 'real estate market' }
    });

    if (error) {
      console.error('Error fetching news:', error);
      throw error;
    }

    return data.articles;
  }
};