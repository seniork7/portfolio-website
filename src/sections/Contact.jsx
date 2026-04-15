import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, AlertCircle } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import Button from '../components/ui/Button'
import { cn } from '../utils/cn'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xblwwpoy'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const inputClass =
  'w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors duration-200'

export default function Contact() {
  const [formState, setFormState] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  const validate = () => {
    const newErrors = {}
    if (!values.name.trim()) newErrors.name = 'Name is required.'
    if (!values.email.trim()) {
      newErrors.email = 'Email is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }
    if (!values.message.trim()) newErrors.message = 'Message is required.'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setFormState('sending')

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        setFormState('success')
        setValues({ name: '', email: '', message: '' })
      } else {
        setFormState('error')
      }
    } catch {
      setFormState('error')
    }
  }

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-black"
      aria-label="Contact"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-white mb-2">
                Get in Touch
              </h2>
              <p className="text-base sm:text-lg text-zinc-900 dark:text-white leading-relaxed mb-4">
                Let&apos;s build something together.
              </p>
              <p className="text-base text-zinc-900 dark:text-white leading-relaxed">
                I&apos;m actively looking for frontend and full-stack
                roles. Whether you have a position to discuss or just want to
                connect, my inbox is open.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:kevasenior@gmail.com"
                className="flex items-center gap-3 text-zinc-900 dark:text-white hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 group"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <Mail size={16} />
                </div>
                <span className="text-sm">kevasenior@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/kevon-senior-b38434235/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-900 dark:text-white hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 group"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <FaLinkedin size={16} />
                </div>
                <span className="text-sm">Kevon Senior</span>
              </a>

              <a
                href="https://github.com/seniork7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-zinc-900 dark:text-white hover:text-zinc-900 dark:hover:text-white transition-colors duration-200 group"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700 transition-colors">
                  <FaGithub size={16} />
                </div>
                <span className="text-sm">seniork7</span>
              </a>
            </div>

            {/* Available indicator */}
            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className="text-sm text-zinc-900 dark:text-white">
                Currently available for new roles
              </span>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {formState === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center gap-4 py-16 px-8 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-white">
                  Message sent!
                </h3>
                <p className="text-zinc-900 dark:text-white text-sm max-w-xs">
                  Thanks for reaching out. I&apos;ll get back to you as soon as
                  possible.
                </p>
                <button
                  onClick={() => setFormState('idle')}
                  className="text-sm text-teal-400 hover:text-teal-300 underline underline-offset-2 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-5"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-zinc-900 dark:text-white"
                  >
                    Name <span className="text-zinc-900 dark:text-white">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    className={cn(
                      inputClass,
                      errors.name && 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    )}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-zinc-900 dark:text-white"
                  >
                    Email <span className="text-zinc-900 dark:text-white">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={cn(
                      inputClass,
                      errors.email && 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    )}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-zinc-900 dark:text-white"
                  >
                    Message <span className="text-zinc-900 dark:text-white">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role or project..."
                    rows={5}
                    className={cn(
                      inputClass,
                      'resize-none',
                      errors.message && 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    )}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error state */}
                {formState === 'error' && (
                  <div className="flex items-center gap-2 text-red-400 bg-red-950/40 border border-red-900 rounded-xl px-4 py-3 text-sm">
                    <AlertCircle size={16} className="shrink-0" />
                    Something went wrong. Please try again or email me directly.
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  disabled={formState === 'sending'}
                >
                  {formState === 'sending' ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
