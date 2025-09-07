'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/lib/products';
import { Discount } from '@/types';

const activeDiscounts: Discount[] = [
  {
    code: 'WELCOME20',
    type: 'percentage',
    value: 20,
    minOrderAmount: 25,
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    isFirstTimeCustomer: true,
    description: 'New customer exclusive: 20% off your first order over $25'
  },
  {
    code: 'BULK15',
    type: 'percentage',
    value: 15,
    minOrderAmount: 75,
    validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    description: 'Bulk discount: 15% off orders over $75'
  },
  {
    code: 'SEASONAL10',
    type: 'percentage',
    value: 10,
    minOrderAmount: 50,
    validUntil: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    description: 'Seasonal special: 10% off orders over $50'
  },
  {
    code: 'FREESHIP',
    type: 'fixed',
    value: 8.99,
    minOrderAmount: 35,
    validUntil: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000), // 45 days from now
    description: 'Free shipping on orders over $35 (saves $8.99)'
  }
];

export default function OffersPage() {
  const discountedProducts = products.filter(product => product.discount && product.discount > 0);
  const bestSellers = products.filter(product => product.isBestSeller);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-semibold mb-4">
            🔥 LIMITED TIME OFFERS 🔥
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Special Offers & Deals
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Save big on our premium dried fruits! From first-time customer discounts to bulk savings, 
            we have amazing deals to help you stock up on nature's sweetest treasures.
          </p>
        </div>

        {/* Discount Codes */}
        <section className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-amber-900 mb-8 text-center">
            💰 Active Promo Codes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeDiscounts.map((discount) => (
              <Card key={discount.code} className="border-2 border-amber-400 bg-gradient-to-br from-white to-amber-50 relative overflow-hidden">
                {discount.isFirstTimeCustomer && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                    NEW CUSTOMERS
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-amber-900 text-xl">
                      {discount.type === 'percentage' ? `${discount.value}% OFF` : `$${discount.value} OFF`}
                    </CardTitle>
                    <Badge className="bg-gradient-to-r from-amber-600 to-orange-600 text-white font-mono text-lg px-3 py-1">
                      {discount.code}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-800 mb-4">{discount.description}</p>
                  <div className="space-y-2 text-sm text-amber-700">
                    <p>📦 Minimum order: ${discount.minOrderAmount}</p>
                    <p>⏰ Valid until: {formatDate(discount.validUntil)}</p>
                  </div>
                  <Button
                    onClick={() => copyToClipboard(discount.code)}
                    className="w-full mt-4 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold"
                  >
                    📋 Copy Code: {discount.code}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Discounted Products */}
        {discountedProducts.length > 0 && (
          <section className="mb-16">
            <h2 className="font-playfair text-3xl font-bold text-amber-900 mb-8 text-center">
              🏷️ Products on Sale
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} showFullDetails />
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers */}
        <section className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-amber-900 mb-8 text-center">
            ⭐ Customer Favorites
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section>
          <Card className="border-amber-300 bg-gradient-to-br from-amber-100 to-orange-100">
            <CardContent className="text-center py-12">
              <div className="text-4xl mb-4">📧</div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-amber-900 mb-4">
                Never Miss a Deal!
              </h2>
              <p className="text-amber-700 mb-6 max-w-lg mx-auto">
                Subscribe to our newsletter and be the first to know about exclusive offers, 
                new products, and seasonal promotions.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border border-amber-300 focus:outline-none focus:border-amber-500 text-amber-900"
                />
                <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-6 py-3 rounded-lg font-semibold">
                  Subscribe 🎁
                </Button>
              </div>
              <p className="text-xs text-amber-600 mt-4">
                Get 10% off your first order when you subscribe!
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}