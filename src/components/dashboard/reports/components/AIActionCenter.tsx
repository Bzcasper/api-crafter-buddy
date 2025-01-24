import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface AnalyticsData {
  name: string
  value: number
  conversions: number
}

interface AIActionCenterProps {
  data: AnalyticsData[]
}

export const AIActionCenter = ({ data }: AIActionCenterProps) => {
  return (
    <Card className="bg-[#1E1B4B] text-white">
      <CardHeader>
        <CardTitle>AI Action Center</CardTitle>
        <p className="text-sm text-gray-400">
          Powered by Perplexity AI + SocialBoost
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Strategic Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 rounded bg-opacity-20 bg-green-500">
                <span className="text-green-400 font-medium">HIGH PRIORITY</span>
                <p>Video Content Push</p>
              </div>
              <div className="p-3 rounded bg-opacity-20 bg-yellow-500">
                <span className="text-yellow-400 font-medium">
                  MEDIUM PRIORITY
                </span>
                <p>Hashtag Strategy Update</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Growth Trajectory</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6366F1"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}