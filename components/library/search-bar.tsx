"use client"

import React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search creatives by title, tag, brand, campaign...",
  className,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "relative flex items-center w-full rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-[#530093] focus-within:border-transparent transition-all",
        className
      )}
    >
      <Search className="absolute left-3 h-5 w-5 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-11 pl-10 pr-10 bg-transparent text-sm outline-none placeholder:text-gray-400 rounded-lg"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 p-0.5 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  )
}
