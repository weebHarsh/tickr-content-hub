"use client"

import React, { useState, useMemo } from "react"
import { cn, formatDateTime } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Search } from "lucide-react"
import type { AuditEntry } from "@/types/compliance"

const actionColors: Record<string, string> = {
  upload: "bg-blue-50 text-blue-600 border-blue-200",
  validate: "bg-purple-50 text-purple-600 border-purple-200",
  approve: "bg-green-50 text-green-600 border-green-200",
  reject: "bg-red-50 text-red-600 border-red-200",
  share: "bg-indigo-50 text-indigo-600 border-indigo-200",
  modify: "bg-orange-50 text-orange-600 border-orange-200",
  expire: "bg-gray-50 text-gray-600 border-gray-200",
  flag: "bg-yellow-50 text-yellow-600 border-yellow-200",
}

interface AuditTrailProps {
  entries: AuditEntry[]
}

export function AuditTrail({ entries }: AuditTrailProps) {
  const [search, setSearch] = useState("")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [moduleFilter, setModuleFilter] = useState<string>("all")
  const [resultFilter, setResultFilter] = useState<string>("all")

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (search && !e.creativeTitle.toLowerCase().includes(search.toLowerCase()) && !e.performedBy.toLowerCase().includes(search.toLowerCase())) return false
      if (actionFilter !== "all" && e.action !== actionFilter) return false
      if (moduleFilter !== "all" && e.module !== moduleFilter) return false
      if (resultFilter !== "all" && e.result !== resultFilter) return false
      return true
    })
  }, [entries, search, actionFilter, moduleFilter, resultFilter])

  const actions = ["all", "upload", "validate", "approve", "reject", "share", "modify", "expire", "flag"]
  const modules = ["all", "library", "advocacy", "partners", "compliance"]
  const results = ["all", "success", "failure", "pending"]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by creative or user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="h-9 rounded-md border border-gray-200 px-3 text-sm bg-white"
        >
          {actions.map((a) => (
            <option key={a} value={a}>{a === "all" ? "All Actions" : a.charAt(0).toUpperCase() + a.slice(1)}</option>
          ))}
        </select>
        <select
          value={moduleFilter}
          onChange={(e) => setModuleFilter(e.target.value)}
          className="h-9 rounded-md border border-gray-200 px-3 text-sm bg-white"
        >
          {modules.map((m) => (
            <option key={m} value={m}>{m === "all" ? "All Modules" : m.charAt(0).toUpperCase() + m.slice(1)}</option>
          ))}
        </select>
        <select
          value={resultFilter}
          onChange={(e) => setResultFilter(e.target.value)}
          className="h-9 rounded-md border border-gray-200 px-3 text-sm bg-white"
        >
          {results.map((r) => (
            <option key={r} value={r}>{r === "all" ? "All Results" : r.charAt(0).toUpperCase() + r.slice(1)}</option>
          ))}
        </select>
        <Button variant="secondary" size="sm" className="gap-1 ml-auto">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date/Time</TableHead>
            <TableHead>Creative</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Performed By</TableHead>
            <TableHead>Result</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="text-gray-500 text-xs whitespace-nowrap">{formatDateTime(entry.performedAt)}</TableCell>
              <TableCell className="font-medium text-sm">{entry.creativeTitle}</TableCell>
              <TableCell>
                <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border", actionColors[entry.action] || "bg-gray-50 text-gray-600")}>
                  {entry.action}
                </span>
              </TableCell>
              <TableCell className="text-sm">{entry.performedBy}</TableCell>
              <TableCell>
                <Badge variant={entry.result === "success" ? "success" : entry.result === "failure" ? "danger" : "warning"} className="text-xs">
                  {entry.result}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs capitalize">{entry.module}</Badge>
              </TableCell>
              <TableCell className="text-xs text-gray-500 max-w-[200px] truncate">{entry.details}</TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-400">No audit entries match filters</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <p className="text-xs text-gray-400 text-right">Showing {filtered.length} of {entries.length} entries</p>
    </div>
  )
}
