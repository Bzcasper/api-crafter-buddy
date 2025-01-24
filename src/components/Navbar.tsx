import { Button } from "@/components/ui/button"
import { Building } from "lucide-react"
import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <Building className="h-6 w-6 text-blue-500" />
              <span className="font-bold">RealtyInsights</span>
            </Link>
            <div className="hidden md:flex gap-6">
              <Link to="/properties" className="text-gray-600 hover:text-gray-900">
                Properties
              </Link>
              <Link to="/auctions" className="text-gray-600 hover:text-gray-900">
                Auctions
              </Link>
              <Link to="/blog" className="text-gray-600 hover:text-gray-900">
                Blog
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link to="/auth">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}