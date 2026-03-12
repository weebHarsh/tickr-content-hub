"use client"

import React, { useState, useMemo } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { mockPartners, mockAssignments } from "@/lib/mock-data/partners"

const PRODUCTS = ["mFilterIt Ad Suite", "TickR Platform", "AdVault", "BrandShield"]
const REGIONS = ["All Regions", "North India", "South India", "East India", "West India"]

export function AssignmentMatrix() {
  const [regionFilter, setRegionFilter] = useState("All Regions")

  const filteredPartners = useMemo(() => {
    if (regionFilter === "All Regions") return mockPartners
    return mockPartners.filter((p) => p.region === regionFilter)
  }, [regionFilter])

  const getAssignment = (partnerId: string, product: string) => {
    return mockAssignments.find(
      (a) => a.partnerId === partnerId && a.product === product
    )
  }

  return (
    <div className="space-y-4">
      <Tabs value={regionFilter} onValueChange={setRegionFilter}>
        <TabsList>
          {REGIONS.map((r) => (
            <TabsTrigger key={r} value={r}>
              {r}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="border rounded-lg overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="min-w-[200px] font-semibold">Partner</TableHead>
              {PRODUCTS.map((product) => (
                <TableHead key={product} className="text-center min-w-[160px] font-semibold">
                  {product}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPartners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{partner.name}</p>
                    <p className="text-xs text-gray-500">{partner.region}</p>
                  </div>
                </TableCell>
                {PRODUCTS.map((product) => {
                  const assignment = getAssignment(partner.id, product)
                  const isAssigned = assignment && assignment.status === "assigned"

                  return (
                    <TableCell key={product} className="text-center">
                      {assignment ? (
                        <div
                          className={cn(
                            "inline-flex flex-col items-center gap-1 px-3 py-1.5 rounded-md",
                            isAssigned
                              ? "bg-green-50 border border-green-200"
                              : "bg-gray-50 border border-gray-200"
                          )}
                        >
                          <code
                            className={cn(
                              "text-xs font-mono",
                              isAssigned ? "text-green-700" : "text-gray-400"
                            )}
                          >
                            {assignment.code}
                          </code>
                          <Badge
                            variant={isAssigned ? "success" : "outline"}
                            className="text-[10px] px-1.5 py-0"
                          >
                            {isAssigned ? "Assigned" : "Unassigned"}
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-gray-300 text-lg">&mdash;</span>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
            {filteredPartners.length === 0 && (
              <TableRow>
                <TableCell colSpan={PRODUCTS.length + 1} className="text-center py-8 text-gray-400">
                  No partners in this region.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-green-100 border border-green-300" />
          Assigned
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-gray-100 border border-gray-300" />
          Unassigned
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-gray-300">&mdash;</span>
          No code
        </div>
      </div>
    </div>
  )
}
