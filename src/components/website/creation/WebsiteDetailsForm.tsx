import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BasicDetailsForm } from "./BasicDetailsForm"

interface WebsiteDetailsFormProps {
  title: string;
  setTitle: (value: string) => void;
  domain: string;
  setDomain: (value: string) => void;
  font: string;
  setFont: (value: string) => void;
  primaryColor: string;
  setPrimaryColor: (value: string) => void;
  favicon: File | null;
  setFavicon: (value: File | null) => void;
  onBack: () => void;
  onNext: () => void;
}

export const WebsiteDetailsForm = ({
  title,
  setTitle,
  domain,
  setDomain,
  font,
  setFont,
  primaryColor,
  setPrimaryColor,
  favicon,
  setFavicon,
  onBack,
  onNext,
}: WebsiteDetailsFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Details</CardTitle>
      </CardHeader>
      <CardContent>
        <BasicDetailsForm
          title={title}
          setTitle={setTitle}
          domain={domain}
          setDomain={setDomain}
          font={font}
          setFont={setFont}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          favicon={favicon}
          setFavicon={setFavicon}
        />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>
            Back to Templates
          </Button>
          <Button onClick={onNext}>
            Next: Deployment
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}