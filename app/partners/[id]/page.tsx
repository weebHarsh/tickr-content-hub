"use client"

import React, { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, QrCode, FileText, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PartnerStats } from "@/components/partners/partner-stats"
import { ConversionFunnel } from "@/components/partners/conversion-funnel"
import { mockPartners, mockReferralCodes, mockPartnerCreatives, mockConversions } from "@/lib/mock-data/partners"
import { formatCurrency, formatDate, cn } from "@/lib/utils"

const tierColors: Record<string, string> = {
  platinum: "bg-gray-100 text-gray-700 border-gray-300",
  gold: "bg-yellow-50 text-yellow-700 border-yellow-300",
  silver: "bg-gray-50 text-gray-600 border-gray-200",
  bronze: "bg-orange-50 text-orange-700 border-orange-300",
}

export default function PartnerDetailPage() {
  const params = useParams()
  const partnerId = (params?.id as string) || ""
  const partner = mockPartners.find((p) => p.id === partnerId) || mockPartners[0]
  const partnerCodes = mockReferralCodes.filter((c) => c.partnerId === partner.id)
  const partnerCreatives = mockPartnerCreatives.filter((c) => c.partnerId === partner.id)
  const partnerConversions = mockConversions.filter((c) => c.partnerId === partner.id)

  const funnelData = [
    { stage: "Scans", value: partner.totalScans },
    { stage: "Clicks", value: Math.round(partner.totalScans * 0.45) },
    { stage: "Leads", value: Math.round(partner.totalScans * 0.15) },
    { stage: "Conversions", value: partner.totalConversions },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/partners">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-heading font-semibold text-brand-dark">{partner.name}</h1>
            <Badge className={cn("capitalize", tierColors[partner.tier])}>{partner.tier}</Badge>
            <Badge variant={partner.status === "active" ? "success" : "secondary"}>{partner.status}</Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">{partner.company} &middot; {partner.region}</p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="codes">Codes ({partnerCodes.length})</TabsTrigger>
          <TabsTrigger value="creatives">Creatives ({partnerCreatives.length})</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <PartnerStats partner={partner} />
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ConversionFunnel data={funnelData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="codes" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Scans</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnerCodes.length > 0 ? partnerCodes.map((code) => (
                    <TableRow key={code.id}>
                      <TableCell className="font-mono font-medium text-brand-primary">{code.code}</TableCell>
                      <TableCell>{code.product}</TableCell>
                      <TableCell>{code.region}</TableCell>
                      <TableCell>
                        <Badge variant={code.status === "active" ? "success" : code.status === "expired" ? "danger" : "warning"}>
                          {code.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{code.scans}</TableCell>
                      <TableCell>{code.conversions}</TableCell>
                      <TableCell>{formatCurrency(code.revenue)}</TableCell>
                      <TableCell className="text-gray-500">{formatDate(code.createdAt)}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-400">No codes assigned yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="creatives" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {partnerCreatives.length > 0 ? partnerCreatives.map((creative) => (
              <Card key={creative.id}>
                <CardContent className="pt-6">
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center mb-3">
                    <FileText className="h-8 w-8 text-brand-primary/50" />
                  </div>
                  <p className="font-medium text-sm">{creative.templateName}</p>
                  <p className="text-xs text-gray-500 mt-1">Code: <span className="font-mono">{creative.embeddedCode}</span></p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">{creative.format}</Badge>
                    <Badge variant={creative.status === "active" ? "success" : "danger"} className="text-xs">{creative.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            )) : (
              <div className="col-span-full text-center py-8 text-gray-400">No creatives generated yet</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partnerConversions.length > 0 ? partnerConversions.slice(0, 15).map((conv) => (
                    <TableRow key={conv.id}>
                      <TableCell className="text-gray-500">{formatDate(conv.timestamp)}</TableCell>
                      <TableCell className="font-mono text-sm">{conv.code}</TableCell>
                      <TableCell>
                        <Badge variant={conv.type === "conversion" ? "success" : conv.type === "lead" ? "warning" : "secondary"}>
                          {conv.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{conv.source}</TableCell>
                      <TableCell>{conv.value ? formatCurrency(conv.value) : "—"}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-400">No activity yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
