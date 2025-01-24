import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Folder, File, Upload, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"

export function FileManager() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      
      if (sessionError || !session?.user?.id) {
        toast({
          title: "Error",
          description: "You must be logged in to upload files.",
          variant: "destructive"
        })
        return
      }

      const fileExt = file.name.split('.').pop()
      const filePath = `${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('website-assets')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      toast({
        title: "Success",
        description: "File uploaded successfully"
      })

    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: "Error",
        description: "Failed to upload file",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          onChange={handleFileUpload}
          className="flex-1"
        />
        <Button variant="outline">
          <Upload className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="border rounded-lg divide-y">
        <div className="p-2 flex items-center justify-between hover:bg-accent">
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4 text-blue-500" />
            <span>Images</span>
          </div>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
        <div className="p-2 flex items-center justify-between hover:bg-accent">
          <div className="flex items-center gap-2">
            <File className="h-4 w-4 text-gray-500" />
            <span>document.pdf</span>
          </div>
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </div>
    </div>
  )
}