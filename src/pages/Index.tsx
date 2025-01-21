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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Web Scraping Dashboard</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Web Scraping Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Web Scraping</h2>
              <ScrapingForm />
            </div>
          </div>

          {/* Manual Note Creation Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Manual Note Creation</h2>
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
            </div>
          </div>
        </div>

        {/* Notes List Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Recent Notes</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <div key={note.id} className="bg-card rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                <p className="text-muted-foreground mb-4">{note.content}</p>
                {note.source_url && (
                  <p className="text-sm text-muted-foreground mb-2">
                    Source: {note.source_url}
                  </p>
                )}
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {note.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Created: {new Date(note.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;