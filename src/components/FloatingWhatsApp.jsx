import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/products';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;

  return (
    <aside aria-label="Contacto directo por WhatsApp" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar a una asesora por WhatsApp"
        className="group flex items-center gap-2.5 p-3.5 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-terracotta-500 via-rosewood-500 to-coquette-500 text-sand-50 shadow-coquette-glow hover:shadow-luxury-hover border border-sand-50/30 transition-all duration-300 transform hover:-translate-y-1"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="hidden sm:inline text-xs uppercase tracking-editorial font-semibold">
          Asesoría WhatsApp
        </span>
        <span className="hidden sm:inline text-xs text-coquette-200">✨</span>
      </a>
    </aside>
  );
}
