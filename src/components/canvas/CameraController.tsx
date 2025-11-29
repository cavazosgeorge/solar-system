import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import type { PlanetData } from '../../data/planets'

interface CameraControllerProps {
  selectedPlanet: PlanetData | null
  speedMultiplier: number
  isLocked: boolean
}

export function CameraController({ selectedPlanet, speedMultiplier, isLocked }: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsType>(null)
  const { camera, clock } = useThree()
  const smoothTargetRef = useRef(new THREE.Vector3())
  const smoothCameraRef = useRef(new THREE.Vector3())
  const initialLockRef = useRef(true)

  useEffect(() => {
    if (!isLocked && controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0)
      initialLockRef.current = true
    }
  }, [isLocked])

  useFrame(() => {
    if (!controlsRef.current) return

    if (isLocked && selectedPlanet) {
      const time = clock.getElapsedTime() * speedMultiplier
      const speed = 1 / selectedPlanet.orbitalPeriod
      const angle = time * speed

      const planetX = Math.cos(angle) * selectedPlanet.distance
      const planetZ = Math.sin(angle) * selectedPlanet.distance
      const planetPosition = new THREE.Vector3(planetX, 0, planetZ)

      if (initialLockRef.current) {
        smoothTargetRef.current.copy(planetPosition)
        const offset = selectedPlanet.radius * 6
        smoothCameraRef.current.set(
          planetX + offset,
          offset * 0.5,
          planetZ + offset
        )
        initialLockRef.current = false
      }

      smoothTargetRef.current.lerp(planetPosition, 0.08)
      controlsRef.current.target.copy(smoothTargetRef.current)

      const offset = selectedPlanet.radius * 6
      const desiredCameraPos = new THREE.Vector3(
        planetX + offset,
        offset * 0.5,
        planetZ + offset
      )
      smoothCameraRef.current.lerp(desiredCameraPos, 0.05)
      camera.position.copy(smoothCameraRef.current)
    }

    controlsRef.current.update()
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={!isLocked}
      enableZoom
      enableRotate={!isLocked}
      minDistance={isLocked && selectedPlanet ? selectedPlanet.radius * 2 : 5}
      maxDistance={isLocked && selectedPlanet ? selectedPlanet.radius * 20 : 100}
    />
  )
}
