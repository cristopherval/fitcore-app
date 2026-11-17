import { useState } from 'react'
import { useStore } from '../store'
import { ProfileForm } from './ProfileForm'

export function Settings() {
  const { profile, setProfile, targets, setTargets, waterGoal, setWaterGoal, resetAll } = useStore()
  const [editingProfile, setEditingProfile] = useState(false)

  return (
    <>
      <div className="header"><h1>Ajustes</h1></div>

      <div className="card stack">
        <div className="row between">
          <h3>Mi perfil</h3>
          <button className="btn sm ghost" onClick={() => setEditingProfile(!editingProfile)}>{editingProfile ? 'Cerrar' : 'Editar'}</button>
        </div>
        {editingProfile ? (
          <ProfileForm initial={profile} cta="Guardar y recalcular metas" onSave={(p) => { setProfile(p); setEditingProfile(false) }} />
        ) : (
          profile && <span className="muted small">{profile.age} años · {profile.heightCm} cm · {profile.weightKg} kg</span>
        )}
      </div>

      {targets && (
        <div className="card stack">
          <h3>Metas diarias (puedes ajustarlas)</h3>
          <div className="grid2">
            {([['kcal', 'Calorías (kcal)'], ['p', 'Proteína (g)'], ['c', 'Carbohidratos (g)'], ['f', 'Grasas (g)']] as const).map(([k, label]) => (
              <label className="field" key={k}>{label}
                <input className="input" type="number" inputMode="numeric" value={targets[k] || ''} onChange={(e) => setTargets({ ...targets, [k]: Number(e.target.value) })} />
              </label>
            ))}
            <label className="field">Agua (ml)
              <input className="input" type="number" inputMode="numeric" step={250} value={waterGoal || ''} onChange={(e) => setWaterGoal(Number(e.target.value))} />
            </label>
          </div>
        </div>
      )}

      <div className="card stack">
        <h3>Datos</h3>
        <p className="muted small" style={{ margin: 0 }}>Todo se guarda en este dispositivo. Si borras los datos del navegador, se pierden.</p>
        <button className="btn danger" onClick={() => { if (confirm('¿Borrar perfil, comidas, pesos y agua? No se puede deshacer.')) resetAll() }}>
          Borrar todos mis datos
        </button>
      </div>
    </>
  )
}
