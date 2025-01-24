import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ContentGenerator() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Content Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Generate Content For:</p>
          <div className="flex gap-4">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Blog Post
            </Button>
            <Button variant="outline">Social Media</Button>
            <Button variant="outline">Property Listing</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}