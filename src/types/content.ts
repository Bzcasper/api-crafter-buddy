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
  domain?: string | null;
  template: string;
  settings: Record<string, any>;
  status: "draft" | "published" | "archived";
  created_at: string;
  updated_at: string;
  created_by: string;
  analytics_id?: string | null;
  favicon_url?: string | null;
  last_published_at?: string | null;
  theme_settings: Record<string, any>;
}

export interface ContentScheduleEntry {
  id: string;
  title: string;
  time: string;
  platform: string;
  status: "published" | "scheduled" | "failed";
  created_at: string;
  created_by: string;
}