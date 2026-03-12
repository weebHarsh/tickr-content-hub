"use client"

import React from "react"
import {
  Image as ImageIcon,
  Video,
  FileText,
  Code,
  Film,
  Download,
  Share2,
  Pencil,
  Trash2,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Mail,
  MessageCircle,
  Calendar,
  User,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, formatDate, formatDateTime, getStatusColor } from "@/lib/utils"
import type { Creative, Platform } from "@/types/content"

interface CreativeDetailModalProps {
  creative: Creative | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

const formatIcons: Record<string, React.ElementType> = {
  image: ImageIcon,
  video: Video,
  pdf: FileText,
  html: Code,
  gif: Film,
}

const platformIcons: Record<Platform, React.ElementType> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  email: Mail,
  whatsapp: MessageCircle,
}

const platformLabels: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  twitter: "Twitter",
  email: "Email",
  whatsapp: "WhatsApp",
}

export function CreativeDetailModal({
  creative,
  open,
  onOpenChange,
}: CreativeDetailModalProps) {
  if (!creative) return null

  const FormatIcon = formatIcons[creative.format] || ImageIcon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-heading">
            {creative.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
          {/* Left: Preview area */}
          <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-[#530093] to-[#A21094] flex items-center justify-center">
            <FormatIcon className="h-16 w-16 text-white/50" />
          </div>

          {/* Right: Metadata */}
          <div className="space-y-4">
            {/* Description */}
            {creative.description && (
              <p className="text-sm text-gray-600">{creative.description}</p>
            )}

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-500 block text-xs">Brand</span>
                <span className="font-medium">{creative.brandName}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Campaign</span>
                <span className="font-medium">{creative.campaignName}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Format</span>
                <span className="font-medium capitalize">{creative.format}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Dimensions</span>
                <span className="font-medium">{creative.dimensions || "N/A"}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">File Size</span>
                <span className="font-medium">{creative.fileSize}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Status</span>
                <Badge
                  className={cn(
                    "text-[10px] capitalize border mt-0.5",
                    getStatusColor(creative.status)
                  )}
                >
                  {creative.status}
                </Badge>
              </div>
              <div>
                <span className="text-gray-500 block text-xs">Expiry Date</span>
                <span className="font-medium">
                  {creative.expiryDate ? formatDate(creative.expiryDate) : "No expiry"}
                </span>
              </div>
              {creative.region && (
                <div>
                  <span className="text-gray-500 block text-xs">Region</span>
                  <span className="font-medium">{creative.region}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <span className="text-gray-500 text-xs block mb-1.5">Tags</span>
              <div className="flex flex-wrap gap-1.5">
                {creative.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="text-[11px]"
                  >
                    {tag.name}
                    {tag.confidence && (
                      <span className="ml-1 opacity-60">
                        {Math.round(tag.confidence * 100)}%
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Platforms */}
            <div>
              <span className="text-gray-500 text-xs block mb-1.5">Platforms</span>
              <div className="flex items-center gap-2">
                {creative.platforms.map((platform) => {
                  const Icon = platformIcons[platform]
                  return (
                    <div
                      key={platform}
                      className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded text-xs text-gray-700"
                      title={platformLabels[platform]}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{platformLabels[platform]}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Upload info */}
            <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t border-gray-100">
              <span className="inline-flex items-center gap-1">
                <User className="h-3.5 w-3.5" />
                {creative.uploadedBy}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDateTime(creative.createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mt-2">
          <Button size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button size="sm" variant="secondary" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button size="sm" variant="destructive" className="gap-1.5 ml-auto">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
