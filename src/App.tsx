import { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { Box } from '@chakra-ui/react'
import { SolarSystem } from './components/canvas/SolarSystem'
import { CameraController } from './components/canvas/CameraController'
import { ControlPanel } from './components/controls/ControlPanel'
import { PlanetInfo } from './components/controls/PlanetInfo'
import type { PlanetData } from './data/planets'

function App() {
  const [speedMultiplier, setSpeedMultiplier] = useState(1)
  const [showOrbits, setShowOrbits] = useState(true)
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)
  const [isLocked, setIsLocked] = useState(false)

  const handleSelectPlanet = useCallback((planet: PlanetData | null) => {
    setSelectedPlanet(planet)
    if (planet) {
      setIsLocked(true)
    }
  }, [])

  const handleUnlock = useCallback(() => {
    setIsLocked(false)
    setSelectedPlanet(null)
  }, [])

  return (
    <Box className="dark" w="100vw" h="100vh" bg="black" position="relative">
      <Canvas camera={{ position: [0, 30, 50], fov: 60 }}>
        <ambientLight intensity={0.1} />
        <Stars radius={300} depth={60} count={5000} factor={7} fade speed={1} />
        <SolarSystem
          speedMultiplier={speedMultiplier}
          showOrbits={showOrbits}
          selectedPlanet={selectedPlanet}
          onSelectPlanet={handleSelectPlanet}
        />
        <CameraController
          selectedPlanet={selectedPlanet}
          speedMultiplier={speedMultiplier}
          isLocked={isLocked}
        />
      </Canvas>
      <ControlPanel
        speedMultiplier={speedMultiplier}
        onSpeedChange={setSpeedMultiplier}
        showOrbits={showOrbits}
        onToggleOrbits={() => setShowOrbits((prev) => !prev)}
      />
      {selectedPlanet && (
        <PlanetInfo
          planet={selectedPlanet}
          isLocked={isLocked}
          onClose={handleUnlock}
        />
      )}
    </Box>
  )
}

export default App
