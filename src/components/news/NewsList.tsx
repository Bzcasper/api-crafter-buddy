import { NewsArticle } from "@/services/newsService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface NewsListProps {
  articles: NewsArticle[];
}

export const NewsList = ({ articles }: NewsListProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <Card key={index} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg">{article.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p className="text-muted-foreground mb-4 flex-1">
              {article.description}
            </p>
            <div className="flex justify-between items-center mt-auto">
              <span className="text-sm text-muted-foreground">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(article.url, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Read More
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};