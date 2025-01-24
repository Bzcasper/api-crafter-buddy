import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WebsiteTemplates } from "../templates/WebsiteTemplates"

interface TemplateSelectionProps {
  onTemplateSelect: (templateId: string) => void;
}

export const TemplateSelection = ({ onTemplateSelect }: TemplateSelectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose a Template</CardTitle>
      </CardHeader>
      <CardContent>
        <WebsiteTemplates onSelect={onTemplateSelect} />
      </CardContent>
    </Card>
  )
}