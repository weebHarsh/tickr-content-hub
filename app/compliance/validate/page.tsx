"use client"

import React from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ValidationWizard } from "@/components/compliance/validation-wizard"

export default function ValidatePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/compliance">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-semibold text-brand-dark">Validate Creative</h1>
          <p className="text-sm text-gray-500 mt-1">Upload and validate creatives against compliance rules</p>
        </div>
      </div>

      <ValidationWizard />
    </div>
  )
}
