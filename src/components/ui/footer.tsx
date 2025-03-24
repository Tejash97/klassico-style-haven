
import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  MapPin, 
  Mail, 
  Phone, 
  CreditCard, 
  Shield, 
  Truck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white text-black pt-12 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Newsletter */}
        <div className="border-b border-gray-200 pb-12 mb-12">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-medium mb-4">Sign up for our newsletter</h3>
            <p className="text-gray-600 mb-6">
              Stay updated with the latest trends, new arrivals, and exclusive offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-black"
              />
              <button 
                type="submit"
                className="px-6 py-3 bg-black text-white font-medium hover:bg-gray-900 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-200">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-medium mb-6">About Klassico</h4>
            <p className="text-gray-600 mb-6">
              Premium fashion destination offering curated collections of international and domestic brands for the fashion-conscious shopper.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-600 hover:text-black transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-black transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-black transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-600 hover:text-black transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-black transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-black transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-black transition-colors duration-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-black transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-black transition-colors duration-300">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Shop */}
          <div>
            <h4 className="text-lg font-medium mb-6">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products?gender=male" className="text-gray-600 hover:text-black transition-colors duration-300">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/products?gender=female" className="text-gray-600 hover:text-black transition-colors duration-300">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/jeans" className="text-gray-600 hover:text-black transition-colors duration-300">
                  Jeans
                </Link>
              </li>
              <li>
                <Link to="/blazers" className="text-gray-600 hover:text-black transition-colors duration-300">
                  Blazers
                </Link>
              </li>
              <li>
                <Link to="/kurtis" className="text-gray-600 hover:text-black transition-colors duration-300">
                  Kurtis
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-600 shrink-0 mt-1" />
                <span className="text-gray-600">
                  123 Fashion Street, Mumbai, Maharashtra 400001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-gray-600" />
                <a href="tel:+919876543210" className="text-gray-600 hover:text-black transition-colors duration-300">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-gray-600" />
                <a href="mailto:info@klassico.com" className="text-gray-600 hover:text-black transition-colors duration-300">
                  info@klassico.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row md:justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © {currentYear} Klassico. All rights reserved.
          </p>
          <div className="flex gap-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196566.png" 
              alt="Visa" 
              className="h-8 w-auto opacity-70"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196586.png" 
              alt="MasterCard" 
              className="h-8 w-auto opacity-70"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196559.png" 
              alt="PayPal" 
              className="h-8 w-auto opacity-70"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196581.png" 
              alt="American Express" 
              className="h-8 w-auto opacity-70"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
