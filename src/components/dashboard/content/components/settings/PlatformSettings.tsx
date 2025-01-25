import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ConnectedPlatform {
  name: string;
  isActive: boolean;
  lastSync: string;
}

interface PlatformDefaults {
  facebook: {
    postType: string;
    linkPreview: boolean;
    hashtagCount: string;
  };
  twitter: {
    threadCreation: string;
    mediaCards: boolean;
    hashtagCount: string;
  };
}

export const PlatformSettings = () => {
  const connectedPlatforms: ConnectedPlatform[] = [
    { name: "Facebook", isActive: true, lastSync: "5 mins ago" },
    { name: "Twitter", isActive: true, lastSync: "2 mins ago" },
  ];

  const platformDefaults: PlatformDefaults = {
    facebook: {
      postType: "Photo + Link",
      linkPreview: true,
      hashtagCount: "2-3",
    },
    twitter: {
      threadCreation: "Auto",
      mediaCards: true,
      hashtagCount: "2-3",
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Platform Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Connected Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {connectedPlatforms.map((platform) => (
              <Card key={platform.name} className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{platform.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Last sync: {platform.lastSync}
                    </p>
                  </div>
                  <Badge variant={platform.isActive ? "default" : "secondary"}>
                    {platform.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform Defaults</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Facebook</h4>
                <div className="space-y-2 text-sm">
                  <p>Post Type: {platformDefaults.facebook.postType}</p>
                  <p>Link Preview: {platformDefaults.facebook.linkPreview ? "Enabled" : "Disabled"}</p>
                  <p>Auto Hashtags: {platformDefaults.facebook.hashtagCount}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Twitter</h4>
                <div className="space-y-2 text-sm">
                  <p>Thread Creation: {platformDefaults.twitter.threadCreation}</p>
                  <p>Media Cards: {platformDefaults.twitter.mediaCards ? "Enabled" : "Disabled"}</p>
                  <p>Hashtags: {platformDefaults.twitter.hashtagCount}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Cross-posting Rules</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Content Adaptation</h4>
                <div className="space-y-2 text-sm">
                  <p>Auto-format for platforms: Enabled</p>
                  <p>Image resizing: Automatic</p>
                  <p>Link handling: Platform-specific</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">Scheduling Rules</h4>
                <div className="space-y-2 text-sm">
                  <p>Time gap between posts: 15 mins</p>
                  <p>Platform priority: FB > TW > LI</p>
                  <p>Auto-queue: Enabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};