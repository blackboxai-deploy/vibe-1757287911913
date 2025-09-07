'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  showFullDetails?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showFullDetails = false 
}) => {
  const { addToCart } = useCart();
  const { trackProductView, addToWishlist, removeFromWishlist, preferences } = useUserPreferences();
  
  const isInWishlist = preferences.wishlist.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  const handleCardClick = () => {
    trackProductView(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <Link href={`/product/${product.id}`} onClick={handleCardClick}>
      <Card className="group h-full hover:shadow-xl transition-all duration-300 border-amber-200 bg-white hover:bg-gradient-to-br hover:from-white hover:to-amber-50 cursor-pointer">
        <CardHeader className="p-4 pb-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-amber-50">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/400x400?text=Aali+Tigana+Premium+Dried+Fruits';
              }}
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isBestSeller && (
                <Badge className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold">
                  🔥 Best Seller
                </Badge>
              )}
              {product.isNewArrival && (
                <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs font-semibold">
                  ✨ New
                </Badge>
              )}
              {discountPercentage && (
                <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold">
                  -{discountPercentage}%
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors flex items-center justify-center"
            >
              <span className={`text-lg ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}>
                {isInWishlist ? '❤️' : '🤍'}
              </span>
            </button>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive" className="text-sm">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-4 pt-2 flex-1">
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-amber-600 capitalize">
                {product.category}
              </span>
              <span className="text-amber-400">•</span>
              <span className="text-sm text-amber-600">{product.origin}</span>
            </div>
            
            <h3 className="font-semibold text-amber-900 group-hover:text-orange-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-sm text-amber-700 line-clamp-2">
              {product.shortDescription}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-1">
              {product.features.slice(0, 2).map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="text-xs bg-amber-100 text-amber-700 border-amber-200"
                >
                  {feature}
                </Badge>
              ))}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-sm text-amber-600">
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            {/* Weight */}
            <p className="text-sm text-amber-600">
              📦 {product.weight}
            </p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="w-full space-y-3">
            {/* Pricing */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-amber-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.inStock && product.stockQuantity <= 10 && (
                <Badge variant="outline" className="text-xs border-orange-300 text-orange-600">
                  Only {product.stockQuantity} left
                </Badge>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.inStock ? (
                <>🛒 Add to Cart</>
              ) : (
                'Out of Stock'
              )}
            </Button>

            {/* Nutrition Highlight */}
            {showFullDetails && (
              <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                <span className="font-medium">Nutrition per serving:</span> {product.nutritionFacts.calories} cal
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};