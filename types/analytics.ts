export interface DashboardMetric {
  label: string
  value: number | string
  change: number
  changeLabel: string
  trend: "up" | "down" | "neutral"
  icon?: string
}

export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: string | number
}

export interface TimeSeriesData {
  date: string
  [key: string]: string | number
}

export interface ContentAnalytics {
  totalCreatives: number
  totalViews: number
  totalDownloads: number
  totalShares: number
  viewsTrend: TimeSeriesData[]
  topCreatives: {
    id: string
    title: string
    views: number
    downloads: number
    shares: number
    engagement: number
  }[]
  formatDistribution: ChartDataPoint[]
  platformPerformance: ChartDataPoint[]
}

export interface AdvocacyAnalytics {
  totalAdvocates: number
  activeAdvocates: number
  participationRate: number
  totalReach: number
  totalImpressions: number
  totalClicks: number
  eemvTotal: number
  reachTrend: TimeSeriesData[]
  platformBreakdown: ChartDataPoint[]
  departmentLeaderboard: {
    department: string
    advocates: number
    shares: number
    reach: number
  }[]
}

export interface PartnerAnalytics {
  activePartners: number
  totalCodes: number
  codeUtilization: number
  totalConversions: number
  totalRevenue: number
  conversionRate: number
  partnerTrend: TimeSeriesData[]
  tierDistribution: ChartDataPoint[]
  conversionFunnel: { stage: string; value: number }[]
  topPartners: {
    name: string
    conversions: number
    revenue: number
    compliance: number
  }[]
}

export interface ComplianceAnalytics {
  firstPassRate: number
  avgRemediationTime: number
  totalValidations: number
  complianceScore: number
  approvalTrend: TimeSeriesData[]
  violationTypes: ChartDataPoint[]
  remediationSLA: ChartDataPoint[]
  monthlyScores: TimeSeriesData[]
}
