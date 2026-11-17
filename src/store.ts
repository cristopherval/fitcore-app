import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Entry, Macros, Profile, WeightLog } from './types'
import type { PlanMeal } from './lib/planner'
import { targetsFor, today } from './lib/nutrition'

interface State {
  profile: Profile | null
  targets: Macros | null
  entries: Entry[]
  weights: WeightLog[]
  water: Record<string, number> // ml por fecha
  waterGoal: number
  plan: PlanMeal[] | null

  setPlan: (p: PlanMeal[] | null) => void
  setProfile: (p: Profile) => void
  setTargets: (t: Macros) => void
  addEntries: (e: Entry[]) => void
  removeEntry: (id: string) => void
  logWeight: (kg: number, date?: string) => void
  removeWeight: (date: string) => void
  addWater: (date: string, ml: number) => void
  setWaterGoal: (ml: number) => void
  resetAll: () => void
}

export const useStore = create<State>()(
  persist(
    (set) => ({
      profile: null,
      targets: null,
      entries: [],
      weights: [],
      water: {},
      waterGoal: 2000,
      plan: null,

      setPlan: (plan) => set({ plan }),
      setProfile: (p) =>
        set((s) => {
          const date = today()
          const weights = [...s.weights.filter((w) => w.date !== date), { date, kg: p.weightKg }]
          return { profile: p, targets: targetsFor(p), plan: null, weights: weights.sort((a, b) => a.date.localeCompare(b.date)) }
        }),
      setTargets: (t) => set({ targets: t }),
      addEntries: (e) => set((s) => ({ entries: [...s.entries, ...e] })),
      removeEntry: (id) => set((s) => ({ entries: s.entries.filter((x) => x.id !== id) })),
      logWeight: (kg, date = today()) =>
        set((s) => ({
          weights: [...s.weights.filter((w) => w.date !== date), { date, kg }].sort((a, b) => a.date.localeCompare(b.date)),
          profile: s.profile && date === today() ? { ...s.profile, weightKg: kg } : s.profile,
        })),
      removeWeight: (date) => set((s) => ({ weights: s.weights.filter((w) => w.date !== date) })),
      addWater: (date, ml) => set((s) => ({ water: { ...s.water, [date]: Math.max(0, (s.water[date] ?? 0) + ml) } })),
      setWaterGoal: (ml) => set({ waterGoal: ml }),
      resetAll: () => set({ profile: null, targets: null, entries: [], weights: [], water: {}, plan: null }),
    }),
    { name: 'nutriplan-v1' },
  ),
)
