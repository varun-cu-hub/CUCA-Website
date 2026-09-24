import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, ShieldCheck, Flame } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-4xl w-full bg-[#12080a] rounded-3xl border border-rose-800/60 overflow-hidden shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-rose-950 text-white border border-rose-900/50 transition-colors"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Simulated Cinematic Trailer Screen */}
          <div className="relative aspect-video bg-zinc-950 overflow-hidden flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80" 
              alt="CUCA Official Teaser Reel" 
              className={`w-full h-full object-cover transition-all duration-700 ${isPlaying ? 'scale-105' : 'scale-100 filter brightness-75'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

            {/* Cinematic Center Watermark / Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center font-crest font-bold text-2xl text-white shadow-2xl shadow-rose-950">
                C
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                  CUCA Official Cinematic Reel
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                  The Crucible of Commerce
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                  Showcasing 25+ years of boardroom battles, buzzer shootouts, and intellectual glory at Christ University.
                </p>
              </div>

              {/* Pulsing play state */}
              <div className="pt-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-5 py-2.5 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg backdrop-blur-md transition-all"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  <span>{isPlaying ? 'Pause Playback' : 'Resume Playback'}</span>
                </button>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-xs text-white">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                <span className="font-mono text-[11px] text-zinc-300">01:14 / 02:30 • 4K Dolby Atmos</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-rose-300 border border-red-800">
                  Official Teaser
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 bg-zinc-950 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-zinc-400">
              Department of Commerce, Christ (Deemed to be University), Bengaluru.
            </div>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/cucadoc/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="text-rose-400 hover:underline"
              >
                Watch more highlights on @cucadoc &rarr;
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
