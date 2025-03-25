
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetail";
import AboutPage from "./pages/About";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import { CartProvider } from "./contexts/CartContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            
            {/* Category Pages */}
            <Route path="/jeans" element={<ProductsPage categorySlug="jeans" />} />
            <Route path="/blazers" element={<ProductsPage categorySlug="blazers" />} />
            <Route path="/kurtis" element={<ProductsPage categorySlug="kurtis" />} />
            
            {/* Gender Specific Pages */}
            <Route path="/men" element={<ProductsPage gender="male" />} />
            <Route path="/women" element={<ProductsPage gender="female" />} />
            
            {/* Subcategory Pages */}
            <Route path="/jeans/men" element={<ProductsPage categorySlug="jeans" gender="male" />} />
            <Route path="/jeans/women" element={<ProductsPage categorySlug="jeans" gender="female" />} />
            <Route path="/blazers/men" element={<ProductsPage categorySlug="blazers" gender="male" />} />
            <Route path="/blazers/women" element={<ProductsPage categorySlug="blazers" gender="female" />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
