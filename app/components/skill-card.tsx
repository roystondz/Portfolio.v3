"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import type { ReactNode } from "react"

interface SkillCardProps {
  name: string
  icon: ReactNode
  description: string
  level: number
  index: number
  theme: string
}

export default function SkillCard({ name, icon, description, level, index, theme }: SkillCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 200, 255, 0.1)" }}
      className={`${
        theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
      } rounded-lg p-6 hover:${
        theme === "dark" ? "border-cyan-500/50" : "border-cyan-500/60"
      } transition-all duration-300 relative overflow-hidden group`}
    >
      <motion.div
        initial={{ x: "-100%" }}
        whileHover={{ x: "0%" }}
        transition={{ duration: 0.3 }}
        className={`absolute inset-0 bg-gradient-to-r ${
          theme === "dark" ? "from-cyan-500/5" : "from-cyan-500/10"
        } to-transparent opacity-0 group-hover:opacity-100`}
      ></motion.div>

      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ duration: 0.2 }}
        className={`mb-4 ${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}
      >
        {icon}
      </motion.div>

      <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{name}</h3>
      <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-4`}>{description}</p>

      {/* Skill progress bar */}
      <div className="mt-4">
        <div className="flex justify-between mb-1">
          <span className={`text-xs font-medium ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Proficiency
          </span>
          <span className={`text-xs font-medium ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
            {level}%
          </span>
        </div>
        <div className={`w-full h-2 ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-full overflow-hidden`}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: isInView ? `${level}%` : 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className={`h-full ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"} rounded-full`}
          />
        </div>
      </div>

      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "30%" }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
        className={`absolute bottom-0 left-0 h-1 ${theme === "dark" ? "bg-cyan-500/30" : "bg-cyan-500/40"}`}
      ></motion.div>
    </motion.div>
  )
}
