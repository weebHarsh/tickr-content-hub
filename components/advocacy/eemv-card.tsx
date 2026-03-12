"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { TrendingUp, Eye, BarChart3, Target } from "lucide-react"
import { mockEEMVData } from "@/lib/mock-data/advocacy"
import { formatNumber } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export function EEMVCard() {
  const { totalEEMV, equivalentAdSpend, totalReach, totalImpressions, avgEngagementRate, monthlyTrend } = mockEEMVData
  const savings = totalEEMV - equivalentAdSpend

  // Format to lakhs
  const formatLakhs = (n: number) => `${(n / 100000).toFixed(1)}L`

  // Last 6 months of trend data
  const chartData = monthlyTrend.slice(-6).map((d) => ({
    month: d.month.split(" ")[0],
    EEMV: d.eemv / 1000,
    "Ad Spend": d.adSpend / 1000,
  }))

  return (
    <Card className="border-l-4 border-l-[#530093]">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-[#530093]" />
          EEMV Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main value */}
        <div>
          <p className="text-3xl font-bold font-[family-name:var(--font-poppins)] text-[#530093]">
            ₹{formatLakhs(totalEEMV)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Equivalent Ad Spend: ₹{formatLakhs(equivalentAdSpend)}
          </p>
        </div>

        {/* Savings indicator */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-green-50 border border-green-200">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="text-sm font-medium text-green-700">
            Saving ₹{formatLakhs(savings)} vs paid media
          </span>
        </div>

        {/* Mini bar chart */}
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9CA3AF" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `${v}K`}
              />
              <Tooltip
                formatter={(value: number) => [`₹${value}K`, undefined]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "11px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "10px" }} />
              <Bar dataKey="EEMV" fill="#530093" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Ad Spend" fill="#A21094" radius={[4, 4, 0, 0]} opacity={0.5} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-100">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Eye className="h-3 w-3 text-gray-400" />
            </div>
            <p className="text-sm font-semibold">{formatNumber(totalReach)}</p>
            <p className="text-[10px] text-gray-500">Total Reach</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <BarChart3 className="h-3 w-3 text-gray-400" />
            </div>
            <p className="text-sm font-semibold">{formatNumber(totalImpressions)}</p>
            <p className="text-[10px] text-gray-500">Impressions</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-3 w-3 text-gray-400" />
            </div>
            <p className="text-sm font-semibold">{avgEngagementRate}%</p>
            <p className="text-[10px] text-gray-500">Eng. Rate</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
