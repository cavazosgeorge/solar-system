import { Box, Text, HStack, VStack, Button } from '@chakra-ui/react'

interface ControlPanelProps {
  speedMultiplier: number
  onSpeedChange: (speed: number) => void
  showOrbits: boolean
  onToggleOrbits: () => void
  isDemo?: boolean
}

export function ControlPanel({
  speedMultiplier,
  onSpeedChange,
  showOrbits,
  onToggleOrbits,
  isDemo = false,
}: ControlPanelProps) {
  return (
    <Box
      position="absolute"
      top={isDemo ? 14 : 4}
      left={4}
      bg="rgba(0, 0, 0, 0.7)"
      p={4}
      borderRadius="md"
      border="1px solid"
      borderColor="whiteAlpha.300"
      minW="200px"
    >
      <VStack align="stretch" gap={4}>
        <Text color="white" fontWeight="bold" fontSize="lg">
          Controls
        </Text>

        <VStack align="stretch" gap={2}>
          <Text color="whiteAlpha.800" fontSize="sm">
            Speed: {speedMultiplier.toFixed(1)}x
          </Text>
          <HStack>
            <Button
              size="sm"
              onClick={() => onSpeedChange(Math.max(0.1, speedMultiplier - 0.5))}
              colorPalette="gray"
            >
              -
            </Button>
            <Button size="sm" onClick={() => onSpeedChange(1)} colorPalette="gray">
              Reset
            </Button>
            <Button
              size="sm"
              onClick={() => onSpeedChange(Math.min(10, speedMultiplier + 0.5))}
              colorPalette="gray"
            >
              +
            </Button>
          </HStack>
        </VStack>

        <Button
          size="sm"
          onClick={onToggleOrbits}
          colorPalette={showOrbits ? 'blue' : 'gray'}
        >
          {showOrbits ? 'Hide Orbits' : 'Show Orbits'}
        </Button>

        <Text color="whiteAlpha.600" fontSize="xs">
          Click a planet for info
        </Text>
      </VStack>
    </Box>
  )
}
