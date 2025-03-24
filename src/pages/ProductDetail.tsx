
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/ui/navbar';
import Footer from '@/components/ui/footer';
import { getProductBySlug, getProducts, Product } from '@/services/supabase';
import { Loader2, Minus, Plus, ShoppingBag, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ui/product-card';
import { toast } from 'sonner';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      setLoading(true);
      const productData = await getProductBySlug(slug);
      setProduct(productData);
      
      if (productData?.category_id) {
        // Fetch related products from the same category
        const related = await getProducts({
          categoryId: productData.category_id,
          limit: 4
        });
        
        // Filter out the current product
        setRelatedProducts(related.filter(p => p.id !== productData.id));
      }
      
      setLoading(false);
    };
    
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const incrementQuantity = () => {
    const stockLimit = product?.stock_quantity || 10;
    if (quantity < stockLimit) {
      setQuantity(prev => prev + 1);
    } else {
      toast.info(`Sorry, only ${stockLimit} items available`);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success('Added to favorites');
    } else {
      toast.info('Removed from favorites');
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price: number, discount: number | null) => {
    if (!discount) return price;
    return price * (1 - discount / 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <Loader2 className="w-12 h-12 animate-spin text-klassico-navy" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link 
            to="/products" 
            className="inline-block px-6 py-3 bg-klassico-navy text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Browse Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8">
          <ol className="flex text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-klassico-navy">Home</Link>
              <span className="mx-2">/</span>
            </li>
            {product.category && (
              <li className="flex items-center">
                <Link 
                  to={`/${product.category.slug}`} 
                  className="text-gray-500 hover:text-klassico-navy"
                >
                  {product.category.name}
                </Link>
                <span className="mx-2">/</span>
              </li>
            )}
            <li className="text-klassico-navy font-medium">{product.name}</li>
          </ol>
        </nav>
        
        {/* Product details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product image */}
          <div className="relative">
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.is_new && (
                <span className="bg-klassico-navy text-white px-3 py-1 text-xs font-medium rounded-full">
                  New
                </span>
              )}
              {product.is_sale && product.discount && (
                <span className="bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                  {product.discount}% Off
                </span>
              )}
            </div>
          </div>
          
          {/* Product info */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {product.category && (
              <Link 
                to={`/${product.category.slug}`}
                className="text-sm text-gray-500 hover:text-klassico-navy mb-4 inline-block"
              >
                {product.category.name}
              </Link>
            )}
            
            <div className="flex items-center gap-2 mt-4 mb-6">
              {product.is_sale && product.discount ? (
                <>
                  <span className="text-2xl font-bold text-klassico-navy">
                    {formatPrice(calculateDiscountedPrice(product.price, product.discount))}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-red-500 font-medium ml-2">
                    {product.discount}% off
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-klassico-navy">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            
            {product.description && (
              <div className="mb-8">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}
            
            {/* Quantity selector */}
            <div className="mb-8">
              <h3 className="font-semibold mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 h-full text-center border-y border-gray-300 py-2"
                />
                <button
                  onClick={incrementQuantity}
                  className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            {/* Add to cart button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-klassico-navy text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              
              <button
                onClick={toggleFavorite}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 px-6 rounded-md border transition-colors",
                  isFavorite 
                    ? "border-red-500 text-red-500 bg-red-50" 
                    : "border-gray-300 hover:border-gray-400"
                )}
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? "Saved" : "Save"}
              </button>
            </div>
            
            {/* Availability */}
            <div className="mt-8">
              <p className="text-sm">
                <span className="font-medium">Availability:</span>{" "}
                {product.stock_quantity === 0 
                  ? <span className="text-red-500">Out of stock</span> 
                  : <span className="text-green-600">In stock</span>}
              </p>
            </div>
          </div>
        </div>
        
        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <ProductCard 
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  name={relatedProduct.name}
                  price={relatedProduct.price}
                  imageSrc={relatedProduct.image_url}
                  hoverImageSrc={relatedProduct.hover_image_url || undefined}
                  category={relatedProduct.category?.name || ''}
                  isNew={relatedProduct.is_new || false}
                  isSale={relatedProduct.is_sale || false}
                  discount={relatedProduct.discount || 0}
                  onAddToCart={() => addToCart(relatedProduct)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
