import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { notesService } from "@/services/notesService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrapingTemplateSelector } from "./scraping/ScrapingTemplateSelector";
import { ScrapingFormInputs } from "./scraping/ScrapingFormInputs";
import { SCRAPING_TEMPLATES } from "./scraping/constants";

export const ScrapingForm = () => {
  const [url, setUrl] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
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
        search_query: searchQuery
      });

      toast({
        title: "Content scraped successfully",
        description: "A new note has been created with the scraped content",
      });

      setUrl("");
      setSearchQuery("");
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
        <CardTitle>Content Scraping Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleScrape} className="space-y-4">
          <ScrapingFormInputs
            url={url}
            searchQuery={searchQuery}
            customInstruction={customInstruction}
            onUrlChange={setUrl}
            onSearchQueryChange={setSearchQuery}
            onCustomInstructionChange={setCustomInstruction}
          />
          
          <ScrapingTemplateSelector
            templates={SCRAPING_TEMPLATES}
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Scraping..." : "Generate Content"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};