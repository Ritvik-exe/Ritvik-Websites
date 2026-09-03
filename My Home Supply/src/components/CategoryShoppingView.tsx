import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, ProductFinish } from '../types';

interface CategoryShoppingViewProps {
  activeCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  products: Product[];
  onContactUs: (product: Product) => void;
  searchQuery?: string;
}

export const CategoryShoppingView: React.FC<CategoryShoppingViewProps> = ({
  activeCategory,
  onSelectCategory,
  products,
  onContactUs,
  searchQuery = '',
}) => {
  // View states removed as pricing and filters are hidden

  const categoryConfig: Record<
    ProductCategory,
    { collection: string; title: string; subtitle: string }
  > = {
    // === Main Categories ===
    bathroom: {
      collection: 'COLLECTION: BATHROOM',
      title: 'Luxury Bathrooms',
      subtitle:
        'Indulge in a space designed around pristine relaxation. Our premium bathroom collection merges ergonomic precision with the warmth of natural materials for profound architectural durability.',
    },
    heating: {
      collection: 'COLLECTION: HEATING',
      title: 'Premium Home Heating',
      subtitle:
        'Experience tailored thermal comfort. From smart programmable underfloor heating mats to beautifully finished designer radiators, explore elements crafted for optimal heat output and modern aesthetics.',
    },
    tiles: {
      collection: 'COLLECTION: TILES',
      title: 'Architectural Tiles',
      subtitle:
        'Explore exquisite floor, wall, kitchen, and outdoor tiles in natural slate, polished Carrara marble, and Moroccan-style Zellige to elevate your architectural spaces.',
    },
    plumbing: {
      collection: 'COLLECTION: PLUMBING',
      title: 'Professional Plumbing',
      subtitle:
        'Expertly engineered pipework, reliable waste systems, anti-vacuum bottle traps, and high-performance valves for absolute peace-of-mind during installation.',
    },

    // === Sub Categories ===
    baths: {
      collection: 'BATHROOM SUBSECTION',
      title: 'Baths & Enclosures',
      subtitle:
        'Ergonomically sculpted freestanding baths, curved glass panels, and premium wetroom screens designed for ultimate relaxation.',
    },
    showers: {
      collection: 'BATHROOM SUBSECTION',
      title: 'Showers & Valves',
      subtitle:
        'Immerse yourself in precision water engineering. Thermostatic shower suites, exposed dual valves, and rainfall body sprays.',
    },
    taps: {
      collection: 'BATHROOM SUBSECTION',
      title: 'Bathroom Taps',
      subtitle:
        'Architectural monobloc mixers and wall-mounted spouts machined from solid brass and polished to perfection.',
    },
    vanities: {
      collection: 'BATHROOM SUBSECTION',
      title: 'Vanity Units & Storage',
      subtitle:
        'Bespoke bathroom cabinetry, fluted timber drawers, and industrial steel frames complete with stone countertops.',
    },
    toilets: {
      collection: 'BATHROOM SUBSECTION',
      title: 'Toilets & Ceramics',
      subtitle:
        'Precision-engineered rimless close-coupled models and space-saving wall-hung ceramic toilet pans.',
    },
    underfloor: {
      collection: 'HEATING SUBSECTION',
      title: 'Underfloor Heating',
      subtitle:
        'Warm underfoot comfort with premium electric heating mats, floor sensors, and smart programmable thermostats.',
    },
    radiators: {
      collection: 'HEATING SUBSECTION',
      title: 'Designer Radiators',
      subtitle:
        'Sleek designer column and flat-panel radiators finished in heat-resistant, high-grade powder coatings.',
    },
    towel_rails: {
      collection: 'HEATING SUBSECTION',
      title: 'Heated Towel Rails',
      subtitle:
        'Ladder-style towel rails triple-plated in mirror chrome or matte black for warmth, luxury, and rust prevention.',
    },
    floor_tiles: {
      collection: 'TILES SUBSECTION',
      title: 'Floor Tiles',
      subtitle:
        'Durable, modern porcelain floor tiles featuring elegant aggregates and luxury terrazzo textures.',
    },
    wall_tiles: {
      collection: 'TILES SUBSECTION',
      title: 'Wall Tiles & Splashes',
      subtitle:
        'Classic bevelled subway metro tiles and textural finishes to define your kitchen and bathroom walls.',
    },
    outdoor_tiles: {
      collection: 'TILES SUBSECTION',
      title: 'Outdoor Slabs & Tiles',
      subtitle:
        'Thick, frost-resistant, high-grip vitrified porcelain slabs perfect for terraces, patios, and garden pathways.',
    },
    bathroom_tiles: {
      collection: 'TILES SUBSECTION',
      title: 'Bathroom Wall & Floor Tiles',
      subtitle:
        'Premium moisture-sealed tiles replicating natural stone, concrete, or classic white marble veining.',
    },
    kitchen_tiles: {
      collection: 'TILES SUBSECTION',
      title: 'Kitchen Backsplash Tiles',
      subtitle:
        'Artisanal Moroccan Zellige tiles with handcrafted organic glazes that capture and reflect light beautifully.',
    },
    pipes_fittings: {
      collection: 'PLUMBING SUBSECTION',
      title: 'Pipes & Compression Fittings',
      subtitle:
        'Professional-grade copper tubing, compression couplers, elbows, and plumbing essentials.',
    },
    waste_traps: {
      collection: 'PLUMBING SUBSECTION',
      title: 'Waste, Traps & Overflows',
      subtitle:
        'Space-saver bottle traps, anti-vacuum valves, and reliable basin/toilet waste fittings.',
    },
    valves_connectors: {
      collection: 'PLUMBING SUBSECTION',
      title: 'Valves, Connectors & Hoses',
      subtitle:
        'Heavy-duty brass isolation ball valves and hot/cold plumbing components for smooth domestic water distribution.',
    },
    soil_waste: {
      collection: 'PLUMBING SUBSECTION',
      title: 'Soil & Waste Systems',
      subtitle:
        'Professional soil manifolds, waste pipes, and robust push-fit connections for complete sewage and sanitary systems.',
    },
    tools_accessories: {
      collection: 'PLUMBING SUBSECTION',
      title: 'Plumbing Tools & Accessories',
      subtitle:
        'High-grade pipe cutters, jointing compounds, and essential plumbing tools for rapid, professional installations.',
    },
  };

  const currentConfig = categoryConfig[activeCategory] || {
    collection: 'CATALOGUE',
    title: 'Curated Products',
    subtitle: 'Browse our exquisite range of professional bathroom fixtures, designer heating, tiles, and plumbing fittings.',
  };

  // Filter Products logic
  const processedProducts = useMemo(() => {
    let result = products;

    // 1. Search Query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          (p.longDescription && p.longDescription.toLowerCase().includes(q))
      );
    } else {
      // 2. Category / Subcategory filter (only apply if no search is active)
      result = result.filter(
        (p) => p.category === activeCategory || p.subCategory === activeCategory
      );
    }

    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <div className="pt-32 sm:pt-40 pb-24 px-6 lg:px-12 max-w-[1440px] mx-auto min-h-[90vh]">
      
      {/* Dynamic Collection Header Block */}
      <div className="mb-12 max-w-4xl">
        <span className="font-manrope text-[11px] font-bold uppercase tracking-[0.25em] text-[#b55c3f] block mb-3 animate-fadeIn">
          {searchQuery ? `Search Results` : currentConfig.collection}
        </span>
        <h1 className="font-eb-garamond text-4xl sm:text-5xl md:text-6xl font-bold copper-text pb-1 tracking-tight mb-4 animate-fadeIn">
          {searchQuery ? `Results for "${searchQuery}"` : currentConfig.title}
        </h1>
        <p className="font-manrope text-sm sm:text-base text-[#524439] leading-relaxed font-normal opacity-90">
          {searchQuery 
            ? `We found ${processedProducts.length} premium products matching your search terms.` 
            : currentConfig.subtitle}
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center bg-[#fffcfb] border border-[#eee0d7] py-3 px-5 rounded-lg text-xs text-[#524439]">
          <span className="font-medium">
            Showing <strong className="text-[#211a15]">{processedProducts.length}</strong> products
          </span>
          <span className="text-[#857467]">
            Professional Grade | Premium Finish options
          </span>
        </div>

        {processedProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4 bg-white rounded-xl border border-[#eee0d7] flex flex-col items-center justify-center">
            <span className="material-symbols-outlined text-6xl text-[#d8c3b4] animate-pulse">
              search_off
            </span>
            <h3 className="font-eb-garamond text-3xl font-bold text-[#211a15]">
              No matching fixtures found
            </h3>
            <p className="font-manrope text-sm text-[#857467] max-w-md mx-auto">
              Try searching for another term or click one of the categories above to explore our selection.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {processedProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white border border-[#eee0d7] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative"
                >
                  {/* Badge */}
                  {product.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-[#b55c3f] text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm shadow-sm">
                      {product.badge}
                    </span>
                  )}

                  {/* Stock tag */}
                  {!product.inStock && (
                    <span className="absolute top-3 right-3 z-10 bg-gray-500 text-white text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm">
                      Out of stock
                    </span>
                  )}

                  {/* Product Image Display Frame */}
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#faf8f6]">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Details Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      {/* Series/Subcategory label */}
                      <span className="text-[10px] font-bold text-[#b55c3f] uppercase tracking-wider block">
                        {product.series}
                      </span>

                      {/* Product Name */}
                      <h3 className="font-eb-garamond text-xl sm:text-2xl font-bold text-[#211a15] leading-tight hover:text-[#b55c3f] transition-colors cursor-pointer">
                        {product.name}
                      </h3>

                      {/* Brief description */}
                      <p className="font-manrope text-xs text-[#524439] leading-relaxed line-clamp-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#f5ebe6]">
                      {/* Finishes Swatch dots preview */}
                      {product.finishes.length > 0 && (
                        <div className="flex gap-1.5 items-center mb-4">
                          <span className="text-[10px] text-[#857467] font-semibold mr-1">Finishes:</span>
                          {product.finishes.map((f) => (
                            <span
                              key={f}
                              title={f}
                              className="w-3 h-3 rounded-full border border-black/10 shadow-xs inline-block"
                              style={{
                                background:
                                  f === 'Brushed Copper' ? '#a65836' :
                                  f === 'Aged Brass' ? '#c5a059' :
                                  f === 'Matte Black' ? '#211a15' :
                                  f === 'Satin Nickel' ? '#9aa0a6' :
                                  f === 'Rose Gold' ? '#b76e79' : '#fff'
                              }}
                            />
                          ))}
                        </div>
                      )}

                      {/* Inquiry CTA Button */}
                      <button
                        onClick={() => onContactUs(product)}
                        className="btn-copper text-white w-full py-3 rounded-full font-manrope text-[11px] font-bold uppercase tracking-wider cursor-pointer shadow-xs transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[15px]">send</span>
                        <span>Request Free Quote</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom "More Products Coming Soon" Minimal Line */}
            <div className="text-center pt-12 border-t border-[#eee0d7]/80">
              <p className="font-eb-garamond text-xl sm:text-2xl italic text-[#857467]/70">
                More products coming soon...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
