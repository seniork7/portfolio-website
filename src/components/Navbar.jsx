import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X, FileText } from 'lucide-react'
import { cn } from '../utils/cn'

const navLinks = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ isDark, onThemeToggle }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + href)
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 shadow-sm'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-50 hover:text-rose-500 dark:hover:text-rose-400 transition-colors duration-200"
            aria-label="Kevon Senior – Home"
          >
            &lt;KS /&gt;
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-zinc-900 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-600 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all duration-200"
            >
              <FileText size={14} />
              Resume
            </a>
            <button
              onClick={onThemeToggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onThemeToggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 md:hidden transition-all duration-300',
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0'
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          className={cn(
            'absolute top-16 left-0 right-0 bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800 transition-transform duration-300',
            mobileOpen ? 'translate-y-0' : '-translate-y-4'
          )}
        >
          <div className="px-4 py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className="px-4 py-3 text-base font-medium text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-xl transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-900 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-700 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
              >
                <FileText size={15} />
                View Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
