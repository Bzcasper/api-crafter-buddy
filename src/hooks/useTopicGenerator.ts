// src/hooks/useTopicGenerator.ts
import { useState, useEffect, useCallback } from "react";
import type { Template } from "@/types/content";

interface UseTopicGeneratorReturn {
  trendingTopics: string[];
  seoOpportunities: string[];
  contentIdeas: string[];
  isLoading: boolean;
  error: string | null;
  fetchTopics: (input: string) => void;
}

export const useTopicGenerator = (): UseTopicGeneratorReturn => {
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [seoOpportunities, setSeoOpportunities] = useState<string[]>([]);
  const [contentIdeas, setContentIdeas] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate API calls with mock data
  const fetchTrendingTopics = async (input: string): Promise<string[]> => {
    // Replace this with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          `${input} Trends 2025`,
          `${input} Innovations`,
          `${input} Statistics`,
          `${input} Insights`,
          `${input} Future`,
        ]);
      }, 1000);
    });
  };

  const fetchSEOOpportunities = async (input: string): Promise<string[]> => {
    // Replace this with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          `Best SEO Practices for ${input}`,
          `${input} SEO Strategies`,
          `${input} Keyword Research`,
          `Optimizing ${input} Content`,
          `SEO Tools for ${input}`,
        ]);
      }, 1000);
    });
  };

  const fetchContentIdeas = async (input: string): Promise<string[]> => {
    // Replace this with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          `How to Master ${input}`,
          `10 Tips for ${input} Success`,
          `${input} Best Practices`,
          `Beginner's Guide to ${input}`,
          `Advanced Techniques in ${input}`,
        ]);
      }, 1000);
    });
  };

  const fetchTopics = useCallback(async (input: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const [trending, seo, ideas] = await Promise.all([
        fetchTrendingTopics(input),
        fetchSEOOpportunities(input),
        fetchContentIdeas(input),
      ]);
      setTrendingTopics(trending);
      setSeoOpportunities(seo);
      setContentIdeas(ideas);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch topics. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch with a default input if necessary
    // fetchTopics("Technology");
  }, [fetchTopics]);

  return {
    trendingTopics,
    seoOpportunities,
    contentIdeas,
    isLoading,
    error,
    fetchTopics,
  };
};
