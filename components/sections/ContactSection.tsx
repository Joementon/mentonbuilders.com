'use client'

import { useState, FormEvent } from 'react'
import { Check } from 'lucide-react'

const COUNTRY_CODES: Record<string, { name: string; code: string; digits: number }> = {
  '1': { name: 'US/Canada', code: '+1', digits: 10 },
  '44': { name: 'United Kingdom', code: '+44', digits: 10 },
  '61': { name: 'Australia', code: '+61', digits: 9 },
  '49': { name: 'Germany', code: '+49', digits: 11 },
  '33': { name: 'France', code: '+33', digits: 9 },
  '52': { name: 'Mexico', code: '+52', digits: 10 },
  '81': { name: 'Japan', code: '+81', digits: 10 },
  '86': { name: 'China', code: '+86', digits: 11 },
  '91': { name: 'India', code: '+91', digits: 10 },
  '39': { name: 'Italy', code: '+39', digits: 10 },
  '34': { name: 'Spain', code: '+34', digits: 9 },
  '55': { name: 'Brazil', code: '+55', digits: 11 },
  '7': { name: 'Russia', code: '+7', digits: 10 },
  '82': { name: 'South Korea', code: '+82', digits: 10 },
  '31': { name: 'Netherlands', code: '+31', digits: 9 },
  '46': { name: 'Sweden', code: '+46', digits: 9 },
  '41': { name: 'Switzerland', code: '+41', digits: 9 },
  '64': { name: 'New Zealand', code: '+64', digits: 9 },
  '353': { name: 'Ireland', code: '+353', digits: 9 },
  '972': { name: 'Israel', code: '+972', digits: 9 },
}

