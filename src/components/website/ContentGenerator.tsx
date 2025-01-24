import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, MessageSquare, Home } from "lucide-react"

// Content Generator Components
const BlogPostGenerator = () => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle className="text-lg">Blog Post Generator</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Content Strategy</h3>
          <input
            type="text"
            placeholder="Topic Research"
            className="w-full rounded-md border p-2"
          />
          <input
            type="text"
            placeholder="Target Audience"
            className="w-full rounded-md border p-2"
          />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">SEO Optimization</h3>
          <input
            type="text"
            placeholder="Primary Keyword"
            className="w-full rounded-md border p-2"
          />
          <input
            type="text"
            placeholder="Secondary Keywords"
            className="w-full rounded-md border p-2"
          />
          <textarea
            placeholder="Meta Description"
            className="w-full rounded-md border p-2"
            rows={3}
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

const SocialMediaGenerator = () => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle className="text-lg">Social Media Generator</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">Instagram</Button>
          <Button variant="outline" className="flex-1">Twitter</Button>
          <Button variant="outline" className="flex-1">LinkedIn</Button>
          <Button variant="outline" className="flex-1">Facebook</Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Post Configuration</h3>
          <select className="w-full rounded-md border p-2">
            <option>Content Type (Photo/Story/Reel)</option>
          </select>
          <input
            type="text"
            placeholder="Caption Style"
            className="w-full rounded-md border p-2"
          />
          <input
            type="text"
            placeholder="Hashtag Strategy"
            className="w-full rounded-md border p-2"
          />
          <input
            type="text"
            placeholder="Call to Action"
            className="w-full rounded-md border p-2"
          />
        </div>
      </div>
    </CardContent>
  </Card>
)

const PropertyListingGenerator = () => (
  <Card className="mt-4">
    <CardHeader>
      <CardTitle className="text-lg">Property Listing Generator</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Property Details</h3>
            <input
              type="text"
              placeholder="Property Type"
              className="w-full rounded-md border p-2"
            />
            <input
              type="text"
              placeholder="Price Range"
              className="w-full rounded-md border p-2"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full rounded-md border p-2"
            />
            <textarea
              placeholder="Key Features"
              className="w-full rounded-md border p-2"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Market Intelligence</h3>
            <input
              type="text"
              placeholder="Market Trends"
              className="w-full rounded-md border p-2"
            />
            <textarea
              placeholder="Comparable Properties"
              className="w-full rounded-md border p-2"
              rows={3}
            />
            <div className="rounded-md border p-2 space-y-1">
              <p className="text-sm text-gray-600">Performance Metrics</p>
              <p className="text-xs text-gray-500">Views: 2.4K</p>
              <p className="text-xs text-gray-500">Engagement Rate: 8.3%</p>
              <p className="text-xs text-gray-500">Lead Generation: +15%</p>
              <p className="text-xs text-gray-500">Market Match: 92%</p>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

export function ContentGenerator() {
  const [activeGenerator, setActiveGenerator] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Content Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Generate Content For:</p>
          <div className="flex gap-4">
            <Button
              variant={activeGenerator === 'blog' ? 'default' : 'outline'}
              className={activeGenerator === 'blog' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              onClick={() => setActiveGenerator(activeGenerator === 'blog' ? null : 'blog')}
            >
              <FileText className="mr-2" />
              Blog Post
            </Button>
            <Button
              variant={activeGenerator === 'social' ? 'default' : 'outline'}
              onClick={() => setActiveGenerator(activeGenerator === 'social' ? null : 'social')}
            >
              <MessageSquare className="mr-2" />
              Social Media
            </Button>
            <Button
              variant={activeGenerator === 'property' ? 'default' : 'outline'}
              onClick={() => setActiveGenerator(activeGenerator === 'property' ? null : 'property')}
            >
              <Home className="mr-2" />
              Property Listing
            </Button>
          </div>
          
          {activeGenerator === 'blog' && <BlogPostGenerator />}
          {activeGenerator === 'social' && <SocialMediaGenerator />}
          {activeGenerator === 'property' && <PropertyListingGenerator />}
        </div>
      </CardContent>
    </Card>
  )
}