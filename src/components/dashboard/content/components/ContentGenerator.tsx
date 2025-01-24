import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ContentControls } from "../ContentControls"
import { Button } from "@/components/ui/button"
import { Wand2, History, FileText } from "lucide-react"

export const ContentGenerator = () => {
  const [content, setContent] = useState("")

  const handleControlChange = (type: string, value: number) => {
    console.log(`${type} changed to ${value}`)
  }

  return (
    <Card className="bg-card">
      <CardContent className="pt-6">
        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="generator" className="gap-2">
              <Wand2 className="h-4 w-4" />
              Generator
            </TabsTrigger>
            <TabsTrigger value="templates" className="gap-2">
              <FileText className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <ContentControls onControlChange={handleControlChange} />
            
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Generated Content</h3>
              <div className="min-h-[300px] p-4 rounded-lg border bg-background">
                {content || "Your generated content will appear here..."}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="text-center text-muted-foreground py-8">
              Templates feature coming soon
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="text-center text-muted-foreground py-8">
              History feature coming soon
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}