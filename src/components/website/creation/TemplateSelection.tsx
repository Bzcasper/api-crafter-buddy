import { WebsiteTemplates } from "../templates/WebsiteTemplates"
import { useWebsiteCreation } from "./WebsiteCreationContext"

export const TemplateSelection = () => {
  const { state, setState, setStep } = useWebsiteCreation()

  const handleTemplateSelect = (templateId: string) => {
    setState({ selectedTemplate: templateId })
    setStep('details')
  }

  if (state.step !== 'template') return null

  return <WebsiteTemplates onSelect={handleTemplateSelect} />
}