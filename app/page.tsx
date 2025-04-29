"use client"

import { useState, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Float,useGLTF } from "@react-three/drei"
import { Code, Database, Server, Cpu, Layers, Github, Linkedin, Mail, ChevronDown, Menu, Sun, Moon, Smartphone, Network } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ProjectCard from "./components/project-card"
import SkillCard from "./components/skill-card"
import ContactForm from "./components/contact-form"
import MobileMenu from "./components/mobile-menu"

import ParticleField from "./components/particle-field"
import GlowingGrid from "./components/glowing-grid"
import ThreeDBackground from "./components/3d-background"
import TerminalSection from "./components/terminal-interface"
import dynamic from "next/dynamic"
import FuturisticModel from "./components/futuristic-model"

import ProgrammerSection from "./components/programmer-section"




export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [theme, setTheme] = useState("dark")
  const [showBackground, setShowBackground] = useState(true)

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      const sections = ["hero", "about", "skills", "programmer", "terminal", "projects", "contact"]
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Disable 3D background on mobile devices for better performance
    const checkMobile = () => {
      setShowBackground(window.innerWidth > 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    document.documentElement.classList.toggle("dark")
  }

  const skills = [
    {
      name: "Frontend Development",
      icon: <Code className="h-8 w-8" />,
      description: "HTML, CSS, JavaScript, React, Next.js ",
      level: 80,
    },
    {
      name: "Backend Development",
      icon: <Server className="h-8 w-8" />,
      description: "Node.js, Express, Next.js API Routes",
      level: 75,
    },
    {
      name: "Database Management",
      icon: <Database className="h-8 w-8" />,
      description: "SQL, MongoDB, Firebase",
      level: 75,
    },
    {
      name: "App Development",
      icon: <Smartphone className="h-8 w-8" />,
      description: "Flutter, React Native, Firebase",
      level: 50,
    },
    {
      name: "Hyperledger",
      icon: <Network className="h-8 w-8" />,
      description: "Fabric, Composer, Chaincode Development",
      level: 40,
    }
    
    
    // {
    //   name: "Computer Architecture",
    //   icon: <Cpu className="h-8 w-8" />,
    //   description: "Hardware design, Embedded systems",
    //   level: 75,
    // },
    // {
    //   name: "System Design",
    //   icon: <Layers className="h-8 w-8" />,
    //   description: "Microservices, Cloud Architecture",
    //   level: 85,
    // },
  ]

  const projects = [
    {
      title: "Blogify - Full-Stack Blog Platform",
      description: "Built a fully functional blog platform where users can create, edit, and delete posts with rich-text formatting. Implemented authentication, user-specific dashboards, and SEO optimization. Features include responsive design, dynamic routing, and server-side rendering for enhanced performance.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      link: "https://blog-v2-nu-ruby.vercel.app/",
    }
,    
    {
      title: "MCQ Generator",
      description: "Developed a dynamic MCQ generator using the Gemini API that generates questions and scores based on user-provided titles and descriptions. Includes manual difficulty level control and a responsive UI.",
      tags: ["Next.js", "TypeScript", "Gemini API"],
      link: "https://testme-gemini-f4tv.vercel.app/",
    },
    
      {
        title: "Weather App",
        description: "Created a cross-platform mobile weather application using Flutter. The app provides real-time weather updates including temperature, humidity, and weather conditions based on the user's location. Designed with a modern and user-friendly interface.",
        tags: ["Flutter", "Dart", "Weather API"],
        link: "#" // update with your actual link if published
      }
      
    ,
    {
      title: "Personal Portfolio",
      description: "Created this responsive portfolio website with 3D elements and animations.",
      tags: ["Next.js", "Three.js", "Framer Motion"],
      link: "#",
    }
    
    
  ]

  return (
    <div className={`${theme === "dark" ? "bg-black" : "bg-gray-100"} text-white min-h-screen relative`}>
      {/* 3D Background */}
      {showBackground && <ThreeDBackground theme={theme} />}

      {/* Particle Background (as fallback for mobile) */}
      {!showBackground && <ParticleField theme={theme} />}

      {/* Glowing Grid */}
      {!showBackground && <GlowingGrid theme={theme} />}

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 ${
          theme === "dark" ? "bg-black/80" : "bg-white/80"
        } backdrop-blur-md border-b ${theme === "dark" ? "border-cyan-500/20" : "border-cyan-500/30"}`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className={`text-cyan-500 font-mono text-xl font-bold`}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={theme === "dark" ? "text-white" : "text-gray-900"}
            >
              &lt;
            </motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
              Royston.Dev
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={theme === "dark" ? "text-white" : "text-gray-900"}
            >
              /&gt;
            </motion.span>
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            {["About", "Skills", "Programmer", "Terminal", "Projects", "Contact"].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
              >
                <Link
                  href={`#${item.toLowerCase()}`}
                  className={`text-sm font-medium hover:text-cyan-400 transition-colors ${
                    activeSection === item.toLowerCase()
                      ? "text-cyan-500"
                      : theme === "dark"
                        ? "text-gray-300"
                        : "text-gray-700"
                  }`}
                >
                  {item}
                </Link>
              </motion.div>
            ))}

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.7 }}
              onClick={toggleTheme}
              className={`p-2 rounded-full ${
                theme === "dark" ? "bg-gray-800 text-yellow-300" : "bg-gray-200 text-indigo-700"
              }`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            onClose={() => setIsMobileMenuOpen(false)}
            activeSection={activeSection}
            theme={theme}
            toggleTheme={toggleTheme}
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-normal ml-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 text-center md:text-left mb-12 md:mb-0"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>Hello, I'm Royston Dsouza</span>
              </h1>
              <div className={`text-xl md:text-3xl font-mono ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                <TypewriterEffect
                  phrases={[
                    "Computer Engineer",
                    "Frontend Developer",
                    "Backend Developer",
                    "IoT Enthusiast",
                    "Problem Solver",
                  ]}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8"
            >
              <Button
                asChild
                className={`${theme === "dark" ? "bg-cyan-500 hover:bg-cyan-600" : "bg-cyan-600 hover:bg-cyan-700"} text-black mr-4 relative overflow-hidden group`}
              >
                <Link href="#projects">
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className={`border-cyan-500 text-cyan-500 hover:bg-cyan-500/10 relative overflow-hidden group`}
              >
                <Link href="#contact">
                  <span className="relative z-10">Contact Me</span>
                  <span
                    className={`absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="md:w-1/2 h-[300px] md:h-[500px]"
          >
            <Canvas className="w-full h-full">
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Suspense fallback={null}>
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                  <FuturisticModel position={[0, 0, 0]} scale={1.5} rotation={[0, Math.PI / 4, 0]} />
                </Float>
                <Environment preset="city" />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <Link href="#about">
            <ChevronDown className={`h-8 w-8 ${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`} />
          </Link>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-b from-black/70 to-gray-900/70" : "bg-gradient-to-b from-gray-100/90 to-gray-200/90"} relative`}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 relative inline-block ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`absolute bottom-0 left-0 h-1 ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"}`}
              ></motion.span>
              <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>&lt;</span> About Me{" "}
              <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>/&gt;</span>
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className={`${
                theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
              } rounded-lg p-6 backdrop-blur-sm relative overflow-hidden group`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  theme === "dark" ? "from-cyan-500/5" : "from-cyan-500/10"
                } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
              ></div>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-4 font-mono relative z-10`}>
                I'm a Computer Engineering student passionate about building innovative solutions that bridge hardware
                and software.
              </p>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-4 font-mono relative z-10`}>
                With a strong foundation in both electrical engineering principles and software development, I create
                systems that solve real-world problems.
              </p>
              <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} font-mono relative z-10`}>
                Currently pursuing my degree at NMAM Institue of Technology, Nitte University, I'm focused on BloackChain systems, IoT, and full-stack
                development.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-b from-gray-900/70 to-black/70" : "bg-gradient-to-b from-gray-200/90 to-gray-100/90"} relative`}
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
              className={`text-3xl md:text-4xl font-bold mb-4 relative inline-block ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`absolute bottom-0 left-0 h-1 ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"}`}
              ></motion.span>
              <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>&lt;</span> Skills{" "}
              <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>/&gt;</span>
            </h2>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              My technical toolkit combines hardware expertise with software development capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                name={skill.name}
                icon={skill.icon}
                description={skill.description}
                level={skill.level}
                index={index}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Programmer Section */}
      
        <ProgrammerSection theme={theme} />
    {/* <MeetTheProgrammer theme={theme} /> */}

      {/* Terminal Section */}
      <TerminalSection theme={theme} />

      {/* Projects Section */}
      <section
        id="projects"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-b from-black/70 to-gray-900/70" : "bg-gradient-to-b from-gray-100/90 to-gray-200/90"} relative`}
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
              className={`text-3xl md:text-4xl font-bold mb-4 relative inline-block ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`absolute bottom-0 left-0 h-1 ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"}`}
              ></motion.span>
              <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>&lt;</span> Projects{" "}
              <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>/&gt;</span>
            </h2>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              Here are some of my recent projects that showcase my skills and interests.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
                index={index}
                theme={theme}
              />
            ))}
          </div>
        </div>
      </section>



      
      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 ${theme === "dark" ? "bg-gradient-to-b from-gray-900/70 to-black/70" : "bg-gradient-to-b from-gray-200/90 to-gray-100/90"} relative`}
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
              className={`text-3xl md:text-4xl font-bold mb-4 relative inline-block ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className={`absolute bottom-0 left-0 h-1 ${theme === "dark" ? "bg-cyan-500" : "bg-cyan-600"}`}
              ></motion.span>
              <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>&lt;</span> Contact{" "}
              <span className={`${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`}>/&gt;</span>
            </h2>
            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto`}>
              Interested in working together? Feel free to reach out!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`${
                theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
              } rounded-lg p-6 backdrop-blur-sm`}
            >
              <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
                Get In Touch
              </h3>
              <ContactForm theme={theme} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`${
                theme === "dark" ? "bg-gray-800/50 border border-cyan-500/20" : "bg-white/80 border border-cyan-500/30"
              } rounded-lg p-6 backdrop-blur-sm`}
            >
              <h3 className={`text-xl font-bold mb-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
                Connect With Me
              </h3>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <Github className={`h-6 w-6 mr-4 ${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`} />
                  <a
                    href="https://github.com/roystondz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme === "dark" ? "text-gray-300 hover:text-cyan-400" : "text-gray-700 hover:text-cyan-600"} transition-colors`}
                  >
                    github.com/roystondz
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <Linkedin className={`h-6 w-6 mr-4 ${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`} />
                  <a
                    href="https://linkedin.com/in/royston-akash-dsouza/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${theme === "dark" ? "text-gray-300 hover:text-cyan-400" : "text-gray-700 hover:text-cyan-600"} transition-colors`}
                  >
                    linkedin.com/in/royston-akash-dsouza
                  </a>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <Mail className={`h-6 w-6 mr-4 ${theme === "dark" ? "text-cyan-500" : "text-cyan-600"}`} />
                  <a
                    href="mailto:roystonad2004@example.com"
                    className={`${theme === "dark" ? "text-gray-300 hover:text-cyan-400" : "text-gray-700 hover:text-cyan-600"} transition-colors`}
                  >
                    roystonad2004@gmail.com
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className={`mt-8 pt-8 border-t ${theme === "dark" ? "border-cyan-500/20" : "border-cyan-500/30"}`}
              >
                <h4 className={`text-lg font-bold mb-4 ${theme === "dark" ? "text-cyan-400" : "text-cyan-600"}`}>
                  Location
                </h4>
                <p className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Mangalore, Karnataka</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-6 border-t ${theme === "dark" ? "border-cyan-500/20 bg-black/80" : "border-cyan-500/30 bg-gray-100/80"} backdrop-blur-sm`}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className={`${theme === "dark" ? "text-gray-500" : "text-gray-600"} font-mono`}
          >
            &copy; {new Date().getFullYear()} Royston Akash Dsouza | Computer Engineering Student
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className={`${theme === "dark" ? "text-gray-600" : "text-gray-500"} text-sm mt-2 font-mono`}
          >
            <span className={theme === "dark" ? "text-cyan-500" : "text-cyan-600"}>&lt;/&gt;</span> with passion
          </motion.p>
        </div>
      </footer>
      
    </div>
  )
}

// Simple Typewriter Effect Component
function TypewriterEffect({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentPhrase = phrases[index]

        if (isDeleting) {
          setText(currentPhrase.substring(0, text.length - 1))
        } else {
          setText(currentPhrase.substring(0, text.length + 1))
        }

        if (!isDeleting && text === currentPhrase) {
          // Start deleting after a pause
          setTimeout(() => setIsDeleting(true), 1500)
        } else if (isDeleting && text === "") {
          setIsDeleting(false)
          setIndex((index + 1) % phrases.length)
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [text, isDeleting, index, phrases])

  return (
    <div className="inline-flex items-center">
      <span>{text}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
        className="ml-1 inline-block w-2 h-6 bg-cyan-500"
      />
    </div>
  )
}
