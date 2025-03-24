
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

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-klassico-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10 pb-12 mb-12">
          <div className="flex items-center justify-center md:justify-start gap-4 reveal">
            <div className="bg-white/10 p-3 rounded-full">
              <Truck size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Free Shipping</h4>
              <p className="text-gray-400 text-sm">On orders above ₹999</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-4 reveal">
            <div className="bg-white/10 p-3 rounded-full">
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Secure Payments</h4>
              <p className="text-gray-400 text-sm">Protected transactions</p>
            </div>
          </div>
          
          <div className="flex items-center justify-center md:justify-start gap-4 reveal">
            <div className="bg-white/10 p-3 rounded-full">
              <CreditCard size={24} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Easy Returns</h4>
              <p className="text-gray-400 text-sm">30 day return policy</p>
            </div>
          </div>
        </div>
        
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Company Info */}
          <div className="reveal">
            <h3 className="text-xl font-bold mb-6">Klassico</h3>
            <p className="text-gray-400 mb-6">
              Redefining fashion with premium quality apparel that combines traditional craftsmanship with contemporary design.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white hover:text-klassico-gold transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-klassico-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-klassico-gold transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-white hover:text-klassico-gold transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="reveal">
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white transition-colors duration-300">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div className="reveal">
            <h3 className="text-lg font-semibold mb-6">Collections</h3>
            <ul className="space-y-3">
              <li>
                <a href="/jeans" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Premium Jeans
                </a>
              </li>
              <li>
                <a href="/blazers" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Designer Blazers
                </a>
              </li>
              <li>
                <a href="/kurtis" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Elegant Kurtis
                </a>
              </li>
              <li>
                <a href="/new-arrivals" className="text-gray-400 hover:text-white transition-colors duration-300">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="/sale" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Sale
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="reveal">
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-gray-400 shrink-0 mt-1" />
                <span className="text-gray-400">
                  123 Fashion Street, Mumbai, Maharashtra 400001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-gray-400" />
                <a href="tel:+919876543210" className="text-gray-400 hover:text-white transition-colors duration-300">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400" />
                <a href="mailto:info@klassico.com" className="text-gray-400 hover:text-white transition-colors duration-300">
                  info@klassico.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            © {currentYear} Klassico Jeans. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196566.png" 
              alt="Visa" 
              className="h-8 w-auto opacity-50"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196586.png" 
              alt="MasterCard" 
              className="h-8 w-auto opacity-50"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196559.png" 
              alt="PayPal" 
              className="h-8 w-auto opacity-50"
            />
            <img 
              src="https://cdn-icons-png.flaticon.com/512/196/196581.png" 
              alt="American Express" 
              className="h-8 w-auto opacity-50"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
