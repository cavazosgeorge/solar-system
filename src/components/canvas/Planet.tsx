import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import type { PlanetData } from '../../data/planets'

interface PlanetProps {
  data: PlanetData
  speedMultiplier: number
  onSelect: (planet: PlanetData) => void
}

export function Planet({ data, speedMultiplier, onSelect }: PlanetProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime() * speedMultiplier
      const speed = 1 / data.orbitalPeriod
      const angle = time * speed

      groupRef.current.position.x = Math.cos(angle) * data.distance
      groupRef.current.position.z = Math.sin(angle) * data.distance
    }

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(data)
        }}
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial color={data.color} />
      </mesh>
    </group>
  )
}
