"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts"
import { ShieldCheck, Clock, FileCheck, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ComplianceHealth } from "@/types/compliance"

interface HealthDashboardProps {
  health: ComplianceHealth
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#dc2626",
  major: "#f97316",
  minor: "#eab308",
  info: "#3b82f6",
}

const TYPE_COLORS: Record<string, string> = {
  brand: "#530093",
  legal: "#dc2626",
  format: "#f97316",
  content: "#A21094",
  code_integrity: "#3b82f6",
  caption: "#eab308",
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#eab308" : "#dc2626"
  const data = [
    { name: "score", value: score },
    { name: "remaining", value: 100 - score },
  ]

  return (
    <div className="relative flex items-center justify-center">
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={70}
          outerRadius={90}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
        >
          <Cell fill={color} />
          <Cell fill="#e5e7eb" />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-4xl font-bold font-[family-name:var(--font-poppins)]"
          style={{ color }}
        >
          {score}
        </span>
        <span className="text-xs text-gray-500 uppercase tracking-wide">
          Overall Score
        </span>
      </div>
    </div>
  )
}

function MetricCard({
  icon: Icon,
  label,
  value,
  suffix,
  color,
}: {
  icon: React.ElementType
  label: string
  value: string | number
  suffix?: string
  color: string
}) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div
          className={cn("flex h-10 w-10 items-center justify-center rounded-lg")}
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div>
          <p className="text-2xl font-bold font-[family-name:var(--font-poppins)]">
            {value}
            {suffix && (
              <span className="text-sm font-normal text-gray-500 ml-1">
                {suffix}
              </span>
            )}
          </p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function HealthDashboard({ health }: HealthDashboardProps) {
  const typeData = health.violationsByType.map((v) => ({
    name: v.type.replace("_", " "),
    count: v.count,
    fill: TYPE_COLORS[v.type] || "#530093",
  }))

  const severityData = health.violationsBySeverity.map((v) => ({
    name: v.severity,
    value: v.count,
  }))

  return (
    <div className="space-y-6">
      {/* Score + Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-1 flex items-center justify-center">
          <CardContent className="p-6">
            <ScoreRing score={health.overallScore} />
          </CardContent>
        </Card>

        <div className="lg:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard
            icon={FileCheck}
            label="First-Pass Rate"
            value={`${health.firstPassRate}%`}
            color="#16a34a"
          />
          <MetricCard
            icon={Clock}
            label="Avg Validation Time"
            value={health.avgValidationTime}
            suffix="s"
            color="#3b82f6"
          />
          <MetricCard
            icon={ShieldCheck}
            label="Total Validations"
            value={health.totalValidations.toLocaleString()}
            color="#530093"
          />
          <MetricCard
            icon={AlertTriangle}
            label="Total Violations"
            value={health.totalViolations.toLocaleString()}
            color="#dc2626"
          />
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Violations by Type */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Violations by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {typeData.map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize text-gray-700">{item.name}</span>
                    <span className="font-medium">{item.count}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(item.count / Math.max(...typeData.map((d) => d.count))) * 100}%`,
                        backgroundColor: item.fill,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Violations by Severity */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Violations by Severity</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <PieChart width={200} height={200}>
              <Pie
                data={severityData}
                cx={100}
                cy={100}
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                stroke="#fff"
                strokeWidth={2}
              >
                {severityData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={SEVERITY_COLORS[entry.name] || "#gray"}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {severityData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: SEVERITY_COLORS[entry.name],
                    }}
                  />
                  <span className="capitalize text-gray-600">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Compliance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={health.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v) => v.split(" ")[0]}
                />
                <YAxis domain={[70, 100]} tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#530093"
                  strokeWidth={2}
                  dot={{ fill: "#530093", r: 3 }}
                  activeDot={{ r: 5, fill: "#A21094" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
