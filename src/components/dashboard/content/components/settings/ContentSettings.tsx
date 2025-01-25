import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const ContentSettings = () => {
  const contentTypes = ["Article", "Social Post", "Newsletter"];
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Default Content Settings</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              {contentTypes.map((type) => (
                <Button
                  key={type}
                  variant={type === "Article" ? "default" : "outline"}
                  size="sm"
                  className={type === "Article" ? "bg-pink-500 hover:bg-pink-600" : ""}
                >
                  {type}
                </Button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Default Length: Medium</p>
                <p className="text-sm text-muted-foreground">800-1200 words</p>
              </div>
              <div>
                <p className="font-medium">Tone: Professional</p>
                <p className="text-sm text-muted-foreground">Business-focused</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Brand Guidelines</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Brand Voice</h4>
                <div className="space-y-2 text-sm">
                  <p>Keywords: innovative, professional, expert</p>
                  <p>Avoid: technical jargon, casual language</p>
                  <p>Style Guide: AP Style</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Media Settings</h3>
            <div className="space-y-2 text-sm">
              <p>Default Image Size: 1200x630px</p>
              <p>Auto Image Generation: Enabled</p>
              <p>Image Style: Modern, Minimal</p>
              <p>Video Thumbnails: Auto-generate</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">SEO Configuration</h3>
          <div className="space-y-2 text-sm">
            <p>Default Meta Description Length: 155 chars</p>
            <p>Title Format: {`{Title} | {Brand} - {Category}`}</p>
            <p>Focus Keywords: AI, Content Creation, Technology</p>
            <p>Auto Tag Generation: Enabled</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};