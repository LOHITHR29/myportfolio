'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Github, Linkedin, Mail, Rocket, Menu, Download, ChevronRight, ExternalLink } from 'lucide-react'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'

export function PortfolioComponent() {
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState('ALL')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      const sections = ['about', 'skills', 'projects', 'education', 'contact']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom > 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    window.addEventListener('scroll', handleScroll)

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')

    if (canvas && ctx) {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const bubbles: Bubble[] = []
      for (let i = 0; i < 50; i++) {
        bubbles.push(new Bubble(canvas))
      }

      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        bubbles.forEach(bubble => {
          bubble.update()
          bubble.draw(ctx)
        })
        requestAnimationFrame(animate)
      }

      animate()
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white font-sans">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-purple-600 z-50"
        style={{ scaleX }}
      />
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0B0B0F] bg-opacity-90 backdrop-blur-sm">
          <nav className="container mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <a href="#" className="text-xl font-bold">
                <span className="text-purple-500">&lt;</span>Lohith
                <span className="text-purple-500">/</span>
                Regalla<span className="text-purple-500">&gt;</span>
              </a>
              <div className="hidden md:flex space-x-6">
                {['about', 'skills', 'projects', 'education', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`hover:text-purple-500 transition duration-300 ${activeSection === section ? 'text-purple-500' : ''}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <a href="https://github.com/LOHITHR29" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition duration-300">
                  Github Profile
                </a>
                <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
                  <Menu />
                </button>
              </div>
            </div>
          </nav>
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden bg-[#1C1C27] py-2"
              >
                {['about', 'skills', 'projects', 'education', 'contact'].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`block w-full text-left px-4 py-2 hover:bg-[#2D2D39] ${activeSection === section ? 'bg-[#2D2D39]' : ''}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <main className="pt-20">
          <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-[#0B0B0F] pointer-events-none"></div>
            <motion.div 
              className="container mx-auto px-6 relative z-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-09-14_21-25-01-tL3Vlb3dj0sJJRoSVoPXAsCxij5ifI.jpg"
                alt="Lohith Regalla"
                className="w-32 h-32 rounded-full border-4 border-purple-500 mx-auto mb-6 object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Hi, I am <br />
                <span className="text-purple-400">Lohith Regalla</span>
              </motion.h1>
              <motion.p 
                className="text-xl md:text-2xl mb-8 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Full Stack Developer & DevOps Engineer
              </motion.p>
              <motion.p 
                className="max-w-2xl mx-auto text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                As a Full Stack Developer and DevOps Engineer, I bring a comprehensive skill set to the table. My expertise spans both front-end and back-end development, allowing me to create seamless, end-to-end solutions. On the DevOps side, I'm well-versed in automating and optimizing development processes, ensuring efficient deployment and management of applications.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.button 
                  className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV <Download className="ml-2" />
                </motion.button>
                <motion.button 
                  className="bg-transparent border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-purple-600 hover:text-white transition duration-300 flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                >
                  Contact Me <ChevronRight className="ml-2" />
                </motion.button>
              </motion.div>
            </motion.div>
          </section>

          <section id="skills" className="py-20 bg-[#1C1C27] bg-opacity-80">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center text-white">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <SkillCategory title="Languages" skills={['Python', 'JavaScript', 'C', 'C++', 'Shell Script']} />
                <SkillCategory title="DevOps" skills={['AWS', 'Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Git']} />
                <SkillCategory title="Web Technologies" skills={['React.js', 'HTML5', 'CSS3', 'Node.js', 'MongoDB', 'MySQL']} />
                <SkillCategory title="AI/ML" skills={['TensorFlow', 'PyTorch', 'scikit-learn', 'NLP', 'Machine Learning concepts']} />
                <SkillCategory title="Frameworks" skills={['Django', 'Flask']} />
                <SkillCategory title="Engineering Principles" skills={['Data Structures', 'OOPS', 'Agile']} />
              </div>
            </div>
          </section>

          <section id="projects" className="py-20 bg-opacity-80">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center text-white">Projects</h2>
              <div className="flex justify-center space-x-4 mb-8">
                {['ALL', 'WEB APP\'S', 'MACHINE LEARNING'].map((tab) => (
                  <motion.button
                    key={tab}
                    className={`px-4 py-2 rounded-full ${activeTab === tab ? 'bg-purple-600' : 'bg-[#1C1C27]'} hover:bg-purple-700 transition duration-300 text-white`}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab}
                  </motion.button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ProjectCard
                  name="Readify - Book Reading App"
                  date="Jan 2024 - Present"
                  description="A web application that enhances the reading experience by allowing users to interact with book content through various features such as displaying books, highlighting text, making text bold, adding sticky notes, and creating highlights. It incorporates Medium-like features for a better user experience."
                  technologies={['Next.js', 'ReactJS', 'JavaScript', 'CSS', 'HTML']}  
                  githubLink="https://github.com/LOHITHR29/Readify"                
                />
                <ProjectCard
                  name="Object Detection Web Application"
                  date="Nov 2023 - Dec 2023"
                  description="Developed a web-based object detection application using HTML, CSS, and TensorFlow.js. Implemented real-time object detection using a pre-trained COCO-SSD model."
                  technologies={['HTML', 'CSS', 'JavaScript', 'TensorFlow.js']}
                />
                <ProjectCard
                  name="Plant Identifier Web Application"
                  date="Aug 2023 - Oct 2023"
                  description="Developed a web application for plant identification using Next.js and Google Cloud Vision API. Deployed on a cloud platform, ensuring scalability and high availability using Docker."
                  technologies={['Next.js', 'Google Cloud Vision API', 'Docker']}
                  githubLink="https://github.com/LOHITHR29/PLANTID"
                />
                <ProjectCard
                  name="Virtual Paint Application"
                  date="May 2023 - Jul 2023"
                  description="Developed a gesture-controlled painting app using Python and TensorFlow, enabling drawing with the index finger and erasing with the palm. Implemented real-time hand tracking with OpenCV."
                  technologies={['Python', 'TensorFlow', 'OpenCV']}
                  githubLink="https://github.com/LOHITHR29/virtual-paint"
                />
                <ProjectCard
                  name="Stable Diffusion Image Generation Project"
                  date="Feb 2024 - Present"
                  description="This project demonstrates how to use the Stable Diffusion model for image generation tasks. It includes setup instructions, usage examples, and troubleshooting tips for common issues, providing a comprehensive guide for users."
                  technologies={['Python', 'TensorFlow', 'PyTorch', 'Stable Diffusion', 'Machine Learning']}
                  githubLink="https://github.com/LOHITHR29/text2image"
                  
                />
                <ProjectCard
                  name="E-commerce Platform Development"
                  date="Nov 2022 - Jan 2023"
                  description="Developed a robust e-commerce platform integrating Flask for the back-end and React.js for the front-end. Implemented Stripe for secure payment processing and MongoDB for efficient storage of product and user data."
                  technologies={['Flask', 'React.js', 'MongoDB', 'Stripe']}
                />
              </div>
            </div>
          </section>

          <section id="education" className="py-20 bg-[#1C1C27] bg-opacity-80">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center text-white">Education</h2>
              <motion.div 
                className="bg-[#2D2D39] rounded-lg p-6 max-w-2xl mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-semibold mb-2 text-white">B.Tech in Computer Science and Engineering</h3>
                <p className="text-white mb-2">KL University, 2020 - 2024</p>
                <p className="text-purple-400 font-semibold">CGPA: 8.78</p>
              </motion.div>
            </div>
          </section>

          <section id="certifications" className="py-20 bg-opacity-80">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center text-white">Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <CertificationCard title="AWS Solution Architect - Associate" />
                <CertificationCard title="Azure Fundamentals" />
                <CertificationCard title="Red Hat Certified Enterprise Application Developer" />
                <CertificationCard title="AVIATRIX MULTICLOUD" />
              </div>
            </div>
          </section>

          <section id="publications" className="py-20 bg-[#1C1C27] bg-opacity-80">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center text-white">Publications</h2>
              <div className="space-y-8">
                <PublicationCard
                  title="Forensic Speaker Recognition System"
                  description="Proposed a machine learning-based system for speaker identification in criminal investigations using advanced signal processing and pattern recognition techniques."
                />
                <PublicationCard
                  title="Diabetic Detection from Images of Eye"
                  description="Developed a Diabetic Retinopathy detection system with 95% accuracy using VGG architectures (Accepted for publication)."
                />
              </div>
            </div>
          </section>

          <section id="contact" className="py-20 bg-opacity-80">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold mb-12 text-center text-white">Contact Me</h2>
              <div className="max-w-md mx-auto bg-[#1C1C27] rounded-lg p-8">
                <form className="space-y-4">
                  <input type="email" placeholder="Your Email" className="w-full px-4 py-2 bg-[#2D2D39] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white" />
                  <input type="text" placeholder="Your Name" className="w-full px-4 py-2 bg-[#2D2D39] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white" />
                  <input type="text" placeholder="Subject" className="w-full px-4 py-2 bg-[#2D2D39] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white" />
                  <textarea placeholder="Message" rows={4} className="w-full px-4 py-2 bg-[#2D2D39] rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 text-white"></textarea>
                  <motion.button 
                    type="submit" 
                    className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send
                  </motion.button>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[#0B0B0F] py-8">
          <div className="container mx-auto px-6 flex flex-col items-center">
            <div className="flex justify-center space-x-6 mb-4">
              <motion.a 
                href="https://github.com/LOHITHR29" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-purple-400 transition duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <Github />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/lohithregalla" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-purple-400 transition duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <Linkedin />
              </motion.a>
              <motion.a 
                href="mailto:lohithregalla123@gmail.com" 
                className="text-white hover:text-purple-400 transition duration-300"
                whileHover={{ scale: 1.2 }}
              >
                <Mail />
              </motion.a>
            </div>
            <p className="text-white text-sm">© 2024 Lohith Regalla. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

class Bubble {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string

  constructor(canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.size = Math.random() * 5 + 1
    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5
    this.color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.1)`
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x < 0 || this.x > window.innerWidth) {
      this.speedX *= -1
    }

    if (this.y < 0 || this.y > window.innerHeight) {
      this.speedY *= -1
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

function SkillCategory({ title, skills }) {
  return (
    <motion.div 
      className="bg-[#2D2D39] p-6 rounded-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <motion.span 
            key={index} 
            className="bg-[#1C1C27] px-3 py-1 rounded-full text-sm text-white"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

function ProjectCard({ name, date, description, technologies, githubLink }) {
  return (
    <motion.div 
      className="bg-[#1C1C27] rounded-lg overflow-hidden shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{name}</h3>
        <p className="text-purple-400 text-sm mb-4">{date}</p>
        <p className="text-white mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="bg-[#2D2D39] px-2 py-1 rounded-full text-xs text-purple-400">{tech}</span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <motion.a 
            href={githubLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 transition duration-300 flex items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            View Code <Github className="ml-1" size={16} />
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

function CertificationCard({ title }) {
  return (
    <motion.div 
      className="bg-[#1C1C27] p-6 rounded-lg text-center"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      <p className="text-purple-400">Certified</p>
    </motion.div>
  )
}

function PublicationCard({ title, description }) {
  return (
    <motion.div 
      className="bg-[#2D2D39] p-6 rounded-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-white">{description}</p>
    </motion.div>
  )
}