import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { WebsiteTemplates } from "./templates/WebsiteTemplates"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const WebsiteCreationForm = () => {
  const [step, setStep] = useState<'template' | 'details'>('template')
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [title, setTitle] = useState("")
  const [domain, setDomain] = useState("")
  const [favicon, setFavicon] = useState<File | null>(null)
  const [primaryColor, setPrimaryColor] = useState("#0f172a")
  const [font, setFont] = useState("Inter")
  const { toast } = useToast()

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setStep('details')
  }

  const handleFaviconUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const filePath = `favicons/${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('website-assets')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      return filePath
    } catch (error) {
      console.error('Error uploading favicon:', error)
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
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

      let faviconUrl = null
      if (favicon) {
        faviconUrl = await handleFaviconUpload(favicon)
      }

      const { data: website, error } = await supabase
        .from('websites')
        .insert({
          title,
          domain,
          template: selectedTemplate,
          settings: {
            colors: {
              primary: primaryColor,
            },
            fonts: {
              heading: font,
              body: font
            }
          },
          favicon_url: faviconUrl,
          status: 'draft',
          created_by: session.user.id
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
      setFavicon(null)
      setPrimaryColor("#0f172a")
      setFont("Inter")
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

          <div className="space-y-2">
            <Label htmlFor="favicon">Favicon</Label>
            <Input
              id="favicon"
              type="file"
              accept="image/*"
              onChange={(e) => setFavicon(e.target.files?.[0] || null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <Input
              id="primaryColor"
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="font">Font Family</Label>
            <Select value={font} onValueChange={setFont}>
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Inter">Inter</SelectItem>
                <SelectItem value="Roboto">Roboto</SelectItem>
                <SelectItem value="Open Sans">Open Sans</SelectItem>
                <SelectItem value="Montserrat">Montserrat</SelectItem>
              </SelectContent>
            </Select>
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