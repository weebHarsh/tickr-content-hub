"use client"

import React, { useState } from "react"
import { cn, formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Check, X, ChevronDown, ChevronUp, MessageSquare } from "lucide-react"
import type { ApprovalItem } from "@/types/compliance"

const statusVariant: Record<string, "success" | "warning" | "danger" | "secondary"> = {
  pending: "warning",
  approved: "success",
  rejected: "danger",
  escalated: "secondary",
}

interface ApprovalQueueProps {
  items: ApprovalItem[]
}

export function ApprovalQueue({ items }: ApprovalQueueProps) {
  const [filter, setFilter] = useState("all")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter)

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const toggleAll = () => {
    if (selectedIds.size === filtered.length) setSelectedIds(new Set())
    else setSelectedIds(new Set(filtered.map((i) => i.id)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            <TabsTrigger value="all">All ({items.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({items.filter((i) => i.status === "pending").length})</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="escalated">Escalated</TabsTrigger>
          </TabsList>
        </Tabs>
        {selectedIds.size > 0 && (
          <div className="flex gap-2">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1">
              <Check className="h-3.5 w-3.5" /> Approve ({selectedIds.size})
            </Button>
            <Button size="sm" variant="destructive" className="gap-1">
              <X className="h-3.5 w-3.5" /> Reject ({selectedIds.size})
            </Button>
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <input
                type="checkbox"
                checked={selectedIds.size === filtered.length && filtered.length > 0}
                onChange={toggleAll}
                className="rounded border-gray-300"
              />
            </TableHead>
            <TableHead>Creative</TableHead>
            <TableHead>Submitted By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Violations</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((item) => (
            <React.Fragment key={item.id}>
              <TableRow
                className={cn("cursor-pointer", expandedId === item.id && "bg-purple-50/50")}
                onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-gray-300"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.creativeTitle}</TableCell>
                <TableCell>{item.submittedBy}</TableCell>
                <TableCell className="text-gray-500">{formatDate(item.submittedAt)}</TableCell>
                <TableCell>
                  <span className={cn(
                    "font-semibold",
                    item.complianceScore >= 80 ? "text-green-600" : item.complianceScore >= 60 ? "text-yellow-600" : "text-red-600"
                  )}>
                    {item.complianceScore}%
                  </span>
                </TableCell>
                <TableCell>{item.violations.length}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs capitalize">{item.module}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant[item.status] || "secondary"} className="capitalize">
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {expandedId === item.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </TableCell>
              </TableRow>
              {expandedId === item.id && (
                <TableRow>
                  <TableCell colSpan={9} className="bg-gray-50 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="aspect-video rounded-lg bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
                        <span className="text-sm text-brand-primary/50">Preview</span>
                      </div>
                      <div className="md:col-span-2 space-y-3">
                        {item.violations.length > 0 && (
                          <div>
                            <p className="text-sm font-medium mb-2">Violations</p>
                            <div className="space-y-1.5">
                              {item.violations.map((v) => (
                                <div key={v.id} className="flex items-start gap-2 text-sm">
                                  <Badge variant={v.severity === "critical" ? "danger" : v.severity === "major" ? "warning" : "secondary"} className="text-xs flex-shrink-0">
                                    {v.severity}
                                  </Badge>
                                  <span className="text-gray-600">{v.description}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {item.status === "pending" && (
                          <div className="flex gap-2 pt-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1">
                              <Check className="h-3.5 w-3.5" /> Approve
                            </Button>
                            <Button size="sm" variant="destructive" className="gap-1">
                              <X className="h-3.5 w-3.5" /> Reject
                            </Button>
                            <Button size="sm" variant="secondary" className="gap-1">
                              <MessageSquare className="h-3.5 w-3.5" /> Comment
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
