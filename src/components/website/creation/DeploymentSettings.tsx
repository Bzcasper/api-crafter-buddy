import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Github, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DeploymentSettingsProps {
  onGitHubConnect: (repoName: string) => Promise<void>;
  onNetlifyConnect: (siteName: string) => Promise<void>;
}

export const DeploymentSettings = ({ onGitHubConnect, onNetlifyConnect }: DeploymentSettingsProps) => {
  const [repoName, setRepoName] = useState("")
  const [siteName, setSiteName] = useState("")
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentStep, setDeploymentStep] = useState<'github' | 'netlify' | 'complete'>('github')
  const { toast } = useToast()

  const handleGitHubConnect = async () => {
    if (!repoName) {
      toast({
        title: "Error",
        description: "Please enter a repository name",
        variant: "destructive"
      })
      return
    }

    setIsDeploying(true)
    try {
      await onGitHubConnect(repoName)
      toast({
        title: "Success",
        description: "GitHub repository created successfully!"
      })
      setDeploymentStep('netlify')
    } catch (error) {
      console.error('Error connecting to GitHub:', error)
      toast({
        title: "Error",
        description: "Failed to create GitHub repository",
        variant: "destructive"
      })
    } finally {
      setIsDeploying(false)
    }
  }

  const handleNetlifyConnect = async () => {
    if (!siteName) {
      toast({
        title: "Error",
        description: "Please enter a site name",
        variant: "destructive"
      })
      return
    }

    setIsDeploying(true)
    try {
      await onNetlifyConnect(siteName)
      toast({
        title: "Success",
        description: "Netlify site created and connected successfully!"
      })
      setDeploymentStep('complete')
    } catch (error) {
      console.error('Error connecting to Netlify:', error)
      toast({
        title: "Error",
        description: "Failed to create Netlify site",
        variant: "destructive"
      })
    } finally {
      setIsDeploying(false)
    }
  }

  return (
    <div className="space-y-6">
      {deploymentStep === 'github' && (
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              First, let's create a GitHub repository for your website
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Label htmlFor="github-repo">GitHub Repository Name</Label>
            <div className="flex gap-2">
              <Input
                id="github-repo"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                placeholder="my-website"
                disabled={isDeploying}
              />
              <Button 
                onClick={handleGitHubConnect} 
                disabled={isDeploying}
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                Connect
              </Button>
            </div>
          </div>
        </div>
      )}

      {deploymentStep === 'netlify' && (
        <div className="space-y-4">
          <Alert>
            <AlertDescription>
              Great! Now let's set up your Netlify deployment
            </AlertDescription>
          </Alert>
          <div className="space-y-2">
            <Label htmlFor="netlify-site">Netlify Site Name</Label>
            <div className="flex gap-2">
              <Input
                id="netlify-site"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="my-website"
                disabled={isDeploying}
              />
              <Button 
                onClick={handleNetlifyConnect}
                disabled={isDeploying}
                className="flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                Deploy
              </Button>
            </div>
          </div>
        </div>
      )}

      {deploymentStep === 'complete' && (
        <Alert>
          <AlertDescription className="text-green-600">
            🎉 Congratulations! Your website is now connected to GitHub and Netlify
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}