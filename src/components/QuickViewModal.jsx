import React from 'react';
import { X, Star, CheckCircle, MessageCircle, ShoppingBag, Heart } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/products';

export default function QuickViewModal({ product, onClose, onAddToCart, onToggleWishlist, isWishlisted }) {
  if (!product) return null;

  const productWhatsappMsg = WHATSAPP_CONFIG.getProductMessage(product.name, product.brand);
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(productWhatsappMsg)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-charcoal-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-sand-50 rounded-3xl shadow-2xl border border-coquette-200 overflow-hidden text-charcoal-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-sand-100 hover:bg-coquette-100 text-charcoal-700 transition-colors border border-sand-300/80 shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left Product Image */}
          <div className="relative h-72 md:h-[490px] bg-sand-200 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 flex flex-col gap-1.5">
              <span className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${product.badgeColor}`}>
                {product.brand} &bull; {product.tag}
              </span>
              {product.coquetteNote && (
                <span className="font-script text-base px-3 py-0.5 rounded-full glass-card text-charcoal-800 shadow-xs">
                  {product.coquetteNote}
                </span>
              )}
            </div>
          </div>

          {/* Right Product Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-coquette-600 font-semibold">
                  {product.category} &bull; {product.volume}
                </span>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="p-1.5 text-charcoal-600 hover:text-coquette-500 transition-colors"
                  aria-label="Agregar a favoritos"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-coquette-500 text-coquette-500' : ''}`} />
                </button>
              </div>

              <h3 className="text-2xl font-serif font-medium text-charcoal-900 leading-snug">
                {product.name}
              </h3>

              {/* Price & Rating */}
              <div className="flex items-center justify-between pt-1 pb-3 border-b border-sand-200">
                <span className="text-2xl font-serif font-semibold text-terracotta-600">
                  {product.formattedPrice}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-charcoal-700 font-medium">
                  <div className="flex text-gold-500">
                    <Star className="w-3.5 h-3.5 fill-gold-500" />
                  </div>
                  <span>{product.rating} ({product.reviews} reseñas)</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-charcoal-700/85 leading-relaxed">
                {product.description}
              </p>

              {/* Benefits */}
              <div className="space-y-1.5 pt-2">
                <p className="text-[11px] uppercase tracking-widest font-semibold text-charcoal-900">
                  Beneficios Clave:
                </p>
                {product.benefits?.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-charcoal-700">
                    <CheckCircle className="w-3.5 h-3.5 text-coquette-500 shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-sand-200">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-gradient-to-r from-terracotta-500 to-coquette-500 hover:from-terracotta-600 hover:to-coquette-600 text-sand-50 text-xs uppercase tracking-editorial font-semibold shadow-coquette-glow transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Pedir o Consultar vía WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-sand-200/80 hover:bg-coquette-100 border border-sand-300 text-charcoal-900 text-xs uppercase tracking-editorial font-semibold transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-terracotta-600" />
                <span>Añadir a mi Selección</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
