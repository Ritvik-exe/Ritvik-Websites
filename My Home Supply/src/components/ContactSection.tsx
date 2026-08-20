import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedType, setCopiedType] = useState<'phone' | 'email' | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleCopy = (text: string, type: 'phone' | 'email', e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => {
        setCopiedType(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <section id="contact-section" className="py-20 sm:py-28 px-6 lg:px-10 bg-[#eee0d7]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 border-l-4 border-[#b55c3f] pl-6 md:pl-10 py-2">
          <span className="font-manrope text-xs font-bold text-[#b55c3f] uppercase tracking-widest block mb-3">
            Get in Touch
          </span>
          <h2 className="font-eb-garamond text-3xl sm:text-4xl md:text-5xl font-bold text-[#211a15] mb-4 leading-tight max-w-4xl">
            We're here to help you craft your perfect space.
          </h2>
          <p className="font-manrope text-base sm:text-lg text-[#524439] max-w-2xl leading-relaxed">
            Whether you have a question about our collections, need design advice, or require assistance with an existing order, our team of experts is ready to assist you.
          </p>
        </div>

        {/* Bento Grid Layout for Contact Details & Form */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 xl:gap-12">
          {/* Left Column: Contact Information */}
          <div className="xl:col-span-5 flex flex-col gap-8">
            <div className="p-8 sm:p-10 rounded-2xl flex flex-col justify-between h-full shadow-md bg-white border border-[#d8c3b4]">
              <div>
                <h3 className="font-eb-garamond text-2xl sm:text-3xl font-bold text-[#211a15] mb-8">
                  Contact Information
                </h3>

                {/* Phone */}
                <div className="flex items-start gap-5 mb-8 group">
                  <div className="w-10 h-10 rounded-full bg-[#b55c3f]/10 flex items-center justify-center shrink-0 group-hover:bg-[#b55c3f]/20 transition-colors">
                    <span className="material-symbols-outlined text-[#b55c3f] transition-transform group-hover:scale-110">
                      phone
                    </span>
                  </div>
                  <div>
                    <h4 className="font-manrope text-xs uppercase font-bold text-[#857467] mb-1">
                      Phone
                    </h4>
                    <div className="flex items-center gap-2">
                      <a 
                        href="tel:07774628233" 
                        onClick={(e) => handleCopy('07774 628233', 'phone', e)}
                        className="font-manrope text-base text-[#211a15] hover:text-[#b55c3f] transition-colors cursor-pointer block"
                        title="Click to copy phone number"
                      >
                        07774 628233
                      </a>
                      <button
                        onClick={(e) => handleCopy('07774 628233', 'phone', e)}
                        className="text-[#857467]/60 hover:text-[#b55c3f] transition-all cursor-pointer flex items-center justify-center p-0.5 hover:bg-[#b55c3f]/5 rounded"
                        title="Copy to clipboard"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedType === 'phone' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                      {copiedType === 'phone' && (
                        <span className="text-xs text-emerald-600 font-manrope font-semibold animate-pulse ml-1">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 rounded-full bg-[#b55c3f]/10 flex items-center justify-center shrink-0 group-hover:bg-[#b55c3f]/20 transition-colors">
                    <span className="material-symbols-outlined text-[#b55c3f] transition-transform group-hover:scale-110">
                      mail
                    </span>
                  </div>
                  <div>
                    <h4 className="font-manrope text-xs uppercase font-bold text-[#857467] mb-1">
                      Email
                    </h4>
                    <div className="flex items-center gap-2">
                      <a 
                        href="mailto:info@myhomesupply.co.uk" 
                        onClick={(e) => handleCopy('info@myhomesupply.co.uk', 'email', e)}
                        className="font-manrope text-base text-[#211a15] hover:text-[#b55c3f] transition-colors cursor-pointer block"
                        title="Click to copy email address"
                      >
                        info@myhomesupply.co.uk
                      </a>
                      <button
                        onClick={(e) => handleCopy('info@myhomesupply.co.uk', 'email', e)}
                        className="text-[#857467]/60 hover:text-[#b55c3f] transition-all cursor-pointer flex items-center justify-center p-0.5 hover:bg-[#b55c3f]/5 rounded"
                        title="Copy to clipboard"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {copiedType === 'email' ? 'check' : 'content_copy'}
                        </span>
                      </button>
                      {copiedType === 'email' && (
                        <span className="text-xs text-emerald-600 font-manrope font-semibold animate-pulse ml-1">
                          Copied!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours of Operation */}
              <div className="mt-10 pt-8 border-t border-[#d8c3b4]">
                <h4 className="font-manrope text-xs uppercase font-bold text-[#857467] mb-4">
                  Hours of Operation
                </h4>
                <ul className="font-manrope text-sm text-[#211a15] space-y-3">
                  <li className="flex justify-between items-center">
                    <span>Mon - Fri</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center text-[#857467]">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="xl:col-span-7">
            <div className="p-8 sm:p-12 rounded-2xl shadow-md bg-white border border-[#d8c3b4]">
              {submitted ? (
                <div className="py-12 text-center animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#b55c3f]/10 text-[#b55c3f] flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-4xl">check_circle</span>
                  </div>
                  <h3 className="font-eb-garamond text-3xl font-bold text-[#211a15]">
                    Message Received
                  </h3>
                  <p className="font-manrope text-sm text-[#524439] max-w-md mx-auto mt-2">
                    Thank you, {formData.firstName}. Our architectural design team has received your message and will respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        subject: 'general',
                        message: '',
                      });
                    }}
                    className="mt-6 btn-copper text-white px-6 py-2.5 rounded-sm font-manrope text-xs uppercase font-bold tracking-widest cursor-pointer hover:brightness-110 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="font-manrope text-xs font-bold text-[#857467] block mb-2 uppercase tracking-wider">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="Jane"
                        className="w-full editorial-input-light font-manrope text-base transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="font-manrope text-xs font-bold text-[#857467] block mb-2 uppercase tracking-wider">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Doe"
                        className="w-full editorial-input-light font-manrope text-base transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="font-manrope text-xs font-bold text-[#857467] block mb-2 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full editorial-input-light font-manrope text-base transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="font-manrope text-xs font-bold text-[#857467] block mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full editorial-input-light font-manrope text-base transition-colors cursor-pointer appearance-none pr-10"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="sales">Sales & Product Info</option>
                        <option value="support">Order Support</option>
                        <option value="trade">Trade Account Inquiry</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#b55c3f]">
                        <span className="material-symbols-outlined">expand_more</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="font-manrope text-xs font-bold text-[#857467] block mb-2 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you?"
                      className="w-full editorial-input-light font-manrope text-base transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-copper text-white font-manrope text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300 flex items-center gap-3 justify-center w-full md:w-auto cursor-pointer hover:scale-105 active:scale-95 shadow-lg group"
                    >
                      {loading ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                            arrow_forward
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
