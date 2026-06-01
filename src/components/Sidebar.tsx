import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Palette, Type, Grid3x3, PenTool, Cpu, Code2,
  ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react'

const tools = [
  { path: '/color-lab', label: 'Color Lab', icon: Palette, color: 'var(--color-violet)', bg: 'var(--color-violet-soft)' },
  { path: '/typography', label: 'Typography', icon: Type, color: 'var(--color-navy)', bg: 'var(--color-navy-soft)' },
  { path: '/patterns', label: 'Patterns', icon: Grid3x3, color: 'var(--color-amber)', bg: 'var(--color-amber-soft)' },
  { path: '/icons', label: 'Icon Forge', icon: PenTool, color: 'var(--color-coral)', bg: 'var(--color-coral-soft)' },
  { path: '/shaders', label: 'Shaders', icon: Cpu, color: 'var(--color-cyan)', bg: 'var(--color-cyan-soft)' },
  { path: '/tokens', label: 'Tokens', icon: Code2, color: 'var(--color-emerald)', bg: 'var(--color-emerald-soft)' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-4 py-3 bg-surface-0/80 backdrop-blur-xl border-b border-border-subtle">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-ink-primary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-ink-inverse" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">Studio</span>
        </NavLink>
      </div>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 h-dvh z-50 hidden md:flex flex-col bg-surface-1/60 backdrop-blur-xl border-r border-border-subtle"
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border-subtle">
          <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-ink-primary flex items-center justify-center shrink-0">
              <Sparkles className="w-4.5 h-4.5 text-ink-inverse" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-display font-semibold text-lg tracking-tight whitespace-nowrap"
                >
                  Creative Studio
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
          <button
            onClick={() => setCollapsed(c => !c)}
            className="w-7 h-7 rounded-md flex items-center justify-center text-ink-muted hover:text-ink-primary hover:bg-surface-2 transition-colors cursor-pointer shrink-0"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {tools.map(({ path, label, icon: Icon, color, bg }) => {
            const active = location.pathname === path
            return (
              <NavLink
                key={path}
                to={path}
                className="group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer"
                style={{
                  background: active ? bg : 'transparent',
                  color: active ? color : 'var(--color-ink-secondary)',
                }}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: bg }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10 shrink-0" style={{ color: active ? color : undefined }} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.15 }}
                      className="relative z-10 text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {collapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 rounded-md bg-ink-primary text-ink-inverse text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                    {label}
                  </div>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border-subtle">
          <AnimatePresence>
            {!collapsed && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs text-ink-muted"
              >
                6 tools for designers
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-center justify-around px-2 py-2 bg-surface-0/90 backdrop-blur-xl border-t border-border-subtle safe-area-pb">
        {tools.map(({ path, icon: Icon, color, label }) => {
          const active = location.pathname === path
          return (
            <NavLink
              key={path}
              to={path}
              className="flex flex-col items-center gap-0.5 px-2 py-1"
            >
              <Icon className="w-5 h-5" style={{ color: active ? color : 'var(--color-ink-muted)' }} />
              <span className="text-[10px] font-medium" style={{ color: active ? color : 'var(--color-ink-muted)' }}>
                {label.split(' ')[0]}
              </span>
            </NavLink>
          )
        })}
      </div>
    </>
  )
}
