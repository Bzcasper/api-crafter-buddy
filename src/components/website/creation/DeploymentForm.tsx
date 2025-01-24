import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DeploymentSettings } from "./DeploymentSettings"

interface DeploymentFormProps {
  onGitHubConnect: (repoName: string) => Promise<void>;
  onNetlifyConnect: (siteName: string) => Promise<void>;
  onBack: () => void;
  onSubmit: () => void;
}

export const DeploymentForm = ({
  onGitHubConnect,
  onNetlifyConnect,
  onBack,
  onSubmit,
}: DeploymentFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deployment Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <DeploymentSettings 
          onGitHubConnect={onGitHubConnect}
          onNetlifyConnect={onNetlifyConnect}
        />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Back to Details
          </Button>
          <Button onClick={onSubmit}>
            Create Website
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}