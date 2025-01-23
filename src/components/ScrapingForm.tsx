import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { notesService } from "@/services/notesService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrapingTemplateSelector } from "./scraping/ScrapingTemplateSelector";
import { ScrapingFormInputs } from "./scraping/ScrapingFormInputs";
import { SCRAPING_TEMPLATES } from "./scraping/constants";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ProxyManager } from "@/utils/proxyManager";

export const ScrapingForm = () => {
  const [url, setUrl] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [customInstruction, setCustomInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeProxy = async () => {
      try {
        await ProxyManager.initialize();
        console.log('Proxy system initialized');
      } catch (error) {
        console.error('Failed to initialize proxy system:', error);
        toast({
          title: "Warning",
          description: "Proxy system initialization failed. Falling back to direct connections.",
          variant: "destructive",
        });
      }
    };

    initializeProxy();
  }, []);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setProgress(0);

    try {
      console.log('Starting scrape with template:', selectedTemplate);
      const template = SCRAPING_TEMPLATES.find(t => t.id === selectedTemplate);
      
      if (!template) {
        throw new Error("Please select a template");
      }

      setProgress(25);

      const note = await notesService.createNoteFromScrape(url, {
        semantic_filter: template.semantic_filter,
        instruction: customInstruction || template.instruction,
        screenshot: true,
        media_folder: template.media_folder,
        search_query: searchQuery
      });

      setProgress(100);

      toast({
        title: "Content scraped successfully",
        description: "A new note has been created with the scraped content",
      });

      setUrl("");
      setSearchQuery("");
      setCustomInstruction("");
    } catch (error) {
      console.error('Scraping error:', error);
      setError(error instanceof Error ? error.message : "Unknown error");
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

          {isLoading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                {progress < 100 ? "Scraping content..." : "Processing results..."}
              </p>
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Scraping..." : "Generate Content"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};