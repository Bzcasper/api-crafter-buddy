import { useState, useEffect } from "react";
import { notesService } from "@/services/notesService";
import { Note } from "@/types/notes";
import { ScrapingForm } from "@/components/ScrapingForm";
import { NotesList } from "@/components/notes/NotesList";
import { ManualNoteForm } from "@/components/notes/ManualNoteForm";
import { ContentGenerationForm } from "@/components/ContentGenerationForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
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

  const handleNoteCreated = (note: Note) => {
    setNotes([note, ...notes]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Content Generation Dashboard</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Content Generation Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">AI Content Generation</h2>
              <ContentGenerationForm />
            </div>
          </div>

          {/* Web Scraping Section */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Web Scraping</h2>
              <ScrapingForm />
            </div>
          </div>
        </div>

        {/* Notes List Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Recent Notes</h2>
          <NotesList notes={notes} />
        </div>
      </div>
    </div>
  );
};

export default Index;