
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageSrc: string;
  imageAlt: string;
  textColor: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Premium Denim Collection",
    subtitle: "Experience unparalleled comfort and style with our signature jeans",
    ctaText: "Shop Jeans",
    ctaLink: "/jeans",
    imageSrc: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    imageAlt: "Models wearing Klassico jeans",
    textColor: "text-white"
  },
  {
    id: 2,
    title: "Elegant Blazer Range",
    subtitle: "Redefine your formal attire with our meticulously crafted blazers",
    ctaText: "Discover Blazers",
    ctaLink: "/blazers",
    imageSrc: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    imageAlt: "Model wearing Klassico blazer",
    textColor: "text-white"
  },
  {
    id: 3,
    title: "Vibrant Kurti Selection",
    subtitle: "Embrace cultural elegance with our modern kurti designs",
    ctaText: "Explore Kurtis",
    ctaLink: "/kurtis",
    imageSrc: "https://images.unsplash.com/photo-1583391123943-ebab0773b8d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2001&q=80",
    imageAlt: "Model wearing Klassico kurti",
    textColor: "text-white"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: string[] = [];
      
      for (const slide of slides) {
        try {
          await new Promise((resolve, reject) => {
            const img = new Image();
            img.src = slide.imageSrc;
            img.onload = resolve;
            img.onerror = reject;
          });
          
          loadedImages.push(slide.imageSrc);
        } catch (error) {
          console.error("Failed to load image:", error);
        }
      }
      
      setPreloadedImages(loadedImages);
      setIsLoading(false);
    };
    
    preloadImages();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (isLoading) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    
    return () => clearInterval(timer);
  }, [isLoading]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Handle slide transition
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 border-4 border-klassico-navy border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out-expo",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Image with overlay */}
          <div className="relative w-full h-full">
            <img
              src={slide.imageSrc}
              alt={slide.imageAlt}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-xl ml-8 md:ml-16 space-y-6">
                <h2 
                  className={cn(
                    "text-4xl md:text-6xl font-bold leading-tight tracking-tight",
                    slide.textColor,
                    index === currentSlide ? "animate-slideInLeft" : ""
                  )}
                  style={{ animationDelay: "0.2s" }}
                >
                  {slide.title}
                </h2>
                
                <p 
                  className={cn(
                    "text-lg md:text-xl",
                    slide.textColor,
                    index === currentSlide ? "animate-slideInLeft" : ""
                  )}
                  style={{ animationDelay: "0.4s" }}
                >
                  {slide.subtitle}
                </p>
                
                <div 
                  className={cn(
                    index === currentSlide ? "animate-slideInLeft" : ""
                  )}
                  style={{ animationDelay: "0.6s" }}
                >
                  <a
                    href={slide.ctaLink}
                    className="inline-flex items-center gap-2 bg-white text-klassico-navy px-6 py-3 rounded-md font-medium transition-transform duration-300 hover:translate-x-1"
                  >
                    {slide.ctaText}
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              index === currentSlide 
                ? "bg-white w-8" 
                : "bg-white/50 hover:bg-white/70"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
