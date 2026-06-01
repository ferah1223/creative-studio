<div align="center">

# Creative Studio

**Six precision tools for designers — color, type, pattern, icons, shaders, and tokens.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-green)](#license)

</div>

---

## Overview

Creative Studio is a browser-based design toolkit built for speed and precision. Each tool is fully functional, runs entirely client-side, and exports production-ready assets.

No accounts. No cloud. No subscriptions. Just tools that work.

## Tools

| Tool | What it does | Export |
|------|-------------|--------|
| **Color Lab** | HSL picker, 5 harmony modes, tints/shades, random palette generator | Hex / HSL values |
| **Typography Studio** | Font pairing, 6 modular scales, weight/tracking/line-height controls | CSS / preview |
| **Pattern Generator** | 6 procedural SVG patterns with live tiled preview | SVG |
| **Icon Forge** | 8 base icons, stroke/fill/rotation/rounding controls | SVG |
| **Shader Playground** | Live GLSL editor with WebGL canvas, 4 presets | GLSL source |
| **Design Tokens** | Token manager with type filtering and inline editing | CSS / SCSS / JSON / Tailwind |

## Design System

Built on a 2026-standard design system:

- **Fluid typography** — `clamp()`-based, auto-scales across all viewports without breakpoint jumps
- **Fluid spacing** — same principle applied to padding, margins, and gaps
- **OKLCH-aware palette** — warm stone base with per-tool accent colors
- **Reduced motion** — respects `prefers-reduced-motion` out of the box
- **Noise texture** — subtle SVG grain overlay for depth
- **Accessible** — semantic HTML, keyboard navigation, focus-visible states

### Typography Stack

| Role | Font | Source |
|------|------|--------|
| Display | Space Grotesk | Google Fonts |
| Body | Inter | Google Fonts |
| Mono | JetBrains Mono | Google Fonts |

### Tool Accent Colors

Each tool has its own color identity:

| Tool | Color | Hex |
|------|-------|-----|
| Color Lab | Violet | `#7c3aed` |
| Typography Studio | Navy | `#1e40af` |
| Pattern Generator | Amber | `#b45309` |
| Icon Forge | Coral | `#be123c` |
| Shader Playground | Cyan | `#0891b2` |
| Design Tokens | Emerald | `#047857` |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Language | TypeScript 6 |
| Build | Vite 8 |
| Styling | Tailwind CSS 4 (PostCSS plugin) |
| Animation | Framer Motion 12 |
| Routing | React Router 7 |
| Icons | Lucide React |

## Getting Started

```bash
# Clone
git clone https://github.com/ferah1223/creative-studio.git
cd creative-studio

# Install
npm install

# Dev server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Route shell with AnimatePresence transitions
│   └── Sidebar.tsx         # Collapsible sidebar (desktop) + bottom nav (mobile)
├── pages/
│   ├── Home.tsx            # Canvas-style landing with animated tool previews
│   ├── ColorLab.tsx        # HSL picker, harmonies, tints/shades
│   ├── TypographyStudio.tsx # Font pairing, type scale, controls
│   ├── PatternGenerator.tsx # SVG pattern generator with live preview
│   ├── IconForge.tsx       # SVG icon customizer
│   ├── ShaderPlayground.tsx # GLSL editor with WebGL renderer
│   └── DesignTokens.tsx    # Token manager with multi-format export
├── index.css               # Design system: fluid scale, tokens, noise overlay
├── main.tsx                # Entry point with BrowserRouter
└── App.tsx                 # Route definitions
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | TypeScript check + production build |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |

## Browser Support

- Chrome / Edge 120+
- Firefox 121+
- Safari 17+

Requires WebGL for Shader Playground. All other tools work without it.

## License

MIT
