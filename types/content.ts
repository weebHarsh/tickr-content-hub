export type ContentFormat = "image" | "video" | "pdf" | "html" | "gif"
export type ContentStatus = "active" | "expired" | "draft" | "archived" | "pending"
export type Platform = "instagram" | "facebook" | "linkedin" | "twitter" | "whatsapp" | "email"

export interface Tag {
  id: string
  name: string
  category: "ai-generated" | "manual" | "brand" | "campaign"
  confidence?: number
}

export interface Brand {
  id: string
  name: string
  logo?: string
  campaigns: Campaign[]
}

export interface Campaign {
  id: string
  name: string
  brandId: string
  startDate: string
  endDate: string
  status: "active" | "completed" | "upcoming"
  subCampaigns?: SubCampaign[]
}

export interface SubCampaign {
  id: string
  name: string
  campaignId: string
}

export interface Creative {
  id: string
  title: string
  description?: string
  format: ContentFormat
  thumbnail: string
  fileUrl: string
  fileSize: string
  dimensions?: string
  brandId: string
  brandName: string
  campaignId: string
  campaignName: string
  tags: Tag[]
  platforms: Platform[]
  status: ContentStatus
  expiryDate?: string
  createdAt: string
  updatedAt: string
  downloads: number
  shares: number
  views: number
  uploadedBy: string
  region?: string
}

export interface Collection {
  id: string
  name: string
  description?: string
  creativeIds: string[]
  creativeCount: number
  thumbnail?: string
  createdAt: string
  createdBy: string
}
