
import React from 'react';
import { Link } from 'react-router-dom';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  alignment?: 'left' | 'center' | 'right';
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  subtitle,
  imageUrl,
  buttonText,
  buttonLink,
  alignment = 'center'
}) => {
  const textAlignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };
  
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className={`max-w-xl ${textAlignmentClasses[alignment]} space-y-4`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lg md:text-xl text-white">
              {subtitle}
            </p>
          )}
          
          <Link 
            to={buttonLink}
            className="inline-block mt-6 px-8 py-3 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
