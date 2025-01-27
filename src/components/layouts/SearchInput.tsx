import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function SearchInput({ isOpen, onToggle }: SearchInputProps) {
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={onToggle}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
      <div
        className={cn(
          "absolute left-0 top-0 w-full md:relative md:block",
          isOpen ? "block" : "hidden"
        )}
      >
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-8 md:w-[200px] lg:w-[300px]"
          />
        </div>
      </div>
    </div>
  );
}