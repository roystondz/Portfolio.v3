"use client"

import { motion } from "framer-motion"
import { X, Sun, Moon } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface MobileMenuProps {
  onClose: () => void
  activeSection: string
  theme: string
  toggleTheme: () => void
}

export default function MobileMenu({ onClose, activeSection, theme, toggleTheme }: MobileMenuProps) {
  const menuItems = ["About", "Skills", "Programmer", "Terminal", "Projects", "Contact"]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 ${theme === "dark" ? "bg-black/95" : "bg-white/95"} z-50 flex flex-col`}
    >
      <div className="flex justify-between items-center p-4">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          onClick={toggleTheme}
          className={`p-2 rounded-full ${
            theme === "dark" ? "bg-gray-800 text-yellow-300" : "bg-gray-200 text-indigo-700"
          }`}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className={theme === "dark" ? "text-white" : "text-gray-900"}
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      <motion.div
        className="flex flex-col items-center justify-center flex-1 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {menuItems.map((item, index) => (
          <motion.div key={item} variants={itemVariants} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              href={`#${item.toLowerCase()}`}
              className={`text-2xl font-bold ${
                activeSection === item.toLowerCase()
                  ? theme === "dark"
                    ? "text-cyan-500"
                    : "text-cyan-600"
                  : theme === "dark"
                    ? "text-white"
                    : "text-gray-900"
              } hover:${theme === "dark" ? "text-cyan-500" : "text-cyan-600"} transition-colors`}
              onClick={onClose}
            >
              {item}
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-8 text-center"
      >
        <p className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"} font-mono`}>
          <span className={theme === "dark" ? "text-white" : "text-gray-900"}>&lt;</span>
          John.Dev
          <span className={theme === "dark" ? "text-white" : "text-gray-900"}>/&gt;</span>
        </p>
      </motion.div>
    </motion.div>
  )
}
