import { FC, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Globe } from "lucide-react";

interface DeploymentSettingsProps {
  onGitHubConnect: () => void;
  onNetlifyConnect: () => void;
  repoName: string;
  setRepoName: (name: string) => void;
  siteName: string;
  setSiteName: (name: string) => void;
  isDeploying: boolean;
}

export const DeploymentSettings: FC<DeploymentSettingsProps> = ({
  onGitHubConnect,
  onNetlifyConnect,
  repoName,
  setRepoName,
  siteName,
  setSiteName,
  isDeploying,
}) => {
  const handleRepoNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepoName(e.target.value);
  };

  const handleSiteNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSiteName(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* GitHub Deployment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Deploy to GitHub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-name">Repository Name</Label>
              <Input
                id="repo-name"
                value={repoName}
                onChange={handleRepoNameChange}
                placeholder="e.g., my-awesome-repo"
                aria-required="true"
              />
            </div>
            <Button
              onClick={onGitHubConnect}
              disabled={isDeploying}
              className="w-full"
              aria-label="Connect to GitHub"
            >
              {isDeploying ? "Connecting..." : "Connect to GitHub"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Netlify Deployment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Deploy to Netlify
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input
                id="site-name"
                value={siteName}
                onChange={handleSiteNameChange}
                placeholder="e.g., my-awesome-site"
                aria-required="true"
              />
            </div>
            <Button
              onClick={onNetlifyConnect}
              disabled={isDeploying}
              className="w-full"
              aria-label="Connect to Netlify"
            >
              {isDeploying ? "Connecting..." : "Connect to Netlify"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
