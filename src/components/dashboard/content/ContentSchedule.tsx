import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

const scheduleData = [
  { day: "Mon", posts: [] },
  { day: "Tue", posts: [{ time: "15:00", title: "Product Update" }] },
  { day: "Wed", posts: [] },
  { day: "Thu", posts: [{ time: "10:00", title: "Industry News" }] },
  { day: "Fri", posts: [{ time: "14:00", title: "Weekly Roundup" }] },
]

export const ContentSchedule = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Content Schedule</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full">
          <div className="grid grid-cols-5 gap-2 min-w-[500px]">
            {scheduleData.map((day) => (
              <div key={day.day} className="text-center">
                <div className="font-medium mb-2 text-muted-foreground">{day.day}</div>
                {day.posts.map((post, index) => (
                  <div 
                    key={index}
                    className="scheduled-post"
                  >
                    <div className="text-xs font-medium">{post.time}</div>
                    <div className="text-xs">{post.title}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}