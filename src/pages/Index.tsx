import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PropertyMap } from "@/components/map/PropertyMap"
import { BlogPostList } from "@/components/blog/BlogPostList"
import { Hero } from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { Building, MapPin, TrendingUp, Users } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        {/* Stats Section */}
        <section className="container mx-auto py-12 grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Listings</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,345</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cities Covered</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
            </CardContent>
          </Card>
        </section>

        {/* Map Section */}
        <section className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-8">Nearby Properties & Auctions</h2>
          <div className="h-[600px] w-full rounded-lg overflow-hidden">
            <PropertyMap />
          </div>
        </section>

        {/* Blog Section */}
        <section className="container mx-auto py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest Real Estate Insights</h2>
            <Button variant="outline">View All Posts</Button>
          </div>
          <BlogPostList />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Index