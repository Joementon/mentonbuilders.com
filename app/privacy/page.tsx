import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-teal-800 selection:text-white">
      <Nav />

      <div className="bg-stone-800 pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="font-serif text-4xl text-white mb-2">
            Privacy Policy
          </h1>
          <p className="text-stone-400 text-sm">
            Last updated: April 9, 2026
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl prose prose-stone prose-headings:font-serif">

          <h2 className="font-serif text-2xl text-stone-900 mb-4">1. Overview</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Menton Builders Inc. (&ldquo;Menton Builders,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard personal information from clients, prospective clients, and employees who interact with our website or internal operations platform.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">2. Information We Collect</h2>
          <p className="text-stone-600 mb-4 leading-relaxed">
            We may collect the following categories of information:
          </p>
          <ul className="text-stone-600 mb-6 leading-relaxed list-disc pl-6 space-y-2">
            <li><strong>Contact information:</strong> Name, email address, and phone number — collected when you submit an inquiry or are enrolled as an employee.</li>
            <li><strong>Project details:</strong> Project location, description, and scope information provided in contact or quote requests.</li>
            <li><strong>Employee operational data:</strong> Timecard entries (clock-in/out, job codes, activity), job site assignments, and payroll-relevant information.</li>
            <li><strong>Location data:</strong> GPS or location data may be collected through our internal app when location services are enabled on a device used for field operations. This is used solely for job site verification and scheduling.</li>
            <li><strong>Photos:</strong> Job site photographs uploaded through our internal platform for documentation, project management, and quality control purposes.</li>
          </ul>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">3. How We Use Your Information</h2>
          <p className="text-stone-600 mb-4 leading-relaxed">
            We use collected information for the following purposes:
          </p>
          <ul className="text-stone-600 mb-6 leading-relaxed list-disc pl-6 space-y-2">
            <li>Responding to project inquiries and quote requests</li>
            <li>Payroll processing and compliance with California labor law</li>
            <li>Scheduling and job site management</li>
            <li>Business communication, including SMS notifications to employees and clients</li>
            <li>Internal documentation, auditing, and operations management</li>
            <li>Improving our internal systems and workflows</li>
          </ul>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">4. SMS Messaging (Text Messages)</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Menton Builders uses SMS messaging to communicate with employees and, where consent has been given, with clients regarding scheduling, job updates, and operational notifications. By providing your mobile phone number and consenting to SMS communications:
          </p>
          <ul className="text-stone-600 mb-6 leading-relaxed list-disc pl-6 space-y-2">
            <li><strong>Message frequency:</strong> Message frequency varies based on operational needs. You may receive multiple messages per day during active job periods.</li>
            <li><strong>Message and data rates may apply.</strong> Standard carrier rates for SMS apply depending on your mobile plan.</li>
            <li><strong>To opt out:</strong> Reply <strong>STOP</strong> to any SMS message at any time to unsubscribe. You will receive a confirmation and no further messages will be sent.</li>
            <li><strong>For help:</strong> Reply <strong>HELP</strong> to any SMS message, or contact us at <a href="mailto:aimee@mentonbuilders.com" className="text-teal-700 hover:text-brass transition-colors">aimee@mentonbuilders.com</a>.</li>
            <li>Opting out of SMS does not affect your ability to use other communication channels with us.</li>
          </ul>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">5. Data Storage and Security</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Your data is stored using Supabase, a cloud database platform that provides encryption at rest and in transit. Access to stored data is restricted to authorized Menton Builders personnel. We implement industry-standard technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">6. Third-Party Service Providers</h2>
          <p className="text-stone-600 mb-4 leading-relaxed">
            We do not sell, rent, or trade your personal information to third parties. We may share data with trusted service providers who assist in operating our business, under strict data processing agreements. These include:
          </p>
          <ul className="text-stone-600 mb-6 leading-relaxed list-disc pl-6 space-y-2">
            <li><strong>Supabase</strong> — database storage and authentication</li>
            <li><strong>Resend</strong> — transactional email delivery</li>
            <li><strong>Twilio</strong> — SMS messaging delivery</li>
            <li><strong>OpenAI</strong> — AI-assisted transcription and data processing (where applicable)</li>
            <li><strong>Vercel</strong> — cloud hosting and deployment</li>
          </ul>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Each provider is bound by their own privacy policies and applicable data protection laws. We do not authorize these providers to use your data for any purpose other than providing services to us.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">7. Employee Rights</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Current and former employees have the right to:
          </p>
          <ul className="text-stone-600 mb-6 leading-relaxed list-disc pl-6 space-y-2">
            <li><strong>Access</strong> their personal data held by Menton Builders</li>
            <li><strong>Request correction</strong> of inaccurate personal information</li>
            <li><strong>Request deletion</strong> of their data after employment ends, subject to legal retention requirements (e.g., payroll records, tax documents)</li>
          </ul>
          <p className="text-stone-600 mb-6 leading-relaxed">
            To exercise these rights, contact us at <a href="mailto:aimee@mentonbuilders.com" className="text-teal-700 hover:text-brass transition-colors">aimee@mentonbuilders.com</a>.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">8. California Privacy Rights (CCPA)</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected about them, the right to request deletion of that information, and the right to opt out of the sale of their personal information. We do not sell personal information. To submit a CCPA request, contact us at the email address below.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">9. Data Retention</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            We retain personal data only as long as necessary to fulfill the purposes described in this policy, or as required by law. Payroll and tax records are retained in accordance with California and federal requirements (typically 3&ndash;7 years). Project inquiry data is retained for up to 2 years unless a project relationship is established, in which case it is retained for the duration of the project and applicable warranty period.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">10. Changes to This Policy</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted at this URL with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy periodically.
          </p>

          <h2 className="font-serif text-2xl text-stone-900 mb-4">11. Contact Us</h2>
          <p className="text-stone-600 mb-6 leading-relaxed">
            For questions or concerns about this Privacy Policy, or to exercise your data rights, contact us at:
          </p>
          <p className="text-stone-600 mb-2 leading-relaxed">
            <strong>Menton Builders Inc.</strong><br />
            Ukiah, California
          </p>
          <p className="text-stone-600 mb-2 leading-relaxed">
            Email: <a href="mailto:aimee@mentonbuilders.com" className="text-teal-700 hover:text-brass transition-colors">aimee@mentonbuilders.com</a>
          </p>
          <p className="text-stone-600 mb-6 leading-relaxed">
            Phone: <a href="tel:+17074688814" className="text-teal-700 hover:text-brass transition-colors">(707) 468-8814</a>
          </p>

        </div>
      </div>

      <Footer />
    </div>
  )
}
