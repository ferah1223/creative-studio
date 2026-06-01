import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

type PatternType = 'dots' | 'lines' | 'grid' | 'zigzag' | 'diamonds' | 'circles'

const patternTypes: { id: PatternType; label: string }[] = [
  { id: 'dots', label: 'Dots' },
  { id: 'lines', label: 'Lines' },
  { id: 'grid', label: 'Grid' },
  { id: 'zigzag', label: 'Zigzag' },
  { id: 'diamonds', label: 'Diamonds' },
  { id: 'circles', label: 'Circles' },
]

function generatePattern(type: PatternType, size: number, color: string, bg: string, density: number): string {
  const s = size
  const d = density

  switch (type) {
    case 'dots':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><circle cx="${s/2}" cy="${s/2}" r="${s/(d*2)}" fill="${color}"/></svg>`
    case 'lines':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><line x1="0" y1="0" x2="${s}" y2="${s}" stroke="${color}" stroke-width="${s/(d*3)}"/></svg>`
    case 'grid':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><rect x="1" y="1" width="${s-2}" height="${s-2}" fill="none" stroke="${color}" stroke-width="${s/(d*5)}"/></svg>`
    case 'zigzag':
      const step = s / d
      let path = `M0 ${s/2}`
      for (let i = 0; i < d; i++) path += ` L${step*i + step/2} ${s/4} L${step*(i+1)} ${s/2}`
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><path d="${path}" fill="none" stroke="${color}" stroke-width="${s/(d*4)}"/></svg>`
    case 'diamonds':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><polygon points="${s/2},${s/(d+1)} ${s-s/(d+1)},${s/2} ${s/2},${s-s/(d+1)} ${s/(d+1)},${s/2}" fill="none" stroke="${color}" stroke-width="${s/(d*4)}"/></svg>`
    case 'circles':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="${bg}"/><circle cx="${s/2}" cy="${s/2}" r="${s/2 - s/(d*2)}" fill="none" stroke="${color}" stroke-width="${s/(d*4)}"/></svg>`
  }
}

export default function PatternGenerator() {
  const [pattern, setPattern] = useState<PatternType>('dots')
  const [size, setSize] = useState(60)
  const [color, setColor] = useState('#b45309')
  const [bg, setBg] = useState('#fef3c7')
  const [density, setDensity] = useState(4)

  const svgContent = useMemo(
    () => generatePattern(pattern, size, color, bg, density),
    [pattern, size, color, bg, density]
  )

  const bgUrl = `url("data:image/svg+xml,${encodeURIComponent(svgContent)}")`

  const downloadSvg = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `pattern-${pattern}.svg`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl tracking-tight" style={{ color: 'var(--color-amber)' }}>
          Pattern Generator
        </h1>
        <p className="text-ink-secondary mt-1">Procedural SVG patterns. Tweak, preview, export.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="rounded-xl border border-border-subtle bg-surface-1 p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-mono text-ink-muted uppercase tracking-wider">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {patternTypes.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPattern(p.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    pattern === p.id
                      ? 'bg-amber text-white'
                      : 'bg-surface-0 border border-border hover:border-amber text-ink-secondary'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-ink-muted">Tile Size: {size}px</label>
            <input type="range" min={20} max={200} value={size} onChange={e => setSize(+e.target.value)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3" />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-mono text-ink-muted">Density: {density}</label>
            <input type="range" min={2} max={10} value={density} onChange={e => setDensity(+e.target.value)}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3" />
          </div>

          <div className="flex gap-3">
            <div className="space-y-1 flex-1">
              <label className="text-xs font-mono text-ink-muted">Pattern</label>
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border-0" />
            </div>
            <div className="space-y-1 flex-1">
              <label className="text-xs font-mono text-ink-muted">Background</label>
              <input type="color" value={bg} onChange={e => setBg(e.target.value)}
                className="w-full h-10 rounded-lg cursor-pointer border-0" />
            </div>
          </div>

          <button onClick={downloadSvg}
            className="w-full px-4 py-2.5 rounded-lg bg-amber text-white font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer">
            Export SVG
          </button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 rounded-xl border border-border-subtle bg-surface-1 overflow-hidden">
          <div className="p-4 border-b border-border-subtle flex items-center justify-between">
            <span className="font-mono text-xs text-ink-muted">Preview &mdash; tiled pattern</span>
            <span className="font-mono text-xs text-ink-muted">{size}x{size}px tile</span>
          </div>
          <motion.div
            className="h-96 lg:h-[480px]"
            style={{ backgroundImage: bgUrl, backgroundRepeat: 'repeat' }}
            animate={{ backgroundPosition: ['0px 0px', `${size}px ${size}px`] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </div>
    </div>
  )
}
