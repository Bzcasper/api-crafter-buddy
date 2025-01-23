import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ScrapingProgressProps {
  isLoading: boolean;
  progress: number;
  error: string | null;
}

export const ScrapingProgress = ({ isLoading, progress, error }: ScrapingProgressProps) => {
  if (!isLoading && !error) return null;

  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-center text-muted-foreground">
            {progress < 100 ? "Scraping content..." : "Processing results..."}
          </p>
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};