import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

export const AIModelSelection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold">AI Model Selection</h2>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          AI Ready
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-pink-50 border-pink-100">
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">GPT-4 Turbo</h3>
              <p className="text-gray-600">Premium content generation</p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Active
            </Badge>
            <p className="text-sm text-gray-600">Success Rate: 99.8% • Avg Time: 2.1s</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold">GPT-3.5 Turbo</h3>
              <p className="text-gray-600">Fast generation</p>
            </div>
            <Button variant="secondary" size="sm">
              Switch
            </Button>
            <p className="text-sm text-gray-600">Success Rate: 98.5% • Avg Time: 1.2s</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Advanced Parameters</h3>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="font-medium">Creativity Level</label>
            <Slider defaultValue={[60]} max={100} step={1} />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Conservative</span>
              <span>Creative</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-medium">Temperature</label>
            <Slider defaultValue={[70]} max={100} step={1} />
            <div className="flex justify-between text-sm text-gray-600">
              <span>0.0</span>
              <span>1.0</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Model Configuration</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Tokens</label>
              <Input type="number" value="2048" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Top P</label>
              <Input type="number" value="0.9" step="0.1" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Frequency Penalty</label>
              <Input type="number" value="0.6" step="0.1" />
            </div>
          </div>
        </div>

        <Card className="mt-4">
          <CardContent className="p-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Average Response Time: 2.1s</span>
              <span>Success Rate: 99.6%</span>
              <span>Quality Score: 98/100</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}