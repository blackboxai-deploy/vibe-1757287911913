'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';

interface UserPreferences {
  favoriteCategories: string[];
  viewedProducts: string[];
  purchaseHistory: string[];
  priceRange: [number, number];
  dietaryRestrictions: string[];
  searchHistory: string[];
  wishlist: string[];
}

interface UserBehavior {
  productViews: Record<string, number>;
  categoryViews: Record<string, number>;
  searchQueries: string[];
  timeSpentOnProducts: Record<string, number>;
  cartAdditions: Record<string, number>;
}

const defaultPreferences: UserPreferences = {
  favoriteCategories: [],
  viewedProducts: [],
  purchaseHistory: [],
  priceRange: [0, 100],
  dietaryRestrictions: [],
  searchHistory: [],
  wishlist: []
};

const defaultBehavior: UserBehavior = {
  productViews: {},
  categoryViews: {},
  searchQueries: [],
  timeSpentOnProducts: {},
  cartAdditions: {}
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [behavior, setBehavior] = useState<UserBehavior>(defaultBehavior);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('aali-tigana-preferences');
    const savedBehavior = localStorage.getItem('aali-tigana-behavior');
    
    if (savedPreferences) {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
    
    if (savedBehavior) {
      try {
        setBehavior(JSON.parse(savedBehavior));
      } catch (error) {
        console.error('Error loading behavior data:', error);
      }
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('aali-tigana-preferences', JSON.stringify(preferences));
  }, [preferences]);

  // Save behavior data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aali-tigana-behavior', JSON.stringify(behavior));
  }, [behavior]);

  const trackProductView = (product: Product) => {
    setBehavior(prev => ({
      ...prev,
      productViews: {
        ...prev.productViews,
        [product.id]: (prev.productViews[product.id] || 0) + 1
      },
      categoryViews: {
        ...prev.categoryViews,
        [product.category]: (prev.categoryViews[product.category] || 0) + 1
      }
    }));

    setPreferences(prev => ({
      ...prev,
      viewedProducts: [
        product.id,
        ...prev.viewedProducts.filter(id => id !== product.id)
      ].slice(0, 50) // Keep last 50 viewed products
    }));
  };

  const trackSearch = (query: string) => {
    if (query.trim()) {
      setBehavior(prev => ({
        ...prev,
        searchQueries: [query, ...prev.searchQueries.slice(0, 49)]
      }));

      setPreferences(prev => ({
        ...prev,
        searchHistory: [
          query,
          ...prev.searchHistory.filter(q => q !== query)
        ].slice(0, 20)
      }));
    }
  };

  const trackCartAddition = (product: Product) => {
    setBehavior(prev => ({
      ...prev,
      cartAdditions: {
        ...prev.cartAdditions,
        [product.id]: (prev.cartAdditions[product.id] || 0) + 1
      }
    }));
  };

  const trackTimeOnProduct = (productId: string, timeSpent: number) => {
    setBehavior(prev => ({
      ...prev,
      timeSpentOnProducts: {
        ...prev.timeSpentOnProducts,
        [productId]: (prev.timeSpentOnProducts[productId] || 0) + timeSpent
      }
    }));
  };

  const addToWishlist = (productId: string) => {
    setPreferences(prev => ({
      ...prev,
      wishlist: [...prev.wishlist.filter(id => id !== productId), productId]
    }));
  };

  const removeFromWishlist = (productId: string) => {
    setPreferences(prev => ({
      ...prev,
      wishlist: prev.wishlist.filter(id => id !== productId)
    }));
  };

  const updateFavoriteCategories = (category: string) => {
    setPreferences(prev => {
      const exists = prev.favoriteCategories.includes(category);
      return {
        ...prev,
        favoriteCategories: exists 
          ? prev.favoriteCategories.filter(cat => cat !== category)
          : [...prev.favoriteCategories, category]
      };
    });
  };

  const updatePriceRange = (range: [number, number]) => {
    setPreferences(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  const updateDietaryRestrictions = (restrictions: string[]) => {
    setPreferences(prev => ({
      ...prev,
      dietaryRestrictions: restrictions
    }));
  };

  const addToPurchaseHistory = (productId: string) => {
    setPreferences(prev => ({
      ...prev,
      purchaseHistory: [productId, ...prev.purchaseHistory]
    }));
  };

  const getFavoriteCategories = () => {
    // Analyze behavior to determine favorite categories
    const categoryScores: Record<string, number> = {};
    
    // Score based on views
    Object.entries(behavior.categoryViews).forEach(([category, views]) => {
      categoryScores[category] = (categoryScores[category] || 0) + (views as number) * 2;
    });

    // Score based on cart additions - simplified scoring
    Object.entries(behavior.cartAdditions).forEach(([, additions]) => {
      // Add general bonus for any cart activity
      categoryScores['dates'] = (categoryScores['dates'] || 0) + (additions as number) * 0.5;
      categoryScores['figs'] = (categoryScores['figs'] || 0) + (additions as number) * 0.5;
      categoryScores['apricots'] = (categoryScores['apricots'] || 0) + (additions as number) * 0.5;
      categoryScores['raisins'] = (categoryScores['raisins'] || 0) + (additions as number) * 0.5;
    });

    return Object.entries(categoryScores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category);
  };

  const getPersonalizedRecommendations = () => {
    const favoriteCategories = getFavoriteCategories();
    const viewedProducts = preferences.viewedProducts;
    
    return {
      favoriteCategories,
      viewedProducts,
      priceRange: preferences.priceRange,
      searchHistory: preferences.searchHistory.slice(0, 5)
    };
  };

  return {
    preferences,
    behavior,
    trackProductView,
    trackSearch,
    trackCartAddition,
    trackTimeOnProduct,
    addToWishlist,
    removeFromWishlist,
    updateFavoriteCategories,
    updatePriceRange,
    updateDietaryRestrictions,
    addToPurchaseHistory,
    getFavoriteCategories,
    getPersonalizedRecommendations
  };
};