"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
  index: number
  theme: string
}

export default function ProjectCard({ title, description, tags, link, index, theme }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`${
        theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
      } rounded-lg overflow-hidden hover:${
        theme === "dark" ? "border-cyan-500/50" : "border-cyan-500/60"
      } transition-all duration-300 relative`}
    >
      <motion.div
        initial={{ height: "0%" }}
        whileHover={{ height: "100%" }}
        transition={{ duration: 0.3 }}
        className={`absolute bottom-0 left-0 w-1 ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"} z-10`}
      ></motion.div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{title}</h3>
          <motion.div whileHover={{ rotate: 45 }} transition={{ duration: 0.2 }}>
            <Link
              href={link}
              className={`${theme === "dark" ? "text-cyan-500 hover:text-cyan-400" : "text-cyan-600 hover:text-cyan-500"}`}
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
        <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-6`}>{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
              className={`px-3 py-1 text-xs font-medium ${
                theme === "dark" ? "bg-cyan-500/10 text-cyan-400" : "bg-cyan-500/20 text-cyan-700"
              } rounded-full`}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