function detectCountry(digits: string) {
  for (const len of [3, 2, 1]) {
    const prefix = digits.slice(0, len)
    if (COUNTRY_CODES[prefix]) return COUNTRY_CODES[prefix]
  }
  return null
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    projectType: '',
    budget: '',
    details: '',
  })
  const [isInternational, setIsInternational] = useState(false)
  const [phoneCountry, setPhoneCountry] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function formatPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '')
    if (isInternational) {
      const country = detectCountry(digits)
      if (country) {
        const national = digits.slice(country.code.replace('+', '').length)
        return `${country.code} ${national}`
      }
      return `+${digits}`
    }
    const d = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits
    if (d.length === 10) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
    return raw
  }

  function validatePhone(raw: string): string | null {
    const digits = raw.replace(/\D/g, '')
    if (!raw.trim()) return 'Phone number is required'
    if (isInternational) {
      const country = detectCountry(digits)
      if (!country) return 'Unrecognized country code'
      const national = digits.slice(country.code.replace('+', '').length)
      if (national.length < 7 || national.length > 12) return `Invalid number for ${country.name}`
      return null
    }
    const d = digits.length === 11 && digits[0] === '1' ? digits.slice(1) : digits
    if (d.length !== 10) return 'Enter a valid 10-digit phone number'
    return null
  }

  function handlePhoneBlur() {
    const digits = formData.phone.replace(/\D/g, '')
    if (!digits) return
    const error = validatePhone(formData.phone)
    if (error) {
      setFormErrors({ ...formErrors, phone: error })
    } else {
      const formatted = formatPhone(formData.phone)
      setFormData({ ...formData, phone: formatted })
      setFormErrors({ ...formErrors, phone: '' })
      if (isInternational) {
        const country = detectCountry(digits)
        setPhoneCountry(country?.name || '')
      } else {
        setPhoneCountry('US')
      }
    }
  }

  function validateForm(): boolean {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = 'Name is required'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!emailRegex.test(formData.email.trim())) errors.email = 'Enter a valid email address'
    const phoneError = validatePhone(formData.phone)
    if (phoneError) errors.phone = phoneError
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmitInquiry(e: FormEvent) {
    e.preventDefault()
    if (!validateForm()) return
    setFormStatus('sending')
    const formatted = formatPhone(formData.phone)
    const submissionData = {
      ...formData,
      phone: formatted,
      isInternational,
      phoneCountry: isInternational ? (detectCountry(formData.phone.replace(/\D/g, ''))?.name || 'Unknown') : 'US',
    }
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })
      if (!res.ok) throw new Error()
      setFormStatus('sent')
      setFormErrors({})
      setFormData({ name: '', email: '', phone: '', location: '', projectType: '', budget: '', details: '' })
      setIsInternational(false)
      setPhoneCountry('')
    } catch {
      setFormStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block text-teal-600 text-sm font-bold tracking-widest uppercase mb-4">
              Contact
            </div>
            <h2 className="font-serif text-4xl text-stone-900 mb-4">
              Start Your Project
            </h2>
            <p className="text-stone-600">
              Tell us about what you&rsquo;re building. We&rsquo;ll follow up
              within 2 business days.
            </p>
          </div>

          {formStatus === 'sent' ? (
            <div className="bg-white shadow-2xl p-8 md:p-12 rounded border border-stone-200 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Inquiry Received</h3>
              <p className="text-stone-600 mb-6">Thank you! We&rsquo;ll review your project details and get back to you within 2 business days.</p>
              <button
                type="button"
                onClick={() => setFormStatus('idle')}
                className="text-teal-600 font-bold text-sm uppercase tracking-wider hover:text-teal-500"
              >
                Submit Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitInquiry} className="shadow-2xl rounded-lg overflow-hidden border border-stone-200">
              {/* Required Section */}
              <div className="bg-white p-8 md:p-12">
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-teal-700">Your Information</h3>
                  <span className="text-xs text-red-400 font-medium">* Required</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: '' }) }}
                      className={`w-full border-b-2 py-2 focus:outline-none transition-colors bg-transparent ${formErrors.name ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-teal-500'}`}
                      placeholder="First Last"
                    />
                    {formErrors.name && <p className="text-xs text-red-500">{formErrors.name}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: '' }) }}
                      className={`w-full border-b-2 py-2 focus:outline-none transition-colors bg-transparent ${formErrors.email ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-teal-500'}`}
                      placeholder="email@address.com"
                    />
                    {formErrors.email && <p className="text-xs text-red-500">{formErrors.email}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setFormErrors({ ...formErrors, phone: '' }) }}
                      onBlur={handlePhoneBlur}
                      className={`w-full border-b-2 py-2 focus:outline-none transition-colors bg-transparent ${formErrors.phone ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-teal-500'}`}
                      placeholder={isInternational ? '+44 7911 123456' : '(707) 468-8814'}
                    />
                    {formErrors.phone && <p className="text-xs text-red-500">{formErrors.phone}</p>}
                    {phoneCountry && !formErrors.phone && <p className="text-xs text-teal-600">{phoneCountry}</p>}
                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isInternational}
                        onChange={(e) => { setIsInternational(e.target.checked); setPhoneCountry(''); setFormErrors({ ...formErrors, phone: '' }) }}
                        className="w-3.5 h-3.5 rounded border-stone-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-xs text-stone-400">International number</span>
                    </label>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Project Location (City) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full border-b-2 border-stone-200 py-2 focus:outline-none focus:border-teal-500 transition-colors bg-transparent"
                      placeholder="e.g. Covelo, Healdsburg"
                    />
                  </div>
                </div>
              </div>

              {/* Optional Section */}
              <div className="bg-stone-50 p-8 md:p-12 border-t border-stone-200">
                <div className="flex items-center gap-2 mb-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400">Project Details</h3>
                  <span className="text-xs text-stone-400 font-medium">Optional</span>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Project Type
                    </label>
                    <input
                      type="text"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full border-b-2 border-stone-200 py-2 bg-transparent focus:outline-none focus:border-teal-500 transition-colors text-stone-700"
                      placeholder="e.g. Custom home, renovation, ADU, barn"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                      Estimated Budget
                    </label>
                    <input
                      type="text"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full border-b-2 border-stone-200 py-2 bg-transparent focus:outline-none focus:border-teal-500 transition-colors text-stone-700"
                      placeholder="e.g. $500k - $1M, not sure yet"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-stone-500 tracking-wider">
                    Project Details / Goals
                  </label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full border-2 border-stone-200 p-4 rounded focus:outline-none focus:border-teal-500 transition-colors h-32 bg-white"
                    placeholder="Tell us about your timeline, lot status, and design vision..."
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="bg-white p-8 md:px-12 md:py-8 border-t border-stone-200">
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full bg-teal-600 text-white py-4 font-bold tracking-widest uppercase hover:bg-teal-500 transition-colors shadow-lg rounded text-lg disabled:opacity-50"
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Submit Inquiry'}
                </button>
                {formStatus === 'error' && (
                  <p className="text-center text-sm text-red-500 mt-4">
                    Something went wrong. Please try again or call us directly.
                  </p>
                )}
                <p className="text-center text-xs text-stone-400 mt-4">
                  We respect your privacy. Your information is never shared.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
