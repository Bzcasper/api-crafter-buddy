import { Button } from "@/components/ui/button"

export const ContentHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-foreground">AI Content Studio</h1>
      <div className="flex gap-2">
        <Button variant="default" className="bg-pink-500 hover:bg-pink-600">
          Schedule Post
        </Button>
        <Button variant="outline">
          AI Active
        </Button>
      </div>
    </div>
  )
}