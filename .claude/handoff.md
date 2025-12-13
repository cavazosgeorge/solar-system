# Solar System 3D Visualization

## What Was Done
- Initialized project with Bun + Vite + React + TypeScript
- Installed Three.js ecosystem (three@0.152.0, @react-three/fiber@8.15.19, @react-three/drei@9.88.17)
- Installed Chakra UI v3 for UI components
- Fixed R3F/React compatibility issues by pinning package versions
- Created full solar system visualization with:
  - Sun component with point light
  - 8 planets with orbital motion (Mercury through Neptune)
  - Orbit path rings (toggleable)
  - Starfield background
  - Control panel for speed adjustment and orbit visibility
  - Planet info cards on click
- Set up Docker deployment with Coolify on Hetzner VPS:
  - Created multi-stage Dockerfile (bun build → nginx:alpine serve)
  - Configured nginx.conf with SPA routing, health endpoint, asset caching
  - Deployed to https://www.solar-system.cavazos.app
- Fixed Docker healthcheck issue: changed `localhost` to `127.0.0.1` in healthcheck command (Alpine DNS resolution issue)
- **Session 6 (2025-12-13)**:
  - Implemented demo mode for read-only demo site
  - Created `useDemoMode` hook detecting `demo.` or `www.demo.` hostname prefix
  - Added demo banner to App.tsx (blue bar at top)
  - Updated ControlPanel to offset position when banner is visible
  - Updated index.html with proper title, favicon, and meta description
  - Created custom planet-with-rings favicon.svg
  - Demo mode live at https://www.demo.solar-system.cavazos.app

## Current State
Fully functional 3D solar system visualization with demo mode:
- `bun dev` runs successfully
- `bun run build` compiles without errors
- All 8 planets orbit the sun at accurate relative speeds
- Click any planet to see its info
- Controls panel allows speed adjustment (0.1x - 10x) and orbit toggle
- **Production**: https://www.solar-system.cavazos.app (auto-deploys on push to main)
- **Demo**: https://www.demo.solar-system.cavazos.app (read-only with banner)

## Project Structure
```
src/
├── components/
│   ├── canvas/
│   │   ├── Sun.tsx           # Central star with light
│   │   ├── Planet.tsx        # Orbiting planet with click handler
│   │   ├── OrbitPath.tsx     # Circular orbit visualization
│   │   ├── CameraController.tsx # Camera controls
│   │   └── SolarSystem.tsx   # Container for all bodies
│   └── controls/
│       ├── ControlPanel.tsx  # Speed/orbit controls (handles demo offset)
│       └── PlanetInfo.tsx    # Planet details card
├── data/
│   └── planets.ts            # Planet configuration data
├── hooks/
│   └── useDemoMode.ts        # Demo mode detection hook
├── App.tsx                   # Main app with Canvas and demo banner
├── main.tsx                  # Entry point with Chakra provider
└── index.css                 # Global dark theme styles
public/
└── favicon.svg               # Planet with rings icon
references/
└── demo-mode-implementation.md  # Demo mode documentation
```

## What's Next
Potential enhancements:
- Add planet textures for realism
- Implement camera focus animation when clicking planets
- Add Saturn's rings
- Add moons for Earth, Jupiter, Saturn
- Add asteroid belt
- Add pause/play functionality
- Add planet labels/tooltips

## Don't Break
- Package versions are pinned for compatibility - don't upgrade three/R3F without testing
- Three.js must stay at 0.152.0 for @react-three/drei@9.88.17 compatibility
- OrbitPath uses @react-three/drei's Line component (not native Three.js line)
- Docker healthcheck must use `127.0.0.1` not `localhost` (Alpine DNS issue)
- nginx.conf pid must be `/tmp/nginx.pid` not `/var/run/nginx.pid` (Alpine permissions)
- Demo mode detection checks both `demo.` AND `www.demo.` hostname prefixes

---
*Last updated: 2025-12-13*
