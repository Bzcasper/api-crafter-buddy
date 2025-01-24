import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle>Content Calendar</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] flex flex-col">
        <div className="flex-none">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full rounded-md border-none"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4 w-full",
              caption: "flex justify-center pt-1 relative items-center",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              table: "w-full border-collapse space-y-1",
              head_row: "flex w-full",
              head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 h-8 w-8 p-0",
              day: "h-8 w-8 p-0 font-normal",
              day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
              day_disabled: "text-muted-foreground opacity-50",
              day_hidden: "invisible",
            }}
          />
        </div>
        <div className="mt-4 flex-1 overflow-y-auto">
          <h4 className="font-semibold mb-2">Scheduled Posts</h4>
          <div className="space-y-2">
            <div className="text-sm p-2 bg-accent rounded">
              <div className="font-medium">Product Launch Post</div>
              <div className="text-xs text-muted-foreground">Today at 2:00 PM</div>
            </div>
            <div className="text-sm p-2 bg-accent rounded">
              <div className="font-medium">Weekly Newsletter</div>
              <div className="text-xs text-muted-foreground">Tomorrow at 10:00 AM</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}