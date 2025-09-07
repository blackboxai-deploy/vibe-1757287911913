'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { products, searchProducts } from '@/lib/products';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Product } from '@/types';

const categories = [
  { value: 'all', label: 'All Products', emoji: '🌿' },
  { value: 'dates', label: 'Dates', emoji: '🌴' },
  { value: 'figs', label: 'Figs', emoji: '🟣' },
  { value: 'apricots', label: 'Apricots', emoji: '🧡' },
  { value: 'raisins', label: 'Raisins', emoji: '🟤' },
  { value: 'mixed', label: 'Mixed', emoji: '🥜' }
];

const sortOptions = [
  { value: 'name', label: 'Name A-Z' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'popular', label: 'Most Popular' }
];

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { trackSearch } = useUserPreferences();
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);


  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    const search = searchParams.get('search') || '';
    setSelectedCategory(category);
    setSearchQuery(search);
  }, [searchParams]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sorting
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        filtered.sort((a, b) => {
          const aScore = (a.isBestSeller ? 10 : 0) + (a.reviewCount / 10);
          const bScore = (b.isBestSeller ? 10 : 0) + (b.reviewCount / 10);
          return bScore - aScore;
        });
        break;
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      trackSearch(query);
    }
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange([0, 50]);
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-amber-900 mb-4">
            Premium Dried Fruits Collection
          </h1>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Discover our carefully curated selection of the world's finest dried fruits, 
            sourced from premium regions and naturally preserved for optimal taste and nutrition.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-80">
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-amber-900">Filters</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-amber-600 hover:text-amber-800"
                  >
                    Clear All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-amber-900 mb-2 block">
                    Search Products
                  </label>
                  <Input
                    placeholder="Search dried fruits..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="border-amber-200 focus:border-amber-400"
                  />
                </div>

                <Separator />

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium text-amber-900 mb-3 block">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => setSelectedCategory(category.value)}
                        className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                          selectedCategory === category.value
                            ? 'bg-gradient-to-r from-amber-200 to-orange-200 text-amber-900 font-medium'
                            : 'text-amber-700 hover:bg-amber-100'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{category.emoji}</span>
                          {category.label}
                        </span>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700">
                          {category.value === 'all' 
                            ? products.length 
                            : products.filter(p => p.category === category.value).length
                          }
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-amber-900 mb-3 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-amber-600 mt-1">
                    <span>$0</span>
                    <span>$50+</span>
                  </div>
                </div>

                <Separator />

                {/* Features Filter */}
                <div>
                  <label className="text-sm font-medium text-amber-900 mb-3 block">
                    Popular Features
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Organic', 'Best Seller', 'High Fiber', 'No Sugar Added'].map((feature) => (
                      <Badge
                        key={feature}
                        variant="secondary"
                        className="cursor-pointer bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Controls Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <p className="text-amber-700">
                  <span className="font-semibold">{filteredProducts.length}</span> products found
                </p>
                {selectedCategory !== 'all' && (
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                    {categories.find(c => c.value === selectedCategory)?.emoji}{' '}
                    {categories.find(c => c.value === selectedCategory)?.label}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-amber-700">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 border-amber-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} showFullDetails />
                ))}
              </div>
            ) : (
              <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <Button
                    onClick={clearFilters}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}