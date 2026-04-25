import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { ObjTag, ObjInline } from '../components/ui/ObjTag'
import projects from '../data/projects'
import testimonials from '../data/testimonials'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const frontendSkills = ['React', 'JavaScript', 'Tailwind', 'HTML5']
const backendSkills = ['Node.js', 'Express', 'MongoDB']

function HeroCardStack() {
  const navigate = useNavigate()
  const featured = projects.find((p) => p.featured)
  const testimonial = testimonials[0]

  const scrollTo = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="relative h-105">

      {/* Card 1 — Featured Project */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{ y: -3 }}
        onClick={() => navigate(`/case-study/${featured.slug}`)}
        className="absolute top-0 left-0 right-0 z-30 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg overflow-hidden cursor-pointer"
      >
        <div className="overflow-hidden bg-zinc-100 dark:bg-zinc-800 h-25">
          <img
            src={featured.imageUrl}
            alt={featured.title}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="p-3 flex flex-col gap-2">
          <p className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-50 leading-tight">
            {featured.title}
            <span className="font-normal text-zinc-900 dark:text-zinc-50"> - {featured.category}</span>
          </p>
          <div className="flex items-center justify-between">
            <ObjInline items={['React', 'Node.js', 'MongoDB', 'Tailwind']} />
            <span className="flex items-center gap-0.5 text-[14px] font-medium text-teal-600 dark:text-teal-400 shrink-0 ml-2">
              View case study <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </motion.div>

      {/* Card 2 — Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.45 }}
        onClick={() => scrollTo('#testimonials')}
        className="absolute top-46.5 left-6 right-0 z-20 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md p-3 cursor-pointer"
      >
        <div className="flex items-start gap-2">
          <span className="text-2xl font-serif leading-none text-rose-500 dark:text-rose-400 shrink-0 select-none">
            &ldquo;
          </span>
          <p className="italic text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed line-clamp-2">
            {testimonial.feedback}
          </p>
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-rose-500 dark:bg-rose-900 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
              {testimonial.initials}
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-100 leading-none">
                {testimonial.name}
              </p>
              <p className="text-[10px] text-zinc-900 dark:text-zinc-50 mt-0.5">
                {testimonial.role}
              </p>
            </div>
          </div>
          <span className="flex items-center gap-0.5 text-[14px] font-medium text-teal-600 dark:text-teal-400 shrink-0 ml-2">
            Read all <ArrowRight size={14} />
          </span>
        </div>
      </motion.div>

      {/* Card 3 — Skills Snapshot */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        onClick={() => scrollTo('#skills')}
        className="absolute top-77.5 left-12 right-0 z-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm p-3 cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-zinc-900 dark:text-zinc-50">
            Technical Skills
          </p>
          <span className="flex items-center gap-0.5 text-[14px] font-medium text-teal-600 dark:text-teal-400 shrink-0">
            See all <ArrowRight size={14} />
          </span>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {[...frontendSkills, ...backendSkills].map((s) => (
            <ObjTag key={s} label={s} size="xs" />
          ))}
        </div>
      </motion.div>

    </div>
  )
}

export default function Hero() {
  const handleScroll = (id) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative overflow-hidden bg-white dark:bg-black"
      aria-label="Hero"
    >
      {/* Grid lines background pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(113,113,122,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(113,113,122,0.12) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden="true"
      />

      {/* Gradient fade at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, var(--tw-gradient-from, transparent))',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-28 sm:pt-32 sm:pb-36 lg:pb-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="text-center md:text-left">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0 }}
              className="font-display font-extrabold text-5xl md:text-6xl text-zinc-900 dark:text-zinc-50 mb-5"
            >
              I build clean
              <br />
              <span className="text-rose-700 dark:text-rose-900">user-focused</span>,
              <br />
              web applications
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              className="max-w-md text-base sm:text-lg text-zinc-900 dark:text-zinc-50 mb-6 mx-auto md:mx-0"
            >
              Full-Stack developer specializing in React and structured systems. Former firefighter bringing problem-solving and real-world discipline into software development.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <Button variant="primary" size="lg" onClick={() => handleScroll('#projects')}>
                See my work
              </Button>
              <Button variant="secondary" size="lg" onClick={() => handleScroll('#contact')}>
                Let&apos;s connect
              </Button>
            </motion.div>
          </div>

          {/* Right Column — Card cascade (desktop only) */}
          <div className="hidden lg:block">
            <HeroCardStack />
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500 dark:text-zinc-500"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase font-medium">scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
