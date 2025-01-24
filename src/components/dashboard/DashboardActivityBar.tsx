import { Clock, ListTodo, FileText, Calendar } from "lucide-react"

export function DashboardActivityBar() {
  return (
    <div className="h-8 bg-white border-t border-slate-200 flex items-center px-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Next Post: 2h 30m</span>
        </div>
        <div className="flex items-center gap-2">
          <ListTodo className="h-4 w-4" />
          <span>5 Tasks Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span>3 Draft Notes</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>2 Events Today</span>
        </div>
      </div>
    </div>
  )
}