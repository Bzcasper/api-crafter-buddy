export type Platform = {
  id: string;
  name: string;
  isActive: boolean;
};

export type ContentGenerationParams = {
  model: string;
  website: string;
  topic: string;
  prompt: string;
  parameters: {
    creativity: number;
    length: number;
    tone: number;
  };
  platforms: Platform[];
};

export type Website = {
  id: string;
  title: string;
  domain?: string | null;
  template: string;
  settings: Record<string, any>;
  status?: string;
  created_at: string;
  updated_at: string;
  last_published_at?: string | null;
  analytics_id?: string | null;
  favicon_url?: string | null;
  theme_settings: {
    fonts: {
      body: string;
      heading: string;
    };
    colors: {
      accent: string;
      primary: string;
      secondary: string;
    };
    layout: string;
  };
  created_by: string;
};

export type ContentScheduleEntry = {
  id: string;
  title: string;
  time: string;
  platform: string;
  status: 'scheduled' | 'published' | 'failed';
  created_at: string;
  created_by: string;
};