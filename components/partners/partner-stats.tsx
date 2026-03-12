"use client"

import React from "react"
import { Scan, Target, IndianRupee, ShieldCheck, Clock } from "lucide-react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn, formatNumber, formatCurrency, formatDateTime } from "@/lib/utils"
import { mockReferralCodes } from "@/lib/mock-data/partners"
import type { Partner } from "@/types/partners"

interface PartnerStatsProps {
  partner: Partner
}

const activityEvents = [
  { action: "New conversion recorded", source: "Website", time: "2 hours ago" },
  { action: "QR code scanned", source: "Print Campaign", time: "5 hours ago" },
  { action: "Lead form submitted", source: "Landing Page", time: "8 hours ago" },
  { action: "Creative downloaded", source: "Partner Portal", time: "1 day ago" },
  { action: "New conversion recorded", source: "Email Campaign", time: "1 day ago" },
  { action: "Code shared via social", source: "LinkedIn", time: "2 days ago" },
  { action: "Compliance check passed", source: "Auto-Scan", time: "2 days ago" },
  { action: "QR code scanned", source: "Event Banner", time: "3 days ago" },
  { action: "New lead captured", source: "Webinar", time: "3 days ago" },
  { action: "Monthly report generated", source: "System", time: "4 days ago" },
]

export function PartnerStats({ partner }: PartnerStatsProps) {
  const partnerCodes = mockReferralCodes.filter((c) => c.partnerId === partner.id)

  const statCards = [
    {
      title: "Total Scans",
      value: formatNumber(partner.totalScans),
      icon: Scan,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Conversions",
      value: formatNumber(partner.totalConversions),
      icon: Target,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Revenue",
      value: formatCurrency(partner.revenue),
      icon: IndianRupee,
      color: "text-[#530093]",
      bg: "bg-[#530093]/10",
    },
    {
      title: "Compliance Score",
      value: `${partner.complianceScore}%`,
      icon: ShieldCheck,
      color:
        partner.complianceScore > 80
          ? "text-green-600"
          : partner.complianceScore > 60
          ? "text-yellow-600"
          : "text-red-600",
      bg:
        partner.complianceScore > 80
          ? "bg-green-50"
          : partner.complianceScore > 60
          ? "bg-yellow-50"
          : "bg-red-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", stat.bg)}>
                  <stat.icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.title}</p>
                  <p className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#530093]" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityEvents.map((event, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-[#530093] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{event.action}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{event.source}</span>
                      <span className="text-gray-300">|</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Codes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Assigned Codes ({partnerCodes.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {partnerCodes.length > 0 ? (
              <div className="space-y-3">
                {partnerCodes.map((code) => (
                  <div
                    key={code.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                  >
                    <div>
                      <code className="font-mono font-semibold text-[#530093]">
                        {code.code}
                      </code>
                      <p className="text-xs text-gray-500 mt-0.5">{code.product}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-gray-500">
                          {formatNumber(code.scans)} scans
                        </span>
                        <span className="text-gray-500">
                          {formatNumber(code.conversions)} conv.
                        </span>
                      </div>
                      <Badge
                        variant={
                          code.status === "active"
                            ? "success"
                            : code.status === "expired"
                            ? "danger"
                            : "warning"
                        }
                        className="mt-1 text-[10px]"
                      >
                        {code.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-6">
                No codes assigned yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
