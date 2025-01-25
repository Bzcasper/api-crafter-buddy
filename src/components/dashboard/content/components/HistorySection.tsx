import { useState } from "react"
import { format } from "date-fns"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Eye, Edit, Trash2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

// Mock data for demonstration
const mockHistory = [
  {
    id: "1",
    title: "10 Tips for Better Content Writing",
    content: "Lorem ipsum dolor sit amet...",
    dateCreated: new Date("2024-03-15"),
    wordCount: 1250,
  },
  {
    id: "2",
    title: "The Future of AI in Marketing",
    content: "Consectetur adipiscing elit...",
    dateCreated: new Date("2024-03-14"),
    wordCount: 850,
  },
  {
    id: "3",
    title: "Social Media Strategy Guide",
    content: "Sed do eiusmod tempor...",
    dateCreated: new Date("2024-03-13"),
    wordCount: 2000,
  },
  {
    id: "4",
    title: "Email Marketing Best Practices",
    content: "Ut enim ad minim veniam...",
    dateCreated: new Date("2024-03-12"),
    wordCount: 1500,
  },
  {
    id: "5",
    title: "SEO Optimization Tips",
    content: "Quis nostrud exercitation...",
    dateCreated: new Date("2024-03-11"),
    wordCount: 1800,
  },
]

interface HistorySectionProps {
  onEdit: (contentId: string) => void
}

export const HistorySection = ({ onEdit }: HistorySectionProps) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedContent, setSelectedContent] = useState<typeof mockHistory[0] | null>(null)
  const itemsPerPage = 5

  // Filter content based on search query
  const filteredContent = mockHistory.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    format(item.dateCreated, "MM/dd/yyyy").includes(searchQuery)
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredContent.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedContent = filteredContent.slice(startIndex, startIndex + itemsPerPage)

  const handleDelete = (id: string) => {
    console.log("Deleting content with id:", id)
    // Here you would implement the actual delete logic
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by title or date..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Content Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Word Count</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedContent.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No history available
                </TableCell>
              </TableRow>
            ) : (
              paginatedContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{format(item.dateCreated, "MM/dd/yyyy")}</TableCell>
                  <TableCell>{item.wordCount} words</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedContent(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(item.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Content</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this content? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredContent.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* View Content Modal */}
      <Dialog open={!!selectedContent} onOpenChange={() => setSelectedContent(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedContent?.title}</DialogTitle>
            <DialogDescription>
              Created on {selectedContent && format(selectedContent.dateCreated, "MM/dd/yyyy")}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {selectedContent?.content}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}