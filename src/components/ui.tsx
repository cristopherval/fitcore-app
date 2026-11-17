import type { ReactNode } from 'react'
import type { Macros } from '../types'

export function Ring({ value, goal, size = 120 }: { value: number; goal: number; size?: number }) {
  const stroke = 10
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const pct = goal > 0 ? Math.min(1, value / goal) : 0
  const over = value > goal
  const left = Math.round(goal - value)
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${Math.round(value)} de ${goal} kcal`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--line)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={over ? 'var(--danger)' : 'var(--accent)'} strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: 'stroke-dashoffset .4s' }}
      />
      <text x="50%" y="46%" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--text)">{Math.abs(left)}</text>
      <text x="50%" y="62%" textAnchor="middle" fontSize="11" fill="var(--muted)">{over ? 'kcal de más' : 'kcal restantes'}</text>
    </svg>
  )
}

export function MacroBar({ label, value, goal, color }: { label: string; value: number; goal: number; color: string }) {
  const pct = goal > 0 ? Math.min(100, (value / goal) * 100) : 0
  return (
    <div>
      <div className="bar-label"><span>{label}</span><span className="muted">{Math.round(value)} / {goal} g</span></div>
      <div className="bar"><div style={{ width: `${pct}%`, background: color }} /></div>
    </div>
  )
}

export function MacroBars({ value, goal }: { value: Macros; goal: Macros }) {
  return (
    <div className="macro-bars">
      <MacroBar label="Proteína" value={value.p} goal={goal.p} color="var(--protein)" />
      <MacroBar label="Carbohidratos" value={value.c} goal={goal.c} color="var(--carbs)" />
      <MacroBar label="Grasas" value={value.f} goal={goal.f} color="var(--fat)" />
    </div>
  )
}

export function MacroLine({ m }: { m: Macros }) {
  return (
    <span className="muted small">
      {Math.round(m.kcal)} kcal · P {Math.round(m.p)} · C {Math.round(m.c)} · G {Math.round(m.f)}
    </span>
  )
}

export function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={title}>
        <div className="sheet-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  )
}
