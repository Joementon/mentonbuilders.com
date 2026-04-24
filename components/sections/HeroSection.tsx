'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const heroImages = [
  { src: '/hero-4.png', alt: 'Rammed earth construction' },
  { src: '/hero-3.png', alt: 'Straw bale and venetian plaster' },
  { src: '/hero-2.png', alt: 'Vaulted timber beam living room' },
]

export default function HeroSection() {
  const [heroIndex, setHeroIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImages.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            className={`object-cover transition-all duration-[3000ms] ease-in-out ${
              i === heroIndex
                ? 'opacity-100 scale-105'
                : 'opacity-0 scale-100'
            }`}
            sizes="100vw"
            quality={95}
            priority={i === 0}
          />
        ))}
        {/* Left-to-right gradient for hero text area — Charcoal Earth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(47,44,40,0.78) 0%, rgba(47,44,40,0.72) 30%, rgba(47,44,40,0.50) 42%, rgba(47,44,40,0.25) 55%, rgba(47,44,40,0.08) 68%, transparent 80%)',
          }}
        />
        {/* Top-down scrim for navbar contrast on all photos */}
        <div
          className="absolute inset-x-0 top-0 h-28"
          style={{
            background:
              'linear-gradient(to bottom, rgba(47,44,40,0.55) 0%, rgba(47,44,40,0.25) 60%, transparent 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1 className="font-sans text-4xl md:text-6xl font-medium text-ivory leading-tight tracking-tight mb-8">
            We build with the understanding that what we create carries forward &mdash; long after the project is done.
          </h1>
          <p className="text-xl md:text-2xl text-ivory/85 mb-10 max-w-2xl font-light leading-relaxed">
            Three generations. Over 50 years in Northern California. <span className="text-ivory font-medium">We stand behind what we build.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-taupe text-ivory px-8 py-4 rounded-md font-medium tracking-wide hover:bg-charcoal transition-colors text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              Start Your Project
            </a>
            <a
              href="/gallery"
              className="bg-sand/90 text-charcoal px-8 py-4 rounded-md font-medium hover:bg-ivory transition-colors flex items-center justify-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              View Our Work{' '}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#testimonials"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-ivory/60 hover:text-ivory transition-colors flex flex-col items-center gap-2 animate-bounce cursor-pointer"
        aria-label="Scroll to testimonials"
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <ArrowRight className="w-4 h-4 rotate-90" />
      </a>
    </header>
  )
}
