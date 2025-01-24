import { createContext, useContext, useState } from "react"

interface WebsiteCreationState {
  selectedTemplate: string
  title: string
  domain: string
  favicon: File | null
  primaryColor: string
  font: string
  step: 'template' | 'details' | 'deployment'
}

interface WebsiteCreationContextType {
  state: WebsiteCreationState
  setState: (state: Partial<WebsiteCreationState>) => void
  setStep: (step: WebsiteCreationState['step']) => void
}

const WebsiteCreationContext = createContext<WebsiteCreationContextType | undefined>(undefined)

export const WebsiteCreationProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<WebsiteCreationState>({
    selectedTemplate: "",
    title: "",
    domain: "",
    favicon: null,
    primaryColor: "#0f172a",
    font: "Inter",
    step: 'template'
  })

  const updateState = (newState: Partial<WebsiteCreationState>) => {
    setState(prevState => ({ ...prevState, ...newState }))
  }

  const setStep = (step: WebsiteCreationState['step']) => {
    setState(prevState => ({ ...prevState, step }))
  }

  return (
    <WebsiteCreationContext.Provider value={{ state, setState: updateState, setStep }}>
      {children}
    </WebsiteCreationContext.Provider>
  )
}

export const useWebsiteCreation = () => {
  const context = useContext(WebsiteCreationContext)
  if (!context) {
    throw new Error('useWebsiteCreation must be used within a WebsiteCreationProvider')
  }
  return context
}