import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"

export const ContentStudio = () => {
  const [content, setContent] = useState("")
  const { toast } = useToast()
  const [selectedPage, setSelectedPage] = useState("home")
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    try {
      setSaving(true)
      
      // Get current user session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user?.id) {
        throw new Error("You must be logged in to save content")
      }

      // Save to website_pages table
      const { error } = await supabase
        .from('website_pages')
        .upsert({
          website_id: "placeholder", // This should be the actual website ID
          title: selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1),
          slug: selectedPage,
          content: content,
          is_published: false
        })

      if (error) throw error

      toast({
        title: "Success",
        description: "Content saved successfully"
      })

    } catch (error) {
      console.error('Error saving content:', error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Content Studio</CardTitle>
          <Button 
            onClick={handleSave}
            disabled={saving}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="home" className="space-y-4">
            <TabsList>
              <TabsTrigger 
                value="home"
                onClick={() => setSelectedPage("home")}
              >
                Home
              </TabsTrigger>
              <TabsTrigger 
                value="about"
                onClick={() => setSelectedPage("about")}
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="blog"
                onClick={() => setSelectedPage("blog")}
              >
                Blog
              </TabsTrigger>
              <TabsTrigger 
                value="contact"
                onClick={() => setSelectedPage("contact")}
              >
                Contact
              </TabsTrigger>
            </TabsList>

            <TabsContent value="home" className="space-y-4">
              <WebsiteEditor 
                content={content} 
                onChange={setContent}
              />
            </TabsContent>
            <TabsContent value="about" className="space-y-4">
              <WebsiteEditor 
                content={content} 
                onChange={setContent}
              />
            </TabsContent>
            <TabsContent value="blog" className="space-y-4">
              <WebsiteEditor 
                content={content} 
                onChange={setContent}
              />
            </TabsContent>
            <TabsContent value="contact" className="space-y-4">
              <WebsiteEditor 
                content={content} 
                onChange={setContent}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}