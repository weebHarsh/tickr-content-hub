"use client"

import React, { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  Search,
  Settings,
  ScanLine,
  FileCheck,
  Check,
  X,
  Loader2,
  FileImage,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ScoreCard } from "@/components/compliance/score-card"
import { mockValidationResults } from "@/lib/mock-data/compliance"
import type { ValidationResult } from "@/types/compliance"

const STEPS = [
  { id: 1, label: "Upload", icon: Upload },
  { id: 2, label: "Detect", icon: Search },
  { id: 3, label: "Configure", icon: Settings },
  { id: 4, label: "Scan", icon: ScanLine },
  { id: 5, label: "Results", icon: FileCheck },
]

const SCAN_ITEMS = [
  { label: "Brand colors", pass: true },
  { label: "Logo placement", pass: true },
  { label: "Text readability", pass: true },
  { label: "Legal disclaimers", pass: false },
  { label: "Format compliance", pass: true },
]

function StepIndicator({
  currentStep,
}: {
  currentStep: number
}) {
  return (
    <div className="flex items-center justify-center mb-8">
      {STEPS.map((step, index) => {
        const isActive = step.id === currentStep
        const isComplete = step.id < currentStep
        const Icon = step.icon

        return (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                  isComplete &&
                    "bg-[#530093] border-[#530093] text-white",
                  isActive &&
                    "bg-[#530093] border-[#530093] text-white shadow-lg shadow-purple-200",
                  !isComplete &&
                    !isActive &&
                    "border-gray-300 text-gray-400 bg-white"
                )}
              >
                {isComplete ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1.5 font-medium",
                  isActive || isComplete ? "text-[#530093]" : "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < STEPS.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-12 md:w-20 mx-2 mt-[-18px]",
                  step.id < currentStep ? "bg-[#530093]" : "bg-gray-200"
                )}
              />
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

function StepUpload() {
  const [dragging, setDragging] = useState(false)

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-xl p-12 text-center transition-colors",
        dragging
          ? "border-[#530093] bg-purple-50"
          : "border-gray-300 hover:border-[#530093]/50"
      )}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
      }}
    >
      <FileImage className="h-16 w-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] text-gray-700 mb-2">
        Drop creative here
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        or click to browse. Supports PNG, JPG, PDF, MP4, GIF
      </p>
      <Button variant="secondary" size="sm">
        Browse Files
      </Button>
    </div>
  )
}

function StepDetect({ onAutoAdvance }: { onAutoAdvance: () => void }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(onAutoAdvance, 700)
      return () => clearTimeout(timer)
    }
  }, [loading, onAutoAdvance])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 text-[#530093] animate-spin mb-4" />
        <p className="text-sm text-gray-500">Analyzing creative...</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold font-[family-name:var(--font-poppins)] mb-4 text-center">
        Detected Information
      </h3>
      <div className="space-y-3">
        {[
          { label: "Format", value: "Image / PNG" },
          { label: "Dimensions", value: "1080 x 1080 px" },
          { label: "File Size", value: "2.4 MB" },
          { label: "Brand", value: 'Auto-detected: "mFilterIt"' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3"
          >
            <span className="text-sm text-gray-500">{item.label}</span>
            <span className="text-sm font-medium text-gray-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-center text-gray-400 mt-4">
        Auto-advancing to configuration...
      </p>
    </div>
  )
}

function StepConfigure() {
  const [ruleset, setRuleset] = useState("standard")
  const [strictness, setStrictness] = useState(1)

  const rulesets = [
    { id: "standard", label: "Standard Brand Guidelines" },
    { id: "social", label: "Social Media Compliance" },
    { id: "email", label: "Email Campaign Rules" },
    { id: "partner", label: "Partner Creative Rules" },
  ]

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Select Ruleset
        </h4>
        <div className="space-y-2">
          {rulesets.map((r) => (
            <label
              key={r.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-colors",
                ruleset === r.id
                  ? "border-[#530093] bg-purple-50"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded-full border-2 flex items-center justify-center",
                  ruleset === r.id
                    ? "border-[#530093]"
                    : "border-gray-300"
                )}
              >
                {ruleset === r.id && (
                  <div className="h-2 w-2 rounded-full bg-[#530093]" />
                )}
              </div>
              <span className="text-sm">{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Region</h4>
        <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#530093]">
          <option>India (IN)</option>
          <option>United States (US)</option>
          <option>European Union (EU)</option>
          <option>United Kingdom (UK)</option>
          <option>Global</option>
        </select>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Strictness Level
        </h4>
        <input
          type="range"
          min={0}
          max={2}
          value={strictness}
          onChange={(e) => setStrictness(Number(e.target.value))}
          className="w-full accent-[#530093]"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Lenient</span>
          <span>Standard</span>
          <span>Strict</span>
        </div>
      </div>
    </div>
  )
}

function StepScan({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [visibleItems, setVisibleItems] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const itemInterval = setInterval(() => {
      setVisibleItems((prev) => {
        if (prev >= SCAN_ITEMS.length) {
          clearInterval(itemInterval)
          return prev
        }
        return prev + 1
      })
    }, 400)
    return () => clearInterval(itemInterval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(onComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <ScanLine className="h-10 w-10 text-[#530093] mx-auto mb-3 animate-pulse" />
        <p className="text-sm font-medium text-gray-700">Scanning...</p>
      </div>

      <Progress value={progress} className="h-3" />
      <p className="text-xs text-center text-gray-400">{progress}% complete</p>

      <div className="space-y-2">
        {SCAN_ITEMS.slice(0, visibleItems).map((item, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm",
              item.pass ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            )}
          >
            {item.pass ? (
              <Check className="h-4 w-4" />
            ) : (
              <X className="h-4 w-4" />
            )}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ValidationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const mockResult: ValidationResult = mockValidationResults[0]

  const handleAutoAdvance = useCallback(() => {
    setCurrentStep(3)
  }, [])

  const handleScanComplete = useCallback(() => {
    setCurrentStep(5)
    setShowResults(true)
  }, [])

  const canGoNext =
    currentStep === 1 || currentStep === 3
  const canGoBack = currentStep > 1 && currentStep < 5

  return (
    <div>
      <StepIndicator currentStep={currentStep} />

      <Card>
        <CardContent className="p-6 md:p-8">
          {currentStep === 1 && <StepUpload />}
          {currentStep === 2 && (
            <StepDetect onAutoAdvance={handleAutoAdvance} />
          )}
          {currentStep === 3 && <StepConfigure />}
          {currentStep === 4 && <StepScan onComplete={handleScanComplete} />}

          {currentStep !== 5 && currentStep !== 2 && currentStep !== 4 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentStep((s) => s - 1)}
                disabled={!canGoBack}
              >
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep((s) => s + 1)}
                disabled={!canGoNext}
              >
                {currentStep === 1 ? "Next" : currentStep === 3 ? "Start Scan" : "Next"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showResults && currentStep === 5 && (
        <div className="mt-6">
          <ScoreCard result={mockResult} />
        </div>
      )}
    </div>
  )
}
