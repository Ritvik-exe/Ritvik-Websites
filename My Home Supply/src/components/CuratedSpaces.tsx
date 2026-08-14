import React from 'react';

export const CuratedSpaces: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 px-6 lg:px-10 bg-[#eee0d7]">
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-12">
          <h2 className="font-eb-garamond text-3xl sm:text-4xl md:text-5xl font-bold text-[#211a15]">
            Curated Spaces
          </h2>
        </div>

        {/* Bento Grid Layout - Pure Visual Cards (No Redirects) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] md:auto-rows-[340px]">
          {/* Large Feature Card: Bathroom Vanities */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-xl overflow-hidden border border-[#d8c3b4]/40 shadow-xl select-none">
            <img
              src="https://euro-bathrooms.co.uk/image/cache/catalog/000%20AAA/09%2011%2023/banner/INS60-1%20-%20PIC%203-1903x710.jpg"
              alt="Euro Bathrooms official luxury vanity unit showcase"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211a15]/80 via-[#211a15]/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-8 sm:p-10 flex flex-col gap-2 z-10">
              <span className="font-manrope text-xs font-bold text-[#eabe9c] uppercase tracking-widest bg-[#b55c3f]/40 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                Featured Collection
              </span>
              <h3 className="font-eb-garamond text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">
                Bathroom Vanities
              </h3>
            </div>
          </div>

          {/* Secondary Card 1: Showers */}
          <div className="relative rounded-xl overflow-hidden border border-[#d8c3b4]/40 shadow-lg select-none">
            <img
              src="https://euro-bathrooms.co.uk/image/cache/catalog/main-banner1-1903x710.jpg"
              alt="Euro Bathrooms premium thermostatic brassware and showers showcase"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#211a15]/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <h3 className="font-eb-garamond text-2xl sm:text-3xl font-bold text-white">
                Showers
              </h3>
            </div>
          </div>

          {/* Secondary Card 2: Freestanding Baths */}
          <div className="relative rounded-xl overflow-hidden border border-[#d8c3b4]/40 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-lg select-none">
            <div className="flex flex-col gap-3">
              <div className="w-12 h-12 rounded-full bg-[#a65836]/10 flex items-center justify-center text-[#a65836]">
                <span className="material-symbols-outlined text-3xl">bathtub</span>
              </div>
              <h3 className="font-eb-garamond text-2xl sm:text-3xl font-bold text-[#211a15]">
                Freestanding Baths
              </h3>
              <p className="font-manrope text-xs sm:text-sm text-[#524439] leading-relaxed">
                Sculptural centerpieces engineered for ultimate relaxation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
