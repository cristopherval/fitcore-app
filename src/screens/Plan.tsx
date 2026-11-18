import { useState } from 'react'
import { Icon, MacroBars, MacroLine } from '../components/ui'
import { generateDay, generateMeal, seeded, type PlanMeal } from '../lib/planner'
import { sumMacros, today, uid } from '../lib/nutrition'
import { useStore } from '../store'
import { MEALS, type Entry } from '../types'

export function Plan() {
  const { targets, plan, setPlan, addEntries } = useStore()
  const [added, setAdded] = useState<string | null>(null)
  if (!targets) return null

  const regenerateDay = () => setPlan(generateDay(targets, Date.now()))
  const regenerateMeal = (idx: number) => {
    if (!plan) return
    const share = MEALS[idx].share
    const meal = generateMeal(
      MEALS[idx].key,
      { kcal: targets.kcal * share, p: targets.p * share, c: targets.c * share, f: targets.f * share },
      seeded(Date.now()),
    )
    setPlan(plan.map((m, i) => (i === idx ? meal : m)))
  }
  const toEntries = (m: PlanMeal): Entry[] =>
    m.items.map((it) => ({
      id: uid(), date: today(), meal: m.meal, name: it.name, grams: it.grams, measure: it.measure, source: 'plan',
      kcal: it.kcal, p: it.p, c: it.c, f: it.f,
    }))
  const flash = (msg: string) => { setAdded(msg); setTimeout(() => setAdded(null), 2000) }

  const totals = plan ? sumMacros(plan.map((m) => m.totals)) : null

  return (
    <>
      <div className="header">
        <div>
          <h1>Plan de comidas</h1>
          <span className="muted small">Ajustado a {targets.kcal} kcal y tus macros</span>
        </div>
      </div>

      {!plan ? (
        <div className="card stack">
          <p style={{ margin: 0 }}>Genera un menú del día con porciones en medidas caseras (tazas, cucharadas, unidades), sin necesidad de balanza.</p>
          <button className="btn block" onClick={regenerateDay}>Generar mi plan</button>
        </div>
      ) : (
        <>
          <div className="card">
            <div className="row between" style={{ marginBottom: 12 }}>
              <div>
                <div className="big-num">{Math.round(totals!.kcal)} kcal</div>
                <span className="muted small">meta {targets.kcal} kcal</span>
              </div>
              <button className="btn sm ghost" onClick={regenerateDay}><Icon name="refresh" size={16} /> Nuevo plan</button>
            </div>
            <MacroBars value={totals!} goal={targets} />
          </div>

          {plan.map((m, idx) => (
            <div className="card" key={m.meal}>
              <div className="meal-head">
                <div>
                  <h3>{MEALS[idx].label}</h3>
                  <MacroLine m={m.totals} />
                </div>
                <button className="icon-btn" onClick={() => regenerateMeal(idx)} aria-label={`Cambiar ${MEALS[idx].label}`} title="Cambiar"><Icon name="refresh" size={18} /></button>
              </div>
              <div style={{ marginTop: 8 }}>
                {m.items.map((it) => (
                  <div className="food-row" key={it.foodId}>
                    <div className="grow">
                      <div className="food-name">{it.name}</div>
                      <div className="muted small"><strong>{it.measure}</strong> · {Math.round(it.grams)} g · {Math.round(it.kcal)} kcal</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn sm soft" style={{ marginTop: 8 }} onClick={() => { addEntries(toEntries(m)); flash(`${MEALS[idx].label} añadido a hoy`) }}>
                <Icon name="check" size={16} /> Lo comí
              </button>
            </div>
          ))}

          <button className="btn block" style={{ marginTop: 12 }} onClick={() => { addEntries(plan.flatMap(toEntries)); flash('Plan completo añadido a hoy') }}>
            Añadir todo el plan a hoy
          </button>
        </>
      )}

      {added && (
        <div className="toast" role="status"><Icon name="check" size={16} /> {added}</div>
      )}
    </>
  )
}
