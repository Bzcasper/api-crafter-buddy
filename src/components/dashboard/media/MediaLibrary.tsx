import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const MediaLibrary = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          Media management tools will go here
        </CardContent>
      </Card>
    </div>
  )
}