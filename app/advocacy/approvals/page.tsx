"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { mockApprovals } from "@/lib/mock-data/advocacy"
import { cn, formatDate, getInitials, getStatusColor } from "@/lib/utils"
import type { AdvocacyApproval } from "@/types/advocacy"
import Link from "next/link"

const platformIcons: Record<string, React.ElementType> = {
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  instagram: Instagram,
}

const platformColors: Record<string, string> = {
  linkedin: "bg-blue-100 text-blue-700",
  twitter: "bg-sky-100 text-sky-700",
  facebook: "bg-indigo-100 text-indigo-700",
  instagram: "bg-pink-100 text-pink-700",
}

type FilterStatus = "all" | "pending" | "approved" | "rejected"

export default function ApprovalsPage() {
  const [filter, setFilter] = useState<FilterStatus>("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [approvals, setApprovals] = useState<AdvocacyApproval[]>(mockApprovals)

  const filtered = filter === "all"
    ? approvals
    : approvals.filter((a) => a.status === filter)

  const counts = {
    all: approvals.length,
    pending: approvals.filter((a) => a.status === "pending").length,
    approved: approvals.filter((a) => a.status === "approved").length,
    rejected: approvals.filter((a) => a.status === "rejected").length,
  }

  const handleApprove = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "approved" as const, reviewedBy: "Admin", reviewNote: "Approved." }
          : a
      )
    )
  }

  const handleReject = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? { ...a, status: "rejected" as const, reviewedBy: "Admin", reviewNote: "Rejected by admin." }
          : a
      )
    )
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <Link href="/advocacy">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">
          Content Approvals
        </h1>
        {counts.pending > 0 && (
          <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
            {counts.pending} pending
          </Badge>
        )}
      </div>

      {/* Filter tabs */}
      <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterStatus)}>
        <TabsList>
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({counts.rejected})</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Creative</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Caption</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((approval) => {
                  const PlatformIcon = platformIcons[approval.platform] || Linkedin
                  const isExpanded = expandedId === approval.id

                  return (
                    <React.Fragment key={approval.id}>
                      <TableRow
                        className={cn(
                          "cursor-pointer hover:bg-gray-50",
                          isExpanded && "bg-gray-50"
                        )}
                        onClick={() => toggleExpand(approval.id)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-gradient-to-br from-[#530093] to-[#A21094] text-white text-xs">
                                {getInitials(approval.employeeName)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">
                              {approval.employeeName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 max-w-[180px] truncate">
                          {approval.creativeTitle}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-[10px]",
                              platformColors[approval.platform]
                            )}
                          >
                            <PlatformIcon className="h-3 w-3 mr-1" />
                            {approval.platform}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 max-w-[200px] truncate">
                          {approval.caption}
                        </TableCell>
                        <TableCell className="text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(approval.submittedAt)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs capitalize",
                              getStatusColor(approval.status)
                            )}
                          >
                            {approval.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            {approval.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs text-green-600 border-green-200 hover:bg-green-50"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleApprove(approval.id)
                                  }}
                                >
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleReject(approval.id)
                                  }}
                                >
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-gray-400" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>

                      {/* Expanded detail row */}
                      {isExpanded && (
                        <TableRow>
                          <TableCell colSpan={7} className="bg-gray-50 p-0">
                            <div className="p-4 space-y-3">
                              <div>
                                <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                                  Full Caption
                                </p>
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {approval.caption}
                                </p>
                              </div>

                              <div className="flex gap-4">
                                {/* Preview placeholder */}
                                <div className="h-32 w-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span className="text-xs text-purple-500 font-medium text-center px-2">
                                    {approval.creativeTitle}
                                  </span>
                                </div>

                                <div className="space-y-2">
                                  <div>
                                    <p className="text-xs text-gray-500">Creative</p>
                                    <p className="text-sm font-medium">
                                      {approval.creativeTitle}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Platform</p>
                                    <p className="text-sm capitalize">
                                      {approval.platform}
                                    </p>
                                  </div>
                                  {approval.reviewedBy && (
                                    <div>
                                      <p className="text-xs text-gray-500">
                                        Reviewed by
                                      </p>
                                      <p className="text-sm">{approval.reviewedBy}</p>
                                    </div>
                                  )}
                                  {approval.reviewNote && (
                                    <div>
                                      <p className="text-xs text-gray-500">
                                        Review Note
                                      </p>
                                      <p className="text-sm text-gray-700">
                                        {approval.reviewNote}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  )
                })}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No approvals found for this filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
