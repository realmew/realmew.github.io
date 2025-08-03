"use client";
import React, { useState, useEffect, useMemo, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

type Artwork = {
  src: string;
  title: string;
  description: string;
};

export default function ArtGallery(): JSX.Element {
  const router = useRouter();
  const artworks: Artwork[] = [
    { src: `/art1.png`, title: `Vision I`, description: "Digital exploration of form and color" },
    { src: `/art2.png`, title: `Vision II`, description: "Abstract interpretation of urban landscapes" },
    { src: `/art3.png`, title: `Vision III`, description: "Experimental composition study" },
    { src: `/art4.jpg`, title: `Vision IV`, description: "Mixed media creation" },
    { src: `/art5.jpg`, title: `Vision V`, description: "Contemporary visual narrative" },
    { src: `/art6.png`, title: `Vision VI`, description: "Digital art piece" },
    { src: `/art7.png`, title: `Vision VII`, description: "Creative expression study" },
    { src: `/art8.png`, title: `Vision VIII`, description: "Artistic interpretation" },
    { src: `/art9.png`, title: `Vision IX`, description: "Visual composition" },
    { src: `/art10.png`, title: `Vision X`, description: "Digital artwork" },
    { src: `/art11.webp`, title: `Vision XI`, description: "Contemporary piece" },
    { src: `/art12.png`, title: `Vision XII`, description: "Abstract creation" },
    { src: `/art13.png`, title: `Vision XIII`, description: "Digital art study" },
    { src: `/art14.png`, title: `Vision XIV`, description: "Visual exploration" },
    { src: `/art15.png`, title: `Vision XV`, description: "Creative composition" },
    { src: `/art16.png`, title: `Vision XVI`, description: "Artistic expression" },
    { src: `/art17.png`, title: `Vision XVII`, description: "Digital creation" },
    { src: `/art18.png`, title: `Vision XVIII`, description: "Contemporary art" },
    { src: `/art19.png`, title: `Vision XIX`, description: "Visual narrative" },
    { src: `/art20.png`, title: `Vision XX`, description: "Abstract interpretation" },
    { src: `/art21.png`, title: `Vision XXI`, description: "Digital composition" },
    { src: `/art23.jpg`, title: `Vision XXIII`, description: "Mixed media work" },
    { src: `/art25.jpg`, title: `Vision XXV`, description: "Contemporary creation" },
    { src: `/art26.jpg`, title: `Vision XXVI`, description: "Artistic study" },
    { src: `/art27.jpg`, title: `Vision XXVII`, description: "Visual exploration" },
    { src: `/art28.jpg`, title: `Vision XXVIII`, description: "Creative expression" },
    { src: `/art29.jpg`, title: `Vision XXIX`, description: "Digital artwork" },
    { src: `/art30.jpg`, title: `Vision XXX`, description: "Contemporary piece" },
    { src: `/art31.png`, title: `Vision XXXI`, description: "Abstract creation" },
    { src: `/art32.png`, title: `Vision XXXII`, description: "Visual composition" },
    { src: `/art33.png`, title: `Vision XXXIII`, description: "Digital art study" },
    // PLACEHOLDER ARTWORKS - Replace these with real art
    { src: `/art1.png`, title: `P1`, description: "Need real artwork here" },
    { src: `/art2.png`, title: `P2`, description: "Need real artwork here" },
    { src: `/art3.png`, title: `P3`, description: "Need real artwork here" },
    { src: `/art4.jpg`, title: `P4`, description: "Need real artwork here" },
    { src: `/art5.jpg`, title: `P5`, description: "Need real artwork here" },
    { src: `/art6.png`, title: `P6`, description: "Need real artwork here" },
    { src: `/art7.png`, title: `P7`, description: "Need real artwork here" },
    { src: `/art8.png`, title: `P8`, description: "Need real artwork here" },
    { src: `/art9.png`, title: `P9`, description: "Need real artwork here" },
    { src: `/art10.png`, title: `P10`, description: "Need real artwork here" },
    { src: `/art11.webp`, title: `P11`, description: "Need real artwork here" },
    { src: `/art12.png`, title: `P12`, description: "Need real artwork here" },
    { src: `/art13.png`, title: `P13`, description: "Need real artwork here" },
    { src: `/art14.png`, title: `P14`, description: "Need real artwork here" },
    { src: `/art15.png`, title: `P15`, description: "Need real artwork here" },
    { src: `/art16.png`, title: `P16`, description: "Need real artwork here" },
    { src: `/art17.png`, title: `P17`, description: "Need real artwork here" },
    { src: `/art18.png`, title: `P18`, description: "Need real artwork here" },
    { src: `/art19.png`, title: `P19`, description: "Need real artwork here" },
    { src: `/art20.png`, title: `P20`, description: "Need real artwork here" },
    { src: `/art21.png`, title: `P21`, description: "Need real artwork here" },
    { src: `/art23.jpg`, title: `P22`, description: "Need real artwork here" },
    { src: `/art25.jpg`, title: `P23`, description: "Need real artwork here" },
    { src: `/art26.jpg`, title: `P24`, description: "Need real artwork here" },
    { src: `/art27.jpg`, title: `P25`, description: "Need real artwork here" },
    { src: `/art28.jpg`, title: `P26`, description: "Need real artwork here" },
    { src: `/art29.jpg`, title: `P27`, description: "Need real artwork here" },
    { src: `/art30.jpg`, title: `P28`, description: "Need real artwork here" },
    { src: `/art31.png`, title: `P29`, description: "Need real artwork here" },
    { src: `/art32.png`, title: `P30`, description: "Need real artwork here" },
    { src: `/art33.png`, title: `P31`, description: "Need real artwork here" },
    { src: `/art1.png`, title: `P32`, description: "Need real artwork here" },
    { src: `/art2.png`, title: `P33`, description: "Need real artwork here" },
    { src: `/art3.png`, title: `P34`, description: "Need real artwork here" },
    { src: `/art4.jpg`, title: `P35`, description: "Need real artwork here" },
    { src: `/art5.jpg`, title: `P36`, description: "Need real artwork here" },
    { src: `/art6.png`, title: `P37`, description: "Need real artwork here" },
  ];

  const [selectedArt, setSelectedArt] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'digital' | 'mixed'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'photomontage' | 'grid'>('photomontage');

  // Photomontage layout positions
  const photomontageLayout = useMemo(() => {
    type Position = {
      left: number;
      top: number;
      rotation: number;
      scale: number;
      zIndex: number;
    };
    // Pre-defined positions around the center (avoiding header/button area)
    const fixedPositions: Omit<Position, 'zIndex'>[] = [
      // TOP EDGE - above header
      { left: 5, top: 0, rotation: -12, scale: 0.8 },
      { left: 15, top: 2, rotation: 8, scale: 0.9 },
      { left: 25, top: 0, rotation: -5, scale: 0.7 },
      { left: 35, top: 3, rotation: 15, scale: 0.85 },
      { left: 45, top: 1, rotation: 10, scale: 0.75 },
      { left: 55, top: 0, rotation: -8, scale: 0.95 },
      { left: 65, top: 2, rotation: 6, scale: 0.8 },
      { left: 75, top: 1, rotation: -15, scale: 0.7 },
      { left: 85, top: 0, rotation: 12, scale: 0.9 },
      { left: 95, top: 3, rotation: -3, scale: 0.85 },
      
      // LEFT SIDE - around content
      { left: 0, top: 15, rotation: 7, scale: 0.8 },
      { left: 2, top: 25, rotation: -10, scale: 0.75 },
      { left: 1, top: 35, rotation: 4, scale: 0.9 },
      { left: 0, top: 45, rotation: 14, scale: 0.85 },
      { left: 3, top: 55, rotation: -6, scale: 0.8 },
      { left: 1, top: 65, rotation: 9, scale: 0.7 },
      { left: 0, top: 75, rotation: -11, scale: 0.95 },
      { left: 2, top: 85, rotation: 5, scale: 0.8 },
      { left: 1, top: 95, rotation: -13, scale: 0.75 },
      
      // RIGHT SIDE - around content (moved closer)
      { left: 92, top: 15, rotation: 8, scale: 0.9 },
      { left: 94, top: 25, rotation: -4, scale: 0.85 },
      { left: 96, top: 35, rotation: 11, scale: 0.8 },
      { left: 90, top: 45, rotation: -7, scale: 0.75 },
      { left: 93, top: 55, rotation: 6, scale: 0.9 },
      { left: 95, top: 65, rotation: -9, scale: 0.85 },
      { left: 88, top: 75, rotation: 13, scale: 0.8 },
      { left: 91, top: 85, rotation: -2, scale: 0.75 },
      { left: 94, top: 92, rotation: 10, scale: 0.9 },
      { left: 97, top: 96, rotation: 8, scale: 0.8 },
      { left: 99, top: 88, rotation: 12, scale: 0.75 },
      
      // BOTTOM EDGE - below buttons
      // BOTTOM EDGE - below buttons (almost touching exclusion zone, pronounced arc)
      { left: 5, top: 65, rotation: -12, scale: 0.85 },
      { left: 15, top: 72, rotation: 7, scale: 0.8 },
      { left: 25, top: 67, rotation: -8, scale: 0.75 },
      { left: 35, top: 74, rotation: 11, scale: 0.9 },
      { left: 45, top: 66, rotation: -14, scale: 0.85 },
      { left: 55, top: 73, rotation: 9, scale: 0.8 },
      { left: 65, top: 67, rotation: -6, scale: 0.75 },
      { left: 72, top: 74, rotation: 10, scale: 0.85 },
      { left: 78, top: 68, rotation: -7, scale: 0.8 },
      { left: 85, top: 72, rotation: -11, scale: 0.85 },
      { left: 90, top: 65, rotation: 12, scale: 0.9 },
      { left: 95, top: 73, rotation: 6, scale: 0.8 },
      { left: 97, top: 66, rotation: 8, scale: 0.8 },
      { left: 99, top: 74, rotation: 10, scale: 0.75 },
      
      // CORNERS
      { left: 0, top: 0, rotation: -9, scale: 0.9 },
      { left: 99, top: 0, rotation: 12, scale: 0.85 },
      { left: 0, top: 99, rotation: -5, scale: 0.8 },
      { left: 99, top: 99, rotation: 8, scale: 0.75 },
      
      // SCATTERED AROUND EDGES (avoiding center 30-70% area for better text clearance)
      { left: 10, top: 10, rotation: -12, scale: 0.9 },
      { left: 20, top: 8, rotation: 10, scale: 0.85 },
      { left: 25, top: 12, rotation: -7, scale: 0.8 },
      { left: 75, top: 8, rotation: 14, scale: 0.75 },
      { left: 80, top: 12, rotation: -10, scale: 0.9 },
      { left: 90, top: 10, rotation: 7, scale: 0.85 },
      
      { left: 8, top: 88, rotation: -13, scale: 0.8 },
      { left: 18, top: 92, rotation: 9, scale: 0.75 },
      { left: 28, top: 90, rotation: -6, scale: 0.9 },
      { left: 72, top: 92, rotation: 11, scale: 0.85 },
      { left: 82, top: 88, rotation: -8, scale: 0.8 },
      { left: 92, top: 90, rotation: 12, scale: 0.75 },
      
      // OUTER MID EDGES (pushed further from center)
      { left: 8, top: 20, rotation: 8, scale: 0.9 },
      { left: 5, top: 40, rotation: -11, scale: 0.85 },
      { left: 12, top: 60, rotation: 6, scale: 0.8 },
      { left: 8, top: 80, rotation: -9, scale: 0.75 },
      
      { left: 92, top: 20, rotation: 13, scale: 0.9 },
      { left: 95, top: 40, rotation: -7, scale: 0.85 },
      { left: 88, top: 60, rotation: 10, scale: 0.8 },
      { left: 92, top: 80, rotation: -12, scale: 0.75 },
      
      // FAR OUTER POSITIONS (closer to text but not overlapping)
      { left: 20, top: 25, rotation: -14, scale: 0.8 },
      { left: 80, top: 25, rotation: 9, scale: 0.85 },
      { left: 20, top: 75, rotation: 11, scale: 0.9 },
      { left: 80, top: 75, rotation: -8, scale: 0.75 },
      
      // ADDITIONAL EDGE FILLERS (moved further from center)
      { left: 28, top: 20, rotation: 7, scale: 0.8 },
      { left: 72, top: 20, rotation: -10, scale: 0.85 },
      { left: 28, top: 80, rotation: 12, scale: 0.9 },
      { left: 72, top: 80, rotation: -6, scale: 0.75 },
      
      { left: 4, top: 30, rotation: 14, scale: 0.8 },
      { left: 96, top: 30, rotation: -9, scale: 0.85 },
      { left: 4, top: 70, rotation: 8, scale: 0.9 },
      { left: 96, top: 70, rotation: -11, scale: 0.75 }
    ];
    
    // Shuffle artworks array to randomize which art goes to which position
    const shuffledArtworks = [...artworks].sort(() => Math.random() - 0.5);
    return shuffledArtworks.map((_, i) => ({
      ...fixedPositions[i % fixedPositions.length],
      zIndex: i + 1
    }));
  }, [artworks]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);


  // Lock logic: redirect if locked and not on / or /events
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (siteConfig.isLocked) {
      const path = window.location.pathname;
      if (path !== '/' && path !== '/events') {
        router.replace('/');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, siteConfig.isLocked]);

  // Show lock message only on the client and only if not on allowed pages
  const [showLock, setShowLock] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (
      siteConfig.isLocked &&
      window.location.pathname !== '/events' &&
      window.location.pathname !== '/'
    ) {
      setShowLock(true);
    } else {
      setShowLock(false);
    }
  }, [siteConfig.isLocked]);

  if (showLock) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">{siteConfig.lockMessage}</h1>
        <p className="mt-4 text-lg text-black font-semibold">{siteConfig.lockSubMessage}</p>
      </div>
    );
  }

  const filteredArtworks = artworks.map((art, originalIndex) => ({ ...art, originalIndex })).filter(art => {
    if (filter === 'all') return true;
    if (filter === 'digital') return art.src.includes('.png') || art.src.includes('.webp');
    if (filter === 'mixed') return art.src.includes('.jpg');
    return true;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-light text-white">Loading Gallery...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`bg-transparent relative ${viewMode === 'photomontage' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-auto'}`}
    >
      {/* Header Section - Centered, with exclusion zone for art (absolute overlay only in photomontage) */}
      {viewMode === 'photomontage' ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none"
        >
          <div className="relative flex flex-col items-center justify-center pointer-events-auto">
            {/* Central exclusion zone for art - perfectly centered and sized for header+controls */}
            <div
              className="absolute left-1/2 z-10"
              style={{
                top: '46%',
                transform: 'translate(-50%, -40%)',
                width: 'min(80vw, 420px)',
                height: 'min(38vw, 170px)',
                pointerEvents: 'none',
              }}
            />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] relative z-20">
              Art Gallery
            </h1>
            {/* Controls Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4 relative z-20">
              {/* View Mode Toggle */}
              <motion.button
                onClick={(_: React.MouseEvent<HTMLButtonElement>) => setViewMode(viewMode === 'photomontage' ? 'grid' : 'photomontage')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-black/10 hover:bg-black/20 backdrop-blur-md border border-black/20 rounded-full text-black font-medium transition-all duration-300 shadow-lg flex items-center gap-2"
              >
                <span className="text-sm">
                  {viewMode === 'photomontage' ? '⊞' : '⊡'}
                </span>
                {viewMode === 'photomontage' ? 'Grid View' : 'Photomontage'}
              </motion.button>
              {/* No filter buttons in photomontage mode */}
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center pt-12 pb-6 bg-white/80 z-20 sticky top-0 backdrop-blur-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
            Art Gallery
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <motion.button
              onClick={(_: React.MouseEvent<HTMLButtonElement>) => setViewMode('photomontage')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-black/10 hover:bg-black/20 backdrop-blur-md border border-black/20 rounded-full text-black font-medium transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              <span className="text-sm">⊡</span>
              Photomontage
            </motion.button>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex gap-2"
              >
                {['all', 'digital', 'mixed'].map((filterType) => (
                  <motion.button
                    key={filterType}
                    onClick={(_: React.MouseEvent<HTMLButtonElement>) => setFilter(filterType as any)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-3 py-1 rounded-full backdrop-blur-md border transition-all duration-300 text-sm ${
                      filter === filterType 
                        ? 'bg-black/20 border-black/30 text-black shadow-lg font-medium' 
                        : 'bg-black/5 border-black/15 text-black/70 hover:bg-black/10 hover:border-black/25'
                    }`}
                  >
                    {filterType === 'all' ? 'All' : filterType === 'digital' ? 'Digital' : 'Mixed'}
                  </motion.button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Gallery Content */}
      <AnimatePresence mode="wait">
        {viewMode === 'photomontage' ? (
          /* Photomontage Layout - art surrounds the center */
          <motion.div
            key="photomontage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          >
            {artworks.map((art, index) => {
              const layout = photomontageLayout[index];
              // Exclude art from the central exclusion zone
              const centerX = layout.left;
              const centerY = layout.top;
              // Exclusion zone: 34% < left < 66%, 41% < top < 63% (wider and lower)
              if (centerX > 34 && centerX < 66 && centerY > 41 && centerY < 63) return null;
              return (
                <motion.div
                  key={`montage-${index}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: layout.scale,
                    x: 0,
                    y: 0
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.6,
                    type: "spring",
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: layout.scale * 1.1, 
                    zIndex: 100,
                    transition: { duration: 0.2 }
                  }}
                  onClick={(_: React.MouseEvent<HTMLDivElement>) => setSelectedArt(index)}
                  className="absolute cursor-pointer group pointer-events-auto"
                  style={{
                    left: `${layout.left}%`,
                    top: `${layout.top}%`,
                    transform: `rotate(${layout.rotation}deg)`,
                    zIndex: layout.zIndex,
                  }}
                >
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20 shadow-2xl group-hover:shadow-3xl transition-all duration-300">
                    {/* Polaroid-style tape */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-white/20 rounded-sm shadow-md rotate-3 border border-white/30" />
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 overflow-hidden rounded">
                      <Image
                        src={art.src}
                        alt={art.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="160px"
                      />
                    </div>
                    <div className="mt-2 text-center">
                      <h3 className="text-white text-xs font-medium truncate">
                        {art.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Grid Layout */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-6"
          >
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
            >
              <AnimatePresence>
                {filteredArtworks.map((art, index) => (
                  <motion.div
                    key={`grid-${art.originalIndex}`}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    onClick={(_: React.MouseEvent<HTMLDivElement>) => setSelectedArt(art.originalIndex)}
                    className="group cursor-pointer"
                  >
                    <div className="relative bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:bg-white/10 hover:border-white/20">
                      <div className="relative aspect-square mb-4 overflow-hidden rounded-xl">
                        <Image
                          src={art.src}
                          alt={art.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-white/90 transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-white/60 text-xs line-clamp-2">
                        {art.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {selectedArt !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={(_: React.MouseEvent<HTMLDivElement>) => setSelectedArt(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden"
              onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <button
                onClick={(_: React.MouseEvent<HTMLButtonElement>) => setSelectedArt(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-xl font-light border border-white/20 transition-all duration-300"
              >
                ×
              </button>
              
              <div className="relative aspect-video">
                <Image
                  src={artworks[selectedArt].src}
                  alt={artworks[selectedArt].title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-4">
                  {artworks[selectedArt].title}
                </h2>
                <p className="text-white/80 text-lg">
                  {artworks[selectedArt].description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
