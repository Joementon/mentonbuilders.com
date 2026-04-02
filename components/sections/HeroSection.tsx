'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const heroImages = [
  { src: '/hero-2.png', alt: 'Vaulted timber beam living room' },
  { src: '/hero-3.png', alt: 'Straw bale and venetian plaster' },
  { src: '/hero-4.png', alt: 'Rammed earth construction' },
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
        {/* Left-to-right gradient for hero text area */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(41,37,30,0.72) 0%, rgba(41,37,30,0.72) 30%, rgba(41,37,30,0.50) 42%, rgba(41,37,30,0.25) 55%, rgba(41,37,30,0.08) 68%, transparent 80%)',
          }}
        />
        {/* Top-down scrim for navbar contrast on all photos */}
        <div
          className="absolute inset-x-0 top-0 h-28"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 60%, transparent 100%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-3xl">
          <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-tight mb-6">
            Built on Experience. <br />
            <span className="text-teal-300">Driven by Craft.</span>
          </h1>
          <p className="text-2xl md:text-3xl text-stone-200 mb-8 max-w-2xl font-light leading-relaxed">
            Design-build for <span className="text-white font-semibold">over 50 years</span> across Mendocino &amp; Sonoma Counties.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="bg-teal-500 text-white px-8 py-4 rounded font-bold hover:bg-teal-400 transition-colors text-center tracking-wide uppercase shadow-lg"
            >
              Start Your Project
            </a>
            <a
              href="/gallery"
              className="border border-white/30 text-white px-8 py-4 rounded font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center gap-2 group"
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
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors flex flex-col items-center gap-2 animate-bounce cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase">Explore</span>
        <ArrowRight className="w-4 h-4 rotate-90" />
      </a>
    </header>
  )
}
