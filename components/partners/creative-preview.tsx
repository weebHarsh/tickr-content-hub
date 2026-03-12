"use client"

import React, { useState } from "react"
import { ChevronRight, QrCode, Image, FileText, Code, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { mockPartners, mockReferralCodes } from "@/lib/mock-data/partners"

type Format = "image" | "pdf" | "html"

const formatIcons: Record<Format, React.ReactNode> = {
  image: <Image className="h-4 w-4" />,
  pdf: <FileText className="h-4 w-4" />,
  html: <Code className="h-4 w-4" />,
}

export function CreativePreview() {
  const [selectedPartnerId, setSelectedPartnerId] = useState(mockPartners[0].id)
  const [format, setFormat] = useState<Format>("image")
  const [generated, setGenerated] = useState(false)

  const partner = mockPartners.find((p) => p.id === selectedPartnerId) || mockPartners[0]
  const partnerCodes = mockReferralCodes.filter((c) => c.partnerId === partner.id)
  const primaryCode = partnerCodes[0]?.code || "MF-XXX-XXX-000"

  const handleGenerate = () => {
    setGenerated(true)
    setTimeout(() => setGenerated(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Creative Auto-Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-1.5 min-w-[200px]">
              <label className="text-sm font-medium text-gray-700">Partner</label>
              <Select value={selectedPartnerId} onValueChange={setSelectedPartnerId}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockPartners.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Format</label>
              <div className="flex gap-1 border rounded-md p-1">
                {(["image", "pdf", "html"] as Format[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFormat(f)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors",
                      format === f
                        ? "bg-[#530093] text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    {formatIcons[f]}
                    <span className="capitalize">{f === "html" ? "HTML" : f.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleGenerate}>
              <Download className="mr-2 h-4 w-4" />
              Generate Creative
            </Button>
            {generated && (
              <Badge variant="success" className="self-center">
                Creative generated successfully!
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Preview Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-4 items-center">
        {/* Master Template */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Master Template</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-[#530093] to-[#A21094]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold font-[family-name:var(--font-poppins)]">mF</span>
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] mb-2 text-center">
                  mFilterIt Product Suite
                </h3>
                <p className="text-sm text-white/80 text-center">
                  Your trusted partner in digital brand safety
                </p>
                <div className="mt-4 px-4 py-1.5 bg-[#FFCC29] text-[#201E1E] rounded-full text-sm font-semibold">
                  Learn More
                </div>
                <div className="absolute bottom-4 right-4 opacity-30 text-xs">
                  [Partner Code Here]
                </div>
                <div className="absolute bottom-4 left-4 h-10 w-10 rounded bg-white/20 flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-white/50" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Arrow */}
        <div className="hidden lg:flex flex-col items-center gap-2">
          <ChevronRight className="h-8 w-8 text-[#530093]" />
          <span className="text-xs text-gray-500 font-medium">Auto-Gen</span>
        </div>
        <div className="flex lg:hidden justify-center">
          <ChevronRight className="h-8 w-8 text-[#530093] rotate-90" />
        </div>

        {/* Partner Output */}
        <Card className="border-[#530093]/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#530093]">
              Partner Output — {partner.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-[#530093] to-[#A21094]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold font-[family-name:var(--font-poppins)]">mF</span>
                </div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-poppins)] mb-2 text-center">
                  mFilterIt Product Suite
                </h3>
                <p className="text-sm text-white/80 text-center">
                  Your trusted partner in digital brand safety
                </p>
                <div className="mt-4 px-4 py-1.5 bg-[#FFCC29] text-[#201E1E] rounded-full text-sm font-semibold">
                  Learn More
                </div>
                {/* Partner-specific overlays */}
                <div className="absolute top-3 right-3 bg-white/90 text-[#530093] px-2 py-0.5 rounded text-[10px] font-semibold">
                  {partner.company}
                </div>
                <div className="absolute bottom-4 right-4 bg-[#FFCC29] text-[#201E1E] px-2 py-0.5 rounded text-xs font-mono font-bold">
                  {primaryCode}
                </div>
                <div className="absolute bottom-4 left-4 h-10 w-10 rounded bg-white flex items-center justify-center border border-gray-200">
                  <QrCode className="h-6 w-6 text-[#530093]" />
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>
                Format: <span className="font-medium uppercase">{format}</span>
              </span>
              <span>
                Code: <code className="font-mono text-[#530093]">{primaryCode}</code>
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
