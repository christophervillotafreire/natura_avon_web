import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Star, MessageCircle, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA, WHATSAPP_CONFIG } from '../data/products';

export default function ProductGallery({
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds = [],
  activeCategoryFilter = 'Todos',
  setActiveCategoryFilter
}) {
  const [selectedBrand, setSelectedBrand] = useState(activeCategoryFilter || 'Todos');

  const currentFilter = activeCategoryFilter !== undefined ? activeCategoryFilter : selectedBrand;
  const setFilter = setActiveCategoryFilter || setSelectedBrand;

  const categories = ['Todos', 'Natura', 'Avon', 'Tratamiento Facial', 'Maquillaje & Glow', 'Perfumería Fina'];

  const filteredProducts = PRODUCTS_DATA.filter((product) => {
    if (currentFilter === 'Todos') return true;
    if (currentFilter === 'Natura') {
      return product.brand.includes('Natura');
    }
    if (currentFilter === 'Avon') {
      return product.brand.includes('Avon');
    }
    return product.category === currentFilter;
  });

  return (
    <section id="gallery" className="py-24 md:py-36 bg-transparent relative overflow-hidden">
      
      {/* Background soft ambient accents */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-coquette-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sand-200/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-coquette text-[11px] uppercase tracking-widest text-charcoal-800 font-semibold">
              <span className="text-coquette-500">✦</span>
              <span>Galería Exclusiva &bull; Selección Coquette &amp; Nude</span>
            </div>

            <p className="font-script text-3xl sm:text-4xl text-coquette-600 leading-none">
              Tus nuevos esenciales de tocador
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 tracking-tight leading-tight">
              Joyas de belleza que despiertan suspiros.
            </h2>
            <p className="text-sm sm:text-base text-charcoal-700/80 leading-relaxed">
              Fórmulas premiadas internacionalmente, gotas preciosas y elixires para mimarte como mereces.
            </p>
          </div>

          {/* Minimalist Chic Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                  currentFilter === cat
                    ? 'bg-gradient-to-r from-terracotta-500 to-coquette-500 text-sand-50 shadow-coquette-glow'
                    : 'bg-sand-200/80 hover:bg-coquette-100 text-charcoal-800 border border-sand-300/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Minimalist Grid: 3 columns (grid-cols-1 md:grid-cols-3 gap-8) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const productWhatsappMsg = WHATSAPP_CONFIG.getProductMessage(product.name, product.brand);
            const directWhatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(productWhatsappMsg)}`;

            return (
              <article
                key={product.id}
                className="group relative flex flex-col justify-between bg-sand-100 rounded-3xl overflow-hidden border border-sand-300/80 hover:border-coquette-300 shadow-sm hover:shadow-coquette-glow transition-all duration-500"
              >
                {/* Image Container with Zoom & Hover CTA */}
                <div 
                  className="relative aspect-[4/5] bg-sand-200 overflow-hidden cursor-pointer"
                  onClick={() => onQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Brand & Coquette Tag Badge */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
                    <span className={`text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${product.badgeColor}`}>
                      {product.brand}
                    </span>
                    {product.coquetteNote && (
                      <span className="font-script text-sm px-2.5 py-0.5 rounded-full glass-card text-charcoal-800 shadow-xs border border-sand-50/60 hidden sm:inline-block">
                        {product.coquetteNote}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product);
                    }}
                    aria-label="Guardar en favoritos"
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-full glass-card hover:bg-coquette-100 text-charcoal-700 hover:text-coquette-500 transition-colors shadow-sm"
                  >
                    <Heart className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isWishlisted ? 'fill-coquette-500 text-coquette-500' : ''}`} />
                  </button>

                  {/* HOVER ACTION OVERLAY: Ocultar el botón de compra hasta hacer hover */}
                  <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-2 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {/* Primary Buy CTA */}
                    <a
                      href={directWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-terracotta-500 to-coquette-500 hover:from-terracotta-600 hover:to-coquette-600 text-sand-50 text-xs uppercase tracking-editorial font-semibold shadow-lg transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Pedir por WhatsApp</span>
                    </a>

                    {/* Quick View Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(product);
                      }}
                      aria-label="Vista Rápida"
                      className="p-3 rounded-2xl glass-card hover:bg-sand-50 text-charcoal-900 transition-colors shadow-lg"
                      title="Vista Rápida"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Product Metadata Details */}
                <div className="p-6 md:p-7 flex flex-col justify-between flex-grow space-y-4 text-left">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-charcoal-800/60 font-medium">
                      <span>{product.category}</span>
                      <span>{product.volume}</span>
                    </div>

                    <h3 
                      onClick={() => onQuickView(product)}
                      className="font-serif text-xl font-medium text-charcoal-900 group-hover:text-coquette-600 transition-colors cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-charcoal-700/80 line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>
                  </div>

                  {/* Price and Rating Row */}
                  <div className="pt-3 border-t border-sand-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-charcoal-800/60 block">Precio Exclusivo</span>
                      <span className="font-serif text-lg md:text-xl font-semibold text-charcoal-900">
                        {product.formattedPrice}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-charcoal-800 font-medium">
                      <Star className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                      <span>{product.rating}</span>
                      <span className="text-charcoal-800/50">({product.reviews})</span>
                    </div>
                  </div>

                  {/* Add to Selection Button - strictly revealed on hover */}
                  <div className="pt-1 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2.5 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold text-charcoal-800 bg-sand-200/90 hover:bg-coquette-500 hover:text-sand-50 transition-colors flex items-center justify-center gap-2 shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Añadir a mi Selección</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Coquette Callout Box */}
        <div className="mt-20 p-8 md:p-12 rounded-3xl glass-coquette border border-coquette-200 text-center max-w-4xl mx-auto space-y-4 shadow-sm">
          <p className="font-script text-3xl md:text-4xl text-coquette-600">
            ¿Deseas una fragancia o tono específico fuera del catálogo visible?
          </p>
          <p className="font-serif text-lg md:text-xl text-charcoal-900">
            Contamos con acceso inmediato a los ciclos actuales de Natura y Avon con promociones exclusivas.
          </p>
          <div className="pt-2">
            <a
              href={`https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent("¡Hola! Busco una referencia específica de Natura / Avon que no encontré en la galería. ¿Podrían verificar disponibilidad?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-editorial font-bold text-coquette-600 hover:text-coquette-700 underline underline-offset-4"
            >
              <span>Consultar referencia personalizada por WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
