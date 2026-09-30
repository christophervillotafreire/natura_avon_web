import React from 'react';
import { X, Trash2, MessageCircle, ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/products';

export default function CartDrawer({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity }) {
  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(total);

  const generateCartWhatsappUrl = () => {
    if (cartItems.length === 0) {
      return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;
    }

    let itemsList = cartItems
      .map(
        (item) => `• ${item.quantity}x ${item.name} (${item.brand}) - ${item.formattedPrice}`
      )
      .join('\n');

    const message = `¡Hola! Deseo ordenar mi selección de belleza:\n\n${itemsList}\n\n*Total estimado: ${formattedTotal}*\n\n¿Me podrías confirmar disponibilidad y métodos de envío? ✨`;
    return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-charcoal-950/60 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-sand-100 shadow-2xl border-l border-coquette-200 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-sand-200/90 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-coquette-500" />
              <h3 className="font-serif text-xl font-medium text-charcoal-900">
                Tu Selección de Deseo
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-coquette-100 text-charcoal-700 transition-colors"
              aria-label="Cerrar bolsa"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-coquette-100 flex items-center justify-center mx-auto text-coquette-500">
                  <Heart className="w-7 h-7 fill-coquette-300" />
                </div>
                <p className="font-serif text-lg text-charcoal-900">Tu tocador está esperando</p>
                <p className="text-xs text-charcoal-700/70 max-w-xs mx-auto">
                  Agrega tus productos favoritos de Natura y Avon para pedir tu pedido personalizado directamente por WhatsApp.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-sand-50 rounded-2xl border border-sand-200/90 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-18 h-20 w-20 object-cover rounded-xl bg-sand-200 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-coquette-600">
                        {item.brand}
                      </span>
                      <h4 className="text-sm font-serif font-medium text-charcoal-900 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-charcoal-800 font-semibold mt-0.5">
                        {item.formattedPrice}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center border border-sand-300 rounded-lg bg-sand-100 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))}
                          className="px-2 py-0.5 hover:bg-coquette-100"
                        >
                          -
                        </button>
                        <span className="px-2 font-medium">{item.quantity || 1}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, (item.quantity || 1) + 1)}
                          className="px-2 py-0.5 hover:bg-coquette-100"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-charcoal-400 hover:text-coquette-500 transition-colors p-1"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout via WhatsApp */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-sand-300/80 bg-sand-50 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal-700/80">Subtotal estimado:</span>
                <span className="font-serif text-xl font-semibold text-charcoal-900">
                  {formattedTotal}
                </span>
              </div>
              <p className="text-[11px] text-charcoal-600 leading-tight">
                * Precios especiales y regalos por compra se confirman con tu asesora vía WhatsApp.
              </p>

              <a
                href={generateCartWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-gradient-to-r from-terracotta-500 to-coquette-500 hover:from-terracotta-600 hover:to-coquette-600 text-sand-50 text-xs uppercase tracking-editorial font-semibold shadow-coquette-glow transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Pedido por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
