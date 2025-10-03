import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-8 text-amber-400 hover:text-amber-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Timer
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Information We Collect</h2>
            <p className="text-gray-300 leading-relaxed">
              Our New Year Countdown Timer is designed to be privacy-friendly. We do not collect any personal information 
              directly. However, we use Google AdSense to display advertisements, which may collect certain information 
              as described below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Google AdSense</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              This website uses Google AdSense to display advertisements. Google AdSense may collect and use information 
              about your visits to this and other websites to provide targeted advertisements.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Google may use cookies and web beacons to collect information including:
            </p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li>Your IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited on our site</li>
              <li>Time spent on pages</li>
              <li>Referring website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Cookies</h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              We use cookies to enhance your experience:
            </p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li><strong>Functional Cookies:</strong> Remember your preferences (music settings, fullscreen mode)</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Advertising Cookies:</strong> Used by Google AdSense to display relevant ads</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Third-Party Services</h2>
            <p className="text-gray-300 leading-relaxed">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li><strong>Google AdSense:</strong> For displaying advertisements</li>
              <li><strong>Google Analytics:</strong> For website analytics (if implemented)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Your Rights</h2>
            <p className="text-gray-300 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-300 ml-4 space-y-2">
              <li>Disable cookies in your browser settings</li>
              <li>Opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-400 hover:text-blue-300 underline">Google Ad Settings</a></li>
              <li>Use ad blockers to prevent ads from displaying</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Data Security</h2>
            <p className="text-gray-300 leading-relaxed">
              We take data security seriously. Our website uses HTTPS encryption to protect data transmission. 
              Since we don't collect personal information directly, there's minimal risk to your privacy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Children's Privacy</h2>
            <p className="text-gray-300 leading-relaxed">
              Our website is suitable for all ages. We do not knowingly collect personal information from children 
              under 13. If you are a parent and believe your child has provided personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Changes to This Policy</h2>
            <p className="text-gray-300 leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on this page with 
              an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-amber-400 mb-4">Contact Information</h2>
            <p className="text-gray-300 leading-relaxed">
              If you have any questions about this privacy policy, please contact us at: [Your Email Address]
            </p>
          </section>

          <section className="text-center mt-12 pt-8 border-t border-gray-700">
            <p className="text-gray-400">
              <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;