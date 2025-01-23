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
  obsidian_path?: string;
  onImageProgress?: (total: number, processed: number) => void;
}

export interface ScrapeResult {
  markdown: string;
  extracted_content: string;
  metadata: {
    title: string;
    images?: string[];
  };
  screenshot?: string;
  topic_classification?: string;
}

export interface ImageMetadata {
  id: string;
  note_id: string;
  storage_path: string;
  original_url: string;
  filename: string;
  mime_type: string;
  size_bytes: number;
  width?: number;
  height?: number;
  compression_quality?: number;
  created_at: string;
  metadata: Record<string, any>;
}