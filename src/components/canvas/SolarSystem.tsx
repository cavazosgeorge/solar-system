import { Sun } from './Sun'
import { Planet } from './Planet'
import { OrbitPath } from './OrbitPath'
import { planets, type PlanetData } from '../../data/planets'

interface SolarSystemProps {
  speedMultiplier: number
  showOrbits: boolean
  onSelectPlanet: (planet: PlanetData | null) => void
}

export function SolarSystem({ speedMultiplier, showOrbits, onSelectPlanet }: SolarSystemProps) {
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
          />
        </group>
      ))}
    </group>
  )
}
