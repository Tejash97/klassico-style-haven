
import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { getCategories, Category } from '@/services/supabase';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [showMenDropdown, setShowMenDropdown] = useState(false);
  const [showWomenDropdown, setShowWomenDropdown] = useState(false);
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

  // Filter categories by gender
  const menCategories = categories.filter(cat => cat.gender === 'male' || cat.gender === 'unisex');
  const womenCategories = categories.filter(cat => cat.gender === 'female' || cat.gender === 'unisex');

  // Main category pages
  const mainCategories = [
    { name: 'Jeans', slug: 'jeans' },
    { name: 'Blazers', slug: 'blazers' },
    { name: 'Kurtis', slug: 'kurtis' }
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white py-2 shadow-md" : "bg-white py-4"
    )}>
      <div className="container mx-auto px-4">
        {/* Top navigation bar */}
        <div className="border-b border-gray-200 pb-2 hidden md:flex justify-between text-xs">
          <div className="flex space-x-4">
            <a href="/store-locator" className="text-gray-600 hover:text-black">Store Locator</a>
            <a href="/gift-cards" className="text-gray-600 hover:text-black">Gift Cards</a>
          </div>
          <div className="flex space-x-4">
            <a href="/login" className="text-gray-600 hover:text-black flex items-center">
              <User size={14} className="mr-1" /> Login
            </a>
            <a href="/wishlist" className="text-gray-600 hover:text-black">Wishlist</a>
          </div>
        </div>

        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link 
            to="/" 
            className="relative z-50 text-2xl font-bold text-black transition-opacity duration-300 hover:opacity-80"
          >
            Klassico
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Men's section */}
            <div 
              className="relative"
              onMouseEnter={() => setShowMenDropdown(true)}
              onMouseLeave={() => setShowMenDropdown(false)}
            >
              <Link 
                to="/men" 
                className="text-black font-medium hover:text-gray-800 transition-colors duration-300 flex items-center"
              >
                Men <ChevronDown size={16} className="ml-1" />
              </Link>
              
              {showMenDropdown && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-b-md p-4 min-w-[200px] grid grid-cols-2 gap-4 z-50">
                  {menCategories.map(category => (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}?gender=male`} 
                      className="text-gray-800 hover:text-black transition-colors duration-300 whitespace-nowrap"
                    >
                      {category.name}
                    </Link>
                  ))}
                  {mainCategories.map(category => (
                    <Link 
                      key={category.slug}
                      to={`/${category.slug}?gender=male`} 
                      className="text-gray-800 hover:text-black transition-colors duration-300 whitespace-nowrap font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Women's section */}
            <div 
              className="relative"
              onMouseEnter={() => setShowWomenDropdown(true)}
              onMouseLeave={() => setShowWomenDropdown(false)}
            >
              <Link 
                to="/women" 
                className="text-black font-medium hover:text-gray-800 transition-colors duration-300 flex items-center"
              >
                Women <ChevronDown size={16} className="ml-1" />
              </Link>
              
              {showWomenDropdown && (
                <div className="absolute left-0 top-full bg-white shadow-lg rounded-b-md p-4 min-w-[200px] grid grid-cols-2 gap-4 z-50">
                  {womenCategories.map(category => (
                    <Link 
                      key={category.id}
                      to={`/${category.slug}?gender=female`} 
                      className="text-gray-800 hover:text-black transition-colors duration-300 whitespace-nowrap"
                    >
                      {category.name}
                    </Link>
                  ))}
                  {mainCategories.map(category => (
                    <Link 
                      key={category.slug}
                      to={`/${category.slug}?gender=female`} 
                      className="text-gray-800 hover:text-black transition-colors duration-300 whitespace-nowrap font-medium"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Main Category Links */}
            {mainCategories.map(category => (
              <Link 
                key={category.slug}
                to={`/${category.slug}`} 
                className="text-black font-medium hover:text-gray-800 transition-colors duration-300"
              >
                {category.name}
              </Link>
            ))}
            
            <Link to="/products" className="text-black font-medium hover:text-gray-800 transition-colors duration-300">
              All Products
            </Link>
            
            <Link to="/about" className="text-black font-medium hover:text-gray-800 transition-colors duration-300">
              About
            </Link>
          </nav>
          
          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden md:flex items-center border rounded-md overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1 px-3 focus:outline-none text-sm"
              />
              <button 
                type="submit"
                className="bg-gray-100 text-black py-1 px-3 hover:bg-gray-200 transition-colors"
              >
                <Search size={16} />
              </button>
            </form>
            
            <Link 
              to="/cart" 
              className="relative text-black p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>
            
            {/* Mobile menu toggle */}
            <button 
              className="md:hidden relative z-50 text-black p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
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
              className="bg-gray-100 text-black py-2 px-4 hover:bg-gray-200"
            >
              <Search size={18} />
            </button>
          </div>
        </form>
        
        <nav className="flex flex-col items-center space-y-6 text-xl w-full">
          <Link 
            to="/men" 
            className="text-black font-medium hover:text-gray-600 transition-colors duration-300 w-full border-b border-gray-100 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Men
          </Link>

          <Link 
            to="/women" 
            className="text-black font-medium hover:text-gray-600 transition-colors duration-300 w-full border-b border-gray-100 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Women
          </Link>
          
          {/* Main Categories in Mobile Menu */}
          {mainCategories.map(category => (
            <Link 
              key={category.slug}
              to={`/${category.slug}`} 
              className="text-black font-medium hover:text-gray-600 transition-colors duration-300 w-full border-b border-gray-100 pb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {category.name}
            </Link>
          ))}
          
          <Link 
            to="/products" 
            className="text-black font-medium hover:text-gray-600 transition-colors duration-300 w-full border-b border-gray-100 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            All Products
          </Link>
          
          <Link 
            to="/about" 
            className="text-black font-medium hover:text-gray-600 transition-colors duration-300 w-full border-b border-gray-100 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          
          <Link 
            to="/cart" 
            className="text-black font-medium hover:text-gray-600 transition-colors duration-300 w-full border-b border-gray-100 pb-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cart ({getCartCount()})
          </Link>

          <div className="flex flex-col space-y-4 mt-6 w-full">
            <Link 
              to="/login" 
              className="text-sm text-gray-600 hover:text-black transition-colors duration-300 flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={14} className="mr-1" /> Login / Register
            </Link>
            <Link 
              to="/wishlist" 
              className="text-sm text-gray-600 hover:text-black transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
            <Link 
              to="/store-locator" 
              className="text-sm text-gray-600 hover:text-black transition-colors duration-300"
              onClick={() => setMobileMenuOpen(false)}
            >
              Store Locator
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
