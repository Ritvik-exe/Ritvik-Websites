import React from 'react';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome }) => {
  return (
    <div className="w-full bg-[#fcf9f6] text-[#211a15] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[800px] mx-auto">
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#857467] hover:text-[#b55c3f] transition-colors mb-12 cursor-pointer"
          id="btn-back-from-privacy"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Home
        </button>

        {/* Header */}
        <header className="border-b border-[#eee0d7] pb-8 mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-[#211a15] mb-3">
            Privacy Policy
          </h1>
          <p className="text-xs font-semibold text-[#857467] uppercase tracking-wider">
            Last updated: August 31, 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 font-manrope text-sm text-[#4a3e35] leading-relaxed">
          <section>
            <p className="mb-4">
              At <strong>My Home Supply</strong>, accessible from our digital portal, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by My Home Supply and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact our customer support or advisory desk.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              1. Information We Collect
            </h2>
            <p className="mb-3">
              The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Direct Contact:</strong> If you contact us directly (e.g., via our support inquiry form), we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
              </li>
              <li>
                <strong>Trade Accounts:</strong> When you register for a Trade Account or request specifications, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide, operate, and maintain our product catalog and design suite.</li>
              <li>Improve, personalize, and expand our catalog selections and customer journey.</li>
              <li>Understand and analyze how you interact with our website and product options.</li>
              <li>Develop new products, services, features, and finish specifications.</li>
              <li>Communicate with you, either directly or through one of our trade specialists, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
              <li>Send you emails or direct notifications regarding requested technical drawings or specifications.</li>
              <li>Find and prevent fraudulent quote requests or service inquiries.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              3. Quote Requests and Architectural Inquiries
            </h2>
            <p>
              When requesting quotes or digital specifications through our system, your information is processed securely. We share requested specifications with certified logistics partners and regional engineering specialists solely to produce accurate delivery quotes and dispatch guarantees. Your structural specifications or contact information will never be leased or sold to third-party marketing firms.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              4. Log Files and Analytical Cookies
            </h2>
            <p>
              My Home Supply follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and are part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              5. GDPR and California Privacy Rights (CCPA)
            </h2>
            <p className="mb-3">
              We want to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>The right to access:</strong> You have the right to request copies of your personal data.</li>
              <li><strong>The right to rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
              <li><strong>The right to erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
              <li><strong>The right to restrict or object to processing:</strong> You have the right to request that we restrict the processing of your personal data, or object to our processing, under certain conditions.</li>
            </ul>
          </section>

          <section className="border-t border-[#eee0d7] pt-8">
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              6. Consent
            </h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms. If you have any inquiries regarding data protection, please contact us at <span className="text-[#b55c3f] hover:underline font-semibold cursor-pointer">info@myhomesupply.co.uk</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
