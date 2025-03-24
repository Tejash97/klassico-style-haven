
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass py-3 shadow-sm" : "py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="/" 
            className="relative z-50 text-2xl font-bold text-klassico-dark transition-opacity duration-300 hover:opacity-80"
          >
            Klassico
          </a>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300">Home</a>
            <a href="/jeans" className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300">Jeans</a>
            <a href="/blazers" className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300">Blazers</a>
            <a href="/kurtis" className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300">Kurtis</a>
            <a href="/about" className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300">About</a>
          </nav>
          
          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="relative text-klassico-dark p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button 
              className="relative text-klassico-dark p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-klassico-navy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
            
            {/* Mobile menu toggle */}
            <button 
              className="md:hidden relative z-50 text-klassico-dark p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 flex flex-col items-center justify-center p-4 transition-transform duration-500 ease-in-out-expo",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-center space-y-8 text-xl">
          <a 
            href="/" 
            className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </a>
          <a 
            href="/jeans" 
            className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Jeans
          </a>
          <a 
            href="/blazers" 
            className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Blazers
          </a>
          <a 
            href="/kurtis" 
            className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Kurtis
          </a>
          <a 
            href="/about" 
            className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
