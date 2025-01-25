import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const TopicSection = () => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Smart Topic Discovery</CardTitle>
      </CardHeader>
      <CardContent>
        <Input 
          placeholder="Enter topic or get AI suggestions..."
          className="w-full bg-gray-50"
        />
      </CardContent>
    </Card>
  )
}