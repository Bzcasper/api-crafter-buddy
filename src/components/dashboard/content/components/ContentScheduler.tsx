import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardCalendar } from "../../DashboardCalendar"

export const ContentScheduler = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Content Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardCalendar />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Optimal Posting Times</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg">
              <span>3:00 PM</span>
              <span className="text-green-500">87% engagement</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-green-500/10 rounded-lg">
              <span>7:30 PM</span>
              <span className="text-green-500">82% engagement</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}