import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const TopicGenerator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Topic Generation</CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
          placeholder="Enter topic or get AI suggestions..."
          className="mb-4"
        />
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-muted/10">
            <CardHeader>
              <CardTitle className="text-sm">Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              {/* Trending topics will be populated here */}
            </CardContent>
          </Card>
          <Card className="bg-muted/10">
            <CardHeader>
              <CardTitle className="text-sm">SEO Opportunities</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              {/* SEO opportunities will be populated here */}
            </CardContent>
          </Card>
          <Card className="bg-muted/10">
            <CardHeader>
              <CardTitle className="text-sm">Content Ideas</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              {/* AI content ideas will be populated here */}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}