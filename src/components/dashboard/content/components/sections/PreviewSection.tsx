import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const PreviewSection = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-2 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Advanced Preview Editing</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {/* Preview editor will go here */}
        </CardContent>
      </Card>
      
      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Platform Previews</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[300px]">
          {/* Platform previews will go here */}
        </CardContent>
      </Card>
    </div>
  )
}