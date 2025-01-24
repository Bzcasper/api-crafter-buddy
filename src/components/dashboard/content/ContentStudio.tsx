import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WebsiteEditor } from "@/components/website/editor/WebsiteEditor"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, Wand2, History, FileText } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { ContentControls } from "./ContentControls"
import { ContentSchedule } from "./ContentSchedule"
import { PerformanceInsights } from "./PerformanceInsights"

export const ContentStudio = () => {
  const [content, setContent] = useState("")
  const { toast } = useToast()
  const [selectedPage, setSelectedPage] = useState("home")
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [websiteId, setWebsiteId] = useState<string | null>(null)
  const navigate = useNavigate()

  // Load website ID and initial content
  useEffect(() => {
    const loadWebsite = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.user?.id) {
          throw new Error("You must be logged in")
        }

        // Get the first website for now (you can add website selection later)
        const { data: website, error: websiteError } = await supabase
          .from('websites')
          .select('id')
          .eq('created_by', session.user.id)
          .limit(1)
          .maybeSingle()

        if (websiteError) throw websiteError

        if (website) {
          setWebsiteId(website.id)
          await loadPageContent(website.id, selectedPage)
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
        .maybeSingle()

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
      
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user?.id) {
        throw new Error("You must be logged in to save content")
      }

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

  const handleControlChange = (type: string, value: number) => {
    console.log(`${type} changed to ${value}`)
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

  if (!websiteId) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <h3 className="text-lg font-semibold mb-4">No Website Found</h3>
            <p className="text-muted-foreground mb-6">
              You need to create a website before you can start editing content.
            </p>
            <Button 
              onClick={() => navigate('/dashboard/websites/new')}
              variant="default"
              className="gap-2"
            >
              Create New Website
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">AI Content Studio</h1>
        <div className="flex gap-2">
          <Button variant="default" className="gap-2">
            Schedule Post
          </Button>
          <Button variant="outline" className="gap-2">
            AI Active
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <Tabs defaultValue="generator" className="space-y-6">
                <TabsList>
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

                <TabsContent value="generator">
                  <div className="space-y-6">
                    <ContentControls onControlChange={handleControlChange} />
                    
                    <div className="border rounded-lg p-4 min-h-[300px] bg-background">
                      <WebsiteEditor 
                        content={content} 
                        onChange={setContent}
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        onClick={handleSave}
                        disabled={saving}
                        className="gap-2"
                      >
                        <Save className="h-4 w-4" />
                        Save Changes
                      </Button>
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <ContentSchedule />
          <PerformanceInsights />
        </div>
      </div>
    </div>
  )
}
