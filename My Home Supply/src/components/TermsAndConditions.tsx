import React from 'react';

interface TermsAndConditionsProps {
  onBackToHome: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBackToHome }) => {
  return (
    <div className="w-full bg-[#fcf9f6] text-[#211a15] py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[800px] mx-auto">
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#857467] hover:text-[#b55c3f] transition-colors mb-12 cursor-pointer"
          id="btn-back-from-terms"
        >
          <span className="material-symbols-outlined text-sm group-hover:-translate-x-1 transition-transform">
            arrow_back
          </span>
          Back to Home
        </button>

        {/* Header */}
        <header className="border-b border-[#eee0d7] pb-8 mb-10">
          <h1 className="font-serif text-3xl md:text-4xl text-[#211a15] mb-3">
            Terms & Conditions
          </h1>
          <p className="text-xs font-semibold text-[#857467] uppercase tracking-wider">
            Last updated: August 31, 2026
          </p>
        </header>

        {/* Content */}
        <div className="space-y-8 font-manrope text-sm text-[#4a3e35] leading-relaxed">
          <section>
            <p className="mb-4">
              Welcome to <strong>My Home Supply</strong>. These terms and conditions outline the rules and regulations for the use of My Home Supply's Website, located at our digital application domain.
            </p>
            <p>
              By accessing this website we assume you accept these terms and conditions. Do not continue to use My Home Supply if you do not agree to take all of the terms and conditions stated on this page.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              1. Intellectual Property Rights
            </h2>
            <p>
              Other than the content you own, under these Terms, My Home Supply and/or its licensors own all the intellectual property rights and materials contained in this Website. All images, specifications, high-definition catalog render photographs, custom drawings, and descriptive copy remain the exclusive property of My Home Supply and our luxury manufacture partners. You are granted a limited license only for purposes of viewing the material contained on this Website.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              2. Restrictions on Use
            </h2>
            <p className="mb-3">
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Publishing any Website material, images, or specs in any other media without written consent.</li>
              <li>Selling, sublicensing, and/or otherwise commercializing any Website material.</li>
              <li>Publicly performing and/or showing any Website material in a commercial capacity.</li>
              <li>Using this Website in any way that is or may be damaging to this Website or our servers.</li>
              <li>Using this Website in any way that impacts user access to this Website.</li>
              <li>Using this Website contrary to applicable laws and regulations, or in any way that may cause harm to the Website, or to any person or business entity.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              3. Quote Requests & Pricing Accuracy
            </h2>
            <p>
              Prices shown in our digital catalog are indicative of manufacturer recommended retail pricing (RRP) and are subject to change without prior notice based on custom finish selection, architectural scale, or material availability. A formal contract is only established upon approval of a customized quote dispatched by our trade desk and signed by both parties. Any automated quote request initiated on this site constitutes an expression of interest and does not bind My Home Supply to dispatch fixtures under the specified prices.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              4. Finish & Product Specifications
            </h2>
            <p>
              We strive to display as accurately as possible the colors, finishes, gradients, and dimensions of our luxury bath products (such as Brushed Copper, Aged Brass, Matte Black, Satin Nickel). However, actual finishes may vary slightly depending on lighting conditions, display calibration, and custom production runs. We advise trade clients to coordinate with our advisory desks for physical metal samples before finalizing large construction projects.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              5. Limitation of Liability
            </h2>
            <p>
              In no event shall My Home Supply, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract. My Home Supply, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website or the installations of fittings purchased from us.
            </p>
          </section>

          <section className="border-t border-[#eee0d7] pt-8">
            <h2 className="font-serif text-xl text-[#211a15] mb-3">
              6. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms will be governed by and interpreted in accordance with the laws of the United Kingdom, and you submit to the non-exclusive jurisdiction of the state and federal courts located in the UK for the resolution of any disputes. For legal and compliance queries, please contact <span className="text-[#b55c3f] hover:underline font-semibold cursor-pointer">info@myhomesupply.co.uk</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
