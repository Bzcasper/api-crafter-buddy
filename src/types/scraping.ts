export interface ScrapingTemplate {
  id: string;
  name: string;
  semantic_filter?: string;
  instruction?: string;
  media_folder?: string;
  output_format: 'markdown' | 'html';
}

export interface ScrapeOptions {
  semantic_filter?: string;
  instruction?: string;
  screenshot?: boolean;
  media_folder?: string;
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