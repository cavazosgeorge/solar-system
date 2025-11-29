export interface PlanetData {
  name: string
  radius: number
  distance: number
  orbitalPeriod: number
  color: string
  description: string
}

export const planets: PlanetData[] = [
  {
    name: 'Mercury',
    radius: 0.15,
    distance: 4,
    orbitalPeriod: 0.24,
    color: '#8c7853',
    description: 'The smallest planet and closest to the Sun.',
  },
  {
    name: 'Venus',
    radius: 0.3,
    distance: 6,
    orbitalPeriod: 0.62,
    color: '#e6c87a',
    description: 'The hottest planet with a thick toxic atmosphere.',
  },
  {
    name: 'Earth',
    radius: 0.32,
    distance: 8,
    orbitalPeriod: 1,
    color: '#6b93d6',
    description: 'Our home planet, the only known world with life.',
  },
  {
    name: 'Mars',
    radius: 0.2,
    distance: 10,
    orbitalPeriod: 1.88,
    color: '#c1440e',
    description: 'The Red Planet, home to the largest volcano in the solar system.',
  },
  {
    name: 'Jupiter',
    radius: 0.9,
    distance: 14,
    orbitalPeriod: 11.86,
    color: '#d8ca9d',
    description: 'The largest planet, a gas giant with a Great Red Spot.',
  },
  {
    name: 'Saturn',
    radius: 0.75,
    distance: 18,
    orbitalPeriod: 29.46,
    color: '#f4d59e',
    description: 'Famous for its stunning ring system.',
  },
  {
    name: 'Uranus',
    radius: 0.5,
    distance: 22,
    orbitalPeriod: 84.01,
    color: '#b5e3e3',
    description: 'An ice giant that rotates on its side.',
  },
  {
    name: 'Neptune',
    radius: 0.48,
    distance: 26,
    orbitalPeriod: 164.8,
    color: '#5b7fde',
    description: 'The windiest planet with supersonic storms.',
  },
]
