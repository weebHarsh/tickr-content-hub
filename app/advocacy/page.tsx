"use client"

import React, { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Trophy, Share2, Eye, Star } from "lucide-react"
import { ContentFeed } from "@/components/advocacy/content-feed"
import { ShareDialog } from "@/components/advocacy/share-dialog"
import { SocialAccounts } from "@/components/advocacy/social-accounts"
import { ActivityStats } from "@/components/advocacy/activity-stats"
import { EEMVCard } from "@/components/advocacy/eemv-card"
import { mockShares } from "@/lib/mock-data/advocacy"
import { formatNumber } from "@/lib/utils"
import Link from "next/link"

export default function AdvocacyPage() {
  const [shareOpen, setShareOpen] = useState(false)
  const [shareTitle, setShareTitle] = useState<string | undefined>()

  const totalShares = mockShares.filter((s) => s.status === "shared").length

  const handleShare = (_creativeId: string, creativeTitle: string) => {
    setShareTitle(creativeTitle)
    setShareOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold font-[family-name:var(--font-poppins)]">
            Employee Advocacy
          </h1>
          <Badge className="bg-[#530093] text-white">
            {totalShares} shares
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/advocacy/approvals">
            <Button variant="outline" size="sm">
              Approvals
            </Button>
          </Link>
          <Link href="/advocacy/leaderboard">
            <Button
              size="sm"
              className="bg-[#530093] hover:bg-[#430FA5] text-white"
            >
              <Trophy className="h-4 w-4 mr-1.5" />
              View Leaderboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Share2, label: "My Shares", value: "187", color: "text-[#530093]" },
          { icon: Eye, label: "Total Reach", value: formatNumber(245000), color: "text-[#A21094]" },
          { icon: Star, label: "Points", value: formatNumber(4250), color: "text-[#FFCC29]" },
          { icon: Trophy, label: "Rank", value: "#1", color: "text-[#530093]" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-3 flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <div>
                <p className="text-lg font-bold font-[family-name:var(--font-poppins)]">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main tabs */}
      <Tabs defaultValue="feed">
        <TabsList>
          <TabsTrigger value="feed">Content Feed</TabsTrigger>
          <TabsTrigger value="activity">My Activity</TabsTrigger>
          <TabsTrigger value="social">Social Accounts</TabsTrigger>
        </TabsList>

        {/* Content Feed Tab */}
        <TabsContent value="feed">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            {/* Left: content feed */}
            <div className="lg:col-span-2">
              <ContentFeed onShare={handleShare} />
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              <EEMVCard />

              {/* Quick stats card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Shares this week</span>
                    <span className="text-sm font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Pending approvals</span>
                    <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50">
                      2
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Scheduled posts</span>
                    <span className="text-sm font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Streak</span>
                    <span className="text-sm font-semibold">🔥 14 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* My Activity Tab */}
        <TabsContent value="activity">
          <div className="mt-4">
            <ActivityStats />
          </div>
        </TabsContent>

        {/* Social Accounts Tab */}
        <TabsContent value="social">
          <div className="mt-4">
            <SocialAccounts />
          </div>
        </TabsContent>
      </Tabs>

      {/* Share dialog */}
      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        creativeTitle={shareTitle}
      />
    </div>
  )
}
