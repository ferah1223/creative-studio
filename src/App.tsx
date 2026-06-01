import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ColorLab from './pages/ColorLab'
import TypographyStudio from './pages/TypographyStudio'
import PatternGenerator from './pages/PatternGenerator'
import IconForge from './pages/IconForge'
import ShaderPlayground from './pages/ShaderPlayground'
import DesignTokens from './pages/DesignTokens'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/color-lab" element={<ColorLab />} />
        <Route path="/typography" element={<TypographyStudio />} />
        <Route path="/patterns" element={<PatternGenerator />} />
        <Route path="/icons" element={<IconForge />} />
        <Route path="/shaders" element={<ShaderPlayground />} />
        <Route path="/tokens" element={<DesignTokens />} />
      </Route>
    </Routes>
  )
}
