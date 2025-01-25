import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type Platform = {
  id: string
  name: string
  icon?: string
  isActive: boolean
}

interface PlatformSelectorProps {
  onPlatformChange: (platforms: Platform[]) => void
}

const defaultPlatforms: Platform[] = [
  { id: "facebook", name: "Facebook", isActive: true },
  { id: "instagram", name: "Instagram", isActive: true },
  { id: "twitter", name: "Twitter", isActive: true },
  { id: "pinterest", name: "Pinterest", isActive: false },
  { id: "ebay", name: "eBay", isActive: false },
]

export const PlatformSelector = ({ onPlatformChange }: PlatformSelectorProps) => {
  const [platforms, setPlatforms] = useState<Platform[]>(defaultPlatforms)
  const [showAddPlatform, setShowAddPlatform] = useState(false)

  const togglePlatform = (platformId: string) => {
    const updatedPlatforms = platforms.map(platform => 
      platform.id === platformId 
        ? { ...platform, isActive: !platform.isActive }
        : platform
    )
    setPlatforms(updatedPlatforms)
    onPlatformChange(updatedPlatforms)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Platform Selection</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAddPlatform(!showAddPlatform)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Platform
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {platforms.map(platform => (
            <Badge
              key={platform.id}
              variant={platform.isActive ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => togglePlatform(platform.id)}
            >
              {platform.name}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}