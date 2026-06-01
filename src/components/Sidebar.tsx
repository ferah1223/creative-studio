import { NavLink, useLocation } from 'react-router-dom'
import {
  Palette, Type, Grid3x3, PenTool, Cpu, Code2,
  Sparkles
} from 'lucide-react'

const tools = [
  { path: '/color-lab', label: 'Color Lab', icon: Palette, color: 'var(--color-violet)', dim: 'var(--color-violet-dim)' },
  { path: '/typography', label: 'Typography', icon: Type, color: 'var(--color-navy)', dim: 'var(--color-navy-dim)' },
  { path: '/patterns', label: 'Patterns', icon: Grid3x3, color: 'var(--color-amber)', dim: 'var(--color-amber-dim)' },
  { path: '/icons', label: 'Icon Forge', icon: PenTool, color: 'var(--color-coral)', dim: 'var(--color-coral-dim)' },
  { path: '/shaders', label: 'Shaders', icon: Cpu, color: 'var(--color-cyan)', dim: 'var(--color-cyan-dim)' },
  { path: '/tokens', label: 'Tokens', icon: Code2, color: 'var(--color-emerald)', dim: 'var(--color-emerald-dim)' },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed top-0 left-0 h-dvh w-[220px] z-50 hidden md:flex flex-col bg-surface-0/80 backdrop-blur-xl border-r border-border">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 px-5 h-16 border-b border-border shrink-0 hover:bg-surface-1/50 transition-colors">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-violet), var(--color-cyan))' }}>
            <Sparkles className="w-4 h-4 text-ink-inverse" />
          </div>
          <div>
            <span className="font-display font-bold text-sm tracking-tight text-ink-primary">Creative Studio</span>
          </div>
        </NavLink>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          <p className="px-3 mb-2 text-[10px] font-mono uppercase tracking-[0.15em] text-ink-muted">Tools</p>
          {tools.map(({ path, label, icon: Icon, color, dim }) => {
            const active = location.pathname === path
            return (
              <NavLink
                key={path}
                to={path}
                className="group relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 cursor-pointer text-sm"
                style={{
                  background: active ? dim : 'transparent',
                  color: active ? color : 'var(--color-ink-secondary)',
                }}
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-colors duration-200"
                  style={{
                    background: active ? color + '20' : 'var(--color-surface-2)',
                    color: active ? color : 'var(--color-ink-muted)',
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="font-medium">{label}</span>
                {active && (
                  <div className="absolute right-3 w-1.5 h-1.5 rounded-full" style={{ background: color }} />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-border">
          <p className="text-[10px] text-ink-muted font-mono">v1.0.0</p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface-0/90 backdrop-blur-xl border-t border-border">
        <div className="flex items-center justify-around px-2 py-2">
          {tools.map(({ path, icon: Icon, color, label }) => {
            const active = location.pathname === path
            return (
              <NavLink key={path} to={path} className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-colors"
                style={{ background: active ? 'var(--color-surface-2)' : 'transparent' }}>
                <Icon className="w-5 h-5" style={{ color: active ? color : 'var(--color-ink-muted)' }} />
                <span className="text-[10px] font-medium" style={{ color: active ? color : 'var(--color-ink-muted)' }}>
                  {label.split(' ')[0]}
                </span>
              </NavLink>
            )
          })}
        </div>
      </div>
    </>
  )
}
