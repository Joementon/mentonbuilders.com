import Nav from '@/components/Nav'
import HeroSection from '@/components/sections/HeroSection'
import TestimonialCarousel from '@/components/sections/TestimonialCarousel'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav transparent />
      <HeroSection />
      <TestimonialCarousel />
      <ContactSection />
      <Footer />
    </div>
  )
}
