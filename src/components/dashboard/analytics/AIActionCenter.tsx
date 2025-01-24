import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const growthData = [
  { month: "Jan", value: 100 },
  { month: "Feb", value: 120 },
  { month: "Mar", value: 150 },
  { month: "Apr", value: 180 },
  { month: "May", value: 220 },
  { month: "Jun", value: 280 },
  { month: "Jul", value: 350 },
]

const engagementData = [
  { name: "Likes", value: 40 },
  { name: "Shares", value: 30 },
  { name: "Comments", value: 30 },
]

const COLORS = ["#6366F1", "#22C55E", "#8B5CF6"]

export const AIActionCenter = () => {
  return (
    <Card className="bg-[#1E1B4B] text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>AI Action Center</span>
          <span className="text-sm font-normal text-gray-400">
            Powered by Perplexity AI + SocialBoost
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h3 className="font-semibold">Strategic Recommendations</h3>
            <div className="space-y-3">
              <div className="p-3 rounded bg-opacity-20 bg-[#22C55E] bg-opacity-20">
                <span className="text-[#22C55E] font-medium">HIGH PRIORITY</span>
                <p className="text-white">Video Content Push</p>
                <p className="text-sm text-gray-400">Potential impact: +35% engagement</p>
              </div>
              <div className="p-3 rounded bg-[#F59E0B] bg-opacity-20">
                <span className="text-[#F59E0B] font-medium">MEDIUM PRIORITY</span>
                <p className="text-white">Hashtag Strategy Update</p>
                <p className="text-sm text-gray-400">Potential impact: +25% reach</p>
              </div>
              <div className="p-3 rounded bg-[#F59E0B] bg-opacity-20">
                <span className="text-[#F59E0B] font-medium">MEDIUM PRIORITY</span>
                <p className="text-white">Content Schedule Optimization</p>
                <p className="text-sm text-gray-400">Potential impact: +20% engagement</p>
              </div>
              <div className="p-3 rounded bg-[#8B5CF6] bg-opacity-20">
                <span className="text-[#8B5CF6] font-medium">PERPLEXITY AI INSIGHTS</span>
                <ul className="text-sm space-y-1 mt-2 text-gray-300">
                  <li>• Market trend alignment: 93%</li>
                  <li>• Competitor gap opportunity: 28%</li>
                  <li>• Content virality potential: High</li>
                  <li>• Audience growth trajectory: Accelerating</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Engagement Distribution</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={engagementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {engagementData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Growth Trajectory</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <XAxis 
                      dataKey="month" 
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280' }}
                    />
                    <YAxis 
                      stroke="#6B7280"
                      tick={{ fill: '#6B7280' }}
                    />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366F1"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-lg bg-opacity-20 bg-white">
            <p className="text-gray-400">Engagement Score</p>
            <div className="flex items-baseline mt-1">
              <h2 className="text-3xl font-bold">92.4</h2>
              <span className="ml-2 text-[#22C55E]">+12.3%</span>
            </div>
            <p className="text-sm text-gray-400">vs. Last Period</p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-20 bg-white">
            <p className="text-gray-400">Content Quality</p>
            <div className="flex items-baseline mt-1">
              <h2 className="text-3xl font-bold">88%</h2>
              <span className="ml-2 text-[#22C55E]">+8.7%</span>
            </div>
            <p className="text-sm text-gray-400">vs. Benchmark</p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-20 bg-white">
            <p className="text-gray-400">Audience Growth</p>
            <div className="flex items-baseline mt-1">
              <h2 className="text-3xl font-bold">+2.8K</h2>
              <span className="ml-2 text-[#22C55E]">+12.4%</span>
            </div>
            <p className="text-sm text-gray-400">New Followers</p>
          </div>
          <div className="p-4 rounded-lg bg-opacity-20 bg-white">
            <p className="text-gray-400">ROI</p>
            <div className="flex items-baseline mt-1">
              <h2 className="text-3xl font-bold">342%</h2>
              <span className="ml-2 text-[#22C55E]">+25.9%</span>
            </div>
            <p className="text-sm text-gray-400">Above Target</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}