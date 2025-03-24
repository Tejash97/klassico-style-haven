
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  link: string;
  delay?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  imageSrc,
  link,
  delay = 0
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 cursor-pointer h-[400px] reveal",
        isHovered ? "shadow-xl scale-[1.02]" : ""
      )}
      style={{ transitionDelay: `${delay * 0.1}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.location.href = link}
    >
      {/* Image background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img 
          src={imageSrc}
          alt={title}
          className={cn(
            "w-full h-full object-cover object-center transition-all duration-700",
            isHovered ? "scale-110" : "scale-100",
            imageLoaded ? "image-loaded" : "image-loading"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-500",
          isHovered ? "opacity-90" : "opacity-70"
        )}></div>
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 text-white">
        <h3 className={cn(
          "text-2xl md:text-3xl font-bold mb-2 transition-transform duration-500",
          isHovered ? "translate-y-0" : "translate-y-2"
        )}>
          {title}
        </h3>
        
        <p className={cn(
          "text-sm md:text-base text-gray-200 mb-6 transition-all duration-500",
          isHovered ? "opacity-100 translate-y-0 max-h-20" : "opacity-0 translate-y-4 max-h-0"
        )}>
          {description}
        </p>
        
        <div className={cn(
          "flex items-center transition-all duration-500",
          isHovered ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
        )}>
          <span className="text-sm font-medium mr-2">Explore Collection</span>
          <ArrowRight size={16} className={cn(
            "transition-transform duration-300",
            isHovered ? "translate-x-1" : "translate-x-0"
          )} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
