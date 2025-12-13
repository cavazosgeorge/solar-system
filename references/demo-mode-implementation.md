# Demo Mode Implementation - Solar System

A lightweight demo mode implementation for client-side applications. Displays a banner indicating the site is a demo when accessed via the demo subdomain.

## Overview

Demo mode in solar-system is purely informational since this is a client-only visualization app with no backend or authentication. When enabled, it displays a banner at the top of the page.

## How It Works

### Detection Methods

Demo mode is detected via two methods (either triggers demo mode):

1. **Hostname Detection** - If the hostname starts with `demo.` (e.g., `demo.solar-system.cavazosgeorge.com`)
2. **Environment Variable** - If `VITE_DEMO_MODE=true` is set

## Implementation Files

### 1. Demo Mode Hook
**File:** `src/hooks/useDemoMode.ts`

```typescript
export function useDemoMode(): boolean {
  // Check environment variable (for local testing)
  if (import.meta.env.VITE_DEMO_MODE === 'true') {
    return true;
  }
  // Check hostname for demo subdomain
  if (typeof window !== 'undefined') {
    return window.location.hostname.startsWith('demo.');
  }
  return false;
}
```

### 2. Demo Banner
**File:** `src/App.tsx`

```tsx
import { useDemoMode } from './hooks/useDemoMode'

function App() {
  const isDemo = useDemoMode()

  return (
    <Box>
      {isDemo && (
        <Box
          bg="blue.600"
          py={2}
          px={4}
          textAlign="center"
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={1100}
        >
          <Text color="white" fontSize="sm" fontWeight="medium">
            Demo Mode - Viewing Only
          </Text>
        </Box>
      )}
      {/* ... rest of app */}
    </Box>
  )
}
```

### 3. UI Offset for Banner
**File:** `src/components/controls/ControlPanel.tsx`

Components that use absolute/fixed positioning near the top need to account for the banner height:

```typescript
interface ControlPanelProps {
  // ... other props
  isDemo?: boolean
}

export function ControlPanel({ isDemo = false, ...props }: ControlPanelProps) {
  return (
    <Box
      position="absolute"
      top={isDemo ? 14 : 4}  // Offset when banner is visible
      // ...
    >
      {/* ... */}
    </Box>
  )
}
```

## Files Modified

| File | Type | Description |
|------|------|-------------|
| `src/hooks/useDemoMode.ts` | NEW | Client-side detection hook |
| `src/App.tsx` | MODIFIED | Add demo banner |
| `src/components/controls/ControlPanel.tsx` | MODIFIED | Offset position when in demo mode |

## Coolify Deployment

### Step 1: Configure DNS

Add a record for the demo subdomain pointing to the same server:

| Type | Name | Target |
|------|------|--------|
| A | solar-system | [your-server-ip] |
| A | demo.solar-system | [your-server-ip] |

Or using CNAME:

| Type | Name | Target |
|------|------|--------|
| CNAME | demo.solar-system | solar-system.cavazosgeorge.com |

### Step 2: Add Domain in Coolify

1. Go to your application in Coolify dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter: `demo.solar-system.cavazosgeorge.com`
5. Save the configuration

### Step 3: SSL Certificate

Coolify should automatically provision an SSL certificate via Let's Encrypt.

### Step 4: Verify

After DNS propagation:

- `https://solar-system.cavazosgeorge.com` → Normal mode
- `https://demo.solar-system.cavazosgeorge.com` → Demo mode (with banner)

## Local Testing

```bash
# Test with environment variable
VITE_DEMO_MODE=true bun dev
```

## Comparison with Full-Stack Demo Mode

For applications with a backend (like brain-board), demo mode also includes:

- Server-side middleware to block write operations (POST, PUT, DELETE)
- Auth bypass for read-only access
- Hidden UI elements for write actions (upload, delete, edit buttons)
- 403 error handling in API client

Solar-system only needs the client-side banner since it has no backend or write operations.
