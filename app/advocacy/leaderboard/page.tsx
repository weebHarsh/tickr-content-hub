"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Trophy, Medal, Crown } from "lucide-react"
import { LeaderboardTable } from "@/components/advocacy/leaderboard-table"
import { mockLeaderboard } from "@/lib/mock-data/advocacy"
import { cn, formatNumber, getInitials } from "@/lib/utils"
import Link from "next/link"

const podiumConfig = [
  {
    rank: 2,
    bgGradient: "from-gray-300 to-gray-400",
    borderColor: "border-gray-300",
    icon: Medal,
    iconColor: "text-gray-500",
    height: "h-28",
    label: "2nd",
  },
  {
    rank: 1,
    bgGradient: "from-[#530093] to-[#A21094]",
    borderColor: "border-[#FFCC29]",
    icon: Crown,
    iconColor: "text-[#FFCC29]",
    height: "h-36",
    label: "1st",
  },
  {
    rank: 3,
    bgGradient: "from-amber-600 to-amber-700",
    borderColor: "border-amber-400",
    icon: Medal,
    iconColor: "text-amber-600",
    height: "h-24",
    label: "3rd",
  },
]

export default function LeaderboardPage() {
  const top3 = mockLeaderboard.slice(0, 3)

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <Link href="/advocacy">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">
          Advocacy Leaderboard
        </h1>
        <Trophy className="h-6 w-6 text-[#FFCC29]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Main leaderboard table */}
        <LeaderboardTable entries={mockLeaderboard} />

        {/* Right sidebar: top 3 podium */}
        <div className="hidden lg:block space-y-4">
          <h2 className="text-lg font-semibold font-[family-name:var(--font-poppins)]">
            Top Advocates
          </h2>

          {/* Podium visual */}
          <div className="flex items-end justify-center gap-3 px-4 pt-8 pb-4">
            {podiumConfig.map((config) => {
              const entry = top3.find((e) => e.rank === config.rank)
              if (!entry) return null
              const Icon = config.icon
              return (
                <div key={config.rank} className="flex flex-col items-center">
                  <Icon className={cn("h-5 w-5 mb-1", config.iconColor)} />
                  <Avatar
                    className={cn(
                      "h-12 w-12 border-2 mb-2",
                      config.borderColor
                    )}
                  >
                    <AvatarFallback
                      className={cn(
                        "bg-gradient-to-br text-white text-sm font-medium",
                        config.bgGradient
                      )}
                    >
                      {getInitials(entry.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "w-20 rounded-t-lg bg-gradient-to-b flex items-center justify-center text-white font-bold text-sm",
                      config.bgGradient,
                      config.height
                    )}
                  >
                    {config.label}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Individual cards for top 3 */}
          {top3.map((entry) => (
            <Card key={entry.employeeId}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-to-br from-[#530093] to-[#A21094] text-white text-xs">
                        {getInitials(entry.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute -top-1 -right-1 bg-[#FFCC29] text-[#201E1E] text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {entry.rank}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{entry.name}</p>
                    <p className="text-xs text-gray-500">{entry.department}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
                  <div className="text-center">
                    <p className="text-sm font-bold text-[#530093]">
                      {formatNumber(entry.points)}
                    </p>
                    <p className="text-[10px] text-gray-500">Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold">{entry.shares}</p>
                    <p className="text-[10px] text-gray-500">Shares</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold">{formatNumber(entry.reach)}</p>
                    <p className="text-[10px] text-gray-500">Reach</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
