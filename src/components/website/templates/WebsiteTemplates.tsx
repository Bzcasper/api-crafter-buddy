import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Newspaper, User, ShoppingBag } from "lucide-react"

const templates = [
  {
    id: "business",
    name: "Business",
    description: "Professional website for your company",
    icon: Building,
    pages: ["Home", "About", "Services", "Contact"]
  },
  {
    id: "blog",
    name: "Blog",
    description: "Share your thoughts and stories",
    icon: Newspaper,
    pages: ["Home", "Blog", "About", "Contact"]
  },
  {
    id: "portfolio",
    name: "Portfolio",
    description: "Showcase your work and projects",
    icon: User,
    pages: ["Home", "Projects", "About", "Contact"]
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    description: "Sell products online",
    icon: ShoppingBag,
    pages: ["Home", "Products", "Cart", "Contact"]
  }
]

interface WebsiteTemplatesProps {
  onSelect: (templateId: string) => void;
}

export const WebsiteTemplates = ({ onSelect }: WebsiteTemplatesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {templates.map((template) => {
        const Icon = template.icon
        return (
          <Card key={template.id} className="cursor-pointer hover:border-primary transition-colors">
            <CardHeader>
              <Icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Includes pages:
                  <ul className="list-disc list-inside mt-1">
                    {template.pages.map((page) => (
                      <li key={page}>{page}</li>
                    ))}
                  </ul>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => onSelect(template.id)}
                >
                  Use Template
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}