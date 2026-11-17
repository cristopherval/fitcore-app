export type MealKey = 'desayuno' | 'almuerzo' | 'cena' | 'snack'

export const MEALS: { key: MealKey; label: string; share: number }[] = [
  { key: 'desayuno', label: 'Desayuno', share: 0.25 },
  { key: 'almuerzo', label: 'Almuerzo', share: 0.35 },
  { key: 'cena', label: 'Cena', share: 0.25 },
  { key: 'snack', label: 'Snacks', share: 0.15 },
]

export type FoodCategory = 'protein' | 'carb' | 'fat' | 'veg' | 'fruit' | 'dairy' | 'other'

/** Medida casera: para quien no tiene balanza. */
export interface Unit {
  label: string
  grams: number
}

/** Valores por 100 g. */
export interface Food {
  id: string
  name: string
  category: FoodCategory
  kcal: number
  p: number
  c: number
  f: number
  units: Unit[]
}

export interface Macros {
  kcal: number
  p: number
  c: number
  f: number
}

export interface Entry extends Macros {
  id: string
  date: string // YYYY-MM-DD
  meal: MealKey
  name: string
  grams: number
  measure?: string // p. ej. "1 taza"
  source: 'db' | 'plan' | 'manual'
}

export type Sex = 'male' | 'female'
export type Goal = 'lose' | 'maintain' | 'gain'

export interface Profile {
  name: string
  sex: Sex
  age: number
  heightCm: number
  weightKg: number
  activity: number // factor 1.2 – 1.9
  goal: Goal
}

export interface WeightLog {
  date: string
  kg: number
}
