'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useRecommendations } from '@/lib/recommendations';
import { ProductCard } from '@/components/ProductCard';
import { toast } from 'sonner';

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCart();
  const { getComplementaryProducts } = useRecommendations();
  
  const cartTotal = getCartTotal();
  const itemCount = getCartItemCount();
  const shippingThreshold = 50;
  const shippingCost = cartTotal >= shippingThreshold ? 0 : 8.99;
  const finalTotal = cartTotal + shippingCost;
  const complementaryProducts = getComplementaryProducts(items);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    toast.success('Cart updated');
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-2xl mx-auto border-amber-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="text-center py-16">
              <div className="text-8xl mb-6">🛒</div>
              <h1 className="font-playfair text-3xl font-bold text-amber-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-amber-700 mb-8 text-lg">
                Looks like you haven't added any delicious dried fruits yet. 
                Browse our premium collection and treat yourself to nature's sweetest treasures!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-3 text-lg">
                    🌿 Shop Dried Fruits
                  </Button>
                </Link>
                <Link href="/offers">
                  <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50 px-8 py-3 text-lg">
                    🎁 View Special Offers
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-amber-900">
              Shopping Cart
            </h1>
            <p className="text-amber-700 mt-2">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearCart}
            className="border-red-300 text-red-600 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product.id} className="border-amber-200 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden bg-amber-100 flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/400x400?text=Aali+Tigana+Premium+Dried+Fruits';
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                        <div>
                          <Link href={`/product/${item.product.id}`}>
                            <h3 className="font-semibold text-amber-900 hover:text-orange-700 transition-colors text-lg">
                              {item.product.name}
                            </h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="bg-amber-100 text-amber-700 capitalize">
                              {item.product.category}
                            </Badge>
                            <span className="text-amber-600 text-sm">• {item.product.weight}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xl font-bold text-amber-900">
                            ${item.product.price.toFixed(2)}
                          </div>
                          {item.product.originalPrice && (
                            <div className="text-sm text-gray-500 line-through">
                              ${item.product.originalPrice.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-amber-700 text-sm line-clamp-2">
                        {item.product.shortDescription}
                      </p>

                      {/* Quantity Controls and Remove Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-amber-900">Quantity:</span>
                          <div className="flex items-center border border-amber-300 rounded-lg">
                            <button
                              onClick={() => handleQuantityChange(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
                            >
                              −
                            </button>
                            <span className="w-12 h-10 flex items-center justify-center font-medium text-amber-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleQuantityChange(item.product.id, Math.min(10, item.quantity + 1))}
                              className="w-10 h-10 flex items-center justify-center text-amber-700 hover:bg-amber-100 transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-lg font-semibold text-amber-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            🗑️ Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm sticky top-24">
              <CardHeader>
                <CardTitle className="text-amber-900">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-amber-700">Subtotal ({itemCount} items)</span>
                  <span className="font-medium text-amber-900">${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-amber-700">Shipping</span>
                  <span className="font-medium text-amber-900">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                {cartTotal < shippingThreshold && (
                  <div className="bg-amber-100 p-3 rounded-lg">
                    <p className="text-amber-800 text-sm">
                      Add ${(shippingThreshold - cartTotal).toFixed(2)} more to get FREE shipping! 🚚
                    </p>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-amber-900">Total</span>
                  <span className="text-amber-900">${finalTotal.toFixed(2)}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Link href="/checkout">
                    <Button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 text-lg">
                      🛍️ Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/products">
                    <Button variant="outline" className="w-full border-amber-300 text-amber-700 hover:bg-amber-50">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Badges */}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-center gap-2 text-xs text-amber-600">
                    <span>🔒</span>
                    <span>Secure Checkout</span>
                    <span>•</span>
                    <span>SSL Encrypted</span>
                  </div>
                  <div className="flex justify-center gap-2 mt-2">
                    <div className="bg-white rounded px-2 py-1 text-xs font-semibold text-gray-800 border">💳 VISA</div>
                    <div className="bg-white rounded px-2 py-1 text-xs font-semibold text-gray-800 border">💳 MC</div>
                    <div className="bg-blue-600 rounded px-2 py-1 text-xs font-semibold text-white">PayPal</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card className="border-amber-200 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-amber-900 text-base">Have a Promo Code?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:border-amber-500 text-amber-900"
                  />
                  <Button variant="outline" className="border-amber-300 text-amber-700 hover:bg-amber-50">
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Complementary Products */}
        {complementaryProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold text-amber-900 mb-8">
              Complete Your Order
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {complementaryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}