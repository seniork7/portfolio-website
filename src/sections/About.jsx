import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import Button from '../components/ui/Button'

const stats = [
  { label: '7 yrs Firefighter' },
  { label: '3 Projects shipped' },
  { label: 'Ottawa, ON' },
]

export default function About() {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-black"
      aria-label="About Me"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 mb-2">
                About Me
              </h2>
              <p className="text-base sm:text-lg leading-relaxed">
                Developer. Problem solver.{' '}
                <span className="text-rose-500 dark:text-rose-400 font-medium">
                  Former firefighter.
                </span>
              </p>
            </div>

            <div className="space-y-4 text-base text-zinc-900 dark:text-zinc-50 leading-relaxed">
              <p>
                Before I wrote code, I spent six as a firefighter.
                That job trained me to stay calm in chaos, make fast decisions
                with limited information, and never compromise on standards when
                it counts. That mindset is still how I approach software today.
              </p>
              <p>
                I moved into web development because I wanted to build things,
                not just react to problems. I studied Interactive Media Design
                at Algonquin College, where I built applications,
                worked heavily with React, and learned how to turn ideas into
                working products.
              </p>
              <p>
                Now I&apos;m focused on joining a team where I can contribute quickly,
                ship real features, and grow alongside strong developers. I care about
                clean execution, practical problem-solving, and building things that
                actually get used. If you&apos;re building something real and need
                someone who learns fast and executes under pressure, I&apos;m all in.
              </p>
            </div>

            {/* Resume Button */}
            <div>
              <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="md">
                  <Download size={15} />
                  Download Resume
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right: Headshot */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <img
                src="/images/kevonsenior.png"
                alt="Kevon Senior – Frontend Developer"
                className="relative w-72 sm:w-80 lg:w-96 aspect-square object-cover object-top rounded-2xl shadow-xl"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
