"use client"

import React from "react"
import { Library, Users, Handshake, ShieldCheck, Upload, Megaphone, QrCode } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"
import { ActivityFeed } from "@/components/shared/activity-feed"
import { AreaChart, DonutChart } from "@/components/charts/client-only"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockContentAnalytics, mockAdvocacyAnalytics, mockPartnerAnalytics, mockComplianceAnalytics } from "@/lib/mock-data/analytics"
import { mockLeaderboard } from "@/lib/mock-data/advocacy"
import { mockComplianceHealth } from "@/lib/mock-data/compliance"
import { formatNumber } from "@/lib/utils"
import { getInitials } from "@/lib/utils"
import type { Activity } from "@/types/common"

const recentActivities: Activity[] = [
  { id: "1", user: "Priya Sharma", action: "uploaded", target: "Diwali Sale Banner 2025", module: "library", timestamp: "2026-03-12T10:30:00Z" },
  { id: "2", user: "Rahul Gupta", action: "shared on LinkedIn", target: "Q4 Performance Report", module: "advocacy", timestamp: "2026-03-12T09:45:00Z" },
  { id: "3", user: "Anita Desai", action: "generated codes for", target: "North Region Campaign", module: "partners", timestamp: "2026-03-12T09:20:00Z" },
  { id: "4", user: "Vikram Singh", action: "approved", target: "Instagram Story - Product Launch", module: "compliance", timestamp: "2026-03-12T08:55:00Z" },
  { id: "5", user: "Meera Patel", action: "created collection", target: "Social Media Kit Q1", module: "library", timestamp: "2026-03-11T17:30:00Z" },
  { id: "6", user: "Arjun Nair", action: "shared on Twitter", target: "Brand Guidelines Update", module: "advocacy", timestamp: "2026-03-11T16:15:00Z" },
  { id: "7", user: "Deepa Krishnan", action: "flagged violation in", target: "Partner Creative #42", module: "compliance", timestamp: "2026-03-11T15:00:00Z" },
  { id: "8", user: "Suresh Kumar", action: "onboarded partner", target: "TechVista Solutions", module: "partners", timestamp: "2026-03-11T14:20:00Z" },
]

const complianceDonutData = [
  { name: "Compliant", value: mockComplianceHealth.overallScore, color: "#22c55e" },
  { name: "Non-Compliant", value: 100 - mockComplianceHealth.overallScore, color: "#e5e7eb" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-brand-dark">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back, Admin</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Library}
          label="Total Creatives"
          value={mockContentAnalytics.totalCreatives}
          change={12.5}
          changeLabel="vs last month"
        />
        <StatCard
          icon={Users}
          label="Active Advocates"
          value={mockAdvocacyAnalytics.activeAdvocates}
          change={8.3}
          changeLabel="vs last month"
        />
        <StatCard
          icon={Handshake}
          label="Active Partners"
          value={mockPartnerAnalytics.activePartners}
          change={5.0}
          changeLabel="vs last month"
        />
        <StatCard
          icon={ShieldCheck}
          label="Compliance Score"
          value={`${mockComplianceAnalytics.complianceScore}%`}
          change={2.1}
          changeLabel="vs last month"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Content Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <AreaChart
              data={mockContentAnalytics.viewsTrend}
              dataKey="views"
              xAxisKey="date"
              height={280}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Top Advocates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockLeaderboard.slice(0, 5).map((entry) => (
                <div key={entry.rank} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-400 w-5">#{entry.rank}</span>
                  <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-brand-primary flex-shrink-0">
                    {getInitials(entry.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{entry.name}</p>
                    <p className="text-xs text-gray-400">{entry.department}</p>
                  </div>
                  <span className="text-sm font-semibold text-brand-primary">{formatNumber(entry.points)} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Compliance Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityFeed activities={recentActivities} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compliance Health</CardTitle>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={complianceDonutData}
              centerValue={`${mockComplianceHealth.overallScore}%`}
              centerLabel="Overall Score"
              height={240}
            />
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="text-center p-2 rounded-lg bg-gray-50">
                <p className="text-lg font-semibold text-brand-dark">{mockComplianceHealth.firstPassRate}%</p>
                <p className="text-xs text-gray-500">First-Pass Rate</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-gray-50">
                <p className="text-lg font-semibold text-brand-dark">{mockComplianceHealth.totalValidations}</p>
                <p className="text-xs text-gray-500">Total Validations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Creative
            </Button>
            <Button variant="secondary" className="gap-2">
              <Megaphone className="h-4 w-4" />
              Create Campaign
            </Button>
            <Button variant="secondary" className="gap-2">
              <QrCode className="h-4 w-4" />
              Generate Codes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
