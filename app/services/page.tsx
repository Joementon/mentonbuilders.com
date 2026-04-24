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
    <div className="min-h-screen bg-ivory font-sans text-charcoal selection:bg-taupe selection:text-white">
      <Nav activePath="/services" />

      {/* Header */}
      <div className="bg-charcoal pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl text-white mb-3">
            Our Services
          </h1>
          <p className="text-ivory/70 text-lg max-w-2xl">
            We provide full-service construction through a design-build
            approach, allowing for a more streamlined and coordinated
            process. Our services include pre-construction planning,
            budgeting, project management, and full-scale residential
            construction.
          </p>
        </div>
      </div>

      {/* Services Tabs */}
      <section className="py-24 bg-sand">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12 flex-wrap gap-2">
            {(['residential', 'renovations', 'commercial'] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-full text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-taupe text-ivory shadow-lg'
                      : 'bg-white text-warm-gray hover:bg-sand'
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
                  <h3 className="text-3xl mb-4 text-charcoal">
                    Residential Construction
                  </h3>
                  <p className="text-warm-gray mb-6 leading-relaxed">
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
                        className="flex items-center gap-3 text-sm font-medium text-charcoal"
                      >
                        <Check className="w-4 h-4 text-taupe" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="text-taupe font-bold text-sm border-b-2 border-taupe inline-block w-fit pb-1 hover:text-charcoal transition-colors"
                  >
                    Start a Conversation
                  </Link>
                </div>
                <div className="relative bg-sand h-64 md:h-auto min-h-[300px]">
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
                  <h3 className="text-3xl mb-4 text-charcoal">
                    Renovations &amp; Upgrades
                  </h3>
                  <p className="text-warm-gray mb-6 leading-relaxed">
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
                        className="flex items-center gap-3 text-sm font-medium text-charcoal"
                      >
                        <Check className="w-4 h-4 text-taupe" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="text-taupe font-bold text-sm border-b-2 border-taupe inline-block w-fit pb-1 hover:text-charcoal transition-colors"
                  >
                    Discuss Your Remodel
                  </Link>
                </div>
                <div className="relative bg-sand h-64 md:h-auto min-h-[300px]">
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
                  <h3 className="text-3xl mb-4 text-charcoal">
                    Commercial &amp; Agricultural
                  </h3>
                  <p className="text-warm-gray mb-6 leading-relaxed">
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
                        className="flex items-center gap-3 text-sm font-medium text-charcoal"
                      >
                        <Check className="w-4 h-4 text-taupe" /> {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="text-taupe font-bold text-sm border-b-2 border-taupe inline-block w-fit pb-1 hover:text-charcoal transition-colors"
                  >
                    Explore Options
                  </Link>
                </div>
                <div className="relative bg-sand h-64 md:h-auto min-h-[300px]">
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
