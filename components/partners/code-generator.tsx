"use client"

import React, { useState } from "react"
import { Copy, Check, QrCode, Zap, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { mockPartners } from "@/lib/mock-data/partners"

interface GeneratedCode {
  code: string
  copied: boolean
}

export function CodeGenerator() {
  const [prefix, setPrefix] = useState("MF")
  const [region, setRegion] = useState("")
  const [product, setProduct] = useState("")
  const [partner, setPartner] = useState("")
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null)
  const [bulkQty, setBulkQty] = useState(5)
  const [bulkCodes, setBulkCodes] = useState<GeneratedCode[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const regions = [
    { value: "NOR", label: "North" },
    { value: "SOU", label: "South" },
    { value: "EAS", label: "East" },
    { value: "WES", label: "West" },
  ]

  const products = [
    { value: "INS", label: "Insurance" },
    { value: "LON", label: "Loans" },
    { value: "CRD", label: "Credit Cards" },
    { value: "SAV", label: "Savings" },
  ]

  const generateSingleCode = () => {
    if (!region || !product) return
    const num = String(Math.floor(Math.random() * 999) + 1).padStart(3, "0")
    const code = `${prefix}-${region}-${product}-${num}`
    setGeneratedCode({ code, copied: false })
  }

  const generateBulkCodes = () => {
    if (!region || !product) return
    const codes: GeneratedCode[] = []
    for (let i = 0; i < bulkQty; i++) {
      const num = String(i + 1).padStart(3, "0")
      codes.push({ code: `${prefix}-${region}-${product}-${num}`, copied: false })
    }
    setBulkCodes(codes)
  }

  const copyToClipboard = (code: string, index?: number) => {
    navigator.clipboard.writeText(code).catch(() => {})
    if (index !== undefined) {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } else {
      setGeneratedCode((prev) => prev ? { ...prev, copied: true } : null)
      setTimeout(() => {
        setGeneratedCode((prev) => prev ? { ...prev, copied: false } : null)
      }, 2000)
    }
  }

  return (
    <div className="space-y-6">
      {/* Single Code Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Hash className="h-5 w-5 text-[#530093]" />
            Generate Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Brand Prefix</label>
              <Input
                value={prefix}
                onChange={(e) => setPrefix(e.target.value.toUpperCase())}
                placeholder="MF"
                maxLength={4}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Region</label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label} ({r.value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Product Type</label>
              <Select value={product} onValueChange={setProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label} ({p.value})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Partner</label>
              <Select value={partner} onValueChange={setPartner}>
                <SelectTrigger>
                  <SelectValue placeholder="Select partner" />
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
          </div>

          <Button onClick={generateSingleCode} disabled={!region || !product}>
            <Zap className="mr-2 h-4 w-4" />
            Generate Code
          </Button>

          {generatedCode && (
            <div className="mt-4 p-4 bg-[#530093]/5 border border-[#530093]/20 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <code className="text-lg font-mono font-bold text-[#530093]">
                  {generatedCode.code}
                </code>
                <Badge variant="success">Generated</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center border border-gray-300">
                  <QrCode className="h-6 w-6 text-gray-500" />
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => copyToClipboard(generatedCode.code)}
                >
                  {generatedCode.copied ? (
                    <Check className="mr-1 h-3 w-3" />
                  ) : (
                    <Copy className="mr-1 h-3 w-3" />
                  )}
                  {generatedCode.copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-[#A21094]" />
            Bulk Code Generation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-gray-700">Quantity (1-50)</label>
              <Input
                type="number"
                min={1}
                max={50}
                value={bulkQty}
                onChange={(e) =>
                  setBulkQty(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))
                }
                className="w-24"
              />
            </div>
            <Button
              onClick={generateBulkCodes}
              disabled={!region || !product}
              variant="secondary"
            >
              <Zap className="mr-2 h-4 w-4" />
              Generate Bulk
            </Button>
          </div>

          {bulkCodes.length > 0 && (
            <div className="border rounded-lg divide-y max-h-[400px] overflow-y-auto">
              {bulkCodes.map((item, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex items-center justify-between px-4 py-2",
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400 w-6">#{idx + 1}</span>
                    <code className="font-mono font-medium text-[#530093]">
                      {item.code}
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded bg-gray-200 flex items-center justify-center">
                      <QrCode className="h-4 w-4 text-gray-400" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(item.code, idx)}
                    >
                      {copiedIndex === idx ? (
                        <Check className="h-3 w-3 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
