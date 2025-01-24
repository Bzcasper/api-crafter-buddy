import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const SystemSettings = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent>
          System configuration options will go here
        </CardContent>
      </Card>
    </div>
  )
}