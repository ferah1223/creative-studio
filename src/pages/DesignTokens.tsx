import { useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Plus, Trash2, Download } from 'lucide-react'

interface Token {
  id: string
  name: string
  value: string
  type: 'color' | 'dimension' | 'font' | 'number' | 'shadow'
}

const defaultTokens: Token[] = [
  { id: '1', name: 'color-primary', value: '#1a1714', type: 'color' },
  { id: '2', name: 'color-secondary', value: '#5c5549', type: 'color' },
  { id: '3', name: 'color-accent', value: '#7c3aed', type: 'color' },
  { id: '4', name: 'space-sm', value: '8px', type: 'dimension' },
  { id: '5', name: 'space-md', value: '16px', type: 'dimension' },
  { id: '6', name: 'space-lg', value: '24px', type: 'dimension' },
  { id: '7', name: 'radius-sm', value: '6px', type: 'dimension' },
  { id: '8', name: 'radius-md', value: '10px', type: 'dimension' },
  { id: '9', name: 'font-heading', value: 'Space Grotesk', type: 'font' },
  { id: '10', name: 'font-body', value: 'Inter', type: 'font' },
  { id: '11', name: 'shadow-sm', value: '0 1px 2px rgba(0,0,0,0.05)', type: 'shadow' },
  { id: '12', name: 'shadow-md', value: '0 4px 6px rgba(0,0,0,0.07)', type: 'shadow' },
]

type ExportFormat = 'css' | 'json' | 'scss' | 'tailwind'

const formatToken = (token: Token, format: ExportFormat): string => {
  switch (format) {
    case 'css': return `--${token.name}: ${token.value};`
    case 'json': return `"${token.name}": "${token.value}"`
    case 'scss': return `$${token.name}: ${token.value};`
    case 'tailwind': return `'${token.name}': '${token.value}',`
  }
}

const nl = String.fromCharCode(10)

