import { useState } from 'react'
import { motion } from 'framer-motion'

const fonts = [
  { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif", category: 'Display' },
  { name: 'Inter', family: "'Inter', sans-serif", category: 'Body' },
  { name: 'JetBrains Mono', family: "'JetBrains Mono', monospace", category: 'Mono' },
  { name: 'Playfair Display', family: "'Playfair Display', serif", category: 'Serif' },
  { name: 'DM Sans', family: "'DM Sans', sans-serif", category: 'Geometric' },
  { name: 'Outfit', family: "'Outfit', sans-serif", category: 'Modern' },
]

const scaleRatios = [
  { name: 'Minor Second', ratio: 1.067 },
  { name: 'Major Second', ratio: 1.125 },
  { name: 'Minor Third', ratio: 1.2 },
  { name: 'Major Third', ratio: 1.25 },
  { name: 'Perfect Fourth', ratio: 1.333 },
  { name: 'Golden Ratio', ratio: 1.618 },
]

export default function TypographyStudio() {
  const [headingFont, setHeadingFont] = useState(fonts[0])
  const [bodyFont, setBodyFont] = useState(fonts[1])
  const [monoFont, setMonoFont] = useState(fonts[2])
  const [scale, setScale] = useState(scaleRatios[3])
  const [baseSize, setBaseSize] = useState(16)
  const [sampleText, setSampleText] = useState('The quick brown fox jumps over the lazy dog')
  const [weight, setWeight] = useState(400)
  const [letterSpacing, setLetterSpacing] = useState(0)
  const [lineHeight, setLineHeight] = useState(1.5)

  const sizes = Array.from({ length: 7 }, (_, i) => ({
    label: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'][i],
    size: Math.round(baseSize * Math.pow(scale.ratio, i - 2) * 100) / 100,
  }))

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl tracking-tight" style={{ color: 'var(--color-navy)' }}>
          Typography Studio
        </h1>
        <p className="text-ink-secondary mt-1">Pair fonts, configure scales, preview at every size.</p>
      </div>

      {/* Font Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Heading', current: headingFont, set: setHeadingFont },
          { label: 'Body', current: bodyFont, set: setBodyFont },
          { label: 'Mono', current: monoFont, set: setMonoFont },
        ].map(({ label, current, set }) => (
          <div key={label} className="rounded-xl border border-border-subtle bg-surface-1 p-4 space-y-2">
            <label className="text-xs font-mono text-ink-muted uppercase tracking-wider">{label}</label>
            <select
              value={current.name}
              onChange={e => set(fonts.find(f => f.name === e.target.value)!) }
              className="w-full bg-surface-0 border border-border rounded-lg px-3 py-2 text-sm font-medium cursor-pointer appearance-none"
            >
              {fonts.map(f => (
                <option key={f.name} value={f.name}>{f.name} &mdash; {f.category}</option>
              ))}
            </select>
            <div className="text-2xl font-medium truncate" style={{ fontFamily: current.family }}>
              {current.name}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="rounded-xl border border-border-subtle bg-surface-1 p-6 space-y-4">
        <h2 className="font-display font-semibold">Controls</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-mono text-ink-muted">Scale</label>
            <select
              value={scale.name}
              onChange={e => setScale(scaleRatios.find(s => s.name === e.target.value)!)}
              className="w-full bg-surface-0 border border-border rounded-lg px-3 py-2 text-sm cursor-pointer appearance-none"
            >
              {scaleRatios.map(s => (
                <option key={s.name} value={s.name}>{s.name} ({s.ratio})</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono text-ink-muted">Base: {baseSize}px</label>
            <input type="range" min={12} max={24} value={baseSize} onChange={e => setBaseSize(+e.target.value)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono text-ink-muted">Weight: {weight}</label>
            <input type="range" min={100} max={900} step={100} value={weight} onChange={e => setWeight(+e.target.value)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-mono text-ink-muted">Tracking: {letterSpacing}em</label>
            <input type="range" min={-0.05} max={0.15} step={0.005} value={letterSpacing} onChange={e => setLetterSpacing(+e.target.value)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3" />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-mono text-ink-muted">Line Height: {lineHeight}</label>
          <input type="range" min={1} max={2.5} step={0.05} value={lineHeight} onChange={e => setLineHeight(+e.target.value)}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3 max-w-xs" />
        </div>
        <input
          type="text"
          value={sampleText}
          onChange={e => setSampleText(e.target.value)}
          className="w-full bg-surface-0 border border-border rounded-lg px-4 py-2 text-sm"
          placeholder="Type sample text..."
        />
      </div>

      {/* Type Scale Preview */}
      <div>
        <h2 className="font-display font-semibold text-xl mb-4">Type Scale &mdash; {scale.name} ({scale.ratio})</h2>
        <div className="space-y-4">
          {sizes.map(({ label, size }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-baseline gap-4 pb-4 border-b border-border-subtle"
            >
              <span className="font-mono text-xs text-ink-muted w-10 shrink-0">{label}</span>
              <span className="font-mono text-xs text-ink-muted w-16 shrink-0 text-right">{Math.round(size)}px</span>
              <span
                style={{
                  fontFamily: i < 2 ? monoFont.family : i < 4 ? headingFont.family : bodyFont.family,
                  fontSize: `${size}px`,
                  fontWeight: weight,
                  letterSpacing: `${letterSpacing}em`,
                  lineHeight,
                }}
                className="truncate"
              >
                {sampleText}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pairing Preview */}
      <div className="rounded-xl border border-border-subtle bg-surface-1 p-6 space-y-3">
        <h2 className="font-display font-semibold text-xl">Pairing Preview</h2>
        <div className="space-y-2">
          <h3 style={{ fontFamily: headingFont.family, fontSize: `${Math.round(baseSize * scale.ratio * scale.ratio)}px`, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Heading in {headingFont.name}
          </h3>
          <p style={{ fontFamily: bodyFont.family, fontSize: `${baseSize}px`, fontWeight: weight, lineHeight, letterSpacing: `${letterSpacing}em` }} className="text-ink-secondary max-w-xl">
            {sampleText}. Body text in {bodyFont.name} at {baseSize}px. Good typography creates hierarchy through scale and weight contrast, not decoration.
          </p>
          <pre style={{ fontFamily: monoFont.family, fontSize: `${baseSize * 0.875}px` }} className="text-ink-muted bg-surface-0 rounded-lg px-4 py-3 overflow-x-auto">
{`// Code in ${monoFont.name}
const scale = ${scale.ratio};
const base = ${baseSize};`}
          </pre>
        </div>
      </div>
    </div>
  )
}
