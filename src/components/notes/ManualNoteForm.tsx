import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { notesService } from "@/services/notesService";
import { Note } from "@/types/notes";

interface ManualNoteFormProps {
  onNoteCreated: (note: Note) => void;
}

export const ManualNoteForm = ({ onNoteCreated }: ManualNoteFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { toast } = useToast();

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const note = await notesService.createNote(title, content);
      toast({
        title: "Note created",
        description: "Your note has been created successfully",
      });
      setTitle("");
      setContent("");
      onNoteCreated(note);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleCreateNote} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <Input
          id="title"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content
        </label>
        <Textarea
          id="content"
          placeholder="Enter note content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px]"
        />
      </div>
      <Button type="submit" className="w-full">
        Create Note
      </Button>
    </form>
  );
};