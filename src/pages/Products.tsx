
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import GenderFilter from '@/components/ui/gender-filter';
import { getProducts, Product, getCategories, Category, getCategoryBySlug } from '@/services/supabase';
import ProductCard from '@/components/ui/product-card';

interface ProductsPageProps {
  categorySlug?: string;
  gender?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ categorySlug, gender: defaultGender }) => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const queryGender = searchParams.get('gender') || defaultGender || undefined;
  const isNew = searchParams.get('isNew') === 'true';
  const isSale = searchParams.get('isSale') === 'true';
  const search = searchParams.get('search') || undefined;
  
  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      if (categorySlug) {
        const categoryData = await getCategoryBySlug(categorySlug);
        setCategory(categoryData);
      }
      
      const options: any = {
        categorySlug,
        gender: queryGender,
        isNew: isNew || undefined,
        isSale: isSale || undefined,
      };
      
      const productsData = await getProducts(options);
      
      // Filter by search query if present
      const filteredProducts = search 
        ? productsData.filter(
            p => p.name.toLowerCase().includes(search.toLowerCase()) || 
            (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
          )
        : productsData;
      
      setProducts(filteredProducts);
      setLoading(false);
    };
    
    fetchData();
  }, [categorySlug, queryGender, isNew, isSale, search]);
  
  // Fetch categories for the sidebar
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
    };
    
    fetchCategories();
  }, []);
  
  // Generate page title
  const getPageTitle = () => {
    if (search) return `Search results for "${search}"`;
    if (isNew) return 'New Arrivals';
    if (isSale) return 'Sale Items';
    if (category) return category.name;
    if (queryGender === 'male') return "Men's Collection";
    if (queryGender === 'female') return "Women's Collection";
    if (queryGender === 'unisex') return "Unisex Collection";
    return 'All Products';
  };
  
  // Filter categories based on gender if provided
  const filteredCategories = queryGender 
    ? categories.filter(cat => cat.gender === queryGender || cat.gender === 'unisex')
    : categories;
  
  return (
    <div>
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-medium mb-8">{getPageTitle()}</h1>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="sticky top-24 space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Gender</h3>
                  <GenderFilter />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {filteredCategories.map(cat => (
                      <li key={cat.id}>
                        <a 
                          href={`/${cat.slug}${queryGender ? `?gender=${queryGender}` : ''}`}
                          className={`block py-2 border-b border-gray-100 hover:text-black transition-colors ${
                            categorySlug === cat.slug ? 'font-medium text-black' : 'text-gray-600'
                          }`}
                        >
                          {cat.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Filter By</h3>
                  <ul className="space-y-2">
                    <li>
                      <a 
                        href={`/products?isNew=true${queryGender ? `&gender=${queryGender}` : ''}`}
                        className={`block py-2 border-b border-gray-100 hover:text-black transition-colors ${
                          isNew ? 'font-medium text-black' : 'text-gray-600'
                        }`}
                      >
                        New Arrivals
                      </a>
                    </li>
                    <li>
                      <a 
                        href={`/products?isSale=true${queryGender ? `&gender=${queryGender}` : ''}`}
                        className={`block py-2 border-b border-gray-100 hover:text-black transition-colors ${
                          isSale ? 'font-medium text-black' : 'text-gray-600'
                        }`}
                      >
                        Sale Items
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or check back later for new arrivals.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
