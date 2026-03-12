"use client"

import { TrendingUp, TrendingDown, Users, BarChart3, ShoppingCart, IndianRupee } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { LineChart, PieChart, BarChart } from "@/components/charts/client-only"
import { mockPartnerAnalytics } from "@/lib/mock-data/analytics"
import { formatNumber, formatCurrency } from "@/lib/utils"

const stats = [
  {
    label: "Active Partners",
    value: mockPartnerAnalytics.activePartners,
    change: 14.3,
    icon: Users,
    display: String(mockPartnerAnalytics.activePartners),
  },
  {
    label: "Code Utilization",
    value: mockPartnerAnalytics.codeUtilization,
    change: 4.1,
    icon: BarChart3,
    display: `${mockPartnerAnalytics.codeUtilization}%`,
  },
  {
    label: "Total Conversions",
    value: mockPartnerAnalytics.totalConversions,
    change: 9.7,
    icon: ShoppingCart,
    display: formatNumber(mockPartnerAnalytics.totalConversions),
  },
  {
    label: "Total Revenue",
    value: mockPartnerAnalytics.totalRevenue,
    change: 11.2,
    icon: IndianRupee,
    display: formatCurrency(mockPartnerAnalytics.totalRevenue),
  },
]

export function PartnerAnalytics() {
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
                    {stat.display}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Partner Growth Trend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Partner Growth & Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart
            data={mockPartnerAnalytics.partnerTrend}
            xAxisKey="date"
            lines={[
              { dataKey: "partners", name: "Active Partners", color: "#530093" },
              { dataKey: "conversions", name: "Conversions", color: "#A21094" },
            ]}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tier Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Partner Tier Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart
              data={mockPartnerAnalytics.tierDistribution.map((item, i) => ({
                ...item,
                color: ["#530093", "#A21094", "#7649E5", "#B592F1"][i],
              }))}
              height={300}
            />
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart
              data={mockPartnerAnalytics.conversionFunnel}
              xAxisKey="stage"
              bars={[{ dataKey: "value", name: "Count", color: "#530093" }]}
              height={300}
            />
          </CardContent>
        </Card>
      </div>

      {/* Top Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">#</TableHead>
                <TableHead>Partner Name</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Compliance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPartnerAnalytics.topPartners.map((partner, index) => (
                <TableRow key={partner.name}>
                  <TableCell className="font-medium text-gray-500">{index + 1}</TableCell>
                  <TableCell className="font-medium">{partner.name}</TableCell>
                  <TableCell className="text-right">{formatNumber(partner.conversions)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(partner.revenue)}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={partner.compliance >= 95 ? "default" : partner.compliance >= 90 ? "secondary" : "outline"}
                      className={
                        partner.compliance >= 95
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : partner.compliance >= 90
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      }
                    >
                      {partner.compliance}%
                    </Badge>
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
