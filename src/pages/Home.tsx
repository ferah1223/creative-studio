import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Palette, Type, Grid3x3, PenTool, Cpu, Code2,
  ArrowRight, Sparkles
} from 'lucide-react'
import { useState } from 'react'

const tools = [
  {
    path: '/color-lab',
    title: 'Color Lab',
    desc: 'Explore palettes, extract from images, generate harmonies with OKLCH precision.',
    icon: Palette,
    color: '#7c3aed',
    bg: '#ede9fe',
    accent: '#ddd6fe',
    span: 'col-span-2 row-span-2',
    preview: 'colors',
  },
  {
    path: '/typography',
    title: 'Typography Studio',
    desc: 'Pair fonts, preview scales, fine-tune optical sizing and variable axes.',
    icon: Type,
    color: '#1e40af',
    bg: '#dbeafe',
    accent: '#bfdbfe',
    span: 'col-span-1 row-span-1',
    preview: 'type',
  },
  {
    path: '/patterns',
    title: 'Pattern Generator',
    desc: 'Procedural patterns: geometric, organic, noise-based. SVG & PNG export.',
    icon: Grid3x3,
    color: '#b45309',
    bg: '#fef3c7',
    accent: '#fde68a',
    span: 'col-span-1 row-span-2',
    preview: 'pattern',
  },
  {
    path: '/icons',
    title: 'Icon Forge',
    desc: 'Customize strokes, corners, fills. Build your own icon system.',
    icon: PenTool,
    color: '#be123c',
    bg: '#ffe4e6',
    accent: '#fecdd3',
    span: 'col-span-1 row-span-1',
    preview: 'icon',
  },
  {
    path: '/shaders',
    title: 'Shader Playground',
    desc: 'Live GLSL editor with real-time preview. Gradient, noise, and mesh shaders.',
    icon: Cpu,
    color: '#0891b2',
    bg: '#cffafe',
    accent: '#a5f3fc',
    span: 'col-span-2 row-span-1',
    preview: 'shader',
  },
  {
    path: '/tokens',
    title: 'Design Tokens',
    desc: 'Define, export, sync tokens across platforms. W3C DTCG format.',
    icon: Code2,
    color: '#047857',
    bg: '#d1fae5',
    accent: '#a7f3d0',
    span: 'col-span-1 row-span-1',
    preview: 'token',
  },
]

// Animated preview components for each tool card
function ColorPreview(_props: { color: string }) {
  return (
    <div className="flex gap-1.5 mt-3">
      {['#7c3aed', '#3b82f6', '#f59e0b', '#ef4444', '#10b981'].map((c, i) => (
        <motion.div
          key={c}
          className="w-8 h-8 rounded-full first:rounded-l-lg last:rounded-r-lg"
          style={{ background: c }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

function TypePreview({ color }: { color: string }) {
  return (
    <div className="mt-3 space-y-1">
      <motion.div
        className="font-display font-bold text-2xl leading-none"
        style={{ color }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        Aa Bb Cc
      </motion.div>
      <div className="font-body text-xs text-ink-muted tracking-wide">The quick brown fox</div>
    </div>
  )
}

function PatternPreview({ color }: { color: string }) {
  return (
    <div className="mt-3 grid grid-cols-6 gap-1">
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="w-4 h-4 rounded-sm"
          style={{ background: color, opacity: 0.15 + (i % 6) * 0.12 }}
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{ duration: 8, repeat: Infinity, delay: i * 0.1, ease: 'linear' }}
        />
      ))}
    </div>
  )
}

function IconPreview({ color }: { color: string }) {
  return (
    <div className="flex gap-2 mt-3">
      {[Palette, Type, Grid3x3, PenTool].map((Icon, i) => (
        <motion.div
          key={i}
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: color + '15', color }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
        >
          <Icon className="w-4 h-4" />
        </motion.div>
      ))}
    </div>
  )
}

function ShaderPreview({ color }: { color: string }) {
  return (
    <div className="mt-3 flex gap-2">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="h-10 rounded-lg flex-1"
          style={{
            background: `linear-gradient(${135 + i * 45}deg, ${color}, ${color}44, transparent)`,
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
    </div>
  )
}

function TokenPreview({ color }: { color: string }) {
  return (
    <div className="mt-3 space-y-1 font-mono text-[10px]">
      {['--space-sm: 8px', '--radius-md: 10px', '--color-primary: #1a1714'].map((line, i) => (
        <motion.div
          key={i}
          className="px-2 py-1 rounded"
          style={{ background: color + '10', color }}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  )
}

const previewMap: Record<string, React.FC<{ color: string }>> = {
  colors: ColorPreview,
  type: TypePreview,
  pattern: PatternPreview,
  icon: IconPreview,
  shader: ShaderPreview,
  token: TokenPreview,
}

export default function Home() {
  const navigate = useNavigate()
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-20 pt-20 md:pt-28 pb-12 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="w-9 h-9 rounded-xl bg-ink-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-ink-inverse" />
            </div>
            <span className="font-display font-semibold text-xl tracking-tight">Creative Studio</span>
          </div>
          <h1 className="font-display font-bold tracking-tight leading-none mb-4"
            style={{ fontSize: 'clamp(2.2rem, 5vw + 1rem, 4rem)' }}>
            Your design toolbox,
            <br />
            <span className="text-ink-muted">all in one place.</span>
          </h1>
          <p className="text-ink-secondary max-w-xl leading-relaxed" style={{ fontSize: 'var(--text-lg)' }}>
            Six precision tools for color, type, pattern, icons, shaders, and tokens.
            Built for speed. Exported for production.
          </p>
        </motion.div>
      </section>

      {/* Tool Canvas */}
      <section className="px-6 md:px-12 lg:px-20 pb-24 md:pb-16 flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[180px]">
          {tools.map((tool, i) => {
            const Icon = tool.icon
            const Preview = previewMap[tool.preview]
            const hovered = hoveredIdx === i
            return (
              <motion.button
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => navigate(tool.path)}
                className={`${tool.span} group relative rounded-2xl border border-border-subtle text-left overflow-hidden cursor-pointer transition-all duration-300`}
                style={{
                  background: hovered ? tool.bg : 'var(--color-surface-1)',
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                  style={{
                    background: tool.color,
                    opacity: hovered ? 1 : 0.3,
                  }}
                />

                <div className="relative z-10 p-5 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300"
                        style={{
                          background: hovered ? tool.color + '20' : 'var(--color-surface-2)',
                          color: hovered ? tool.color : 'var(--color-ink-secondary)',
                        }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-display font-semibold text-base" style={{ color: hovered ? tool.color : 'var(--color-ink-primary)' }}>
                        {tool.title}
                      </h3>
                    </div>
                    <p className="text-sm text-ink-secondary leading-relaxed max-w-xs">
                      {tool.desc}
                    </p>
                  </div>

                  {/* Animated preview */}
                  {Preview && <Preview color={tool.color} />}

                  {/* Arrow */}
                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{
                        background: hovered ? tool.color : 'var(--color-surface-2)',
                        color: hovered ? 'white' : 'var(--color-ink-muted)',
                      }}
                      animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 lg:px-20 py-6 border-t border-border-subtle md:ml-0">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>Creative Studio &mdash; 2026</span>
          <span className="font-mono">v1.0.0</span>
        </div>
      </footer>
    </div>
  )
}
