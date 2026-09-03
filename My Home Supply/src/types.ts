export type MainCategory = 'bathroom' | 'heating' | 'tiles' | 'plumbing';

export type SubCategory =
  | 'baths' | 'showers' | 'taps' | 'vanities' | 'toilets'
  | 'underfloor' | 'radiators' | 'towel_rails'
  | 'floor_tiles' | 'wall_tiles' | 'outdoor_tiles' | 'bathroom_tiles' | 'kitchen_tiles'
  | 'pipes_fittings' | 'waste_traps' | 'valves_connectors' | 'soil_waste' | 'tools_accessories';

export type ProductCategory = MainCategory | SubCategory;

export type ProductFinish = 'Brushed Copper' | 'Aged Brass' | 'Matte Black' | 'Satin Nickel' | 'Rose Gold';

export interface Product {
  id: string;
  name: string;
  category: MainCategory;
  subCategory: SubCategory;
  series: string;
  price: number;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  finishes: ProductFinish[];
  defaultFinish: ProductFinish;
  dimensions: string;
  material: string;
  warranty: string;
  featured?: boolean;
  inStock: boolean;
  leadTime: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
}

export interface QuoteItem {
  product: Product;
  selectedFinish: ProductFinish;
  quantity: number;
  notes?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  companyName?: string;
  isTradeAccount?: boolean;
}

export interface FinishOption {
  name: ProductFinish;
  hex: string;
  gradient: string;
  previewImage: string;
}
