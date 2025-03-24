
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import Newsletter from '@/components/ui/newsletter';
import HeroBanner from '@/components/ui/hero-banner';
import FeaturedCategories from '@/components/ui/featured-categories';
import { getCategories, getProducts, Category, Product } from '@/services/supabase';
import ProductCard from '@/components/ui/product-card';

const Index = () => {
  const [featuredCategories, setFeaturedCategories] = useState<Category[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      // Fetch featured categories
      const categoriesData = await getCategories({ featured: true });
      setFeaturedCategories(categoriesData);
      
      // Fetch new arrivals
      const newArrivalsData = await getProducts({ isNew: true, limit: 4 });
      setNewArrivals(newArrivalsData);
      
      // Fetch trending products
      const trendingData = await getProducts({ 
        isSale: true, 
        limit: 4, 
        sortBy: 'created_at:desc' 
      });
      setTrendingProducts(trendingData);
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16 md:pt-24">
        <HeroBanner 
          title="New Season Collection"
          subtitle="Discover timeless elegance with our latest arrivals"
          imageUrl="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          buttonText="Shop Now"
          buttonLink="/products"
          alignment="center"
        />
        
        {featuredCategories.length > 0 && (
          <FeaturedCategories categories={featuredCategories} />
        )}
        
        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-medium text-center mb-8">New Arrivals</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <a 
                  href="/products?isNew=true" 
                  className="inline-block px-6 py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition-colors"
                >
                  View All New Arrivals
                </a>
              </div>
            </div>
          </section>
        )}
        
        {/* Mid Banner */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-[4/3] md:aspect-auto">
                <img 
                  src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80" 
                  alt="Men's Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-medium text-white mb-4">Men's Collection</h3>
                    <a 
                      href="/products?gender=male" 
                      className="inline-block px-6 py-2 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="relative aspect-[4/3] md:aspect-auto">
                <img 
                  src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1586&q=80" 
                  alt="Women's Collection"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-medium text-white mb-4">Women's Collection</h3>
                    <a 
                      href="/products?gender=female" 
                      className="inline-block px-6 py-2 bg-white text-black font-medium hover:bg-gray-100 transition-colors"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Trending Products */}
        {trendingProducts.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-medium text-center mb-8">Trending Now</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {trendingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="text-center mt-10">
                <a 
                  href="/products?isSale=true" 
                  className="inline-block px-6 py-3 border border-black text-black font-medium hover:bg-black hover:text-white transition-colors"
                >
                  View All Trending Products
                </a>
              </div>
            </div>
          </section>
        )}
        
        <Newsletter />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
