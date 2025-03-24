
import React, { useState } from 'react';
import { ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageSrc: string;
  hoverImageSrc?: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  delay?: number;
  onAddToCart?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageSrc,
  hoverImageSrc,
  category,
  isNew = false,
  isSale = false,
  discount = 0,
  delay = 0,
  onAddToCart
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoverImageLoaded, setHoverImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart(id);
    }
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };
  
  const formattedPrice = new Intl.NumberFormat('en-IN', { 
    style: 'currency', 
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
  
  const originalPrice = discount > 0 
    ? new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR',
        maximumFractionDigits: 0
      }).format(price / (1 - discount/100))
    : null;

  return (
    <a 
      href={`/product/${id}`}
      className={cn(
        "group block overflow-hidden bg-white rounded-lg transition-all duration-500 reveal",
        isHovered ? "shadow-lg translate-y-[-5px]" : "shadow-sm"
      )}
      style={{ transitionDelay: `${delay * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        {/* Main image and hover image */}
        {hoverImageSrc ? (
          <>
            <img 
              src={imageSrc}
              alt={name}
              className={cn(
                "absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500",
                imageLoaded ? "image-loaded" : "image-loading",
                isHovered ? "opacity-0" : "opacity-100"
              )}
              onLoad={() => setImageLoaded(true)}
            />
            <img 
              src={hoverImageSrc}
              alt={`${name} - alternate view`}
              className={cn(
                "absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500",
                hoverImageLoaded ? "image-loaded" : "image-loading",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setHoverImageLoaded(true)}
            />
          </>
        ) : (
          <img 
            src={imageSrc}
            alt={name}
            className={cn(
              "w-full h-full object-cover object-center transition-all duration-500",
              imageLoaded ? "image-loaded" : "image-loading",
              isHovered ? "scale-110" : "scale-100"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        
        {/* Badge (New or Sale) */}
        {(isNew || isSale) && (
          <div className={cn(
            "absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded-full z-10",
            isNew ? "bg-klassico-navy text-white" : "bg-red-500 text-white"
          )}>
            {isNew ? "New" : `${discount}% Off`}
          </div>
        )}
        
        {/* Quick action buttons */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-3 flex justify-center gap-2 transition-all duration-500 bg-gradient-to-t from-black/30 to-transparent",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <button
            onClick={handleAddToCart}
            className="glass text-white p-3 rounded-full transition-all duration-300 hover:bg-white hover:text-klassico-navy"
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
          
          <button
            onClick={toggleFavorite}
            className={cn(
              "glass p-3 rounded-full transition-all duration-300 hover:bg-white",
              isFavorite ? "text-red-500 hover:text-red-600" : "text-white hover:text-klassico-navy"
            )}
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      
      {/* Product details */}
      <div className="p-4">
        <div className="mb-1 text-xs text-gray-500 uppercase tracking-wide">{category}</div>
        <h3 className="font-medium text-klassico-dark mb-1 transition-colors duration-300 group-hover:text-klassico-navy">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-semibold">{formattedPrice}</span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">{originalPrice}</span>
          )}
        </div>
      </div>
    </a>
  );
};

export default ProductCard;
