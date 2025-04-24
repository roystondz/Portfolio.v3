"use client"

import { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function MyModel(props: any) {
  const modelRef = useRef(null)
  const { scene } = useGLTF("/models/scene.gltf") // This path is relative to /public

  return <primitive object={scene} ref={modelRef} scale={1.0} {...props} />
}

// Required by useGLTF hook for loading the model only once
useGLTF.preload("/models/scene.gltf")
