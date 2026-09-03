import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ProductCategory } from '../types';

interface SlideData {
  id: number;
  tagline: string;
  title: string;
  description: string;
  image: string;
  category: 'bathroom' | 'brassware';
  buttonText: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    tagline: "ELEGANT BATHROOMS & ACCESSORIES",
    title: "Frameless Bath Screens & Luxury Tubs",
    description: "Premium curved and straight toughened glass screens designed to prevent spills while showcasing pure minimalist elegance.",
    image: "https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=1200&h=600&q=80",
    category: "bathroom",
    buttonText: "Explore Bath Screens"
  },
  {
    id: 2,
    tagline: "SIGNATURE HIGH-FLOW BRASSWARE",
    title: "Concealed Thermostatic Systems",
    description: "Precision-engineered thermostatic systems with anti-scald smart valves and sleek overhead rain roses.",
    image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&w=1200&h=600&q=80",
    category: "brassware",
    buttonText: "Discover Brassware"
  },
  {
    id: 3,
    tagline: "WELLNESS & SCULPTURAL DESIGN",
    title: "Freestanding Baths & Stone Suites",
    description: "Transform your bathroom with double-ended freestanding tubs and seamless spa-grade wetroom partitions.",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&h=600&q=80",
    category: "bathroom",
    buttonText: "Browse Bath Collections"
  },
  {
    id: 4,
    tagline: "BESPOKE ARCHITECTURAL METALS",
    title: "Aged Brass, Satin Nickel & Matte Black",
    description: "Exquisite finish options with durable PVD coatings for maximum scratch and corrosion resistance.",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&h=600&q=80",
    category: "brassware",
    buttonText: "View Custom Finishes"
  }
];

interface ProductShowcaseSliderProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const ProductShowcaseSlider: React.FC<ProductShowcaseSliderProps> = ({ onSelectCategory }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimer = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  const stopAutoplay = () => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return () => stopAutoplay();
  }, [currentIndex, isHovered]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection('right');
    setCurrentIndex((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  // Variants for sliding transition
  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section 
      className="pt-2 pb-16 bg-[#fcf9f6] border-b border-[#eee0d7]/80"
      id="product-showcase-slider-section"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Carousel Slider */}
        <div 
          className="relative w-full h-[400px] sm:h-auto sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-[#d8c3b4]/40 select-none bg-[#211a15]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          id="product-carousel-container"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Image with Slow Zoom effect */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={SLIDES[currentIndex].image}
                  alt={SLIDES[currentIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover origin-center scale-105 animate-[zoomOut_8s_ease-out_infinite_alternate]"
                />
              </div>

              {/* Dark Ambient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#211a15] via-[#211a15]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#211a15]/90 via-transparent to-transparent md:hidden" />

              {/* Text / Action Panel */}
              <div className="absolute inset-y-0 left-0 flex items-center px-6 sm:px-12 md:px-16 lg:px-24 max-w-2xl z-10">
                <div className="flex flex-col text-left">
                  {/* Category Tagline */}
                  <span className="font-manrope text-[10px] sm:text-xs font-bold text-[#ffb77b] tracking-[0.25em] mb-3 uppercase drop-shadow-sm">
                    {SLIDES[currentIndex].tagline}
                  </span>

                  {/* Title */}
                  <h1 className="font-eb-garamond text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight drop-shadow-md">
                    {SLIDES[currentIndex].title}
                  </h1>

                  {/* Description */}
                  <p className="font-manrope text-xs sm:text-sm md:text-base text-[#eee0d7] mb-8 leading-relaxed max-w-md drop-shadow-sm">
                    {SLIDES[currentIndex].description}
                  </p>

                  {/* CTA Action button */}
                  <div>
                    <button
                      onClick={() => onSelectCategory(SLIDES[currentIndex].category)}
                      className="btn-copper text-white px-6 sm:px-8 py-3.5 rounded-sm font-manrope text-[10px] sm:text-xs uppercase tracking-widest font-semibold transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md flex items-center gap-2.5 cursor-pointer group"
                      id={`btn-carousel-go-${currentIndex}`}
                    >
                      <span>{SLIDES[currentIndex].buttonText}</span>
                      <span className="material-symbols-outlined text-[16px] transition-transform duration-300 group-hover:translate-x-1.5">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls - Left Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#eee0d7]/30 bg-[#211a15]/40 hover:bg-[#b55c3f] hover:border-[#b55c3f] text-[#eee0d7] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer backdrop-blur-sm z-20 group active:scale-90"
            aria-label="Previous slide"
            id="btn-carousel-prev"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl transition-transform duration-300 group-hover:-translate-x-0.5">
              arrow_back_ios_new
            </span>
          </button>

          {/* Controls - Right Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#eee0d7]/30 bg-[#211a15]/40 hover:bg-[#b55c3f] hover:border-[#b55c3f] text-[#eee0d7] hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer backdrop-blur-sm z-20 group active:scale-90"
            aria-label="Next slide"
            id="btn-carousel-next"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl transition-transform duration-300 group-hover:translate-x-0.5">
              arrow_forward_ios
            </span>
          </button>
        </div>

        {/* Carousel Indicators / Dots & Pause status indicator */}
        <div className="flex items-center justify-center gap-4 mt-6">
          {/* Slide count indicator */}
          <span className="font-manrope text-xs text-[#857467] font-bold tracking-wider">
            {String(currentIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </span>

          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={(e) => handleDotClick(idx, e)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx 
                    ? 'w-8 bg-[#b55c3f]' 
                    : 'w-2.5 bg-[#d8c3b4]/60 hover:bg-[#857467]'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                id={`btn-carousel-dot-${idx}`}
              />
            ))}
          </div>

          {/* Visual Pause Status (only show small subtle hint when mouse is hovering) */}
          <span className="w-12 text-center text-[10px] text-[#857467]/70 font-bold uppercase tracking-wider h-4">
            {isHovered ? "Paused" : "Auto"}
          </span>
        </div>
      </div>
    </section>
  );
};
