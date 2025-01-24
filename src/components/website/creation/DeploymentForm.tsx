import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { DeploymentSettings } from "./DeploymentSettings"
import { useWebsiteCreation } from "./WebsiteCreationContext"
import { uploadFavicon, createWebsite } from "@/services/websiteService"

export const DeploymentForm = () => {
  const { state, setStep } = useWebsiteCreation()
  const { toast } = useToast()

  if (state.step !== 'deployment') return null

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

      return data
    } catch (error) {
      console.error('Error connecting to GitHub:', error)
      toast({
        title: "Error",
        description: "Failed to create GitHub repository. Please try again.",
        variant: "destructive"
      })
      throw error
    }
  }

  const handleNetlifyConnect = async (siteName: string) => {
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError) throw sessionError
      
      if (!session?.user?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to deploy to Netlify.",
          variant: "destructive"
        })
        return
      }

      const { data, error } = await supabase.functions.invoke('netlify-create-site', {
        body: { siteName }
      })

      if (error) throw error

      toast({
        title: "Success",
        description: "Netlify site created successfully!"
      })

      return data
    } catch (error) {
      console.error('Error connecting to Netlify:', error)
      toast({
        title: "Error",
        description: "Failed to create Netlify site. Please try again.",
        variant: "destructive"
      })
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
      if (state.favicon) {
        faviconUrl = await uploadFavicon(state.favicon)
      }

      await createWebsite({
        title: state.title,
        domain: state.domain,
        template: state.selectedTemplate,
        settings: {
          colors: {
            primary: state.primaryColor,
          },
          fonts: {
            heading: state.font,
            body: state.font
          }
        },
        faviconUrl,
        userId: session.user.id
      })

      toast({
        title: "Website Created",
        description: "Your website has been created successfully."
      })

      // Reset form by refreshing the page
      window.location.reload()
    } catch (error) {
      console.error('Error creating website:', error)
      toast({
        title: "Error",
        description: "Failed to create website. Please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-6">
      <DeploymentSettings 
        onGitHubConnect={handleGitHubConnect}
        onNetlifyConnect={handleNetlifyConnect}
      />
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('details')}>
          Back to Details
        </Button>
        <Button onClick={handleSubmit}>
          Create Website
        </Button>
      </div>
    </div>
  )
}