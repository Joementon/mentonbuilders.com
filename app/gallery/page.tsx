'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, X, Grid3X3, FolderOpen } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

import { categories, photos, type GalleryPhoto } from '@/lib/gallery-data'

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

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav activePath="/gallery" />

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

      <Footer />
    </div>
  )
}
