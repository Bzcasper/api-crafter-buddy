import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save } from "lucide-react"
import { useParams } from "react-router-dom"

export const ContentStudio = () => {
  const [content, setContent] = useState("")
  const { toast } = useToast()
  const [selectedPage, setSelectedPage] = useState("home")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [websiteId, setWebsiteId] = useState<string | null>(null)

  // Load website ID and initial content
  useEffect(() => {
    const loadWebsite = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user?.id) {
          throw new Error("You must be logged in")
        }

        // Get the first website for now (you can add website selection later)
        const { data: websites, error: websiteError } = await supabase
          .from('websites')
          .select('id')
          .eq('created_by', session.user.id)
          .limit(1)
          .single()

        if (websiteError) throw websiteError

        if (websites) {
          setWebsiteId(websites.id)
          await loadPageContent(websites.id, selectedPage)
        }
      } catch (error) {
        console.error('Error loading website:', error)
        toast({
          title: "Error",
          description: "Failed to load website content",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    loadWebsite()
  }, [])

  // Load content when page changes
  const loadPageContent = async (websiteId: string, page: string) => {
    try {
      const { data, error } = await supabase
        .from('website_pages')
        .select('content')
        .eq('website_id', websiteId)
        .eq('slug', page)
        .single()

      if (error) throw error

      if (data) {
        setContent(data.content || '')
      } else {
        setContent('') // New page, start with empty content
      }
    } catch (error) {
      console.error('Error loading page content:', error)
      toast({
        title: "Error",
        description: "Failed to load page content",
        variant: "destructive"
      })
    }
  }

  const handlePageChange = async (page: string) => {
    setSelectedPage(page)
    if (websiteId) {
      await loadPageContent(websiteId, page)
    }
  }

  const handleSave = async () => {
    if (!websiteId) {
      toast({
        title: "Error",
        description: "No website selected",
        variant: "destructive"
      })
      return
    }

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
          website_id: websiteId,
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

  if (loading) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            Loading website content...
          </CardContent>
        </Card>
      </div>
    )
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
                onClick={() => handlePageChange("home")}
              >
                Home
              </TabsTrigger>
              <TabsTrigger 
                value="about"
                onClick={() => handlePageChange("about")}
              >
                About
              </TabsTrigger>
              <TabsTrigger 
                value="blog"
                onClick={() => handlePageChange("blog")}
              >
                Blog
              </TabsTrigger>
              <TabsTrigger 
                value="contact"
                onClick={() => handlePageChange("contact")}
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