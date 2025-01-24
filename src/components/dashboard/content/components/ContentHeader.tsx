import { Button } from "@/components/ui/button"

export const ContentHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">AI Content Studio</h1>
      <div className="flex gap-2">
        <Button variant="default" className="gap-2">
          Schedule Post
        </Button>
        <Button variant="outline" className="gap-2">
          AI Active
        </Button>
      </div>
    </div>
  )
}