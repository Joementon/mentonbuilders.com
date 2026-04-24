'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('residential')

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav activePath="/services" />

      {/* Header */}
      <div className="bg-stone-800 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">
            Our Services
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl">
            We provide full-service construction through a design-build
            approach, allowing for a more streamlined and coordinated
            process. Our services include pre-construction planning,
            budgeting, project management, and full-scale residential
            construction.
          </p>
        </div>
      </div>

      {/* Services Tabs */}
      <section className="py-24 bg-stone-100">
        <div className="container mx-auto px-6">
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
                  <Link
                    href="/contact"
                    className="text-teal-700 font-medium text-sm border-b border-teal-600 inline-block w-fit pb-1 hover:text-teal-800 transition-colors"
                  >
                    Start a Conversation
                  </Link>
                </div>
                <div className="relative bg-stone-200 h-64 md:h-auto min-h-[300px]">
                  <Image
                    src="/rammed_earth_sunset.png"
                    className="object-cover"
                    alt="Rammed earth residential construction at sunset"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
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
                  <Link
                    href="/contact"
                    className="text-teal-700 font-medium text-sm border-b border-teal-600 inline-block w-fit pb-1 hover:text-teal-800 transition-colors"
                  >
                    Discuss Your Remodel
                  </Link>
                </div>
                <div className="relative bg-stone-200 h-64 md:h-auto min-h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=2671&auto=format&fit=crop"
                    className="object-cover"
                    alt="Kitchen Remodel"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
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
                  <Link
                    href="/contact"
                    className="text-teal-700 font-medium text-sm border-b border-teal-600 inline-block w-fit pb-1 hover:text-teal-800 transition-colors"
                  >
                    Explore Options
                  </Link>
                </div>
                <div className="relative bg-stone-200 h-64 md:h-auto min-h-[300px]">
                  <Image
                    src="/spain_commercial_ag.jpeg"
                    className="object-cover"
                    alt="Commercial & Agricultural Construction"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
