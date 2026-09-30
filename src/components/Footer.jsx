import React from 'react';
import { MessageCircle, ShieldCheck, Truck, Sparkles, MapPin, Clock, ArrowUpRight, Phone, Heart } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/products';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;

  return (
    <footer id="footer" className="bg-charcoal-800 text-sand-200 pt-24 pb-12 border-t border-charcoal-700/60 relative overflow-hidden">
      
      {/* Background soft ambient accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-coquette-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Monumental Watermark Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none select-none overflow-hidden w-full text-center">
        <span className="text-[16vw] font-serif font-black tracking-widest text-sand-50/[0.02] leading-none block">
          BEAUTÉ
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Value Proposition Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16 border-b border-charcoal-700/80">
          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-700/60 border border-charcoal-600/50 flex items-center justify-center text-terracotta-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-sand-50 font-medium">100% Autenticidad Certificada</h4>
              <p className="text-xs text-sand-300/70 mt-1 leading-relaxed">
                Productos sellados de fábrica con número de lote verificable directamente ante Natura y Avon.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-700/60 border border-charcoal-600/50 flex items-center justify-center text-coquette-400 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-sand-50 font-medium">Envíos Rápidos &amp; Mimados</h4>
              <p className="text-xs text-sand-300/70 mt-1 leading-relaxed">
                Empaque especial de alta protección térmica con toques de seda para que recibir tu pedido sea un encanto.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-charcoal-700/60 border border-charcoal-600/50 flex items-center justify-center text-gold-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-sand-50 font-medium">Asesoría de Piel Gratuita</h4>
              <p className="text-xs text-sand-300/70 mt-1 leading-relaxed">
                Recomendaciones personalizadas según tu tipo de piel, biotipo y notas olfativas favoritas.
              </p>
            </div>
          </div>
        </div>

        {/* Main Footer Links & WhatsApp Action */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Brand Presentation (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-1">
              <p className="font-script text-3xl text-coquette-300 -mb-1">Told you, your skintuition was right...</p>
              <span className="text-2xl md:text-3xl font-serif font-medium tracking-[0.16em] text-sand-50 block">
                NATURA &amp; AVON
              </span>
              <span className="text-[10px] uppercase tracking-widest text-terracotta-400 block font-light">
                Distribución Oficial &bull; L'Atelier Coquette
              </span>
            </div>

            <p className="text-sm text-sand-300/80 leading-relaxed max-w-sm">
              Conectamos la bio-esencia de la selva brasileña y la ciencia molecular más premiada con tu rutina diaria. Una experiencia femenina, chic y transformadora.
            </p>

            {/* Direct WhatsApp Action Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-to-r from-terracotta-500 to-coquette-500 hover:from-terracotta-600 hover:to-coquette-600 text-sand-50 text-xs uppercase tracking-editorial font-semibold shadow-coquette-glow transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar en WhatsApp (wa.me)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-widest text-sand-50 font-semibold">Explorar</p>
            <ul className="space-y-2.5 text-xs text-sand-300/80">
              <li>
                <a href="#curated-collection" className="hover:text-coquette-400 transition-colors">
                  Nuestra Filosofía
                </a>
              </li>
              <li>
                <a href="#natura-block" className="hover:text-terracotta-400 transition-colors">
                  Natura Ekos &amp; Chronos
                </a>
              </li>
              <li>
                <a href="#avon-block" className="hover:text-coquette-400 transition-colors">
                  Avon Anew &amp; Far Away
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-coquette-400 transition-colors">
                  Galería Coquette
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                  Catálogo Digital 2026
                </a>
              </li>
            </ul>
          </div>

          {/* Lines & Categories (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs uppercase tracking-widest text-sand-50 font-semibold">Líneas Clave</p>
            <ul className="space-y-2.5 text-xs text-sand-300/80">
              <li>Gotero Protinol™ Anew</li>
              <li>Pulpa de Castanha Nude</li>
              <li>Perfumería Far Away Moon</li>
              <li>Labiales Hydramatic Matte</li>
              <li>Biorretinol Chronos</li>
              <li>Lip Glaze Skintuition</li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <p className="text-xs uppercase tracking-widest text-sand-50 font-semibold">Contacto Directo</p>
            <div className="space-y-3 text-xs text-sand-300/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-coquette-400 shrink-0 mt-0.5" />
                <span>Envíos prioritarios y directos a todo el país.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-coquette-400 shrink-0 mt-0.5" />
                <span>Asesoría online: Lun - Sáb, 8:00 AM - 7:00 PM</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-coquette-400 shrink-0 mt-0.5" />
                <span>Atención WhatsApp: +57 (300) 123-4567</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-10 border-t border-charcoal-700/80 flex flex-col md:flex-row items-center justify-between text-[11px] text-sand-300/60 gap-4">
          <p>
            &copy; {CURRENT_YEAR} Natura &amp; Avon Distribución. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-sand-200 transition-colors">Aviso de Privacidad</span>
            <span className="hover:text-sand-200 transition-colors">Términos de Despacho</span>
            <span className="text-coquette-400 font-script text-base flex items-center gap-1">
              <span>Pureza &amp; Coquette Glam</span>
              <Heart className="w-3 h-3 fill-coquette-400" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
