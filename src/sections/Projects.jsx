import { motion } from 'framer-motion'
import { ExternalLink, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import { ObjInline, ObjTag } from '../components/ui/ObjTag'
import projects from '../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function ProjectLinks({ liveUrl, githubUrl, slug, size = 'md' }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link to={`/case-study/${slug}`}>
        <Button variant="primary" size={size}>
          Case Study
        </Button>
      </Link>
      {liveUrl && (
        <Button
          variant="secondary"
          size={size}
          onClick={() => window.open(liveUrl, '_blank')}
        >
          <ExternalLink size={14} />
          Live Demo
        </Button>
      )}
      {githubUrl && (
        <Button
          variant="ghost"
          size={size}
          onClick={() => window.open(githubUrl, '_blank')}
        >
          <Terminal size={14} />
          Code
        </Button>
      )}
    </div>
  )
}

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const regular = projects.filter((p) => !p.featured)

  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-black"
      aria-label="Projects"
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
            My Work
          </h2>
          <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-50 leading-relaxed">
            Projects that solve real problems.
          </p>
        </motion.div>

        {/* Featured Project */}
        {featured && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-12 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Content */}
              <div className="p-8 sm:p-10 flex flex-col justify-center gap-5">
                <div>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 mb-2">
                    {featured.title}
                    <span className="font-normal text-zinc-900 dark:text-zinc-50"> - {featured.category}</span>
                  </h3>
                  <p className="text-zinc-900 dark:text-zinc-50 text-base">
                    {featured.tagline}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-zinc-900 dark:text-zinc-50 mb-1">
                      The Problem
                    </p>
                    <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">
                      {featured.problem}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-widest uppercase text-zinc-900 dark:text-zinc-50 mb-1">
                      What I Built
                    </p>
                    <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">
                      {featured.solution}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                  {featured.techStack.map((tech) => (
                    <ObjTag key={tech} label={tech} />
                  ))}
                </div>
                <ProjectLinks liveUrl={featured.liveUrl} githubUrl={featured.githubUrl} slug={featured.slug} />
              </div>

              {/* Image */}
              <div className="relative min-h-64 lg:min-h-0 bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={`${featured.title} project screenshot`}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {regular.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              className="group rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={`${project.title} project screenshot`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4 flex-1">
                <div>
                  <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-50 mb-1">
                    {project.title}
                    <span className="font-normal text-zinc-900 dark:text-zinc-50"> - {project.category}</span>
                  </h3>
                  <p className="text-sm text-zinc-900 dark:text-zinc-50">
                    {project.tagline}
                  </p>
                </div>

                <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">
                  {project.impact}
                </p>

                <ObjInline items={project.techStack} max={4} />

                <div className="mt-auto pt-2">
                  <ProjectLinks
                    liveUrl={project.liveUrl}
                    githubUrl={project.githubUrl}
                    slug={project.slug}
                    size="sm"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
