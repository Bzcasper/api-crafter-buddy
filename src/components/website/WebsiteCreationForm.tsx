import { Card, CardContent } from "@/components/ui/card"
import { StepIndicator } from "./creation/StepIndicator"
import { TemplateSelection } from "./creation/TemplateSelection"
import { WebsiteDetailsForm } from "./creation/WebsiteDetailsForm"
import { DeploymentForm } from "./creation/DeploymentForm"
import { WebsiteCreationProvider, useWebsiteCreation } from "./creation/WebsiteCreationContext"

const WebsiteCreationContent = () => {
  const { state } = useWebsiteCreation()

  return (
    <Card>
      <CardContent className="pt-6">
        <StepIndicator currentStep={state.step} />
        <TemplateSelection />
        <WebsiteDetailsForm />
        <DeploymentForm />
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