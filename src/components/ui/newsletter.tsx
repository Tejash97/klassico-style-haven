
import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Subscribed email:', email);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-medium mb-6">
            Subscribe to our newsletter
          </h2>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Stay updated with the latest trends, new arrivals, and exclusive offers. 
            Be the first to know about our seasonal sales and limited-edition collaborations.
          </p>
          
          <form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <div className="flex-1 relative">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || isSubmitted}
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-all duration-300"
                aria-label="Email address"
              />
              {error && (
                <p className="absolute text-red-600 text-sm mt-1">{error}</p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={`px-6 py-3 font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                isSubmitted 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isSubmitted ? (
                <>
                  <Check size={18} />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
