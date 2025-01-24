import { Check, ChevronRight } from "lucide-react"

export interface StepIndicatorProps {
  currentStep: 'template' | 'details' | 'deployment'
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    { id: 'template', label: 'Choose Template' },
    { id: 'details', label: 'Website Details' },
    { id: 'deployment', label: 'Deployment' }
  ] as const

  return (
    <div className="flex items-center justify-center mb-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
            ${currentStep === step.id ? 'border-primary bg-primary text-white' : 
              index < steps.findIndex(s => s.id === currentStep) ? 'border-green-500 bg-green-500 text-white' : 
              'border-gray-300 text-gray-500'}`}>
            {index < steps.findIndex(s => s.id === currentStep) ? (
              <Check className="w-4 h-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          {index < steps.length - 1 && (
            <ChevronRight className="w-5 h-5 mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </div>
  )
}