import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { FileText, Eye, PlusCircle } from "lucide-react"

interface Template {
  id: string
  title: string
  description: string
  content: string
}

const mockTemplates: Template[] = [
  {
    id: "1",
    title: "Top 10 List",
    description: "Create an engaging countdown of the best items in your chosen category",
    content: "# [Topic] Top 10\n\n1. [Item 1]\n2. [Item 2]\n...\n\nConclusion"
  },
  {
    id: "2",
    title: "Step-by-Step Guide",
    description: "Write a detailed tutorial with clear instructions",
    content: "# How to [Action]\n\n## Prerequisites\n\n## Steps\n\n1. First step\n2. Second step\n...\n\n## Conclusion"
  },
  {
    id: "3",
    title: "Product Review",
    description: "Generate a comprehensive product review with pros and cons",
    content: "# [Product Name] Review\n\n## Overview\n\n## Features\n\n## Pros\n\n## Cons\n\n## Verdict"
  }
]

interface TemplatesSectionProps {
  onUseTemplate: (content: string) => void
}

export const TemplatesSection = ({ onUseTemplate }: TemplatesSectionProps) => {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [newTemplate, setNewTemplate] = useState({ title: "", description: "", content: "" })
  const { toast } = useToast()

  const handleCreateTemplate = () => {
    if (!newTemplate.title || !newTemplate.description || !newTemplate.content) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields to create a template",
        variant: "destructive"
      })
      return
    }

    const template: Template = {
      id: Date.now().toString(),
      ...newTemplate
    }

    setTemplates([...templates, template])
    setNewTemplate({ title: "", description: "", content: "" })
    setIsCreateOpen(false)
    
    toast({
      title: "Template Created",
      description: "Your new template has been added successfully"
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Content Templates</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new content template to streamline your content creation process.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Template Title</Label>
                <Input
                  id="title"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                  placeholder="e.g., Product Review"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  placeholder="Brief description of the template"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Template Structure</Label>
                <Textarea
                  id="content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  placeholder="# Title&#10;## Section 1&#10;## Section 2"
                  className="h-[200px] font-mono"
                />
              </div>
              <Button onClick={handleCreateTemplate} className="w-full">
                Create Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {template.title}
              </CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{template.title}</DialogTitle>
                      <DialogDescription>{template.description}</DialogDescription>
                    </DialogHeader>
                    <pre className="p-4 bg-muted rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm">
                      {template.content}
                    </pre>
                  </DialogContent>
                </Dialog>
                <Button 
                  onClick={() => {
                    onUseTemplate(template.content)
                    toast({
                      title: "Template Loaded",
                      description: "The template has been loaded into the editor"
                    })
                  }}
                  className="flex-1 gap-2"
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}