import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ScrapingFormInputsProps {
  url: string;
  searchQuery: string;
  customInstruction: string;
  onUrlChange: (value: string) => void;
  onSearchQueryChange: (value: string) => void;
  onCustomInstructionChange: (value: string) => void;
}

export const ScrapingFormInputs = ({
  url,
  searchQuery,
  customInstruction,
  onUrlChange,
  onSearchQueryChange,
  onCustomInstructionChange,
}: ScrapingFormInputsProps) => {
  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-medium">URL to Scrape</label>
        <Input
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="https://example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Search Query (Optional)</label>
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          placeholder="Enter search terms to focus the scraping"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Custom Instructions (Optional)</label>
        <Textarea
          value={customInstruction}
          onChange={(e) => onCustomInstructionChange(e.target.value)}
          placeholder="Override template instructions with custom ones"
        />
      </div>
    </>
  );
};