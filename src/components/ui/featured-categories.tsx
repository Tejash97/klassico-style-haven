
import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/services/supabase';

interface FeaturedCategoriesProps {
  categories: Category[];
}

const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ categories }) => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-medium text-center mb-12">Shop By Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/${category.slug}`} 
              className="group block relative overflow-hidden"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={category.image_url || 'https://via.placeholder.com/600x800'} 
                  alt={category.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="bg-white bg-opacity-90 p-4 transition-transform duration-300 transform group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-xl font-medium text-black">
                    {category.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {category.description || `Explore our ${category.name} collection`}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
