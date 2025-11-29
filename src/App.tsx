import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Box } from '@chakra-ui/react'

function TestSphere() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#4a9eff" />
    </mesh>
  )
}

function App() {
  return (
    <Box className="dark" w="100vw" h="100vh" bg="black">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <TestSphere />
        <OrbitControls enablePan enableZoom enableRotate />
      </Canvas>
    </Box>
  )
}

export default App
