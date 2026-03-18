'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  Menu,
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Shield,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  MessageCircle,
  Star,
} from 'lucide-react'

/* ─── data ──────────────────────────────────────────────────────── */

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
      'They helped us navigate a complex hillside build with total professionalism. We couldn\'t have done it without their pre-construction planning.',
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

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Approach', href: '#approach' },
  { name: 'Testimonials', href: '#testimonials' },
]

/* ─── component ─────────────────────────────────────────────────── */

export default function MentonBuilders() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('residential')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = useCallback(
    () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length),
    []
  )
  const prevTestimonial = useCallback(
    () =>
      setCurrentTestimonial(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      ),
    []
  )

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-slate-800 selection:text-white">
      {/* ── Navigation ── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 ${
                scrolled ? 'bg-slate-800' : 'bg-white'
              } rounded flex items-center justify-center transition-colors`}
            >
              <span
                className={`font-serif font-bold text-xl ${
                  scrolled ? 'text-amber-400' : 'text-slate-800'
                }`}
              >
                M
              </span>
            </div>
            <span
              className={`text-xl font-bold tracking-tight uppercase ${
                scrolled ? 'text-slate-800' : 'text-white'
              }`}
            >
              Menton Builders
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide hover:text-amber-500 transition-colors ${
                  scrolled ? 'text-stone-600' : 'text-stone-200'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="relative bg-amber-500 text-slate-900 px-7 py-2.5 rounded text-sm font-bold hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 tracking-wide uppercase"
            >
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              Get a Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className={scrolled ? 'text-stone-800' : 'text-white'} />
            ) : (
              <Menu className={scrolled ? 'text-stone-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-stone-100 p-6 lg:hidden shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg font-serif text-stone-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                className="bg-amber-500 text-slate-900 text-center py-3 rounded font-bold mt-4 uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                Get a Quote
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop"
            alt="Modern home in the redwoods"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-stone-200 text-xs tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Serving Mendocino &amp; Sonoma Counties
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-tight mb-6">
              Builders Building <br />
              <span className="text-amber-400">What Matters.</span>
            </h1>
            <p className="text-xl text-stone-300 mb-8 max-w-2xl font-light leading-relaxed">
              Design-build rooted in experience, guided by clarity, and built to
              perform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-amber-500 text-slate-900 px-8 py-4 rounded font-bold hover:bg-amber-400 transition-colors text-center tracking-wide uppercase"
              >
                Discuss Your Build
              </a>
              <a
                href="#portfolio"
                className="border border-white/30 text-white px-8 py-4 rounded font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center gap-2 group"
              >
                View Case Studies{' '}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <ArrowRight className="w-4 h-4 rotate-90" />
        </div>
      </header>

      {/* ── Trust / Stats Bar ── */}
      <section className="bg-slate-900 py-12 border-b border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <p className="text-3xl font-serif text-amber-400 mb-1">
                50+ Years
              </p>
              <p className="text-slate-400 text-sm">Of Experience</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-amber-400 mb-1">
                Planning
              </p>
              <p className="text-slate-400 text-sm">
                Thoughtful Pre-construction
              </p>
            </div>
            <div>
              <p className="text-3xl font-serif text-amber-400 mb-1">
                Performance
              </p>
              <p className="text-slate-400 text-sm">
                Durable &amp; Practical
              </p>
            </div>
            <div>
              <p className="text-3xl font-serif text-amber-400 mb-1">
                Craftsmanship
              </p>
              <p className="text-slate-400 text-sm">
                Integrated Design-Build
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── About / Intro Section ── */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2670&auto=format&fit=crop"
                  alt="Architectural details"
                  className="w-full h-[600px] object-cover rounded shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-slate-800 p-8 shadow-xl max-w-xs hidden lg:block rounded">
                  <p className="font-serif text-lg italic text-stone-300">
                    &ldquo;We build what matters and we stand behind how
                    it&rsquo;s built.&rdquo;
                  </p>
                  <div className="w-12 h-0.5 bg-amber-400 mt-4" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="inline-block text-amber-600 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-amber-500 pb-1">
                About Us
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-slate-900 mb-6 leading-tight">
                A fully integrated <br />
                <span className="text-slate-600 italic">process.</span>
              </h2>
              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                At Menton Builders, we approach construction as a fully
                integrated process where planning, design, and execution are
                aligned from the beginning.
              </p>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                With over 50 years of experience, our work is grounded in
                performance, durability, and thoughtful decision-making. We help
                clients navigate the relationship between design, budget, and
                construction, creating a more informed and buildable path from
                concept through completion.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 border border-amber-200">
                    <Shield className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Performance-Based Thinking
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Focusing on how a building functions, endures, and serves
                      its occupants over time. Materials and methods are selected
                      for durability, practicality, and long-term value.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center shrink-0 border border-amber-200">
                    <Check className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">
                      Active Coordination
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Building today requires more than experience alone. It
                      requires clarity, communication, and active coordination.
                      We work closely with clients and design teams to align
                      scope, expectations, and decision-making early.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Tabs ── */}
      <section id="services" className="py-24 bg-stone-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block text-amber-600 text-sm font-bold tracking-widest uppercase mb-4">
              What We Do
            </div>
            <h2 className="font-serif text-4xl text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-stone-600">
              We provide design-build and construction services across
              residential, commercial, and agricultural projects.
            </p>
          </div>

          <div className="flex justify-center mb-12 flex-wrap gap-2">
            {(['residential', 'renovations', 'commercial'] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-slate-800 text-white shadow-lg'
                      : 'bg-white text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tab === 'residential'
                    ? 'Residential'
                    : tab === 'renovations'
                      ? 'Renovations'
                      : 'Commercial & Ag'}
                </button>
              )
            )}
          </div>

          <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-xl min-h-[400px]">
            {activeTab === 'residential' && (
              <div className="grid md:grid-cols-2 h-full">
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="font-serif text-3xl mb-4 text-slate-900">
                    Residential Construction
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    Custom homes, ADUs, and additions built with craftsmanship
                    and a deep respect for long-term performance.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Custom homes tailored to your site',
                      'Accessory Dwelling Units (ADUs)',
                      'Thoughtful residential additions',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm font-medium text-stone-700"
                      >
                        <Check className="w-4 h-4 text-amber-500" /> {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="text-slate-800 font-bold text-sm border-b-2 border-amber-500 inline-block w-fit pb-1 hover:text-amber-600 transition-colors"
                  >
                    Start a Conversation
                  </a>
                </div>
                <div className="bg-stone-200 h-64 md:h-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Custom Home"
                  />
                </div>
              </div>
            )}

            {activeTab === 'renovations' && (
              <div className="grid md:grid-cols-2 h-full">
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="font-serif text-3xl mb-4 text-slate-900">
                    Renovations &amp; Upgrades
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    Full remodels and structural upgrades that honor the original
                    architecture while improving livability, flow, and modern
                    efficiency.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Full home remodels',
                      'Structural and seismic upgrades',
                      'Performance-focused modernizations',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm font-medium text-stone-700"
                      >
                        <Check className="w-4 h-4 text-amber-500" /> {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="text-slate-800 font-bold text-sm border-b-2 border-amber-500 inline-block w-fit pb-1 hover:text-amber-600 transition-colors"
                  >
                    Discuss Your Remodel
                  </a>
                </div>
                <div className="bg-stone-200 h-64 md:h-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2671&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Kitchen Remodel"
                  />
                </div>
              </div>
            )}

            {activeTab === 'commercial' && (
              <div className="grid md:grid-cols-2 h-full">
                <div className="p-12 flex flex-col justify-center">
                  <h3 className="font-serif text-3xl mb-4 text-slate-900">
                    Commercial &amp; Agricultural
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    We build functional, durable structures and specialize in
                    adaptive reuse — repurposing existing buildings for new
                    commercial life.
                  </p>
                  <ul className="space-y-3 mb-8">
                    {[
                      'Functional agricultural structures',
                      'Adaptive reuse & repurposing',
                      'Durable commercial spaces',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-sm font-medium text-stone-700"
                      >
                        <Check className="w-4 h-4 text-amber-500" /> {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="text-slate-800 font-bold text-sm border-b-2 border-amber-500 inline-block w-fit pb-1 hover:text-amber-600 transition-colors"
                  >
                    Explore Options
                  </a>
                </div>
                <div className="bg-stone-200 h-64 md:h-auto">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2672&auto=format&fit=crop"
                    className="w-full h-full object-cover"
                    alt="Commercial Building"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Case Studies / Portfolio ── */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block text-amber-600 text-sm font-bold tracking-widest uppercase mb-4">
                Selected Works
              </div>
              <h2 className="font-serif text-4xl text-slate-900 mb-4">
                Recent Projects
              </h2>
              <p className="text-stone-500 max-w-2xl">
                The work should speak for itself. Minimal, intentional, and
                grounded.
              </p>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-stone-500 hover:text-amber-600 transition-colors font-medium"
            >
              View Full Portfolio <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop',
                alt: 'Healdsburg Estate',
                type: 'New Construction',
                name: 'The Ridge Estate',
                loc: 'Healdsburg, CA',
                tags: ['Off-Grid Capable', 'Modern Barn'],
              },
              {
                img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2680&auto=format&fit=crop',
                alt: 'Mendocino Coastal',
                type: 'Full Renovation',
                name: 'Coastal Retreat',
                loc: 'Gualala, CA',
                tags: ['Site Restoration', 'Deck Integration'],
              },
              {
                img: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2670&auto=format&fit=crop',
                alt: 'ADU Project',
                type: 'ADU / Addition',
                name: 'Vineyard Guest House',
                loc: 'Ukiah, CA',
                tags: ['Passive Solar', '800 Sq Ft'],
              },
            ].map((project) => (
              <div key={project.name} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 rounded">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.img}
                    alt={project.alt}
                    className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-800">
                    {project.type}
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                  {project.name}
                </h3>
                <p className="text-stone-500 text-sm mb-3">{project.loc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-stone-100 px-2.5 py-1 text-stone-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial Carousel ── */}
      <section id="testimonials" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-4">
            <div className="inline-block text-amber-400 text-sm font-bold tracking-widest uppercase mb-4">
              Client Stories
            </div>
            <h2 className="font-serif text-4xl mb-12">
              What Our Clients Say
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative min-h-[280px] flex items-center">
              <div className="text-center w-full">
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>

                <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed mb-8 text-stone-200 italic">
                  &ldquo;{testimonials[currentTestimonial].quote}&rdquo;
                </blockquote>

                <div className="mb-2">
                  <p className="font-bold text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-slate-400 text-sm">
                    {testimonials[currentTestimonial].project} &middot;{' '}
                    {testimonials[currentTestimonial].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors text-slate-400"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentTestimonial
                        ? 'w-8 bg-amber-400'
                        : 'w-2 bg-slate-600 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center hover:border-amber-400 hover:text-amber-400 transition-colors text-slate-400"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Regional Focus Quote ── */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mb-8" />
            <h3 className="text-xl md:text-2xl font-serif leading-relaxed text-slate-700 mb-6">
              Menton Builders brings a design-build approach rooted in over 50
              years of experience to projects throughout Sonoma County, including
              Healdsburg and surrounding wine country communities.
            </h3>
            <p className="text-stone-500 text-base max-w-2xl mx-auto">
              Our work reflects thoughtful design, high-performance
              construction, and respect for architectural context.
            </p>
            <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-8" />
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="py-24 bg-white" id="approach">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-block text-amber-600 text-sm font-bold tracking-widest uppercase mb-4">
                How We Work
              </div>
              <h2 className="font-serif text-4xl text-slate-900 mb-6">
                Our Approach
              </h2>
              <p className="text-stone-600 text-lg mb-10">
                Every project is different, but our approach remains consistent:
                align early, build thoughtfully, and guide the process with
                clarity.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: '01',
                    title: 'Pre-Construction',
                    desc: 'Define scope, align budget, and assemble the right team from the start.',
                  },
                  {
                    num: '02',
                    title: 'Design Coordination',
                    desc: 'Maintain clear alignment between design intent, project cost, and constructability.',
                  },
                  {
                    num: '03',
                    title: 'Construction',
                    desc: 'Execute with craftsmanship while seamlessly coordinating trades and project decisions.',
                  },
                  {
                    num: '04',
                    title: 'Completion',
                    desc: 'Deliver a finished project that reflects both the original vision and long-term performance.',
                  },
                ].map((step) => (
                  <div key={step.num} className="flex gap-5 group">
                    <div className="w-14 h-14 bg-slate-800 flex items-center justify-center rounded shrink-0 group-hover:bg-amber-500 transition-colors">
                      <span className="font-serif font-bold text-amber-400 group-hover:text-slate-900 transition-colors">
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1 text-lg">
                        {step.title}
                      </h4>
                      <p className="text-stone-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Regional Focus Card */}
              <div className="bg-slate-800 p-8 lg:p-12 shadow-xl rounded border-l-4 border-amber-500 text-white flex-1">
                <h3 className="font-serif text-2xl mb-6">Regional Focus</h3>
                <p className="text-slate-300 mb-8">
                  Our work is based in Northern California, thoughtfully
                  integrating structures into these environments:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    {['Mendocino County', 'Sonoma County', 'Healdsburg'].map(
                      (loc) => (
                        <li
                          key={loc}
                          className="flex items-center gap-2 text-stone-200 font-medium"
                        >
                          <MapPin className="w-4 h-4 text-amber-400" /> {loc}
                        </li>
                      )
                    )}
                  </ul>
                  <ul className="space-y-3">
                    {['Wine Country', 'Coastal Regions'].map((loc) => (
                      <li
                        key={loc}
                        className="flex items-center gap-2 text-stone-200 font-medium"
                      >
                        <MapPin className="w-4 h-4 text-amber-400" /> {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick CTA Card */}
              <div className="bg-amber-500 p-8 rounded shadow-xl">
                <h3 className="font-serif text-2xl text-slate-900 mb-3">
                  Ready to Start?
                </h3>
                <p className="text-slate-800 mb-6">
                  Tell us about your project and we&rsquo;ll help you determine
                  the next right step.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded font-bold hover:bg-slate-800 transition-colors group"
                >
                  Get in Touch{' '}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section
        id="contact"
        className="py-24 bg-stone-50 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-50/50 hidden lg:block -skew-x-12 translate-x-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block text-amber-600 text-sm font-bold tracking-widest uppercase mb-4">
                Contact
              </div>
              <h2 className="font-serif text-4xl text-slate-900 mb-4">
                Start Your Project
              </h2>
              <p className="text-stone-600">
                Tell us about your vision. We&rsquo;ll help you determine the
                next right step.
              </p>
            </div>

            <form className="bg-white shadow-2xl p-8 md:p-12 rounded border border-stone-200">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b-2 border-stone-200 py-2 focus:outline-none focus:border-amber-500 transition-colors bg-transparent"
                    placeholder="First Last"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border-b-2 border-stone-200 py-2 focus:outline-none focus:border-amber-500 transition-colors bg-transparent"
                    placeholder="email@address.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border-b-2 border-stone-200 py-2 focus:outline-none focus:border-amber-500 transition-colors bg-transparent"
                    placeholder="(707) 555-0123"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Project Location (City)
                  </label>
                  <input
                    type="text"
                    className="w-full border-b-2 border-stone-200 py-2 focus:outline-none focus:border-amber-500 transition-colors bg-transparent"
                    placeholder="e.g. Covelo, Healdsburg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Project Type
                  </label>
                  <select className="w-full border-b-2 border-stone-200 py-2 bg-transparent focus:outline-none focus:border-amber-500 transition-colors text-stone-700">
                    <option>Custom Home Build</option>
                    <option>Major Renovation</option>
                    <option>ADU / Addition</option>
                    <option>Commercial / Barn</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Estimated Budget
                  </label>
                  <select className="w-full border-b-2 border-stone-200 py-2 bg-transparent focus:outline-none focus:border-amber-500 transition-colors text-stone-700">
                    <option>$250k - $500k</option>
                    <option>$500k - $1M</option>
                    <option>$1M - $3M</option>
                    <option>$3M+</option>
                  </select>
                </div>
              </div>

              <div className="mb-8 space-y-2">
                <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                  Project Details / Goals
                </label>
                <textarea
                  className="w-full border-2 border-stone-200 p-4 rounded focus:outline-none focus:border-amber-500 transition-colors h-32 bg-transparent"
                  placeholder="Tell us about your timeline, lot status, and design vision..."
                />
              </div>

              <button
                type="button"
                className="w-full bg-amber-500 text-slate-900 py-4 font-bold tracking-widest uppercase hover:bg-amber-400 transition-colors shadow-lg rounded text-lg"
              >
                Submit Inquiry
              </button>
              <p className="text-center text-xs text-stone-400 mt-4">
                We respect your privacy. Your information is never shared.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-9 h-9 bg-white rounded flex items-center justify-center">
                  <span className="font-serif font-bold text-xl text-slate-900">
                    M
                  </span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white uppercase">
                  Menton Builders
                </span>
              </div>
              <p className="max-w-md text-slate-500 mb-4">
                For over 50 years, Menton Builders has approached construction
                through a design-build mindset grounded in planning,
                performance, and craftsmanship.
              </p>
              <p className="max-w-md text-amber-500/80 font-serif italic text-lg">
                &ldquo;We build what matters and we stand behind how it&rsquo;s
                built.&rdquo;
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                Contact
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>
                    PO Box 1234
                    <br />
                    Ukiah, CA 95482
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>(707) 555-0199</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>build@mentonbuilders.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                License &amp; Certs
              </h4>
              <ul className="space-y-2 text-sm">
                <li>CA License #XXXXXX (B-General)</li>
                <li>Bonded &amp; Insured</li>
                <li>EPA Lead-Safe Certified</li>
                <li className="pt-4 text-xs text-slate-600">
                  &copy; 2026 Menton Builders Inc.
                  <br />
                  All rights reserved.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Floating Contact Widget (Bottom Right) ── */}
      <div className="fixed bottom-6 right-6 z-50">
        {contactOpen && (
          <div className="mb-4 bg-white rounded-xl shadow-2xl border border-stone-200 w-80 overflow-hidden">
            <div className="bg-slate-800 p-4 text-white">
              <h4 className="font-bold text-lg">Quick Contact</h4>
              <p className="text-slate-300 text-sm">
                We&rsquo;ll get back to you within 24 hours.
              </p>
            </div>
            <div className="p-4 space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500"
              />
              <textarea
                placeholder="How can we help?"
                rows={3}
                className="w-full border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-amber-500 resize-none"
              />
              <button
                type="button"
                className="w-full bg-amber-500 text-slate-900 py-2.5 rounded font-bold text-sm hover:bg-amber-400 transition-colors"
              >
                Send Message
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => setContactOpen(!contactOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 ${
            contactOpen
              ? 'bg-slate-800 text-white rotate-0'
              : 'bg-amber-500 text-slate-900'
          }`}
        >
          {contactOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  )
}
