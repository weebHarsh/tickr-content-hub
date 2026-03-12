"use client"

import React from "react"
import { cn, getInitials } from "@/lib/utils"
import type { Activity } from "@/types/common"

const moduleColors: Record<string, string> = {
  library: "bg-purple-500",
  advocacy: "bg-blue-500",
  partners: "bg-green-500",
  compliance: "bg-orange-500",
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

interface ActivityFeedProps {
  activities: Activity[]
  maxItems?: number
  className?: string
}

export function ActivityFeed({ activities, maxItems = 8, className }: ActivityFeedProps) {
  const items = activities.slice(0, maxItems)

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <div className="relative flex-shrink-0">
            <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center text-xs font-medium text-brand-primary">
              {getInitials(activity.user)}
            </div>
            <div className={cn("absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white", moduleColors[activity.module])} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm">
              <span className="font-medium text-brand-dark">{activity.user}</span>{" "}
              <span className="text-gray-500">{activity.action}</span>{" "}
              <span className="font-medium text-brand-dark">{activity.target}</span>
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{timeAgo(activity.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
