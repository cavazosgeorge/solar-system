import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitPath } from './OrbitPath'
import { planets, type PlanetData } from '../../data/planets'

interface SolarSystemProps {
  speedMultiplier: number
  showOrbits: boolean
  selectedPlanet: PlanetData | null
  onSelectPlanet: (planet: PlanetData | null) => void
}

export function SolarSystem({
  speedMultiplier,
  showOrbits,
  selectedPlanet,
  onSelectPlanet,
}: SolarSystemProps) {
  return (
    <group>
      <Sun />
      {planets.map((planet) => (
        <group key={planet.name}>
          <OrbitPath distance={planet.distance} visible={showOrbits} />
          <Planet
            data={planet}
            speedMultiplier={speedMultiplier}
            onSelect={onSelectPlanet}
            isSelected={selectedPlanet?.name === planet.name}
          />
        </group>
      ))}
    </group>
  )
}
