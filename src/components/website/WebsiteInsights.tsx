import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function WebsiteInsights() {
  return (
    <Card className="bg-blue-600 text-white">
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-[#9b87f5]/50">#RealEstate</Badge>
          <Badge variant="secondary" className="bg-[#D946EF]/50">#Investment</Badge>
          <Badge variant="secondary" className="bg-[#F97316]/50">#Property</Badge>
          <Badge variant="secondary" className="bg-[#0EA5E9]/50">#Marketing</Badge>
          <Badge variant="secondary" className="bg-[#8B5CF6]/50">#Growth</Badge>
        </div>
        <div className="space-y-2">
          <p className="text-sm">Optimal Posting Time: 3:00 PM PST (high engagement predicted)</p>
          <p className="text-sm">Content Recommendation: Share market analysis with interactive graphs</p>
        </div>
      </CardContent>
    </Card>
  )
}