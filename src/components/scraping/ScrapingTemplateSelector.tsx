import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrapingTemplate } from "@/types/scraping";

interface ScrapingTemplateSelectorProps {
  templates: ScrapingTemplate[];
  selectedTemplate: string;
  onTemplateChange: (value: string) => void;
}

export const ScrapingTemplateSelector = ({
  templates,
  selectedTemplate,
  onTemplateChange,
}: ScrapingTemplateSelectorProps) => {
  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Content Template</label>
      <Select value={selectedTemplate} onValueChange={onTemplateChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedTemplateData && (
        <p className="text-sm text-muted-foreground mt-1">
          {selectedTemplateData.instruction}
        </p>
      )}
    </div>
  );
};