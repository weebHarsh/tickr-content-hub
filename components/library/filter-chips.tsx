"use client"

import React, { useState, useRef } from "react"
import { ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FilterConfig {
  key: string
  label: string
  options: string[]
  selected: string[]
}

interface FilterChipsProps {
  filters: FilterConfig[]
  onFilterChange: (key: string, values: string[]) => void
}

function FilterDropdown({
  filter,
  onFilterChange,
}: {
  filter: FilterConfig
  onFilterChange: (key: string, values: string[]) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const hasSelection = filter.selected.length > 0

  const toggleOption = (option: string) => {
    const newValues = filter.selected.includes(option)
      ? filter.selected.filter((v) => v !== option)
      : [...filter.selected, option]
    onFilterChange(filter.key, newValues)
  }

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-colors whitespace-nowrap",
          hasSelection
            ? "bg-[#530093] text-white border-[#530093]"
            : "bg-white text-gray-700 border-gray-300 hover:border-[#530093] hover:text-[#530093]"
        )}
      >
        {filter.label}
        {hasSelection && (
          <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full">
            {filter.selected.length}
          </span>
        )}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 mt-1 z-50 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto">
            {filter.options.map((option) => {
              const isSelected = filter.selected.includes(option)
              return (
                <button
                  key={option}
                  onClick={() => toggleOption(option)}
                  className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors",
                    isSelected && "text-[#530093] font-medium"
                  )}
                >
                  <div
                    className={cn(
                      "h-4 w-4 rounded border flex items-center justify-center flex-shrink-0",
                      isSelected
                        ? "bg-[#530093] border-[#530093]"
                        : "border-gray-300"
                    )}
                  >
                    {isSelected && (
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  {option}
                </button>
              )
            })}
            {hasSelection && (
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={() => {
                    onFilterChange(filter.key, [])
                    setOpen(false)
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export function FilterChips({ filters, onFilterChange }: FilterChipsProps) {
  const totalActive = filters.reduce((acc, f) => acc + f.selected.length, 0)

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
      {filters.map((filter) => (
        <FilterDropdown
          key={filter.key}
          filter={filter}
          onFilterChange={onFilterChange}
        />
      ))}
      {totalActive > 0 && (
        <button
          onClick={() => filters.forEach((f) => onFilterChange(f.key, []))}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 transition-colors whitespace-nowrap flex-shrink-0"
        >
          <X className="h-3.5 w-3.5" />
          Clear all ({totalActive})
        </button>
      )}
    </div>
  )
}
