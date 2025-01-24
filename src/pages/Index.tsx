import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Search, MapPin, DollarSign, Building2 } from "lucide-react"
import { Link } from "react-router-dom"
import { PropertyMap } from "@/components/map/PropertyMap"

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-[#1A1F2C] text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Looking for a home or investment?
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Discover your perfect property with our curated selection of deals and auctions.
            </p>
            <div className="relative">
              <Input
                type="text"
                placeholder="Search properties, areas, or anything else..."
                className="w-full h-14 pl-12 pr-4 rounded-lg text-gray-900"
              />
              <Search className="absolute left-4 top-4 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Explore Properties</h2>
        <div className="h-[600px] w-full">
          <PropertyMap />
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Properties</h2>
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
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <span className={`absolute top-4 left-4 ${property.tagColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                    {property.tag}
                  </span>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{property.price}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{property.address}</p>
                  <p className="text-gray-500 text-sm">{property.details}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-[#1A1F2C] text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: "Browse Properties",
                description: "Explore our curated selection",
                icon: Building2
              },
              {
                step: 2,
                title: "Find Your Deal",
                description: "Compare values and features",
                icon: Search
              },
              {
                step: 3,
                title: "Make It Yours",
                description: "Simple purchase process",
                icon: DollarSign
              }
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Latest from our Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              category: "MARKET TRENDS",
              title: "2025 Real Estate Market Forecast",
              description: "Discover the upcoming trends and opportunities in the real estate market..."
            },
            {
              category: "INVESTMENT TIPS",
              title: "Maximizing Returns on Property Investment",
              description: "Learn expert strategies for successful real estate investment..."
            }
          ].map((post, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="text-sm text-blue-500 font-medium mb-2">{post.category}</div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8">Get the latest property deals and market insights delivered to your inbox</p>
          <div className="max-w-md mx-auto flex gap-4">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Index
