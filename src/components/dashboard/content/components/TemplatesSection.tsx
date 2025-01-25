// src/components/TemplatesSection.tsx
import { useState, useCallback, useMemo } from "react";
import {
  Button,
} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Eye, PlusCircle, Trash2, Edit } from "lucide-react";
import { useTemplates } from "@/hooks/useTemplates";
import type { Template } from "@/types/content";

interface TemplatesSectionProps {
  onUseTemplate: (content: string) => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onUseTemplate }) => {
  const { templates, addTemplate, deleteTemplate, updateTemplate } = useTemplates();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState<Template | null>(null);
  const { toast } = useToast();

  // Form states for creating and editing templates
  const [newTemplate, setNewTemplate] = useState({
    title: "",
    description: "",
    content: "",
  });

  const [editTemplateData, setEditTemplateData] = useState({
    title: "",
    description: "",
    content: "",
  });

  // Handlers for creating a new template
  const handleCreateTemplate = useCallback(() => {
    const { title, description, content } = newTemplate;
    if (!title.trim() || !description.trim() || !content.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields to create a template.",
        variant: "destructive",
      });
      return;
    }

    addTemplate({ title: title.trim(), description: description.trim(), content: content.trim() });
    setNewTemplate({ title: "", description: "", content: "" });
    setIsCreateOpen(false);

    toast({
      title: "Template Created",
      description: "Your new template has been added successfully.",
    });
  }, [newTemplate, addTemplate, toast]);

  // Handlers for editing an existing template
  const handleEditTemplate = useCallback(() => {
    if (!currentTemplate) return;
    const { title, description, content } = editTemplateData;
    if (!title.trim() || !description.trim() || !content.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields to update the template.",
        variant: "destructive",
      });
      return;
    }

    updateTemplate({
      ...currentTemplate,
      title: title.trim(),
      description: description.trim(),
      content: content.trim(),
    });

    setIsEditOpen(false);
    setCurrentTemplate(null);
    toast({
      title: "Template Updated",
      description: "Your template has been updated successfully.",
    });
  }, [currentTemplate, editTemplateData, updateTemplate, toast]);

  // Handler for deleting a template
  const handleDeleteTemplate = useCallback(
    (id: string) => {
      if (confirm("Are you sure you want to delete this template?")) {
        deleteTemplate(id);
        toast({
          title: "Template Deleted",
          description: "The template has been deleted successfully.",
        });
      }
    },
    [deleteTemplate, toast]
  );

  // Handler for opening edit dialog
  const openEditDialog = useCallback(
    (template: Template) => {
      setCurrentTemplate(template);
      setEditTemplateData({
        title: template.title,
        description: template.description,
        content: template.content,
      });
      setIsEditOpen(true);
    },
    []
  );

  // Memoized template cards to prevent unnecessary re-renders
  const templateCards = useMemo(
    () =>
      templates.map((template) => (
        <Card key={template.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {template.title}
            </CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2" aria-label={`Preview ${template.title}`}>
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
                variant="secondary"
                className="flex-1 gap-2"
                onClick={() => onUseTemplate(template.content)}
                aria-label={`Use ${template.title} template`}
              >
                <PlusCircle className="h-4 w-4" />
                Use Template
              </Button>
              <Button
                variant="ghost"
                className="gap-2 text-red-500"
                onClick={() => handleDeleteTemplate(template.id)}
                aria-label={`Delete ${template.title} template`}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
              <Button
                variant="ghost"
                className="gap-2 text-blue-500"
                onClick={() => openEditDialog(template)}
                aria-label={`Edit ${template.title} template`}
              >
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      )),
    [templates, onUseTemplate, handleDeleteTemplate, openEditDialog]
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-semibold">Content Templates</h2>
        {/* Create Template Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 mt-4 sm:mt-0">
              <PlusCircle className="h-4 w-4" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new content template to streamline your content creation process.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="create-title">Template Title</Label>
                <Input
                  id="create-title"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                  placeholder="e.g., Product Review"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-description">Description</Label>
                <Input
                  id="create-description"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  placeholder="Brief description of the template"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="create-content">Template Structure</Label>
                <Textarea
                  id="create-content"
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                  placeholder="# Title&#10;## Section 1&#10;## Section 2"
                  className="h-[200px] font-mono"
                  required
                  aria-required="true"
                />
              </div>
              <Button onClick={handleCreateTemplate} className="w-full">
                Create Template
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templateCards.length > 0 ? (
          templateCards
        ) : (
          <p className="text-center col-span-full text-muted-foreground">
            No templates available. Click "Create Template" to add one.
          </p>
        )}
      </div>

      {/* Edit Template Dialog */}
      {currentTemplate && (
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Template</DialogTitle>
              <DialogDescription>
                Update the details of your content template.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Template Title</Label>
                <Input
                  id="edit-title"
                  value={editTemplateData.title}
                  onChange={(e) =>
                    setEditTemplateData({ ...editTemplateData, title: e.target.value })
                  }
                  placeholder="e.g., Product Review"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={editTemplateData.description}
                  onChange={(e) =>
                    setEditTemplateData({ ...editTemplateData, description: e.target.value })
                  }
                  placeholder="Brief description of the template"
                  required
                  aria-required="true"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">Template Structure</Label>
                <Textarea
                  id="edit-content"
                  value={editTemplateData.content}
                  onChange={(e) =>
                    setEditTemplateData({ ...editTemplateData, content: e.target.value })
                  }
                  placeholder="# Title&#10;## Section 1&#10;## Section 2"
                  className="h-[200px] font-mono"
                  required
                  aria-required="true"
                />
              </div>
              <Button onClick={handleEditTemplate} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
