import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-teal-950 text-teal-300/60 py-16 border-t border-teal-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-6">
              <Image
                src="/menton_only_logo_transparent.png"
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
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-teal-300 transition-colors">About</Link></li>
              <li><Link href="/services" className="hover:text-teal-300 transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-teal-300 transition-colors">Portfolio</Link></li>
              <li><Link href="/contact" className="hover:text-teal-300 transition-colors">Contact</Link></li>
            </ul>

            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 mt-8">
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
  )
}
