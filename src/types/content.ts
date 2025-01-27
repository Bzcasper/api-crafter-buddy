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

export type GenerateContentResponse = {
  content: string;
  metadata?: Record<string, any>;
};

export type DeploymentSettingsType = {
  title: string;
  domain: string;
  selectedTemplate: string;
  favicon: File | null;
  primaryColor: string;
  font: string;
};