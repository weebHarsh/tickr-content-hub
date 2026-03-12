"use client"

import { TrendingUp, TrendingDown, Eye, Download, Share2, ImageIcon } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { LineChart, PieChart, BarChart } from "@/components/charts/client-only"
import { mockContentAnalytics } from "@/lib/mock-data/analytics"
import { formatNumber } from "@/lib/utils"

const stats = [
  {
    label: "Total Creatives",
    value: mockContentAnalytics.totalCreatives,
    change: 12.3,
    icon: ImageIcon,
  },
  {
    label: "Total Views",
    value: mockContentAnalytics.totalViews,
    change: 8.7,
    icon: Eye,
  },
  {
    label: "Total Downloads",
    value: mockContentAnalytics.totalDownloads,
    change: 5.2,
    icon: Download,
  },
  {
    label: "Total Shares",
    value: mockContentAnalytics.totalShares,
    change: -2.1,
    icon: Share2,
  },
]

export function ContentAnalytics() {
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
                    {formatNumber(stat.value)}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Views/Downloads/Shares Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Views, Downloads & Shares Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={mockContentAnalytics.viewsTrend}
            xAxisKey="date"
            lines={[
              { dataKey: "views", name: "Views", color: "#530093" },
              { dataKey: "downloads", name: "Downloads", color: "#A21094" },
              { dataKey: "shares", name: "Shares", color: "#FFCC29" },
            ]}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Format Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Format Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={mockContentAnalytics.formatDistribution} height={300} />
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Platform Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={mockContentAnalytics.platformPerformance}
              xAxisKey="name"
              bars={[{ dataKey: "value", name: "Views" }]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Top Creatives Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Creatives by Engagement</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="text-right">Downloads</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockContentAnalytics.topCreatives.map((creative, index) => (
                <TableRow key={creative.id}>
                  <TableCell className="font-medium text-gray-500">{index + 1}</TableCell>
                  <TableCell className="font-medium">{creative.title}</TableCell>
                  <TableCell className="text-right">{formatNumber(creative.views)}</TableCell>
                  <TableCell className="text-right">{formatNumber(creative.downloads)}</TableCell>
                  <TableCell className="text-right">{formatNumber(creative.shares)}</TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center rounded-full bg-[#530093]/10 px-2.5 py-0.5 text-sm font-medium text-[#530093]">
                      {creative.engagement}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
