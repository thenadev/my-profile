"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const PrivacyPage: React.FC = () => {
  return (
    <div className="min-h-screen w-screen py-20 flex flex-col items-center gap-8 px-4 md:px-8 bg-gray-50 text-slate-700">
      {/* Privacy Policy Card Section */}
      <div className="w-full max-w-5xl flex flex-col items-center justify-start gap-8 px-4 md:px-8 mt-10">
        <Card className="w-full md:w-3/4 lg:w-3/4 shadow-lg bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <CardHeader>
            <CardTitle className="text-2xl md:text-4xl font-bold text-center md:text-left">
              Privacy Policy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm md:text-base text-left mt-2 md:mt-4">
              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Introduction
              </h2>
              <p className="mb-4">
                Thank you for visiting {siteConfig.companyName}! We are
                committed to protecting your personal data and respecting your
                privacy. This privacy policy will inform you about how we handle
                your data when you use our services.
              </p>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Information We Collect
              </h2>
              <p className="mb-4">
                We collect information to improve our services and enhance your
                experience. The types of information we collect include:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>
                  Personal Identification Information (e.g., your name and email
                  address) when provided by you voluntarily.
                </li>
                <li>
                  Usage Data such as your browser type, IP address, and how you
                  interact with our website. This helps us analyze user behavior
                  and improve our services.
                </li>
              </ul>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                How We Use Your Data
              </h2>
              <p className="mb-4">
                We use your data for the following purposes:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>To personalize your experience on our website.</li>
                <li>To provide, operate, and maintain our services.</li>
                <li>
                  To improve the functionality and usability of our website.
                </li>
                <li>
                  To analyze and understand how users interact with our services
                  to enhance the overall experience.
                </li>
                <li>
                  To communicate with you, such as providing support or updates.
                </li>
              </ul>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Google Analytics
              </h2>
              <p className="mb-4">
                We use Google Analytics, a web analytics service provided by
                Google LLC, to understand how visitors interact with our
                website. Google Analytics uses cookies to collect information
                about your use of the website, such as pages visited, time spent
                on the site, and referring websites. This data helps us analyze
                user behavior to improve the content and functionality of our
                website.
              </p>
              <p className="mb-4">
                You can opt out of Google Analytics tracking by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Google Analytics Opt-Out Browser Add-on
                </a>
                .
              </p>
              <p className="mb-4">
                For more information on how Google processes your data, please
                see the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  Google Privacy Policy
                </a>
                .
              </p>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Cookies
              </h2>
              <p className="mb-4">
                Our website uses cookies to improve your browsing experience.
                Cookies are small files stored on your device that help us
                understand your preferences and how you interact with our
                website. By using our website, you consent to the use of
                cookies. If you do not wish to use cookies, you can disable them
                in your browser settings, though some features of our website
                may not function properly without them.
              </p>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Third-Party Sharing
              </h2>
              <p className="mb-4">
                We do not sell, trade, or transfer your personal data to third
                parties, except where it is necessary to provide services or
                comply with legal requirements. Google Analytics is the only
                third-party service provider involved, and data collected
                through Google Analytics may be processed by Google to provide
                web analytics services.
              </p>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Security of Your Information
              </h2>
              <p className="mb-4">
                We take the security of your personal information seriously and
                use commercially acceptable measures to protect it. However,
                please note that no method of transmission over the internet or
                electronic storage is 100% secure.
              </p>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Your Rights
              </h2>
              <p className="mb-4">
                You have the right to access, update, or delete your personal
                information. If you wish to exercise any of these rights, please
                contact us at{" "}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {siteConfig.contactEmail}
                </a>
                .
              </p>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Changes to This Privacy Policy
              </h2>
              <p className="mb-4">
                We may update this privacy policy from time to time to reflect
                changes in our practices or services. The updated policy will be
                posted on this page, and the effective date will be revised
                accordingly.
              </p>

              <h2 className="text-lg md:text-2xl font-semibold mb-2">
                Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions regarding this privacy policy or how
                we handle your personal information, please contact us at:{" "}
                <br />
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-blue-500 underline hover:text-blue-700"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPage;
