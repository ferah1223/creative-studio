import { useState, useRef, useEffect, useCallback } from 'react'
import { Play, RotateCcw } from 'lucide-react'

const presets: { name: string; frag: string }[] = [
  { name: 'Gradient Mesh', frag: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec3 col = 0.5 + 0.5 * cos(u_time + uv.xyx + vec3(0, 2, 4));
  gl_FragColor = vec4(col, 1.0);
}` },
  { name: 'Plasma', frag: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float v = sin(uv.x * 10.0 + u_time);
  v += sin(uv.y * 10.0 + u_time);
  v += sin((uv.x + uv.y) * 10.0 + u_time);
  v += sin(sqrt(uv.x * uv.x + uv.y * uv.y) * 10.0 + u_time);
  v /= 4.0;
  vec3 col = vec3(sin(v * 3.14), sin(v * 3.14 + 2.0), sin(v * 3.14 + 4.0));
  gl_FragColor = vec4(col * 0.5 + 0.5, 1.0);
}` },
  { name: 'Noise', frag: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
             mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float n = noise(uv * 8.0 + u_time * 0.5);
  gl_FragColor = vec4(vec3(n), 1.0);
}` },
  { name: 'Voronoi', frag: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 p = uv * 6.0;
  vec2 i = floor(p), f = fract(p);
  float d = 1.0;
  for(int y = -1; y <= 1; y++)
    for(int x = -1; x <= 1; x++) {
      vec2 g = vec2(float(x), float(y));
      vec2 o = hash2(i + g);
      o = 0.5 + 0.5 * sin(u_time + 6.28 * o);
      d = min(d, length(g + o - f));
    }
  gl_FragColor = vec4(vec3(d), 1.0);
}` },
]

const VERT = 'attribute vec2 a_position; void main() { gl_Position = vec4(a_position, 0, 1); }'

export default function ShaderPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [fragCode, setFragCode] = useState(presets[0].frag)
  const [preset, setPreset] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [running, setRunning] = useState(true)
  const rafRef = useRef<number>(0)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const startTimeRef = useRef(Date.now())

  const compileShader = useCallback((gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const msg = gl.getShaderInfoLog(shader) || 'Unknown error'; gl.deleteShader(shader); throw new Error(msg)
    }
    return shader
  }, [])

  const init = useCallback(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const gl = canvas.getContext('webgl'); if (!gl) { setError('WebGL not supported'); return }
    glRef.current = gl
    try {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERT)
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, fragCode)
      const program = gl.createProgram()!; gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Link error')
      programRef.current = program
      const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
      const loc = gl.getAttribLocation(program, 'a_position'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
      setError(null); startTimeRef.current = Date.now()
    } catch (e: any) { setError(e.message) }
  }, [fragCode, compileShader])

  useEffect(() => { init() }, [init])

  useEffect(() => {
    if (!running) { cancelAnimationFrame(rafRef.current); return }
    const render = () => {
      const gl = glRef.current, program = programRef.current, canvas = canvasRef.current
      if (!gl || !program || !canvas) return
      canvas.width = canvas.clientWidth * devicePixelRatio; canvas.height = canvas.clientHeight * devicePixelRatio
      gl.viewport(0, 0, canvas.width, canvas.height); gl.useProgram(program)
      gl.uniform1f(gl.getUniformLocation(program, 'u_time'), (Date.now() - startTimeRef.current) / 1000)
      gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)
    return () => cancelAnimationFrame(rafRef.current)
  }, [running])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display font-bold text-3xl tracking-tight text-cyan">Shader Playground</h1>
        <p className="text-ink-secondary mt-1">Live GLSL editor with real-time WebGL preview.</p>
      </div>
      <div className="flex gap-2 flex-wrap">
        {presets.map((p, i) => (
          <button key={p.name} onClick={() => { setPreset(i); setFragCode(presets[i].frag) }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${preset === i ? 'bg-cyan text-ink-inverse' : 'bg-surface-1 border border-border text-ink-secondary hover:border-cyan'}`}>
            {p.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-surface-1 overflow-hidden">
          <div className="p-3 border-b border-border flex items-center justify-between">
            <span className="font-mono text-xs text-ink-muted">Fragment Shader</span>
            <div className="flex gap-2">
              <button onClick={() => setRunning(r => !r)} className="w-7 h-7 rounded-md flex items-center justify-center bg-surface-2 hover:bg-surface-3 transition-colors cursor-pointer">
                <Play className="w-3.5 h-3.5" style={{ opacity: running ? 0.3 : 1 }} />
              </button>
              <button onClick={init} className="w-7 h-7 rounded-md flex items-center justify-center bg-surface-2 hover:bg-surface-3 transition-colors cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <textarea value={fragCode} onChange={e => setFragCode(e.target.value)} spellCheck={false}
            className="w-full h-80 p-4 font-mono text-xs leading-relaxed bg-transparent resize-none outline-none text-ink-primary" style={{ tabSize: 2 }} />
          {error && <div className="px-4 py-2 text-coral font-mono text-xs border-t border-coral/20 bg-coral/5">{error}</div>}
        </div>
        <div className="rounded-xl border border-border bg-surface-1 overflow-hidden">
          <div className="p-3 border-b border-border"><span className="font-mono text-xs text-ink-muted">Output</span></div>
          <canvas ref={canvasRef} className="w-full h-80" />
        </div>
      </div>
    </div>
  )
}
