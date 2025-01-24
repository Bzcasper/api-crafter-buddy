import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { WebsiteTemplates } from "./templates/WebsiteTemplates"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { BasicDetailsForm } from "./creation/BasicDetailsForm"
import { DeploymentSettings } from "./creation/DeploymentSettings"

export const WebsiteCreationForm = () => {
  const [step, setStep] = useState<'template' | 'details' | 'deployment'>('template')
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

  const handleGitHubConnect = async (repoName: string) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      
      if (!session?.user?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to connect to GitHub.",
          variant: "destructive"
        })
        return
      }

      const { data, error } = await supabase.functions.invoke('github-create-repo', {
        body: { repoName }
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "GitHub repository created successfully!"
      })

      // Move to next step or complete the process
      handleSubmit()
    } catch (error) {
      console.error('Error connecting to GitHub:', error)
      toast({
        title: "Error",
        description: "Failed to create GitHub repository. Please try again.",
        variant: "destructive"
      })
    }
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

  const handleSubmit = async () => {
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

  const renderStep = () => {
    switch (step) {
      case 'template':
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
      case 'details':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Website Details</CardTitle>
            </CardHeader>
            <CardContent>
              <BasicDetailsForm
                title={title}
                setTitle={setTitle}
                domain={domain}
                setDomain={setDomain}
                font={font}
                setFont={setFont}
                primaryColor={primaryColor}
                setPrimaryColor={setPrimaryColor}
                favicon={favicon}
                setFavicon={setFavicon}
              />
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep('template')}>
                  Back to Templates
                </Button>
                <Button onClick={() => setStep('deployment')}>
                  Next: Deployment
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      case 'deployment':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Deployment Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <DeploymentSettings onGitHubConnect={handleGitHubConnect} />
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep('details')}>
                  Back to Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )
    }
  }

  return renderStep()
}