import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav />

      <div className="bg-stone-800 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl text-white mb-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-stone-400 text-sm">
            Last updated: April 9, 2026
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl prose prose-stone prose-headings:font-serif">
          <h2 className="font-serif text-2xl text-stone-900 mb-4">1. Agreement to Terms</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            By accessing and using the Menton Builders website (&ldquo;mentonbuilders.com&rdquo;), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use this website.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">2. Company Information</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Menton Builders Inc. is a licensed general contractor (CA License #XXXXXX, B-General) serving Mendocino County, Sonoma County, and surrounding areas of Northern California. Our principal office is located in Ukiah, California.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">3. Use of This Website</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            This website is provided for informational purposes and to facilitate initial project inquiries. The content on this site, including text, images, and project photographs, is the property of Menton Builders Inc. and may not be reproduced, distributed, or used without written permission.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">4. Contact Form &amp; Inquiries</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            When you submit an inquiry through our contact form, you provide your name, email address, phone number, project location, and optional project details. This information is used solely to respond to your inquiry and is not sold, shared with, or disclosed to third parties. Inquiry data is stored securely and transmitted via encrypted channels.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">5. No Cookies or Tracking</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            This website does not use cookies, analytics trackers, advertising pixels, or any third-party tracking technology. We do not collect browsing data, IP addresses for tracking purposes, or any information beyond what you voluntarily submit through our contact form.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">6. Project Photography</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Project photographs displayed on this website depict actual work completed by Menton Builders. Some images may depict projects completed under previous business arrangements or in collaboration with other professionals. All photographs are the property of Menton Builders Inc. unless otherwise noted.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">7. Estimates &amp; Representations</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Information provided on this website, including service descriptions and project examples, is for general informational purposes only. It does not constitute a binding offer, estimate, or contract. All construction projects are subject to individual assessment, and formal agreements are made through separate written contracts.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">8. Limitation of Liability</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Menton Builders Inc. makes no warranties or representations about the accuracy or completeness of this website&rsquo;s content. To the fullest extent permitted by law, Menton Builders Inc. shall not be liable for any damages arising from the use of this website.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">9. SMS Messaging Terms</h2>
          <p className="text-stone-600 mb-4 leading-relaxed">
            Menton Builders may send SMS (text message) communications to employees and consenting clients for operational and scheduling purposes. By providing your mobile phone number and opting in to SMS communications, you agree to the following:
          </p>
          <ul className="text-stone-600 mb-6 leading-relaxed list-disc pl-6 space-y-2">
            <li><strong>Message frequency varies</strong> based on operational activity and may include multiple messages per day during active job periods.</li>
            <li><strong>Message and data rates may apply.</strong> Standard carrier rates for SMS apply depending on your mobile plan.</li>
            <li><strong>To opt out:</strong> Reply <strong>STOP</strong> to any SMS message at any time. You will receive a single confirmation and no further messages will be sent.</li>
            <li><strong>For help:</strong> Reply <strong>HELP</strong> to any SMS message, or contact us at <a href="mailto:aimee@mentonbuilders.com" className="text-teal-600 hover:text-teal-500">aimee@mentonbuilders.com</a>.</li>
            <li>SMS consent is not a condition of employment or service.</li>
            <li>We do not share your phone number with third parties for their marketing purposes.</li>
          </ul>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">10. Internal App Usage</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Menton Builders operates an internal operations platform (&ldquo;the App&rdquo;) used by employees for timecards, job management, and field communications. Use of the App is limited to authorized Menton Builders employees and contractors. Unauthorized access, misuse of App credentials, or intentional submission of false records (including falsified timecard entries) may result in disciplinary action and/or legal consequences. All App activity is logged and subject to audit.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">11. Governing Law</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            These terms are governed by the laws of the State of California. Any disputes arising from these terms or the use of this website shall be subject to the jurisdiction of the courts of Mendocino County, California.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">12. Contact</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            For questions about these terms, contact us at{' '}
            <a href="mailto:aimee@mentonbuilders.com" className="text-teal-600 hover:text-teal-500">aimee@mentonbuilders.com</a>{' '}
            or call <a href="tel:+17074688814" className="text-teal-600 hover:text-teal-500">(707) 468-8814</a>.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
