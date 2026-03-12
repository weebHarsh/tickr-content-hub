"use client"

import React, { useState } from "react"
import {
  Image as ImageIcon,
  Video,
  FileText,
  Code,
  Film,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn, formatNumber, formatDate, getStatusColor } from "@/lib/utils"
import type { Creative } from "@/types/content"

interface CreativeListProps {
  creatives: Creative[]
  onSelect: (creative: Creative) => void
}

const formatIcons: Record<string, React.ElementType> = {
  image: ImageIcon,
  video: Video,
  pdf: FileText,
  html: Code,
  gif: Film,
}

type SortKey = "title" | "brandName" | "campaignName" | "format" | "status" | "downloads" | "shares" | "expiryDate"
type SortDir = "asc" | "desc"

export function CreativeList({ creatives, onSelect }: CreativeListProps) {
  const [sortKey, setSortKey] = useState<SortKey>("title")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc")
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sorted = [...creatives].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1
    const aVal = a[sortKey] ?? ""
    const bVal = b[sortKey] ?? ""
    if (typeof aVal === "number" && typeof bVal === "number") {
      return (aVal - bVal) * dir
    }
    return String(aVal).localeCompare(String(bVal)) * dir
  })

  const SortIcon = ({ column }: { column: SortKey }) => {
    if (sortKey !== column) return <ArrowUpDown className="h-3.5 w-3.5 text-gray-400" />
    return sortDir === "asc" ? (
      <ArrowUp className="h-3.5 w-3.5 text-[#530093]" />
    ) : (
      <ArrowDown className="h-3.5 w-3.5 text-[#530093]" />
    )
  }

  const SortableHead = ({ column, children }: { column: SortKey; children: React.ReactNode }) => (
    <TableHead
      className="cursor-pointer select-none hover:text-[#530093] transition-colors"
      onClick={() => handleSort(column)}
    >
      <div className="flex items-center gap-1">
        {children}
        <SortIcon column={column} />
      </div>
    </TableHead>
  )

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50">
          <TableHead className="w-12" />
          <SortableHead column="title">Title</SortableHead>
          <SortableHead column="brandName">Brand</SortableHead>
          <SortableHead column="campaignName">Campaign</SortableHead>
          <SortableHead column="format">Format</SortableHead>
          <SortableHead column="status">Status</SortableHead>
          <TableHead>Tags</TableHead>
          <SortableHead column="downloads">Downloads</SortableHead>
          <SortableHead column="shares">Shares</SortableHead>
          <SortableHead column="expiryDate">Expiry</SortableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((creative, i) => {
          const FormatIcon = formatIcons[creative.format] || ImageIcon
          return (
            <TableRow
              key={creative.id}
              onClick={() => onSelect(creative)}
              className={cn(
                "cursor-pointer",
                i % 2 === 1 && "bg-gray-50/50"
              )}
            >
              {/* Thumbnail */}
              <TableCell className="p-2">
                <div className="h-10 w-10 rounded bg-gradient-to-br from-[#530093] to-[#A21094] flex items-center justify-center flex-shrink-0">
                  <FormatIcon className="h-4 w-4 text-white/70" />
                </div>
              </TableCell>

              {/* Title */}
              <TableCell className="font-medium text-sm max-w-[200px]">
                <span className="line-clamp-1">{creative.title}</span>
              </TableCell>

              {/* Brand */}
              <TableCell className="text-sm">{creative.brandName}</TableCell>

              {/* Campaign */}
              <TableCell className="text-sm max-w-[150px]">
                <span className="line-clamp-1">{creative.campaignName}</span>
              </TableCell>

              {/* Format */}
              <TableCell>
                <Badge variant="outline" className="text-[10px] capitalize">
                  {creative.format}
                </Badge>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  className={cn(
                    "text-[10px] capitalize border",
                    getStatusColor(creative.status)
                  )}
                >
                  {creative.status}
                </Badge>
              </TableCell>

              {/* Tags */}
              <TableCell className="max-w-[160px]">
                <div className="flex flex-wrap gap-1">
                  {creative.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600"
                    >
                      {tag.name}
                    </span>
                  ))}
                  {creative.tags.length > 2 && (
                    <span className="text-[10px] text-gray-400">+{creative.tags.length - 2}</span>
                  )}
                </div>
              </TableCell>

              {/* Downloads */}
              <TableCell className="text-sm text-gray-600">
                {formatNumber(creative.downloads)}
              </TableCell>

              {/* Shares */}
              <TableCell className="text-sm text-gray-600">
                {formatNumber(creative.shares)}
              </TableCell>

              {/* Expiry */}
              <TableCell className="text-sm text-gray-600">
                {creative.expiryDate ? formatDate(creative.expiryDate) : "---"}
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
