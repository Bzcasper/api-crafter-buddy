import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Search, MapPin, DollarSign, Building2, TrendingUp, Shield, Users, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import { PropertyMap } from "@/components/map/PropertyMap"

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section with Gradient Overlay */}
      <section className="relative bg-[#1A1F2C] text-white py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Perfect Property Investment
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Access real-time market data, expert insights, and exclusive property listings to make informed investment decisions.
            </p>
            <div className="relative max-w-2xl">
              <Input
                type="text"
                placeholder="Search by location, property type, or keywords..."
                className="w-full h-14 pl-12 pr-4 rounded-lg text-gray-900 bg-white/95"
              />
              <Search className="absolute left-4 top-4 text-gray-400" />
              <Button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700">
                Search Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose RealtyInsights?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, title: "Market Analytics", desc: "Real-time market trends and analysis" },
              { icon: Shield, title: "Secure Investment", desc: "Verified properties and secure transactions" },
              { icon: Users, title: "Expert Support", desc: "Professional guidance throughout" },
              { icon: Clock, title: "Time Efficiency", desc: "Quick and streamlined process" }
            ].map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section with Enhanced UI */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Explore Properties</h2>
              <p className="text-gray-600">Browse through our interactive map to find properties in your desired location</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Button variant="outline" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Filter by Location
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" /> Price Range
              </Button>
            </div>
          </div>
          <div className="h-[600px] w-full rounded-lg overflow-hidden shadow-lg">
            <PropertyMap />
          </div>
        </div>
      </section>

      {/* Featured Properties with Enhanced Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                price: "$299,000",
                address: "123 Main St, City",
                details: "3 Beds • 2 Baths • 1,800 sqft",
                tag: "FOR SALE",
                tagColor: "bg-green-500"
              },
              {
                price: "$450,000",
                address: "456 Oak Ave, City",
                details: "4 Beds • 3 Baths • 2,200 sqft",
                tag: "AUCTION",
                tagColor: "bg-orange-500"
              },
              {
                price: "$599,000",
                address: "789 Pine Rd, City",
                details: "5 Beds • 4 Baths • 3,000 sqft",
                tag: "FEATURED",
                tagColor: "bg-blue-500"
              }
            ].map((property, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gray-200 relative">
                  <span className={`absolute top-4 left-4 ${property.tagColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                    {property.tag}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{property.price}</h3>
                    <Button variant="ghost" size="sm">
                      <Building2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-2">{property.address}</p>
                  <p className="text-gray-500 text-sm">{property.details}</p>
                  <Button className="w-full mt-4">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Property Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who have found their perfect property through RealtyInsights.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Index