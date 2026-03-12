"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Library,
  Users,
  Handshake,
  ShieldCheck,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

interface MobileNavProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navLinks = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/library", label: "Content Library", icon: Library },
  { href: "/advocacy", label: "Advocacy", icon: Users },
  { href: "/partners", label: "Partners", icon: Handshake },
  { href: "/compliance", label: "Compliance", icon: ShieldCheck },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
]

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (!pathname) return false
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[280px] bg-[#530093] p-0">
        <SheetHeader className="border-b border-white/10 px-4 py-4">
          <SheetTitle className="flex items-center gap-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 font-heading text-sm font-bold">
              T
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm font-bold leading-tight">
                TickR
              </span>
              <span className="text-[10px] font-normal leading-tight text-white/60">
                Content Hub 2.0
              </span>
            </div>
          </SheetTitle>
        </SheetHeader>

        <nav className="space-y-1 px-3 py-4">
          {navLinks.map((link) => {
            const Icon = link.icon
            const active = isActive(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  active ? "sidebar-link-active" : "sidebar-link"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span>{link.label}</span>
              </Link>
            )
          })}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
