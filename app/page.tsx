import Link from 'next/link'
import { ArrowRight, Clock, Users, Shield, Gauge, Hammer, Check } from 'lucide-react'
import Nav from '@/components/Nav'
import HeroSection from '@/components/sections/HeroSection'
import TestimonialCarousel from '@/components/sections/TestimonialCarousel'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav transparent />
      <HeroSection />

      {/* Positioning Block */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl text-stone-900 leading-relaxed mb-6">
              We take on projects where we know we can deliver &mdash; and we stay accountable from start to finish.
            </p>
            <p className="text-stone-600 text-lg leading-relaxed">
              From custom homes to complex remodels, our work is built to perform over time, not just look good at completion.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block text-teal-700 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-teal-500 pb-1">
              What We Build
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6 leading-tight">
              Custom homes, remodels, ADUs, barns, timber structures, straw bale, rammed earth, and historic restorations.
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed">
              We&rsquo;ve built across a wide range of systems and conditions &mdash; and that experience allows us to focus on what actually works.
            </p>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block text-teal-700 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-teal-500 pb-1">
                What Sets Us Apart
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
                Experience That Shows in the Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Hammer className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg">
                    Built From the Field Up
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Our decisions come from real jobsite experience &mdash; not theory &mdash; and that shows in the details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg">
                    Three Generations of Accountability
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Over 50 years in this region means our name is tied to what we build &mdash; past, present, and future.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg">
                    Built to Last
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    We prioritize materials and methods that perform over time &mdash; not just what looks good upfront.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg">
                    Design-Build Alignment
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    We work with homeowners and architects early to align scope, budget, and construction before decisions become costly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Gauge className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg">
                    Performance-Based Building
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Every decision is intentional &mdash; from how a structure sits on the land to how it performs over decades.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Check className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-2 text-lg">
                    Clear, Direct Process
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed">
                    Straightforward communication and coordinated execution keep projects moving without unnecessary friction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selectivity + Mid-page CTA */}
      <section className="py-20 bg-stone-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-teal-500 mx-auto mb-8" />
            <p className="font-serif text-2xl md:text-3xl text-white leading-relaxed mb-4">
              We don&rsquo;t take on everything.
            </p>
            <p className="text-stone-400 text-lg mb-10">
              We take on projects where we know we can deliver &mdash; and we stay involved from start to finish.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-teal-500 text-white px-8 py-4 rounded font-bold hover:bg-teal-400 transition-colors tracking-wide uppercase shadow-lg group"
            >
              Tell Us About Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="w-16 h-0.5 bg-teal-500 mx-auto mt-10" />
          </div>
        </div>
      </section>

      <TestimonialCarousel />
      <ContactSection />

      {/* End-of-page Strong Close CTA */}
      <section className="py-20 bg-teal-900">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Ready to Build?
            </h2>
            <p className="text-teal-200/80 text-lg mb-8">
              Tell us about your project. We&rsquo;ll help you determine the next right step.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-teal-900 px-8 py-4 rounded font-bold hover:bg-teal-50 transition-colors tracking-wide uppercase shadow-lg group"
            >
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
