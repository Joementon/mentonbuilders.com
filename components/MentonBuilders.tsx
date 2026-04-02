'use client'

import React, { useState, useEffect, FormEvent } from 'react'
import Image from 'next/image'
import {
  Menu,
  X,
  Check,
  ArrowRight,
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

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Approach', href: '#approach' },
  { name: 'Gallery', href: '/gallery' },
]

const heroImages = [
  { src: '/hero-1.png', alt: 'Beautiful lines' },
  { src: '/hero-3.png', alt: 'Straw bale and venetian plaster' },
  { src: '/hero-4.png', alt: 'Rammed earth construction' },
]

/* ─── component ─────────────────────────────────────────────────── */

export default function MentonBuilders() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('residential')
  const [contactOpen, setContactOpen] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)

  // Main contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    projectType: 'Custom Home Build',
    budget: '$250k - $500k',
    details: '',
  })
  const [isInternational, setIsInternational] = useState(false)
  const [phoneCountry, setPhoneCountry] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  // Quick contact widget state
  const [quickForm, setQuickForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [quickStatus, setQuickStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const COUNTRY_CODES: Record<string, { name: string; code: string; digits: number }> = {
    '1': { name: 'US/Canada', code: '+1', digits: 10 },
    '44': { name: 'United Kingdom', code: '+44', digits: 10 },
    '61': { name: 'Australia', code: '+61', digits: 9 },
    '49': { name: 'Germany', code: '+49', digits: 11 },
    '33': { name: 'France', code: '+33', digits: 9 },
    '52': { name: 'Mexico', code: '+52', digits: 10 },
    '81': { name: 'Japan', code: '+81', digits: 10 },
    '86': { name: 'China', code: '+86', digits: 11 },
    '91': { name: 'India', code: '+91', digits: 10 },
    '39': { name: 'Italy', code: '+39', digits: 10 },
    '34': { name: 'Spain', code: '+34', digits: 9 },
    '55': { name: 'Brazil', code: '+55', digits: 11 },
    '7': { name: 'Russia', code: '+7', digits: 10 },
    '82': { name: 'South Korea', code: '+82', digits: 10 },
    '31': { name: 'Netherlands', code: '+31', digits: 9 },
    '46': { name: 'Sweden', code: '+46', digits: 9 },
    '41': { name: 'Switzerland', code: '+41', digits: 9 },
    '64': { name: 'New Zealand', code: '+64', digits: 9 },
    '353': { name: 'Ireland', code: '+353', digits: 9 },
    '972': { name: 'Israel', code: '+972', digits: 9 },
  }

  function detectCountry(digits: string): { name: string; code: string; digits: number } | null {
    // Try 3-digit, then 2-digit, then 1-digit country codes
    for (const len of [3, 2, 1]) {
      const prefix = digits.slice(0, len)
      if (COUNTRY_CODES[prefix]) return COUNTRY_CODES[prefix]
    }
    return null
  }

  function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '')
    if (isInternational) {
      const country = detectCountry(digits)
      if (country) {
        const national = digits.slice(country.code.replace('+', '').length)
        return `${country.code} ${national}`
      }
      return `+${digits}`
    }
    // US: strip leading 1
    const d = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits
    if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
    return raw
  }

  function validatePhone(raw: string): string | null {
    const digits = raw.replace(/\D/g, '')
    if (!raw.trim()) return 'Phone number is required'
    if (isInternational) {
      const country = detectCountry(digits)
      if (!country) return 'Unrecognized country code'
      const national = digits.slice(country.code.replace('+', '').length)
      if (national.length < 7 || national.length > 12) return `Invalid number for ${country.name}`
      return null
    }
    const d = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits
    if (d.length !== 10) return 'Enter a valid 10-digit phone number'
    return null
  }

  function handlePhoneBlur() {
    const digits = formData.phone.replace(/\D/g, '')
    if (!digits) return
    const error = validatePhone(formData.phone)
    if (error) {
      setFormErrors({ ...formErrors, phone: error })
    } else {
      const formatted = formatPhone(formData.phone)
      setFormData({ ...formData, phone: formatted })
      setFormErrors({ ...formErrors, phone: '' })
      if (isInternational) {
        const country = detectCountry(digits)
        setPhoneCountry(country?.name || '')
      } else {
        setPhoneCountry('US')
      }
    }
  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!emailRegex.test(formData.email.trim())) errors.email = 'Enter a valid email address'
    const phoneError = validatePhone(formData.phone)
    if (phoneError) errors.phone = phoneError
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmitInquiry(e: FormEvent) {
    e.preventDefault()
    if (!validateForm()) return
    setFormStatus('sending')
    const formatted = formatPhone(formData.phone)
    const submissionData = {
      ...formData,
      phone: formatted,
      isInternational,
      phoneCountry: isInternational ? (detectCountry(formData.phone.replace(/\D/g, ''))?.name || 'Unknown') : 'US',
    }
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })
      if (!res.ok) throw new Error()
      setFormStatus('sent')
      setFormErrors({})
      setFormData({ name: '', email: '', phone: '', location: '', projectType: 'Custom Home Build', budget: '$250k - $500k', details: '' })
      setIsInternational(false)
      setPhoneCountry('')
    } catch {
      setFormStatus('error')
    }
  }

  async function handleQuickContact(e: FormEvent) {
    e.preventDefault()
    setQuickStatus('sending')
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: quickForm.name,
          email: quickForm.email,
          phone: quickForm.phone,
          projectType: 'Quick Contact',
          budget: 'N/A',
          details: quickForm.message,
        }),
      })
      if (!res.ok) throw new Error()
      setQuickStatus('sent')
      setQuickForm({ name: '', email: '', phone: '', message: '' })
    } catch {
      setQuickStatus('error')
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])


  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      {/* ── Navigation ── */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3">
            <Image
              src="/logo-nav.png"
              alt="Menton Builders"
              width={160}
              height={46}
              className="h-9 w-auto"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide hover:text-teal-500 transition-colors ${
                  scrolled ? 'text-stone-600' : 'text-stone-200'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="relative bg-teal-600 text-white px-7 py-2.5 rounded text-sm font-bold hover:bg-teal-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 tracking-wide uppercase"
            >
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-300 rounded-full animate-pulse" />
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
                className="bg-teal-600 text-white text-center py-3 rounded font-bold mt-4 uppercase tracking-wide"
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
          {heroImages.map((img, i) => (
            <img
              key={img.src}
              src={img.src}
              alt={img.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-[3000ms] ease-in-out ${
                i === heroIndex
                  ? 'opacity-100 scale-105'
                  : 'opacity-0 scale-100'
              }`}
            />
          ))}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(4,47,46,0.92) 0%, rgba(4,47,46,0.92) 33%, rgba(15,23,42,0.4) 55%, transparent 70%)' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-stone-200 text-xs tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Serving Mendocino &amp; Sonoma Counties
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-tight mb-6">
              Built on Experience. <br />
              <span className="text-teal-300">Driven by Craft.</span>
            </h1>
            <p className="text-xl text-stone-300 mb-8 max-w-2xl font-light leading-relaxed">
              For over 50 years, Menton Builders has delivered thoughtful,
              lasting construction across Northern California.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-teal-500 text-white px-8 py-4 rounded font-bold hover:bg-teal-400 transition-colors text-center tracking-wide uppercase shadow-lg"
              >
                Start Your Project
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
        <a
          href="#about"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors flex flex-col items-center gap-2 animate-bounce cursor-pointer"
        >
          <span className="text-xs tracking-widest uppercase">Explore</span>
          <ArrowRight className="w-4 h-4 rotate-90" />
        </a>
      </header>

      {/* ── Testimonials Ticker ── */}
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

      {/* ── Trust / Stats Bar ── */}
      <section className="bg-teal-900 py-12 border-b border-teal-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <p className="text-3xl font-serif text-teal-300 mb-1">
                50+ Years
              </p>
              <p className="text-teal-100/50 text-sm">Of Experience</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-teal-300 mb-1">
                Planning
              </p>
              <p className="text-teal-100/50 text-sm">
                Thoughtful Pre-construction
              </p>
            </div>
            <div>
              <p className="text-3xl font-serif text-teal-300 mb-1">
                Performance
              </p>
              <p className="text-teal-100/50 text-sm">
                Durable &amp; Practical
              </p>
            </div>
            <div>
              <p className="text-3xl font-serif text-teal-300 mb-1">
                Craftsmanship
              </p>
              <p className="text-teal-100/50 text-sm">
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
                <div className="absolute -bottom-6 -right-6 bg-teal-900 p-8 shadow-xl max-w-xs hidden lg:block rounded">
                  <p className="font-serif text-lg italic text-teal-100">
                    &ldquo;We build what matters and we stand behind how
                    it&rsquo;s built.&rdquo;
                  </p>
                  <div className="w-12 h-0.5 bg-teal-400 mt-4" />
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="inline-block text-teal-700 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-teal-500 pb-1">
                About Us
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
                Why <span className="text-teal-700 italic">Menton Builders</span>
              </h2>
              <p className="text-stone-600 text-lg mb-6 leading-relaxed">
                Menton Builders is a design-build firm specializing in high-end
                residential construction. We work closely with homeowners and
                architects to bring clarity to complex projects — aligning
                design, budget, and construction from the beginning.
              </p>
              <p className="text-stone-600 text-lg mb-4 leading-relaxed">
                We approach every project with a clear understanding of scope,
                sequencing, and responsibility. Our communication is direct, and
                our goal is simple — deliver construction that holds up over
                time, and relationships that do the same.
              </p>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                With over 50 years of experience behind us, we bring both proven
                methods and a forward-thinking approach to every project.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                    <Shield className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      Built to Last
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Materials and methods are selected for durability,
                      practicality, and long-term value. We focus on how a
                      building performs and endures — not just how it looks on
                      day one.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                    <Check className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      Organized &amp; Direct
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Our work is organized, our communication is direct. We
                      coordinate with clients and design teams early to align
                      scope, expectations, and decision-making — so there are
                      fewer surprises down the road.
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
            <div className="inline-block text-teal-600 text-sm font-bold tracking-widest uppercase mb-4">
              What We Do
            </div>
            <h2 className="font-serif text-4xl text-stone-900 mb-4">
              Our Services
            </h2>
            <p className="text-stone-600">
              We provide full-service construction through a design-build
              approach, allowing for a more streamlined and coordinated
              process. Our services include pre-construction planning,
              budgeting, project management, and full-scale residential
              construction.
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
                      ? 'bg-teal-700 text-white shadow-lg'
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
                  <h3 className="font-serif text-3xl mb-4 text-teal-900">
                    Residential Construction
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    Custom homes, ADUs, and additions — planned carefully and
                    built to perform for decades. We align all phases early to
                    reduce uncertainty and create a more efficient path from
                    concept to completion.
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
                        <Check className="w-4 h-4 text-teal-500" /> {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="text-teal-700 font-bold text-sm border-b-2 border-teal-500 inline-block w-fit pb-1 hover:text-teal-500 transition-colors"
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
                  <h3 className="font-serif text-3xl mb-4 text-teal-900">
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
                        <Check className="w-4 h-4 text-teal-500" /> {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="text-teal-700 font-bold text-sm border-b-2 border-teal-500 inline-block w-fit pb-1 hover:text-teal-500 transition-colors"
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
                  <h3 className="font-serif text-3xl mb-4 text-teal-900">
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
                        <Check className="w-4 h-4 text-teal-500" /> {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="text-teal-700 font-bold text-sm border-b-2 border-teal-500 inline-block w-fit pb-1 hover:text-teal-500 transition-colors"
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
              <div className="inline-block text-teal-600 text-sm font-bold tracking-widest uppercase mb-4">
                Selected Works
              </div>
              <h2 className="font-serif text-4xl text-stone-900 mb-4">
                Recent Projects
              </h2>
              <p className="text-stone-500 max-w-2xl">
                Each project reflects a commitment to quality, coordination,
                and lasting construction.
              </p>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-stone-500 hover:text-teal-600 transition-colors font-medium"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-800">
                    {project.type}
                  </div>
                </div>
                <h3 className="font-serif text-2xl text-stone-900 mb-1 group-hover:text-teal-600 transition-colors">
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


      {/* ── Regional Focus Quote ── */}
      <section className="bg-stone-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-teal-500 mx-auto mb-8" />
            <h3 className="text-xl md:text-2xl font-serif leading-relaxed text-stone-700 mb-6">
              Built on a foundation established over generations, Menton
              Builders continues to evolve while staying grounded in the
              principles that have defined our work from the beginning.
            </h3>
            <p className="text-stone-500 text-base max-w-2xl mx-auto">
              Menton Builders was founded on a commitment to quality,
              accountability, and long-term relationships. Over the past 50
              years, that foundation has shaped a body of work defined by
              consistency, attention to detail, and trust.
            </p>
            <div className="w-16 h-0.5 bg-teal-500 mx-auto mt-8" />
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="py-24 bg-white" id="approach">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <div className="inline-block text-teal-600 text-sm font-bold tracking-widest uppercase mb-4">
                How We Work
              </div>
              <h2 className="font-serif text-4xl text-stone-900 mb-6">
                Our Process
              </h2>
              <p className="text-stone-600 text-lg mb-4">
                Every project is carefully planned, tracked, and communicated
                from start to finish.
              </p>
              <p className="text-stone-600 text-lg mb-10">
                We coordinate trades, monitor daily progress, and address issues
                early — so the work moves forward with clarity and intention.
                This approach maintains alignment between design, budget, and
                execution throughout the entire project.
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
                    desc: 'Execute with craftsmanship while coordinating trades, tracking progress daily, and addressing issues early.',
                  },
                  {
                    num: '04',
                    title: 'Completion',
                    desc: 'Deliver a finished project that reflects both the original vision and long-term performance.',
                  },
                ].map((step) => (
                  <div key={step.num} className="flex gap-5 group">
                    <div className="w-14 h-14 bg-teal-800 flex items-center justify-center rounded shrink-0 group-hover:bg-teal-500 transition-colors">
                      <span className="font-serif font-bold text-teal-300 group-hover:text-white transition-colors">
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1 text-lg">
                        {step.title}
                      </h4>
                      <p className="text-stone-500">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="bg-teal-900 p-8 lg:p-12 shadow-xl rounded border-l-4 border-teal-400 text-white flex-1">
                <h3 className="font-serif text-2xl mb-6">Regional Focus</h3>
                <p className="text-teal-200/80 mb-8">
                  Our work is based in Northern California, thoughtfully
                  integrating structures into these environments:
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <ul className="space-y-3">
                    {['Mendocino County', 'Sonoma County', 'Healdsburg'].map(
                      (loc) => (
                        <li
                          key={loc}
                          className="flex items-center gap-2 text-teal-100 font-medium"
                        >
                          <MapPin className="w-4 h-4 text-teal-400" /> {loc}
                        </li>
                      )
                    )}
                  </ul>
                  <ul className="space-y-3">
                    {['Wine Country', 'Coastal Regions'].map((loc) => (
                      <li
                        key={loc}
                        className="flex items-center gap-2 text-teal-100 font-medium"
                      >
                        <MapPin className="w-4 h-4 text-teal-400" /> {loc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-teal-600 p-8 rounded shadow-xl">
                <h3 className="font-serif text-2xl text-white mb-3">
                  Ready to Start?
                </h3>
                <p className="text-teal-100 mb-6">
                  Tell us about your project and we&rsquo;ll help you determine
                  the next right step.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-white text-teal-800 px-6 py-3 rounded font-bold hover:bg-teal-50 transition-colors group"
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
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-50/50 hidden lg:block -skew-x-12 translate-x-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block text-teal-600 text-sm font-bold tracking-widest uppercase mb-4">
                Contact
              </div>
              <h2 className="font-serif text-4xl text-stone-900 mb-4">
                Start Your Project
              </h2>
              <p className="text-stone-600">
                Tell us about your project. We&rsquo;ll help you determine the
                next right step — no pressure, no obligation.
              </p>
            </div>

            {formStatus === 'sent' ? (
              <div className="bg-white shadow-2xl p-8 md:p-12 rounded border border-stone-200 text-center">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-serif text-2xl text-stone-900 mb-3">Inquiry Received</h3>
                <p className="text-stone-600 mb-6">Thank you! We&rsquo;ll review your project details and get back to you within 24 hours.</p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="text-teal-600 font-bold text-sm uppercase tracking-wider hover:text-teal-500"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmitInquiry} className="shadow-2xl rounded-lg overflow-hidden border border-stone-200">
              {/* ── Required Section ── */}
              <div className="bg-white p-8 md:p-12">
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700">Your Information</h3>
                  <span className="text-xs text-red-400 font-medium">* Required</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: '' }) }}
                      className={`w-full border-b-2 py-2 focus:outline-none transition-colors bg-transparent ${formErrors.name ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-teal-500'}`}
                      placeholder="First Last"
                    />
                    {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: '' }) }}
                      className={`w-full border-b-2 py-2 focus:outline-none transition-colors bg-transparent ${formErrors.email ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-teal-500'}`}
                      placeholder="email@address.com"
                    />
                    {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setFormErrors({ ...formErrors, phone: '' }) }}
                      onBlur={handlePhoneBlur}
                      className={`w-full border-b-2 py-2 focus:outline-none transition-colors bg-transparent ${formErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-teal-500'}`}
                      placeholder={isInternational ? '+44 7911 123456' : '(707) 468-8814'}
                    />
                    {formErrors.phone && <p className="text-xs text-red-500">{formErrors.phone}</p>}
                    {phoneCountry && !formErrors.phone && <p className="text-xs text-teal-600">{phoneCountry}</p>}
                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isInternational}
                        onChange={(e) => { setIsInternational(e.target.checked); setPhoneCountry(''); setFormErrors({ ...formErrors, phone: '' }) }}
                        className="w-3.5 h-3.5 rounded border-stone-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-xs text-stone-400">International number</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Project Location (City) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full border-b-2 border-stone-200 py-2 focus:outline-none focus:border-teal-500 transition-colors bg-transparent"
                      placeholder="e.g. Covelo, Healdsburg"
                    />
                  </div>
                </div>
              </div>

              {/* ── Optional Section ── */}
              <div className="bg-stone-50 p-8 md:p-12 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400">Project Details</h3>
                  <span className="text-xs text-stone-400 font-medium">Optional</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full border-b-2 border-stone-200 py-2 bg-transparent focus:outline-none focus:border-teal-500 transition-colors text-stone-700"
                    >
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
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full border-b-2 border-stone-200 py-2 bg-transparent focus:outline-none focus:border-teal-500 transition-colors text-stone-700"
                    >
                      <option>$250k - $500k</option>
                      <option>$500k - $1M</option>
                      <option>$1M - $3M</option>
                      <option>$3M+</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Project Details / Goals
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full border-2 border-stone-200 p-4 rounded focus:outline-none focus:border-teal-500 transition-colors h-32 bg-white"
                    placeholder="Tell us about your timeline, lot status, and design vision..."
                  />
                </div>
              </div>

              {/* ── Submit ── */}
              <div className="bg-white p-8 md:px-12 md:py-8 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-teal-600 text-white py-4 font-bold tracking-widest uppercase hover:bg-teal-500 transition-colors shadow-lg rounded text-lg disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Submit Inquiry'}
                </button>
                {formStatus === 'error' && (
                  <p className="text-center text-sm text-red-500 mt-4">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}
                <p className="text-center text-xs text-stone-400 mt-4">
                  We respect your privacy. Your information is never shared.
                </p>
              </div>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-teal-950 text-teal-300/60 py-16 border-t border-teal-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="mb-6">
                <Image
                  src="/logo-nav.png"
                  alt="Menton Builders"
                  width={200}
                  height={57}
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <p className="max-w-md text-teal-300/50 mb-4">
                Menton Builders was founded on a commitment to quality,
                accountability, and long-term relationships. Today, the company
                continues to build on that legacy — combining 50 years of
                experience with a modern, organized approach to construction.
              </p>
              <p className="max-w-md text-teal-400/70 font-serif italic text-lg mb-3">
                &ldquo;We build what matters and we stand behind how it&rsquo;s
                built.&rdquo;
              </p>
              <p className="text-teal-300/40 text-sm">
                Serving Mendocino County, Healdsburg, and Sonoma County.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">
                Contact
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-500 shrink-0" />
                  <span>
                    PO Box 1234
                    <br />
                    Ukiah, CA 95482
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                  <span>(707) 468-8814</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-500 shrink-0" />
                  <span>aimee@mentonbuilders.com</span>
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
                <li className="pt-4 text-xs text-teal-300/30">
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
            <div className="bg-teal-800 p-4 text-white">
              <h4 className="font-bold text-lg">Quick Contact</h4>
              <p className="text-teal-200 text-sm">
                We&rsquo;ll get back to you within 24 hours.
              </p>
            </div>
            {quickStatus === 'sent' ? (
              <div className="p-6 text-center">
                <Check className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                <p className="text-stone-700 font-medium">Message sent!</p>
                <button type="button" onClick={() => setQuickStatus('idle')} className="text-teal-600 text-sm mt-2 font-bold">
                  Send Another
                </button>
              </div>
            ) : (
            <form onSubmit={handleQuickContact} className="p-4 space-y-3">
              <input
                type="text"
                required
                placeholder="Your name"
                value={quickForm.name}
                onChange={(e) => setQuickForm({ ...quickForm, name: e.target.value })}
                className="w-full border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
              />
              <input
                type="email"
                required
                placeholder="Email address"
                value={quickForm.email}
                onChange={(e) => setQuickForm({ ...quickForm, email: e.target.value })}
                className="w-full border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
              />
              <input
                type="tel"
                required
                placeholder="Phone number"
                value={quickForm.phone}
                onChange={(e) => setQuickForm({ ...quickForm, phone: e.target.value })}
                className="w-full border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-500"
              />
              <textarea
                placeholder="How can we help?"
                rows={3}
                value={quickForm.message}
                onChange={(e) => setQuickForm({ ...quickForm, message: e.target.value })}
                className="w-full border border-stone-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-teal-500 resize-none"
              />
              <button
                type="submit"
                disabled={quickStatus === 'sending'}
                className="w-full bg-teal-600 text-white py-2.5 rounded font-bold text-sm hover:bg-teal-500 transition-colors disabled:opacity-50"
              >
                {quickStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {quickStatus === 'error' && (
                <p className="text-red-500 text-xs text-center">Failed to send. Please try again.</p>
              )}
            </form>
            )}
          </div>
        )}

        <button
          onClick={() => setContactOpen(!contactOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 ${
            contactOpen
              ? 'bg-teal-800 text-white'
              : 'bg-teal-600 text-white'
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
