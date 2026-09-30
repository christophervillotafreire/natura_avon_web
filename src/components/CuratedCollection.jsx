import React from 'react';
import { ArrowUpRight, Leaf, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { BRAND_STORY, WHATSAPP_CONFIG } from '../data/products';

export default function CuratedCollection({ onSelectCategory }) {
  const askNaturaMsg = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent("¡Hola! Me encantó la esencia botánica de Natura. ¿Podrías enviarme el catálogo vigente de Ekos y Chronos?")}`;
  const askAvonMsg = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent("¡Hola! Quiero conocer las novedades y promociones de Avon Anew Protinol y la colección de labiales y perfumes.")}`;

  return (
    <section id="curated-collection" className="py-24 md:py-36 bg-transparent relative overflow-hidden">
      
      {/* Subtle background ambient glow */}
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-coquette-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] bg-terracotta-200/20 rounded-full blur-3xl pointer-events-none" />

      {/* Editorial Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-24 md:mb-32 relative z-10">
        
        {/* Playful Coquette Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-coquette text-[11px] uppercase tracking-widest text-charcoal-800 font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 text-coquette-500 fill-coquette-500" />
          <span>Curaduría de Deseo &bull; Belleza Auténtica</span>
        </div>

        {/* Script Pretitle */}
        <p className="font-script text-3xl sm:text-4xl md:text-5xl text-coquette-600 block my-1">
          El deleite de consentirte todos los días
        </p>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-charcoal-900 tracking-tight max-w-3xl mx-auto leading-tight">
          Dos visiones icónicas para una belleza coqueta y consciente.
        </h2>
        
        <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-coquette-400 to-transparent mx-auto my-6" />
        
        <p className="text-base md:text-lg text-charcoal-700/80 max-w-2xl mx-auto leading-relaxed">
          Cada fórmula combina texturas sedosas que se funden como caricias con aromas inolvidables que despiertan tu magnetismo natural.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-28 md:space-y-40 relative z-10">
        
        {/* ======================================================== */}
        {/* BLOQUE 1: NATURA — LA ESENCIA BOTÁNICA DE LA SELVA VIVA  */}
        {/* ======================================================== */}
        <div id="natura-block" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Column (Left on Desktop) */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Monumental Watermark Text */}
              <div className="absolute -top-12 -left-6 z-0 text-7xl sm:text-8xl font-serif font-bold text-sand-300/40 select-none pointer-events-none">
                EKOS
              </div>

              {/* Offset Backdrop Framing */}
              <div className="absolute -bottom-4 -left-4 w-full h-full rounded-3xl bg-sand-200/90 -z-10 border border-sand-300/70 transform -rotate-1" />

              <div className="overflow-hidden rounded-3xl shadow-luxury bg-sand-200 border border-sand-300/50 group relative">
                <img
                  src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=1200&q=85"
                  alt="Natura cosmética y bioactivos amazónicos"
                  className="w-full h-[480px] sm:h-[540px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Coquette Floating Callout Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-card rounded-2xl border border-sand-50/30 text-sand-50">
                  <p className="font-script text-2xl text-terracotta-300 leading-none">Piel de seda</p>
                  <p className="font-serif text-sm sm:text-base text-sand-50 font-medium mt-0.5">
                    Óleo puro de Castanha &amp; Biorretinol de Jatobá
                  </p>
                </div>
              </div>

              {/* Accent Pill Capsule */}
              <div className="absolute -top-4 -right-3 sm:-right-6 glass-coquette py-2.5 px-4 rounded-full shadow-md border border-coquette-200 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-botanical-500" />
                <span className="text-xs font-serif font-semibold text-charcoal-900">
                  100% Vegano &bull; Selva Viva
                </span>
              </div>

            </div>
          </div>

          {/* Descriptive Column (Right on Desktop) */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2 text-left">
            <div className="inline-flex items-center gap-2 text-terracotta-600 text-xs uppercase tracking-widest font-bold">
              <span className="w-6 h-[1.5px] bg-terracotta-500" />
              <span>Natura Brasil &bull; Bio-Cosmética</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal-900 leading-tight">
              {BRAND_STORY.natura.title}
            </h3>

            <p className="font-script text-2xl sm:text-3xl text-terracotta-600">
              "{BRAND_STORY.natura.subtitle}"
            </p>

            <p className="text-charcoal-700/85 leading-relaxed text-sm sm:text-base">
              {BRAND_STORY.natura.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-b border-sand-300/80 py-5">
              {BRAND_STORY.natura.metrics.map((item, idx) => (
                <div key={idx} className="text-left">
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-terracotta-600">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-700/70 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Key Sensorial Highlights */}
            <ul className="space-y-2.5 text-sm text-charcoal-800/85">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>Texturas fundentes de absorción exprés que dejan la piel suave y besable.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>Perfumería con alcohol 100% orgánico y acordes envolventes cálidos.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-terracotta-500 shrink-0" />
                <span>Compromiso de repuestos eco-amigables para cuidar tu bolsillo y el planeta.</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={askNaturaMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-sand-50 text-xs uppercase tracking-editorial font-medium shadow-md transition-all duration-300"
              >
                <span>Pedir Catálogo Natura</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onSelectCategory && onSelectCategory('Natura Ekos')}
                className="text-xs uppercase tracking-editorial font-semibold text-charcoal-800 hover:text-terracotta-600 underline underline-offset-4 transition-colors"
              >
                Ver línea Natura en galería &darr;
              </button>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* BLOQUE 2: AVON — LA VANGUARDIA MOLECULAR & COQUETTE GLAM */}
        {/* ======================================================== */}
        <div id="avon-block" className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Descriptive Column (Left on Desktop) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 text-coquette-600 text-xs uppercase tracking-widest font-bold">
              <span className="w-6 h-[1.5px] bg-coquette-400" />
              <span>Avon Glamour &bull; Alta Ciencia Celular</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif font-medium text-charcoal-900 leading-tight">
              {BRAND_STORY.avon.title}
            </h3>

            <p className="font-script text-2xl sm:text-3xl text-coquette-600">
              "{BRAND_STORY.avon.quote}"
            </p>

            <p className="text-charcoal-700/85 leading-relaxed text-sm sm:text-base">
              {BRAND_STORY.avon.description}
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-b border-sand-300/80 py-5">
              {BRAND_STORY.avon.metrics.map((item, idx) => (
                <div key={idx} className="text-left">
                  <p className="text-xl sm:text-2xl font-serif font-semibold text-coquette-600">{item.value}</p>
                  <p className="text-[11px] uppercase tracking-wider text-charcoal-700/70 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <ul className="space-y-2.5 text-sm text-charcoal-800/85">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-coquette-500 shrink-0" />
                <span>Patente Protinol™: reactiva la matriz de colágeno infantil en solo 7 días.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-coquette-500 shrink-0" />
                <span>Labiales con núcleo de ácido hialurónico hidratante continuo.</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-coquette-500 shrink-0" />
                <span>Fragancias inolvidables de alta concentración creadas en París.</span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href={askAvonMsg}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-coquette-600 hover:bg-coquette-700 text-sand-50 text-xs uppercase tracking-editorial font-medium shadow-coquette-glow transition-all duration-300"
              >
                <span>Pedir Catálogo Avon</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onSelectCategory && onSelectCategory('Avon')}
                className="text-xs uppercase tracking-editorial font-semibold text-charcoal-800 hover:text-coquette-600 underline underline-offset-4 transition-colors"
              >
                Ver línea Avon en galería &darr;
              </button>
            </div>
          </div>

          {/* Visual Column (Right on Desktop) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Monumental Watermark Text */}
              <div className="absolute -top-12 -right-6 z-0 text-7xl sm:text-8xl font-serif font-bold text-coquette-200/40 select-none pointer-events-none">
                AVON
              </div>

              {/* Offset Backdrop Framing */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-3xl bg-coquette-100/70 -z-10 border border-coquette-200/80 transform rotate-1" />

              <div className="overflow-hidden rounded-3xl shadow-luxury bg-sand-200 border border-coquette-200/60 group relative">
                <img
                  src="/images/shh-pink.jpeg"
                  alt="Avon estética coquette y alta ciencia"
                  className="w-full h-[480px] sm:h-[540px] object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/75 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 p-4 glass-coquette rounded-2xl border border-sand-50/40 text-charcoal-900">
                  <p className="font-script text-2xl text-coquette-600 leading-none">Skintuition</p>
                  <p className="font-serif text-sm sm:text-base text-charcoal-900 font-semibold mt-0.5">
                    Anew Protinol &bull; Far Away Beyond The Moon
                  </p>
                </div>
              </div>

              {/* Accent Floating Badge */}
              <div className="absolute -bottom-4 -left-3 sm:-left-6 glass-coquette py-2.5 px-4 rounded-full shadow-md border border-coquette-200 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-coquette-500" />
                <span className="text-xs font-serif font-semibold text-charcoal-900">
                  Premios Edison™ Skincare
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
