import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const AIEngineSection = () => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">AI Engine Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-pink-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">GPT-4 Turbo</h3>
              <p className="text-sm text-muted-foreground">Premium quality content</p>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-600">
              Active
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}