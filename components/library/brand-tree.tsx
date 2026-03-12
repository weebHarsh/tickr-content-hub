"use client"

import React, { useState } from "react"
import { ChevronRight, ChevronDown, Building2, Megaphone, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Brand } from "@/types/content"

interface BrandTreeProps {
  brands: Brand[]
  selectedBrandId?: string
  selectedCampaignId?: string
  onSelect: (brandId: string, campaignId?: string) => void
}

export function BrandTree({
  brands,
  selectedBrandId,
  selectedCampaignId,
  onSelect,
}: BrandTreeProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [expandedCampaigns, setExpandedCampaigns] = useState<Record<string, boolean>>({})

  const toggleBrand = (brandId: string) => {
    setExpanded((prev) => ({ ...prev, [brandId]: !prev[brandId] }))
  }

  const toggleCampaign = (campaignId: string) => {
    setExpandedCampaigns((prev) => ({ ...prev, [campaignId]: !prev[campaignId] }))
  }

  return (
    <div className="space-y-1">
      {/* All Brands option */}
      <button
        onClick={() => onSelect("")}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors",
          !selectedBrandId && !selectedCampaignId
            ? "bg-[#530093] text-white font-medium"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <Layers className="h-4 w-4 flex-shrink-0" />
        All Brands
      </button>

      {brands.map((brand) => {
        const isExpanded = expanded[brand.id] ?? false
        const isBrandSelected = selectedBrandId === brand.id && !selectedCampaignId

        return (
          <div key={brand.id}>
            {/* Brand level */}
            <div className="flex items-center">
              <button
                onClick={() => toggleBrand(brand.id)}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
                )}
              </button>
              <button
                onClick={() => onSelect(brand.id)}
                className={cn(
                  "flex-1 flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors text-left",
                  isBrandSelected
                    ? "bg-[#530093] text-white font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <Building2 className="h-4 w-4 flex-shrink-0" />
                {brand.name}
              </button>
            </div>

            {/* Campaigns */}
            {isExpanded && (
              <div className="ml-6 border-l border-gray-200 pl-2 space-y-0.5 mt-0.5">
                {brand.campaigns.map((campaign) => {
                  const isCampaignSelected = selectedCampaignId === campaign.id
                  const hasSubs = campaign.subCampaigns && campaign.subCampaigns.length > 0
                  const isCampaignExpanded = expandedCampaigns[campaign.id] ?? false

                  return (
                    <div key={campaign.id}>
                      <div className="flex items-center">
                        {hasSubs ? (
                          <button
                            onClick={() => toggleCampaign(campaign.id)}
                            className="p-0.5 rounded hover:bg-gray-100 transition-colors"
                          >
                            {isCampaignExpanded ? (
                              <ChevronDown className="h-3 w-3 text-gray-400" />
                            ) : (
                              <ChevronRight className="h-3 w-3 text-gray-400" />
                            )}
                          </button>
                        ) : (
                          <span className="w-4" />
                        )}
                        <button
                          onClick={() => onSelect(brand.id, campaign.id)}
                          className={cn(
                            "flex-1 flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors text-left",
                            isCampaignSelected
                              ? "bg-[#530093]/10 text-[#530093] font-medium"
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          <Megaphone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{campaign.name}</span>
                        </button>
                      </div>

                      {/* Sub-campaigns */}
                      {hasSubs && isCampaignExpanded && (
                        <div className="ml-6 border-l border-gray-100 pl-2 space-y-0.5 mt-0.5">
                          {campaign.subCampaigns!.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => onSelect(brand.id, campaign.id)}
                              className="w-full text-left px-2 py-1 rounded text-[11px] text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors truncate"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
