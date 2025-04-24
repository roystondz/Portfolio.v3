"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"

interface ContactFormProps {
  theme: string
}

export default function ContactForm({ theme }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
            theme === "dark" ? "bg-cyan-500/20 text-cyan-500" : "bg-cyan-500/30 text-cyan-600"
          } mb-4`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Message Sent!</h3>
        <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <Button
          variant="outline"
          className={`mt-4 border-cyan-500 text-cyan-500 hover:bg-cyan-500/10`}
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={handleChange}
          className={`${
            theme === "dark"
              ? "bg-gray-900/50 border-gray-700 focus:border-cyan-500"
              : "bg-gray-100/50 border-gray-300 focus:border-cyan-600"
          }`}
        />
      </motion.div>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          value={formData.email}
          onChange={handleChange}
          className={`${
            theme === "dark"
              ? "bg-gray-900/50 border-gray-700 focus:border-cyan-500"
              : "bg-gray-100/50 border-gray-300 focus:border-cyan-600"
          }`}
        />
      </motion.div>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Input
          type="text"
          name="subject"
          placeholder="Subject"
          required
          value={formData.subject}
          onChange={handleChange}
          className={`${
            theme === "dark"
              ? "bg-gray-900/50 border-gray-700 focus:border-cyan-500"
              : "bg-gray-100/50 border-gray-300 focus:border-cyan-600"
          }`}
        />
      </motion.div>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Textarea
          name="message"
          placeholder="Your Message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          className={`${
            theme === "dark"
              ? "bg-gray-900/50 border-gray-700 focus:border-cyan-500"
              : "bg-gray-100/50 border-gray-300 focus:border-cyan-600"
          }`}
        />
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          className={`w-full ${
            theme === "dark" ? "bg-cyan-500 hover:bg-cyan-600" : "bg-cyan-600 hover:bg-cyan-700"
          } text-black`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </>
          )}
        </Button>
      </motion.div>
    </form>
  )
}
