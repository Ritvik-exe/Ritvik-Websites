export type ProductCategory = 'baths' | 'showers' | 'taps' | 'vanities' | 'toilets' | 'accessories';

export type ProductFinish = 'Brushed Copper' | 'Aged Brass' | 'Matte Black' | 'Satin Nickel' | 'Rose Gold';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
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
