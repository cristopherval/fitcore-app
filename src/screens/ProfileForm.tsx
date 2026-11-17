import { useState } from 'react'
import { ACTIVITY_LEVELS, GOALS, targetsFor } from '../lib/nutrition'
import type { Goal, Profile, Sex } from '../types'

const EMPTY: Profile = { name: '', sex: 'female', age: 30, heightCm: 165, weightKg: 70, activity: 1.375, goal: 'lose' }

export function ProfileForm({ initial, onSave, cta }: { initial?: Profile | null; onSave: (p: Profile) => void; cta: string }) {
  const [p, setP] = useState<Profile>(initial ?? EMPTY)
  const set = <K extends keyof Profile>(k: K, v: Profile[K]) => setP((x) => ({ ...x, [k]: v }))
  const valid = p.age >= 14 && p.age <= 100 && p.heightCm >= 120 && p.heightCm <= 230 && p.weightKg >= 30 && p.weightKg <= 300
  const t = valid ? targetsFor(p) : null

  return (
    <div className="stack">
      <label className="field">
        Tu nombre
        <input className="input" value={p.name} onChange={(e) => set('name', e.target.value)} placeholder="Opcional" />
      </label>

      <div className="field">
        <span className="muted small">Sexo (para calcular tu metabolismo)</span>
        <div className="chips">
          {([['female', 'Mujer'], ['male', 'Hombre']] as [Sex, string][]).map(([v, l]) => (
            <button key={v} type="button" className={`chip ${p.sex === v ? 'active' : ''}`} onClick={() => set('sex', v)}>{l}</button>
          ))}
        </div>
      </div>

      <div className="grid2" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
        <label className="field">Edad
          <input className="input" type="number" inputMode="numeric" value={p.age || ''} onChange={(e) => set('age', Number(e.target.value))} />
        </label>
        <label className="field">Altura (cm)
          <input className="input" type="number" inputMode="numeric" value={p.heightCm || ''} onChange={(e) => set('heightCm', Number(e.target.value))} />
        </label>
        <label className="field">Peso (kg)
          <input className="input" type="number" inputMode="decimal" step="0.1" value={p.weightKg || ''} onChange={(e) => set('weightKg', Number(e.target.value))} />
        </label>
      </div>

      <div className="field">
        <span className="muted small">Nivel de actividad</span>
        <div className="stack" style={{ gap: 6 }}>
          {ACTIVITY_LEVELS.map((a) => (
            <button key={a.value} type="button" className={`option ${p.activity === a.value ? 'active' : ''}`} onClick={() => set('activity', a.value)}>
              <strong>{a.label}</strong> <span className="muted small">— {a.hint}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <span className="muted small">Objetivo</span>
        <div className="chips">
          {GOALS.map((g) => (
            <button key={g.value} type="button" className={`chip ${p.goal === g.value ? 'active' : ''}`} onClick={() => set('goal', g.value as Goal)}>{g.label}</button>
          ))}
        </div>
      </div>

      {t && (
        <div className="notice">
          Tu meta diaria: <strong>{t.kcal} kcal</strong> · Proteína {t.p} g · Carbohidratos {t.c} g · Grasas {t.f} g
        </div>
      )}

      <button className="btn block" disabled={!valid} onClick={() => onSave(p)}>{cta}</button>
    </div>
  )
}
