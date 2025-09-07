import React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-amber-900 via-orange-900 to-yellow-900 text-amber-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                <span className="text-sm font-bold text-white">🌿</span>
              </div>
              <h3 className="font-playfair text-xl font-bold">Aali Tigana</h3>
            </div>
            <p className="text-amber-200 text-sm leading-relaxed">
              Premium dried fruits sourced from the finest regions worldwide. 
              We bring you nature's sweetest gifts, naturally preserved and 
              packed with nutrition for a healthy lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                📘 Facebook
              </a>
              <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                📷 Instagram
              </a>
              <a href="#" className="text-amber-200 hover:text-amber-100 transition-colors">
                🐦 Twitter
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-amber-100">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/products" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                All Products
              </Link>
              <Link href="/offers" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Special Offers
              </Link>
              <Link href="/about" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                About Us
              </Link>
              <Link href="/track-order" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Track Your Order
              </Link>
              <Link href="/bulk-orders" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Bulk Orders
              </Link>
            </nav>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-amber-100">Categories</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/products?category=dates" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Premium Dates
              </Link>
              <Link href="/products?category=figs" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Dried Figs
              </Link>
              <Link href="/products?category=apricots" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Organic Apricots
              </Link>
              <Link href="/products?category=raisins" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Golden Raisins
              </Link>
              <Link href="/products?category=mixed" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Trail Mixes
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold text-amber-100">Customer Service</h4>
            <div className="space-y-2 text-sm">
              <p className="text-amber-200">📞 1-800-TIGANA-1</p>
              <p className="text-amber-200">📧 hello@aalitigana.com</p>
              <p className="text-amber-200">⏰ Mon-Fri: 9AM-6PM EST</p>
            </div>
            <nav className="flex flex-col space-y-2">
              <Link href="/help" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Help Center
              </Link>
              <Link href="/shipping" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Shipping Info
              </Link>
              <Link href="/returns" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                Returns & Refunds
              </Link>
              <Link href="/faq" className="text-amber-200 hover:text-amber-100 transition-colors text-sm">
                FAQ
              </Link>
            </nav>
          </div>
        </div>

        <Separator className="my-8 bg-amber-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-amber-200">
            <p>&copy; {currentYear} Aali Tigana. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link href="/privacy" className="hover:text-amber-100 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-amber-100 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-amber-100 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center space-x-3">
            <span className="text-amber-200 text-sm">We Accept:</span>
            <div className="flex space-x-2">
              <div className="bg-white rounded px-2 py-1 text-xs font-semibold text-gray-800">💳 VISA</div>
              <div className="bg-white rounded px-2 py-1 text-xs font-semibold text-gray-800">💳 MC</div>
              <div className="bg-blue-600 rounded px-2 py-1 text-xs font-semibold text-white">PayPal</div>
              <div className="bg-green-600 rounded px-2 py-1 text-xs font-semibold text-white">💵 COD</div>
            </div>
          </div>
        </div>

        {/* Quality Promise */}
        <div className="mt-8 p-6 bg-amber-800/30 rounded-lg border border-amber-700">
          <div className="text-center">
            <h5 className="font-semibold text-amber-100 mb-2">🌟 Our Quality Promise</h5>
            <p className="text-amber-200 text-sm">
              Premium quality dried fruits, naturally sweet and packed with nutrients. 
              Satisfaction guaranteed or your money back within 30 days.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};