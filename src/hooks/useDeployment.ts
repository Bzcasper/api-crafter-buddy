// src/hooks/useDeployment.ts
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { uploadFavicon, createWebsite } from "@/services/websiteService";
import type { DeploymentSettingsType } from "@/types/content";

interface UseDeploymentReturn {
  isDeploying: boolean;
  deployToGitHub: (repoName: string) => Promise<any>;
  deployToNetlify: (siteName: string, settings: DeploymentSettingsType) => Promise<any>;
  createNewWebsite: (settings: DeploymentSettingsType) => Promise<void>;
}

export const useDeployment = (): UseDeploymentReturn => {
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState<boolean>(false);

  const deployToGitHub = useCallback(async (repoName: string) => {
    try {
      const { data: session, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) throw sessionError;

      if (!session?.user?.id) {
        toast({
          title: "Authentication Required",
          description: "Please log in to connect to GitHub.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Connecting to GitHub",
        description: `Creating repository "${repoName}"...`,
        duration: 3000,
      });

      const { data, error } = await supabase.functions.invoke("github-create-repo", {
        body: { repoName },
      });

      if (error) throw error;

      toast({
        title: "GitHub Repository Created",
        description: `Repository "${repoName}" created successfully!`,
      });

      return data;
    } catch (error: any) {
      console.error("Error deploying to GitHub:", error);
      toast({
        title: "GitHub Deployment Failed",
        description: error.message || "Failed to create GitHub repository.",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const deployToNetlify = useCallback(
    async (siteName: string, settings: DeploymentSettingsType) => {
      try {
        const { data: session, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!session?.user?.id) {
          toast({
            title: "Authentication Required",
            description: "Please log in to deploy to Netlify.",
            variant: "destructive",
          });
          return;
        }

        toast({
          title: "Deploying to Netlify",
          description: `Creating Netlify site "${siteName}"...`,
          duration: 3000,
        });

        const { data, error } = await supabase.functions.invoke("netlify-create-site", {
          body: { siteName },
        });

        if (error) throw error;

        toast({
          title: "Netlify Site Created",
          description: `Site "${siteName}" deployed successfully!`,
        });

        // Create the website in the database after successful deployment
        await createNewWebsite(settings);

        return data;
      } catch (error: any) {
        console.error("Error deploying to Netlify:", error);
        toast({
          title: "Netlify Deployment Failed",
          description: error.message || "Failed to deploy to Netlify.",
          variant: "destructive",
        });
        throw error;
      }
    },
    [toast]
  );

  const createNewWebsite = useCallback(
    async (settings: DeploymentSettingsType) => {
      try {
        setIsDeploying(true);
        const { data: session, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        if (!session?.user?.id) {
          toast({
            title: "Authentication Required",
            description: "Please log in to create a website.",
            variant: "destructive",
          });
          return;
        }

        const { title, domain, selectedTemplate, favicon, primaryColor, font } = settings;

        let faviconUrl: string | null = null;
        if (favicon) {
          faviconUrl = await uploadFavicon(favicon);
        }

        await createWebsite({
          title,
          domain,
          template: selectedTemplate,
          settings: {
            colors: {
              primary: primaryColor,
            },
            fonts: {
              heading: font,
              body: font,
            },
          },
          faviconUrl,
          userId: session.user.id,
        });

        toast({
          title: "Website Created",
          description: "Your website has been created successfully.",
        });

        // Redirect to website management
        window.location.href = "/dashboard/website-management";
      } catch (error: any) {
        console.error("Error creating website:", error);
        toast({
          title: "Website Creation Failed",
          description: error.message || "Failed to create website.",
          variant: "destructive",
        });
      } finally {
        setIsDeploying(false);
      }
    },
    [toast]
  );

  return { isDeploying, deployToGitHub, deployToNetlify, createNewWebsite };
};
