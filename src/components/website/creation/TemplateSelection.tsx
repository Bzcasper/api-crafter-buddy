import { WebsiteTemplates } from "../templates/WebsiteTemplates"
import { useWebsiteCreation } from "./WebsiteCreationContext"

export const TemplateSelection = () => {
  const { setState, setStep } = useWebsiteCreation()

  const handleTemplateSelect = (templateId: string) => {
    setState({ selectedTemplate: templateId })
    setStep('details')
  }

  return <WebsiteTemplates onSelect={handleTemplateSelect} />
}