"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { Box, Sphere, Torus, Text } from "@react-three/drei"
import * as THREE from "three"

export default function FuturisticModel(props) {
  const groupRef = useRef(null)
  const torusRef = useRef(null)
  const sphereRef = useRef(null)

  // Animation for the model
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += 0.01
      torusRef.current.rotation.y += 0.005
    }

    if (sphereRef.current) {
      sphereRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef} {...props}>
      {/* Central Sphere */}
      <Sphere ref={sphereRef} args={[0.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00FFFF"
          emissive="#00AAFF"
          emissiveIntensity={0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>

      {/* Orbiting Torus */}
      <Torus ref={torusRef} args={[1.2, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial
          color="#00AAFF"
          emissive="#0088FF"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.7}
        />
      </Torus>

      {/* Floating Cubes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 1.8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <Box key={i} args={[0.15, 0.15, 0.15]} position={[x, 0, z]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <meshStandardMaterial
              color="#00FFFF"
              emissive="#00AAFF"
              emissiveIntensity={0.5}
              roughness={0.2}
              metalness={0.8}
            />
          </Box>
        )
      })}

      {/* Floating Text */}
      <Text
        position={[0, -1.2, 0]}
        fontSize={0.2}
        color="#00FFFF"
        font="/fonts/Geist_Regular.json"
        anchorX="center"
        anchorY="middle"
      >
        DEVELOPER
      </Text>

      {/* Connecting Lines */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 1.8
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <line key={`line-${i}`}>
            <bufferGeometry
              attach="geometry"
              onUpdate={(self) => {
                const positions = new Float32Array([0, 0, 0, x, 0, z])
                self.setAttribute("position", new THREE.BufferAttribute(positions, 3))
              }}
            />
            <lineBasicMaterial attach="material" color="#00AAFF" linewidth={1} />
          </line>
        )
      })}
    </group>
  )
}
