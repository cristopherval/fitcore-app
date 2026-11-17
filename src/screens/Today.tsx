import { useState } from 'react'
import { MacroBars, MacroLine, Ring } from '../components/ui'
import { addDays, sumMacros, today } from '../lib/nutrition'
import { useStore } from '../store'
import { MEALS, type MealKey } from '../types'
import { AddFood } from './AddFood'

export function formatDay(iso: string): string {
  if (iso === today()) return 'Hoy'
  if (iso === addDays(today(), -1)) return 'Ayer'
  if (iso === addDays(today(), 1)) return 'Mañana'
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('es', { weekday: 'short', day: 'numeric', month: 'short' })
}

export function Today() {
  const [date, setDate] = useState(today())
  const [adding, setAdding] = useState<MealKey | null>(null)
  const { entries, targets, removeEntry, water, waterGoal, addWater, profile } = useStore()
  const dayEntries = entries.filter((e) => e.date === date)
  const totals = sumMacros(dayEntries)
  const waterMl = water[date] ?? 0
  if (!targets) return null

  return (
    <>
      <div className="header">
        <div>
          <h1>{profile?.name ? `Hola, ${profile.name}` : 'Mi diario'}</h1>
          <span className="muted small">{Math.round(totals.kcal)} / {targets.kcal} kcal</span>
        </div>
        <div className="date-nav">
          <button className="icon-btn" onClick={() => setDate(addDays(date, -1))} aria-label="Día anterior">‹</button>
          <button className="btn sm ghost" onClick={() => setDate(today())}>{formatDay(date)}</button>
          <button className="icon-btn" onClick={() => setDate(addDays(date, 1))} aria-label="Día siguiente">›</button>
        </div>
      </div>

      <div className="card summary">
        <Ring value={totals.kcal} goal={targets.kcal} />
        <MacroBars value={totals} goal={targets} />
      </div>

      {MEALS.map((m) => {
        const list = dayEntries.filter((e) => e.meal === m.key)
        const sub = sumMacros(list)
        return (
          <div className="card" key={m.key}>
            <div className="meal-head">
              <div>
                <h3>{m.label}</h3>
                <span className="muted small">{Math.round(sub.kcal)} / {Math.round(targets.kcal * m.share)} kcal</span>
              </div>
              <button className="btn sm soft" onClick={() => setAdding(m.key)}>+ Añadir</button>
            </div>
            {list.length > 0 && (
              <div style={{ marginTop: 8 }}>
                {list.map((e) => (
                  <div className="food-row" key={e.id}>
                    <div className="grow">
                      <div className="food-name">
                        {e.name}
                        {e.source === 'plan' && <span className="tag">plan</span>}
                      </div>
                      <div className="muted small">{e.measure ? `${e.measure} · ` : ''}{Math.round(e.grams)} g</div>
                      <MacroLine m={e} />
                    </div>
                    <button className="icon-btn" onClick={() => removeEntry(e.id)} aria-label={`Eliminar ${e.name}`}>🗑</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}

      <div className="card">
        <div className="meal-head">
          <div>
            <h3>Agua</h3>
            <span className="muted small">{(waterMl / 1000).toFixed(2)} / {(waterGoal / 1000).toFixed(1)} L</span>
          </div>
          <div className="row">
            <button className="btn sm ghost" onClick={() => addWater(date, -250)} aria-label="Quitar un vaso">−</button>
            <button className="btn sm soft" onClick={() => addWater(date, 250)}>+ 1 vaso</button>
          </div>
        </div>
        <div className="bar" style={{ marginTop: 10 }}>
          <div style={{ width: `${Math.min(100, (waterMl / waterGoal) * 100)}%`, background: 'var(--water)' }} />
        </div>
      </div>

      {adding && <AddFood date={date} meal={adding} onClose={() => setAdding(null)} />}
    </>
  )
}
