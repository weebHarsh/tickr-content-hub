"use client"

import React from "react"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

const BRAND_COLORS = ["#530093", "#A21094", "#7649E5", "#9260EB", "#B592F1", "#FFCC29"]

interface DonutChartProps {
  data: { name: string; value: number; color?: string }[]
  innerRadius?: number
  outerRadius?: number
  centerLabel?: string
  centerValue?: string
  height?: number
}

export function DonutChart({
  data,
  innerRadius = 60,
  outerRadius = 85,
  centerLabel,
  centerValue,
  height = 280,
}: DonutChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={entry.color || BRAND_COLORS[index % BRAND_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            fontSize: "13px",
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          formatter={(value: string) => <span className="text-xs text-gray-600">{value}</span>}
        />
        {centerValue && (
          <text x="50%" y="42%" textAnchor="middle" dominantBaseline="middle">
            <tspan x="50%" dy="-8" fontSize="22" fontWeight="600" fill="#201E1E">
              {centerValue}
            </tspan>
            {centerLabel && (
              <tspan x="50%" dy="22" fontSize="11" fill="#9ca3af">
                {centerLabel}
              </tspan>
            )}
          </text>
        )}
      </PieChart>
    </ResponsiveContainer>
  )
}
