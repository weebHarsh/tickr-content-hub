export type Role = "admin" | "manager" | "employee" | "partner"

export interface User {
  id: string
  name: string
  email: string
  role: Role
  avatar?: string
  department?: string
  joinedAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
  link?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface SelectOption {
  label: string
  value: string
}

export interface Activity {
  id: string
  user: string
  avatar?: string
  action: string
  target: string
  module: "library" | "advocacy" | "partners" | "compliance"
  timestamp: string
}
