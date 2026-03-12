"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Sparkles,
  Clock,
  Send,
  Smartphone,
} from "lucide-react"
import { mockCaptionVariants } from "@/lib/mock-data/advocacy"
import { cn } from "@/lib/utils"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  creativeTitle?: string
}

const platforms = [
  { key: "linkedin" as const, icon: Linkedin, label: "LinkedIn", color: "#0A66C2" },
  { key: "twitter" as const, icon: Twitter, label: "X / Twitter", color: "#1DA1F2" },
  { key: "facebook" as const, icon: Facebook, label: "Facebook", color: "#1877F2" },
  { key: "instagram" as const, icon: Instagram, label: "Instagram", color: "#E4405F" },
]

const toneLabels: Record<string, string> = {
  professional: "Professional",
  casual: "Casual",
  enthusiastic: "Enthusiastic",
}

export function ShareDialog({ open, onOpenChange, creativeTitle }: ShareDialogProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("linkedin")
  const [selectedCaption, setSelectedCaption] = useState<string>("cv-1")
  const [caption, setCaption] = useState(mockCaptionVariants[0].text)
  const [scheduleEnabled, setScheduleEnabled] = useState(false)
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")

  const captionVariants = mockCaptionVariants.filter(
    (cv) => cv.platform === selectedPlatform
  )

  const handleCaptionSelect = (id: string) => {
    setSelectedCaption(id)
    const variant = mockCaptionVariants.find((cv) => cv.id === id)
    if (variant) setCaption(variant.text)
  }

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform)
    const firstForPlatform = mockCaptionVariants.find((cv) => cv.platform === platform)
    if (firstForPlatform) {
      setSelectedCaption(firstForPlatform.id)
      setCaption(firstForPlatform.text)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-poppins)]">
            Share Content
          </DialogTitle>
          {creativeTitle && (
            <p className="text-sm text-gray-500 mt-1">{creativeTitle}</p>
          )}
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-6 mt-4">
          {/* Left column: controls */}
          <div className="space-y-5">
            {/* Platform selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Select Platform
              </label>
              <div className="flex gap-2">
                {platforms.map(({ key, icon: Icon, label, color }) => (
                  <button
                    key={key}
                    onClick={() => handlePlatformChange(key)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all",
                      selectedPlatform === key
                        ? "border-[#530093] bg-purple-50 text-[#530093] shadow-sm"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    )}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: selectedPlatform === key ? color : undefined }}
                    />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Caption variants */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-[#FFCC29]" />
                <label className="text-sm font-medium text-gray-700">
                  AI-Generated Captions
                </label>
              </div>
              <div className="space-y-2">
                {captionVariants.map((variant) => (
                  <label
                    key={variant.id}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all",
                      selectedCaption === variant.id
                        ? "border-[#530093] bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <input
                      type="radio"
                      name="caption"
                      value={variant.id}
                      checked={selectedCaption === variant.id}
                      onChange={() => handleCaptionSelect(variant.id)}
                      className="mt-1 accent-[#530093]"
                    />
                    <div className="flex-1 min-w-0">
                      <Badge
                        variant="outline"
                        className="text-[10px] mb-1 capitalize"
                      >
                        {toneLabels[variant.tone]}
                      </Badge>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {variant.text}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Edit caption */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Edit Caption
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-gray-200 p-3 text-sm text-gray-700 focus:border-[#530093] focus:ring-1 focus:ring-[#530093] outline-none resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{caption.length} characters</p>
            </div>

            {/* Schedule toggle */}
            <div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setScheduleEnabled(!scheduleEnabled)}
                  className={cn(
                    "relative inline-flex h-5 w-9 items-center rounded-full transition-colors",
                    scheduleEnabled ? "bg-[#530093]" : "bg-gray-300"
                  )}
                >
                  <span
                    className={cn(
                      "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform",
                      scheduleEnabled ? "translate-x-[18px]" : "translate-x-[3px]"
                    )}
                  />
                </button>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Schedule for later
                  </span>
                </div>
              </div>

              {scheduleEnabled && (
                <div className="flex gap-3 mt-3">
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#530093] focus:ring-1 focus:ring-[#530093] outline-none"
                  />
                  <input
                    type="time"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-32 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-[#530093] focus:ring-1 focus:ring-[#530093] outline-none"
                  />
                </div>
              )}
            </div>

            {/* Action button */}
            <Button
              onClick={() => onOpenChange(false)}
              className="w-full bg-gradient-to-r from-[#530093] to-[#A21094] hover:from-[#430FA5] hover:to-[#8314BE] text-white"
            >
              {scheduleEnabled ? (
                <>
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Post
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Share Now
                </>
              )}
            </Button>
          </div>

          {/* Right column: mock phone preview */}
          <div className="hidden md:block">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Preview
            </label>
            <div className="border border-gray-200 rounded-2xl overflow-hidden bg-gray-50">
              {/* Phone frame */}
              <div className="bg-gray-800 text-white text-center py-1.5 text-[10px] flex items-center justify-center gap-1">
                <Smartphone className="h-3 w-3" />
                Preview
              </div>
              <div className="p-3 space-y-2">
                {/* User row */}
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#530093] to-[#A21094]" />
                  <div>
                    <p className="text-[10px] font-semibold">You</p>
                    <p className="text-[8px] text-gray-400">Just now</p>
                  </div>
                </div>
                {/* Caption preview */}
                <p className="text-[9px] text-gray-700 leading-relaxed line-clamp-6">
                  {caption}
                </p>
                {/* Image placeholder */}
                <div className="h-24 w-full rounded-md bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center">
                  <span className="text-[9px] text-purple-600 font-medium">
                    {creativeTitle || "Creative Preview"}
                  </span>
                </div>
                {/* Engagement row */}
                <div className="flex justify-between text-[8px] text-gray-400 pt-1 border-t border-gray-200">
                  <span>Like</span>
                  <span>Comment</span>
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
