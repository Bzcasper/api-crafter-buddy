import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DeploymentSettings } from "./DeploymentSettings";
import { useWebsiteCreation } from "./WebsiteCreationContext";
import { useAuth } from "@/hooks/useAuth";
import { useDeployment } from "@/hooks/useDeployment";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export const DeploymentForm: React.FC = () => {
  const { state, setStep } = useWebsiteCreation();
  const { userId, isLoading: isAuthLoading, error: authError } = useAuth();
  const { isDeploying, deployToGitHub, deployToNetlify, createNewWebsite } = useDeployment();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [repoName, setRepoName] = useState<string>("");
  const [siteName, setSiteName] = useState<string>("");

  if (state.step !== "deployment") return null;

  const handleGitHubConnect = useCallback(async () => {
    if (!repoName.trim()) {
      toast({
        title: "Repository Name Required",
        description: "Please enter a repository name to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Attempting to connect to GitHub with repo name:', repoName.trim());
      const result = await deployToGitHub(repoName.trim());
      console.log('GitHub connection result:', result);
      
      if (result?.success) {
        toast({
          title: "Success",
          description: "GitHub repository created successfully!",
        });
        setRepoName(""); // Reset the input after successful deployment
      } else {
        throw new Error(result?.error || 'Failed to create GitHub repository');
      }
    } catch (error: any) {
      console.error('Error connecting to GitHub:', error);
      toast({
        title: "GitHub Connection Failed",
        description: error.message || "Failed to connect to GitHub. Please try again.",
        variant: "destructive",
      });
    }
  }, [deployToGitHub, repoName, toast]);

  const handleNetlifyConnect = useCallback(async () => {
    if (!siteName.trim()) {
      toast({
        title: "Site Name Required",
        description: "Please enter a site name to proceed.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Attempting to connect to Netlify with site name:', siteName.trim());
      await deployToNetlify(siteName.trim(), state);
      setSiteName(""); // Reset the input after successful deployment
    } catch (error: any) {
      console.error('Error connecting to Netlify:', error);
      toast({
        title: "Netlify Connection Failed",
        description: error.message || "Failed to connect to Netlify. Please try again.",
        variant: "destructive",
      });
    }
  }, [deployToNetlify, siteName, state, toast]);

  const handleSubmit = useCallback(async () => {
    if (!userId) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a website.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Attempting to create new website');
      await createNewWebsite(state);
      console.log('Website created successfully');
      navigate("/dashboard/website-management");
    } catch (error: any) {
      console.error('Error creating website:', error);
      toast({
        title: "Website Creation Failed",
        description: error.message || "Failed to create website. Please try again.",
        variant: "destructive",
      });
    }
  }, [createNewWebsite, state, toast, userId, navigate]);

  return (
    <div className="space-y-6">
      <DeploymentSettings
        onGitHubConnect={handleGitHubConnect}
        onNetlifyConnect={handleNetlifyConnect}
        repoName={repoName}
        setRepoName={setRepoName}
        siteName={siteName}
        setSiteName={setSiteName}
        isDeploying={isDeploying}
      />

      {isDeploying && (
        <div className="flex items-center space-x-2">
          <Spinner size="sm" />
          <span>Deploying your website...</span>
        </div>
      )}

      {authError && (
        <div className="flex items-center text-red-500 space-x-2">
          <Trash2 className="h-5 w-5" />
          <span>{authError}</span>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => setStep("details")}
          disabled={isDeploying}
          aria-label="Back to Details"
        >
          Back to Details
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isDeploying || isAuthLoading || !userId}
          aria-label="Create Website"
        >
          {isDeploying ? <Spinner size="sm" className="mr-2" /> : null}
          Create Website
        </Button>
      </div>
    </div>
  );
};