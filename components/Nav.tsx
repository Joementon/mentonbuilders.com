'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
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
          : 'bg-ivory/95 backdrop-blur-md border-b border-weathered-oak/60 py-2'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded"
          aria-label="Menton Builders — Home"
        >
          <Image
            src="/brand/source-icon-tight.png"
            alt=""
            width={252}
            height={313}
            className={`w-auto transition-all duration-300 ${
              isTransparent ? 'h-11 brightness-0 invert' : 'h-9'
            }`}
            priority
          />
          <span className="flex flex-col items-center leading-none" aria-hidden="true">
            <span
              className={`font-serif font-bold tracking-wide transition-colors duration-300 ${
                isTransparent ? 'text-ivory text-xl' : 'text-ink text-lg'
              }`}
            >
              MENTON
            </span>
            <span
              className={`font-sans font-medium mt-1 transition-colors duration-300 ${
                isTransparent
                  ? 'text-ivory/90 text-[0.65rem] tracking-[0.28em]'
                  : 'text-warm-gray text-[0.6rem] tracking-[0.28em]'
              }`}
            >
              BUILDERS
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded-sm ${
                activePath === link.href
                  ? isTransparent
                    ? 'text-white'
                    : 'text-taupe'
                  : isTransparent
                    ? 'text-ivory/90 hover:text-white'
                    : 'text-charcoal hover:text-taupe'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-taupe text-ivory px-6 py-2.5 rounded-md text-sm font-medium tracking-wide hover:bg-charcoal transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage rounded"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <X className={isTransparent ? 'text-white' : 'text-charcoal'} />
          ) : (
            <Menu className={isTransparent ? 'text-white' : 'text-charcoal'} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-ivory border-b border-weathered-oak/60 p-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-charcoal hover:text-taupe transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-taupe text-ivory text-center py-3 rounded-md font-medium tracking-wide hover:bg-charcoal transition-colors mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
