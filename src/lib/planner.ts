import { FOOD_BY_ID } from '../data/foods'
import type { Food, Macros, MealKey } from '../types'
import { MEALS } from '../types'
import { householdMeasure, macrosFor, sumMacros } from './nutrition'

export interface PlanItem extends Macros {
  foodId: string
  name: string
  grams: number
  measure: string
}

export interface PlanMeal {
  meal: MealKey
  items: PlanItem[]
  totals: Macros
}

interface Template {
  protein: string[]
  carb: string[]
  fat: string[]
  fixed: string[][] // un alimento de cada grupo, en porción fija (1 medida casera)
}

const TEMPLATES: Record<MealKey, Template> = {
  desayuno: {
    protein: ['huevo', 'clara', 'yogur-griego', 'queso-fresco', 'pavo', 'cottage'],
    carb: ['avena', 'pan-int', 'tortilla-maiz', 'arepa', 'pan'],
    fat: ['palta', 'mani-mant', 'almendras', 'chia'],
    fixed: [['platano', 'fresas', 'papaya', 'manzana', 'mandarina', 'arandanos', 'pina']],
  },
  almuerzo: {
    protein: ['pollo', 'res', 'pescado', 'salmon', 'atun', 'cerdo', 'molida', 'camaron'],
    carb: ['arroz', 'arroz-int', 'papa', 'camote', 'quinua', 'pasta', 'frijoles', 'lentejas', 'yuca', 'choclo'],
    fat: ['aceite', 'palta'],
    fixed: [['ensalada', 'brocoli', 'vainitas', 'zapallito', 'salteado', 'espinaca']],
  },
  cena: {
    protein: ['pollo', 'pescado', 'huevo', 'atun', 'tofu', 'cerdo', 'camaron'],
    carb: ['tortilla-maiz', 'camote', 'papa', 'quinua', 'arroz', 'pan-int', 'garbanzos'],
    fat: ['aceite', 'palta', 'queso-fresco'],
    fixed: [['ensalada', 'brocoli', 'salteado', 'champinones', 'zapallito', 'pimiento']],
  },
  snack: {
    protein: ['yogur-griego', 'cottage', 'whey', 'huevo', 'queso-fresco'],
    carb: ['galleta-arroz', 'avena', 'granola', 'pan-int'],
    fat: ['almendras', 'nueces', 'mani', 'mani-mant'],
    fixed: [['manzana', 'platano', 'pera', 'fresas', 'uvas', 'naranja']],
  },
}

const MAX_GRAMS: Partial<Record<Food['category'], number>> = { protein: 300, carb: 400, fat: 60, dairy: 400 }

// Topes realistas por alimento (nadie come 175 g de jamón de pavo en un desayuno).
const MAX_BY_ID: Record<string, number> = {
  pavo: 80, 'queso-fresco': 90, mozzarella: 75, huevo: 200, clara: 200, whey: 45,
  'mani-mant': 32, almendras: 40, nueces: 35, mani: 40, chia: 24, aceite: 15, palta: 105,
  'galleta-arroz': 36, granola: 60, avena: 80, 'pan-int': 90, pan: 80, 'tortilla-maiz': 120,
  'tortilla-trigo': 90, arepa: 180, cottage: 230, 'yogur-griego': 340, salmon: 200,
}

const pick = <T,>(arr: T[], rnd: () => number): T => arr[Math.floor(rnd() * arr.length)]

