import Nav from '@/components/Nav'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav activePath="/contact" />
      <div className="pt-16">
        <ContactSection />
      </div>
      <Footer />
    </div>
  )
}
