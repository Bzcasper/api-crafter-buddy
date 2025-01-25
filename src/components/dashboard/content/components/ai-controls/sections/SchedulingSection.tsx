import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const SchedulingSection = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-2 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Intelligent Scheduling</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {/* Calendar will go here */}
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Best Times</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {/* Best times recommendations will go here */}
        </CardContent>
      </Card>
    </div>
  )
}