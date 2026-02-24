"use client"

import { useEffect, useState } from "react"
import { ACTIVITY_UPDATED_EVENT, readActivities, type UserActivity } from "@/lib/activity"

export function useUserActivity() {
  const [activities, setActivities] = useState<UserActivity[]>([])

  useEffect(() => {
    const load = () => setActivities(readActivities())
    load()
    window.addEventListener(ACTIVITY_UPDATED_EVENT, load)

    return () => {
      window.removeEventListener(ACTIVITY_UPDATED_EVENT, load)
    }
  }, [])

  return {
    activities,
  }
}