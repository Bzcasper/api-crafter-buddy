import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const scheduledPosts = [
    {
      title: "Product Launch Post",
      datetime: "Today at 2:00 PM"
    },
    {
      title: "Weekly Newsletter",
      datetime: "Tomorrow at 10:00 AM"
    }
  ]

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Content Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border-none"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-9 w-9 p-0",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
            }}
          />
        </div>
        
        <div className="space-y-2 pt-4">
          <h4 className="font-semibold text-body mb-3">Upcoming Schedule</h4>
          {scheduledPosts.map((post, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-accent/50 backdrop-blur-sm border border-accent/20 rounded-lg hover:bg-accent/70 transition-all dark:bg-accent/30 dark:border-accent/10">
              <span className="font-medium">{post.title}</span>
              <span className="text-sm text-muted-foreground">{post.datetime}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}