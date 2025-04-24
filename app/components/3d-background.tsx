"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Stars, Cloud, Float, PerspectiveCamera } from "@react-three/drei"

function BackgroundScene({ theme }) {
  const gridRef = useRef()
  const particlesRef = useRef()

  // Create particles
  const particleCount = 200
  const particlePositions = useRef(new Float32Array(particleCount * 3))
  const particleSizes = useRef(new Float32Array(particleCount))

  useEffect(() => {
    // Initialize particle positions and sizes
    for (let i = 0; i < particleCount; i++) {
      particlePositions.current[i * 3] = (Math.random() - 0.5) * 30
      particlePositions.current[i * 3 + 1] = (Math.random() - 0.5) * 30
      particlePositions.current[i * 3 + 2] = (Math.random() - 0.5) * 30
      particleSizes.current[i] = Math.random() * 0.5 + 0.1
    }
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // Animate grid
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(time * 0.1) * 0.05
      gridRef.current.rotation.y = time * 0.05
    }

    // Animate particles
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        positions[i3 + 1] += Math.sin(time + i) * 0.01

        // Reset particles that go too far
        if (Math.abs(positions[i3 + 1]) > 15) {
          positions[i3] = (Math.random() - 0.5) * 30
          positions[i3 + 1] = (Math.random() - 0.5) * 30
          positions[i3 + 2] = (Math.random() - 0.5) * 30
        }
      }

      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  // Adjust camera to follow mouse
  function CameraController() {
    const { camera, mouse } = useThree()

    useFrame(() => {
      camera.position.x += (mouse.x * 2 - camera.position.x) * 0.02
      camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)
    })

    return null
  }

  return (
    <>
      <CameraController />
      <PerspectiveCamera makeDefault position={[0, 0, 15]} />

      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={0.5} />

      {/* Grid */}
      <group ref={gridRef}>
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`grid-x-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([-10, 0, i - 10, 10, 0, i - 10])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={theme === "dark" ? "#00AAFF" : "#0088CC"} transparent opacity={0.1} />
          </line>
        ))}

        {Array.from({ length: 20 }).map((_, i) => (
          <line key={`grid-z-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([i - 10, 0, -10, i - 10, 0, 10])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={theme === "dark" ? "#00AAFF" : "#0088CC"} transparent opacity={0.1} />
          </line>
        ))}
      </group>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={particlePositions.current}
            count={particleCount}
            itemSize={3}
          />
          <bufferAttribute attach="attributes-size" array={particleSizes.current} count={particleCount} itemSize={1} />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color={theme === "dark" ? "#00FFFF" : "#0099CC"}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Stars */}
      <Stars radius={50} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />

      {/* Clouds */}
      <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Cloud
          opacity={0.1}
          speed={0.4}
          width={20}
          depth={1.5}
          segments={20}
          position={[0, 5, -10]}
          color={theme === "dark" ? "#00AAFF" : "#0088CC"}
        />
      </Float>

      <Float speed={0.7} rotationIntensity={0.3} floatIntensity={0.7}>
        <Cloud
          opacity={0.1}
          speed={0.4}
          width={20}
          depth={1.5}
          segments={20}
          position={[0, -5, -10]}
          color={theme === "dark" ? "#00FFFF" : "#0099CC"}
        />
      </Float>
    </>
  )
}

export default function ThreeDBackground({ theme }) {
  return (
    <div className="fixed inset-0 z-0 opacity-70">
      <Canvas>
        <BackgroundScene theme={theme} />
      </Canvas>
    </div>
  )
}
