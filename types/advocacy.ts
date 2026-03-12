export type SocialPlatform = "linkedin" | "twitter" | "facebook" | "instagram"
export type ShareStatus = "shared" | "scheduled" | "draft" | "pending_approval" | "rejected"

export interface SocialAccount {
  id: string
  platform: SocialPlatform
  handle: string
  connected: boolean
  followers: number
  connectedAt?: string
}

export interface Employee {
  id: string
  name: string
  email: string
  department: string
  avatar?: string
  socialAccounts: SocialAccount[]
  totalShares: number
  totalReach: number
  totalClicks: number
  points: number
  level: number
  streak: number
  rank: number
  joinedAt: string
}

export interface Share {
  id: string
  employeeId: string
  employeeName: string
  creativeId: string
  creativeTitle: string
  platform: SocialPlatform
  caption: string
  status: ShareStatus
  scheduledAt?: string
  sharedAt?: string
  reach: number
  clicks: number
  impressions: number
  pointsEarned: number
}

export interface LeaderboardEntry {
  rank: number
  employeeId: string
  name: string
  avatar?: string
  department: string
  shares: number
  reach: number
  clicks: number
  points: number
  streak: number
  level: number
}

export interface CaptionVariant {
  id: string
  text: string
  tone: "professional" | "casual" | "enthusiastic"
  platform: SocialPlatform
}

export interface EEMVData {
  totalEEMV: number
  equivalentAdSpend: number
  totalReach: number
  totalImpressions: number
  avgEngagementRate: number
  monthlyTrend: { month: string; eemv: number; adSpend: number }[]
}

export interface AdvocacyApproval {
  id: string
  employeeName: string
  employeeAvatar?: string
  creativeTitle: string
  platform: SocialPlatform
  caption: string
  submittedAt: string
  status: "pending" | "approved" | "rejected"
  reviewedBy?: string
  reviewNote?: string
}
