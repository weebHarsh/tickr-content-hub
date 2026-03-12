"use client"

import React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Facebook, Instagram, Check, X, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatNumber } from "@/lib/utils"

interface AccountInfo {
  platform: string
  icon: React.ElementType
  color: string
  bgColor: string
  connected: boolean
  handle?: string
  followers?: number
}

const accounts: AccountInfo[] = [
  {
    platform: "LinkedIn",
    icon: Linkedin,
    color: "#0A66C2",
    bgColor: "bg-blue-50",
    connected: true,
    handle: "@admin.user",
    followers: 2400,
  },
  {
    platform: "X / Twitter",
    icon: Twitter,
    color: "#1DA1F2",
    bgColor: "bg-sky-50",
    connected: true,
    handle: "@adminuser",
    followers: 1800,
  },
  {
    platform: "Facebook",
    icon: Facebook,
    color: "#1877F2",
    bgColor: "bg-indigo-50",
    connected: false,
  },
  {
    platform: "Instagram",
    icon: Instagram,
    color: "#E4405F",
    bgColor: "bg-pink-50",
    connected: false,
  },
]

export function SocialAccounts() {
  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Connected Social Accounts</CardTitle>
          <p className="text-sm text-gray-500">
            Link your social media accounts to share content directly from the platform.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {accounts.map((account) => {
            const Icon = account.icon
            return (
              <div
                key={account.platform}
                className={cn(
                  "flex items-center justify-between p-4 rounded-lg border transition-colors",
                  account.connected
                    ? "border-green-200 bg-green-50/50"
                    : "border-gray-200 bg-gray-50/50"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      "h-10 w-10 rounded-lg flex items-center justify-center",
                      account.bgColor
                    )}
                  >
                    <Icon className="h-5 w-5" style={{ color: account.color }} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{account.platform}</span>
                      {account.connected ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-[10px]">
                          <Check className="h-2.5 w-2.5 mr-0.5" />
                          Connected
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-gray-500 text-[10px]"
                        >
                          <X className="h-2.5 w-2.5 mr-0.5" />
                          Not Connected
                        </Badge>
                      )}
                    </div>

                    {account.connected && (
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gray-600">{account.handle}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="h-3 w-3" />
                          {formatNumber(account.followers!)} followers
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {account.connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="bg-[#530093] hover:bg-[#430FA5] text-white"
                  >
                    Connect
                  </Button>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
