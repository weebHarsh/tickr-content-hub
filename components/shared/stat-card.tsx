"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  className?: string
}

export function StatCard({ icon: Icon, label, value, change, changeLabel, className }: StatCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0

  return (
    <div className={cn("card p-5 border-l-4 border-l-brand-primary", className)}>
      <div className="flex items-start justify-between">
        <div className="rounded-lg bg-purple-50 p-2.5">
          <Icon className="h-5 w-5 text-brand-primary" />
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-xs font-medium rounded-full px-2 py-0.5",
            isPositive && "text-green-600 bg-green-50",
            isNegative && "text-red-600 bg-red-50",
            !isPositive && !isNegative && "text-gray-500 bg-gray-50"
          )}>
            {isPositive && <ArrowUp className="h-3 w-3" />}
            {isNegative && <ArrowDown className="h-3 w-3" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div className="mt-3">
        <p className="text-2xl font-heading font-semibold text-brand-dark">{value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{label}</p>
      </div>
      {changeLabel && (
        <p className="text-xs text-gray-400 mt-1">{changeLabel}</p>
      )}
    </div>
  )
}
