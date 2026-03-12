"use client"

import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { formatNumber } from "@/lib/utils"

interface FunnelStage {
  stage: string
  value: number
}

interface ConversionFunnelProps {
  data: FunnelStage[]
  title?: string
}

const FUNNEL_COLORS = ["#B592F1", "#8F5FEA", "#7649E5", "#530093"]

export function ConversionFunnel({
  data,
  title = "Conversion Funnel",
}: ConversionFunnelProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  const rates: string[] = []
  for (let i = 1; i < data.length; i++) {
    const rate = data[i - 1].value > 0
      ? ((data[i].value / data[i - 1].value) * 100).toFixed(1)
      : "0.0"
    rates.push(`${rate}%`)
  }

  const totalConversionRate =
    data.length >= 2 && data[0].value > 0
      ? ((data[data.length - 1].value / data[0].value) * 100).toFixed(1)
      : "0.0"

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="text-right">
            <p className="text-xs text-gray-500">Total Conversion Rate</p>
            <p className="text-2xl font-bold text-[#530093]">{totalConversionRate}%</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 60, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                type="number"
                tickFormatter={(v) => formatNumber(v)}
                domain={[0, maxValue * 1.1]}
              />
              <YAxis
                type="category"
                dataKey="stage"
                width={90}
                tick={{ fontSize: 13, fontWeight: 500 }}
              />
              <Tooltip
                formatter={(value: number) => [formatNumber(value), "Count"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                }}
              />
              <Bar
                dataKey="value"
                radius={[0, 6, 6, 0]}
                barSize={36}
              >
                {data.map((_, index) => (
                  <Cell key={index} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
                ))}
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v: number) => formatNumber(v)}
                  style={{ fontSize: 12, fontWeight: 600, fill: "#374151" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stage-to-stage conversion rates */}
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
          {data.map((stage, idx) => (
            <React.Fragment key={stage.stage}>
              <div className="flex items-center gap-1.5">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: FUNNEL_COLORS[idx % FUNNEL_COLORS.length] }}
                />
                <span className="text-xs font-medium text-gray-600">{stage.stage}</span>
              </div>
              {idx < data.length - 1 && (
                <span className="text-xs font-bold text-[#530093] bg-[#530093]/10 px-2 py-0.5 rounded-full">
                  {rates[idx]}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
