import { useMemo } from 'react'
import { Line } from '@react-three/drei'

interface OrbitPathProps {
  distance: number
  visible: boolean
}

export function OrbitPath({ distance, visible }: OrbitPathProps) {
  const points = useMemo(() => {
    const segments = 128
    const pts: [number, number, number][] = []
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      pts.push([Math.cos(angle) * distance, 0, Math.sin(angle) * distance])
    }
    return pts
  }, [distance])

  if (!visible) return null

  return (
    <Line
      points={points}
      color="#ffffff"
      opacity={0.2}
      transparent
      lineWidth={1}
    />
  )
}
