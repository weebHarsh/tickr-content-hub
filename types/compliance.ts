export type ViolationType = "brand" | "legal" | "format" | "content" | "code_integrity" | "caption"
export type Severity = "critical" | "major" | "minor" | "info"
export type ApprovalStatus = "pending" | "approved" | "rejected" | "escalated"

export interface Violation {
  id: string
  type: ViolationType
  severity: Severity
  description: string
  rule: string
  suggestion?: string
  location?: string
}

export interface ValidationResult {
  id: string
  creativeId: string
  creativeTitle: string
  score: number
  status: "pass" | "fail" | "warning"
  violations: Violation[]
  validatedAt: string
  validatedBy: string
  ruleset: string
  processingTime: number
}

export interface ApprovalItem {
  id: string
  creativeId: string
  creativeTitle: string
  thumbnail?: string
  submittedBy: string
  submittedAt: string
  status: ApprovalStatus
  complianceScore: number
  violations: Violation[]
  reviewedBy?: string
  reviewedAt?: string
  reviewNote?: string
  module: "library" | "advocacy" | "partners"
}

export interface AuditEntry {
  id: string
  creativeId: string
  creativeTitle: string
  action: "upload" | "validate" | "approve" | "reject" | "share" | "modify" | "expire" | "flag"
  performedBy: string
  performedAt: string
  result: "success" | "failure" | "pending"
  details: string
  module: "library" | "advocacy" | "partners" | "compliance"
}

export interface ComplianceHealth {
  overallScore: number
  firstPassRate: number
  avgValidationTime: number
  totalValidations: number
  totalViolations: number
  violationsByType: { type: ViolationType; count: number }[]
  violationsBySeverity: { severity: Severity; count: number }[]
  monthlyTrend: { month: string; score: number; validations: number }[]
}
