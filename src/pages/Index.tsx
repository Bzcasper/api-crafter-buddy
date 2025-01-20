import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { notesService } from "@/services/notesService";
import { Note } from "@/types/notes";

const Index = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
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
      setNotes([note, ...notes]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Obsidian Notes API</h1>
        
        <form onSubmit={handleCreateNote} className="space-y-4">
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px]"
          />
          <Button type="submit" className="w-full">
            Create Note
          </Button>
        </form>

        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="mt-2 text-gray-600">{note.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;