export default function DesignTokens() {
  const [tokens, setTokens] = useState<Token[]>(defaultTokens)
  const [filter, setFilter] = useState<Token['type'] | 'all'>('all')
  const [format, setFormat] = useState<ExportFormat>('css')
  const [editingId, setEditingId] = useState<string | null>(null)

  const filtered = filter === 'all' ? tokens : tokens.filter(t => t.type === filter)
  const types: { value: Token['type'] | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'color', label: 'Colors' },
    { value: 'dimension', label: 'Dimensions' },
    { value: 'font', label: 'Fonts' },
    { value: 'shadow', label: 'Shadows' },
  ]

  const addToken = () => {
    const newToken: Token = { id: Date.now().toString(), name: 'new-token', value: '', type: 'color' }
    setTokens(prev => [...prev, newToken])
    setEditingId(newToken.id)
  }

  const removeToken = (id: string) => setTokens(prev => prev.filter(t => t.id !== id))
  const updateToken = (id: string, field: keyof Token, value: string) =>
    setTokens(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t))

  const buildExport = () => {
    const indent = '  '
    const body = filtered.map(t => indent + formatToken(t, format)).join(nl)
    if (format === 'css') return `:root {${nl}${body}${nl}}`
    if (format === 'json') return `{${nl}${body}${nl}}`
    if (format === 'scss') return `// Design Tokens${nl}${body}`
    return `module.exports = {${nl}  theme: {${nl}    extend: {${nl}${body.split(nl).map(l => '      ' + l.trim()).join(nl)}${nl}    }${nl}  }${nl}}`
  }

  const exportAll = () => {
    const blob = new Blob([buildExport()], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tokens.${format === 'json' ? 'json' : format === 'scss' ? 'scss' : format === 'tailwind' ? 'js' : 'css'}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const copyAll = () => navigator.clipboard.writeText(buildExport())

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl tracking-tight" style={{ color: 'var(--color-emerald)' }}>
          Design Tokens
        </h1>
        <p className="text-ink-secondary mt-1">Define tokens, export to CSS, SCSS, JSON, or Tailwind config.</p>
      </div>

      {/* Filters + Export */}
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <div className="flex gap-2">
          {types.map(t => (
            <button key={t.value} onClick={() => setFilter(t.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${
                filter === t.value ? 'bg-emerald text-white' : 'bg-surface-1 border border-border-subtle text-ink-secondary hover:border-emerald'
              }`}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <select value={format} onChange={e => setFormat(e.target.value as ExportFormat)}
            className="bg-surface-1 border border-border-subtle rounded-lg px-3 py-1.5 text-sm cursor-pointer appearance-none">
            <option value="css">CSS Variables</option>
            <option value="scss">SCSS</option>
            <option value="json">JSON (DTCG)</option>
            <option value="tailwind">Tailwind Config</option>
          </select>
          <button onClick={copyAll}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-1 border border-border-subtle hover:bg-surface-2 transition-colors cursor-pointer">
            <Copy className="w-3.5 h-3.5 text-ink-muted" />
          </button>
          <button onClick={exportAll}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-1 border border-border-subtle hover:bg-surface-2 transition-colors cursor-pointer">
            <Download className="w-3.5 h-3.5 text-ink-muted" />
          </button>
        </div>
      </div>

      {/* Token List */}
      <div className="rounded-xl border border-border-subtle bg-surface-1 overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_1fr_auto] md:grid-cols-[auto_1fr_1fr_1fr_auto] gap-x-3 gap-y-0 p-4">
          <div className="contents text-xs font-mono text-ink-muted uppercase tracking-wider">
            <div className="py-2" />
            <div className="py-2">Name</div>
            <div className="py-2">Value</div>
            <div className="py-2 hidden md:block">Type</div>
            <div className="py-2" />
          </div>

          {filtered.map((token, i) => (
            <motion.div key={token.id} className="contents group" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}>
              <div className="flex items-center py-2">
                {token.type === 'color' ? (
                  <div className="w-7 h-7 rounded-md border border-border" style={{ background: token.value }} />
                ) : (
                  <div className="w-7 h-7 rounded-md bg-surface-2 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-ink-muted">
                      {token.type === 'dimension' ? 'px' : token.type === 'font' ? 'Aa' : '#'}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center py-2">
                {editingId === token.id ? (
                  <input autoFocus value={token.name} onChange={e => updateToken(token.id, 'name', e.target.value)}
                    onBlur={() => setEditingId(null)} onKeyDown={e => e.key === 'Enter' && setEditingId(null)}
                    className="font-mono text-sm bg-surface-0 border border-border rounded px-2 py-1 w-full outline-none" />
                ) : (
                  <span className="font-mono text-sm text-ink-primary cursor-pointer hover:text-emerald transition-colors"
                    onClick={() => setEditingId(token.id)}>{token.name}</span>
                )}
              </div>
              <div className="flex items-center py-2">
                <input value={token.value} onChange={e => updateToken(token.id, 'value', e.target.value)}
                  className="font-mono text-sm text-ink-secondary bg-transparent border border-transparent hover:border-border focus:border-emerald rounded px-2 py-1 w-full outline-none transition-colors" />
              </div>
              <div className="hidden md:flex items-center py-2">
                <select value={token.type} onChange={e => updateToken(token.id, 'type', e.target.value)}
                  className="text-xs font-mono text-ink-muted bg-transparent border-none outline-none cursor-pointer">
                  <option value="color">color</option>
                  <option value="dimension">dimension</option>
                  <option value="font">font</option>
                  <option value="number">number</option>
                  <option value="shadow">shadow</option>
                </select>
              </div>
              <div className="flex items-center py-2">
                <button onClick={() => removeToken(token.id)}
                  className="w-7 h-7 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-coral/10 transition-all cursor-pointer">
                  <Trash2 className="w-3.5 h-3.5 text-coral" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="border-t border-border-subtle p-3">
          <button onClick={addToken} className="flex items-center gap-2 text-sm text-emerald hover:opacity-80 transition-opacity cursor-pointer">
            <Plus className="w-4 h-4" /> Add Token
          </button>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-xl border border-border-subtle bg-surface-1 overflow-hidden">
        <div className="p-4 border-b border-border-subtle">
          <span className="font-mono text-xs text-ink-muted">Export Preview &mdash; {format.toUpperCase()}</span>
        </div>
        <pre className="p-4 font-mono text-xs leading-relaxed text-ink-secondary overflow-x-auto max-h-64">
          {buildExport()}
        </pre>
      </div>
    </div>
  )
}
