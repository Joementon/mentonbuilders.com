'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/gallery' },
  { name: 'Contact', href: '#contact' },
]

interface NavProps {
  transparent?: boolean
  activePath?: string
}

export default function Nav({ transparent = false, activePath }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!transparent) return
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [transparent])

  const isTransparent = transparent && !scrolled

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent py-5'
          : 'bg-white/95 backdrop-blur-md shadow-sm py-2'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/full_menton_logo_transparent.png"
            alt="Menton Builders"
            width={640}
            height={184}
            className={`w-auto transition-all duration-300 ${isTransparent ? 'h-36' : 'hidden'}`}
            priority
          />
          <Image
            src="/menton_only_logo_transparent.png"
            alt="Menton Builders"
            width={160}
            height={46}
            className={`w-auto transition-all duration-300 ${isTransparent ? 'hidden' : 'h-9'}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide hover:text-teal-500 transition-colors ${
                activePath === link.href
                  ? 'text-teal-600'
                  : isTransparent
                    ? 'text-stone-200'
                    : 'text-stone-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="relative bg-teal-600 text-white px-7 py-2.5 rounded text-sm font-bold hover:bg-teal-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 tracking-wide uppercase"
          >
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-300 rounded-full animate-pulse" />
            Get a Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className={isTransparent ? 'text-white' : 'text-stone-800'} />
          ) : (
            <Menu className={isTransparent ? 'text-white' : 'text-stone-800'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-stone-100 p-6 lg:hidden shadow-xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-serif text-stone-800"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="bg-teal-600 text-white text-center py-3 rounded font-bold mt-4 uppercase tracking-wide"
              onClick={() => setIsMenuOpen(false)}
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
