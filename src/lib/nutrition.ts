import type { Food, Macros, Profile, Unit } from '../types'

export const ACTIVITY_LEVELS = [
  { value: 1.2, label: 'Sedentario', hint: 'Trabajo de escritorio, poco ejercicio' },
  { value: 1.375, label: 'Ligero', hint: 'Ejercicio 1–3 días por semana' },
  { value: 1.55, label: 'Moderado', hint: 'Ejercicio 3–5 días por semana' },
  { value: 1.725, label: 'Activo', hint: 'Ejercicio intenso 6–7 días' },
  { value: 1.9, label: 'Muy activo', hint: 'Trabajo físico + entrenamiento' },
]

export const GOALS = [
  { value: 'lose', label: 'Perder grasa', factor: 0.8 },
  { value: 'maintain', label: 'Mantener peso', factor: 1 },
  { value: 'gain', label: 'Ganar músculo', factor: 1.1 },
] as const

/** Metabolismo basal (Mifflin-St Jeor). */
export function bmr(p: Profile): number {
  const base = 10 * p.weightKg + 6.25 * p.heightCm - 5 * p.age
  return p.sex === 'male' ? base + 5 : base - 161
}

export function targetsFor(p: Profile): Macros {
  const tdee = bmr(p) * p.activity
  const factor = GOALS.find((g) => g.value === p.goal)?.factor ?? 1
  const kcal = Math.round(tdee * factor)
  const protein = Math.round(p.weightKg * (p.goal === 'maintain' ? 1.6 : 2))
  const fat = Math.round((kcal * 0.27) / 9)
  const carbs = Math.max(0, Math.round((kcal - protein * 4 - fat * 9) / 4))
  return { kcal, p: protein, c: carbs, f: fat }
}

export function macrosFor(food: Pick<Food, 'kcal' | 'p' | 'c' | 'f'>, grams: number): Macros {
  const k = grams / 100
  return { kcal: food.kcal * k, p: food.p * k, c: food.c * k, f: food.f * k }
}

export function sumMacros(list: Macros[]): Macros {
  return list.reduce(
    (a, m) => ({ kcal: a.kcal + m.kcal, p: a.p + m.p, c: a.c + m.c, f: a.f + m.f }),
    { kcal: 0, p: 0, c: 0, f: 0 },
  )
}

const FRACTIONS: [number, string][] = [[0.25, '¼'], [0.5, '½'], [0.75, '¾']]

const pluralWord = (w: string) =>
  /ón$/.test(w) ? w.replace(/ón$/, 'ones') : /[aeiouáéó]$/.test(w) ? `${w}s` : `${w}es`

/** "papa mediana" → "papas medianas"; "taza de granos" → "tazas de granos". */
export function pluralize(label: string): string {
  const words = label.split(' ')
  let stop = false
  return words
    .map((w) => {
      if (stop || ['de', 'en'].includes(w) || w.startsWith('(')) { stop = true; return w }
      return pluralWord(w)
    })
    .join(' ')
}

const isFractionLabel = (label: string) => /^\d/.test(label)

const withQty = (qty: number, label: string) =>
  isFractionLabel(label) && qty === 1 ? label : `${formatQty(qty)} ${qty > 1 ? pluralize(label) : label}`

export function formatQty(q: number): string {
  const whole = Math.floor(q)
  const frac = q - whole
  const sym = FRACTIONS.find(([v]) => Math.abs(v - frac) < 0.01)?.[1] ?? ''
  if (whole === 0 && sym) return sym
  return `${whole}${sym}`
}

/** Expresa unos gramos en la medida casera más cómoda: "1½ taza". */
export function householdMeasure(food: Food, grams: number): string {
  let best: { text: string; cost: number } | null = null
  for (const unit of food.units) {
    if (unit.grams === 1) continue
    // Cosas pequeñas (galletas, cucharaditas) se cuentan de media en media; el resto en cuartos.
    const step = unit.grams < 20 ? 2 : 4
    const qty = Math.round((grams / unit.grams) * step) / step
    // Medidas que ya son fracción ("1/2 taza") solo se usan enteras, para no escribir "1½ 1/2 taza".
    if (isFractionLabel(unit.label) && qty !== 1) continue
    if (qty < 0.25 || qty > 8) continue
    const err = Math.abs(qty * unit.grams - grams) / grams
    // Preferimos medidas fáciles: penaliza contar muchas cucharadas.
    const cost = err + (qty > 4 ? 0.05 * (qty - 4) : 0)
    if (!best || cost < best.cost - 0.02) best = { text: withQty(qty, unit.label), cost }
  }
  return best ? best.text : `${Math.round(grams)} g`
}

export function unitText(unit: Unit, qty: number): string {
  if (unit.grams === 1) return `${Math.round(qty)} g`
  if (isFractionLabel(unit.label) && qty !== 1) return `${formatQty(qty)} × ${unit.label}`
  return withQty(qty, unit.label)
}

export const today = () => toISODate(new Date())

export function toISODate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number)
  return toISODate(new Date(y, m - 1, d + n))
}

export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36)
