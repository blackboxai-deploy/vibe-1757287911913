'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ProductCard } from '@/components/ProductCard';
import { getProductById } from '@/lib/products';
import { useRecommendations } from '@/lib/recommendations';
import { useCart } from '@/context/CartContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = getProductById(productId);
  const { getSimilarProducts } = useRecommendations();
  const { addToCart } = useCart();
  const { trackProductView, addToWishlist, removeFromWishlist, preferences } = useUserPreferences();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    if (product) {
      trackProductView(product);
    }
  }, [product, trackProductView]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
          <CardContent className="text-center py-16">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-semibold text-amber-900 mb-2">Product Not Found</h2>
            <p className="text-amber-700 mb-4">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white">
                Browse All Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const similarProducts = getSimilarProducts(product.id);
  const isInWishlist = preferences.wishlist.includes(product.id);
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} x ${product.name} added to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product.id);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-amber-600 mb-6">
          <Link href="/" className="hover:text-amber-800">Home</Link>
          <span>→</span>
          <Link href="/products" className="hover:text-amber-800">Products</Link>
          <span>→</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-amber-800 capitalize">
            {product.category}
          </Link>
          <span>→</span>
          <span className="text-amber-800 font-medium">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden bg-amber-100 relative">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/800x800?text=Aali+Tigana+Premium+Dried+Fruits';
                }}
              />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isBestSeller && (
                  <Badge className="bg-orange-500 text-white font-semibold">
                    🔥 Best Seller
                  </Badge>
                )}
                {product.isNewArrival && (
                  <Badge className="bg-green-500 text-white font-semibold">
                    ✨ New Arrival
                  </Badge>
                )}
                {discountPercentage && (
                  <Badge className="bg-red-500 text-white font-semibold">
                    -{discountPercentage}% OFF
                  </Badge>
                )}
              </div>

              {/* Wishlist Button */}
              <button
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors flex items-center justify-center shadow-md"
              >
                <span className={`text-2xl ${isInWishlist ? 'text-red-500' : 'text-gray-400'}`}>
                  {isInWishlist ? '❤️' : '🤍'}
                </span>
              </button>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index 
                        ? 'border-amber-400' 
                        : 'border-amber-200 hover:border-amber-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-amber-100 text-amber-700 capitalize">
                  {product.category}
                </Badge>
                <span className="text-amber-600">•</span>
                <span className="text-amber-600">{product.origin}</span>
              </div>
              
              <h1 className="font-playfair text-3xl md:text-4xl font-bold text-amber-900 mb-3">
                {product.name}
              </h1>
              
              <p className="text-lg text-amber-700 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <span className="text-amber-700">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-amber-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {product.inStock && product.stockQuantity <= 10 && (
                  <Badge variant="outline" className="border-orange-300 text-orange-600">
                    Only {product.stockQuantity} left!
                  </Badge>
                )}
              </div>
              <p className="text-amber-700">📦 Weight: {product.weight}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-amber-900 mb-3">Key Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="bg-amber-200 text-amber-800 border-amber-300"
                  >
                    ✓ {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 p-4 bg-white/50 rounded-xl border border-amber-200">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-amber-900">Quantity:</label>
                  <div className="flex items-center border border-amber-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center font-medium text-amber-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 text-lg"
                >
                  {product.inStock ? (
                    <>🛒 Add to Cart - ${(product.price * quantity).toFixed(2)}</>
                  ) : (
                    'Out of Stock'
                  )}
                </Button>
                
                <Link href="/cart">
                  <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 py-3 px-6">
                    💳 Buy Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Shipping Info */}
            <Card className="border-amber-200 bg-amber-50/50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-amber-700">
                  <div className="flex items-center gap-2">
                    <span>🚚</span>
                    <div>
                      <p className="font-medium">Free Shipping</p>
                      <p>Orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📦</span>
                    <div>
                      <p className="font-medium">Fast Delivery</p>
                      <p>2-3 business days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>↩️</span>
                    <div>
                      <p className="font-medium">Easy Returns</p>
                      <p>30-day guarantee</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="nutrition" className="mb-16">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 bg-amber-100">
            <TabsTrigger value="nutrition" className="data-[state=active]:bg-white">
              Nutrition Facts
            </TabsTrigger>
            <TabsTrigger value="description" className="data-[state=active]:bg-white">
              Description
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-white">
              Storage & Care
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-white">
              Reviews ({product.reviewCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition" className="mt-6">
            <Card className="border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-900">Nutrition Facts per serving</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-900">{product.nutritionFacts.calories}</div>
                    <div className="text-sm text-amber-600">Calories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-900">{product.nutritionFacts.protein}</div>
                    <div className="text-sm text-amber-600">Protein</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-900">{product.nutritionFacts.carbs}</div>
                    <div className="text-sm text-amber-600">Carbs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-900">{product.nutritionFacts.fiber}</div>
                    <div className="text-sm text-amber-600">Fiber</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-900">{product.nutritionFacts.sugar}</div>
                    <div className="text-sm text-amber-600">Sugar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-900">{product.nutritionFacts.fat}</div>
                    <div className="text-sm text-amber-600">Fat</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="description" className="mt-6">
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <div className="prose max-w-none text-amber-800">
                  <p className="text-lg leading-relaxed mb-4">{product.description}</p>
                  <h4 className="text-xl font-semibold text-amber-900 mb-2">Origin & Quality</h4>
                  <p className="mb-4">
                    Our {product.name} are carefully sourced from {product.origin}, known for producing 
                    some of the world's finest dried fruits. Each batch is hand-selected for quality, 
                    ensuring you receive only the best.
                  </p>
                  <h4 className="text-xl font-semibold text-amber-900 mb-2">Perfect For</h4>
                  <ul className="list-disc list-inside space-y-1 text-amber-700">
                    <li>Healthy snacking throughout the day</li>
                    <li>Adding natural sweetness to recipes</li>
                    <li>Energy boost before workouts</li>
                    <li>Creating gourmet cheese and charcuterie boards</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="mt-6">
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <div className="space-y-4 text-amber-800">
                  <div>
                    <h4 className="text-xl font-semibold text-amber-900 mb-2">Storage Instructions</h4>
                    <ul className="space-y-2 text-amber-700">
                      <li>• Store in a cool, dry place away from direct sunlight</li>
                      <li>• Keep in an airtight container after opening</li>
                      <li>• Refrigeration can extend freshness up to 6 months</li>
                      <li>• Avoid storing near strong-smelling foods</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-amber-900 mb-2">Shelf Life</h4>
                    <p className="text-amber-700">
                      Best consumed within 12 months of purchase for optimal flavor and texture. 
                      Properly stored dried fruits can maintain quality well beyond this period.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="border-amber-200">
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">⭐</div>
                  <h3 className="text-2xl font-semibold text-amber-900 mb-2">
                    {product.rating} out of 5 stars
                  </h3>
                  <p className="text-amber-700 mb-6">
                    Based on {product.reviewCount} customer reviews
                  </p>
                  <p className="text-amber-600">
                    Customer reviews and ratings coming soon! We're working on implementing 
                    this feature to help you make informed decisions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <section>
            <h2 className="font-playfair text-3xl font-bold text-amber-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard key={similarProduct.id} product={similarProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}