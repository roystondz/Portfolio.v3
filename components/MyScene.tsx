// MyScene.tsx
import { useGLTF } from "@react-three/drei";

const MyScene = () => {
  // Load the GLTF model using the useGLTF hook
  const { scene } = useGLTF("/models/scene.gltf"); // Adjust the path if needed

  return (
    <primitive object={scene} scale={1.0} position={[0, 0, 0]} />
  );
};

export default MyScene;
