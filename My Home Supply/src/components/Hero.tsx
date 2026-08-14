import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 px-6 lg:px-10 overflow-hidden bg-[#eee0d7]">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left Column: Typography & Action */}
        <div className="flex flex-col gap-6 sm:gap-8">
          <h1 className="font-eb-garamond text-4xl sm:text-5xl lg:text-6xl font-bold text-[#211a15] leading-[1.1] tracking-tight">
            Precision Engineered Luxury for Your Bath.
          </h1>

          <p className="font-manrope text-base sm:text-lg text-[#524439] max-w-xl leading-relaxed">
            Discover our curated collection of high-end fixtures and fittings, blending architectural stability with organic materials and hand-finished brushed metals.
          </p>

          <div className="pt-2">
            <button
              onClick={onExplore}
              className="btn-copper text-white px-8 py-4 rounded-sm font-manrope text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg flex items-center gap-3 cursor-pointer group"
            >
              <span>Explore Fixtures</span>
              <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-2">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Clean Architecture Visual Showcase */}
        <div className="relative h-[380px] sm:h-[450px] lg:h-[500px] rounded-xl overflow-hidden border border-[#d8c3b4]/60 shadow-xl group">
          <img
            src="https://euro-bathrooms.co.uk/image/cache/catalog/main-banner3-1903x710.jpg"
            alt="Euro Bathrooms official luxury suite showpiece"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

