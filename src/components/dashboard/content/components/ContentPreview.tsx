import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor"

interface ContentPreviewProps {
  content: string
  onChange: (content: string) => void
}

export const ContentPreview = ({ content, onChange }: ContentPreviewProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <WebsiteEditor 
          content={content}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  )
}