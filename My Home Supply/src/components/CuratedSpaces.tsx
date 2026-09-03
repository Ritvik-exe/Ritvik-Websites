import React from 'react';
import { motion } from 'motion/react';
import { MainCategory } from '../types';

interface CategoryTile {
  id: MainCategory;
  title: string;
  subtitle: string;
  count: string;
  image: string;
  gridClass: string;
  delay: number;
}

const CATEGORY_TILES: CategoryTile[] = [
  {
    id: 'bathroom',
    title: 'Luxury Bathrooms',
    subtitle: 'Sculptural freestanding baths, vanity units, and premium brassware suites.',
    count: '12 COLLECTIONS',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1000&h=800&q=80',
    gridClass: 'md:col-span-8 md:row-span-2 min-h-[320px] md:min-h-[480px]',
    delay: 0.1
  },
  {
    id: 'heating',
    title: 'Designer Heating',
    subtitle: 'Underfloor heating kits, heated towel rails, and architectural radiators.',
    count: '8 COLLECTIONS',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&h=800&q=80',
    gridClass: 'md:col-span-4 md:row-span-2 min-h-[320px] md:min-h-[480px]',
    delay: 0.2
  },
  {
    id: 'tiles',
    title: 'Architectural Tiles',
    subtitle: 'Sartorial marble, porcelain wall coverings, and slip-resistant floor finishes.',
    count: '15 COLLECTIONS',
    image: 'https://images.unsplash.com/photo-1501183007986-d0d080b147f9?auto=format&fit=crop&w=1000&h=500&q=80',
    gridClass: 'md:col-span-7 md:row-span-1 min-h-[240px] md:min-h-[280px]',
    delay: 0.3
  },
  {
    id: 'plumbing',
    title: 'Precision Plumbing',
    subtitle: 'Professional-grade copper pipe systems, high-flow traps, and valves.',
    count: '6 COLLECTIONS',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&h=500&q=80',
    gridClass: 'md:col-span-5 md:row-span-1 min-h-[240px] md:min-h-[280px]',
    delay: 0.4
  }
];

interface CuratedSpacesProps {
  onSelectCategory: (category: MainCategory) => void;
}

export const CuratedSpaces: React.FC<CuratedSpacesProps> = ({ onSelectCategory }) => {
  return (
    <section className="py-20 sm:py-24 px-6 lg:px-10 bg-[#eee0d7]/40" id="curated-spaces-section">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Block */}
        <div className="mb-14 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#eee0d7] pb-6">
          <div>
            <h2 className="font-eb-garamond text-3xl sm:text-4xl md:text-5xl font-bold text-[#211a15] leading-tight">
              Curated Collections
            </h2>
            <p className="font-manrope text-xs sm:text-sm text-[#857467] font-semibold uppercase tracking-wider mt-1">
              Select a space to begin exploring luxury specifications
            </p>
          </div>
          <span className="font-manrope text-xs text-[#857467] max-w-sm leading-relaxed text-center md:text-right hidden sm:block">
            Every collection is engineered with precision tolerances and authentic raw materials to enrich modern living.
          </span>
        </div>

        {/* Asymmetric Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {CATEGORY_TILES.map((tile) => (
            <motion.div
              key={tile.id}
              className={`group relative rounded-2xl overflow-hidden border border-[#d8c3b4]/40 shadow-lg cursor-pointer bg-[#211a15] flex flex-col justify-end ${tile.gridClass}`}
              onClick={() => onSelectCategory(tile.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: tile.delay, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              id={`curated-tile-${tile.id}`}
            >
              {/* Background Image with Hover Scaling */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                <img
                  src={tile.image}
                  alt={tile.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Sophisticated Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b140f] via-[#1b140f]/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />

              {/* Card Contents */}
              <div className="relative p-6 sm:p-8 md:p-10 z-10 flex flex-col justify-end h-full">
                {/* Collection Count Badge */}
                <span className="font-manrope text-[10px] font-bold text-[#eabe9c] tracking-[0.2em] uppercase mb-2">
                  {tile.count}
                </span>

                {/* Heading */}
                <h3 className="font-eb-garamond text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight flex items-center gap-2">
                  <span>{tile.title}</span>
                  <span className="material-symbols-outlined text-lg sm:text-xl text-[#eabe9c] transition-transform duration-300 translate-x-0 group-hover:translate-x-1.5">
                    arrow_forward
                  </span>
                </h3>

                {/* Subtitle / Description */}
                <p className="font-manrope text-xs sm:text-sm text-[#eee0d7]/90 leading-relaxed max-w-lg transition-colors duration-300 group-hover:text-white">
                  {tile.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
