import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Camera, 
  Trophy, 
  ExternalLink, 
  X, 
  ChevronRight, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/cucaData';

export const GallerySection: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const categories = ['All', 'Fest Highlights', 'Pareekshana', 'Prashnotri', 'Conclave', 'Valedictory'];

  const filteredItems = selectedFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  return (
    <section id="gallery" className="py-24 relative bg-[#09090b] border-t border-zinc-800/80 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-rose-950/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-700/50 text-rose-300 text-xs font-bold tracking-wider uppercase">
              <Camera className="w-3.5 h-3.5" />
              <span>Visual Archives &amp; Legacy</span>
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Past Editions &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-white">
                Hall of Champions
              </span>
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base">
              A curated retrospective capturing intense boardroom defenses, buzzer climaxes, keynote addresses, and winning podium celebrations.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedFilter === cat
                    ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-rose-950'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setActiveImage(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden glass-panel border border-zinc-800/80 hover:border-rose-900/60 transition-all duration-300 relative"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                
                {/* Category Pill */}
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-zinc-950/80 border border-zinc-700/80 text-rose-300 backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="p-1.5 rounded-lg bg-zinc-950/80 text-white backdrop-blur-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h4 className="font-heading font-bold text-base text-white group-hover:text-rose-300 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            >
              <div 
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full bg-[#12090b] rounded-3xl border border-rose-900/50 overflow-hidden shadow-2xl relative"
              >
                <button
                  onClick={() => setActiveImage(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="relative aspect-video bg-black">
                  <img 
                    src={activeImage.image} 
                    alt={activeImage.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-6 bg-zinc-950">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    {activeImage.category} • Official Archive
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white mt-1">
                    {activeImage.title}
                  </h3>
                  <p className="text-sm text-zinc-300 mt-2">
                    {activeImage.caption}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
