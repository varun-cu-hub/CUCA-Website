import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Award, 
  BookOpen, 
  TrendingUp, 
  Landmark, 
  ExternalLink, 
  ChevronRight,
  Sparkles,
  Medal,
  CheckCircle2
} from 'lucide-react';
import { CUCA_ACHIEVEMENTS } from '../data/cucaData';
import { AchievementItem } from '../types';

export const AchievementsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  const filterCategories = [
    'All',
    'National Trophies',
    'Research & Academics',
    'Corporate & Placements',
    'Heritage Records',
  ];

  const filteredItems = activeFilter === 'All'
    ? CUCA_ACHIEVEMENTS
    : CUCA_ACHIEVEMENTS.filter((item) => item.category === activeFilter);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'National Trophies':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'Research & Academics':
        return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'Corporate & Placements':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'Heritage Records':
        return <Landmark className="w-4 h-4 text-rose-400" />;
      default:
        return <Award className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <section 
      id="achievements" 
      className="relative py-24 bg-[#09090b] text-white border-t border-zinc-900 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-rose-950/15 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/50 border border-rose-800/40 text-rose-300 text-xs font-semibold tracking-wider uppercase mb-4"
          >
            <Trophy className="w-3.5 h-3.5 text-rose-400" />
            <span>Excellence & Distinction</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Hall of Commerce Laurels
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-400 font-normal leading-relaxed"
          >
            Over two decades of national championships, empirical research publications, and corporate leadership forged by the Christ University Commerce Association.
          </motion.p>
        </div>

        {/* Quick Achievement Stats Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md relative overflow-hidden group hover:border-rose-800/60 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-950/40 border border-amber-700/40 flex items-center justify-center text-amber-400">
                <Medal className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Pan-India Wins</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">3x Grand Slam</div>
            <p className="text-xs text-zinc-400 mt-1">Crossroads SRCC & St. Xavier’s Trophies</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md relative overflow-hidden group hover:border-rose-800/60 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-950/40 border border-sky-700/40 flex items-center justify-center text-sky-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Research Output</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">48+ Scopus</div>
            <p className="text-xs text-zinc-400 mt-1">Peer-reviewed publications in ESG & Finance</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md relative overflow-hidden group hover:border-rose-800/60 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-700/40 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Placement Peak</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">₹24 LPA</div>
            <p className="text-xs text-zinc-400 mt-1">Goldman Sachs, McKinsey & Tier-1 IB</p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-md relative overflow-hidden group hover:border-rose-800/60 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-rose-950/40 border border-rose-700/40 flex items-center justify-center text-rose-400">
                <Landmark className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">National Rank</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">Top 5 India</div>
            <p className="text-xs text-zinc-400 mt-1">India Today & The Week Commerce Survey</p>
          </div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" id="achievements-filter-tabs">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                activeFilter === cat
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40 font-semibold'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800/60'
              }`}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat}</span>
              <span className="text-[11px] opacity-75">
                ({cat === 'All' ? CUCA_ACHIEVEMENTS.length : CUCA_ACHIEVEMENTS.filter((i) => i.category === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                onClick={() => setSelectedAchievement(item)}
                className="group relative rounded-2xl bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800/80 hover:border-rose-600/50 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-rose-950/30 cursor-pointer overflow-hidden"
              >
                {/* Visual Accent glow line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-600/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-rose-400 bg-rose-950/40 px-2.5 py-1 rounded-md border border-rose-900/40">
                      {getCategoryIcon(item.category)}
                      <span>{item.category}</span>
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 font-medium">
                      {item.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white group-hover:text-rose-200 transition-colors leading-snug mb-2">
                    {item.title}
                  </h3>

                  {/* Forum */}
                  <p className="text-xs text-zinc-400 font-medium mb-3 flex items-center gap-1">
                    <Landmark className="w-3 h-3 text-zinc-400 flex-shrink-0" />
                    <span className="line-clamp-1">{item.institutionOrForum}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3 mb-4">
                    {item.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[11px] font-semibold font-mono text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/30">
                    {item.highlightMetric}
                  </span>
                  <span className="text-xs text-zinc-400 group-hover:text-rose-400 flex items-center gap-1 font-medium transition-colors">
                    <span>View Laurels</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed Modal */}
        <AnimatePresence>
          {selectedAchievement && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedAchievement(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-xl bg-zinc-950 border border-rose-900/50 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-rose-950/40 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 bg-rose-950/60 px-3 py-1 rounded-full border border-rose-800/40 mb-2">
                      {getCategoryIcon(selectedAchievement.category)}
                      <span>{selectedAchievement.category}</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {selectedAchievement.title}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedAchievement(null)}
                    className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 rounded-full border border-zinc-800"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-sm text-zinc-300">
                  <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-zinc-400 block">Conferring Body / Institution</span>
                      <span className="font-semibold text-white">{selectedAchievement.institutionOrForum}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-zinc-400 block">Timeline</span>
                      <span className="font-mono font-semibold text-rose-400">{selectedAchievement.year}</span>
                    </div>
                  </div>

                  <p className="leading-relaxed text-zinc-300">
                    {selectedAchievement.description}
                  </p>

                  <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40">
                    <span className="text-xs uppercase tracking-wider text-rose-400 font-semibold block mb-1">
                      Certified Distinction Metric
                    </span>
                    <div className="text-base font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-rose-400" />
                      <span>{selectedAchievement.highlightMetric}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                  <button
                    onClick={() => setSelectedAchievement(null)}
                    className="px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold"
                  >
                    Close Accolade
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Association Heritage Endorsement Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-zinc-950 via-red-950/20 to-zinc-950 border border-rose-900/40 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-900/40 border border-rose-700/40 flex items-center justify-center text-rose-400 flex-shrink-0">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white">
                Represent Your Institution at CUCA ’25
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Compete for the prestigious Overall Rolling Trophy, ₹3,50,000+ in national cash awards, and corporate recruitment interviews.
              </p>
            </div>
          </div>
          <a
            href="#registrations"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-lg shadow-rose-950/50 hover:brightness-110 active:scale-95 transition-all"
          >
            Claim Delegation Slot
          </a>
        </motion.div>
      </div>
    </section>
  );
};
