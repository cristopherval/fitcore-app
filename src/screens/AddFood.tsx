import { useState } from 'react'
import { Icon, MacroLine, Sheet } from '../components/ui'
import { FOOD_GROUPS, searchFoods } from '../data/foods'
import { macrosFor, uid, unitText } from '../lib/nutrition'
import { useStore } from '../store'
import { MEALS, type Food, type MealKey } from '../types'

type Mode = 'search' | 'manual'

export function AddFood({ date, meal, onClose }: { date: string; meal: MealKey; onClose: () => void }) {
  const [mode, setMode] = useState<Mode>('search')
  const label = MEALS.find((m) => m.key === meal)?.label ?? ''
  return (
    <Sheet title={`Añadir a ${label}`} onClose={onClose}>
      <div className="seg">
        <button className={mode === 'search' ? 'active' : ''} onClick={() => setMode('search')}><Icon name="search" size={16} /> Buscar</button>
        <button className={mode === 'manual' ? 'active' : ''} onClick={() => setMode('manual')}><Icon name="pencil" size={16} /> Manual</button>
      </div>
      {mode === 'search' && <SearchMode date={date} meal={meal} onDone={onClose} />}
      {mode === 'manual' && <ManualMode date={date} meal={meal} onDone={onClose} />}
    </Sheet>
  )
}

function SearchMode({ date, meal, onDone }: { date: string; meal: MealKey; onDone: () => void }) {
  const [q, setQ] = useState('')
  const [group, setGroup] = useState('all')
  const [food, setFood] = useState<Food | null>(null)
  const [unitIdx, setUnitIdx] = useState(0)
  const [qty, setQty] = useState(1)
  const addEntries = useStore((s) => s.addEntries)

  if (food) {
    const unit = food.units[unitIdx]
    const grams = unit.grams * qty
    const m = macrosFor(food, grams)
    return (
      <div className="stack">
        <button className="btn sm ghost" style={{ alignSelf: 'flex-start' }} onClick={() => setFood(null)}><Icon name="left" size={16} /> Volver</button>
        <h3>{food.name}</h3>
        <div className="grid2">
          <label className="field">Cantidad
            <input className="input" type="number" inputMode="decimal" min={0} step={unit.grams === 1 ? 5 : 0.25}
              value={qty || ''} onChange={(e) => setQty(Number(e.target.value))} />
          </label>
          <label className="field">Medida
            <select className="input" value={unitIdx} onChange={(e) => {
              const i = Number(e.target.value)
              setUnitIdx(i)
              setQty(food.units[i].grams === 1 ? 100 : 1)
            }}>
              {food.units.map((un, i) => (
                <option key={un.label} value={i}>{un.grams === 1 ? 'gramos / ml' : `${un.label} (~${un.grams} g)`}</option>
              ))}
            </select>
          </label>
        </div>
        {unit.grams !== 1 && (
          <div className="chips">
            {[0.5, 1, 1.5, 2].map((v) => (
              <button key={v} className={`chip ${qty === v ? 'active' : ''}`} onClick={() => setQty(v)}>{unitText(unit, v)}</button>
            ))}
          </div>
        )}
        <div className="card">
          <div className="big-num">{Math.round(m.kcal)} kcal</div>
          <MacroLine m={m} /> <span className="muted small">· {Math.round(grams)} g</span>
        </div>
        <button className="btn block" disabled={!(qty > 0)} onClick={() => {
          addEntries([{ id: uid(), date, meal, name: food.name, grams, measure: unitText(unit, qty), source: 'db', ...m }])
          onDone()
        }}>Agregar</button>
      </div>
    )
  }

  const results = searchFoods(q, group).slice(0, 60)
  return (
    <div>
      <input className="input" autoFocus placeholder="Buscar (baleada, frijoles, Coca-Cola…)" value={q} onChange={(e) => setQ(e.target.value)} style={{ marginBottom: 12 }} />
      <div className="chips" style={{ flexWrap: 'nowrap', overflowX: 'auto', marginBottom: 8, paddingBottom: 4 }}>
        {FOOD_GROUPS.map((g) => (
          <button key={g.key} className={`chip ${group === g.key ? 'active' : ''}`} style={{ flexShrink: 0 }} onClick={() => setGroup(g.key)}>{g.label}</button>
        ))}
      </div>
      {results.map((fd) => (
        <button key={fd.id} className="list-item" onClick={() => { setFood(fd); setUnitIdx(0); setQty(1) }}>
          <div>
            <div>{fd.name}</div>
            <span className="muted small">{fd.units[0].label} ≈ {Math.round(macrosFor(fd, fd.units[0].grams).kcal)} kcal</span>
          </div>
          <span className="muted"><Icon name="right" size={16} /></span>
        </button>
      ))}
      {results.length === 0 && <p className="muted">No está en la lista. Regístralo en Manual.</p>}
      <p className="muted small" style={{ marginTop: 16 }}>Valores aproximados. Si el empaque trae tabla nutricional, usa esos datos en Manual.</p>
    </div>
  )
}

function ManualMode({ date, meal, onDone }: { date: string; meal: MealKey; onDone: () => void }) {
  const addEntries = useStore((s) => s.addEntries)
  const [v, setV] = useState({ name: '', kcal: 0, p: 0, c: 0, f: 0, grams: 0 })
  const num = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: Number(e.target.value) })
  return (
    <div className="stack">
      <label className="field">Nombre
        <input className="input" value={v.name} onChange={(e) => setV({ ...v, name: e.target.value })} placeholder="Ej. Lomo saltado" />
      </label>
      <div className="grid2">
        <label className="field">Calorías (kcal)<input className="input" type="number" inputMode="numeric" onChange={num('kcal')} /></label>
        <label className="field">Porción (g, opcional)<input className="input" type="number" inputMode="numeric" onChange={num('grams')} /></label>
        <label className="field">Proteína (g)<input className="input" type="number" inputMode="decimal" onChange={num('p')} /></label>
        <label className="field">Carbohidratos (g)<input className="input" type="number" inputMode="decimal" onChange={num('c')} /></label>
        <label className="field">Grasas (g)<input className="input" type="number" inputMode="decimal" onChange={num('f')} /></label>
      </div>
      <button className="btn block" disabled={!v.name || !(v.kcal > 0)} onClick={() => {
        addEntries([{ id: uid(), date, meal, source: 'manual', ...v }])
        onDone()
      }}>Agregar</button>
    </div>
  )
}
