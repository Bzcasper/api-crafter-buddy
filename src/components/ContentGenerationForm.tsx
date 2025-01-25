import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { ContentGenerationParams, Platform, Website } from "@/types/content";

export const ContentGenerationForm = () => {
  const [topic, setTopic] = useState("");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [selectedWebsite, setSelectedWebsite] = useState("");
  const [websites, setWebsites] = useState<Website[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingWebsites, setIsFetchingWebsites] = useState(true);
  const [progress, setProgress] = useState(0);
  const [creativity, setCreativity] = useState(50);
  const [length, setLength] = useState(50);
  const [tone, setTone] = useState(50);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const defaultPlatforms: Platform[] = [
    { id: "facebook", name: "Facebook", isActive: true },
    { id: "twitter", name: "Twitter", isActive: true },
    { id: "instagram", name: "Instagram", isActive: true }
  ];

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      console.log('Fetching websites...');
      const { data: websitesData, error: websitesError } = await supabase
        .from('websites')
        .select('*');

      if (websitesError) throw websitesError;

      if (websitesData) {
        console.log('Websites fetched:', websitesData);
        // Parse the JSON data before setting it to state
        const parsedWebsites: Website[] = websitesData.map(site => ({
          ...site,
          settings: typeof site.settings === 'string' ? JSON.parse(site.settings) : site.settings,
          theme_settings: typeof site.theme_settings === 'string' 
            ? JSON.parse(site.theme_settings) 
            : site.theme_settings
        }));
        setWebsites(parsedWebsites);
        if (parsedWebsites.length > 0) {
          setSelectedWebsite(parsedWebsites[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching websites:', error);
      setError('Failed to fetch websites. Please try again later.');
      toast({
        title: "Error",
        description: "Failed to fetch websites",
        variant: "destructive",
      });
    } finally {
      setIsFetchingWebsites(false);
    }
  };

  const validateForm = (): boolean => {
    if (!selectedWebsite) {
      setError('Please select a website');
      return false;
    }
    if (!topic.trim()) {
      setError('Please enter a topic');
      return false;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setProgress(25);
    setError(null);

    try {
      console.log('Generating content with params:', {
        model,
        website: selectedWebsite,
        topic,
        prompt,
        parameters: { creativity, length, tone }
      });

      const params: ContentGenerationParams = {
        model,
        website: selectedWebsite,
        topic,
        prompt,
        parameters: {
          creativity,
          length,
          tone
        },
        platforms: defaultPlatforms.filter(p => p.isActive)
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
      setError('Failed to generate content. Please try again.');
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

  if (isFetchingWebsites) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <p>Loading websites...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Content Generation</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Website</label>
            <Select 
              value={selectedWebsite} 
              onValueChange={setSelectedWebsite}
              disabled={websites.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Website" />
              </SelectTrigger>
              <SelectContent>
                {websites.map((website) => (
                  <SelectItem key={website.id} value={website.id}>
                    {website.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {websites.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No websites available. Please create a website first.
              </p>
            )}
          </div>

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

          <Button 
            type="submit" 
            disabled={isLoading || websites.length === 0} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Content'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};