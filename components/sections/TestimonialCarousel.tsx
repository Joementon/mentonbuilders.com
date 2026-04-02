'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Menton Builders turned our vision into reality. Their attention to detail and respect for our timeline was outstanding.',
    name: 'Karen & David L.',
    location: 'Healdsburg, CA',
    project: 'Custom Estate Home',
  },
  {
    quote:
      'From the very first conversation, it was clear they understood building — not just the technical side, but how to communicate and plan with us every step.',
    name: 'Mark T.',
    location: 'Ukiah, CA',
    project: 'Full Home Renovation',
  },
  {
    quote:
      "They helped us navigate a complex hillside build with total professionalism. We couldn't have done it without their pre-construction planning.",
    name: 'Sarah & James R.',
    location: 'Gualala, CA',
    project: 'Coastal New Construction',
  },
  {
    quote:
      'Our ADU was completed on time and on budget. The craftsmanship speaks for itself.',
    name: 'Linda P.',
    location: 'Cloverdale, CA',
    project: 'Accessory Dwelling Unit',
  },
]

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  return (
    <section
      id="testimonials"
      className="py-20 md:py-28 bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center relative">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, s) => (
              <Star key={s} className="w-5 h-5 text-teal-600 fill-teal-600" />
            ))}
          </div>

          {/* Quote */}
          <div className="min-h-[160px] flex items-center justify-center">
            <div>
              <p className="font-serif text-2xl md:text-3xl italic text-stone-700 leading-relaxed mb-6 transition-opacity duration-500">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <p className="text-stone-500 font-semibold text-sm">
                — {testimonials[current].name}, {testimonials[current].location}
              </p>
              <p className="text-stone-400 text-xs mt-1">
                {testimonials[current].project}
              </p>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5 text-stone-600" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5 text-stone-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current
                    ? 'bg-teal-600 w-6'
                    : 'bg-stone-300 hover:bg-stone-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
