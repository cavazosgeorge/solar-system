import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { PlanetData } from '../../data/planets'

interface PlanetProps {
  data: PlanetData
  speedMultiplier: number
  onSelect: (planet: PlanetData) => void
  isSelected: boolean
}

export function Planet({ data, speedMultiplier, onSelect, isSelected }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)

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
        <meshStandardMaterial
          color={data.color}
          emissive={isSelected ? data.color : '#000000'}
          emissiveIntensity={isSelected ? 0.3 : 0}
        />
      </mesh>
    </group>
  )
}
