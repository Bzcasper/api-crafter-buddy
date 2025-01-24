import { Button } from "@/components/ui/button"
import { BasicDetailsForm } from "./BasicDetailsForm"
import { useWebsiteCreation } from "./WebsiteCreationContext"

export const WebsiteDetailsForm = () => {
  const { state, setState, setStep } = useWebsiteCreation()

  return (
    <div className="space-y-6">
      <BasicDetailsForm
        title={state.title}
        setTitle={(title) => setState({ title })}
        domain={state.domain}
        setDomain={(domain) => setState({ domain })}
        font={state.font}
        setFont={(font) => setState({ font })}
        primaryColor={state.primaryColor}
        setPrimaryColor={(primaryColor) => setState({ primaryColor })}
        favicon={state.favicon}
        setFavicon={(favicon) => setState({ favicon })}
      />
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setStep('template')}>
          Back to Templates
        </Button>
        <Button onClick={() => setStep('deployment')}>
          Next: Deployment
        </Button>
      </div>
    </div>
  )
}