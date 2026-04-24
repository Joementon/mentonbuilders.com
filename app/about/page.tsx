import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav activePath="/about" />

      {/* Header */}
      <div className="bg-stone-800 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            About Menton Builders
          </h1>
          <p className="text-stone-300 text-lg max-w-2xl leading-relaxed">
            What we build carries our name &mdash; and we take that responsibility seriously.
          </p>
        </div>
      </div>

      {/* 6.1 Opening */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2">
              <div className="inline-block text-stone-500 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-stone-500 pb-1">
                Who We Are
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8 leading-tight">
                Rooted in Ukiah. Built on accountability.
              </h2>

              <div className="space-y-6 text-stone-600 text-base leading-relaxed">
                <p className="text-lg">
                  Rooted in Ukiah and serving Mendocino County and beyond, Menton Builders has spent decades building with a focus on craftsmanship, integrity, and long-term performance.
                </p>

                <div className="w-10 h-0.5 bg-teal-400" />

                <p>
                  Three generations. Over 50 years in this region. We&rsquo;re still here because we stand behind what we build.
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

      {/* 6.2 Core Philosophy */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block text-stone-500 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-stone-500 pb-1">
              Our Approach
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8 leading-tight">
              We don&rsquo;t build for the moment.
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              We build for how a space will be used, lived in, and held up over time.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                'Respect for the land',
                'Attention to detail',
                'Materials that perform',
                'Decisions that hold up years down the road',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 shrink-0" />
                  <p className="text-stone-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6.3 Built With Purpose */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block text-stone-500 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-stone-500 pb-1">
              Built With Purpose
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8 leading-tight">
              Every project is approached with intention.
            </h2>
            <p className="text-stone-600 text-lg leading-relaxed mb-10">
              From custom homes to renovations and community spaces, we prioritize:
            </p>

            <div className="space-y-5">
              {[
                'Thoughtful design',
                'Durable materials',
                'A collaborative process with our clients',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 shrink-0" />
                  <p className="text-stone-700 font-medium text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6.4 Community */}
      <section className="py-20 bg-stone-800">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-0.5 bg-teal-500 mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
              We&rsquo;re part of the fabric of this region.
            </h2>
            <p className="text-stone-400 text-lg leading-relaxed">
              Our work reflects not just the needs of our clients, but the long-term strength of the community we live and work in.
            </p>
            <div className="w-16 h-0.5 bg-teal-500 mx-auto mt-8" />
          </div>
        </div>
      </section>

      {/* 6.5 Standard / Accountability */}
      <section className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block text-stone-500 text-sm font-bold tracking-widest uppercase mb-4 border-b-2 border-stone-500 pb-1">
              Our Standard
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-8 leading-tight">
              We hold ourselves to a higher standard.
            </h2>

            <p className="text-stone-600 text-lg leading-relaxed mb-8">
              One built on:
            </p>

            <div className="space-y-4 mb-12">
              {['Honesty', 'Accountability', 'Craftsmanship'].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 shrink-0" />
                  <p className="text-stone-700 font-medium text-lg">{item}</p>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-teal-500 pl-6">
              <p className="text-stone-500 text-lg mb-2">Anyone can build a structure.</p>
              <p className="font-serif text-2xl text-stone-900 leading-relaxed">
                We build something people are proud to live in.
              </p>
            </div>
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
                className="inline-flex items-center gap-2 bg-white text-teal-800 px-6 py-3 rounded font-medium hover:bg-stone-50 transition-colors group w-fit"
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
