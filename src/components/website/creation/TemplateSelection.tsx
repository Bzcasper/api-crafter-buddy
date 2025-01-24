import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useWebsiteCreation } from "./WebsiteCreationContext"
import { WebsiteTemplates } from "../templates/WebsiteTemplates"

export const TemplateSelection = () => {
  const { state, setState, setStep } = useWebsiteCreation()

  const handleTemplateSelect = (templateId: string) => {
    setState({ selectedTemplate: templateId })
    setStep('details')
  }

  const handlePreview = (templateId: string) => {
    console.log('Preview template:', templateId)
    // Implement preview logic
  }

  if (state.step !== 'template') return null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="relative group">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={template.thumbnail} 
                alt={template.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold text-lg">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => handlePreview(template.id)}>
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[80vh]">
                    <iframe
                      src={template.previewUrl}
                      className="w-full h-full"
                      title={`Preview of ${template.name}`}
                    />
                  </DialogContent>
                </Dialog>
                <Button onClick={() => handleTemplateSelect(template.id)}>
                  Use Template
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const templates = [
  {
    id: "business",
    name: "Business",
    description: "Professional website for your company",
    thumbnail: "/templates/business-thumb.jpg",
    previewUrl: "/templates/business/preview",
    pages: ["Home", "About", "Services", "Contact"]
  },
  {
    id: "blog",
    name: "Blog",
    description: "Share your thoughts and stories",
    thumbnail: "/templates/blog-thumb.jpg",
    previewUrl: "/templates/blog/preview",
    pages: ["Home", "Blog", "About", "Contact"]
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work and projects",
    thumbnail: "/templates/portfolio-thumb.jpg",
    previewUrl: "/templates/portfolio/preview",
    pages: ["Home", "Projects", "About", "Contact"]
  }
]