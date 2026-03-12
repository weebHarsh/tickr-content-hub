"use client"

import { TrendingUp, TrendingDown, Users, Target, Globe, IndianRupee } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChart, PieChart, BarChart } from "@/components/charts/client-only"
import { mockAdvocacyAnalytics } from "@/lib/mock-data/analytics"
import { formatNumber, formatCurrency } from "@/lib/utils"

import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const stats = [
  {
    label: "Active Advocates",
    value: mockAdvocacyAnalytics.activeAdvocates,
    change: 15.4,
    icon: Users,
    format: "number" as const,
  },
  {
    label: "Participation Rate",
    value: mockAdvocacyAnalytics.participationRate,
    change: 3.2,
    icon: Target,
    format: "percent" as const,
  },
  {
    label: "Total Reach",
    value: mockAdvocacyAnalytics.totalReach,
    change: 22.1,
    icon: Globe,
    format: "number" as const,
  },
  {
    label: "EEMV",
    value: mockAdvocacyAnalytics.eemvTotal,
    change: 18.6,
    icon: IndianRupee,
    format: "currency" as const,
  },
]

function formatStatValue(value: number, format: "number" | "percent" | "currency") {
  if (format === "currency") return formatCurrency(value)
  if (format === "percent") return `${value}%`
  return formatNumber(value)
}

export function AdvocacyAnalytics() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const isPositive = stat.change >= 0
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-[#530093]/10 p-2">
                    <Icon className="h-5 w-5 text-[#530093]" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold font-[family-name:var(--font-poppins)]">
                    {formatStatValue(stat.value, stat.format)}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Reach & Impressions Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reach & Impressions Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={mockAdvocacyAnalytics.reachTrend}
            xAxisKey="date"
            lines={[
              { dataKey: "reach", name: "Reach", color: "#530093" },
              { dataKey: "impressions", name: "Impressions", color: "#A21094" },
            ]}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shares by Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={mockAdvocacyAnalytics.platformBreakdown} height={300} />
          </CardContent>
        </Card>

        {/* Department Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Department Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={mockAdvocacyAnalytics.departmentLeaderboard}
              xAxisKey="department"
              bars={[
                { dataKey: "shares", name: "Shares", color: "#530093" },
                { dataKey: "reach", name: "Reach", color: "#A21094" },
              ]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Active Advocates Over Time - Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Active Advocates Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart
              data={mockAdvocacyAnalytics.reachTrend}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                tickLine={false}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Area
                type="monotone"
                dataKey="advocates"
                name="Active Advocates"
                stroke="#530093"
                fill="#530093"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
