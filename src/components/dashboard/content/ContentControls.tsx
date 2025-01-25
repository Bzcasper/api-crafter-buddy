// src/components/ContentControls.tsx
import { useState, useCallback, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2, Eye, Save, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contentService } from "@/services/contentService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor";
import { usePlatforms } from "@/hooks/usePlatforms";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { Textarea } from "@/components/ui/textarea"; // Assuming you have a Textarea component
import debounce from "lodash.debounce";
import type { Platform, GenerateContentResponse } from "@/types/content";

interface ContentControlsProps {
  onControlChange: (type: string, value: number) => void;
  selectedModel: string;
  selectedWebsite: string;
}

export const ContentControls: React.FC<ContentControlsProps> = ({
  onControlChange,
  selectedModel,
  selectedWebsite,
}) => {
  // Combined parameters state
  const [parameters, setParameters] = useState({
    creativity: 50,
    length: 50,
    tone: 50,
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [prompt, setPrompt] = useState<string>("");

  const initialPlatforms: Platform[] = useMemo(
    () => [
      { id: "facebook", name: "Facebook", isActive: true },
      { id: "instagram", name: "Instagram", isActive: true },
      { id: "twitter", name: "Twitter", isActive: true },
      { id: "pinterest", name: "Pinterest", isActive: false },
      { id: "ebay", name: "eBay", isActive: false },
    ],
    []
  );

  const { selectedPlatforms, togglePlatform } = usePlatforms({ initialPlatforms });
  const { toast } = useToast();

  // Debounced control change to optimize performance
  const debouncedControlChange = useMemo(
    () =>
      debounce((type: string, value: number) => {
        onControlChange(type, value);
      }, 300),
    [onControlChange]
  );

  const handleParameterChange = useCallback(
    (type: string, value: number) => {
      setParameters((prev) => ({ ...prev, [type]: value }));
      debouncedControlChange(type, value);
    },
    [debouncedControlChange]
  );

  const handlePresetClick = useCallback(
    (preset: string) => {
      setActivePreset(preset);
      const presets: Record<string, { creativity: number; length: number; tone: number }> = {
        professional: { creativity: 30, length: 70, tone: 80 },
        casual: { creativity: 60, length: 40, tone: 30 },
        fun: { creativity: 90, length: 50, tone: 20 },
      };
      const selectedPreset = presets[preset];
      if (selectedPreset) {
        setParameters(selectedPreset);
        Object.entries(selectedPreset).forEach(([key, value]) => {
          onControlChange(key, value);
        });
      }
    },
    [onControlChange]
  );

  const validateInputs = useCallback((): boolean => {
    if (!selectedModel) {
      toast({
        title: "Model Required",
        description: "Please select an AI model before generating content.",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedWebsite) {
      toast({
        title: "Website Required",
        description: "Please select a website before generating content.",
        variant: "destructive",
      });
      return false;
    }
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic for content generation.",
        variant: "destructive",
      });
      return false;
    }
    if (!prompt.trim()) {
      toast({
        title: "Prompt Required",
        description: "Please enter a prompt for content generation.",
        variant: "destructive",
      });
      return false;
    }
    if (!selectedPlatforms.some((p) => p.isActive)) {
      toast({
        title: "Platform Required",
        description: "Please select at least one platform for content generation.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  }, [selectedModel, selectedWebsite, topic, prompt, selectedPlatforms, toast]);

  const handleGenerateContent = useCallback(async (): Promise<void> => {
    if (!validateInputs()) return;

    setIsGenerating(true);
    try {
      const result: GenerateContentResponse = await contentService.generateContent({
        model: selectedModel,
        website: selectedWebsite,
        topic,
        prompt,
        parameters,
        platforms: selectedPlatforms.filter((p) => p.isActive),
      });

      setGeneratedContent(result.content);
      toast({
        title: "Content Generated",
        description: "Your content has been generated successfully.",
      });
    } catch (error: any) {
      console.error("Error generating content:", error);
      const message =
        error.response?.data?.message || "Failed to generate content. Please try again.";
      toast({
        title: "Generation Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  }, [validateInputs, contentService, selectedModel, selectedWebsite, topic, prompt, parameters, selectedPlatforms, toast]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([generatedContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated-content.txt";
    link.click();
    URL.revokeObjectURL(url);
  }, [generatedContent]);

  const platformButtons = useMemo(
    () =>
      selectedPlatforms.map((platform) => (
        <Button
          key={platform.id}
          variant={platform.isActive ? "default" : "outline"}
          size="sm"
          onClick={() => togglePlatform(platform.id)}
          className={platform.isActive ? "bg-pink-500 hover:bg-pink-600" : ""}
          aria-pressed={platform.isActive}
          aria-label={`Toggle ${platform.name}`}
        >
          {platform.name}
        </Button>
      )),
    [selectedPlatforms, togglePlatform]
  );

  const presetButtons = useMemo(
    () =>
      ["professional", "casual", "fun"].map((preset) => (
        <Button
          key={preset}
          variant={activePreset === preset ? "default" : "outline"}
          size="sm"
          className={`flex-1 min-w-[100px] ${
            activePreset === preset ? "bg-pink-500 hover:bg-pink-600" : ""
          }`}
          onClick={() => handlePresetClick(preset)}
          aria-pressed={activePreset === preset}
          aria-label={`Select ${preset} preset`}
        >
          {preset.charAt(0).toUpperCase() + preset.slice(1)}
        </Button>
      )),
    [activePreset, handlePresetClick]
  );

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl">Content Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Platforms Selection */}
        <div className="space-y-2">
          <label htmlFor="platforms" className="text-sm font-medium text-muted-foreground">
            Selected Platforms
          </label>
          <div className="flex flex-wrap gap-2" id="platforms">
            {platformButtons}
          </div>
        </div>

        {/* Topic Input */}
        <div className="space-y-2">
          <label htmlFor="topic" className="text-sm font-medium text-muted-foreground">
            Topic
          </label>
          <Input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter the topic"
            required
            aria-required="true"
          />
        </div>

        {/* Prompt Input */}
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium text-muted-foreground">
            Prompt
          </label>
          <Textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter the prompt"
            required
            aria-required="true"
          />
        </div>

        {/* Sliders */}
        {["creativity", "length", "tone"].map((type) => (
          <div className="space-y-2" key={type}>
            <label htmlFor={`${type}-slider`} className="text-sm font-medium text-muted-foreground">
              {`${type.charAt(0).toUpperCase() + type.slice(1)} Level`}
            </label>
            <Slider
              id={`${type}-slider`}
              value={[parameters[type as keyof typeof parameters]]}
              max={100}
              step={1}
              onValueChange={(value) => handleParameterChange(type, value[0])}
              className="w-full"
              aria-label={`${type} slider`}
            />
          </div>
        ))}

        {/* Style Presets */}
        <div className="space-y-2">
          <label htmlFor="style-presets" className="text-sm font-medium text-muted-foreground">
            Style Presets
          </label>
          <div className="flex flex-wrap gap-2" id="style-presets">
            {presetButtons}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="flex-1 gap-2"
            size="lg"
            onClick={handleGenerateContent}
            disabled={isGenerating}
            aria-label="Generate Content"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )}
            {isGenerating ? "Generating..." : "Generate Content"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsPreviewOpen(true)}
            disabled={!generatedContent}
            aria-label="Preview Content"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={handleDownload}
            disabled={!generatedContent}
            aria-label="Download Content"
          >
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
        </div>
      </CardContent>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Content Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <WebsiteEditor content={generatedContent} onChange={() => {}} />
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
