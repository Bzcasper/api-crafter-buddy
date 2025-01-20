import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { notesService } from "@/services/notesService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrapingTemplate } from "@/types/scraping";

const SCRAPING_TEMPLATES: ScrapingTemplate[] = [
  {
    id: "blog",
    name: "Blog Post",
    semantic_filter: "blog content, article",
    instruction: "Extract main article content and format as a blog post",
    media_folder: "blog-images",
    output_format: "markdown"
  },
  {
    id: "research",
    name: "Research Notes",
    semantic_filter: "academic, research, technical",
    instruction: "Extract key findings, methodology, and conclusions",
    media_folder: "research-materials",
    output_format: "markdown"
  },
  {
    id: "product",
    name: "Product Review",
    semantic_filter: "product features, specifications, reviews",
    instruction: "Extract product details, features, and user reviews",
    media_folder: "product-images",
    output_format: "markdown"
  }
];

export const ScrapingForm = () => {
  const [url, setUrl] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [customInstruction, setCustomInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Starting scrape with template:', selectedTemplate);
      const template = SCRAPING_TEMPLATES.find(t => t.id === selectedTemplate);
      
      if (!template) {
        throw new Error("Please select a template");
      }

      const note = await notesService.createNoteFromScrape(url, {
        semantic_filter: template.semantic_filter,
        instruction: customInstruction || template.instruction,
        screenshot: true,
        media_folder: template.media_folder,
      });

      toast({
        title: "Content scraped successfully",
        description: "A new note has been created with the scraped content",
      });

      setUrl("");
      setCustomInstruction("");
    } catch (error) {
      console.error('Scraping error:', error);
      toast({
        title: "Error",
        description: "Failed to scrape content: " + (error instanceof Error ? error.message : "Unknown error"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Web Scraping</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleScrape} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL to Scrape</label>
            <Input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Scraping Template</label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {SCRAPING_TEMPLATES.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Instructions (Optional)</label>
            <Textarea
              value={customInstruction}
              onChange={(e) => setCustomInstruction(e.target.value)}
              placeholder="Override template instructions with custom ones"
            />
          </div>

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Scraping..." : "Scrape Content"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};