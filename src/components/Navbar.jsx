import React, { useState, useEffect } from 'react';
import { ShoppingBag, MessageCircle, Menu, X, Heart } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/products';

export default function Navbar({ cartCount = 0, onOpenCart, onOpenWishlist, wishlistCount = 0 }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-coquette shadow-glass py-3.5 border-b border-coquette-200/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Navigation Left (Desktop) */}
        <nav className="hidden lg:flex items-center space-x-8 text-[13px] tracking-editorial uppercase font-medium text-charcoal-800/80">
          <a
            href="#curated-collection"
            className="hover:text-coquette-600 transition-colors duration-200"
          >
            Filosofía
          </a>
          <a
            href="#natura-block"
            className="hover:text-terracotta-500 transition-colors duration-200"
          >
            Natura Bio
          </a>
          <a
            href="#avon-block"
            className="hover:text-coquette-600 transition-colors duration-200"
          >
            Avon Protinol
          </a>
        </nav>

        {/* Centered Typographic Logo */}
        <div className="flex flex-col items-center text-center cursor-pointer group">
          <a href="#" className="flex flex-col items-center">
            <span className="text-xl md:text-2xl font-serif font-semibold tracking-[0.2em] text-charcoal-900 group-hover:text-coquette-600 transition-colors">
              NATURA &amp; AVON
            </span>
            <span className="text-[9px] uppercase tracking-widest-plus text-coquette-600/80 font-medium mt-0.5 flex items-center gap-1.5">
              <span>L'Atelier Coquette</span>
              <span className="text-coquette-400">♡</span>
              <span>Haute Cosmétique</span>
            </span>
          </a>
        </div>

        {/* Navigation Right (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          <a
            href="#gallery"
            className="text-[13px] tracking-editorial uppercase font-medium text-charcoal-800/80 hover:text-coquette-600 transition-colors duration-200"
          >
            Catálogo
          </a>
          <a
            href="#footer"
            className="text-[13px] tracking-editorial uppercase font-medium text-charcoal-800/80 hover:text-coquette-600 transition-colors duration-200"
          >
            Contacto
          </a>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="Ver lista de deseos"
            className="relative p-2 text-charcoal-800 hover:text-coquette-500 transition-colors"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-coquette-500 text-coquette-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-coquette-500 text-sand-50 rounded-full text-[10px] font-semibold flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir bolsa de compras"
            className="relative p-2 text-charcoal-800 hover:text-terracotta-500 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta-500 text-sand-50 rounded-full text-[10px] font-semibold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Direct WhatsApp Pill */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-terracotta-500 to-coquette-500 hover:opacity-95 text-sand-50 transition-all duration-300 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Asesoría</span>
          </a>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenCart}
            aria-label="Bolsa"
            className="relative p-2 text-charcoal-800"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-terracotta-500 text-sand-50 rounded-full text-[9px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menú principal"
            className="p-2 text-charcoal-800 focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-coquette border-b border-coquette-200/80 px-6 py-8 space-y-6 animate-fade-in">
          <nav className="flex flex-col space-y-5 text-center text-sm uppercase tracking-editorial font-semibold text-charcoal-800">
            <a
              href="#curated-collection"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-coquette-600 py-1"
            >
              Nuestra Esencia
            </a>
            <a
              href="#natura-block"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-terracotta-500 py-1"
            >
              Natura &bull; Bioactivos
            </a>
            <a
              href="#avon-block"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-coquette-600 py-1"
            >
              Avon &bull; Protinol™ Celular
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-coquette-600 py-1"
            >
              Galería Coquette
            </a>
            <a
              href="#footer"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-coquette-600 py-1"
            >
              Contacto &amp; Garantías
            </a>
          </nav>

          <div className="pt-4 border-t border-coquette-200 flex flex-col items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-gradient-to-r from-terracotta-500 to-coquette-500 text-sand-50 text-xs uppercase tracking-widest font-semibold shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chatear por WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
