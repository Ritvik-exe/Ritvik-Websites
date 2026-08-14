import React, { useState } from 'react';
import { Logo } from './Logo';
import { ProductCategory } from '../types';

interface NavbarProps {
  activeCategory: 'home' | ProductCategory;
  onSelectCategory: (category: 'home' | ProductCategory) => void;
  onOpenCatalog: () => void;
  onNavigateContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  onSelectCategory,
  onOpenCatalog,
  onNavigateContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; value: ProductCategory }[] = [
    { label: 'Baths', value: 'baths' },
    { label: 'Showers', value: 'showers' },
    { label: 'Taps', value: 'taps' },
    { label: 'Vanities', value: 'vanities' },
    { label: 'Toilets', value: 'toilets' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#d8c3b4]/40 shadow-xs transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center h-16 sm:h-20 relative">
        {/* Brand Logo - Clicking returns to Home */}
        <div 
          className="flex items-center cursor-pointer py-1"
          onClick={() => {
            onSelectCategory('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          title="Return to Home"
        >
          <Logo size="md" showText={false} />
        </div>

        {/* Centered Desktop Navigation Links with Active Category Underline */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10 absolute left-1/2 -translate-x-1/2">
          {navItems.map((item) => {
            const isActive = activeCategory === item.value;
            return (
              <button
                key={item.label}
                onClick={() => onSelectCategory(item.value)}
                className={`font-eb-garamond text-lg lg:text-xl tracking-tight transition-all duration-300 relative py-1 cursor-pointer group ${
                  isActive ? 'text-[#211a15] font-bold' : 'text-[#524439] hover:text-[#b55c3f]'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-[#b55c3f] transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            );
          })}
          
          <button
            onClick={onNavigateContact}
            className="font-eb-garamond text-lg lg:text-xl tracking-tight text-[#524439] hover:text-[#b55c3f] transition-colors cursor-pointer py-1 group relative"
          >
            Contact Us
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#b55c3f] transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Right Side: Catalog Button */}
        <div className="flex items-center gap-2.5">
          {/* Catalog Button */}
          <button
            onClick={onOpenCatalog}
            className="btn-copper text-white h-9 sm:h-10 px-3.5 sm:px-4 rounded-sm font-manrope text-[11px] uppercase tracking-wider font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span className="material-symbols-outlined text-[17px]">
              menu_book
            </span>
            <span>Catalog</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#211a15] hover:text-[#b55c3f] transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#fff8f5] border-b border-[#d8c3b4] px-6 py-6 shadow-xl animate-fadeIn">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onSelectCategory(item.value);
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-eb-garamond text-2xl py-2 border-b border-[#eee0d7] ${
                  activeCategory === item.value ? 'text-[#b55c3f] font-bold' : 'text-[#211a15]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigateContact();
                setMobileMenuOpen(false);
              }}
              className="text-left font-eb-garamond text-2xl py-2 text-[#211a15] hover:text-[#b55c3f] transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
