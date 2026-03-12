"use client"

import React from "react"
import {
  Image as ImageIcon,
  Video,
  FileText,
  Code,
  Film,
  Eye,
  Download,
  Share2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatNumber } from "@/lib/utils"
import type { Creative } from "@/types/content"

interface CreativeCardProps {
  creative: Creative
  onClick: () => void
}

const formatIcons: Record<string, React.ElementType> = {
  image: ImageIcon,
  video: Video,
  pdf: FileText,
  html: Code,
  gif: Film,
}

const formatColors: Record<string, string> = {
  image: "bg-blue-100 text-blue-700",
  video: "bg-purple-100 text-[#530093]",
  pdf: "bg-red-100 text-red-700",
  html: "bg-orange-100 text-orange-700",
  gif: "bg-pink-100 text-pink-700",
}

function getExpiryStatus(expiryDate?: string): "active" | "expiring" | "expired" | "none" {
  if (!expiryDate) return "none"
  const now = new Date()
  const expiry = new Date(expiryDate)
  if (expiry < now) return "expired"
  const diffDays = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  if (diffDays <= 30) return "expiring"
  return "active"
}

const expiryDotColors: Record<string, string> = {
  active: "bg-green-500",
  expiring: "bg-yellow-500",
  expired: "bg-red-500",
  none: "bg-gray-300",
}

export function CreativeCard({ creative, onClick }: CreativeCardProps) {
  const FormatIcon = formatIcons[creative.format] || ImageIcon
  const expiryStatus = getExpiryStatus(creative.expiryDate)

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-lg border border-gray-200 bg-white overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
    >
      {/* Thumbnail placeholder */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-[#530093] to-[#A21094] flex items-center justify-center">
        <FormatIcon className="h-10 w-10 text-white/60" />
        {/* Format badge overlay */}
        <div className="absolute top-2 left-2">
          <Badge className={cn("text-[10px] px-1.5 py-0.5", formatColors[creative.format])}>
            {creative.format.toUpperCase()}
          </Badge>
        </div>
        {/* Expiry dot */}
        <div className="absolute top-2 right-2">
          <div
            className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-white", expiryDotColors[expiryStatus])}
            title={
              expiryStatus === "expired"
                ? "Expired"
                : expiryStatus === "expiring"
                ? "Expires within 30 days"
                : expiryStatus === "active"
                ? "Active"
                : "No expiry set"
            }
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:text-[#530093] transition-colors">
            {creative.title}
          </h3>
        </div>

        {/* Brand name */}
        <div>
          <Badge variant="secondary" className="text-[10px]">
            {creative.brandName}
          </Badge>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {creative.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-gray-100 text-gray-600"
            >
              {tag.name}
            </span>
          ))}
          {creative.tags.length > 3 && (
            <span className="text-[10px] text-gray-400">
              +{creative.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 pt-1 border-t border-gray-100 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Eye className="h-3 w-3" />
            {formatNumber(creative.views)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Download className="h-3 w-3" />
            {formatNumber(creative.downloads)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Share2 className="h-3 w-3" />
            {formatNumber(creative.shares)}
          </span>
        </div>
      </div>
    </div>
  )
}
