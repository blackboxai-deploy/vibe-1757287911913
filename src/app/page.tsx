'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { RecommendedProducts } from '@/components/RecommendedProducts';
import { Chatbot } from '@/components/Chatbot';
import { getBestSellers, getNewArrivals } from '@/lib/products';

export default function HomePage() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();

  const features = [
    {
      title: 'Premium Quality',
      description: 'Hand-picked from the finest regions worldwide',
      icon: '🌟'
    },
    {
      title: 'Natural & Organic',
      description: 'No artificial additives, preservatives, or chemicals',
      icon: '🌿'
    },
    {
      title: 'Fast Shipping',
      description: 'Free shipping on orders over $50, delivered fresh',
      icon: '🚚'
    },
    {
      title: 'Expert Curation',
      description: 'Carefully selected by our dried fruit specialists',
      icon: '👨‍🍳'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      rating: 5,
      comment: 'The Medjool dates are absolutely divine! So fresh and sweet.',
      location: 'New York, NY'
    },
    {
      name: 'Ahmed K.',
      rating: 5,
      comment: 'Best Turkish figs I\'ve ever tasted. Will definitely order again!',
      location: 'Los Angeles, CA'
    },
    {
      name: 'Maria L.',
      rating: 5,
      comment: 'Love the trail mix! Perfect for my morning hikes.',
      location: 'Denver, CO'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-amber-100 via-orange-100 to-yellow-100">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4 bg-amber-200 text-amber-800 border-amber-300">
              🌟 Premium Dried Fruits Since 2020
            </Badge>
            <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-amber-900 leading-tight">
              Nature's Sweetest
              <span className="block text-orange-700">Treasures</span>
            </h1>
            <p className="text-lg md:text-xl text-amber-700 max-w-2xl mx-auto leading-relaxed">
              Discover our premium collection of dried fruits, carefully sourced from the world's finest regions. 
              From succulent Medjool dates to sun-dried Turkish figs – experience pure, natural sweetness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
              <Link href="/products">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Shop Now 🛒
                </Button>
              </Link>
              <Link href="/offers">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg font-semibold rounded-full transition-all duration-300"
                >
                  View Offers 🎁
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">
          Why Choose Aali Tigana?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center border-amber-200 hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-amber-50">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle className="text-amber-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-700">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-amber-900">
            🔥 Best Sellers
          </h2>
          <Link href="/products">
            <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
              View All Products
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Personalized Recommendations */}
      <RecommendedProducts />

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-amber-900 mb-8">
            ✨ New Arrivals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newArrivals.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-amber-50 to-orange-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-center text-amber-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-amber-200 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">⭐</span>
                    ))}
                  </div>
                  <CardTitle className="text-amber-900">{testimonial.name}</CardTitle>
                  <p className="text-sm text-amber-600">{testimonial.location}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-amber-700 italic">"{testimonial.comment}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4">
        <Card className="bg-gradient-to-r from-amber-600 to-orange-600 border-none text-white">
          <CardContent className="text-center py-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
              Stay Sweet with Our Newsletter
            </h2>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Get exclusive offers, new product alerts, and healthy snacking tips delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-amber-900 border-none focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <Button className="bg-amber-800 hover:bg-amber-900 text-white px-6 py-3 rounded-lg font-semibold">
                Subscribe 📧
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}