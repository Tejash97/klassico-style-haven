
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Hero from '@/components/ui/hero';
import CategoryCard from '@/components/ui/category-card';
import ProductCard from '@/components/ui/product-card';
import Newsletter from '@/components/ui/newsletter';
import Footer from '@/components/ui/footer';
import { toast } from '@/components/ui/sonner';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

// Sample product data (would normally come from Supabase)
const trendingProducts = [
  {
    id: 'p1',
    name: 'Classic Blue Denim',
    price: 2499,
    imageSrc: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1026&q=80',
    hoverImageSrc: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80',
    category: 'Jeans',
    isNew: true
  },
  {
    id: 'p2',
    name: 'Slim Fit Navy Blazer',
    price: 4999,
    imageSrc: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Blazers'
  },
  {
    id: 'p3',
    name: 'Embroidered Silk Kurti',
    price: 1899,
    imageSrc: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1030&q=80',
    category: 'Kurtis'
  },
  {
    id: 'p4',
    name: 'Distressed Black Jeans',
    price: 2799,
    imageSrc: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Jeans',
    isSale: true,
    discount: 20
  },
  {
    id: 'p5',
    name: 'Checkered Linen Blazer',
    price: 5499,
    imageSrc: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80',
    category: 'Blazers',
    isNew: true
  },
  {
    id: 'p6',
    name: 'Floral Print Kurti',
    price: 1599,
    imageSrc: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    category: 'Kurtis',
    isSale: true,
    discount: 15
  }
];

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80',
    quote: "The quality of Klassico jeans is unmatched. I've been a loyal customer for years and have never been disappointed.",
    rating: 5
  },
  {
    id: 2,
    name: 'Arjun Patel',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
    quote: "Their blazers are perfect for both formal meetings and casual outings. The attention to detail is impressive.",
    rating: 5
  },
  {
    id: 3,
    name: 'Meera Desai',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80',
    quote: "I absolutely love my kurtis from Klassico. They blend traditional elements with modern designs beautifully.",
    rating: 4
  }
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Add to cart functionality
  const handleAddToCart = (productId: string) => {
    // Find the product by id
    const product = trendingProducts.find(p => p.id === productId);
    
    if (product) {
      // Show success toast
      toast.success(`${product.name} added to cart`);
      console.log('Added to cart:', product);
    }
  };
  
  // Reveal animation logic
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealElementOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', revealElementOnScroll);
    revealElementOnScroll(); // Call once to check elements in view on load
    
    return () => {
      window.removeEventListener('scroll', revealElementOnScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="text-sm text-klassico-navy font-semibold uppercase tracking-wider">Collections</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Explore Our Categories</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Browse through our curated collections of premium apparel designed to elevate your style.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategoryCard 
              title="Premium Jeans" 
              description="Discover comfort and style with our signature denim collection, crafted from the finest materials."
              imageSrc="https://images.unsplash.com/photo-1582418702059-97ebafb35d09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80"
              link="/jeans"
              delay={0}
            />
            
            <CategoryCard 
              title="Designer Blazers" 
              description="Elevate your formal attire with our meticulously crafted blazers, perfect for any occasion."
              imageSrc="https://images.unsplash.com/photo-1610652492500-ded49ceeb378?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80"
              link="/blazers"
              delay={1}
            />
            
            <CategoryCard 
              title="Elegant Kurtis" 
              description="Embrace cultural elegance with our modern kurti designs that blend tradition with contemporary styles."
              imageSrc="https://images.unsplash.com/photo-1614251055880-ee96e4803393?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80"
              link="/kurtis"
              delay={2}
            />
          </div>
        </div>
      </section>
      
      {/* Trending Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="text-sm text-klassico-navy font-semibold uppercase tracking-wider">What's Hot</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Trending Products</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Our most popular selections, loved by fashion enthusiasts around the country.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingProducts.map((product, index) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageSrc={product.imageSrc}
                hoverImageSrc={product.hoverImageSrc}
                category={product.category}
                isNew={product.isNew}
                isSale={product.isSale}
                discount={product.discount}
                delay={index % 3}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
          
          <div className="text-center mt-12 reveal">
            <a 
              href="/products" 
              className="inline-block px-6 py-3 bg-klassico-navy text-white rounded-md font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 reveal">
            <span className="text-sm text-klassico-navy font-semibold uppercase tracking-wider">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">What Our Customers Say</h2>
            <p className="max-w-2xl mx-auto text-gray-600">
              Don't take our word for it — hear from our satisfied customers about their Klassico experience.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto relative">
            {/* Testimonial slider */}
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out-expo" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                      <div className="w-20 h-20 mx-auto mb-6 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i}
                            size={18}
                            className={i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-lg italic text-gray-600 mb-6">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      <p className="font-semibold text-klassico-dark">{testimonial.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
              className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white text-klassico-dark p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
              className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white text-klassico-dark p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-klassico-navy w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <Newsletter />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
