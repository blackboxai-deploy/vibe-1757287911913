import { products } from './products';
import { Product, Recommendation } from '@/types';

interface UserRecommendationData {
  favoriteCategories: string[];
  viewedProducts: string[];
  priceRange: [number, number];
  searchHistory: string[];
}

export const useRecommendations = () => {
  const getRecommendations = (userData: UserRecommendationData): Recommendation[] => {
    const recommendations: Recommendation[] = [];
    
    // Get products that haven't been viewed recently
    const unviewedProducts = products.filter(product => 
      !userData.viewedProducts.slice(0, 10).includes(product.id)
    );

    unviewedProducts.forEach(product => {
      let score = 0;
      let reasons: string[] = [];

      // Category preference scoring
      if (userData.favoriteCategories.includes(product.category)) {
        score += 40;
        reasons.push(`You love ${product.category}`);
      }

      // Price range scoring
      if (product.price >= userData.priceRange[0] && product.price <= userData.priceRange[1]) {
        score += 20;
        reasons.push('Perfect price for you');
      }

      // Search history scoring
      const productKeywords = [
        product.name.toLowerCase(),
        product.category.toLowerCase(),
        product.origin.toLowerCase(),
        ...product.features.map(f => f.toLowerCase())
      ];
      
      const searchMatches = userData.searchHistory.some(search => 
        productKeywords.some(keyword => keyword.includes(search.toLowerCase()))
      );
      
      if (searchMatches) {
        score += 25;
        reasons.push('Matches your searches');
      }

      // Best seller bonus
      if (product.isBestSeller) {
        score += 15;
        reasons.push('Popular choice');
      }

      // High rating bonus
      if (product.rating >= 4.7) {
        score += 10;
        reasons.push('Highly rated');
      }

      // Organic/Premium features bonus
      const premiumFeatures = ['organic', 'premium', 'no sulfur', 'sun-dried'];
      const hasPremiumFeatures = product.features.some(feature => 
        premiumFeatures.some(premium => feature.toLowerCase().includes(premium))
      );
      
      if (hasPremiumFeatures) {
        score += 10;
        reasons.push('Premium quality');
      }

      // Discount bonus
      if (product.discount && product.discount > 15) {
        score += 15;
        reasons.push(`${product.discount}% off`);
      }

      // Only recommend if score is above threshold
      if (score >= 20) {
        recommendations.push({
          product,
          reason: reasons.slice(0, 2).join(' • ') || 'Great choice for you',
          confidence: Math.min(score / 100, 1)
        });
      }
    });

    // Sort by confidence and return top recommendations
    return recommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 8);
  };

  const getSimilarProducts = (productId: string): Product[] => {
    const currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return [];

    return products
      .filter(product => 
        product.id !== productId &&
        (product.category === currentProduct.category ||
         product.origin === currentProduct.origin ||
         product.features.some(feature => 
           currentProduct.features.includes(feature)
         ))
      )
      .sort((a, b) => {
        // Sort by rating and best seller status
        const aScore = (a.rating * 10) + (a.isBestSeller ? 20 : 0);
        const bScore = (b.rating * 10) + (b.isBestSeller ? 20 : 0);
        return bScore - aScore;
      })
      .slice(0, 4);
  };

  const getCategoryRecommendations = (category: string): Product[] => {
    return products
      .filter(product => product.category === category)
      .sort((a, b) => {
        // Prioritize best sellers and high ratings
        const aScore = (a.rating * 10) + (a.isBestSeller ? 20 : 0) + (a.reviewCount / 10);
        const bScore = (b.rating * 10) + (b.isBestSeller ? 20 : 0) + (b.reviewCount / 10);
        return bScore - aScore;
      })
      .slice(0, 6);
  };

  const getTrendingProducts = (): Product[] => {
    return products
      .filter(product => product.isBestSeller || product.isNewArrival)
      .sort((a, b) => {
        // Weight new arrivals slightly higher than best sellers
        const aScore = (a.isNewArrival ? 30 : 0) + (a.isBestSeller ? 25 : 0) + (a.rating * 5);
        const bScore = (b.isNewArrival ? 30 : 0) + (b.isBestSeller ? 25 : 0) + (b.rating * 5);
        return bScore - aScore;
      })
      .slice(0, 6);
  };

  const getComplementaryProducts = (cartItems: { product: Product }[]): Product[] => {
    if (cartItems.length === 0) return [];

    // Get categories and features from cart items
    const cartCategories = cartItems.map(item => item.product.category);
    const cartFeatures = cartItems.reduce((acc: string[], item) => {
      return acc.concat(item.product.features);
    }, []);

    // Find products that complement cart items
    return products
      .filter(product => {
        // Don't recommend items already in cart
        const alreadyInCart = cartItems.some(item => item.product.id === product.id);
        if (alreadyInCart) return false;

        // Recommend products from different categories but with similar features
        const differentCategory = !cartCategories.includes(product.category);
        const sharedFeatures = product.features.some(feature => 
          cartFeatures.includes(feature)
        );

        return differentCategory && sharedFeatures;
      })
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  return {
    getRecommendations,
    getSimilarProducts,
    getCategoryRecommendations,
    getTrendingProducts,
    getComplementaryProducts
  };
};