/** Generador pseudoaleatorio con semilla (mulberry32): mismo número → mismo plan. */
export function seeded(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/**
 * Mínimos cuadrados no negativos (descenso por coordenadas) para encontrar
 * cuántos gramos de cada alimento cumplen proteína/carbos/grasa.
 * Las filas se ponderan por kcal por gramo (4/4/9).
 */
function solveGrams(foods: Food[], target: Macros): number[] {
  const w = [4, 4, 9]
  const A = [0, 1, 2].map((r) => foods.map((fd) => [fd.p, fd.c, fd.f][r] / 100 * w[r]))
  const b = [target.p * w[0], target.c * w[1], target.f * w[2]]
  const x = foods.map(() => 50)
  for (let iter = 0; iter < 400; iter++) {
    for (let j = 0; j < x.length; j++) {
      let grad = 0
      let norm = 0
      for (let r = 0; r < 3; r++) {
        const resid = A[r].reduce((s, a, k) => s + a * x[k], 0) - b[r]
        grad += A[r][j] * resid
        norm += A[r][j] * A[r][j]
      }
      const cap = MAX_BY_ID[foods[j].id] ?? MAX_GRAMS[foods[j].category] ?? 400
      if (norm > 0) x[j] = Math.min(cap, Math.max(0, x[j] - grad / norm))
    }
  }
  return x
}

/** Redondea a una medida casera "bonita" (¼ de unidad) o a 5 g. */
function roundGrams(food: Food, grams: number): number {
  const unit = food.units.find((un) => un.grams > 1)
  if (unit && unit.grams >= 20) {
    const q = Math.round((grams / unit.grams) * 4) / 4
    if (q >= 0.25 && Math.abs(q * unit.grams - grams) / Math.max(grams, 1) < 0.15) return q * unit.grams
  }
  return Math.max(5, Math.round(grams / 5) * 5)
}

function toItem(food: Food, grams: number): PlanItem {
  return { foodId: food.id, name: food.name, grams, measure: householdMeasure(food, grams), ...macrosFor(food, grams) }
}

/** Error relativo ponderado frente a la meta (las kcal pesan doble). */
function score(totals: Macros, target: Macros): number {
  const rel = (a: number, b: number) => Math.abs(a - b) / Math.max(b, 1)
  return 2 * rel(totals.kcal, target.kcal) + rel(totals.p, target.p) + rel(totals.c, target.c) + rel(totals.f, target.f)
}

/** Prueba varias combinaciones y se queda con la que mejor cumple la meta. */
export function generateMeal(meal: MealKey, target: Macros, rnd: () => number, tries = 30): PlanMeal {
  let best: PlanMeal | null = null
  let bestScore = Infinity
  for (let i = 0; i < tries; i++) {
    const cand = buildMeal(meal, target, rnd)
    const s = score(cand.totals, target)
    if (s < bestScore) { best = cand; bestScore = s }
  }
  return best!
}

function buildMeal(meal: MealKey, target: Macros, rnd: () => number): PlanMeal {
  const t = TEMPLATES[meal]
  const fixed = t.fixed.map((group) => FOOD_BY_ID[pick(group, rnd)])
  const fixedItems = fixed.map((fd) => toItem(fd, fd.units[0].grams))
  const fixedTotals = sumMacros(fixedItems)
  const remaining: Macros = {
    kcal: target.kcal - fixedTotals.kcal,
    p: Math.max(0, target.p - fixedTotals.p),
    c: Math.max(0, target.c - fixedTotals.c),
    f: Math.max(0, target.f - fixedTotals.f),
  }
  const main = [pick(t.protein, rnd), pick(t.carb, rnd), pick(t.fat, rnd)].map((id) => FOOD_BY_ID[id])
  const grams = solveGrams(main, remaining)
  const mainItems = main
    .map((fd, i) => ({ fd, g: roundGrams(fd, grams[i]) }))
    // Descarta porciones ridículas (menos de media medida casera, p. ej. "¼ puñado de maní").
    .filter(({ fd, g }) => g >= Math.max(10, fd.units[0].grams * 0.5))
    .map(({ fd, g }) => toItem(fd, g))
  const items = [...mainItems, ...fixedItems]
  return { meal, items, totals: sumMacros(items) }
}

export function generateDay(daily: Macros, seed: number): PlanMeal[] {
  const rnd = seeded(seed)
  return MEALS.map((m) =>
    generateMeal(
      m.key,
      { kcal: daily.kcal * m.share, p: daily.p * m.share, c: daily.c * m.share, f: daily.f * m.share },
      rnd,
    ),
  )
}
