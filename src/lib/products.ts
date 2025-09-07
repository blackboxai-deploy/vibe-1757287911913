import { Product } from '@/types';

export const products: Product[] = [
  // Dates
  {
    id: '1',
    name: 'Premium Medjool Dates',
    category: 'dates',
    price: 18.99,
    originalPrice: 24.99,
    images: [
      'https://placehold.co/800x600?text=Premium+Medjool+Dates+in+elegant+wooden+bowl+with+natural+lighting',
      'https://placehold.co/800x600?text=Close+up+of+fresh+Medjool+dates+showing+rich+brown+color+and+texture',
      'https://placehold.co/800x600?text=Medjool+dates+packaging+with+Aali+Tigana+branding+on+marble+surface'
    ],
    description: 'Our Premium Medjool dates are the crown jewel of the date family. Known as the "King of Dates," these large, soft, and incredibly sweet dates are hand-picked from the finest palm trees. Each date is carefully selected for its size, texture, and rich, complex flavor that melts in your mouth.',
    shortDescription: 'The finest Medjool dates - soft, sweet, and naturally delicious',
    weight: '1 lb (454g)',
    origin: 'Morocco',
    features: ['Organic', 'No Added Sugar', 'High in Fiber', 'Rich in Potassium'],
    nutritionFacts: {
      calories: 66,
      protein: '0.4g',
      carbs: '18g',
      fiber: '1.6g',
      sugar: '16g',
      fat: '0.0g'
    },
    inStock: true,
    stockQuantity: 150,
    rating: 4.9,
    reviewCount: 234,
    isBestSeller: true,
    discount: 24
  },
  {
    id: '2',
    name: 'Zahidi Dates',
    category: 'dates',
    price: 12.99,
    images: [
      'https://placehold.co/800x600?text=Golden+Zahidi+dates+arranged+in+rustic+ceramic+bowl+with+natural+background',
      'https://placehold.co/800x600?text=Zahidi+dates+with+their+characteristic+golden+color+and+firm+texture'
    ],
    description: 'Zahidi dates are golden-colored, firm-textured dates with a delightfully sweet and nutty flavor. These medium-sized dates are perfect for snacking and cooking, offering a satisfying chew and rich taste.',
    shortDescription: 'Golden, firm dates with sweet and nutty flavor',
    weight: '1 lb (454g)',
    origin: 'Iraq',
    features: ['Natural', 'Firm Texture', 'Sweet & Nutty', 'Versatile'],
    nutritionFacts: {
      calories: 63,
      protein: '0.4g',
      carbs: '17g',
      fiber: '1.5g',
      sugar: '15g',
      fat: '0.1g'
    },
    inStock: true,
    stockQuantity: 85,
    rating: 4.6,
    reviewCount: 127
  },
  
  // Figs
  {
    id: '3',
    name: 'Turkish Dried Figs',
    category: 'figs',
    price: 15.99,
    originalPrice: 19.99,
    images: [
      'https://placehold.co/800x600?text=Premium+Turkish+dried+figs+with+their+natural+sweetness+in+wooden+container',
      'https://placehold.co/800x600?text=Close+up+of+Turkish+figs+showing+their+purple+exterior+and+pink+interior',
      'https://placehold.co/800x600?text=Artisanal+arrangement+of+Turkish+figs+with+Mediterranean+styling'
    ],
    description: 'Our Turkish dried figs are sun-dried to perfection, preserving their natural sweetness and chewy texture. These premium figs from the Mediterranean region offer a rich, honey-like flavor with subtle floral notes.',
    shortDescription: 'Sun-dried Turkish figs with natural honey-like sweetness',
    weight: '1 lb (454g)',
    origin: 'Turkey',
    features: ['Sun-Dried', 'No Preservatives', 'High in Calcium', 'Antioxidant Rich'],
    nutritionFacts: {
      calories: 74,
      protein: '0.8g',
      carbs: '19g',
      fiber: '2.9g',
      sugar: '16g',
      fat: '0.3g'
    },
    inStock: true,
    stockQuantity: 120,
    rating: 4.8,
    reviewCount: 189,
    isBestSeller: true,
    discount: 20
  },
  {
    id: '4',
    name: 'California Mission Figs',
    category: 'figs',
    price: 17.99,
    images: [
      'https://placehold.co/800x600?text=California+Mission+figs+with+their+dark+purple+skin+in+elegant+presentation',
      'https://placehold.co/800x600?text=Mission+figs+cut+open+showing+beautiful+red+interior+with+seeds'
    ],
    description: 'California Mission figs are known for their deep purple-black skin and sweet, jammy interior. These premium figs offer a complex flavor profile with notes of honey and wine.',
    shortDescription: 'Premium California figs with deep, complex flavors',
    weight: '1 lb (454g)',
    origin: 'California, USA',
    features: ['Premium Quality', 'Complex Flavor', 'Natural Sweetness', 'Nutrient Dense'],
    nutritionFacts: {
      calories: 76,
      protein: '0.9g',
      carbs: '19g',
      fiber: '3.1g',
      sugar: '16g',
      fat: '0.3g'
    },
    inStock: true,
    stockQuantity: 95,
    rating: 4.7,
    reviewCount: 156
  },

  // Apricots
  {
    id: '5',
    name: 'Organic Turkish Apricots',
    category: 'apricots',
    price: 16.99,
    images: [
      'https://placehold.co/800x600?text=Organic+Turkish+apricots+with+bright+orange+color+in+natural+hemp+bag',
      'https://placehold.co/800x600?text=Dried+apricots+showing+their+vibrant+color+and+soft+texture+arrangement',
      'https://placehold.co/800x600?text=Turkish+apricots+with+organic+certification+badge+and+natural+styling'
    ],
    description: 'Our organic Turkish apricots are carefully sun-dried without sulfur, preserving their natural color and intense flavor. These premium apricots offer a perfect balance of sweet and tart with a tender, chewy texture.',
    shortDescription: 'Organic, sulfur-free apricots with intense natural flavor',
    weight: '1 lb (454g)',
    origin: 'Turkey',
    features: ['Organic Certified', 'No Sulfur', 'Sun-Dried', 'High in Vitamin A'],
    nutritionFacts: {
      calories: 67,
      protein: '0.8g',
      carbs: '17g',
      fiber: '2.4g',
      sugar: '15g',
      fat: '0.1g'
    },
    inStock: true,
    stockQuantity: 110,
    rating: 4.8,
    reviewCount: 203,
    isBestSeller: true
  },
  {
    id: '6',
    name: 'Hunza Apricots',
    category: 'apricots',
    price: 19.99,
    images: [
      'https://placehold.co/800x600?text=Rare+Hunza+apricots+from+Pakistan+mountains+with+rustic+presentation',
      'https://placehold.co/800x600?text=Hunza+apricots+showing+unique+small+size+and+intense+flavor+profile'
    ],
    description: 'Rare Hunza apricots from the high-altitude valleys of Pakistan. These small, intensely flavored apricots are known for their exceptional nutritional value and are considered a superfood by locals.',
    shortDescription: 'Rare mountain apricots with exceptional nutritional value',
    weight: '12 oz (340g)',
    origin: 'Hunza Valley, Pakistan',
    features: ['Rare Variety', 'High Altitude', 'Superfood', 'Intense Flavor'],
    nutritionFacts: {
      calories: 71,
      protein: '1.0g',
      carbs: '18g',
      fiber: '2.8g',
      sugar: '15g',
      fat: '0.2g'
    },
    inStock: true,
    stockQuantity: 45,
    rating: 4.9,
    reviewCount: 89
  },

  // Raisins
  {
    id: '7',
    name: 'Golden Sultana Raisins',
    category: 'raisins',
    price: 11.99,
    images: [
      'https://placehold.co/800x600?text=Golden+sultana+raisins+with+beautiful+amber+color+in+glass+jar',
      'https://placehold.co/800x600?text=Close+up+of+golden+raisins+showing+their+plump+and+sweet+appearance'
    ],
    description: 'Our golden sultana raisins are made from the finest Thompson seedless grapes. These plump, sweet raisins are perfect for baking, cooking, or enjoying as a healthy snack.',
    shortDescription: 'Plump, sweet golden raisins perfect for snacking',
    weight: '1 lb (454g)',
    origin: 'California, USA',
    features: ['Seedless', 'Naturally Sweet', 'Plump Texture', 'Versatile'],
    nutritionFacts: {
      calories: 85,
      protein: '0.9g',
      carbs: '22g',
      fiber: '1.0g',
      sugar: '21g',
      fat: '0.1g'
    },
    inStock: true,
    stockQuantity: 200,
    rating: 4.5,
    reviewCount: 312
  },
  {
    id: '8',
    name: 'Flame Seedless Raisins',
    category: 'raisins',
    price: 13.99,
    images: [
      'https://placehold.co/800x600?text=Dark+flame+seedless+raisins+with+rich+color+in+wooden+scoop',
      'https://placehold.co/800x600?text=Flame+raisins+showing+their+distinctive+dark+color+and+sweet+taste'
    ],
    description: 'Flame seedless raisins offer a deeper, more complex flavor than regular raisins. These dark, sweet raisins are perfect for those who prefer a richer taste experience.',
    shortDescription: 'Rich, dark raisins with complex flavor profile',
    weight: '1 lb (454g)',
    origin: 'California, USA',
    features: ['Seedless', 'Rich Flavor', 'Dark Color', 'Premium Quality'],
    nutritionFacts: {
      calories: 87,
      protein: '1.0g',
      carbs: '23g',
      fiber: '1.2g',
      sugar: '22g',
      fat: '0.1g'
    },
    inStock: true,
    stockQuantity: 175,
    rating: 4.6,
    reviewCount: 198
  },

  // Mixed
  {
    id: '9',
    name: 'Trail Mix Deluxe',
    category: 'mixed',
    price: 22.99,
    originalPrice: 27.99,
    images: [
      'https://placehold.co/800x600?text=Deluxe+trail+mix+with+variety+of+dried+fruits+and+nuts+in+artisan+bowl',
      'https://placehold.co/800x600?text=Close+up+of+trail+mix+showing+dates+figs+apricots+raisins+and+nuts',
      'https://placehold.co/800x600?text=Premium+trail+mix+package+with+Aali+Tigana+branding+and+ingredients+display'
    ],
    description: 'Our signature Trail Mix Deluxe combines the finest dried fruits with premium nuts. This perfect blend includes Medjool dates, Turkish figs, organic apricots, golden raisins, almonds, and walnuts.',
    shortDescription: 'Premium blend of dried fruits and nuts for the perfect snack',
    weight: '1.5 lbs (680g)',
    origin: 'Mixed Origins',
    features: ['Premium Blend', 'Protein Rich', 'Energy Boost', 'Perfect Snack'],
    nutritionFacts: {
      calories: 145,
      protein: '4.2g',
      carbs: '18g',
      fiber: '3.1g',
      sugar: '14g',
      fat: '7.5g'
    },
    inStock: true,
    stockQuantity: 80,
    rating: 4.9,
    reviewCount: 267,
    isBestSeller: true,
    discount: 18
  },
  {
    id: '10',
    name: 'Tropical Fruit Medley',
    category: 'mixed',
    price: 19.99,
    images: [
      'https://placehold.co/800x600?text=Tropical+fruit+medley+with+colorful+dried+fruits+in+coconut+bowl',
      'https://placehold.co/800x600?text=Mixed+tropical+fruits+including+mango+pineapple+papaya+and+coconut'
    ],
    description: 'A vibrant mix of tropical dried fruits including mango, pineapple, papaya, and coconut. This exotic blend brings the taste of the tropics to your snacking routine.',
    shortDescription: 'Exotic blend of tropical dried fruits',
    weight: '1 lb (454g)',
    origin: 'Mixed Tropical Regions',
    features: ['Tropical Variety', 'Natural Colors', 'Exotic Flavors', 'Vitamin Rich'],
    nutritionFacts: {
      calories: 78,
      protein: '0.6g',
      carbs: '20g',
      fiber: '2.2g',
      sugar: '18g',
      fat: '0.2g'
    },
    inStock: true,
    stockQuantity: 65,
    rating: 4.4,
    reviewCount: 142,
    isNewArrival: true
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getBestSellers = () => {
  return products.filter(product => product.isBestSeller);
};

export const getNewArrivals = () => {
  return products.filter(product => product.isNewArrival);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery)
  );
};