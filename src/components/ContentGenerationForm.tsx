import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import type { ContentGenerationParams } from "@/types/content";

export const ContentGenerationForm = () => {
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [creativity, setCreativity] = useState(50);
  const [length, setLength] = useState(50);
  const [tone, setTone] = useState(50);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProgress(25);

    try {
      const params: ContentGenerationParams = {
        model,
        topic,
        prompt,
        parameters: {
          creativity,
          length,
          tone
        },
        platforms: ["facebook", "twitter", "instagram"]
      };

      const { data, error } = await supabase.functions.invoke('generate-content', {
        body: params
      });

      if (error) throw error;
      
      setProgress(100);
      
      toast({
        title: "Content generated successfully",
        description: "The content has been generated and saved",
      });

      // Reset form
      setTopic("");
      setPrompt("");
      setCreativity(50);
      setLength(50);
      setTone(50);
    } catch (error) {
      console.error('Content generation error:', error);
      toast({
        title: "Error",
        description: "Failed to generate content: " + (error instanceof Error ? error.message : "Unknown error"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
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
            <label className="text-sm font-medium">AI Model</label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o">GPT-4 Turbo (Best quality)</SelectItem>
                <SelectItem value="gpt-4o-mini">GPT-4 Mini (Fast)</SelectItem>
                <SelectItem value="perplexity">Perplexity AI (Experimental)</SelectItem>
              </SelectContent>
            </Select>
          </div>

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

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Creativity Level</label>
              <Slider
                value={[creativity]}
                onValueChange={(value) => setCreativity(value[0])}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Conservative</span>
                <span>Creative</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content Length</label>
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Concise</span>
                <span>Detailed</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tone</label>
              <Slider
                value={[tone]}
                onValueChange={(value) => setTone(value[0])}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Casual</span>
                <span>Professional</span>
              </div>
            </div>
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