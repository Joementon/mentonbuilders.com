import Link from 'next/link'
import { ArrowRight, Clock, Users, Shield, Gauge, Hammer, Check } from 'lucide-react'
import Nav from '@/components/Nav'
import HeroSection from '@/components/sections/HeroSection'
import TestimonialCarousel from '@/components/sections/TestimonialCarousel'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal selection:bg-taupe selection:text-ivory">
      <Nav transparent />
      <HeroSection />

      {/* Positioning Block */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-2xl md:text-3xl text-charcoal leading-relaxed mb-6">
              We take on projects where we know we can deliver &mdash; and we stay accountable from start to finish.
            </p>
            <p className="text-warm-gray text-lg leading-relaxed">
              From custom homes to complex remodels, our work is built to perform over time, not just look good at completion.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20 bg-ivory">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block text-taupe text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-taupe pb-1">
              What We Build
            </div>
            <h2 className="text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              Custom homes, remodels, ADUs, barns, timber structures, straw bale, rammed earth, and historic restorations.
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed">
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
              <div className="inline-block text-taupe text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-taupe pb-1">
                What Sets Us Apart
              </div>
              <h2 className="text-3xl md:text-4xl text-charcoal">
                Experience That Shows in the Details
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center shrink-0 border border-sand">
                  <Hammer className="w-5 h-5 text-taupe" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-2 text-lg">
                    Built From the Field Up
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    Our decisions come from real jobsite experience &mdash; not theory &mdash; and that shows in the details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center shrink-0 border border-sand">
                  <Clock className="w-5 h-5 text-taupe" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-2 text-lg">
                    Three Generations of Accountability
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    Over 50 years in this region means our name is tied to what we build &mdash; past, present, and future.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center shrink-0 border border-sand">
                  <Shield className="w-5 h-5 text-taupe" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-2 text-lg">
                    Built to Last
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    We prioritize materials and methods that perform over time &mdash; not just what looks good upfront.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center shrink-0 border border-sand">
                  <Users className="w-5 h-5 text-taupe" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-2 text-lg">
                    Design-Build Alignment
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    We work with homeowners and architects early to align scope, budget, and construction before decisions become costly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center shrink-0 border border-sand">
                  <Gauge className="w-5 h-5 text-taupe" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-2 text-lg">
                    Performance-Based Building
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    Every decision is intentional &mdash; from how a structure sits on the land to how it performs over decades.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sand rounded-full flex items-center justify-center shrink-0 border border-sand">
                  <Check className="w-5 h-5 text-taupe" />
                </div>
                <div>
                  <h3 className="font-bold text-charcoal mb-2 text-lg">
                    Clear, Direct Process
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    Straightforward communication and coordinated execution keep projects moving without unnecessary friction.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selectivity + Mid-page CTA */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-taupe mx-auto mb-8" />
            <p className="text-2xl md:text-3xl text-ivory leading-relaxed mb-4">
              We don&rsquo;t take on everything.
            </p>
            <p className="text-ivory/80 text-lg mb-10">
              We take on projects where we know we can deliver &mdash; and we stay involved from start to finish.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-taupe text-ivory px-6 py-2.5 rounded-md hover:bg-charcoal transition-colors group"
            >
              Tell Us About Your Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="w-16 h-0.5 bg-taupe mx-auto mt-10" />
          </div>
        </div>
      </section>

      <TestimonialCarousel />
      <ContactSection />

      {/* End-of-page Strong Close CTA */}
      <section className="py-20 bg-charcoal">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl text-ivory mb-4">
              Ready to Build?
            </h2>
            <p className="text-ivory/80 text-lg mb-8">
              Tell us about your project. We&rsquo;ll help you determine the next right step.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-sand text-charcoal px-6 py-2.5 rounded-md hover:bg-ivory transition-colors group"
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
