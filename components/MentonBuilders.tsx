'use client'

import React, { useState, useEffect } from 'react'
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
} from 'lucide-react'

export default function MentonBuilders() {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('residential')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Approach', href: '#approach' },
  ]

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-emerald-900 selection:text-white">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 ${
                scrolled ? 'bg-emerald-900' : 'bg-white'
              } rounded-sm flex items-center justify-center`}
            >
              <span
                className={`font-serif font-bold text-xl ${
                  scrolled ? 'text-white' : 'text-emerald-900'
                }`}
              >
                M
              </span>
            </div>
            <span
              className={`text-xl font-bold tracking-tight uppercase ${
                scrolled ? 'text-emerald-950' : 'text-white'
              }`}
            >
              Menton Builders
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide hover:text-emerald-600 transition-colors ${
                  scrolled ? 'text-stone-600' : 'text-stone-200'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-emerald-900 text-white px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Start Your Project
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2"
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
          <div className="absolute top-full left-0 w-full bg-white border-b border-stone-100 p-6 md:hidden shadow-xl">
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
                className="bg-emerald-900 text-white text-center py-3 rounded-sm mt-4"
              >
                Start Your Project
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop"
            alt="Modern home in the redwoods"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/40 to-transparent" />
        </div>

        <div className="container mx-auto px-6 relative z-10 pt-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-stone-200 text-xs tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Serving Mendocino &amp; Sonoma Counties
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-medium text-white leading-tight mb-6">
              Builders Building <br />
              What Matters.
            </h1>
            <p className="text-xl text-stone-200 mb-8 max-w-2xl font-light leading-relaxed">
              Design-build rooted in experience, guided by clarity, and built to
              perform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="bg-white text-stone-900 px-8 py-4 rounded-sm font-medium hover:bg-stone-100 transition-colors text-center"
              >
                Discuss Your Build
              </a>
              <a
                href="#portfolio"
                className="border border-white/30 text-white px-8 py-4 rounded-sm font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center gap-2 group"
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

      {/* Trust / Stats Bar */}
      <section className="bg-emerald-950 py-12 border-b border-emerald-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
            <div>
              <p className="text-3xl font-serif text-emerald-400 mb-1">
                50+ Years
              </p>
              <p className="text-emerald-100/60 text-sm">Of Experience</p>
            </div>
            <div>
              <p className="text-3xl font-serif text-emerald-400 mb-1">
                Planning
              </p>
              <p className="text-emerald-100/60 text-sm">
                Thoughtful Pre-construction
              </p>
            </div>
            <div>
              <p className="text-3xl font-serif text-emerald-400 mb-1">
                Performance
              </p>
              <p className="text-emerald-100/60 text-sm">
                Durable &amp; Practical
              </p>
            </div>
            <div>
              <p className="text-3xl font-serif text-emerald-400 mb-1">
                Craftsmanship
              </p>
              <p className="text-emerald-100/60 text-sm">
                Integrated Design-Build
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About / Intro Section */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="md:w-1/2">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2670&auto=format&fit=crop"
                  alt="Architectural details"
                  className="w-full h-[600px] object-cover rounded-sm shadow-2xl grayscale-[20%]"
                />
                <div className="absolute -bottom-8 -right-8 bg-stone-100 p-8 shadow-xl max-w-xs hidden md:block border border-stone-200">
                  <p className="font-serif text-lg italic text-stone-600">
                    &ldquo;We build what matters and we stand behind how
                    it&rsquo;s built.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <div className="inline-block text-emerald-800 text-sm font-bold tracking-widest uppercase mb-4 border-b border-emerald-800 pb-1">
                About Us
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
                A fully integrated <br />
                <span className="text-emerald-900 italic">process.</span>
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
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-stone-700">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      Performance-Based Thinking
                    </h3>
                    <p className="text-stone-600 text-sm">
                      Focusing on how a building functions, endures, and serves
                      its occupants over time. Materials and methods are selected
                      for durability, practicality, and long-term value.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center shrink-0 text-stone-700">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      Active Coordination
                    </h3>
                    <p className="text-stone-600 text-sm">
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

      {/* Services Tabs */}
      <section id="services" className="py-24 bg-stone-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl text-stone-900 mb-4">
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
                      ? 'bg-emerald-900 text-white shadow-lg'
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
                  <h3 className="font-serif text-3xl mb-4 text-emerald-950">
                    Residential Construction
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    Custom homes, ADUs, and additions built with craftsmanship
                    and a deep respect for long-term performance.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" /> Custom
                      homes tailored to your site
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" /> Accessory
                      Dwelling Units (ADUs)
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" /> Thoughtful
                      residential additions
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="text-emerald-800 font-bold text-sm border-b border-emerald-800 inline-block w-fit pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-colors"
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
                  <h3 className="font-serif text-3xl mb-4 text-emerald-950">
                    Renovations &amp; Upgrades
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    Full remodels and structural upgrades that honor the original
                    architecture while improving livability, flow, and modern
                    efficiency.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" /> Full home
                      remodels
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" /> Structural
                      and seismic upgrades
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" />{' '}
                      Performance-focused modernizations
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="text-emerald-800 font-bold text-sm border-b border-emerald-800 inline-block w-fit pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-colors"
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
                  <h3 className="font-serif text-3xl mb-4 text-emerald-950">
                    Commercial &amp; Agricultural
                  </h3>
                  <p className="text-stone-600 mb-6 leading-relaxed">
                    We build functional, durable structures and specialize in
                    adaptive reuse — repurposing existing buildings for new
                    commercial life.
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" /> Functional
                      agricultural structures
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" /> Adaptive
                      reuse &amp; repurposing
                    </li>
                    <li className="flex items-center gap-3 text-sm font-medium text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600" /> Durable
                      commercial spaces
                    </li>
                  </ul>
                  <a
                    href="#contact"
                    className="text-emerald-800 font-bold text-sm border-b border-emerald-800 inline-block w-fit pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-colors"
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

      {/* Case Studies */}
      <section id="portfolio" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block text-emerald-800 text-sm font-bold tracking-widest uppercase mb-4">
                Selected Works
              </div>
              <h2 className="font-serif text-4xl text-stone-900 mb-4">
                Recent Projects
              </h2>
              <p className="text-stone-600 max-w-2xl">
                The work should speak for itself. Minimal, intentional, and
                grounded.
              </p>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-stone-600 hover:text-emerald-800 transition-colors"
            >
              View Full Portfolio{' '}
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop"
                  alt="Healdsburg Estate"
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-800">
                  New Construction
                </div>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                The Ridge Estate
              </h3>
              <p className="text-stone-500 text-sm mb-3">Healdsburg, CA</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-stone-100 px-2 py-1 text-stone-600">
                  Off-Grid Capable
                </span>
                <span className="text-xs bg-stone-100 px-2 py-1 text-stone-600">
                  Modern Barn
                </span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=2680&auto=format&fit=crop"
                  alt="Mendocino Coastal"
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-800">
                  Full Renovation
                </div>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                Coastal Retreat
              </h3>
              <p className="text-stone-500 text-sm mb-3">Gualala, CA</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-stone-100 px-2 py-1 text-stone-600">
                  Site Restoration
                </span>
                <span className="text-xs bg-stone-100 px-2 py-1 text-stone-600">
                  Deck Integration
                </span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden mb-4 rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2670&auto=format&fit=crop"
                  alt="ADU Project"
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wide text-stone-800">
                  ADU / Addition
                </div>
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-1 group-hover:text-emerald-800 transition-colors">
                Vineyard Guest House
              </h3>
              <p className="text-stone-500 text-sm mb-3">Ukiah, CA</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-stone-100 px-2 py-1 text-stone-600">
                  Passive Solar
                </span>
                <span className="text-xs bg-stone-100 px-2 py-1 text-stone-600">
                  800 Sq Ft
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Focus */}
      <section className="bg-emerald-900 py-24 text-white">
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-4xl font-serif leading-relaxed mb-8">
              &ldquo;Menton Builders brings a design-build approach rooted in
              over 50 years of experience to projects throughout Sonoma County,
              including Healdsburg and surrounding wine country
              communities.&rdquo;
            </h3>
            <p className="text-emerald-100/80 text-lg max-w-2xl mx-auto font-light">
              Our work reflects thoughtful design, high-performance
              construction, and respect for architectural context. We align
              design, budget, and execution early and maintain clarity throughout
              the process.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-24 bg-stone-100" id="approach">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-4xl text-stone-900 mb-6">
                Our Approach
              </h2>
              <p className="text-stone-600 text-lg mb-8">
                Every project is different, but our approach remains consistent:
                align early, build thoughtfully, and guide the process with
                clarity.
              </p>

              <div className="space-y-6">
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
                  <div key={step.num} className="flex gap-4">
                    <div className="bg-white p-3 shadow-sm h-fit rounded-sm">
                      <span className="font-serif font-bold text-emerald-800">
                        {step.num}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-stone-600 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 md:p-12 shadow-xl rounded-sm border-t-4 border-emerald-800">
              <h3 className="font-serif text-2xl mb-6">Regional Focus</h3>
              <p className="text-stone-600 mb-6">
                Our work is based in Northern California, thoughtfully
                integrating structures into these environments:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-stone-800 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Mendocino
                    County
                  </li>
                  <li className="flex items-center gap-2 text-stone-800 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Sonoma
                    County
                  </li>
                  <li className="flex items-center gap-2 text-stone-800 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Healdsburg
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-stone-800 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Wine Country
                  </li>
                  <li className="flex items-center gap-2 text-stone-800 font-medium">
                    <MapPin className="w-4 h-4 text-emerald-600" /> Coastal
                    Regions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/50 hidden md:block -skew-x-12 translate-x-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl text-stone-900 mb-4">
                Start Your Project
              </h2>
              <p className="text-stone-600">
                Tell us about your vision. We&rsquo;ll help you determine the
                next right step.
              </p>
            </div>

            <form className="bg-white shadow-2xl p-8 md:p-12 rounded-sm border border-stone-100">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-emerald-800 transition-colors bg-transparent"
                    placeholder="First Last"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-emerald-800 transition-colors bg-transparent"
                    placeholder="email@address.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-emerald-800 transition-colors bg-transparent"
                    placeholder="(707) 555-0123"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Project Location (City)
                  </label>
                  <input
                    type="text"
                    className="w-full border-b border-stone-300 py-2 focus:outline-none focus:border-emerald-800 transition-colors bg-transparent"
                    placeholder="e.g. Covelo, Healdsburg"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Project Type
                  </label>
                  <select className="w-full border-b border-stone-300 py-2 bg-transparent focus:outline-none focus:border-emerald-800 transition-colors text-stone-700">
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
                  <select className="w-full border-b border-stone-300 py-2 bg-transparent focus:outline-none focus:border-emerald-800 transition-colors text-stone-700">
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
                  className="w-full border border-stone-300 p-4 rounded-sm focus:outline-none focus:border-emerald-800 transition-colors h-32 bg-transparent"
                  placeholder="Tell us about your timeline, lot status, and design vision..."
                />
              </div>

              <button
                type="button"
                className="w-full bg-emerald-900 text-white py-4 font-bold tracking-widest uppercase hover:bg-emerald-800 transition-colors shadow-lg"
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

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-16 border-t border-stone-800">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <span className="font-serif font-bold text-xl text-stone-900">
                    M
                  </span>
                </div>
                <span className="text-xl font-bold tracking-tight text-white uppercase">
                  Menton Builders
                </span>
              </div>
              <p className="max-w-md text-stone-500 mb-4">
                For over 50 years, Menton Builders has approached construction
                through a design-build mindset grounded in planning,
                performance, and craftsmanship.
              </p>
              <p className="max-w-md text-emerald-600/80 font-serif italic text-lg">
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
                  <MapPin className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    PO Box 1234
                    <br />
                    Ukiah, CA 95482
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>(707) 555-0199</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-700 shrink-0" />
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
                <li className="pt-4 text-xs text-stone-600">
                  &copy; 2026 Menton Builders Inc.
                  <br />
                  All rights reserved.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
