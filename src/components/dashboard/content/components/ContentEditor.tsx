import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor"
import { Save, History, FileText } from "lucide-react"
import { HistorySection } from "./HistorySection"

interface ContentEditorProps {
  content: string
  onChange: (content: string) => void
  onSave: () => void
  saving: boolean
}

export const ContentEditor = ({ 
  content, 
  onChange, 
  onSave, 
  saving 
}: ContentEditorProps) => {
  const handleEditHistory = (contentId: string) => {
    console.log("Editing content with id:", contentId)
    // Here you would implement loading the historical content into the editor
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Editor</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs defaultValue="editor" className="w-full">
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="space-y-4">
            <div className="min-h-[500px] border rounded-lg p-4">
              <WebsiteEditor 
                content={content} 
                onChange={onChange}
              />
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {content.length} characters
              </div>
              <Button 
                onClick={onSave}
                disabled={saving}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="h-[500px] flex items-center justify-center text-muted-foreground">
              Templates feature coming soon
            </div>
          </TabsContent>

          <TabsContent value="history">
            <HistorySection onEdit={handleEditHistory} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}