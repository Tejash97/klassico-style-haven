
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Category types
export interface Category {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  slug: string;
  gender: string | null;
  featured_order: number | null;
}

// Product types
export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  image_url: string;
  hover_image_url: string | null;
  is_new: boolean | null;
  is_sale: boolean | null;
  discount: number | null;
  stock_quantity: number | null;
  slug: string;
  gender: string | null;
  category?: Category;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  image_url: string | null;
  quote: string;
  rating: number;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Fetch all categories
export async function getCategories(options: {
  gender?: string;
  featured?: boolean;
} = {}): Promise<Category[]> {
  try {
    let query = supabase
      .from('categories')
      .select('*');
    
    if (options.gender) {
      query = query.eq('gender', options.gender);
    }
    
    if (options.featured) {
      query = query.order('featured_order', { ascending: true });
    } else {
      query = query.order('name');
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    toast.error('Failed to load categories');
    return [];
  }
}

// Fetch category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching category ${slug}:`, error);
    return null;
  }
}

// Fetch all products with optional category join
export async function getProducts(options: {
  categoryId?: string;
  categorySlug?: string;
  gender?: string;
  limit?: number;
  isNew?: boolean;
  isSale?: boolean;
  sortBy?: string;
  featured?: boolean;
} = {}): Promise<Product[]> {
  try {
    let query = supabase
      .from('products')
      .select('*, categories(*)');
    
    if (options.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }
    
    if (options.categorySlug) {
      // First, get the category id from the slug
      const category = await getCategoryBySlug(options.categorySlug);
      if (category) {
        query = query.eq('category_id', category.id);
      }
    }
    
    if (options.gender) {
      query = query.eq('gender', options.gender);
    }
    
    if (options.isNew !== undefined) {
      query = query.eq('is_new', options.isNew);
    }
    
    if (options.isSale !== undefined) {
      query = query.eq('is_sale', options.isSale);
    }
    
    if (options.sortBy) {
      const [field, direction] = options.sortBy.split(':');
      query = query.order(field, { ascending: direction === 'asc' });
    } else {
      query = query.order('created_at', { ascending: false });
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    // Format the data to include the category
    return (data || []).map(item => {
      // Create a new object without the categories property
      const { categories, ...productData } = item;
      // Add the category property with the value from categories
      return {
        ...productData,
        category: categories
      };
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    toast.error('Failed to load products');
    return [];
  }
}

// Fetch product by slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(*)')
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    
    if (data) {
      // Create a new object without the categories property
      const { categories, ...productData } = data;
      // Return a new object with the category property
      return {
        ...productData,
        category: categories
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching product ${slug}:`, error);
    return null;
  }
}

// Fetch testimonials
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    toast.error('Failed to load testimonials');
    return [];
  }
}
