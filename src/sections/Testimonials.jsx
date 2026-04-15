import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import testimonials from '../data/testimonials'
import { ObjTag } from '../components/ui/ObjTag'

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [expanded, setExpanded] = useState(new Set())

  const toggle = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const updateIndex = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    updateIndex()
    emblaApi.on('select', updateIndex)
    emblaApi.on('reInit', updateIndex)
    return () => {
      emblaApi.off('select', updateIndex)
      emblaApi.off('reInit', updateIndex)
    }
  }, [emblaApi, updateIndex])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <section
      id="testimonials"
      className="py-20 bg-white dark:bg-black"
      aria-label="Testimonials"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-zinc-900 dark:text-zinc-50 mb-2">
            What Others Say
          </h2>
          <p className="text-base sm:text-lg text-zinc-900 dark:text-zinc-50 leading-relaxed">
            Feedback from teammates and mentors.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Embla viewport */}
          <div className="max-w-2xl mx-auto">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-none w-full px-3"
                  >
                    <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-7 flex flex-col gap-3 h-full">

                      {/* Decorative quote mark */}
                      <div
                        className="text-4xl font-display font-extrabold text-rose-200 dark:text-rose-900 leading-none select-none"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </div>

                      {/* Feedback */}
                      <p className={`text-sm sm:text-base text-zinc-900 dark:text-zinc-50 leading-relaxed italic ${expanded.has(testimonial.id) ? '' : 'line-clamp-3'
                        }`}>
                        {testimonial.feedback}
                      </p>

                      {/* Read more / Show less */}
                      <button
                        onClick={() => toggle(testimonial.id)}
                        className="text-xs text-teal-600 dark:text-teal-400 hover:underline self-start -mt-1"
                      >
                        {expanded.has(testimonial.id) ? 'Show less' : 'Read more'}
                      </button>

                      {/* Strengths */}
                      {testimonial.strengths?.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold tracking-widest uppercase text-zinc-900 dark:text-zinc-50 mb-2">
                            Key Strengths
                          </p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                            {testimonial.strengths.map((s) => (
                              <ObjTag key={s} label={s} size="xs" />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Divider */}
                      <div className="border-t border-zinc-100 dark:border-zinc-800" />

                      {/* Author */}
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center shrink-0">
                            <span className="font-display font-bold text-sm text-white">
                              {testimonial.initials}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-zinc-900 dark:text-zinc-50">
                              {testimonial.name}
                            </p>
                            <p className="text-xs text-zinc-900 dark:text-zinc-50">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>

                        {testimonial.link && (
                          <a
                            href={testimonial.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${testimonial.name} on LinkedIn`}
                            className="flex items-center gap-1.5 text-xs text-zinc-900 dark:text-zinc-50 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 shrink-0"
                          >
                            <ExternalLink size={13} />
                            LinkedIn
                          </a>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls: prev | dots | next */}
          <div className="flex items-center justify-center gap-5 mt-8">

            {/* Prev */}
            <button
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:border-rose-400 hover:text-rose-500 dark:hover:border-rose-500 dark:hover:text-rose-400 transition-colors duration-200"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === selectedIndex
                    ? 'w-5 h-2 bg-rose-500 dark:bg-rose-400'
                    : 'w-2 h-2 bg-zinc-300 dark:bg-zinc-600 hover:bg-zinc-400 dark:hover:bg-zinc-500'
                    }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:border-rose-400 hover:text-rose-500 dark:hover:border-rose-500 dark:hover:text-rose-400 transition-colors duration-200"
            >
              <ChevronRight size={18} />
            </button>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
