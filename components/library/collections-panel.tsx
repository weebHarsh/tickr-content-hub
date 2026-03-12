"use client"

import React from "react"
import { Plus, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Collection } from "@/types/content"

interface CollectionsPanelProps {
  collections: Collection[]
  selectedId?: string
  onSelect: (id: string) => void
  onCreateNew: () => void
}

export function CollectionsPanel({
  collections,
  selectedId,
  onSelect,
  onCreateNew,
}: CollectionsPanelProps) {
  return (
    <div className="space-y-4">
      <Button onClick={onCreateNew} size="sm" className="w-full gap-1.5">
        <Plus className="h-4 w-4" />
        Create Collection
      </Button>

      <div className="space-y-2">
        {collections.map((collection) => (
          <button
            key={collection.id}
            onClick={() => onSelect(collection.id)}
            className={cn(
              "w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all hover:shadow-sm",
              selectedId === collection.id
                ? "border-[#530093] bg-[#530093]/5 ring-1 ring-[#530093]"
                : "border-gray-200 bg-white hover:border-gray-300"
            )}
          >
            {/* Thumbnail placeholder */}
            <div className="h-10 w-10 rounded bg-gradient-to-br from-[#530093]/80 to-[#A21094]/80 flex items-center justify-center flex-shrink-0">
              <FolderOpen className="h-4 w-4 text-white/80" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-medium text-gray-900 truncate">
                {collection.name}
              </h4>
              <p className="text-xs text-gray-500 mt-0.5">
                {collection.creativeCount} creative{collection.creativeCount !== 1 ? "s" : ""}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
