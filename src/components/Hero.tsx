import { Button } from "@/components/ui/button"

export const Hero = () => {
  return (
    <div className="relative bg-background py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Discover Your Next Property Investment
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Access real-time auction data, market insights, and expert analysis to make informed real estate decisions.
          </p>
          <div className="flex gap-4">
            <Button size="lg">View Properties</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-[-1]" />
    </div>
  )
}