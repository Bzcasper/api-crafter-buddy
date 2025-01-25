// src/hooks/useTemplates.ts
import { useState, useEffect, useCallback } from "react";
import type { Template } from "@/types/content";

interface UseTemplatesReturn {
  templates: Template[];
  addTemplate: (template: Omit<Template, "id">) => void;
  deleteTemplate: (id: string) => void;
  updateTemplate: (updatedTemplate: Template) => void;
}

export const useTemplates = (): UseTemplatesReturn => {
  const [templates, setTemplates] = useState<Template[]>([]);

  // Load templates from localStorage on mount
  useEffect(() => {
    const storedTemplates = localStorage.getItem("templates");
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates));
    } else {
      // Initialize with mockTemplates if no templates are stored
      setTemplates(mockTemplates);
    }
  }, []);

  // Save templates to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("templates", JSON.stringify(templates));
  }, [templates]);

  const addTemplate = useCallback((template: Omit<Template, "id">) => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      ...template,
    };
    setTemplates((prev) => [...prev, newTemplate]);
  }, []);

  const deleteTemplate = useCallback((id: string) => {
    setTemplates((prev) => prev.filter((template) => template.id !== id));
  }, []);

  const updateTemplate = useCallback((updatedTemplate: Template) => {
    setTemplates((prev) =>
      prev.map((template) => (template.id === updatedTemplate.id ? updatedTemplate : template))
    );
  }, []);

  return { templates, addTemplate, deleteTemplate, updateTemplate };
};

// Mock templates defined here or imported from another module
const mockTemplates: Template[] = [
  {
    id: "1",
    title: "Top 10 List",
    description: "Create an engaging countdown of the best items in your chosen category",
    content: "# [Topic] Top 10\n\n1. [Item 1]\n2. [Item 2]\n...\n\nConclusion",
  },
  {
    id: "2",
    title: "Step-by-Step Guide",
    description: "Write a detailed tutorial with clear instructions",
    content: "# How to [Action]\n\n## Prerequisites\n\n## Steps\n\n1. First step\n2. Second step\n...\n\n## Conclusion",
  },
  {
    id: "3",
    title: "Product Review",
    description: "Generate a comprehensive product review with pros and cons",
    content: "# [Product Name] Review\n\n## Overview\n\n## Features\n\n## Pros\n\n## Cons\n\n## Verdict",
  },
];
