"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Share2,
  Eye,
  MousePointerClick,
  Star,
  Flame,
  Trophy,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { cn, formatNumber } from "@/lib/utils"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const reachOverTime = [
  { month: "Apr", reach: 8200 },
  { month: "May", reach: 11400 },
  { month: "Jun", reach: 9800 },
  { month: "Jul", reach: 14500 },
  { month: "Aug", reach: 18200 },
  { month: "Sep", reach: 22100 },
  { month: "Oct", reach: 19800 },
  { month: "Nov", reach: 25600 },
  { month: "Dec", reach: 21200 },
  { month: "Jan", reach: 28400 },
  { month: "Feb", reach: 32100 },
  { month: "Mar", reach: 34800 },
]

interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string
  change: number
  iconColor: string
  iconBg: string
}

function StatCard({ icon: Icon, label, value, change, iconColor, iconBg }: StatCardProps) {
  const isPositive = change >= 0
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className={cn("p-2 rounded-lg", iconBg)}>
            <Icon className="h-4 w-4" style={{ color: iconColor }} />
          </div>
          <div
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium",
              isPositive ? "text-green-600" : "text-red-600"
            )}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {isPositive ? "+" : ""}
            {change}%
          </div>
        </div>
        <p className="text-2xl font-bold font-[family-name:var(--font-poppins)] mt-3">
          {value}
        </p>
        <p className="text-xs text-gray-500 mt-1">{label}</p>
      </CardContent>
    </Card>
  )
}

export function ActivityStats() {
  const stats: StatCardProps[] = [
    {
      icon: Share2,
      label: "Total Shares",
      value: "187",
      change: 12,
      iconColor: "#530093",
      iconBg: "bg-purple-100",
    },
    {
      icon: Eye,
      label: "Total Reach",
      value: formatNumber(245000),
      change: 18,
      iconColor: "#A21094",
      iconBg: "bg-pink-100",
    },
    {
      icon: MousePointerClick,
      label: "Total Clicks",
      value: formatNumber(8920),
      change: 8,
      iconColor: "#0A66C2",
      iconBg: "bg-blue-100",
    },
    {
      icon: Star,
      label: "Points Earned",
      value: formatNumber(4250),
      change: 15,
      iconColor: "#FFCC29",
      iconBg: "bg-yellow-100",
    },
    {
      icon: Flame,
      label: "Current Streak",
      value: "14 days",
      change: 7,
      iconColor: "#F97316",
      iconBg: "bg-orange-100",
    },
    {
      icon: Trophy,
      label: "Current Rank",
      value: "#1",
      change: 0,
      iconColor: "#530093",
      iconBg: "bg-purple-100",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stat cards grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Reach chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Personal Reach Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reachOverTime}>
                <defs>
                  <linearGradient id="reachGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#530093" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#530093" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#9CA3AF" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => formatNumber(v)}
                />
                <Tooltip
                  formatter={(value: number) => [formatNumber(value), "Reach"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="reach"
                  stroke="#530093"
                  strokeWidth={2}
                  fill="url(#reachGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Level progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-medium text-gray-700">Level Progress</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Level 7 → Level 8
              </p>
            </div>
            <span className="text-sm font-semibold text-[#530093]">65%</span>
          </div>
          <Progress value={65} className="h-3" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-400">4,250 pts</span>
            <span className="text-xs text-gray-400">5,000 pts needed</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
