import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { WebsiteTemplates } from "./templates/WebsiteTemplates"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

export const WebsiteCreationForm = () => {
  const [step, setStep] = useState<'template' | 'details'>('template')
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [title, setTitle] = useState("")
  const [domain, setDomain] = useState("")
  const { toast } = useToast()

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setStep('details')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Get the current user's session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      
      if (!session?.user?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to create a website.",
          variant: "destructive"
        })
        return
      }

      const { data: website, error } = await supabase
        .from('websites')
        .insert({
          title,
          domain,
          template: selectedTemplate,
          settings: {},
          status: 'draft',
          created_by: session.user.id // Include the user ID here
        })
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Website Created",
        description: "Your website has been created successfully."
      })

      // Reset form
      setTitle("")
      setDomain("")
      setSelectedTemplate("")
      setStep('template')
    } catch (error) {
      console.error('Error creating website:', error)
      toast({
        title: "Error",
        description: "Failed to create website. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (step === 'template') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Choose a Template</CardTitle>
        </CardHeader>
        <CardContent>
          <WebsiteTemplates onSelect={handleTemplateSelect} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Website Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Website"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="domain">Custom Domain (Optional)</Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="www.mywebsite.com"
            />
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => setStep('template')}>
              Back to Templates
            </Button>
            <Button type="submit">
              Create Website
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}