"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Users, Hash, Target, BarChart3, UserPlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { cn, formatNumber } from "@/lib/utils"
import { mockPartners, mockReferralCodes } from "@/lib/mock-data/partners"
import { PartnerTable } from "@/components/partners/partner-table"
import { CodeGenerator } from "@/components/partners/code-generator"
import { AssignmentMatrix } from "@/components/partners/assignment-matrix"
import { CreativePreview } from "@/components/partners/creative-preview"
import { ConversionFunnel } from "@/components/partners/conversion-funnel"
import type { Partner } from "@/types/partners"

const funnelData = [
  { stage: "Scans", value: mockReferralCodes.reduce((s, c) => s + c.scans, 0) },
  { stage: "Clicks", value: mockReferralCodes.reduce((s, c) => s + c.clicks, 0) },
  { stage: "Leads", value: mockReferralCodes.reduce((s, c) => s + c.leads, 0) },
  { stage: "Conversions", value: mockReferralCodes.reduce((s, c) => s + c.conversions, 0) },
]

export default function PartnersPage() {
  const router = useRouter()
  const [addDialogOpen, setAddDialogOpen] = useState(false)

  const activePartners = mockPartners.filter((p) => p.status === "active").length
  const totalCodes = mockReferralCodes.length
  const totalConversions = mockPartners.reduce((s, p) => s + p.totalConversions, 0)
  const activeCodes = mockReferralCodes.filter((c) => c.status === "active").length
  const codeUtilization = totalCodes > 0 ? Math.round((activeCodes / totalCodes) * 100) : 0

  const handleSelectPartner = (partner: Partner) => {
    router.push(`/partners/${partner.id}`)
  }

  const summaryCards = [
    {
      title: "Active Partners",
      value: activePartners,
      icon: Users,
      color: "text-[#530093]",
      bg: "bg-[#530093]/10",
    },
    {
      title: "Total Codes",
      value: totalCodes,
      icon: Hash,
      color: "text-[#A21094]",
      bg: "bg-[#A21094]/10",
    },
    {
      title: "Total Conversions",
      value: formatNumber(totalConversions),
      icon: Target,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      title: "Code Utilization",
      value: `${codeUtilization}%`,
      icon: BarChart3,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)] text-gray-900">
            Partner Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage DRA/AP partners, referral codes, and creative generation
          </p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn("p-2.5 rounded-lg", card.bg)}>
                  <card.icon className={cn("h-5 w-5", card.color)} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{card.title}</p>
                  <p className="text-xl font-bold font-[family-name:var(--font-poppins)]">
                    {card.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="partners">
        <TabsList>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="codes">Code Management</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="creatives">Creative Generation</TabsTrigger>
        </TabsList>

        <TabsContent value="partners" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <PartnerTable partners={mockPartners} onSelect={handleSelectPartner} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="codes" className="mt-4">
          <CodeGenerator />
        </TabsContent>

        <TabsContent value="assignments" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <AssignmentMatrix />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creatives" className="mt-4">
          <CreativePreview />
        </TabsContent>
      </Tabs>

      {/* Admin Analytics Summary */}
      <div>
        <h2 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-gray-900 mb-4">
          Admin Analytics
        </h2>
        <ConversionFunnel data={funnelData} title="Overall Conversion Funnel" />
      </div>

      {/* Add Partner Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Partner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input placeholder="Partner name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <Input placeholder="email@company.com" type="email" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Company</label>
              <Input placeholder="Company name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Tier</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Region</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North India</SelectItem>
                    <SelectItem value="south">South India</SelectItem>
                    <SelectItem value="east">East India</SelectItem>
                    <SelectItem value="west">West India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setAddDialogOpen(false)}>Add Partner</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
