export type PartnerTier = "platinum" | "gold" | "silver" | "bronze"
export type PartnerStatus = "active" | "inactive" | "suspended" | "pending"

export interface Partner {
  id: string
  name: string
  email: string
  company: string
  tier: PartnerTier
  status: PartnerStatus
  region: string
  codesAssigned: number
  totalConversions: number
  totalScans: number
  complianceScore: number
  revenue: number
  joinedAt: string
  avatar?: string
}

export interface ReferralCode {
  id: string
  code: string
  partnerId: string
  partnerName: string
  product: string
  region: string
  status: "active" | "expired" | "suspended"
  scans: number
  clicks: number
  leads: number
  conversions: number
  revenue: number
  createdAt: string
  expiresAt?: string
  qrCodeUrl?: string
}

export interface CodeAssignment {
  partnerId: string
  partnerName: string
  product: string
  region: string
  code: string
  status: "assigned" | "unassigned"
}

export interface Conversion {
  id: string
  codeId: string
  code: string
  partnerId: string
  partnerName: string
  type: "scan" | "click" | "lead" | "conversion"
  value?: number
  timestamp: string
  source: string
}

export interface PartnerCreative {
  id: string
  templateId: string
  templateName: string
  partnerId: string
  partnerName: string
  embeddedCode: string
  qrCodeUrl: string
  format: "image" | "pdf" | "html"
  generatedAt: string
  status: "active" | "expired"
}
