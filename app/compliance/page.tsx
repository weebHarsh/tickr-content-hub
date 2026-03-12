"use client"

import React from "react"
import Link from "next/link"
import { ShieldCheck, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HealthDashboard } from "@/components/compliance/health-dashboard"
import { ApprovalQueue } from "@/components/compliance/approval-queue"
import { AuditTrail } from "@/components/compliance/audit-trail"
import { mockComplianceHealth, mockApprovalQueue, mockAuditTrail } from "@/lib/mock-data/compliance"

export default function CompliancePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Compliance</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor compliance health and manage approvals</p>
        </div>
        <Link href="/compliance/validate">
          <Button className="gap-2">
            <ShieldCheck className="h-4 w-4" />
            Run Validation
          </Button>
        </Link>
      </div>

      <HealthDashboard health={mockComplianceHealth} />

      {/* Pre-share gate info */}
      <Card className="border-brand-primary/20 bg-purple-50/30">
        <CardContent className="flex items-center gap-3 py-4">
          <div className="rounded-full bg-brand-primary/10 p-2">
            <Lock className="h-5 w-5 text-brand-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-brand-dark">Pre-Share Compliance Gate Active</p>
            <p className="text-xs text-gray-500">All creatives must pass compliance validation before sharing on any platform</p>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="approvals">
        <TabsList>
          <TabsTrigger value="approvals">Approval Queue ({mockApprovalQueue.filter((i) => i.status === "pending").length} pending)</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail ({mockAuditTrail.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ApprovalQueue items={mockApprovalQueue} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <AuditTrail entries={mockAuditTrail} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
