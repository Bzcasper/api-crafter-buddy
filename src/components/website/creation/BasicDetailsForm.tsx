import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface BasicDetailsFormProps {
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
}

export const BasicDetailsForm = ({
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
}: BasicDetailsFormProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Website Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Awesome Website"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="domain">Custom Domain (Optional)</Label>
        <Input
          id="domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="www.mywebsite.com"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="favicon">Favicon</Label>
        <Input
          id="favicon"
          type="file"
          accept="image/*"
          onChange={(e) => setFavicon(e.target.files?.[0] || null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="primaryColor">Primary Color</Label>
        <Input
          id="primaryColor"
          type="color"
          value={primaryColor}
          onChange={(e) => setPrimaryColor(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="font">Font Family</Label>
        <Select value={font} onValueChange={setFont}>
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Inter">Inter</SelectItem>
            <SelectItem value="Roboto">Roboto</SelectItem>
            <SelectItem value="Open Sans">Open Sans</SelectItem>
            <SelectItem value="Montserrat">Montserrat</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}