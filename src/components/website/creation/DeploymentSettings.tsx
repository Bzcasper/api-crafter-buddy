import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Github } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DeploymentSettingsProps {
  onGitHubConnect: (repoName: string) => void;
}

export const DeploymentSettings = ({ onGitHubConnect }: DeploymentSettingsProps) => {
  const [repoName, setRepoName] = useState("")
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
    onGitHubConnect(repoName)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="github-repo">GitHub Repository Name</Label>
        <div className="flex gap-2">
          <Input
            id="github-repo"
            value={repoName}
            onChange={(e) => setRepoName(e.target.value)}
            placeholder="my-website"
          />
          <Button onClick={handleGitHubConnect} className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            Connect
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Enter a name for your new GitHub repository. We'll create it for you.
        </p>
      </div>
    </div>
  )
}