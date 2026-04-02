import Image from 'next/image'
import Link from 'next/link'
import { Shield, Check, MapPin, ArrowRight, Hammer, Layers, Users, Clock } from 'lucide-react'
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
            50+ years of design-build experience in Northern California.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2670&auto=format&fit=crop"
                  alt="Architectural details"
                  width={800}
                  height={600}
                  className="w-full h-[500px] object-cover rounded shadow-2xl"
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
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-8 leading-tight">
                Why <span className="text-teal-700 italic">Menton Builders</span>
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                    <Layers className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      Versatile by Nature
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Custom design-build homes, barns, ADUs, historic renovations, adaptive reuse, commercial &mdash; and more. Resourceful and hands-on, we bring the same standard of craft to every type of project.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                    <Clock className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      50+ Years of Experience
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Proven methods refined over generations, paired with a forward-thinking approach to materials and design.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                    <Users className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      Design-Build Partnership
                    </h3>
                    <p className="text-stone-500 text-sm">
                      We work alongside homeowners and architects from day one &mdash; aligning design, budget, and construction before ground breaks.
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
                      Materials and methods selected for durability and long-term value &mdash; not just how it looks on day one.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-full flex items-center justify-center shrink-0 border border-teal-200">
                    <Hammer className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      Hands-On Craft
                    </h3>
                    <p className="text-stone-500 text-sm">
                      Rammed earth, straw bale, conventional framing, repurposed materials, barn conversions &mdash; we know how to build it because we&rsquo;ve built it.
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
                      Clear communication, coordinated trades, and early alignment on scope &mdash; fewer surprises down the road.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Quote */}
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
                href="/contact"
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
