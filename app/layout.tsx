import type { Metadata } from "next"
import { Poppins, Open_Sans } from "next/font/google"
import { AppShell } from "@/components/layout/app-shell"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-opensans",
  display: "swap",
})

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "TickR Content Hub 2.0",
  description: "Unified content management platform by mFilterIt",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${openSans.variable}`}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
