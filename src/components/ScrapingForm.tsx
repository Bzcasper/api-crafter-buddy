import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { notesService } from "@/services/notesService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const ScrapingForm = () => {
  const [url, setUrl] = useState("");
  const [semanticFilter, setSemanticFilter] = useState("");
  const [instruction, setInstruction] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Starting scrape for URL:', url);
      const note = await notesService.createNoteFromScrape(url, {
        semantic_filter: semanticFilter || undefined,
        instruction: instruction || undefined,
        screenshot: true,
      });

      toast({
        title: "Content scraped successfully",
        description: "A new note has been created with the scraped content",
      });

      setUrl("");
      setSemanticFilter("");
      setInstruction("");
    } catch (error) {
      console.error('Scraping error:', error);
      toast({
        title: "Error",
        description: "Failed to scrape content: " + error.message,
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
            <label className="text-sm font-medium">Semantic Filter (Optional)</label>
            <Input
              value={semanticFilter}
              onChange={(e) => setSemanticFilter(e.target.value)}
              placeholder="e.g., financial news, technology updates"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Custom Instructions (Optional)</label>
            <Textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="e.g., Extract main article content and translate to French"
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