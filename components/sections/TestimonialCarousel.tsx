'use client'

import { Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'Menton Builders turned our vision into reality. Their attention to detail and respect for our timeline was outstanding.',
    name: 'Karen & David L.',
    location: 'Healdsburg, CA',
  },
  {
    quote:
      'From the very first conversation, it was clear they understood building — not just the technical side, but how to communicate and plan with us every step.',
    name: 'Mark T.',
    location: 'Ukiah, CA',
  },
  {
    quote:
      "They helped us navigate a complex hillside build with total professionalism. We couldn't have done it without their pre-construction planning.",
    name: 'Sarah & James R.',
    location: 'Gualala, CA',
  },
  {
    quote:
      'Our ADU was completed on time and on budget. The craftsmanship speaks for itself.',
    name: 'Linda P.',
    location: 'Cloverdale, CA',
  },
]

export default function TestimonialCarousel() {
  return (
    <section id="testimonials" className="bg-stone-100 border-y border-stone-200 py-6 overflow-hidden">
      <div className="relative">
        <div className="flex animate-ticker items-stretch">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[280px] md:w-[300px] px-4"
            >
              <div className="bg-white rounded-lg border border-stone-200 p-5 h-full flex flex-col">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 text-teal-500 fill-teal-500" />
                  ))}
                </div>
                <p className="text-stone-600 text-sm italic leading-relaxed mb-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-stone-400 text-xs font-semibold mt-auto">
                  — {t.name}, {t.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
