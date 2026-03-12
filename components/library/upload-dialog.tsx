"use client"

import React, { useState } from "react"
import { Upload, Sparkles, X, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { mockBrands } from "@/lib/mock-data/content"
import type { Platform } from "@/types/content"

interface UploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const allPlatforms: { value: Platform; label: string }[] = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
]

const suggestedTags = [
  { name: "Product Launch", confidence: 0.96 },
  { name: "Brand Awareness", confidence: 0.91 },
  { name: "Social Media", confidence: 0.88 },
  { name: "Banner", confidence: 0.85 },
  { name: "Campaign", confidence: 0.82 },
]

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const [uploaded, setUploaded] = useState(false)
  const [title, setTitle] = useState("")
  const [selectedBrandId, setSelectedBrandId] = useState("")
  const [selectedCampaignId, setSelectedCampaignId] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([])
  const [expiryDate, setExpiryDate] = useState("")

  const selectedBrand = mockBrands.find((b) => b.id === selectedBrandId)
  const campaigns = selectedBrand?.campaigns || []

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    )
  }

  const handleReset = () => {
    setUploaded(false)
    setTitle("")
    setSelectedBrandId("")
    setSelectedCampaignId("")
    setSelectedPlatforms([])
    setExpiryDate("")
  }

  const handleClose = (openState: boolean) => {
    if (!openState) handleReset()
    onOpenChange(openState)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">Upload Creative</DialogTitle>
          <DialogDescription>
            Upload a new creative asset to the content library.
          </DialogDescription>
        </DialogHeader>

        {!uploaded ? (
          /* Drag and drop zone */
          <div
            onClick={() => setUploaded(true)}
            className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#530093] hover:bg-[#530093]/5 transition-colors"
          >
            <div className="h-12 w-12 rounded-full bg-[#530093]/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-[#530093]" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                Drop files here or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supports: PNG, JPG, GIF, MP4, PDF, HTML (Max 100MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Mock file uploaded indicator */}
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                <Upload className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-800">sample-creative.png</p>
                <p className="text-xs text-green-600">2.4 MB - Upload complete</p>
              </div>
              <button
                onClick={() => setUploaded(false)}
                className="p-1 rounded hover:bg-green-100 transition-colors"
              >
                <X className="h-4 w-4 text-green-600" />
              </button>
            </div>

            {/* AI Auto-tag preview */}
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles className="h-4 w-4 text-[#530093]" />
                <span className="text-xs font-medium text-[#530093]">
                  AI Suggested Tags
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {suggestedTags.map((tag) => (
                  <Badge key={tag.name} variant="secondary" className="text-[11px] gap-1">
                    {tag.name}
                    <span className="opacity-50">{Math.round(tag.confidence * 100)}%</span>
                  </Badge>
                ))}
              </div>
            </div>

            {/* Metadata form */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter creative title"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Brand</label>
                <Select value={selectedBrandId} onValueChange={(val) => { setSelectedBrandId(val); setSelectedCampaignId("") }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockBrands.map((brand) => (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Campaign</label>
                <Select value={selectedCampaignId} onValueChange={setSelectedCampaignId} disabled={!selectedBrandId}>
                  <SelectTrigger>
                    <SelectValue placeholder={selectedBrandId ? "Select campaign" : "Select a brand first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {campaigns.map((camp) => (
                      <SelectItem key={camp.id} value={camp.id}>
                        {camp.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1.5 block">Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {allPlatforms.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => togglePlatform(p.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs border transition-colors",
                        selectedPlatforms.includes(p.value)
                          ? "bg-[#530093] text-white border-[#530093]"
                          : "bg-white text-gray-600 border-gray-300 hover:border-[#530093]"
                      )}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-700 mb-1 block">Expiry Date</label>
                <div className="relative">
                  <Input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <Button className="w-full gap-1.5" onClick={() => handleClose(false)}>
              <Upload className="h-4 w-4" />
              Upload & Tag
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
