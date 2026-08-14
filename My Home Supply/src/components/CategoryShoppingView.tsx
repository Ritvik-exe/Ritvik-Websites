import React from 'react';
import { Product, ProductCategory, ProductFinish } from '../types';

interface CategoryShoppingViewProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  products: Product[];
  onContactUs: (product: Product) => void;
}

export const CategoryShoppingView: React.FC<CategoryShoppingViewProps> = ({
  activeCategory,
  onSelectCategory,
  products,
  onContactUs,
}) => {
  const categoryConfig: Record<
    ProductCategory,
    { collection: string; title: string; subtitle: string }
  > = {
    baths: {
      collection: 'COLLECTION 01',
      title: 'Baths',
      subtitle:
        'Designed for the ultimate sanctuary, our bath collection merges ergonomic precision with the warmth of natural materials. Experience a curated selection focused on profound relaxation and architectural durability.',
    },
    showers: {
      collection: 'COLLECTION 02',
      title: 'Showers',
      subtitle:
        'Immerse yourself in precision water engineering. Our thermostatic rainfall showers and concealed body jet suites combine copper craftsmanship with intuitive control.',
    },
    taps: {
      collection: 'COLLECTION 03',
      title: 'Taps',
      subtitle:
        'Architectural monobloc mixers and wall-mounted spouts. Precision machined from solid brass and finished in hand-brushed copper for timeless elegance.',
    },
    vanities: {
      collection: 'COLLECTION 04',
      title: 'Vanities',
      subtitle:
        'Bespoke bathroom cabinetry and stone countertops. Crafted from FSC-certified timbers and Italian Carrara marble, accented with custom copper hardware.',
    },
    toilets: {
      collection: 'COLLECTION 05',
      title: 'Toilets',
      subtitle:
        'Precision-engineered rimless ceramics and space-saving wall-hung pans. Featuring integrated bidet valves and heavy-duty soft-close seats.',
    },
    accessories: {
      collection: 'COLLECTION 06',
      title: 'Accessories',
      subtitle:
        'Thoughtfully designed complementary fixtures to complete your architectural bathroom vision.',
    },
  };

  const currentConfig = categoryConfig[activeCategory] || categoryConfig.baths;
  const filteredProducts = products.filter(
    (p) => p.category === activeCategory
  );

  return (
    <div className="pt-24 sm:pt-28 pb-24 px-6 lg:px-12 max-w-[1280px] mx-auto min-h-[80vh] flex flex-col justify-between">
      <div>
        {/* Collection Banner Info Header */}
        <div className="mb-14 max-w-3xl">
          <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.25em] text-[#b55c3f] block mb-3">
            {currentConfig.collection}
          </span>
          <h1 className="font-eb-garamond text-5xl sm:text-6xl md:text-7xl font-bold text-[#211a15] tracking-tight mb-4">
            {currentConfig.title}
          </h1>
          <p className="font-manrope text-sm sm:text-base text-[#524439] leading-relaxed font-normal">
            {currentConfig.subtitle}
          </p>
        </div>

        {/* Product Cards Grid matching uploaded screenshot */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center space-y-3 bg-[#fffaf8] rounded-2xl border border-[#d8c3b4]/60">
            <span className="material-symbols-outlined text-5xl text-[#857467]">
              bathtub
            </span>
            <h3 className="font-eb-garamond text-2xl font-bold text-[#211a15]">
              No products found in this category
            </h3>
            <p className="font-manrope text-xs text-[#857467]">
              Please check back soon for updates to our {currentConfig.title} collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#eee0d7] rounded-xl p-5 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Image Frame */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden rounded-lg bg-[#eee0d7]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Title & Description */}
                  <div className="mt-5">
                    <h3 className="font-eb-garamond text-2xl sm:text-3xl font-bold text-[#211a15] leading-snug">
                      {product.name}
                    </h3>
                    <p className="font-manrope text-xs sm:text-sm text-[#524439] mt-2 leading-relaxed line-clamp-3 min-h-[50px]">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-8 pt-4">
                  {/* CONTACT US */}
                  <button
                    onClick={() => onContactUs(product)}
                    className="btn-copper text-white w-full py-3.5 rounded-md font-manrope text-[11px] font-bold uppercase tracking-wider cursor-pointer shadow-xs transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    <span>Contact Us</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
