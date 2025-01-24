import { Button } from "@/components/ui/button"
import { Building } from "lucide-react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Building className="h-6 w-6" />
              <span className="font-bold">RealtyInsights</span>
            </Link>
            <div className="hidden md:flex gap-6">
              <Link to="/properties" className="text-muted-foreground hover:text-foreground">
                Properties
              </Link>
              <Link to="/auctions" className="text-muted-foreground hover:text-foreground">
                Auctions
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link to="/market-data" className="text-muted-foreground hover:text-foreground">
                Market Data
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}