# SmartShip Pro - GitHub Copilot Instructions

**Project**: SmartShip Pro v1.0.7 | **Stack**: Electron + Vite + React + TypeScript  
**Domain**: Professional Maritime Navigation & Vessel Management  
**Author**: MiguelonJaen

---

## Quick Context

You are assisting development of a **professional maritime navigation desktop application**. This project combines:
- **Frontend**: React 19 + TypeScript with Tailwind CSS & Leaflet maps
- **Desktop**: Electron 34.5.8 for Windows/macOS distribution  
- **AI**: Google Gemini integration for tactical advice (Nucleus AI protocol)
- **Domain**: Professional sailing/motoring vessels with NMEA/GPS instruments
- **Backend**: Firebase (auth/data) + Supabase (sync)

---

## 1. Architecture & Stack

### Core Technologies
| Layer | Technology | Version |
|-------|-----------|---------|
| **Runtime** | Electron | 34.5.8 |
| **Build** | Vite | 6.2.0 |
| **Framework** | React | 19.0.0 |
| **Language** | TypeScript | 5.8.2 |
| **Styling** | Tailwind CSS | 4.1.14 |
| **Maps** | Leaflet / react-leaflet | 5.0.0 |
| **Hardware** | SerialPort | 13.0.0 |
| **AI** | Google Gemini | 1.5 Flash |

### Directory Layout
```
src/
├── App.tsx                          # Main component & state hub
├── components/                      # React components
│   ├── TacticalHUD.tsx             # Tactical display
│   ├── NavigationDashboard.tsx     # Navigation metrics
│   ├── ControlCenter.tsx           # Command interface
│   ├── WatchdogPanel.tsx           # System monitoring
│   ├── TacticalAdvisorPanel.tsx    # AI recommendations
│   ├── Logbook.tsx                 # Navigation logs
│   └── [10+ specialized components]
├── lib/
│   ├── utils.ts                    # Nautical calculations
│   ├── gemini.ts                   # AI integration
│   ├── tools.ts                    # Navigation tools
│   └── [utilities & helpers]
├── types.ts                        # Marine domain types
├── constants.ts                    # App constants & thresholds
├── i18n.ts                         # Spanish/English translations
└── index.css                       # Global styles
```

---

## 2. React & TypeScript Conventions

### Component Standards
- Functional components only (never class components)
- Explicit return types
- Props interface for each component
- Memoize with useMemo for expensive calculations
- Use useCallback for event handlers passed to children
- Wrap in ErrorBoundary for error resilience

### Type Safety
```typescript
import type { ShipData, VesselStatus } from './types';

interface TacticalHUDProps {
  shipData: ShipData;
  weather: ProcessedWeather;
  onNavigate?: (bearing: number) => Promise<void>;
}

export function TacticalHUD({ 
  shipData, 
  weather, 
  onNavigate 
}: TacticalHUDProps): JSX.Element {
  const distance = useMemo(() => 
    calculateDistanceNM(shipData.lat!, shipData.lng!, destLat, destLng),
    [shipData.lat, shipData.lng, destLat, destLng]
  );
  return <div>...</div>;
}
```

---

## 3. Maritime Domain Expertise

### Nautical Terminology
- **Rumbo (Bearing)**: Compass heading 0-359°
- **Derrota Real (COG)**: Actual travel direction 0-359°
- **Velocidad Real (SOG)**: Speed in knots
- **Viento Aparente (Apparent Wind)**: Wind relative to vessel
- **Punto de Ruta (Waypoint)**: Navigation target [lat, lng]
- **ETA**: Estimated Time of Arrival (ISO 8601)
- **Distancia (Distance)**: In nautical miles (NM) only

### NMEA 0183 Common Sentences
```
$GPGGA - GPS Fix Data
$GPRMC - Recommended Minimum
$GPWIND - Wind Speed & Direction
$GPDBK - Depth Below Keel
$GPVTG - Track & Ground Speed
```

### Key Calculations in src/lib/utils.ts
```typescript
calculateDistanceNM(lat1, lng1, lat2, lng2): number
calculateBearing(lat1, lng1, lat2, lng2): number
calculateETA(distanceNM, speedKnots): string
```

---

## 4. Key Data Types (src/types.ts)

```typescript
interface ShipData {
  id: string;
  nombre: string;
  lat?: number; lng?: number;
  cog?: number;              // Course Over Ground (0-359°)
  sog?: number;              // Speed Over Ground (knots)
  fuel_level?: number;
  mmsi?: string;
}

interface VesselStatus {
  barco_id: string;
  fuel_level: number;
  water_level: number;
  engine_hours?: number;
  battery_voltage: number;
  is_navigating: boolean;
}

interface LogEntry {
  barco_id: string;
  fecha: string;
  lat?: number; lng?: number;
  rumbo?: number;
  viento_nudos?: number;
  velocidad_gps?: number;
  estado_del_mar?: string;
}

type AlarmSeverity = 'normal' | 'warning' | 'critical';
```

---

## 5. Development Commands

```bash
npm run dev              # Vite dev server (localhost:3000)
npm run electron:start  # Launch Electron app
npm run lint            # TypeScript check
npm run build           # Production build
```

---

## 6. Common Tasks

### Add Nautical Calculation
1. Define in src/lib/utils.ts
2. Add JSDoc comments
3. Use useMemo in components

### Create New Component
1. Create in src/components/
2. Define Props interface
3. Use Tailwind + motion
4. Export and import in App.tsx

### Handle NMEA Data
1. Parse NMEA sentence
2. Update ShipData state
3. Trigger alarms if needed
4. Log to database

---

## 7. Key Components

| Component | Purpose |
|-----------|---------|
| TacticalHUD | Real-time vessel display |
| NavigationDashboard | Navigation metrics |
| ControlCenter | Command interface |
| WatchdogPanel | System monitoring |
| TacticalAdvisorPanel | AI recommendations |

---

## 8. Security & Best Practices

- Never commit .env.local with secrets
- Use environment variables for API keys
- Validate all NMEA input
- Implement error boundaries
- Log errors with context

---

## 9. Nucleus AI Protocol

Refer to AGENTS.md for:
- Nucleus AI operational protocol
- Tactical decision framework
- JSON telemetry schema
- Emergency procedures

---

**Last Updated**: 2026-05-23 | **Maintainer**: MiguelonJaen



<!-- github-copilot-toolbox:mcp-skills-awareness-begin -->

### MCP & Skills awareness (GitHub Copilot Toolbox)

_Last synced: 2026-05-23T06:08:54.067Z._

- **Full report:** `.github/copilot-toolbox-mcp-skills-awareness.md` in this workspace (auto-overwritten on each scan). Use it as ground truth for configured servers and skill folders.
- **MCP:** For **live tools**, use **Copilot Chat → Agent** and **trust/start** the right servers in the MCP UI.
- **When the user’s task matches a server** (e.g. “open this Confluence page” and a **Confluence** / **Atlassian** MCP is listed), **prefer that server id** and plan on Agent + MCP for actions—not only file search.
- **Skills:** Folders below contain `SKILL.md`; attach or cite paths in chat when relevant.

#### Workspace MCP

- `c:\Smartship\.vscode\mcp.json` _(workspace: Smartship)_ — _file missing_

_No active workspace servers in mcp.json._

#### User MCP

- `C:\Users\CASA\AppData\Roaming\Code\User\mcp.json` — _file missing_

_No active user-scoped servers in mcp.json._

#### Project skills

_None found (or no workspace open)._

#### User skills

_None found._

<!-- github-copilot-toolbox:mcp-skills-awareness-end -->
