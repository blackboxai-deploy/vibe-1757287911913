'use client';

import React from 'react';
import { ProductCard } from '@/components/ProductCard';
import { useRecommendations } from '@/lib/recommendations';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export const RecommendedProducts: React.FC = () => {
  const { getPersonalizedRecommendations } = useUserPreferences();
  const recommendations = useRecommendations();
  
  const userPrefs = getPersonalizedRecommendations();
  const recommendedProducts = recommendations.getRecommendations(userPrefs);

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4">
      <div className="mb-8">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-amber-900 mb-2">
          🎯 Recommended for You
        </h2>
        <p className="text-amber-700">
          Based on your browsing history and preferences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendedProducts.slice(0, 4).map((recommendation) => (
          <div key={recommendation.product.id} className="relative">
            <ProductCard product={recommendation.product} />
            <div className="absolute -top-2 -right-2 z-10">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                {Math.round(recommendation.confidence * 100)}% match
              </div>
            </div>
            <div className="mt-2 text-xs text-amber-600 bg-amber-50 p-2 rounded">
              💡 {recommendation.reason}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};