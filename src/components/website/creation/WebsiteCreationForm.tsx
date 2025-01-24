import { Card, CardContent } from "@/components/ui/card"
import { StepIndicator } from "./StepIndicator"
import { TemplateSelection } from "./TemplateSelection"
import { WebsiteDetailsForm } from "./WebsiteDetailsForm"
import { DeploymentForm } from "./DeploymentForm"
import { WebsiteCreationProvider, useWebsiteCreation } from "./WebsiteCreationContext"

const WebsiteCreationContent = () => {
  const { state } = useWebsiteCreation()

  return (
    <Card>
      <CardContent className="pt-6">
        <StepIndicator currentStep={state.step} />
        {state.step === 'template' && <TemplateSelection />}
        {state.step === 'details' && <WebsiteDetailsForm />}
        {state.step === 'deployment' && <DeploymentForm />}
      </CardContent>
    </Card>
  )
}

export const WebsiteCreationForm = () => {
  return (
    <WebsiteCreationProvider>
      <WebsiteCreationContent />
    </WebsiteCreationProvider>
  )
}