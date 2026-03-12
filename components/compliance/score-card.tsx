"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PieChart, Pie, Cell } from "recharts"
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  BookOpen,
  Lightbulb,
} from "lucide-react"
import { cn, formatDateTime } from "@/lib/utils"
import type { ValidationResult, Severity, ViolationType } from "@/types/compliance"

interface ScoreCardProps {
  result: ValidationResult
}

const SEVERITY_CONFIG: Record<
  Severity,
  { color: string; bg: string; border: string }
> = {
  critical: {
    color: "text-red-700",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  major: {
    color: "text-orange-700",
    bg: "bg-orange-50",
    border: "border-orange-200",
  },
  minor: {
    color: "text-yellow-700",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
  },
  info: {
    color: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
}

const TYPE_LABELS: Record<ViolationType, string> = {
  brand: "Brand",
  legal: "Legal",
  format: "Format",
  content: "Content",
  code_integrity: "Code Integrity",
  caption: "Caption",
}

function ResultScoreRing({
  score,
  status,
}: {
  score: number
  status: "pass" | "fail" | "warning"
}) {
  const color =
    status === "pass" ? "#16a34a" : status === "warning" ? "#eab308" : "#dc2626"
  const Icon =
    status === "pass"
      ? CheckCircle
      : status === "warning"
        ? AlertTriangle
        : XCircle
  const label = status.toUpperCase()

  const data = [
    { value: score },
    { value: 100 - score },
  ]

  return (
    <div className="relative flex flex-col items-center">
      <PieChart width={160} height={160}>
        <Pie
          data={data}
          cx={80}
          cy={80}
          innerRadius={55}
          outerRadius={72}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          stroke="none"
        >
          <Cell fill={color} />
          <Cell fill="#e5e7eb" />
        </Pie>
      </PieChart>
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ height: 160 }}>
        <span className="text-3xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-[10px] text-gray-500">/100</span>
      </div>
      <div
        className="flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full text-sm font-semibold"
        style={{ backgroundColor: `${color}15`, color }}
      >
        <Icon className="h-4 w-4" />
        {label}
      </div>
    </div>
  )
}

export function ScoreCard({ result }: ScoreCardProps) {
  return (
    <div className="space-y-6">
      {/* Score + Metadata */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ResultScoreRing score={result.score} status={result.status} />

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)]">
                  {result.creativeTitle}
                </h3>
                <p className="text-sm text-gray-500">
                  Validation ID: {result.id}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Validated At</p>
                    <p>{formatDateTime(result.validatedAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Validated By</p>
                    <p>{result.validatedBy}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Ruleset</p>
                    <p>{result.ruleset}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Processing Time</p>
                    <p>{result.processingTime}s</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button size="sm">Approve</Button>
                <Button size="sm" variant="secondary">
                  Request Changes
                </Button>
                <Button size="sm" variant="destructive">
                  Reject
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Violations List */}
      {result.violations.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Violations ({result.violations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.violations.map((v) => {
                const sev = SEVERITY_CONFIG[v.severity]
                return (
                  <div
                    key={v.id}
                    className={cn(
                      "rounded-lg border p-4",
                      sev.border,
                      sev.bg
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <AlertTriangle
                        className={cn("h-5 w-5 mt-0.5 shrink-0", sev.color)}
                      />
                      <div className="flex-1 space-y-1.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            className={cn(
                              "text-[10px] uppercase",
                              sev.color,
                              sev.bg,
                              sev.border,
                              "border"
                            )}
                          >
                            {v.severity}
                          </Badge>
                          <Badge variant="outline" className="text-[10px] uppercase">
                            {TYPE_LABELS[v.type]}
                          </Badge>
                          <span className="text-xs text-gray-400">{v.rule}</span>
                        </div>
                        <p className="text-sm text-gray-800">{v.description}</p>
                        {v.suggestion && (
                          <div className="flex items-start gap-1.5 text-xs text-gray-600 bg-white/60 rounded p-2">
                            <Lightbulb className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#FFCC29]" />
                            {v.suggestion}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {result.violations.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
            <p className="text-lg font-semibold text-green-700">
              No Violations Found
            </p>
            <p className="text-sm text-gray-500 mt-1">
              This creative passed all compliance checks.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
