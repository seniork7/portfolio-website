import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ExternalLink, Terminal, CheckCircle
  , Server, ShieldCheck, ArrowRight, Star,
} from 'lucide-react'
import projects from '../data/projects'
import Button from '../components/ui/Button'
import { ObjTag } from '../components/ui/ObjTag'


const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function SectionLabel({ id, children }) {
  return (
    <h2 id={id} className="font-display font-bold text-xl sm:text-2xl text-zinc-900 dark:text-zinc-50 mb-1">
      {children}
    </h2>
  )
}

function SectionHeading({ children }) {
  return (
    <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-50 leading-relaxed mb-5">
      {children}
    </p>
  )
}

function Section({ label, headingId, heading, children, className = '' }) {
  return (
    <motion.section
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      aria-labelledby={headingId}
      className={className}
    >
      <SectionLabel id={headingId}>{label}</SectionLabel>
      <SectionHeading>{heading}</SectionHeading>
      {children}
    </motion.section>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <h1 className="font-display font-bold text-3xl text-zinc-900 dark:text-zinc-50">
          Project not found
        </h1>
        <p className="text-zinc-900 dark:text-zinc-50">That case study doesn&apos;t exist yet.</p>
        <Link to="/"><Button variant="primary">Back to portfolio</Button></Link>
      </div>
    )
  }

  return (
    <div className="pt-16">

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-white dark:bg-black border-b border-zinc-200 dark:border-zinc-800">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-5 dark:opacity-[0.04] scale-110 blur-sm"
          style={{ backgroundImage: `url(${project.imageUrl})` }}
          aria-hidden="true"
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-sm text-zinc-900 dark:text-zinc-50 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors duration-200 group"
            >
              <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
              Back to projects
            </button>
          </motion.div>

          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ duration: 0.5, delay: 0.05 }}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-zinc-900 dark:text-zinc-50 leading-tight mb-4"
          >
            {project.title}
            <span className="block font-normal text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 mt-1">{project.category}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg sm:text-xl text-zinc-900 dark:text-zinc-50 max-w-2xl mb-8"
          >
            {project.tagline}
          </motion.p>

          <motion.div
            variants={fadeUp} initial="hidden" animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            {project.liveUrl && (
              <Button variant="primary" size="md" onClick={() => window.open(project.liveUrl, '_blank')}>
                <ExternalLink size={14} />Live Demo
              </Button>
            )}
            {project.githubUrl && (
              <Button variant="secondary" size="md" onClick={() => window.open(project.githubUrl, '_blank')}>
                <Terminal size={14} />View Code
              </Button>
            )}
          </motion.div>
        </div>
      </div>

      {/* ── Screenshot ────────────────────────────────────── */}
      {project.imageUrl && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-zinc-950/50"
          >
            <img src={project.imageUrl} alt={`${project.title} screenshot`} className="w-full object-cover object-top" />
          </motion.div>
        </div>
      )}

      {/* ── Main Content ──────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">

          {/* ── Left: narrative ── */}
          <div className="space-y-16">

            {/* Overview */}
            <Section label="Overview" headingId="overview-heading" heading="What is this?">
              <p className="text-base text-zinc-900 dark:text-zinc-50 leading-relaxed">
                {project.overview}
              </p>
            </Section>

            {/* Who It's For */}
            {project.audiences && (
              <Section label="Audience" headingId="audience-heading" heading="Who it's built for">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.audiences.map((a, i) => {
                    return (
                      <motion.div
                        key={a.role}
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="p-5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                      >
                        <h3 className="mb-3 font-semibold text-sm text-zinc-900 dark:text-zinc-50">{a.role}</h3>
                        <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">{a.description}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </Section>
            )}

            {/* The Problem */}
            <Section label="The Problem" headingId="problem-heading" heading="What needed solving?">
              <div className="rounded-2xl bg-rose-700 dark:bg-rose-900 border border-red-100 dark:border-red-900/60 p-6">
                <p className="text-base text-zinc-50 leading-relaxed">{project.problem}</p>
              </div>
            </Section>

            {/* Solution */}
            <Section label="The Solution" headingId="solution-heading" heading="What I built">
              <div className="rounded-2xl bg-teal-700 dark:bg-teal-950 border border-teal-100 dark:border-teal-900/30 p-6">
                <p className="text-base text-zinc-50 leading-relaxed">{project.solution}</p>
              </div>
            </Section>

            {/* Architecture Overview */}
            {project.architectureOverview && (
              <Section label="Architecture" headingId="arch-heading" heading="How it's structured">
                <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6">
                  <p className="text-base text-zinc-900 dark:text-zinc-50 leading-relaxed mb-6">
                    {project.architectureOverview}
                  </p>
                  {/* Tier diagram */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                    {[
                      { label: 'Node / Express API', color: 'text-violet-700 dark:text-violet-300' },
                      { label: 'MongoDB', color: 'text-emerald-700 dark:text-emerald-300' },
                    ].map((tier, i, arr) => (
                      <div key={tier.label} className="flex flex-col sm:flex-row items-center justify-center">
                        <div className={`text-center ${tier.color}`}>
                          <p className="font-semibold text-sm">{tier.label}</p>
                        </div>
                        {i < arr.length - 1 && (
                          <ArrowRight size={14} className="my-2 sm:my-0 sm:mx-2 text-zinc-900 dark:text-zinc-50 rotate-90 sm:rotate-0 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Section>
            )}

            {/* Key Features */}
            {project.keyFeatures && (
              <Section label="Key Features" headingId="features-heading" heading="What it does">
                <div className="space-y-4">
                  {project.keyFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      variants={fadeUp} initial="hidden" whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      className="flex gap-4 p-5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                    >
                      <CheckCircle size={18} className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" />
                      <div>
                        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 mb-1">{feature.title}</h3>
                        <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {/* Auth Deep Dive */}
            {project.authHighlight && (
              <Section label="Authentication" headingId="auth-heading" heading="How auth works">
                <div className="space-y-6">
                  <div className="rounded-2xl bg-amber-700 dark:bg-amber-950 border border-amber-100 dark:border-amber-900/30 p-6">
                    <p className="text-base text-zinc-50 leading-relaxed">
                      {project.authHighlight.summary}
                    </p>
                  </div>

                  {/* Step-by-step flow */}
                  <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Full auth lifecycle</p>
                    </div>
                    <ol className="divide-y divide-zinc-100 dark:divide-zinc-800">
                      {project.authHighlight.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-4 px-5 py-3.5">
                          <span className="shrink-0 w-5 h-5 rounded-full bg-rose-700 dark:bg-rose-900 text-zinc-50 text-xs font-bold flex items-center justify-center mt-0.5">
                            {i + 1}
                          </span>
                          <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Two-layer auth callout */}
                  <div className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    <div className="flex items-start gap-3 px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                      <ShieldCheck size={16} className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" />
                      <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">Two-layer authorization</p>
                    </div>
                    <div className="px-5 py-4">
                      <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">
                        {project.authHighlight.twoLayerAuth}
                      </p>
                    </div>
                  </div>
                </div>
              </Section>
            )}

            {/* Demo Video */}
            {project.youtubeEmbed && (
              <Section label="Demo" headingId="demo-heading" heading="See it in action">
                <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md aspect-video">
                  <iframe
                    src={project.youtubeEmbed}
                    title={`${project.title} demo video`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </Section>
            )}

            {/* Architecture & UX Decisions */}
            {project.architectureDecisions && (
              <Section label="Architecture & UX Decisions" headingId="decisions-heading" heading="Why I built it this way">
                <div className="space-y-5">
                  {project.architectureDecisions.map((item, index) => (
                    <motion.div
                      key={item.decision}
                      variants={fadeUp} initial="hidden" whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
                      className="rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                    >
                      <div className="flex items-start gap-3 px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
                        <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">{item.decision}</h3>
                      </div>
                      <div className="px-5 py-4">
                        <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-relaxed">{item.reason}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}

            {/* Why It Matters */}
            {project.whyItMatters && (
              <Section label="Impact" headingId="impact-heading" heading="Why it matters">
                <blockquote className="border-l-4 border-rose-500 dark:border-rose-400 pl-6">
                  <p className="text-base text-zinc-900 dark:text-zinc-50 leading-relaxed italic">
                    {project.whyItMatters}
                  </p>
                </blockquote>
              </Section>
            )}

            {/* What This Demonstrates */}
            {project.demonstrates && (
              <Section label="Skills Demonstrated" headingId="demonstrates-heading" heading="What this project proves">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.demonstrates.map((item, index) => (
                    <motion.div
                      key={item}
                      variants={fadeUp} initial="hidden" whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                    >
                      <Star size={14} className="mt-0.5 shrink-0 text-teal-600 dark:text-teal-400" />
                      <p className="text-sm text-zinc-900 dark:text-zinc-50 leading-snug">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* ── Right: sticky sidebar ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">

            {/* Tech Stack */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6"
            >
              <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-50 mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {project.techStack.map((tech) => (
                  <ObjTag key={tech} label={tech} size="xs" />
                ))}
              </div>
            </motion.div>

            {/* Project Links */}
            <motion.div
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 space-y-2.5"
            >
              <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-50 mb-4">Project Links</h3>
              {project.liveUrl ? (
                <Button variant="primary" size="sm" className="w-full justify-center" onClick={() => window.open(project.liveUrl, '_blank')}>
                  <ExternalLink size={13} />Live Demo
                </Button>
              ) : (
                <Button variant="primary" size="sm" className="w-full justify-center opacity-50 cursor-not-allowed" disabled>
                  <ExternalLink size={13} />No live demo
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="secondary" size="sm" className="w-full justify-center" onClick={() => window.open(project.githubUrl, '_blank')}>
                  <Terminal size={13} />View Code
                </Button>
              )}
              {project.backendUrl && (
                <Button variant="ghost" size="sm" className="w-full justify-center" onClick={() => window.open(project.backendUrl, '_blank')}>
                  <Server size={13} />Backend API
                </Button>
              )}
            </motion.div>

          </aside>
        </div>
      </div>

      {/* ── More Projects ─────────────────────────────────── */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
            <div>
              <p className="font-display font-bold text-xl text-zinc-900 dark:text-zinc-50 mb-1">Explore more work</p>
              <p className="text-sm text-zinc-900 dark:text-zinc-50">See the other projects and what I built.</p>
            </div>
            <Button variant="secondary" size="md" onClick={() => window.open('https://github.com/seniork7?tab=repositories', '_blank')}>
              <Terminal size={14} />All Projects
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects
              .filter((p) => p.slug !== slug)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/case-study/${p.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 hover:border-teal-300 dark:hover:border-teal-700 hover:shadow-sm transition-all duration-200"
                >
                  <div className="w-16 h-12 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0 flex items-center justify-center">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <Terminal size={16} className="text-zinc-400 dark:text-zinc-500" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50 truncate">{p.title}</p>
                    <p className="text-xs text-zinc-900 dark:text-zinc-50 truncate">{p.tagline}</p>
                  </div>
                  <ArrowLeft size={14} className="ml-auto shrink-0 rotate-180 text-zinc-900 dark:text-zinc-50 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all duration-200" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
