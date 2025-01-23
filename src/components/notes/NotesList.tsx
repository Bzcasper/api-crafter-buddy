import { Note } from "@/types/notes";

interface NotesListProps {
  notes: Note[];
}

export const NotesList = ({ notes }: NotesListProps) => {
  return (
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
  );
};