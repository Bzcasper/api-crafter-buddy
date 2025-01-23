import { supabase } from "@/integrations/supabase/client";
import { Note } from "@/types/notes";

export const notesCrud = {
  async createNote(title: string, content: string, tags: string[] = []): Promise<Note> {
    console.log('Creating note:', { title, content, tags });
    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, tags }])
      .select()
      .single();

    if (error) {
      console.error('Error creating note:', error);
      throw error;
    }

    return data;
  },

  async getNotes(): Promise<Note[]> {
    console.log('Fetching notes');
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }

    return data;
  }
};