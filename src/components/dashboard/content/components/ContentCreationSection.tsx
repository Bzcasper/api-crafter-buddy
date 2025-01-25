import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Database, Globe, Play, RefreshCw, XOctagon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Website {
  id: string
  name: string
  url: string
  status: "connected" | "not_connected"
}

const mockWebsites: Website[] = [
  { id: "1", name: "Corporate Blog", url: "blog.example.com", status: "connected" },
  { id: "2", name: "Product Site", url: "products.example.com", status: "connected" },
  { id: "3", name: "Landing Page", url: "landing.example.com", status: "not_connected" },
]

export const ContentCreationSection = () => {
  const [selectedModel, setSelectedModel] = useState("gpt-4")
  const [selectedWebsite, setSelectedWebsite] = useState<string>("")
  const [creativity, setCreativity] = useState([50])
  const [length, setLength] = useState("medium")
  const [tone, setTone] = useState("professional")
  const [saveSettings, setSaveSettings] = useState(false)
  const { toast } = useToast()

  const handleGenerate = () => {
    toast({
      title: "Generating content",
      description: "Your content is being generated. This may take a few moments.",
    })
  }

  const handleReset = () => {
    setSelectedModel("gpt-4")
    setSelectedWebsite("")
    setCreativity([50])
    setLength("medium")
    setTone("professional")
    setSaveSettings(false)
    toast({
      title: "Settings reset",
      description: "All parameters have been reset to default values.",
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Left Column */}
      <div className="space-y-6">
        {/* AI Model Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              AI Model Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger>
                <SelectValue placeholder="Select AI Model" />
              </SelectTrigger>
              <SelectContent>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Highly accurate and creative, best for detailed content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SelectItem value="gpt-3.5">GPT-3.5</SelectItem>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Faster and cost-efficient for short or less complex content</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <SelectItem value="custom">Custom Model</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Website Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Website Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            {mockWebsites.length > 0 ? (
              <Select value={selectedWebsite} onValueChange={setSelectedWebsite}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Website" />
                </SelectTrigger>
                <SelectContent>
                  {mockWebsites.map((website) => (
                    <SelectItem key={website.id} value={website.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{website.name}</span>
                        <span className={`text-xs ${
                          website.status === "connected" ? "text-green-500" : "text-yellow-500"
                        }`}>
                          {website.status}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">
                  No websites connected. Add one from the Website Management section.
                </p>
                <Button variant="outline">Go to Website Management</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column */}
      <div className="space-y-6">
        {/* AI Parameter Controls */}
        <Card>
          <CardHeader>
            <CardTitle>AI Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Creativity Slider */}
            <div className="space-y-2">
              <Label>Creativity Level</Label>
              <Slider
                value={creativity}
                onValueChange={setCreativity}
                max={100}
                step={1}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative</span>
                <span>Creative</span>
              </div>
            </div>

            {/* Length Selection */}
            <div className="space-y-2">
              <Label>Content Length</Label>
              <RadioGroup value={length} onValueChange={setLength} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="short" id="short" />
                  <Label htmlFor="short">Short</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium">Medium</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="long" id="long" />
                  <Label htmlFor="long">Long</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Tone Selection */}
            <div className="space-y-2">
              <Label>Content Tone</Label>
              <RadioGroup value={tone} onValueChange={setTone} className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="formal" id="formal" />
                  <Label htmlFor="formal">Formal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="casual" id="casual" />
                  <Label htmlFor="casual">Casual</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="professional" id="professional" />
                  <Label htmlFor="professional">Professional</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="persuasive" id="persuasive" />
                  <Label htmlFor="persuasive">Persuasive</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Save Settings Toggle */}
            <div className="flex items-center justify-between">
              <Label htmlFor="save-settings">Save as Default Settings</Label>
              <Switch
                id="save-settings"
                checked={saveSettings}
                onCheckedChange={setSaveSettings}
              />
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button onClick={handleGenerate} className="w-full gap-2">
            <Play className="h-4 w-4" />
            Generate Content
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <XOctagon className="h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}