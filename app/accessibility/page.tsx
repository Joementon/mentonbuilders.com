import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav />

      <div className="bg-stone-800 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl text-white mb-2">
            Accessibility Statement
          </h1>
          <p className="text-stone-400 text-sm">
            Last updated: April 2, 2026
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl prose prose-stone prose-headings:font-serif">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">Our Commitment</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Menton Builders Inc. is committed to ensuring that our website is accessible to all visitors, including people with disabilities. We strive to meet or exceed the requirements of the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">Accessibility Features</h2>
          <p className="text-stone-600 mb-2 leading-relaxed">
            This website incorporates the following accessibility features:
          </p>
          <ul className="text-stone-600 mb-6 space-y-2 list-disc pl-6">
            <li><strong>Semantic HTML</strong> — proper heading hierarchy, landmark regions, and structured content for screen readers</li>
            <li><strong>Keyboard navigation</strong> — all interactive elements (links, buttons, form fields) are accessible via keyboard</li>
            <li><strong>Alt text</strong> — all images include descriptive alternative text</li>
            <li><strong>Color contrast</strong> — text and interactive elements maintain sufficient color contrast ratios against their backgrounds</li>
            <li><strong>Responsive design</strong> — the site adapts to different screen sizes and zoom levels up to 200%</li>
            <li><strong>Form labels</strong> — all form inputs have visible labels and clear error messages</li>
            <li><strong>No auto-playing audio</strong> — the site does not play audio or video automatically</li>
            <li><strong>Focus indicators</strong> — visible focus states on interactive elements for keyboard users</li>
          </ul>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">Known Limitations</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            While we strive for full accessibility, some legacy project photographs in our gallery may have limited alt text descriptions. We are working to improve image descriptions on an ongoing basis.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">Third-Party Content</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            This website does not embed third-party content, social media widgets, or external scripts that could introduce accessibility barriers. We do not use cookies or tracking technologies.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">Feedback &amp; Assistance</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            If you experience any difficulty accessing content on this website, or if you have suggestions for improving accessibility, please contact us:
          </p>
          <ul className="text-stone-600 mb-6 space-y-2 list-disc pl-6">
            <li>Email: <a href="mailto:aimee@mentonbuilders.com" className="text-teal-600 hover:text-teal-500">aimee@mentonbuilders.com</a></li>
            <li>Phone: <a href="tel:+17074688814" className="text-teal-600 hover:text-teal-500">(707) 468-8814</a></li>
          </ul>
          <p className="text-stone-600 mb-6 leading-relaxed">
            We take accessibility feedback seriously and will make reasonable efforts to address any reported issues promptly.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">Conformance Status</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            This website aims to conform to WCAG 2.1 Level AA. We regularly review our site and update content to maintain and improve accessibility. This statement was last reviewed on April 2, 2026.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
