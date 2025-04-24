"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function TypewriterComponent() {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const phrases = [
    "Computer Engineering Student",
    "Frontend Developer",
    "Backend Developer",
    "IoT Enthusiast",
    "Problem Solver",
  ]

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length
      const fullText = phrases[i]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))

      setTypingSpeed(isDeleting ? 80 : 150)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, phrases])

  return (
    <div className="inline-flex items-center">
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
        className="ml-1 inline-block w-2 h-6 bg-green-500"
      />
    </div>
  )
}
