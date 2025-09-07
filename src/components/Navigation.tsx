'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { searchProducts } from '@/lib/products';

export const Navigation = () => {
  const { getCartItemCount } = useCart();
  const { trackSearch } = useUserPreferences();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = getCartItemCount();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchProducts(query);
      setSearchResults(results);
      setIsSearchOpen(true);
      trackSearch(query);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const navigationItems = [
    { href: '/products', label: 'All Products' },
    { href: '/products?category=dates', label: 'Dates' },
    { href: '/products?category=figs', label: 'Figs' },
    { href: '/products?category=apricots', label: 'Apricots' },
    { href: '/products?category=raisins', label: 'Raisins' },
    { href: '/products?category=mixed', label: 'Mixed' },
    { href: '/offers', label: 'Special Offers' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        {/* Main Navigation Bar */}
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600">
              <span className="text-lg font-bold text-white">🌿</span>
            </div>
            <div>
              <h1 className="font-playfair text-xl font-bold text-amber-800">
                Aali Tigana
              </h1>
              <p className="text-xs text-amber-600">Premium Dried Fruits</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-amber-700 transition-colors hover:text-amber-900 hover:underline decoration-2 underline-offset-4"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="relative hidden md:block flex-1 max-w-md mx-8">
            <Input
              type="search"
              placeholder="Search for dried fruits..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-amber-50 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
            />
            {isSearchOpen && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-96 overflow-auto rounded-md border bg-white shadow-lg">
                {searchResults.slice(0, 5).map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="flex items-center p-3 hover:bg-amber-50 transition-colors"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-xl">🥜</span>
                    </div>
                    <div>
                      <p className="font-medium text-amber-900">{product.name}</p>
                      <p className="text-sm text-amber-600">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Link href="/cart">
              <Button variant="outline" size="sm" className="relative border-amber-200 text-amber-700 hover:bg-amber-50">
                🛒 Cart
                {cartItemCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs bg-orange-500 hover:bg-orange-600"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden border-amber-200 text-amber-700 hover:bg-amber-50">
                  Menu
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-b from-amber-50 to-orange-50">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="mb-4">
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full bg-white border-amber-200 focus:border-amber-400"
                    />
                  </div>
                  <Separator />
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-sm font-medium text-amber-700 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Separator />
                  <Link
                    href="/track-order"
                    className="text-sm font-medium text-amber-700 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Track Order
                  </Link>
                  <Link
                    href="/help"
                    className="text-sm font-medium text-amber-700 py-2 px-4 rounded-md hover:bg-amber-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Help & Support
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <Input
            type="search"
            placeholder="Search for dried fruits..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-amber-50 border-amber-200 focus:border-amber-400 focus:ring-amber-400"
          />
        </div>
      </div>
    </header>
  );
};