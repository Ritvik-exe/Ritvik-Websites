import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedType, setCopiedType] = useState<'phone' | 'email' | null>(null);

  const handleCopy = (text: string, type: 'phone' | 'email', e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '4ab4cfb0-b437-44bc-bdd2-a0a1a1e01048',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'New Inquiry from My Home Supply Website',
          message: formData.message,
          from_name: 'My Home Supply Contact Form',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.message || 'There was an issue sending your message. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Network error occurred. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 sm:py-28 px-6 lg:px-10 bg-[#eee0d7]">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 border-l-4 border-[#b55c3f] pl-6 md:pl-10 py-2">
          <span className="font-manrope text-xs font-bold text-[#b55c3f] uppercase tracking-widest block mb-3">
            Get in Touch
          </span>
          <h2 className="font-eb-garamond text-3xl sm:text-4xl md:text-5xl font-bold copper-text pb-1 mb-4 leading-tight max-w-4xl">
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
                <h3 className="font-eb-garamond text-2xl sm:text-3xl font-bold copper-text pb-1 mb-8">
                  Contact Information
                </h3>

                {/* Phone */}
                <div 
                  onClick={(e) => handleCopy('07774 628233', 'phone', e)}
                  className="flex items-start gap-5 mb-8 group cursor-pointer"
                  title="Click to copy phone number"
                >
                  <div className="w-10 h-10 rounded-full bg-[#b55c3f]/10 flex items-center justify-center shrink-0 group-hover:bg-[#b55c3f]/20 transition-colors">
                    <span className="material-symbols-outlined text-[#b55c3f] transition-transform group-hover:scale-110">
                      phone
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-manrope text-xs uppercase font-bold text-[#857467]">
                        Phone
                      </h4>
                      {copiedType === 'phone' && (
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-sm px-1.5 py-0.2 font-bold uppercase tracking-wider animate-fadeIn">
                          Copied to Clipboard!
                        </span>
                      )}
                    </div>
                    <span className="font-manrope text-base text-[#211a15] group-hover:text-[#b55c3f] transition-colors block font-semibold">
                      07774 628233
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div 
                  onClick={(e) => handleCopy('info@myhomesupply.co.uk', 'email', e)}
                  className="flex items-start gap-5 group cursor-pointer"
                  title="Click to copy email address"
                >
                  <div className="w-10 h-10 rounded-full bg-[#b55c3f]/10 flex items-center justify-center shrink-0 group-hover:bg-[#b55c3f]/20 transition-colors">
                    <span className="material-symbols-outlined text-[#b55c3f] transition-transform group-hover:scale-110">
                      mail
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-manrope text-xs uppercase font-bold text-[#857467]">
                        Email
                      </h4>
                      {copiedType === 'email' && (
                        <span className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-sm px-1.5 py-0.2 font-bold uppercase tracking-wider animate-fadeIn">
                          Copied to Clipboard!
                        </span>
                      )}
                    </div>
                    <span className="font-manrope text-base text-[#211a15] group-hover:text-[#b55c3f] transition-colors block font-semibold break-all">
                      info@myhomesupply.co.uk
                    </span>
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
                  <h3 className="font-eb-garamond text-3xl font-bold copper-text pb-1">
                    Message Received
                  </h3>
                  <p className="font-manrope text-sm text-[#524439] max-w-md mx-auto mt-2">
                    Thank you{formData.name ? `, ${formData.name}` : ''}. Our architectural design team has received your message and will respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        subject: 'General Inquiry',
                        message: '',
                      });
                    }}
                    className="mt-6 btn-copper text-white px-6 py-2.5 rounded-sm font-manrope text-xs uppercase font-bold tracking-widest cursor-pointer hover:brightness-110 transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form 
                  action="https://api.web3forms.com/submit" 
                  method="POST"
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <input type="hidden" name="access_key" value="4ab4cfb0-b437-44bc-bdd2-a0a1a1e01048" />
                  <input type="hidden" name="from_name" value="My Home Supply Contact Form" />

                  {errorMessage && (
                    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm font-manrope">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="font-manrope text-xs font-bold text-[#857467] block mb-2 uppercase tracking-wider">
                        Your Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Doe"
                        className="w-full editorial-input-light font-manrope text-base transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="font-manrope text-xs font-bold text-[#857467] block mb-2 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="jane@example.com"
                        className="w-full editorial-input-light font-manrope text-base transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="font-manrope text-xs font-bold text-[#857467] block mb-2 uppercase tracking-wider">
                      Subject
                    </label>
                    <div className="relative">
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full editorial-input-light font-manrope text-base transition-colors cursor-pointer appearance-none pr-10"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Sales & Product Info">Sales & Product Info</option>
                        <option value="Order Support">Order Support</option>
                        <option value="Trade Account Inquiry">Trade Account Inquiry</option>
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
                      name="message"
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
                      className="btn-copper text-white font-manrope text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-sm transition-all duration-300 flex items-center gap-3 justify-center w-full md:w-auto cursor-pointer hover:scale-105 active:scale-95 shadow-lg group disabled:opacity-70 disabled:cursor-not-allowed"
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

