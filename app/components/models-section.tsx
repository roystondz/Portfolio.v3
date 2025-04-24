"use client"

import { Suspense, useState } from "react"
import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from "@react-three/drei"
import CpuModel from "./3d-models/cpu-model"
import CircuitBoardModel from "./3d-models/circuit-board-model"
import NetworkModel from "./3d-models/network-model"
import RobotModel from "./3d-models/robot-model"

interface ModelsSectionProps {
  theme: string
}

export default function ModelsSection({ theme }: ModelsSectionProps) {
  const [activeModel, setActiveModel] = useState("cpu")

  const models = [
    { id: "cpu", name: "CPU Architecture", component: CpuModel },
    { id: "circuit", name: "Circuit Design", component: CircuitBoardModel },
    { id: "network", name: "Network Systems", component: NetworkModel },
    { id: "robot", name: "Robotics", component: RobotModel },
  ]

  return (
    <section
      id="models"
      className={`py-20 ${
        theme === "dark" ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-gray-200 to-gray-100"
      } relative`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className={`text-3xl md:text-4xl font-bold mb-4 relative inline-block ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`absolute bottom-0 left-0 h-1 ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"}`}
            ></motion.span>
            <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>&lt;</span> 3D Models{" "}
            <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>/&gt;</span>
          </h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            Interactive 3D visualizations of computer engineering concepts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {models.map((model) => (
            <motion.button
              key={model.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onClick={() => setActiveModel(model.id)}
              className={`p-4 rounded-lg transition-all duration-300 ${
                activeModel === model.id
                  ? theme === "dark"
                    ? "bg-cyan-500/20 border-2 border-cyan-500"
                    : "bg-cyan-500/30 border-2 border-cyan-600"
                  : theme === "dark"
                    ? "bg-gray-800/50 border border-cyan-500/20 hover:border-cyan-500/50"
                    : "bg-white/80 border border-cyan-500/30 hover:border-cyan-500/60"
              }`}
            >
              <h3
                className={`text-lg font-bold ${
                  activeModel === model.id
                    ? theme === "dark"
                      ? "text-cyan-400"
                      : "text-cyan-700"
                    : theme === "dark"
                      ? "text-white"
                      : "text-gray-900"
                }`}
              >
                {model.name}
              </h3>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          key={activeModel}
          className={`w-full h-[500px] rounded-xl overflow-hidden ${
            theme === "dark" ? "bg-gray-800/30" : "bg-gray-200/50"
          } border ${theme === "dark" ? "border-cyan-500/20" : "border-cyan-500/30"}`}
        >
          <Canvas className="w-full h-full">
            <PerspectiveCamera makeDefault position={[0, 0, 5]} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <Suspense
              fallback={
                <Html center>
                  <div
                    className={`flex items-center justify-center ${
                      theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                    }`}
                  >
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-current"></div>
                    <span className="ml-2">Loading...</span>
                  </div>
                </Html>
              }
            >
              <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                {activeModel === "cpu" && <CpuModel position={[0, 0, 0]} scale={1.5} />}
                {activeModel === "circuit" && <CircuitBoardModel position={[0, 0, 0]} scale={1.5} />}
                {activeModel === "network" && <NetworkModel position={[0, 0, 0]} scale={1.5} />}
                {activeModel === "robot" && <RobotModel position={[0, 0, 0]} scale={1.5} />}
              </Float>
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enableZoom={true} enablePan={true} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className={`mt-8 p-6 rounded-lg ${
            theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
          }`}
        >
          <h3
            className={`text-xl font-bold mb-2 ${
              theme === "dark" ? "text-cyan-400" : "text-cyan-600"
            } flex items-center`}
          >
            <span className="mr-2">💡</span>
            <span>Interaction Guide</span>
          </h3>
          <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
            <span className="font-bold">Rotate:</span> Click and drag to rotate the model
            <br />
            <span className="font-bold">Zoom:</span> Use the scroll wheel to zoom in and out
            <br />
            <span className="font-bold">Pan:</span> Right-click and drag to pan the view
          </p>
        </motion.div>
      </div>
    </section>
  )
}
