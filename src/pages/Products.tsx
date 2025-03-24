
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import ProductCard from '@/components/ui/product-card';
import GenderFilter from '@/components/ui/gender-filter';
import { getProducts, Product, getCategories, Category } from '@/services/supabase';
import { Loader2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductsPageProps {
  categorySlug?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ categorySlug }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('created_at:desc');
  const [filterNew, setFilterNew] = useState(false);
  const [filterSale, setFilterSale] = useState(false);
  const { addToCart } = useCart();

  const searchQuery = searchParams.get('search');
  const genderFilter = searchParams.get('gender');

  useEffect(() => {
    // Load categories
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    
    fetchCategories();
  }, []);

  useEffect(() => {
    // Set the selected category if we're on a category page
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
  }, [categorySlug]);

  // Load products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      
      const options: any = {
        sortBy
      };
      
      if (selectedCategory) {
        options.categorySlug = selectedCategory;
      }
      
      if (genderFilter) {
        options.gender = genderFilter;
      }
      
      if (filterNew) {
        options.isNew = true;
      }
      
      if (filterSale) {
        options.isSale = true;
      }
      
      const productsData = await getProducts(options);
      
      // Apply search filter if search query exists
      let filteredProducts = productsData;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredProducts = productsData.filter(
          product => 
            product.name.toLowerCase().includes(query) || 
            (product.description && product.description.toLowerCase().includes(query))
        );
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    };
    
    fetchProducts();
  }, [selectedCategory, sortBy, filterNew, filterSale, searchQuery, genderFilter]);

  // Handle adding to cart
  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : selectedCategory 
                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` 
                : 'All Products'}
          </h1>
          
          {/* Gender Filter */}
          <div className="mt-4 flex justify-center">
            <GenderFilter />
          </div>
        </div>
        
        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Categories filter */}
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">Categories</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setSelectedCategory(null)} 
                  className={`w-full text-left px-2 py-1 rounded ${!selectedCategory ? 'bg-klassico-navy text-white' : 'hover:bg-gray-100'}`}
                >
                  All Products
                </button>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    onClick={() => setSelectedCategory(category.slug)} 
                    className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category.slug ? 'bg-klassico-navy text-white' : 'hover:bg-gray-100'}`}
                  >
                    {category.name} 
                    {category.gender && category.gender !== 'unisex' && (
                      <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-200">
                        {category.gender === 'male' ? 'Men' : 'Women'}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Product filters */}
          <div className="p-4 border rounded-lg shadow-sm">
            <h3 className="font-semibold mb-3">Product Status</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filterNew} 
                  onChange={() => setFilterNew(!filterNew)} 
                  className="mr-2"
                />
                New Arrivals
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  checked={filterSale} 
                  onChange={() => setFilterSale(!filterSale)} 
                  className="mr-2"
                />
                On Sale
              </label>
            </div>
          </div>
          
          {/* Sort options */}
          <div className="p-4 border rounded-lg shadow-sm md:col-span-2">
            <h3 className="font-semibold mb-3">Sort By</h3>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="created_at:desc">Newest First</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="name:asc">Name: A to Z</option>
              <option value="name:desc">Name: Z to A</option>
            </select>
          </div>
        </div>
        
        {/* Products grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-klassico-navy" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageSrc={product.image_url}
                hoverImageSrc={product.hover_image_url || undefined}
                category={product.category?.name || ''}
                gender={product.gender || undefined}
                isNew={product.is_new || false}
                isSale={product.is_sale || false}
                discount={product.discount || 0}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No products found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
