import { useState } from 'react'
import { Plan } from './screens/Plan'
import { ProfileForm } from './screens/ProfileForm'
import { Progress } from './screens/Progress'
import { Settings } from './screens/Settings'
import { Today } from './screens/Today'
import { useStore } from './store'

const TABS = [
  { key: 'today', label: 'Diario', ico: '📒' },
  { key: 'plan', label: 'Plan', ico: '🥗' },
  { key: 'progress', label: 'Progreso', ico: '📈' },
  { key: 'settings', label: 'Ajustes', ico: '⚙️' },
] as const

type TabKey = (typeof TABS)[number]['key']

export default function App() {
  const profile = useStore((s) => s.profile)
  const setProfile = useStore((s) => s.setProfile)
  const [tab, setTab] = useState<TabKey>('today')

  if (!profile) {
    return (
      <div className="app" style={{ paddingBottom: 32 }}>
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <img src={`${import.meta.env.BASE_URL}icon.svg`} alt="" width={64} height={64} />
          <h1 style={{ marginTop: 12 }}>Bienvenido a Fitcore App</h1>
          <p className="muted">Cuéntanos sobre ti para calcular tus calorías y macros.</p>
        </div>
        <div className="card">
          <ProfileForm cta="Empezar" onSave={setProfile} />
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      {tab === 'today' && <Today />}
      {tab === 'plan' && <Plan />}
      {tab === 'progress' && <Progress />}
      {tab === 'settings' && <Settings />}
      <nav className="tabs">
        <div className="tabs-inner">
          {TABS.map((t) => (
            <button key={t.key} className={`tab ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>
              <span className="ico" aria-hidden>{t.ico}</span>
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
