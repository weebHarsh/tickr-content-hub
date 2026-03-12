"use client"

import { useState } from "react"
import { BarChart3, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ContentAnalytics } from "@/components/analytics/content-analytics"
import { AdvocacyAnalytics } from "@/components/analytics/advocacy-analytics"
import { PartnerAnalytics } from "@/components/analytics/partner-analytics"
import { ComplianceAnalytics } from "@/components/analytics/compliance-analytics"

export default function AnalyticsPage() {
  const [timePeriod, setTimePeriod] = useState("last-year")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#530093]/10 p-2">
            <BarChart3 className="h-6 w-6 text-[#530093]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-gray-900">
              Analytics & Intelligence
            </h1>
            <p className="text-sm text-gray-500">
              Unified dashboards for content, advocacy, partner, and compliance insights
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            className="border-[#530093] text-[#530093] hover:bg-[#530093]/5"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-grid">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="advocacy">Advocacy</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-6">
          <ContentAnalytics />
        </TabsContent>

        <TabsContent value="advocacy" className="mt-6">
          <AdvocacyAnalytics />
        </TabsContent>

        <TabsContent value="partners" className="mt-6">
          <PartnerAnalytics />
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <ComplianceAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
