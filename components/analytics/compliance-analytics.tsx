"use client"

import { TrendingUp, TrendingDown, CheckCircle, Clock, FileCheck, ShieldCheck } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { LineChart, PieChart, BarChart } from "@/components/charts/client-only"
import { mockComplianceAnalytics } from "@/lib/mock-data/analytics"
import { formatNumber } from "@/lib/utils"

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
    label: "First-Pass Rate",
    value: `${mockComplianceAnalytics.firstPassRate}%`,
    change: 4.2,
    icon: CheckCircle,
  },
  {
    label: "Avg Remediation Time",
    value: `${mockComplianceAnalytics.avgRemediationTime}h`,
    change: -12.5,
    icon: Clock,
  },
  {
    label: "Total Validations",
    value: formatNumber(mockComplianceAnalytics.totalValidations),
    change: 18.3,
    icon: FileCheck,
  },
  {
    label: "Compliance Score",
    value: `${mockComplianceAnalytics.complianceScore}/100`,
    change: 2.1,
    icon: ShieldCheck,
  },
]

export function ComplianceAnalytics() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          // For remediation time, negative change is good (faster)
          const isPositive = stat.label === "Avg Remediation Time" ? stat.change <= 0 : stat.change >= 0
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-[#530093]/10 p-2">
                    <Icon className="h-5 w-5 text-[#530093]" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? "text-green-600" : "text-red-600"}`}>
                    {stat.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    {Math.abs(stat.change)}%
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold font-[family-name:var(--font-poppins)]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Approval Rate Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Approval Rate Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={mockComplianceAnalytics.approvalTrend}
            xAxisKey="date"
            lines={[
              { dataKey: "approved", name: "Approved", color: "#22c55e" },
              { dataKey: "rejected", name: "Rejected", color: "#ef4444" },
              { dataKey: "pending", name: "Pending", color: "#FFCC29" },
            ]}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Violation Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Violation Types</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={mockComplianceAnalytics.violationTypes} height={300} />
          </CardContent>
        </Card>

        {/* Remediation SLA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Remediation Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={mockComplianceAnalytics.remediationSLA}
              xAxisKey="name"
              bars={[{ dataKey: "value", name: "Issues", color: "#530093" }]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Monthly Compliance Scores - Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Compliance Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsAreaChart
              data={mockComplianceAnalytics.monthlyScores}
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
                domain={[60, 100]}
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
                dataKey="score"
                name="Compliance Score"
                stroke="#530093"
                fill="#530093"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="firstPassRate"
                name="First-Pass Rate"
                stroke="#A21094"
                fill="#A21094"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
