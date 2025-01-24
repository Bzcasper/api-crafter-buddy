import { Card, CardContent } from "@/components/ui/card"
import { StepIndicator } from "./StepIndicator"
import { TemplateSelection } from "./TemplateSelection"
import { WebsiteDetailsForm } from "./WebsiteDetailsForm"
import { DeploymentForm } from "./DeploymentForm"
import { WebsiteCreationProvider, useWebsiteCreation } from "./WebsiteCreationContext"

const WebsiteCreationContent = () => {
  const { step } = useWebsiteCreation()

  return (
    <Card>
      <CardContent className="pt-6">
        <StepIndicator currentStep={step} />
        {step === 'template' && <TemplateSelection />}
        {step === 'details' && <WebsiteDetailsForm />}
        {step === 'deployment' && <DeploymentForm />}
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