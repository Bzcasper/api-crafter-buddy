import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contentService } from "@/services/contentService";
import { Progress } from "@/components/ui/progress";

export const ContentGenerationForm = () => {
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(25);

    try {
      const generatedContent = await contentService.generateContent({
        topic,
        content: prompt
      });

      setProgress(75);

      await contentService.saveGeneratedContent({
        title: topic,
        text: generatedContent.choices[0].message.content,
        topic,
        tags: ['generated', topic.toLowerCase()]
      });

      setProgress(100);

      toast({
        title: "Content generated successfully",
        description: "The content has been saved to your notes",
      });

      setTopic("");
      setPrompt("");
    } catch (error) {
      console.error('Content generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate content: " + (error instanceof Error ? error.message : "Unknown error"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Content Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Topic</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Real Estate, Technology, Health"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Content Prompt</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what content you want to generate..."
              required
            />
          </div>

          {isLoading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                {progress < 100 ? "Generating content..." : "Saving content..."}
              </p>
            </div>
          )}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Generating..." : "Generate Content"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};