"use client"

import { useState, useEffect } from "react"
import { useStrategyData } from "./use-strategy-data"
import { DEMO_ML_RECOMMENDATION } from "@/lib/demo-data"

export interface MLRecommendation {
  action: "rebalance" | "hold" | "emergency"
  confidence: number
  estimatedGain: number
  reasoning: string[]
  suggestedAllocations: Array<{
    strategy: string
    current: number
    suggested: number
  }>
  timestamp: Date
}

export function useMLRecommendations() {
  const [recommendation, setRecommendation] = useState<MLRecommendation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { strategies, isDemoMode } = useStrategyData()

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        if (isDemoMode) {
          setRecommendation(DEMO_ML_RECOMMENDATION)
          setIsLoading(false)
          return
        }

        // In production, call your ML service API
        const response = await fetch("/api/ml/recommendations")
        const data = await response.json()
        setRecommendation(data)
      } catch (error) {
        console.log("[v0] Failed to fetch ML recommendations, using demo data")
        setRecommendation(DEMO_ML_RECOMMENDATION)
      } finally {
        setIsLoading(false)
      }
    }

    if (strategies.length > 0) {
      fetchRecommendations()
    }
  }, [strategies, isDemoMode])

  return {
    recommendation,
    isLoading,
  }
}
