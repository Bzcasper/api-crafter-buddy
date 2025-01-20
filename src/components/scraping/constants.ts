import { ScrapingTemplate } from "@/types/scraping";

export const SCRAPING_TEMPLATES: ScrapingTemplate[] = [
  {
    id: "blog",
    name: "Blog Post",
    semantic_filter: "blog content, article",
    instruction: "Extract main article content and format as a blog post with proper headings and sections",
    media_folder: "blog-images",
    output_format: "markdown"
  },
  {
    id: "research",
    name: "Research Notes",
    semantic_filter: "academic, research, technical",
    instruction: "Extract key findings, methodology, and conclusions. Format with proper citations and references",
    media_folder: "research-materials",
    output_format: "markdown"
  },
  {
    id: "product",
    name: "Product Review",
    semantic_filter: "product features, specifications, reviews",
    instruction: "Extract product details, features, and user reviews. Format as a comprehensive review",
    media_folder: "product-images",
    output_format: "markdown"
  },
  {
    id: "affiliate",
    name: "Affiliate Content",
    semantic_filter: "product comparisons, buying guides",
    instruction: "Extract product comparisons and buying recommendations. Format for affiliate marketing",
    media_folder: "affiliate-content",
    output_format: "markdown"
  }
];