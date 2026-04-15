import { motion } from 'framer-motion'
import skills from '../data/skills'
import { ObjTag } from '../components/ui/ObjTag'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-white dark:bg-black"
      aria-label="Technical Skills"
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
            Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-50 leading-relaxed mb-2">
            The tools I use to build.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skills.map((category, index) => {
            return (
              <motion.div
                key={category.category}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-7"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-zinc-50">
                    {category.category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {category.items.map((skill) => (
                    <ObjTag key={skill} label={skill} />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
