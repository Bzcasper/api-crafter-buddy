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
      await deployToGitHub(repoName.trim());
      setRepoName(""); // Reset the input after successful deployment
    } catch (error) {
      // Error handled within the hook
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
      await deployToNetlify(siteName.trim(), state);
      setSiteName(""); // Reset the input after successful deployment
    } catch (error) {
      // Error handled within the hook
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
      await createNewWebsite(state);
      // Redirect to website management using Next.js router
      navigate("/dashboard/website-management");
    } catch (error) {
      // Error handled within the hook
    }
  }, [createNewWebsite, state, toast, userId, navigate]);

  const isDisabled = isDeploying || isAuthLoading;

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

      {/* Deployment Feedback */}
      {isDeploying && (
        <div className="flex items-center space-x-2">
          <Spinner size="sm" />
          <span>Deploying your website...</span>
        </div>
      )}

      {/* Authentication Error */}
      {authError && (
        <div className="flex items-center text-red-500 space-x-2">
          <Trash2 className="h-5 w-5" />
          <span>{authError}</span>
        </div>
      )}

      {/* Action Buttons */}
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