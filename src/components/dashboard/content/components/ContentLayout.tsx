import { ContentGenerator } from "./ContentGenerator"
import { ContentSidebar } from "./ContentSidebar"
import { ContentHeader } from "./ContentHeader"

export const ContentLayout = () => {
  return (
    <div className="p-6 max-w-[2000px] mx-auto">
      <ContentHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
          <ContentGenerator />
        </div>
        <ContentSidebar />
      </div>
    </div>
  )
}