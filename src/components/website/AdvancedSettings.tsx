import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, Search, Shield, Zap, Database } from "lucide-react"

export function AdvancedSettings() {
  const settings = [
    { name: "AI Optimization", icon: Zap },
    { name: "SEO Configuration", icon: Search },
    { name: "Performance Settings", icon: Settings },
    { name: "Security Backup", icon: Shield },
    { name: "API Integration", icon: Database },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {settings.map((setting) => (
            <Button
              key={setting.name}
              variant="ghost"
              className="w-full justify-start text-left"
            >
              <setting.icon className="mr-2 h-4 w-4 shrink-0" />
              {setting.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}