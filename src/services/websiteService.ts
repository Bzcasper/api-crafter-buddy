import { supabase } from "@/integrations/supabase/client"

export const createWebsite = async ({
  title,
  domain,
  template,
  settings,
  faviconUrl,
  userId,
}: {
  title: string;
  domain: string;
  template: string;
  settings: any;
  faviconUrl: string | null;
  userId: string;
}) => {
  const { data, error } = await supabase
    .from('websites')
    .insert({
      title,
      domain,
      template,
      settings,
      favicon_url: faviconUrl,
      status: 'draft',
      created_by: userId
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export const uploadFavicon = async (file: File) => {
  const fileExt = file.name.split('.').pop()
  const filePath = `favicons/${crypto.randomUUID()}.${fileExt}`

  const { error } = await supabase.storage
    .from('website-assets')
    .upload(filePath, file)

  if (error) throw error
  return filePath
}