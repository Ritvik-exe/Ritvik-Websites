import { useEffect } from 'react';
import { ProductCategory } from '../types';

interface SEOProps {
  activeCategory: 'home' | 'privacy' | 'terms' | ProductCategory;
  searchQuery?: string;
}

const CATEGORY_SEO_DATA: Record<ProductCategory, { title: string; description: string }> = {
  bathroom: {
    title: 'Luxury Bathrooms & Suites',
    description: 'Explore our luxury bathroom collection featuring freestanding baths, frameless bath screens, thermostatic showers, and designer vanities.',
  },
  heating: {
    title: 'Designer Heating & Radiators',
    description: 'Architectural heating solutions including designer radiators, heated towel warmers, and electric underfloor heating kits.',
  },
  tiles: {
    title: 'Architectural Porcelain & Floor Tiles',
    description: 'High-specification porcelain wall coverings, large-format floor tiles, and non-slip outdoor architectural slabs.',
  },
  plumbing: {
    title: 'Precision Plumbing & Brass Fittings',
    description: 'Trade-grade plumbing supplies, high-flow bottle traps, copper press fittings, and isolation valves.',
  },
  baths: {
    title: 'Freestanding Baths & Bath Screens',
    description: 'Sculptural freestanding stone baths and 6mm toughened safety glass bath screens with nano-coating.',
  },
  showers: {
    title: 'Thermostatic Showers & Rain Roses',
    description: 'Concealed thermostatic shower valves, dual outlets, and rainfall heads engineered for optimum water pressure.',
  },
  taps: {
    title: 'Architectural Taps & Brassware',
    description: 'Wall-mounted and deck-mounted bathroom basin taps in brushed copper, aged brass, matte black, and satin nickel.',
  },
  vanities: {
    title: 'Designer Vanities & Bathroom Furniture',
    description: 'Fluted wall-hung and freestanding vanity units with sintered stone benchtops and soft-close drawers.',
  },
  toilets: {
    title: 'Sanitaryware & Wall-Hung Toilets',
    description: 'Rimless ceramic toilets, concealed cisterns, and acoustic flush plates with minimalist design.',
  },
  underfloor: {
    title: 'Electric Underfloor Heating Kits',
    description: 'Smart thermostat-controlled electric underfloor heating mats for ambient warmth and energy efficiency.',
  },
  radiators: {
    title: 'Architectural Designer Radiators',
    description: 'Vertical and horizontal column radiators in anthracite, matte black, and aged brass finishes.',
  },
  towel_rails: {
    title: 'Heated Towel Rails & Warmers',
    description: 'Luxury ladder and geometric heated towel rails designed for high heat output and architectural aesthetics.',
  },
  floor_tiles: {
    title: 'Floor Tiles & Porcelain Pavers',
    description: 'Durable, slip-resistant floor tiles in marble, terrazzo, and textured natural stone finishes.',
  },
  wall_tiles: {
    title: 'Architectural Wall Tiles & Splashbacks',
    description: 'Fluted, zellige, and artisanal ceramic wall tiles for bespoke bathrooms and modern living spaces.',
  },
  outdoor_tiles: {
    title: 'Slip-Resistant Outdoor Tiles & Paving',
    description: '20mm frost-resistant porcelain slabs for patios, balconies, and exterior architectural spaces.',
  },
  bathroom_tiles: {
    title: 'Waterproof Bathroom Wall & Floor Tiles',
    description: 'Calacatta marble effect, fluted blush, and micro-cement porcelain tiles for wet rooms and bathrooms.',
  },
  kitchen_tiles: {
    title: 'Designer Kitchen Tiles & Splashbacks',
    description: 'Stunning backsplash metro tiles and textured stone tiles engineered for heat and stain resistance.',
  },
  pipes_fittings: {
    title: 'Copper Pipes & Compression Fittings',
    description: 'BS EN-certified copper tubing, brass fittings, and push-fit connectors for reliable installations.',
  },
  waste_traps: {
    title: 'High-Flow Bottle Traps & Basin Wastes',
    description: 'Solid brass bottle traps and unslotted basin wastes in luxury brushed and electroplated finishes.',
  },
  valves_connectors: {
    title: 'Precision Valves & Flexible Connectors',
    description: 'Thermostatic radiator valves, lever ball valves, and braided stainless steel flexible hoses.',
  },
  soil_waste: {
    title: 'Soil & Waste Drainage Systems',
    description: 'High-temperature polypropylene push-fit waste pipes, bends, and solvent weld connectors.',
  },
  tools_accessories: {
    title: 'Professional Plumbing Tools & Consumables',
    description: 'Pipe cutters, PTFE sealing tapes, solder wire, and installation accessories for plumbing trades.',
  },
};

export const useSEO = ({ activeCategory, searchQuery }: SEOProps) => {
  useEffect(() => {
    let pageTitle = 'My Home Supply';
    let metaDescription =
      'My Home Supply offers premium luxury bathroom fixtures, freestanding baths, thermostatic showers, architectural brassware, designer vanities, heating, and plumbing supplies in the UK.';

    if (searchQuery && searchQuery.trim()) {
      pageTitle = `Search: "${searchQuery}" | My Home Supply`;
      metaDescription = `Search results for "${searchQuery}" at My Home Supply. Browse luxury bathroom and heating collections.`;
    } else if (activeCategory === 'home') {
      pageTitle = 'My Home Supply';
      metaDescription =
        'My Home Supply offers premium luxury bathroom fixtures, freestanding baths, thermostatic showers, architectural brassware, designer vanities, heating, and plumbing supplies in the UK.';
    } else if (activeCategory === 'privacy') {
      pageTitle = 'Privacy Policy | My Home Supply';
      metaDescription = 'Review the privacy policy and data protection guidelines of My Home Supply.';
    } else if (activeCategory === 'terms') {
      pageTitle = 'Terms & Conditions | My Home Supply';
      metaDescription = 'Review terms of service, trade orders, and warranty guarantees at My Home Supply.';
    } else if (activeCategory in CATEGORY_SEO_DATA) {
      const data = CATEGORY_SEO_DATA[activeCategory as ProductCategory];
      pageTitle = `${data.title} | My Home Supply`;
      metaDescription = data.description;
    }

    // Update document title
    document.title = pageTitle;

    // Update Meta Description
    const metaDescTag = document.querySelector('meta[name="description"]');
    if (metaDescTag) {
      metaDescTag.setAttribute('content', metaDescription);
    }

    // Update OG Title & Description
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (ogTitleTag) {
      ogTitleTag.setAttribute('content', pageTitle);
    }

    const ogDescTag = document.querySelector('meta[property="og:description"]');
    if (ogDescTag) {
      ogDescTag.setAttribute('content', metaDescription);
    }

    // Update Twitter Title & Description
    const twitterTitleTag = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleTag) {
      twitterTitleTag.setAttribute('content', pageTitle);
    }

    const twitterDescTag = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescTag) {
      twitterDescTag.setAttribute('content', metaDescription);
    }
  }, [activeCategory, searchQuery]);
};
