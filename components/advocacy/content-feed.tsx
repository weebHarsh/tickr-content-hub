"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Share2, Linkedin, Twitter, Facebook, Instagram } from "lucide-react"
import { mockCreatives } from "@/lib/mock-data/content"
import { cn } from "@/lib/utils"

const formatColors: Record<string, string> = {
  image: "bg-blue-500",
  video: "bg-purple-500",
  pdf: "bg-red-500",
  html: "bg-green-500",
  gif: "bg-orange-500",
}

const platformIcons = [
  { key: "linkedin" as const, icon: Linkedin, label: "LinkedIn" },
  { key: "twitter" as const, icon: Twitter, label: "X / Twitter" },
  { key: "facebook" as const, icon: Facebook, label: "Facebook" },
  { key: "instagram" as const, icon: Instagram, label: "Instagram" },
]

interface ContentFeedProps {
  onShare: (creativeId: string, creativeTitle: string) => void
}

export function ContentFeed({ onShare }: ContentFeedProps) {
  const feedItems = mockCreatives.slice(0, 10)

  return (
    <div className="space-y-4">
      {feedItems.map((creative) => (
        <Card key={creative.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex gap-4 p-4">
              {/* Thumbnail placeholder */}
              <div
                className={cn(
                  "h-24 w-24 flex-shrink-0 rounded-lg flex items-center justify-center text-white text-xs font-medium",
                  formatColors[creative.format] || "bg-gray-500"
                )}
              >
                <div className="text-center">
                  <div className="text-lg font-bold uppercase">{creative.format}</div>
                  <div className="text-[10px] opacity-75">{creative.dimensions}</div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm font-[family-name:var(--font-poppins)] truncate">
                      {creative.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">{creative.brandName}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-[10px] flex-shrink-0",
                      creative.status === "active"
                        ? "text-green-600 border-green-200 bg-green-50"
                        : creative.status === "draft"
                        ? "text-gray-600 border-gray-200 bg-gray-50"
                        : "text-yellow-600 border-yellow-200 bg-yellow-50"
                    )}
                  >
                    {creative.status}
                  </Badge>
                </div>

                {creative.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {creative.description}
                  </p>
                )}

                {/* Actions row */}
                <div className="flex items-center justify-between mt-3">
                  {/* Quick share platform icons */}
                  <div className="flex items-center gap-1">
                    {platformIcons.map(({ key, icon: Icon, label }) => (
                      <button
                        key={key}
                        onClick={() => onShare(creative.id, creative.title)}
                        title={`Share on ${label}`}
                        className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 hover:text-[#530093] transition-colors"
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </button>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    onClick={() => onShare(creative.id, creative.title)}
                    className="bg-[#530093] hover:bg-[#430FA5] text-white text-xs h-8"
                  >
                    <Share2 className="h-3 w-3 mr-1.5" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
