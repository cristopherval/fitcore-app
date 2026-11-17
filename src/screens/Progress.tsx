import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { addDays, sumMacros, today } from '../lib/nutrition'
import { useStore } from '../store'

const short = (iso: string) => {
  const [, m, d] = iso.split('-')
  return `${Number(d)}/${Number(m)}`
}

export function Progress() {
  const { weights, logWeight, removeWeight, entries, targets, profile, water, waterGoal } = useStore()
  const [kg, setKg] = useState<number>(profile?.weightKg ?? 0)
  if (!targets) return null

  const last7 = Array.from({ length: 7 }, (_, i) => addDays(today(), i - 6))
  const kcalData = last7.map((d) => ({
    day: short(d),
    kcal: Math.round(sumMacros(entries.filter((e) => e.date === d)).kcal),
    agua: (water[d] ?? 0) / 1000,
  }))
  const logged = kcalData.filter((d) => d.kcal > 0)
  const avg = logged.length ? Math.round(logged.reduce((s, d) => s + d.kcal, 0) / logged.length) : 0

  const weightData = weights.map((w) => ({ day: short(w.date), kg: w.kg }))
  const first = weights[0]?.kg
  const last = weights[weights.length - 1]?.kg
  const diff = first != null && last != null ? last - first : 0

  return (
    <>
      <div className="header"><h1>Progreso</h1></div>

      <div className="card">
        <h3>Peso</h3>
        <div className="grid2" style={{ margin: '12px 0' }}>
          <div><div className="big-num">{last?.toFixed(1) ?? '—'} kg</div><span className="muted small">actual</span></div>
          <div>
            <div className="big-num" style={{ color: diff <= 0 ? 'var(--accent)' : 'var(--carbs)' }}>{diff > 0 ? '+' : ''}{diff.toFixed(1)} kg</div>
            <span className="muted small">desde el inicio</span>
          </div>
        </div>
        {weightData.length > 1 && (
          <div style={{ height: 180 }}>
            <ResponsiveContainer>
              <LineChart data={weightData} margin={{ left: -20, right: 8, top: 8 }}>
                <CartesianGrid stroke="var(--line)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} tick={{ fontSize: 11, fill: 'var(--muted)' }} />
                <Tooltip formatter={(v) => [`${v} kg`, 'Peso']} />
                <Line type="monotone" dataKey="kg" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="row" style={{ marginTop: 12 }}>
          <input className="input" type="number" inputMode="decimal" step="0.1" value={kg || ''} onChange={(e) => setKg(Number(e.target.value))} aria-label="Peso de hoy en kg" />
          <button className="btn" disabled={!(kg > 30)} onClick={() => logWeight(kg)}>Registrar hoy</button>
        </div>
        {weights.length > 0 && (
          <details style={{ marginTop: 12 }}>
            <summary className="muted small" style={{ cursor: 'pointer' }}>Historial ({weights.length})</summary>
            {[...weights].reverse().map((w) => (
              <div className="food-row" key={w.date}>
                <span className="grow">{w.date}</span><strong>{w.kg} kg</strong>
                <button className="icon-btn" onClick={() => removeWeight(w.date)} aria-label={`Borrar peso del ${w.date}`}>🗑</button>
              </div>
            ))}
          </details>
        )}
      </div>

      <div className="card">
        <div className="row between">
          <h3>Calorías — últimos 7 días</h3>
          <span className="muted small">promedio {avg} kcal</span>
        </div>
        <div style={{ height: 180, marginTop: 12 }}>
          <ResponsiveContainer>
            <BarChart data={kcalData} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--line)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} />
              <Tooltip formatter={(v) => [`${v} kcal`, 'Consumido']} />
              <ReferenceLine y={targets.kcal} stroke="var(--muted)" strokeDasharray="4 4" />
              <Bar dataKey="kcal" fill="var(--accent)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3>Agua — últimos 7 días</h3>
        <div style={{ height: 150, marginTop: 12 }}>
          <ResponsiveContainer>
            <BarChart data={kcalData} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid stroke="var(--line)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'var(--muted)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--muted)' }} />
              <Tooltip formatter={(v) => [`${v} L`, 'Agua']} />
              <ReferenceLine y={waterGoal / 1000} stroke="var(--muted)" strokeDasharray="4 4" />
              <Bar dataKey="agua" fill="var(--water)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  )
}
