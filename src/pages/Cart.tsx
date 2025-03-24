
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  
  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  // Calculate discounted price
  const calculatePrice = (price: number, discount: number | null) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };
  
  // Calculate item subtotal
  const calculateItemSubtotal = (price: number, discount: number | null, quantity: number) => {
    return calculatePrice(price, discount) * quantity;
  };

  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-block p-6 rounded-full bg-gray-100 mb-6">
              <ShoppingBag className="w-16 h-16 text-klassico-navy" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center bg-klassico-navy text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    const { product, quantity } = item;
                    const itemSubtotal = calculateItemSubtotal(
                      product.price, 
                      product.is_sale ? product.discount : null, 
                      quantity
                    );
                    
                    return (
                      <div key={product.id} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
                        {/* Product Image */}
                        <Link 
                          to={`/product/${product.slug}`} 
                          className="flex-shrink-0 w-full sm:w-24 aspect-square rounded-md overflow-hidden bg-gray-100"
                        >
                          <img 
                            src={product.image_url} 
                            alt={product.name} 
                            className="w-full h-full object-cover object-center"
                          />
                        </Link>
                        
                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row justify-between">
                            <div>
                              <Link 
                                to={`/product/${product.slug}`} 
                                className="text-lg font-medium hover:text-klassico-navy transition-colors"
                              >
                                {product.name}
                              </Link>
                              {product.category && (
                                <p className="text-sm text-gray-500">{product.category.name}</p>
                              )}
                            </div>
                            <div className="mt-2 sm:mt-0 text-right">
                              {product.is_sale && product.discount ? (
                                <div>
                                  <span className="font-medium">
                                    {formatPrice(calculatePrice(product.price, product.discount))}
                                  </span>
                                  <span className="ml-2 text-sm text-gray-500 line-through">
                                    {formatPrice(product.price)}
                                  </span>
                                </div>
                              ) : (
                                <span className="font-medium">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {/* Quantity Selector */}
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(product.id, quantity - 1)}
                                className={cn(
                                  "p-1 border border-gray-300 rounded-l-md hover:bg-gray-100",
                                  quantity <= 1 && "opacity-50 cursor-not-allowed"
                                )}
                                disabled={quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <input
                                type="number"
                                value={quantity}
                                readOnly
                                className="w-12 h-full text-center border-y border-gray-300 py-1"
                              />
                              <button
                                onClick={() => updateQuantity(product.id, quantity + 1)}
                                className="p-1 border border-gray-300 rounded-r-md hover:bg-gray-100"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8">
                              {/* Subtotal */}
                              <div className="text-right">
                                <p className="text-sm text-gray-500">Subtotal</p>
                                <p className="font-medium">{formatPrice(itemSubtotal)}</p>
                              </div>
                              
                              {/* Remove button */}
                              <button
                                onClick={() => removeFromCart(product.id)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                                aria-label={`Remove ${product.name} from cart`}
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Cart actions */}
                <div className="p-4 sm:p-6 bg-gray-50 flex flex-col sm:flex-row justify-between gap-4">
                  <Link 
                    to="/products" 
                    className="inline-flex items-center text-klassico-navy hover:text-klassico-dark transition-colors"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Continue Shopping
                  </Link>
                  
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 transition-colors text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatPrice(getCartTotal())}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-xl">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-klassico-navy text-white py-3 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Proceed to Checkout
                </button>
                
                <div className="mt-4 text-xs text-gray-500 text-center">
                  Taxes and shipping calculated at checkout
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CartPage;
