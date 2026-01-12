export interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
  category: 'tech' | 'fashion' | 'home' | 'food';
  shopName: string;
  shopUrl: string;
  location: string;
  distance: number; // in km
  postedAt: Date;
  isVerified: boolean;
  imageUrl: string;
  rawText?: string;
}

export interface AIExtraction {
  price: number;
  category: string;
  discountPercent: number;
  confidence: number;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  locationRadius: number;
  trustedSellerOnly: boolean;
  categories: string[];
  searchQuery: string;
}
