import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Approach from './sections/Approach'
import About from './sections/About'
import Skills from './sections/Skills'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import CaseStudy from './pages/CaseStudy'

function HomePage() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      // Wait for the page to render before scrolling
      const id = hash.slice(1)
      const attempt = (tries = 0) => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else if (tries < 10) {
          setTimeout(() => attempt(tries + 1), 100)
        }
      }
      attempt()
    }
  }, [])

  return (
    <main>
      <Hero />
      <Projects />
      <Approach />
      <About />
      <Skills />
      <Testimonials />
      <Contact />
    </main>
  )
}

export default function App() {
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        <Navbar isDark={isDark} onThemeToggle={toggle} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-study/:slug" element={<CaseStudy />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
