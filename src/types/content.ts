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
}

export interface Platform {
  id: string;
  name: string;
  icon?: string;
  isActive: boolean;
}

export interface WebsiteData {
  id: string;
  title: string;
  domain?: string;
  status: 'connected' | 'not_connected';
  favicon_url?: string;
}

export interface ContentScheduleEntry {
  id: string;
  title: string;
  time: string;
  platform: string;
  status: 'scheduled' | 'published' | 'failed';
}