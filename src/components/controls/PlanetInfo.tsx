import { Box, Text, VStack, Button, HStack } from '@chakra-ui/react'
import type { PlanetData } from '../../data/planets'

interface PlanetInfoProps {
  planet: PlanetData
  isLocked: boolean
  onClose: () => void
}

export function PlanetInfo({ planet, isLocked, onClose }: PlanetInfoProps) {
  return (
    <Box
      position="absolute"
      bottom={4}
      left="50%"
      transform="translateX(-50%)"
      bg="rgba(0, 0, 0, 0.85)"
      p={5}
      borderRadius="lg"
      border="1px solid"
      borderColor={isLocked ? planet.color : 'whiteAlpha.300'}
      boxShadow={isLocked ? `0 0 20px ${planet.color}40` : 'none'}
      maxW="400px"
      w="90%"
    >
      <VStack align="stretch" gap={3}>
        <HStack justify="space-between">
          <HStack gap={3}>
            <Box
              w={4}
              h={4}
              borderRadius="full"
              bg={planet.color}
              boxShadow={`0 0 10px ${planet.color}`}
            />
            <Text color="white" fontWeight="bold" fontSize="xl">
              {planet.name}
            </Text>
            {isLocked && (
              <Text color={planet.color} fontSize="xs" fontWeight="medium">
                TRACKING
              </Text>
            )}
          </HStack>
          <Button size="sm" variant="ghost" onClick={onClose} color="white">
            ✕
          </Button>
        </HStack>

        <Text color="whiteAlpha.900">{planet.description}</Text>

        <HStack gap={6} pt={2}>
          <VStack gap={0} align="start">
            <Text color="whiteAlpha.600" fontSize="xs">
              Orbital Period
            </Text>
            <Text color="white" fontSize="sm">
              {planet.orbitalPeriod} Earth years
            </Text>
          </VStack>
          <VStack gap={0} align="start">
            <Text color="whiteAlpha.600" fontSize="xs">
              Distance from Sun
            </Text>
            <Text color="white" fontSize="sm">
              {planet.distance} AU (scaled)
            </Text>
          </VStack>
        </HStack>

        {isLocked && (
          <Button
            size="sm"
            onClick={onClose}
            colorPalette="gray"
            mt={2}
          >
            Unlock Camera
          </Button>
        )}
      </VStack>
    </Box>
  )
}
