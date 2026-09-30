import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DomainWarpingBackground from './components/DomainWarpingBackground';
import CuratedCollection from './components/CuratedCollection';
import ProductGallery from './components/ProductGallery';
import Footer from './components/Footer';
import QuickViewModal from './components/QuickViewModal';
import CartDrawer from './components/CartDrawer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add to cart handler
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`✓ Añadido a tu selección: ${product.name}`);
  };

  // Remove from cart
  const handleRemoveItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Update item quantity
  const handleUpdateQuantity = (id, newQty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  // Toggle wishlist
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removido de favoritos`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`♥ Guardado en favoritos: ${product.name}`);
        return [...prev, product.id];
      }
    });
  };

  // Scroll to gallery with category pre-filtered
  const handleSelectCategoryFromHero = (brand) => {
    setCategoryFilter(brand);
    const element = document.getElementById('gallery');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-sand-100 text-charcoal-800 flex flex-col font-sans selection:bg-rosewood-200 selection:text-charcoal-900">
      
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setCategoryFilter('Todos');
          const element = document.getElementById('gallery');
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Editorial Content */}
      <main className="flex-grow">
        {/* Main Hero with Video Scrubbing */}
        <Hero onExploreClick={() => handleSelectCategoryFromHero('Todos')} />
        
        {/* Lower Sections Wrapped in Fluid Domain Warping Background */}
        <div className="relative">
          <DomainWarpingBackground />

          <div className="relative z-10 -mt-[100vh]">
            <CuratedCollection
              onSelectCategory={handleSelectCategoryFromHero}
            />

            <ProductGallery
              onQuickView={(product) => setQuickViewProduct(product)}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlist}
              activeCategoryFilter={categoryFilter}
              setActiveCategoryFilter={setCategoryFilter}
            />
          </div>
        </div>
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.includes(quickViewProduct.id) : false}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Persistent Floating WhatsApp Action */}
      <FloatingWhatsApp />

      {/* Toast Notification */}
      {toastMessage && (
        <aside
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-charcoal-900 text-sand-50 text-xs font-medium tracking-wide shadow-2xl border border-charcoal-700 animate-fade-in flex items-center gap-2"
        >
          <span>{toastMessage}</span>
        </aside>
      )}

    </div>
  );
}
