import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Calendar, 
  MapPin, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2,
  Users2,
  ChevronDown
} from 'lucide-react';
import { CUCA_STATS } from '../data/cucaData';

interface HeroProps {
  onOpenRegistration: (event?: 'pareekshana' | 'prashnotri') => void;
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegistration, onOpenVideo }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden">
      {/* Ambient Red & Black Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Crimson Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-b from-rose-700/25 via-red-900/15 to-transparent rounded-full blur-[140px] opacity-75"></div>
        <div className="absolute -top-32 right-10 w-[450px] h-[450px] bg-rose-950/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-96 -left-32 w-[500px] h-[500px] bg-red-950/25 rounded-full blur-[130px]"></div>

        {/* Subtle Geometric Grid */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #f43f5e 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        ></div>
        {/* Subtle Horizontal Scanlines */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#09090b]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="text-center max-w-4xl mx-auto space-y-7">
          
          {/* Official Department Tag & Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-950/60 via-zinc-900 to-red-950/60 border border-rose-800/40 shadow-lg shadow-black/60"
            id="hero-dept-badge"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-rose-200 uppercase">
              Department of Commerce • Christ (Deemed to be University), Bengaluru
            </span>
          </motion.div>

          {/* Main Title & Hero Name */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-3"
          >
            <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-[1.08]">
              Christ University <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-300 to-rose-600">
                Commerce Association
              </span>
            </h1>
            <p className="font-crest text-rose-400/90 text-sm sm:text-lg tracking-[0.25em] uppercase font-semibold">
              CUCA • Empowering Commerce. Inspiring Leadership.
            </p>
          </motion.div>

          {/* One-Line Introduction strictly mandated by brief */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-3xl mx-auto"
          >
            The apex student-led association under the Department of Commerce, Christ University—serving as the 
            central platform for scholastic vigor, corporate battlegrounds, national fest ecosystems, and transformative student leadership.
          </motion.p>

          {/* Call to Actions & Video Trailer Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <button
              onClick={() => onOpenRegistration()}
              id="hero-register-cta"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-600 text-white font-semibold text-sm tracking-wide shadow-xl shadow-rose-900/40 hover:shadow-rose-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center gap-2 group"
            >
              <span>Register Delegation</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="#initiatives"
              id="hero-explore-cta"
              className="px-6 py-3.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 text-zinc-200 hover:text-white font-medium text-sm border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Initiatives</span>
            </a>

            <button
              onClick={onOpenVideo}
              id="hero-trailer-cta"
              className="px-5 py-3.5 rounded-xl bg-red-950/30 hover:bg-red-950/60 text-rose-300 hover:text-rose-200 font-medium text-sm border border-rose-900/40 hover:border-rose-700/60 transition-all duration-300 flex items-center gap-2"
            >
              <div className="w-5 h-5 rounded-full bg-rose-600/80 flex items-center justify-center text-white">
                <Play className="w-2.5 h-2.5 ml-0.5 fill-current" />
              </div>
              <span>Watch Trailer Reel</span>
            </button>
          </motion.div>

          {/* Quick Notice Announcement Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-2"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-xs text-zinc-400">
              <span className="px-2 py-0.5 rounded bg-rose-900/50 text-rose-300 font-bold uppercase tracking-wider text-[10px] border border-rose-700/40">
                Notice
              </span>
              <span className="text-zinc-300 font-medium">
                National Registrations Live for <strong className="text-white">Pareekshana</strong> (4-Pax) &amp; <strong className="text-white">Prashnotri</strong> (2-Pax)
              </span>
              <a href="#pre-fest-hype" className="text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-4 hidden sm:inline">
                View Deadlines &rarr;
              </a>
            </div>
          </motion.div>

        </div>

        {/* Snapshot Statistics Snapshot Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-14 max-w-6xl mx-auto"
          id="hero-stats-strip"
        >
          <div className="glass-panel rounded-2xl p-5 sm:p-7 border border-zinc-800/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-32 bg-rose-900/10 blur-3xl pointer-events-none"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800/80">
              {CUCA_STATS.map((stat, idx) => (
                <div 
                  key={stat.label} 
                  className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-4 sm:pt-0 sm:px-3' : 'sm:pr-3'}`}
                >
                  <span className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-100 to-rose-400">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-zinc-200 mt-1">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-medium mt-0.5 hidden sm:block">
                    {stat.subtext}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Jump Ribbon to Flagship Competitions */}
        <div className="mt-8 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            onClick={() => onOpenRegistration('pareekshana')}
            className="cursor-pointer group p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-red-900/60 transition-all duration-300 shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-950/80 border border-red-800/50 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                    Pareekshana '25
                  </h3>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-red-950 text-rose-300 border border-red-800/40">
                    4-Member Team
                  </span>
                </div>
                <p className="text-xs text-zinc-400">Corporate forensic strategy &amp; valuation crucible</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
          </div>

          <div 
            onClick={() => onOpenRegistration('prashnotri')}
            className="cursor-pointer group p-4 rounded-xl bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-rose-900/60 transition-all duration-300 shadow-md flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-950/80 border border-rose-800/50 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-rose-300 transition-colors">
                    Prashnotri '25
                  </h3>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 border border-rose-800/40">
                    2-Member Duo
                  </span>
                </div>
                <p className="text-xs text-zinc-400">National commerce &amp; market intelligence quiz</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
          </div>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="text-center pt-8 pb-2">
        <a 
          href="#about" 
          aria-label="Scroll to About section"
          className="inline-flex flex-col items-center text-zinc-500 hover:text-rose-400 transition-colors"
        >
          <span className="text-[11px] font-semibold uppercase tracking-widest mb-1">Discover CUCA</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
};
