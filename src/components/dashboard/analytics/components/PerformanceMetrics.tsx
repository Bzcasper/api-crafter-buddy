import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, Percent } from "lucide-react"

const statsData = [
  {
    title: "Total Traffic",
    value: "245.8K",
    change: "+28.5%",
    icon: Users,
    description: "Organic: 45%, Paid: 55%",
  },
  {
    title: "Conversions",
    value: "3,892",
    change: "+12.3%",
    icon: TrendingUp,
    description: "CR: 4.2%, Prev Month: +15%",
  },
  {
    title: "Revenue",
    value: "$330.5K",
    change: "+8.7%",
    icon: DollarSign,
    description: "Rev: $2k+, MoM: +4%",
  },
  {
    title: "Affiliate Revenue",
    value: "$42.3K",
    change: "+15.2%",
    icon: Percent,
    description: "Partners: 25, Prev CPA: +5%",
  },
]

export const PerformanceMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <div className="flex items-baseline space-x-2">
                  <h2 className="text-3xl font-bold">{stat.value}</h2>
                  <span className="text-sm text-green-500">{stat.change}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}