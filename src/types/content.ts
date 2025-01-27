export type Platform = {
  id: string;
  name: string;
  isActive: boolean;
};

export type Template = {
  id: string;
  title: string;
  description: string;
  content: string;
};

export type Website = {
  id: string;
  title: string;
  domain?: string;
  template: string;
  settings?: Record<string, any>;
  status?: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  favicon_url?: string;
  theme_settings?: {
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

export type GenerateContentResponse = {
  content: string;
  metadata?: Record<string, any>;
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

export type DeploymentSettingsType = {
  title: string;
  domain: string;
  selectedTemplate: string;
  favicon: File | null;
  primaryColor: string;
  font: string;
};