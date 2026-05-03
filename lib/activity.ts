export type ActivityType = "deposit" | "withdraw" | "stake" | "unstake" | "claim" | "rebalance" | "vote"

export interface UserActivity {
  id: string
  type: ActivityType
  vaultName?: string
  vaultAddress?: string
  amount: string
  assetSymbol: string
  txHash: string
  timestamp: number
}

const ACTIVITY_STORAGE_KEY = "yieldmind_user_activity"
export const ACTIVITY_UPDATED_EVENT = "yieldmind:activity-updated"

export function readActivities(): UserActivity[] {
  if (typeof window === "undefined") return []

  try {
    const raw = localStorage.getItem(ACTIVITY_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as UserActivity[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function trackActivity(activity: Omit<UserActivity, "id" | "timestamp">) {
  if (typeof window === "undefined") return

  const next: UserActivity = {
    ...activity,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
  }

  const existing = readActivities()
  const updated = [next, ...existing].slice(0, 25)
  localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated))
  window.dispatchEvent(new CustomEvent(ACTIVITY_UPDATED_EVENT))
}
