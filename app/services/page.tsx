import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav activePath="/services" />

      <div className="bg-stone-800 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">
            Our Services
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl">
            Residential, renovations, and commercial &amp; agricultural
            construction.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-stone-500 text-lg mb-8">
            This page is coming soon. Reach out to discuss your project and
            we&rsquo;ll help you determine the best path forward.
          </p>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded font-bold hover:bg-teal-500 transition-colors tracking-wide uppercase group"
          >
            Start a Conversation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
