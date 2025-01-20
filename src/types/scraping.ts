export interface ScrapingTemplate {
  id: string;
  name: string;
  semantic_filter?: string;
  instruction?: string;
  media_folder?: string;
  output_format: 'markdown' | 'html';
  search_query?: string;
}

export interface ScrapeOptions {
  semantic_filter?: string;
  instruction?: string;
  screenshot?: boolean;
  media_folder?: string;
  search_query?: string;
}

export interface ScrapeResult {
  markdown: string;
  extracted_content: string;
  metadata: {
    title: string;
    images?: string[];
  };
  screenshot?: string;
}