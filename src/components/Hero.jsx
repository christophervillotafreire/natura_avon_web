import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowUpRight, MessageCircle, Sparkles, Heart, ShieldCheck, ChevronDown } from 'lucide-react';
import { WHATSAPP_CONFIG } from '../data/products';

const TOTAL_FRAMES = 60;

// Format frame index as 3 digits: 001, 002, ..., 060
const getFramePath = (index) => {
  const pad = String(index + 1).padStart(3, '0');
  return `/frames/frame_${pad}.webp`;
};

export default function Hero({ onExploreClick }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const renderedFrameRef = useRef(-1);
  const animationFrameIdRef = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const whatsappUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;

  // Draw image to cover canvas while maintaining aspect ratio (center-crop cover)
  const drawFrame = useCallback((ctx, img, canvasWidth, canvasHeight) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasWidth / canvasHeight;
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasAspect > imgAspect) {
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgAspect;
      offsetX = 0;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Preload all 60 frames
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];
    let counter = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        if (!isMounted) return;
        counter++;
        setLoadedCount(counter);
        if (counter === 1) {
          // Immediately render first frame on canvas as soon as it arrives
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            drawFrame(ctx, img, canvas.width, canvas.height);
          }
        }
        if (counter >= Math.min(20, TOTAL_FRAMES)) {
          setIsLoading(false);
        }
      };
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [drawFrame]);

  // Handle canvas sizing for Retina / HiDPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);

      const currentImg = imagesRef.current[Math.round(currentFrameRef.current)];
      if (currentImg && currentImg.complete) {
        drawFrame(ctx, currentImg, width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Main animation render loop using requestAnimationFrame + smooth interpolation (lerp)
  useEffect(() => {
    const renderLoop = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = canvas.width / dpr;
        const height = canvas.height / dpr;
        const ctx = canvas.getContext('2d');

        // Smoothly interpolate towards targetFrameRef
        currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.22;
        const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(currentFrameRef.current)));

        if (frameIndex !== renderedFrameRef.current) {
          const img = imagesRef.current[frameIndex];
          if (img && img.complete) {
            drawFrame(ctx, img, width, height);
            renderedFrameRef.current = frameIndex;
            setActiveFrame(frameIndex);
          }
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  // Scroll handler: Map scroll position through hero container to frames
  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollableDistance = rect.height - window.innerHeight;

      if (totalScrollableDistance <= 0) return;

      // When rect.top is 0, progress = 0 (woman inside phone)
      // When rect.top = -totalScrollableDistance, progress = 1 (woman fully reached to products)
      const rawProgress = -rect.top / totalScrollableDistance;
      const progress = Math.min(1, Math.max(0, rawProgress));

      setScrollProgress(progress);
      targetFrameRef.current = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1))));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Quick jump scrub by clicking anywhere on the luxury progress bar
  const handleScrubClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, clickX / rect.width));
    const target = Math.round(ratio * (TOTAL_FRAMES - 1));
    targetFrameRef.current = target;
  };

  // Hotspots definitions over the products in the video (percentage coordinates)
  const hotspots = [
    {
      id: 'anew',
      name: 'Anew Molecular Protinol™',
      brand: 'Avon Haute Science',
      note: 'Colágeno dual restaurador en 7 días',
      x: '46%',
      y: '65%',
      link: '#gallery'
    },
    {
      id: 'ekos',
      name: 'Ekos Castanha Nude Silk',
      brand: 'Natura Bio-Cosmética',
      note: 'Bioactivo amazónico de nutrición 72h',
      x: '52%',
      y: '60%',
      link: '#gallery'
    },
    {
      id: 'chronos',
      name: 'Chronos Biorretinol Jatobá',
      brand: 'Natura Chronos',
      note: 'Firmeza celular e hidratación pura',
      x: '58%',
      y: '72%',
      link: '#gallery'
    },
    {
      id: 'lipstick',
      name: 'Hydramatic Matte Rose',
      brand: 'Avon Glam',
      note: 'Núcleo de ácido hialurónico visible',
      x: '64%',
      y: '70%',
      link: '#gallery'
    }
  ];

  return (
    // Tall sticky scroll container (220vh) enables Apple-style scrubbing
    <section ref={containerRef} className="relative h-[230vh] bg-sand-100">
      
      {/* ======================================================== */}
      {/* STICKY FULLSCREEN VIEWPORT                               */}
      {/* ======================================================== */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* ======================================================== */}
        {/* CANVAS: HARDWARE-ACCELERATED VIDEO SCRUBBING             */}
        {/* ======================================================== */}
        <div className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full block filter brightness-[1.03] contrast-[1.04] saturate-[1.06]"
          />

          {/* Ultra-sheer ambient gradients: tuned to enhance and NEVER hide the background artwork */}
          {/* Subtle top shade for navigation bar legibility */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sand-100/70 via-sand-100/25 to-transparent pointer-events-none" />

          {/* Subtle bottom fade to seamlessly blend into CuratedCollection */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-sand-100 via-sand-100/50 to-transparent pointer-events-none" />

          {/* Radial soft lighting around the artwork */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-sand-100/20 pointer-events-none" />
        </div>

        {/* ======================================================== */}
        {/* INTERACTIVE PRODUCT HOTSPOTS (Visible when approaching)   */}
        {/* ======================================================== */}
        {scrollProgress > 0.25 && (
          <div className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-700">
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{ left: spot.x, top: spot.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto group"
              >
                {/* Pulsing Pin Marker */}
                <button
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  aria-label={`Ver información de ${spot.name}`}
                  className="relative p-2 flex items-center justify-center focus:outline-none"
                >
                  <span className="absolute w-7 h-7 rounded-full bg-coquette-400/40 animate-ping" />
                  <span className="relative w-4 h-4 rounded-full bg-gradient-to-tr from-terracotta-500 to-coquette-500 border-2 border-sand-50 shadow-coquette-glow flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-sand-50" />
                  </span>
                </button>

                {/* Floating Tooltip Card */}
                <div
                  className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 glass-coquette rounded-2xl shadow-luxury border border-coquette-200/90 text-left transition-all duration-300 ${
                    activeHotspot === spot.id
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-widest text-coquette-700 font-bold mb-1">
                    <span>{spot.brand}</span>
                    <Sparkles className="w-3 h-3 text-coquette-500" />
                  </div>
                  <h4 className="font-serif text-sm font-semibold text-charcoal-900 leading-tight">
                    {spot.name}
                  </h4>
                  <p className="text-[11px] text-charcoal-700/80 mt-1 leading-snug">
                    {spot.note}
                  </p>
                  <a
                    href={spot.link}
                    className="mt-2.5 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold text-terracotta-600 hover:text-terracotta-700"
                  >
                    <span>Ver en Galería</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ======================================================== */}
        {/* EDITORIAL FLOATING OVERLAY CONTENT (BOTTOM CORNERS)      */}
        {/* ======================================================== */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pb-6 sm:pb-8 pt-24 flex flex-col justify-end flex-1 pointer-events-none">
          
          {/* Bottom Bar: Left Corner Card & Right Corner Scrub Timeline */}
          <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-5 pointer-events-none">
            
            {/* BOTTOM-LEFT CORNER: COMPACT EDITORIAL CARD */}
            <div className="w-full max-w-[340px] sm:max-w-[380px] text-left pointer-events-auto transition-all duration-300">
              
              <div className="p-4 sm:p-5 rounded-2xl glass-card border border-sand-300/80 shadow-luxury backdrop-blur-md space-y-2">
                
                {/* Header Coquette Tag */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full glass-coquette border border-coquette-200/80 text-[9px] uppercase tracking-widest text-charcoal-900 font-semibold">
                  <span className="text-coquette-500 text-[10px] animate-pulse">✦</span>
                  <span>Natura &bull; Avon &bull; Haute Cosmétique</span>
                  <span className="text-[9px] text-coquette-500">♡</span>
                </div>

                {/* Script flourish */}
                <p className="font-script text-2xl sm:text-3xl text-coquette-600 leading-none">
                  Shh, tu piel va a brillar...
                </p>

                {/* Compact High-Contrast Serif Headline */}
                <h1 className="text-sm sm:text-base md:text-lg font-serif font-medium leading-snug text-charcoal-900 tracking-tight">
                  La armonía entre la <span className="italic text-terracotta-600 font-normal">botánica viva</span> y el <span className="italic text-coquette-600 font-normal">glamour molecular</span>.
                </h1>

                {/* Concise Subtitle */}
                <p className="text-[11px] text-charcoal-800/80 leading-relaxed">
                  Bioactivos amazónicos de Natura con la ciencia celular del Protinol™ de Avon.
                </p>

                {/* Compact Action Buttons */}
                <div className="pt-1.5 flex items-center gap-2">
                  <a
                    href="#gallery"
                    onClick={onExploreClick}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-terracotta-500 via-rosewood-500 to-coquette-500 hover:from-terracotta-600 hover:to-coquette-600 text-sand-50 text-[10px] uppercase tracking-editorial font-semibold shadow-coquette-glow transition-all duration-300 group"
                  >
                    <span>Explorar</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full glass-coquette hover:bg-sand-50/90 border border-sand-300 text-charcoal-900 text-[10px] uppercase tracking-editorial font-medium transition-all duration-300 shadow-xs"
                    title="Asesoría por WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-coquette-500" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                {/* Integrated Trust Badges Row */}
                <div className="pt-2 border-t border-sand-200/90 flex items-center justify-between text-[9px] uppercase tracking-wider text-charcoal-700/80 font-medium">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-terracotta-600" /> 100% Original
                  </span>
                  <span className="text-sand-300">&bull;</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-coquette-500 fill-coquette-500/30" /> Skintuition
                  </span>
                  <span className="text-sand-300">&bull;</span>
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" /> Protinol™
                  </span>
                </div>

              </div>

            </div>

            {/* BOTTOM-RIGHT CORNER: INTERACTIVE SCRUB & SCROLL STATUS BAR */}
            <div className="pointer-events-auto w-full sm:w-auto">
              <div className="glass-coquette px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-coquette-200/90 shadow-glass flex items-center gap-3 max-w-md w-full sm:w-auto ml-auto">
                
                {/* Animated Scroll Icon */}
                <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-sand-100 border border-coquette-200 text-coquette-600 shrink-0">
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-bounce" />
                </div>

                {/* Scrub Track */}
                <div className="flex-1 flex flex-col min-w-[120px]">
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-widest text-charcoal-800 font-semibold mb-1">
                    <span>
                      {scrollProgress < 0.2
                        ? "Desplaza para acercar"
                        : scrollProgress < 0.8
                        ? "Acercándose a los productos..."
                        : "¡Fórmulas alcanzadas!"}
                    </span>
                    <span className="text-coquette-600 font-mono text-[9px] sm:text-[10px] ml-2">
                      {Math.round(scrollProgress * 100)}%
                    </span>
                  </div>

                  {/* Clickable Luxury Progress Bar */}
                  <div
                    onClick={handleScrubClick}
                    className="h-1.5 w-full sm:w-40 bg-sand-200 rounded-full overflow-hidden cursor-pointer relative"
                    title="Haz clic para avanzar o retroceder la animación"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-terracotta-500 via-rosewood-500 to-coquette-500 rounded-full transition-all duration-150"
                      style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Frame Indicator Pill */}
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-sand-50/80 border border-sand-300 text-charcoal-700 shrink-0">
                  F:{String(activeFrame + 1).padStart(2, '0')}/60
                </span>

              </div>
            </div>

          </div>

        </div>

        {/* Subtle Loading Veil (disappears once first frames are loaded) */}
        {isLoading && (
          <div className="absolute inset-0 z-30 bg-sand-100 flex flex-col items-center justify-center space-y-3 transition-opacity duration-500">
            <span className="font-serif text-xl tracking-widest text-charcoal-900">NATURA &amp; AVON</span>
            <div className="w-36 h-1 bg-sand-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-terracotta-500 to-coquette-500 transition-all duration-200"
                style={{ width: `${(loadedCount / 20) * 100}%` }}
              />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-charcoal-600">Cargando Experiencia Visual...</span>
          </div>
        )}

      </div>

    </section>
  );
}
