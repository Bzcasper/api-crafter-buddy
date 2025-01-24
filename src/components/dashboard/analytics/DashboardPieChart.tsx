import { PieChart as RechartsePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const COLORS = ['#D3E4FD', '#B2CCFA', '#91B4F7', '#708CF4']

const pieData = [
  { name: "Website A", value: 400 },
  { name: "Website B", value: 300 },
  { name: "Website C", value: 300 },
  { name: "Website D", value: 200 },
]

interface DashboardPieChartProps {
  metricType: string;
  onMetricTypeChange: (value: string) => void;
}

export const DashboardPieChart = ({ metricType, onMetricTypeChange }: DashboardPieChartProps) => {
  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5" />
          Traffic Distribution
        </CardTitle>
        <Select value={metricType} onValueChange={onMetricTypeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="traffic">Traffic</SelectItem>
            <SelectItem value="clicks">Clicks</SelectItem>
            <SelectItem value="engagement">Engagement</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsePieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsePieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}