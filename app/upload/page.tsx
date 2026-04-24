'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, Camera, Check, ImagePlus } from 'lucide-react'

const LOCATIONS = [
  'Ukiah',
  'Healdsburg',
  'Mendocino County',
  'Sonoma County',
  'Willits',
  'Hopland',
  'Cloverdale',
]

const CATEGORIES = [
  { value: '', label: 'Select a category...' },
  { value: 'site-foundation', label: 'Site & Foundation' },
  { value: 'framing', label: 'Framing' },
  { value: 'finishes', label: 'Finishes' },
  { value: 'completed', label: 'Completed' },
  { value: 'renovation', label: 'Renovation' },
  { value: 'interior', label: 'Interior' },
  { value: 'exterior', label: 'Exterior' },
  { value: 'landscape', label: 'Landscape' },
  { value: 'detail', label: 'Detail / Close-up' },
]

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [submitterName, setSubmitterName] = useState('')
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [otherLocation, setOtherLocation] = useState('')
  const [showOther, setShowOther] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [category, setCategory] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  function handleFiles(newFiles: FileList | null) {
    if (!newFiles) return
    const arr = Array.from(newFiles).filter((f) => f.type.startsWith('image/'))
    setFiles((prev) => [...prev, ...arr])
    arr.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  function toggleLocation(loc: string) {
    setSelectedLocations((prev) =>
      prev.includes(loc) ? prev.filter((l) => l !== loc) : [...prev, loc]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: Wire to Supabase or API route
    // For now, show success state
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory font-sans text-charcoal flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-taupe" />
          </div>
          <h2 className="text-3xl text-charcoal mb-3">
            Photos Submitted
          </h2>
          <p className="text-warm-gray mb-8">
            {files.length} photo{files.length !== 1 ? 's' : ''} received. We&apos;ll
            review and place them shortly.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setSubmitted(false)
                setFiles([])
                setPreviews([])
                setDescription('')
                setSubmitterName('')
                setSelectedLocations([])
                setOtherLocation('')
                setShowOther(false)
                setProjectName('')
                setCategory('')
              }}
              className="bg-taupe text-ivory px-6 py-3 rounded font-medium hover:bg-charcoal transition-colors"
            >
              Submit More Photos
            </button>
            <Link
              href="/"
              className="text-warm-gray hover:text-taupe transition-colors text-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory font-sans text-charcoal selection:bg-taupe selection:text-white">
      {/* Header */}
      <div className="bg-charcoal pt-12 pb-16">
        <div className="container mx-auto px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-ivory/70 hover:text-white transition-colors text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl text-white mb-3">
            Submit Photos
          </h1>
          <p className="text-ivory/70 text-lg max-w-2xl">
            Upload project photos with a description. We&apos;ll review, name, and
            place them in the right spot.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-6 -mt-8 pb-16">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-sand p-8"
        >
          {/* Photo Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-charcoal mb-3">
              Photos <span className="text-red-500">*</span>
            </label>

            {/* Drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragOver(false)
                handleFiles(e.dataTransfer.files)
              }}
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragOver
                  ? 'border-taupe bg-sand'
                  : 'border-warm-gray/40 hover:border-taupe'
              }`}
            >
              <ImagePlus className="w-10 h-10 text-warm-gray/70 mx-auto mb-3" />
              <p className="text-warm-gray mb-2">
                Drag & drop photos here, or
              </p>
              <div className="flex justify-center gap-3">
                <label className="cursor-pointer bg-taupe text-ivory px-4 py-2 rounded text-sm font-medium hover:bg-charcoal transition-colors inline-flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Browse Files
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </label>
                <label className="cursor-pointer border border-warm-gray/40 text-charcoal px-4 py-2 rounded text-sm font-medium hover:bg-sand transition-colors inline-flex items-center gap-2 md:hidden">
                  <Camera className="w-4 h-4" />
                  Take Photo
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                  />
                </label>
              </div>
            </div>

            {/* Previews */}
            {previews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                {previews.map((src, i) => (
                  <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-sand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`Upload ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Description / Instructions <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder='e.g. "Exterior shot of the rammed earth wall — use as hero image" or "Interior kitchen finish — for portfolio"'
              className="w-full border border-warm-gray/40 rounded-lg px-4 py-3 text-charcoal placeholder:text-warm-gray/70 focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Submitter Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={submitterName}
              onChange={(e) => setSubmitterName(e.target.value)}
              placeholder="e.g. Joe Menton"
              className="w-full border border-warm-gray/40 rounded-lg px-4 py-3 text-charcoal placeholder:text-warm-gray/70 focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent"
              required
            />
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-charcoal mb-3">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleLocation(loc)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedLocations.includes(loc)
                      ? 'bg-taupe text-ivory'
                      : 'bg-sand text-charcoal hover:bg-sand/70'
                  }`}
                >
                  {selectedLocations.includes(loc) && (
                    <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                  )}
                  {loc}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowOther(!showOther)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  showOther
                    ? 'bg-taupe text-ivory'
                    : 'bg-sand text-charcoal hover:bg-sand/70'
                }`}
              >
                {showOther && (
                  <Check className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                )}
                Other
              </button>
            </div>
            {showOther && (
              <input
                type="text"
                value={otherLocation}
                onChange={(e) => setOtherLocation(e.target.value)}
                placeholder="Enter location..."
                className="w-full border border-warm-gray/40 rounded-lg px-4 py-3 text-charcoal placeholder:text-warm-gray/70 focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent"
              />
            )}
          </div>

          {/* Project Name */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Project Name
              <span className="text-warm-gray/70 font-normal ml-2">(optional — for internal reference)</span>
            </label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Smith Residence, Anderson Ranch"
              className="w-full border border-warm-gray/40 rounded-lg px-4 py-3 text-charcoal placeholder:text-warm-gray/70 focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent"
            />
            <p className="text-xs text-warm-gray/70 mt-1.5">
              Last names stay internal — public gallery uses display names like &quot;Hillside Ranch&quot; or &quot;Modern Estate.&quot;
            </p>
          </div>

          {/* Category */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-charcoal mb-2">
              Category
              <span className="text-warm-gray/70 font-normal ml-2">(optional)</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-warm-gray/40 rounded-lg px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-taupe focus:border-transparent bg-white"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={files.length === 0}
            className="w-full bg-taupe text-ivory py-4 rounded-lg font-bold text-lg hover:bg-charcoal transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wide"
          >
            Submit {files.length > 0 ? `${files.length} Photo${files.length !== 1 ? 's' : ''}` : 'Photos'}
          </button>
        </form>
      </div>
    </div>
  )
}
