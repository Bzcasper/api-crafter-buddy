export interface Note {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  created_at: string;
  updated_at: string;
  source_url?: string;
  status?: string;
  error_message?: string;
}