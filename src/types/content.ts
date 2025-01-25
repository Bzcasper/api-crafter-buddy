export interface ContentGenerationParams {
  model: string;
  website: string;
  parameters: {
    creativity: number;
    length: number;
    tone: number;
  };
  platforms: Platform[];
  topic?: string;
  content?: string;
}

export interface Platform {
  id: string;
  name: string;
  icon?: string;
  isActive: boolean;
}

export interface Website {
  id: string;
  title: string;
  domain?: string;
  status: 'draft' | 'published' | 'archived';
  favicon_url?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  template: string;
  settings?: Record<string, any>;
  theme_settings?: Record<string, any>;
}

export interface ContentScheduleEntry {
  id: string;
  title: string;
  time: string;
  platform: string;
  status: 'scheduled' | 'published' | 'failed';
  created_at: string;
  created_by: string;
}