import Image from 'next/image'
import Link from 'next/link'
import { Shield, Check, MapPin, ArrowRight, Hammer, Layers, Users, Clock, Gauge } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav activePath="/about" />

      {/* Header */}
      <div className="bg-stone-800 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">
            About Menton Builders
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl">
            Three generations. Over 50 years. Building what matters across Northern California.
          </p>
        </div>
      </div>

      {/* About Narrative */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <div className="inline-block text-teal-700 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-teal-500 pb-1">
                About Us
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 leading-tight">
                Why <span className="text-teal-700 italic">Menton Builders</span>
              </h2>

              <div className="space-y-5 text-stone-600 text-base leading-relaxed">
                <p>
                  Three generations. Over 50 years in this region. We&rsquo;re still here because we stand behind what we build.
                </p>

                <div className="w-10 h-0.5 bg-teal-400" />

                <p>
                  Custom homes, remodels, ADUs, barns, timber and pole structures, straw bale, rammed earth, historic restorations &mdash; we&rsquo;ve done it all, and that range gives us a real understanding of what works and what lasts.
                </p>

                <div className="w-10 h-0.5 bg-teal-400" />

                <p>
                  We don&rsquo;t take on everything. We take on projects where we know we can deliver &mdash; and we stay involved start to finish.
                </p>
              </div>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2670&auto=format&fit=crop"
                  alt="Architectural details"
                  width={800}
                  height={600}
                  className="w-full h-[380px] object-cover rounded shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-teal-900 p-8 shadow-xl max-w-xs hidden lg:block rounded">
                  <p className="font-serif text-xl italic text-teal-100 leading-relaxed">
                    &ldquo;Build it right. Stand behind it. Make it last.&rdquo;
                  </p>
                  <div className="w-12 h-0.5 bg-teal-400 mt-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block text-teal-700 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-teal-500 pb-1">
                What Sets Us Apart
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900">
                Built on Experience. Driven by Craft.
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Layers className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Versatile by Experience &mdash; Focused in Execution
                  </h3>
                  <p className="text-stone-500 text-sm">
                    We&rsquo;ve built everything from custom homes and remodels to ADUs, barns, and alternative construction &mdash; but we stay focused on projects where quality and execution matter most.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Clock className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Three Generations of Accountability
                  </h3>
                  <p className="text-stone-500 text-sm">
                    Over 50 years of work in this region means our name is tied to what we build &mdash; past, present, and future.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Design-Build Alignment
                  </h3>
                  <p className="text-stone-500 text-sm">
                    We work closely with homeowners and architects early, aligning scope, budget, and construction before decisions become costly.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Shield className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Built to Last
                  </h3>
                  <p className="text-stone-500 text-sm">
                    We prioritize materials and methods that perform over time &mdash; not just what looks good up front.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Gauge className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Performance-Based Design
                  </h3>
                  <p className="text-stone-500 text-sm">
                    Every choice is intentional &mdash; from the materials we select to how we orient a building on the land. We don&rsquo;t overbuild and we don&rsquo;t cut corners. The goal is a structure that does its job quietly for a long time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                  <Hammer className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 mb-1">
                    Hands-On Knowledge
                  </h3>
                  <p className="text-stone-500 text-sm">
                    Our decisions come from real field experience &mdash; not theory &mdash; and that shows in the details.
                  </p>
                </div>
              </div>

            </div>
            <div className="flex gap-4 max-w-md mx-auto mt-8">
              <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                <Check className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold text-stone-900 mb-1">
                  Clear, Direct Process
                </h3>
                <p className="text-stone-500 text-sm">
                  Straightforward communication, coordinated trades, and proactive planning keep projects moving without unnecessary friction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="bg-stone-800 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-teal-500 mx-auto mb-8" />
            <p className="font-serif text-2xl md:text-3xl italic text-white leading-relaxed mb-4">
              &ldquo;Build it right. Stand behind it. Make it last.&rdquo;
            </p>
            <p className="text-stone-400 text-base">
              At the end of the day, our responsibility is simple.
            </p>
            <div className="w-16 h-0.5 bg-teal-500 mx-auto mt-8" />
          </div>
        </div>
      </section>

      {/* Regional Focus + CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-teal-900 p-8 lg:p-12 shadow-xl rounded border-l-4 border-teal-400 text-white">
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

            <div className="bg-teal-600 p-8 lg:p-12 rounded shadow-xl flex flex-col justify-center">
              <h3 className="font-serif text-2xl text-white mb-3">
                Ready to Start?
              </h3>
              <p className="text-teal-100 mb-6">
                Tell us about your project and we&rsquo;ll help you determine
                the next right step.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-white text-teal-800 px-6 py-3 rounded font-bold hover:bg-teal-50 transition-colors group w-fit"
              >
                Get in Touch{' '}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
