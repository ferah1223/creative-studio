import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Copy, RefreshCw } from 'lucide-react'

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

function getHarmonies(hex: string) {
  const [h, s, l] = hexToHsl(hex)
  return [
    { name: 'Complementary', colors: [hex, hslToHex((h + 180) % 360, s, l)] },
    { name: 'Triadic', colors: [hex, hslToHex((h + 120) % 360, s, l), hslToHex((h + 240) % 360, s, l)] },
    { name: 'Analogous', colors: [hslToHex((h - 30 + 360) % 360, s, l), hex, hslToHex((h + 30) % 360, s, l)] },
    { name: 'Split-Comp', colors: [hex, hslToHex((h + 150) % 360, s, l), hslToHex((h + 210) % 360, s, l)] },
    { name: 'Monochromatic', colors: [hslToHex(h, s, Math.max(l - 20, 10)), hex, hslToHex(h, s, Math.min(l + 20, 90))] },
  ]
}

function randomHex() { return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0') }

export default function ColorLab() {
  const [baseColor, setBaseColor] = useState('#a78bfa')
  const [palette, setPalette] = useState(['#a78bfa', '#60a5fa', '#34d399', '#fbbf24', '#fb7185'])
  const harmonies = getHarmonies(baseColor)
  const [h, s, l] = hexToHsl(baseColor)

  const copyColor = useCallback((c: string) => navigator.clipboard.writeText(c), [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl tracking-tight text-violet">Color Lab</h1>
        <p className="text-ink-secondary mt-1">Explore palettes, generate harmonies, fine-tune with HSL.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Picker */}
        <div className="rounded-xl border border-border bg-surface-1 p-6 space-y-5">
          <div className="flex items-center gap-4">
            <input type="color" value={baseColor} onChange={e => setBaseColor(e.target.value)}
              className="w-20 h-20 rounded-xl cursor-pointer border-0 p-0 bg-transparent" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-semibold text-ink-primary">{baseColor.toUpperCase()}</span>
                <button onClick={() => copyColor(baseColor)} className="text-ink-muted hover:text-violet transition-colors cursor-pointer">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <span className="font-mono text-sm text-ink-muted">HSL({h}, {s}%, {l}%)</span>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: 'H', value: h, max: 360, hue: true },
              { label: 'S', value: s, max: 100 },
              { label: 'L', value: l, max: 100 },
            ].map(slider => (
              <div key={slider.label} className="flex items-center gap-3">
                <span className="font-mono text-xs text-ink-muted w-4">{slider.label}</span>
                <input type="range" min={0} max={slider.max} value={slider.value}
                  onChange={e => {
                    const nH = slider.label === 'H' ? +e.target.value : h
                    const nS = slider.label === 'S' ? +e.target.value : s
                    const nL = slider.label === 'L' ? +e.target.value : l
                    setBaseColor(hslToHex(nH, nS, nL))
                  }}
                  className="flex-1"
                  style={{
                    background: slider.hue
                      ? 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                      : slider.label === 'S'
                        ? `linear-gradient(to right, hsl(${h},0%,${l}%), hsl(${h},100%,${l}%))`
                        : `linear-gradient(to right, hsl(${h},${s}%,0%), hsl(${h},${s}%,50%), hsl(${h},${s}%,100%))`
                  }}
                />
                <span className="font-mono text-xs text-ink-muted w-8 text-right">{slider.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Random palette */}
        <div className="rounded-xl border border-border bg-surface-1 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-ink-primary">Quick Palette</h2>
            <button onClick={() => setPalette(Array.from({ length: 5 }, () => randomHex()))}
              className="flex items-center gap-1.5 text-sm text-violet hover:opacity-80 transition-opacity cursor-pointer">
              <RefreshCw className="w-3.5 h-3.5" /> Generate
            </button>
          </div>
          <div className="flex gap-2 h-28">
            {palette.map((c, i) => (
              <motion.div key={c + i} className="flex-1 rounded-xl cursor-pointer relative group"
                style={{ background: c }}
                whileHover={{ flex: 1.5 }}
                onClick={() => { setBaseColor(c); copyColor(c) }}>
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-white mix-blend-difference">{c}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Harmonies */}
      <div>
        <h2 className="font-display font-semibold text-xl mb-4 text-ink-primary">Color Harmonies</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {harmonies.map(h => (
            <div key={h.name} className="rounded-xl border border-border bg-surface-1 p-4 space-y-3">
              <span className="text-sm font-medium text-ink-muted">{h.name}</span>
              <div className="flex gap-2">
                {h.colors.map(c => (
                  <button key={c} className="flex-1 h-14 rounded-lg cursor-pointer transition-transform hover:scale-105"
                    style={{ background: c }}
                    onClick={() => { setBaseColor(c); copyColor(c) }} />
                ))}
              </div>
              <div className="flex gap-2">
                {h.colors.map(c => (
                  <span key={c} className="flex-1 text-center font-mono text-[10px] text-ink-muted">{c.toUpperCase()}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tints & Shades */}
      <div>
        <h2 className="font-display font-semibold text-xl mb-4 text-ink-primary">Tints & Shades</h2>
        <div className="flex gap-1 rounded-xl overflow-hidden h-14">
          {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(lVal => (
            <button key={lVal}
              className="flex-1 cursor-pointer transition-all hover:flex-[1.5] flex items-end justify-center pb-1"
              style={{ background: hslToHex(h, s, lVal) }}
              onClick={() => { setBaseColor(hslToHex(h, s, lVal)); copyColor(hslToHex(h, s, lVal)) }}>
              <span className="font-mono text-[9px] text-white mix-blend-difference">{lVal}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
