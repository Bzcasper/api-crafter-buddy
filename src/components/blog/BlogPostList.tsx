import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const samplePosts = [
  {
    id: 1,
    title: "Understanding Real Estate Market Cycles",
    excerpt: "Learn about the four phases of real estate market cycles and how to identify them.",
    author: "Jane Smith",
    date: "2024-02-20",
    category: "Market Analysis"
  },
  {
    id: 2,
    title: "Top 5 Property Investment Strategies for 2024",
    excerpt: "Discover the most effective property investment strategies in today's market.",
    author: "John Doe",
    date: "2024-02-19",
    category: "Investment"
  },
  {
    id: 3,
    title: "How to Spot Undervalued Properties",
    excerpt: "Expert tips on identifying and evaluating undervalued properties in any market.",
    author: "Mike Johnson",
    date: "2024-02-18",
    category: "Tips & Tricks"
  }
];

export const BlogPostList = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {samplePosts.map(post => (
        <Card key={post.id} className="flex flex-col">
          <CardHeader>
            <div className="text-sm text-muted-foreground mb-2">{post.category}</div>
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <p className="text-muted-foreground mb-4 flex-1">
              {post.excerpt}
            </p>
            <div className="flex justify-between items-center mt-auto">
              <div className="text-sm">
                <p className="font-medium">{post.author}</p>
                <p className="text-muted-foreground">
                  {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
              <Button variant="ghost" size="sm">
                Read More <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};