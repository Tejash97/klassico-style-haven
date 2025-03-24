
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { getCategories, Category } from '@/services/supabase';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  
  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategories();
      setCategories(data);
    };
    
    fetchCategories();
  }, []);
  
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

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "glass py-3 shadow-sm" : "py-5"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-50 text-2xl font-bold text-klassico-dark transition-opacity duration-300 hover:opacity-80"
          >
            Klassico
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300">Home</Link>
            {categories.map(category => (
              <Link 
                key={category.id}
                to={`/${category.slug}`} 
                className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
              >
                {category.name}
              </Link>
            ))}
            <Link to="/about" className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300">About</Link>
          </nav>
          
          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-l-md py-1 px-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-klassico-navy focus:border-transparent"
              />
              <button 
                type="submit"
                className="rounded-r-md bg-klassico-navy text-white py-1 px-3 border border-klassico-navy hover:bg-opacity-90 transition-colors"
              >
                <Search size={16} />
              </button>
            </form>
            
            <Link 
              to="/cart" 
              className="relative text-klassico-dark p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-klassico-navy text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>
            
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
          "fixed inset-0 bg-white z-40 flex flex-col items-center justify-start pt-24 p-4 transition-transform duration-500 ease-in-out-expo",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <form onSubmit={handleSearch} className="w-full mb-8">
          <div className="flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 py-2 px-4 focus:outline-none"
            />
            <button 
              type="submit"
              className="bg-klassico-navy text-white py-2 px-4"
            >
              <Search size={18} />
            </button>
          </div>
        </form>
        
        <nav className="flex flex-col items-center space-y-6 text-xl">
          <Link 
            to="/" 
            className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          {categories.map(category => (
            <Link 
              key={category.id}
              to={`/${category.slug}`} 
              className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          
          <Link 
            to="/about" 
            className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          
          <Link 
            to="/cart" 
            className="text-klassico-dark font-medium hover:text-klassico-navy transition-colors duration-300"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cart ({getCartCount()})
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
