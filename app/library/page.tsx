"use client"

import React, { useState, useMemo } from "react"
import {
  LayoutGrid,
  List,
  Upload,
  FolderOpen,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { SearchBar } from "@/components/library/search-bar"
import { FilterChips, type FilterConfig } from "@/components/library/filter-chips"
import { CreativeCard } from "@/components/library/creative-card"
import { CreativeList } from "@/components/library/creative-list"
import { CreativeDetailModal } from "@/components/library/creative-detail-modal"
import { CollectionsPanel } from "@/components/library/collections-panel"
import { BrandTree } from "@/components/library/brand-tree"
import { UploadDialog } from "@/components/library/upload-dialog"
import { cn } from "@/lib/utils"
import {
  mockCreatives,
  mockCollections,
  mockBrands,
} from "@/lib/mock-data/content"
import type { Creative } from "@/types/content"

type ViewMode = "grid" | "list"

export default function LibraryPage() {
  // View and search state
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [search, setSearch] = useState("")
  const [selectedCreative, setSelectedCreative] = useState<Creative | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  // Sidebar / panel state
  const [brandSidebarOpen, setBrandSidebarOpen] = useState(true)
  const [collectionsOpen, setCollectionsOpen] = useState(false)
  const [uploadOpen, setUploadOpen] = useState(false)

  // Brand tree selection
  const [selectedBrandId, setSelectedBrandId] = useState("")
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | undefined>()

  // Collection selection
  const [selectedCollectionId, setSelectedCollectionId] = useState<string | undefined>()

  // Filter state
  const [filters, setFilters] = useState<FilterConfig[]>([
    {
      key: "format",
      label: "Format",
      options: ["image", "video", "pdf", "html", "gif"],
      selected: [],
    },
    {
      key: "brand",
      label: "Brand",
      options: mockBrands.map((b) => b.name),
      selected: [],
    },
    {
      key: "campaign",
      label: "Campaign",
      options: Array.from(
        new Set(mockCreatives.map((c) => c.campaignName))
      ),
      selected: [],
    },
    {
      key: "status",
      label: "Status",
      options: ["active", "expired", "draft", "archived", "pending"],
      selected: [],
    },
    {
      key: "platform",
      label: "Platform",
      options: ["instagram", "facebook", "linkedin", "twitter", "whatsapp", "email"],
      selected: [],
    },
    {
      key: "region",
      label: "Region",
      options: Array.from(
        new Set(mockCreatives.filter((c) => c.region).map((c) => c.region!))
      ),
      selected: [],
    },
  ])

  const handleFilterChange = (key: string, values: string[]) => {
    setFilters((prev) =>
      prev.map((f) => (f.key === key ? { ...f, selected: values } : f))
    )
  }

  const handleBrandSelect = (brandId: string, campaignId?: string) => {
    setSelectedBrandId(brandId)
    setSelectedCampaignId(campaignId)
    setSelectedCollectionId(undefined)
  }

  const handleCreativeClick = (creative: Creative) => {
    setSelectedCreative(creative)
    setDetailOpen(true)
  }

  const handleCollectionSelect = (id: string) => {
    setSelectedCollectionId(id === selectedCollectionId ? undefined : id)
    setSelectedBrandId("")
    setSelectedCampaignId(undefined)
  }

  // Filter creatives
  const filteredCreatives = useMemo(() => {
    let result = mockCreatives

    // Collection filter
    if (selectedCollectionId) {
      const collection = mockCollections.find((c) => c.id === selectedCollectionId)
      if (collection) {
        result = result.filter((c) => collection.creativeIds.includes(c.id))
      }
    }

    // Brand tree filter
    if (selectedBrandId) {
      result = result.filter((c) => c.brandId === selectedBrandId)
      if (selectedCampaignId) {
        result = result.filter((c) => c.campaignId === selectedCampaignId)
      }
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.tags.some((t) => t.name.toLowerCase().includes(q)) ||
          c.brandName.toLowerCase().includes(q) ||
          c.campaignName.toLowerCase().includes(q)
      )
    }

    // Chip filters
    const formatFilter = filters.find((f) => f.key === "format")
    if (formatFilter && formatFilter.selected.length > 0) {
      result = result.filter((c) => formatFilter.selected.includes(c.format))
    }

    const brandFilter = filters.find((f) => f.key === "brand")
    if (brandFilter && brandFilter.selected.length > 0) {
      result = result.filter((c) => brandFilter.selected.includes(c.brandName))
    }

    const campaignFilter = filters.find((f) => f.key === "campaign")
    if (campaignFilter && campaignFilter.selected.length > 0) {
      result = result.filter((c) => campaignFilter.selected.includes(c.campaignName))
    }

    const statusFilter = filters.find((f) => f.key === "status")
    if (statusFilter && statusFilter.selected.length > 0) {
      result = result.filter((c) => statusFilter.selected.includes(c.status))
    }

    const platformFilter = filters.find((f) => f.key === "platform")
    if (platformFilter && platformFilter.selected.length > 0) {
      result = result.filter((c) =>
        c.platforms.some((p) => platformFilter.selected.includes(p))
      )
    }

    const regionFilter = filters.find((f) => f.key === "region")
    if (regionFilter && regionFilter.selected.length > 0) {
      result = result.filter((c) => c.region && regionFilter.selected.includes(c.region))
    }

    return result
  }, [search, filters, selectedBrandId, selectedCampaignId, selectedCollectionId])

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Content Library
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Manage and organize your brand creatives
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setCollectionsOpen(true)}
          >
            <FolderOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Collections</span>
          </Button>
          <Button size="sm" className="gap-1.5" onClick={() => setUploadOpen(true)}>
            <Upload className="h-4 w-4" />
            <span className="hidden sm:inline">Upload</span>
          </Button>
        </div>
      </div>

      {/* Search */}
      <SearchBar value={search} onChange={setSearch} />

      {/* Filters + view toggle */}
      <div className="flex items-center gap-3">
        <div className="flex-1 overflow-hidden">
          <FilterChips filters={filters} onFilterChange={handleFilterChange} />
        </div>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <button
            onClick={() => setViewMode("grid")}
            className={cn(
              "p-2 transition-colors",
              viewMode === "grid"
                ? "bg-[#530093] text-white"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn(
              "p-2 transition-colors",
              viewMode === "list"
                ? "bg-[#530093] text-white"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Creative count */}
      <div className="text-sm text-gray-500">
        Showing {filteredCreatives.length} of {mockCreatives.length} creatives
        {selectedCollectionId && (
          <span className="ml-2 text-[#530093] font-medium">
            in &quot;{mockCollections.find((c) => c.id === selectedCollectionId)?.name}&quot;
            <button
              onClick={() => setSelectedCollectionId(undefined)}
              className="ml-1 text-xs underline hover:no-underline"
            >
              clear
            </button>
          </span>
        )}
      </div>

      {/* Main content with brand sidebar */}
      <div className="flex gap-4">
        {/* Brand tree sidebar - visible on lg+ */}
        <div
          className={cn(
            "hidden lg:block flex-shrink-0 transition-all duration-300",
            brandSidebarOpen ? "w-[240px]" : "w-0"
          )}
        >
          {brandSidebarOpen && (
            <div className="bg-white border border-gray-200 rounded-lg p-3 sticky top-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 font-heading">
                  Brands
                </h3>
                <button
                  onClick={() => setBrandSidebarOpen(false)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <PanelLeftClose className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <BrandTree
                brands={mockBrands}
                selectedBrandId={selectedBrandId}
                selectedCampaignId={selectedCampaignId}
                onSelect={handleBrandSelect}
              />
            </div>
          )}
        </div>

        {/* Collapsed sidebar toggle */}
        {!brandSidebarOpen && (
          <div className="hidden lg:block">
            <button
              onClick={() => setBrandSidebarOpen(true)}
              className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              title="Show brand tree"
            >
              <PanelLeft className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        )}

        {/* Creative grid/list */}
        <div className="flex-1 min-w-0">
          {filteredCreatives.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <LayoutGrid className="h-8 w-8 text-gray-300" />
              </div>
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                No creatives found
              </h3>
              <p className="text-xs text-gray-500 max-w-sm">
                Try adjusting your search or filter criteria to find what you are looking for.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCreatives.map((creative) => (
                <CreativeCard
                  key={creative.id}
                  creative={creative}
                  onClick={() => handleCreativeClick(creative)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <CreativeList
                creatives={filteredCreatives}
                onSelect={handleCreativeClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      <CreativeDetailModal
        creative={selectedCreative}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {/* Collections sheet */}
      <Sheet open={collectionsOpen} onOpenChange={setCollectionsOpen}>
        <SheetContent side="right" className="w-[340px] sm:max-w-[340px]">
          <SheetHeader>
            <SheetTitle>Collections</SheetTitle>
            <SheetDescription>
              Organize creatives into collections for quick access.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <CollectionsPanel
              collections={mockCollections}
              selectedId={selectedCollectionId}
              onSelect={(id) => {
                handleCollectionSelect(id)
                setCollectionsOpen(false)
              }}
              onCreateNew={() => {
                // Mock: just close the sheet
                setCollectionsOpen(false)
              }}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Upload dialog */}
      <UploadDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  )
}
