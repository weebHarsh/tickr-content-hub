"use client"

import React, { useState, useMemo } from "react"
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { cn, formatNumber, formatCurrency, getInitials } from "@/lib/utils"
import type { Partner, PartnerTier } from "@/types/partners"

interface PartnerTableProps {
  partners: Partner[]
  onSelect: (partner: Partner) => void
}

type SortKey = keyof Partner
type SortDir = "asc" | "desc"

const tierColors: Record<PartnerTier, { bg: string; text: string }> = {
  platinum: { bg: "bg-gray-100", text: "text-gray-800" },
  gold: { bg: "bg-yellow-50", text: "text-yellow-700" },
  silver: { bg: "bg-gray-50", text: "text-gray-600" },
  bronze: { bg: "bg-orange-50", text: "text-orange-700" },
}

const tierBorderColors: Record<PartnerTier, string> = {
  platinum: "border-[#E5E4E2]",
  gold: "border-[#FFD700]",
  silver: "border-[#C0C0C0]",
  bronze: "border-[#CD7F32]",
}

function getComplianceColor(score: number) {
  if (score > 80) return "text-green-600"
  if (score > 60) return "text-yellow-600"
  return "text-red-600"
}

function getComplianceBg(score: number) {
  if (score > 80) return "bg-green-50"
  if (score > 60) return "bg-yellow-50"
  return "bg-red-50"
}

export function PartnerTable({ partners, onSelect }: PartnerTableProps) {
  const [search, setSearch] = useState("")
  const [sortKey, setSortKey] = useState<SortKey>("name")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    let list = partners.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.company.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q) ||
        p.tier.toLowerCase().includes(q)
    )
    list.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal)
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal
      }
      return 0
    })
    return list
  }, [partners, search, sortKey, sortDir])

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-40" />
    return sortDir === "asc" ? (
      <ArrowUp className="ml-1 h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 h-3 w-3" />
    )
  }

  const sortableHeader = (label: string, key: SortKey) => (
    <button
      className="flex items-center font-medium text-gray-500 hover:text-[#530093] transition-colors"
      onClick={() => handleSort(key)}
    >
      {label}
      <SortIcon column={key} />
    </button>
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search partners by name, company, region, or tier..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead>{sortableHeader("Name", "name")}</TableHead>
            <TableHead>{sortableHeader("Company", "company")}</TableHead>
            <TableHead>{sortableHeader("Tier", "tier")}</TableHead>
            <TableHead>{sortableHeader("Region", "region")}</TableHead>
            <TableHead className="text-right">{sortableHeader("Codes", "codesAssigned")}</TableHead>
            <TableHead className="text-right">{sortableHeader("Conversions", "totalConversions")}</TableHead>
            <TableHead className="text-right">{sortableHeader("Compliance", "complianceScore")}</TableHead>
            <TableHead className="text-right">{sortableHeader("Revenue", "revenue")}</TableHead>
            <TableHead>{sortableHeader("Status", "status")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((partner) => (
            <TableRow
              key={partner.id}
              className="cursor-pointer"
              onClick={() => onSelect(partner)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#530093]/10 flex items-center justify-center text-xs font-semibold text-[#530093]">
                    {getInitials(partner.name)}
                  </div>
                  <span className="font-medium">{partner.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-600 max-w-[200px] truncate">
                {partner.company}
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "capitalize border",
                    tierColors[partner.tier].bg,
                    tierColors[partner.tier].text,
                    tierBorderColors[partner.tier]
                  )}
                >
                  {partner.tier}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-600">{partner.region}</TableCell>
              <TableCell className="text-right font-medium">
                {partner.codesAssigned}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatNumber(partner.totalConversions)}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold",
                    getComplianceColor(partner.complianceScore),
                    getComplianceBg(partner.complianceScore)
                  )}
                >
                  {partner.complianceScore}%
                </span>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(partner.revenue)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    partner.status === "active"
                      ? "success"
                      : partner.status === "pending"
                      ? "warning"
                      : partner.status === "suspended"
                      ? "danger"
                      : "outline"
                  }
                  className="capitalize"
                >
                  {partner.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-400">
                No partners found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
