"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy } from "lucide-react"
import { cn, formatNumber, getInitials } from "@/lib/utils"
import type { LeaderboardEntry } from "@/types/advocacy"

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  period?: string
}

function RankDisplay({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="flex items-center gap-1.5">
        <Trophy className="h-4 w-4 text-yellow-500" />
        <span className="font-bold text-yellow-600">1</span>
      </div>
    )
  }
  if (rank === 2) {
    return <span className="font-bold text-gray-400">🥈 2</span>
  }
  if (rank === 3) {
    return <span className="font-bold text-amber-700">🥉 3</span>
  }
  return <span className="text-gray-600 font-medium">{rank}</span>
}

export function LeaderboardTable({ entries }: LeaderboardTableProps) {
  const [tab, setTab] = useState("monthly")
  const currentUserIndex = 4 // 0-indexed, highlights the 5th row

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="alltime">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="text-right">Shares</TableHead>
                <TableHead className="text-right">Reach</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Streak</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow
                  key={entry.employeeId}
                  className={cn(
                    index === currentUserIndex &&
                      "bg-purple-50 border-l-2 border-l-[#530093]"
                  )}
                >
                  <TableCell>
                    <RankDisplay rank={entry.rank} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={cn(
                            "text-xs font-medium text-white",
                            entry.rank <= 3
                              ? "bg-gradient-to-br from-[#530093] to-[#A21094]"
                              : "bg-gray-400"
                          )}
                        >
                          {getInitials(entry.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {entry.name}
                          {index === currentUserIndex && (
                            <span className="text-xs text-[#530093] ml-2">(You)</span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500">Level {entry.level}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {entry.department}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {entry.shares}
                  </TableCell>
                  <TableCell className="text-right text-sm text-gray-600">
                    {formatNumber(entry.reach)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="text-sm font-semibold text-[#530093]">
                      {formatNumber(entry.points)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    🔥 {entry.streak}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
