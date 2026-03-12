"use client"

import dynamic from "next/dynamic"

// Re-export chart components with SSR disabled for Next.js build compatibility
export const AreaChart = dynamic(
  () => import("./area-chart").then((m) => ({ default: m.AreaChart })),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-lg" style={{ height: 300 }} /> }
)

export const DonutChart = dynamic(
  () => import("./donut-chart").then((m) => ({ default: m.DonutChart })),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-lg" style={{ height: 280 }} /> }
)

export const BarChart = dynamic(
  () => import("./bar-chart").then((m) => ({ default: m.BarChart })),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-lg" style={{ height: 300 }} /> }
)

export const LineChart = dynamic(
  () => import("./line-chart").then((m) => ({ default: m.LineChart })),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-lg" style={{ height: 300 }} /> }
)

export const PieChart = dynamic(
  () => import("./pie-chart").then((m) => ({ default: m.PieChart })),
  { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded-lg" style={{ height: 300 }} /> }
)
