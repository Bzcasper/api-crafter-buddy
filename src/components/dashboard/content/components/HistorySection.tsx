import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { Eye, Pencil, Trash2, Search } from "lucide-react"

interface HistoryItem {
  id: string
  title: string
  content: string
  createdAt: Date
  wordCount: number
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    title: "Introduction to AI",
    content: "Artificial Intelligence (AI) is transforming...",
    createdAt: new Date("2024-02-15"),
    wordCount: 500
  },
  {
    id: "2",
    title: "Web Development Best Practices",
    content: "When building modern web applications...",
    createdAt: new Date("2024-02-14"),
    wordCount: 750
  },
  {
    id: "3",
    title: "Digital Marketing Strategy",
    content: "In today's digital landscape...",
    createdAt: new Date("2024-02-13"),
    wordCount: 600
  },
  {
    id: "4",
    title: "SEO Optimization Guide",
    content: "Search Engine Optimization is crucial...",
    createdAt: new Date("2024-02-12"),
    wordCount: 850
  },
  {
    id: "5",
    title: "Content Creation Tips",
    content: "Creating engaging content requires...",
    createdAt: new Date("2024-02-11"),
    wordCount: 450
  }
]

interface HistorySectionProps {
  onEdit: (contentId: string) => void
}

export const HistorySection = ({ onEdit }: HistorySectionProps) => {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const itemsPerPage = 5

  const filteredHistory = history.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    format(item.createdAt, "MM/dd/yyyy").includes(searchTerm)
  )

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedHistory = filteredHistory.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (id: string) => {
    setHistory(history.filter(item => item.id !== id))
    setSelectedItem(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or date..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Date Created</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Word Count</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedHistory.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    No history available
                  </td>
                </tr>
              ) : (
                paginatedHistory.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-3 text-sm">{item.title}</td>
                    <td className="px-4 py-3 text-sm">
                      {format(item.createdAt, "MM/dd/yyyy")}
                    </td>
                    <td className="px-4 py-3 text-sm">{item.wordCount} words</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{item.title}</DialogTitle>
                              <DialogDescription>
                                Created on {format(item.createdAt, "MM/dd/yyyy")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 p-4 bg-muted rounded-lg">
                              {item.content}
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(item.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>

                        <AlertDialog open={selectedItem === item.id} onOpenChange={(open) => setSelectedItem(open ? item.id : null)}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setSelectedItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Content</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this content? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel onClick={() => setSelectedItem(null)}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(item.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}