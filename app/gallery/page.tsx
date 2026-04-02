'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X, Grid3X3, FolderOpen, Menu } from 'lucide-react'

/* ─── shared nav ──────────────────────────────────────────────── */

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Approach', href: '/#approach' },
  { name: 'Gallery', href: '/gallery' },
]

/* ─── categories ──────────────────────────────────────────────── */

const categories = [
  { slug: 'all', label: 'All' },
  { slug: 'site-foundation', label: 'Site & Foundation' },
  { slug: 'framing', label: 'Framing' },
  { slug: 'finishes', label: 'Finishes' },
  { slug: 'completed', label: 'Completed' },
  { slug: 'renovation', label: 'Renovation' },
  { slug: 'interior', label: 'Interior' },
  { slug: 'exterior', label: 'Exterior' },
]

/* ─── gallery data ────────────────────────────────────────────── */

interface GalleryPhoto {
  src: string
  alt: string
  category: string
  project: string      // internal project group
  displayProject: string // public-facing project name (no last names)
  location: string
}

const photos: GalleryPhoto[] = [
  {
    src: '/hero-3.png',
    alt: 'Straw bale and venetian plaster exterior',
    category: 'completed',
    project: 'polynesian-straw-bale',
    displayProject: 'Straw Bale Homestead',
    location: 'Mendocino County',
  },
  {
    src: '/hero-4.png',
    alt: 'Rammed earth modern home',
    category: 'completed',
    project: 'rammed-earth',
    displayProject: 'Rammed Earth Estate',
    location: 'Mendocino County',
  },
  {
    src: '/hero-1.png',
    alt: 'Clean interior lines and skylights',
    category: 'interior',
    project: 'beautiful-lines',
    displayProject: 'Contemporary Interior',
    location: 'Sonoma County',
  },
  {
    src: '/hero-2.png',
    alt: 'Vaulted timber beam living room',
    category: 'interior',
    project: 'ranch-living',
    displayProject: 'Ranch Living Room',
    location: 'Ukiah',
  },
]

/* ─── derive projects from photos ─────────────────────────────── */

const projects = Array.from(
  photos.reduce((map, photo) => {
    if (!map.has(photo.project)) {
      map.set(photo.project, {
        slug: photo.project,
        displayName: photo.displayProject,
        location: photo.location,
        photos: [],
        coverSrc: photo.src,
      })
    }
    map.get(photo.project)!.photos.push(photo)
    return map
  }, new Map<string, { slug: string; displayName: string; location: string; photos: GalleryPhoto[]; coverSrc: string }>())
).map(([, v]) => v)

/* ─── component ───────────────────────────────────────────────── */

export default function GalleryPage() {
  const [viewMode, setViewMode] = useState<'category' | 'project'>('category')
  const [activeCategory, setActiveCategory] = useState('all')
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null)

  const filtered =
    activeCategory === 'all'
      ? photos
      : photos.filter((p) => p.category === activeCategory)

  const projectPhotos = activeProject
    ? photos.filter((p) => p.project === activeProject)
    : []

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      {/* ── Global Nav ── */}
      <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md shadow-sm py-2">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/menton_only_logo_transparent.png"
              alt="Menton Builders"
              width={160}
              height={46}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide hover:text-teal-500 transition-colors ${
                  link.href === '/gallery'
                    ? 'text-teal-600'
                    : 'text-stone-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contact"
              className="relative bg-teal-600 text-white px-7 py-2.5 rounded text-sm font-bold hover:bg-teal-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 tracking-wide uppercase"
            >
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-300 rounded-full animate-pulse" />
              Get a Quote
            </Link>
          </div>

          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="text-stone-800 w-6 h-6" />
            ) : (
              <Menu className="text-stone-800 w-6 h-6" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-b border-stone-100 p-6 lg:hidden shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-serif text-stone-800"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/#contact"
                className="bg-teal-600 text-white text-center py-3 rounded font-bold mt-4 uppercase tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Header Banner */}
      <div className="bg-stone-800 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">
            Project Gallery
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl">
            A look inside our work — from breaking ground to handing over the
            keys.
          </p>
        </div>
      </div>

      {/* View Toggle + Filters */}
      <div className="container mx-auto px-6 -mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          {/* View mode toggle */}
          <div className="flex bg-white rounded-full border border-stone-200 p-1 shadow-sm">
            <button
              onClick={() => {
                setViewMode('category')
                setActiveProject(null)
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'category'
                  ? 'bg-teal-600 text-white'
                  : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
              By Category
            </button>
            <button
              onClick={() => setViewMode('project')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                viewMode === 'project'
                  ? 'bg-teal-600 text-white'
                  : 'text-stone-600 hover:text-stone-800'
              }`}
            >
              <FolderOpen className="w-4 h-4" />
              By Project
            </button>
          </div>

          {/* Category filters (only in category mode) */}
          {viewMode === 'category' && (
            <div className="flex flex-wrap gap-2">
              {categories.map(({ slug, label }) => (
                <button
                  key={slug}
                  onClick={() => setActiveCategory(slug)}
                  className={`py-2.5 px-5 rounded-full text-sm font-medium transition-all duration-150 ${
                    activeCategory === slug
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12">
        {/* ── Category View ── */}
        {viewMode === 'category' && (
          <>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((photo, i) => (
                  <button
                    key={`${photo.src}-${i}`}
                    onClick={() => setLightbox(photo)}
                    className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 cursor-pointer"
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-sm font-medium">
                        {photo.alt}
                      </p>
                      <p className="text-white/60 text-xs">
                        {photo.location}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-stone-400 text-lg">
                  No photos in this category yet — check back soon.
                </p>
              </div>
            )}
          </>
        )}

        {/* ── Project View: Project Grid ── */}
        {viewMode === 'project' && !activeProject && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => (
              <button
                key={proj.slug}
                onClick={() => setActiveProject(proj.slug)}
                className="group text-left"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 mb-3">
                  <Image
                    src={proj.coverSrc}
                    alt={proj.displayName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-serif text-xl mb-1">
                      {proj.displayName}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {proj.location} &middot; {proj.photos.length} photo
                      {proj.photos.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Project View: Single Project Photos ── */}
        {viewMode === 'project' && activeProject && (
          <>
            <button
              onClick={() => setActiveProject(null)}
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 transition-colors text-sm font-medium mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              All Projects
            </button>
            <div className="mb-8">
              <h2 className="font-serif text-3xl text-stone-900 mb-1">
                {projects.find((p) => p.slug === activeProject)?.displayName}
              </h2>
              <p className="text-stone-500">
                {projects.find((p) => p.slug === activeProject)?.location}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectPhotos.map((photo, i) => (
                <button
                  key={`${photo.src}-${i}`}
                  onClick={() => setLightbox(photo)}
                  className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 cursor-pointer"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-sm font-medium">
                      {photo.alt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="relative max-w-5xl w-full max-h-[85vh] aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p className="text-white font-medium">{lightbox.alt}</p>
            <p className="text-white/50 text-sm">
              {lightbox.displayProject} &middot; {lightbox.location}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
