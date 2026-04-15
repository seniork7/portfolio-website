import { motion } from 'framer-motion'

const principles = [
  {
    number: '1',
    title: 'User-First, Always',
    description:
      "I ask 'what does the user need?' before I write the first line. Good code that confuses users isn't good code.",
  },
  {
    number: '2',
    title: 'Clean, Readable Code',
    description:
      'I write code for the next developer, not just the machine. Clear naming, small functions, no clever tricks that only I understand.',
  },
  {
    number: '3',
    title: 'Ship and Iterate',
    description:
      "A working product in users' hands beats perfect code in a draft. I bias toward shipping, then improving with feedback.",
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Approach() {
  return (
    <section
      id="approach"
      className="py-20 bg-white dark:bg-black"
      aria-label="My Approach"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 mb-2">
            My Approach
          </h2>
          <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-50 leading-relaxed mb-2">
            Engineering with intention.
          </p>
          <p className="max-w-xl text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">
            Three principles that shape how I write code, design systems, and
            ship products.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {principles.map((item, index) => {
            return (
              <motion.div
                key={item.number}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                className="relative bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-7 overflow-hidden"
              >
                {/* Large muted number */}
                <span
                  className="absolute top-4 right-5 font-display font-extrabold text-5xl text-zinc-600 dark:text-zinc-500 select-none leading-none"
                  aria-hidden="true"
                >
                  {item.number}
                </span>

                {/* Content */}
                <h3 className="font-display font-bold text-lg text-zinc-900 dark:text-zinc-50 mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
