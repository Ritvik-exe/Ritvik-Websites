import React from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onNavigateContact: () => void;
  onOpenCatalog: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateContact, onOpenCatalog }) => {
  return (
    <footer className="w-full bg-[#211a15] text-[#eee0d7] border-t border-[#372f29] mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 px-6 sm:px-10 py-16 max-w-[1280px] mx-auto">
        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Logo size="md" />
          <p className="font-manrope text-xs text-[#d8c3b4] leading-relaxed max-w-xs mt-2">
            © 2026 My Home Supply. Precision Engineered Luxury. High-end bath fixtures and architectural fittings.
          </p>
        </div>

        {/* Customer Care Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-manrope text-xs font-bold text-[#ffb77b] uppercase tracking-widest mb-1">
            Service & Support
          </h4>
          <a href="#shipping" className="font-manrope text-xs text-[#d8c3b4] hover:text-[#ffb77b] transition-colors hover:underline underline-offset-4">
            Shipping & Dispatch
          </a>
          <a href="#returns" className="font-manrope text-xs text-[#d8c3b4] hover:text-[#ffb77b] transition-colors hover:underline underline-offset-4">
            Returns & Guarantee
          </a>
          <a href="#warranty" className="font-manrope text-xs text-[#d8c3b4] hover:text-[#ffb77b] transition-colors hover:underline underline-offset-4">
            15-Year Warranty Info
          </a>
        </div>

        {/* Company Links */}
        <div className="flex flex-col gap-3">
          <h4 className="font-manrope text-xs font-bold text-[#ffb77b] uppercase tracking-widest mb-1">
            Architecture & Trade
          </h4>
          <button 
            onClick={onNavigateContact}
            className="text-left font-manrope text-xs text-[#d8c3b4] hover:text-[#ffb77b] transition-colors hover:underline underline-offset-4 cursor-pointer"
          >
            Contact Us
          </button>
          <button 
            onClick={onOpenCatalog}
            className="text-left font-manrope text-xs text-[#d8c3b4] hover:text-[#ffb77b] transition-colors hover:underline underline-offset-4 cursor-pointer"
          >
            Digital Catalog Download
          </button>
          <a href="#privacy" className="font-manrope text-xs text-[#d8c3b4] hover:text-[#ffb77b] transition-colors hover:underline underline-offset-4">
            Privacy Policy
          </a>
        </div>

        {/* Trade Badge */}
        <div className="flex flex-col gap-3 items-start md:items-end justify-between">
          <div className="bg-[#372f29] p-4 rounded-lg border border-[#857467]/40 max-w-xs">
            <span className="text-[10px] font-manrope uppercase font-bold text-[#ffb77b] tracking-wider block mb-1">
              Architectural Advisory
            </span>
            <p className="text-xs font-manrope text-[#d8c3b4]">
              Connect directly with our engineering specialists for custom finish specifications and trade support.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
