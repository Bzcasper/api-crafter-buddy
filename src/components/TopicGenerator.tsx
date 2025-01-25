// src/components/TopicGenerator.tsx
import { useState, useCallback, useMemo, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner"; // Assuming you have a Spinner component
import { useToast } from "@/hooks/use-toast";
import { FileText, Eye, PlusCircle, RefreshCw, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { useTopicGenerator } from "@/hooks/useTopicGenerator";
import debounce from "lodash.debounce";

export const TopicGenerator: React.FC = () => {
  const {
    trendingTopics,
    seoOpportunities,
    contentIdeas,
    isLoading,
    error,
    fetchTopics,
  } = useTopicGenerator();
  const [input, setInput] = useState<string>("");
  const { toast } = useToast();

  // Debounced fetchTopics to optimize performance
  const debouncedFetchTopics = useMemo(
    () =>
      debounce((value: string) => {
        if (value.trim()) {
          fetchTopics(value.trim());
        }
      }, 500),
    [fetchTopics]
  );

  useEffect(() => {
    debouncedFetchTopics(input);
    return () => {
      debouncedFetchTopics.cancel();
    };
  }, [input, debouncedFetchTopics]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInput(e.target.value);
    },
    []
  );

  const handleClearInput = useCallback(() => {
    setInput("");
  }, []);

  const handleManualRefresh = useCallback(() => {
    if (input.trim()) {
      fetchTopics(input.trim());
      toast({
        title: "Topics Refreshed",
        description: "Successfully refreshed the topics.",
      });
    } else {
      toast({
        title: "Input Required",
        description: "Please enter a topic to refresh.",
        variant: "destructive",
      });
    }
  }, [input, fetchTopics, toast]);

  const renderContent = useCallback(
    (title: string, items: string[]) => (
      <Card className="bg-muted/10">
        <CardHeader>
          <CardTitle className="text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] overflow-y-auto">
          {items.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-sm">No data available.</p>
          )}
        </CardContent>
      </Card>
    ),
    []
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Topic Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row items-center gap-2">
          <Label htmlFor="topic-input" className="sr-only">
            Topic Input
          </Label>
          <Input
            id="topic-input"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter topic or get AI suggestions..."
            className="flex-1"
            aria-label="Topic Input"
          />
          {input && (
            <Button
              variant="ghost"
              onClick={handleClearInput}
              aria-label="Clear Input"
              className="text-red-500 hover:bg-red-100"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            onClick={handleManualRefresh}
            disabled={!input.trim()}
            aria-label="Refresh Topics"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center my-4">
            <Spinner />
            <span className="ml-2">Loading topics...</span>
          </div>
        )}

        {error && (
          <div className="flex items-center text-red-500 my-4">
            <X className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {renderContent("Trending Topics", trendingTopics)}
            {renderContent("SEO Opportunities", seoOpportunities)}
            {renderContent("Content Ideas", contentIdeas)}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
