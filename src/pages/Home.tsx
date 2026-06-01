import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Palette, Type, Grid3x3, PenTool, Cpu, Code2,
  ArrowUpRight, Sparkles
} from 'lucide-react'

const tools = [
  {
    path: '/color-lab',
    title: 'Color Lab',
    desc: 'Explore palettes, generate harmonies, fine-tune with HSL.',
    icon: Palette,
    color: '#a78bfa',
    preview: (
      <div className="flex gap-1 mt-4">
        {['#a78bfa', '#818cf8', '#60a5fa', '#34d399', '#fbbf24', '#fb7185'].map((c, i) => (
          <motion.div key={c} className="h-2 rounded-full flex-1" style={{ background: c }}
            animate={{ scaleX: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
    ),
  },
  {
    path: '/typography',
    title: 'Typography',
    desc: 'Pair fonts, preview scales, tune optical sizing.',
    icon: Type,
    color: '#60a5fa',
    preview: (
      <div className="mt-4 space-y-1">
        <motion.p className="font-display font-bold text-xl leading-none text-ink-primary"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}>
          Aa Gg 0123
        </motion.p>
        <p className="font-mono text-[10px] text-ink-muted tracking-wider">THE QUICK BROWN FOX</p>
      </div>
    ),
  },
  {
    path: '/patterns',
    title: 'Patterns',
    desc: 'Procedural SVG patterns with live tiled preview.',
    icon: Grid3x3,
    color: '#fbbf24',
    preview: (
      <div className="mt-4 grid grid-cols-8 gap-[3px]">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.div key={i} className="aspect-square rounded-[2px]"
            style={{ background: '#fbbf24', opacity: 0.08 + (i % 8) * 0.1 }}
            animate={{ opacity: [0.08 + (i % 8) * 0.1, 0.2 + (i % 8) * 0.12, 0.08 + (i % 8) * 0.1] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.05 }}
          />
        ))}
      </div>
    ),
  },
  {
    path: '/icons',
    title: 'Icon Forge',
    desc: 'Customize strokes, corners, fills. Export SVG.',
    icon: PenTool,
    color: '#fb7185',
    preview: (
      <div className="flex gap-2 mt-4">
        {[Palette, Type, Grid3x3, PenTool].map((Icon, i) => (
          <motion.div key={i} className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(251,113,133,0.1)', color: '#fb7185' }}
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12 }}>
            <Icon className="w-4 h-4" />
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    path: '/shaders',
    title: 'Shaders',
    desc: 'Live GLSL editor with real-time WebGL preview.',
    icon: Cpu,
    color: '#22d3ee',
    preview: (
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map(i => (
          <motion.div key={i} className="h-10 rounded-lg flex-1"
            style={{ background: `linear-gradient(${135 + i * 45}deg, rgba(34,211,238,0.4), rgba(34,211,238,0.05))` }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    ),
  },
  {
    path: '/tokens',
    title: 'Design Tokens',
    desc: 'Define, export, sync tokens across platforms.',
    icon: Code2,
    color: '#34d399',
    preview: (
      <div className="mt-3 space-y-1 font-mono text-[10px]">
        {['--primary: #1a1714', '--space-md: 16px', '--radius-sm: 6px'].map((line, i) => (
          <motion.div key={i} className="px-2 py-1 rounded"
            style={{ background: 'rgba(52,211,153,0.06)', color: '#34d399' }}
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}>
            {line}
          </motion.div>
        ))}
      </div>
    ),
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh relative overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }} />
      <div className="absolute top-[200px] right-[-150px] w-[500px] h-[500px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)' }} />

      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-20 md:pt-28 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #a78bfa, #22d3ee)' }}>
              <Sparkles className="w-5 h-5 text-ink-inverse" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-ink-primary">Creative Studio</span>
          </div>
          <h1 className="font-display font-bold tracking-tight leading-[1.05] mb-5"
            style={{ fontSize: 'clamp(2.4rem, 5vw + 1rem, 4.2rem)' }}>
            <span className="text-ink-primary">Your design toolbox,</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              all in one place.
            </span>
          </h1>
          <p className="text-ink-secondary max-w-lg leading-relaxed" style={{ fontSize: 'var(--text-lg)' }}>
            Six precision tools for color, type, pattern, icons, shaders, and tokens.
            Built for speed. Exported for production.
          </p>
        </motion.div>
      </section>

      {/* Tool Grid */}
      <section className="relative px-6 md:px-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool, i) => {
            const Icon = tool.icon
            return (
              <motion.button
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                onClick={() => navigate(tool.path)}
                className="group relative text-left rounded-2xl border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:border-border-hover"
                style={{ background: 'var(--color-surface-1)' }}
                whileHover={{ y: -4 }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${tool.color}12, transparent 70%)` }} />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)` }} />

                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-300"
                      style={{ background: 'var(--color-surface-3)', color: 'var(--color-ink-muted)' }}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <h3 className="font-display font-bold text-base text-ink-primary">{tool.title}</h3>
                    <ArrowUpRight className="w-4 h-4 text-ink-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: tool.color }} />
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed">{tool.desc}</p>
                  {tool.preview}
                </div>
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 md:px-10 py-5 border-t border-border">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>Creative Studio &mdash; 2026</span>
          <span className="font-mono">v1.0.0</span>
        </div>
      </footer>
    </div>
  )
}
