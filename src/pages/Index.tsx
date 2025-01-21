import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { notesService } from "@/services/notesService";
import { Note } from "@/types/notes";
import { ScrapingForm } from "@/components/ScrapingForm";

const Index = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const fetchedNotes = await notesService.getNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
      toast({
        title: "Error",
        description: "Failed to load notes",
        variant: "destructive",
      });
    }
  };

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
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Content Scraping & Notes</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Create Note</h2>
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
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Web Scraping</h2>
            <ScrapingForm />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Notes</h2>
          {notes.map((note) => (
            <div key={note.id} className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <p className="mt-2 text-gray-600">{note.content}</p>
              {note.tags && note.tags.length > 0 && (
                <div className="mt-2 flex gap-2">
                  {note.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="mt-2 text-xs text-gray-400">
                Created: {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;