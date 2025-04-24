// ProgrammerSection.tsx
import { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from "@react-three/drei";
import MyScene from "@/components/MyScene"; // Import the model component

interface ProgrammerSectionProps {
  theme: string;
}

export default function ProgrammerSection({ theme }: ProgrammerSectionProps) {
  return (
    <section
      id="programmer"
      className={`py-20 ${
        theme === "dark" ? "bg-gradient-to-b from-gray-900 to-black" : "bg-gradient-to-b from-gray-200 to-gray-100"
      } relative`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
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
            <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>&lt;</span> Programmer{" "}
            <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>/&gt;</span>
          </h2>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
            A day in the life of a computer engineer 
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`${
              theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
            } rounded-lg p-6 backdrop-blur-sm`}
          >
            <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
              What I Do
            </h3>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-4`}>
            As a student passionate about technology, I strive to merge creativity with logic to build innovative solutions. As a computer engineer, I work on software, creating systems that solve
              real-world problems.
            </p>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-4`}>
            My journey as a developer has been exciting, exploring various areas such as web development, mobile applications, and even 3D rendering. Every project I work on brings me one step closer to my goal of becoming a versatile full-stack developer, ready to tackle real-world challenges.
            </p>
            <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            I'm excited to keep learning and growing in this fast-evolving field, and I'm always eager to collaborate with like-minded individuals to create impactful applications.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              
              <div
                className={`p-4 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700/50 border border-cyan-500/20"
                    : "bg-gray-100 border border-cyan-500/30"
                }`}
              >
                <h4 className={`font-bold mb-2 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
                  Software Development
                </h4>
                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Full-stack web, mobile apps, firmware
                </p>
              </div>
              
              <div
                className={`p-4 rounded-lg ${
                  theme === "dark"
                    ? "bg-gray-700/50 border border-cyan-500/20"
                    : "bg-gray-100 border border-cyan-500/30"
                }`}
              >
                <h4 className={`font-bold mb-2 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
                  Problem Solving
                </h4>
                <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  Algorithms, optimization, debugging
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-[500px]"
          >
            <div
              className={`w-full h-full rounded-xl overflow-hidden ${
                theme === "dark" ? "bg-gray-800/30" : "bg-gray-200/50"
              } border ${theme === "dark" ? "border-cyan-500/20" : "border-cyan-500/30"}`}
            >
              <Canvas className="w-full h-full">
                <PerspectiveCamera makeDefault position={[0, 1, 4]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <Suspense
                  fallback={
                    <Html center>
                      <div
                        className={`flex items-center justify-center ${
                          theme === "dark" ? "text-cyan-500" : "text-cyan-600"
                        }`}
                      >
                        Loading Model...
                      </div>
                    </Html>
                  }
                >
                  <MyScene />
                </Suspense>
                <OrbitControls />
              </Canvas>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
