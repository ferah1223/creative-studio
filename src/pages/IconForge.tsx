import { useState } from 'react'
import { motion } from 'framer-motion'

const baseIcons: { name: string; paths: string[] }[] = [
  { name: 'Heart', paths: ['M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'] },
  { name: 'Star', paths: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'] },
  { name: 'Circle', paths: ['M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z'] },
  { name: 'Square', paths: ['M3 3h18v18H3z'] },
  { name: 'Triangle', paths: ['M12 2L2 22h20L12 2z'] },
  { name: 'Diamond', paths: ['M12 2L22 12L12 22L2 12Z'] },
  { name: 'Hexagon', paths: ['M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z'] },
  { name: 'Arrow', paths: ['M5 12h14', 'M12 5l7 7-7 7'] },
]

export default function IconForge() {
  const [selected, setSelected] = useState(0)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [size, setSize] = useState(48)
  const [color, setColor] = useState('#be123c')
  const [filled, setFilled] = useState(false)
  const [roundLinecap, setRoundLinecap] = useState(true)
  const [rotation, setRotation] = useState(0)

  const icon = baseIcons[selected]

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${filled ? color : 'none'}" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="${roundLinecap ? 'round' : 'butt'}" stroke-linejoin="${roundLinecap ? 'round' : 'miter'}" ${rotation ? `transform="rotate(${rotation} 12 12)"` : ''}>${icon.paths.map(p => `<path d="${p}"/>`).join('')}</svg>`

  const downloadSvg = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `${icon.name.toLowerCase()}.svg`; a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl tracking-tight" style={{ color: 'var(--color-coral)' }}>
          Icon Forge
        </h1>
        <p className="text-ink-secondary mt-1">Customize SVG icons. Adjust stroke, size, fills. Export.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Icon picker */}
        <div className="rounded-xl border border-border-subtle bg-surface-1 p-6 space-y-4">
          <h2 className="font-display font-semibold text-sm">Base Icon</h2>
          <div className="grid grid-cols-4 gap-2">
            {baseIcons.map((ic, i) => (
              <button
                key={ic.name}
                onClick={() => setSelected(i)}
                className={`aspect-square rounded-xl flex items-center justify-center cursor-pointer transition-all ${
                  selected === i ? 'bg-coral/10 ring-2 ring-coral' : 'bg-surface-0 hover:bg-surface-2'
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke={selected === i ? color : 'var(--color-ink-muted)'} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  {ic.paths.map((p, j) => <path key={j} d={p} />)}
                </svg>
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-mono text-ink-muted">Stroke: {strokeWidth}px</label>
              <input type="range" min={0.5} max={4} step={0.5} value={strokeWidth} onChange={e => setStrokeWidth(+e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-ink-muted">Size: {size}px</label>
              <input type="range" min={16} max={128} value={size} onChange={e => setSize(+e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-ink-muted">Rotation: {rotation}&deg;</label>
              <input type="range" min={0} max={360} value={rotation} onChange={e => setRotation(+e.target.value)}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-surface-3" />
            </div>
            <div className="flex gap-3 items-center">
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-0" />
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={filled} onChange={e => setFilled(e.target.checked)} className="cursor-pointer" />
                Fill
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" checked={roundLinecap} onChange={e => setRoundLinecap(e.target.checked)} className="cursor-pointer" />
                Round
              </label>
            </div>
          </div>

          <button onClick={downloadSvg}
            className="w-full px-4 py-2.5 rounded-lg bg-coral text-white font-medium text-sm hover:opacity-90 transition-opacity cursor-pointer">
            Export SVG
          </button>
        </div>

        {/* Preview */}
        <div className="lg:col-span-2 rounded-xl border border-border-subtle bg-surface-1 flex flex-col">
          <div className="p-4 border-b border-border-subtle flex items-center justify-between">
            <span className="font-mono text-xs text-ink-muted">Preview</span>
            <span className="font-mono text-xs text-ink-muted">{icon.name} &mdash; {size}x{size}</span>
          </div>
          <div className="flex-1 flex items-center justify-center p-12">
            <motion.div
              key={selected}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill={filled ? color : 'none'}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap={roundLinecap ? 'round' : 'butt'}
                strokeLinejoin={roundLinecap ? 'round' : 'miter'}
                style={{ width: size, height: size, transform: `rotate(${rotation}deg)` }}
              >
                {icon.paths.map((p, i) => <path key={i} d={p} />)}
              </svg>
            </motion.div>
          </div>

          {/* SVG Code */}
          <div className="border-t border-border-subtle p-4">
            <pre className="font-mono text-xs text-ink-muted overflow-x-auto whitespace-pre-wrap break-all">
              {svgContent}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
