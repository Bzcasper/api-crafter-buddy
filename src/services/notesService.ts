import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_ANON_KEY || ''
);

export const notesService = {
  async createNote(title: string, content: string, tags?: string[]) {
    const { data, error } = await supabase
      .from('notes')
      .insert([{ title, content, tags }])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getNotes() {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async updateNote(id: string, updates: Partial<{ title: string; content: string; tags: string[] }>) {
    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteNote(id: string) {
    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }
};