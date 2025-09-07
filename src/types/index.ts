export interface Product {
  id: string;
  name: string;
  category: 'dates' | 'figs' | 'apricots' | 'raisins' | 'mixed';
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  shortDescription: string;
  weight: string;
  origin: string;
  features: string[];
  nutritionFacts: {
    calories: number;
    protein: string;
    carbs: string;
    fiber: string;
    sugar: string;
    fat: string;
  };
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewCount: number;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  discount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    favoriteCategories: string[];
    dietaryRestrictions: string[];
    priceRange: [number, number];
    purchaseHistory: string[];
  };
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  estimatedDelivery: Date;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'cod';
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    holderName: string;
  };
}

export interface Discount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  validUntil: Date;
  isFirstTimeCustomer?: boolean;
  description: string;
}

export interface ChatMessage {
  id: string;
  message: string;
  isBot: boolean;
  timestamp: Date;
  quickReplies?: string[];
}

export interface Recommendation {
  product: Product;
  reason: string;
  confidence: number;
}