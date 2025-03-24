
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/services/supabase';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  // Calculate the sale price if applicable
  const salePrice = product.is_sale && product.discount 
    ? product.price * (1 - product.discount / 100) 
    : null;
  
  // Format price as Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  return (
    <Link 
      to={`/product/${product.slug}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-[3/4]">
        {/* Product Image */}
        <img 
          src={isHovered && product.hover_image_url ? product.hover_image_url : product.image_url} 
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-500"
        />
        
        {/* Quick Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
          <button 
            onClick={handleAddToCart}
            className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
          
          <button 
            className="bg-white text-black p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
          >
            <Heart size={18} />
          </button>
        </div>
        
        {/* Labels */}
        <div className="absolute top-0 left-0 p-2 flex flex-col gap-1">
          {product.is_new && (
            <span className="bg-black text-white text-xs px-2 py-1">
              NEW
            </span>
          )}
          
          {product.is_sale && (
            <span className="bg-red-600 text-white text-xs px-2 py-1">
              SALE
            </span>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-600">
          {product.category?.name}
        </h3>
        <h2 className="text-base font-medium mt-1">
          {product.name}
        </h2>
        <div className="mt-2 flex items-center gap-2">
          {salePrice ? (
            <>
              <span className="font-medium">{formatPrice(salePrice)}</span>
              <span className="text-gray-500 line-through text-sm">
                {formatPrice(product.price)}
              </span>
            </>
          ) : (
            <span className="font-medium">{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
