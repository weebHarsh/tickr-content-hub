"use client"

import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const BRAND_COLORS = ["#530093", "#A21094", "#7649E5", "#9260EB", "#B592F1", "#FFCC29"]

interface PieDataItem {
  name: string
  value: number
  color?: string
}

interface PieChartProps {
  data: PieDataItem[]
  height?: number
  showLabels?: boolean
  showLegend?: boolean
}

const renderLabel = ({
  name,
  percent,
}: {
  name: string
  percent: number
}) => `${name} ${(percent * 100).toFixed(0)}%`

export function PieChart({
  data,
  height = 350,
  showLabels = true,
  showLegend = true,
}: PieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
          label={showLabels ? renderLabel : false}
          labelLine={showLabels}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color || BRAND_COLORS[index % BRAND_COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        />
        {showLegend && <Legend />}
      </RechartsPieChart>
    </ResponsiveContainer>
  )
}
