import { useState } from 'react'
import { Plan } from './screens/Plan'
import { ProfileForm } from './screens/ProfileForm'
import { Progress } from './screens/Progress'
import { Settings } from './screens/Settings'
import { Today } from './screens/Today'
import { useStore } from './store'
import { Icon, type IconName } from './components/ui'

const TABS = [
  { key: 'today', label: 'Diario', ico: 'book' as IconName },
  { key: 'plan', label: 'Plan', ico: 'bowl' as IconName },
  { key: 'progress', label: 'Progreso', ico: 'chart' as IconName },
  { key: 'settings', label: 'Ajustes', ico: 'gear' as IconName },
] as const

type TabKey = (typeof TABS)[number]['key']

export default function App() {
  const profile = useStore((s) => s.profile)
  const setProfile = useStore((s) => s.setProfile)
  const [tab, setTab] = useState<TabKey>('today')

  if (!profile) {
    return (
      <div className="app" style={{ paddingBottom: 32 }}>
        <div style={{ margin: '32px 0 28px' }}>
          <h1 style={{ fontSize: 32 }}>Fitcore</h1>
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
              <Icon name={t.ico} size={22} />
              {t.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
