import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { Folder, Upload, File, Image, Video, FileText, Trash2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const MediaLibrary = () => {
  const [selectedFolder, setSelectedFolder] = useState("/")
  const [uploading, setUploading] = useState(false)
  const [files, setFiles] = useState<any[]>([])
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      const file = event.target.files?.[0]
      
      if (!file) {
        throw new Error("No file selected")
      }

      // Get current user session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session?.user?.id) {
        throw new Error("User must be logged in to upload files")
      }

      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${selectedFolder}/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('website-assets')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Save file metadata to database
      const { error: dbError } = await supabase
        .from('website_assets')
        .insert({
          filename: file.name,
          storage_path: filePath,
          folder_path: selectedFolder,
          mime_type: file.type,
          size_bytes: file.size,
          website_id: "placeholder" // This should be the actual website ID
        })

      if (dbError) {
        throw dbError
      }

      toast({
        title: "Success",
        description: "File uploaded successfully"
      })

      // Refresh file list
      fetchFiles()

    } catch (error) {
      console.error('Error uploading file:', error)
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setUploading(false)
    }
  }

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase
        .from('website_assets')
        .select('*')
        .eq('folder_path', selectedFolder)
        .order('created_at', { ascending: false })

      if (error) throw error

      setFiles(data || [])

    } catch (error) {
      console.error('Error fetching files:', error)
      toast({
        title: "Error",
        description: "Failed to fetch files",
        variant: "destructive"
      })
    }
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType?.startsWith('image/')) return <Image className="h-6 w-6" />
    if (mimeType?.startsWith('video/')) return <Video className="h-6 w-6" />
    if (mimeType?.startsWith('text/')) return <FileText className="h-6 w-6" />
    return <File className="h-6 w-6" />
  }

  const handleDeleteFile = async (id: string, path: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('website-assets')
        .remove([path])

      if (storageError) throw storageError

      // Delete from database
      const { error: dbError } = await supabase
        .from('website_assets')
        .delete()
        .eq('id', id)

      if (dbError) throw dbError

      toast({
        title: "Success",
        description: "File deleted successfully"
      })

      // Refresh file list
      fetchFiles()

    } catch (error) {
      console.error('Error deleting file:', error)
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Media Library</CardTitle>
          <div className="flex items-center gap-4">
            <Select
              value={selectedFolder}
              onValueChange={setSelectedFolder}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select folder" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="/">Root</SelectItem>
                <SelectItem value="/images">Images</SelectItem>
                <SelectItem value="/documents">Documents</SelectItem>
                <SelectItem value="/videos">Videos</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileUpload}
                disabled={uploading}
              />
              <Label
                htmlFor="file-upload"
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload File
              </Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border">
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card text-card-foreground shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    {getFileIcon(file.mime_type)}
                    <div>
                      <p className="font-medium truncate max-w-[200px]">
                        {file.filename}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {(file.size_bytes / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFile(file.id, file.storage_path)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}