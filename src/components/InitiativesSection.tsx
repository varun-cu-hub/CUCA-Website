import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  HelpCircle, 
  Trophy, 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  Users2,
  ExternalLink
} from 'lucide-react';
import { CUCA_INITIATIVES } from '../data/cucaData';

interface InitiativesSectionProps {
  onOpenRegistration: (event?: 'pareekshana' | 'prashnotri') => void;
}

export const InitiativesSection: React.FC<InitiativesSectionProps> = ({ onOpenRegistration }) => {
  const [selectedId, setSelectedId] = useState<string>('prayas');

  const selectedInitiative = CUCA_INITIATIVES.find((i) => i.id === selectedId) || CUCA_INITIATIVES[0];

  return (
    <section id="initiatives" className="py-24 relative bg-[#09090b] overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-950/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-bold tracking-wider uppercase">
              <Briefcase className="w-3.5 h-3.5" />
              Flagship Portfolios
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              The CUCA Ecosystem &amp; <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-white">
                Signature Initiatives
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              CUCA anchors an array of distinguished intellectual crucibles. From our annual national fest to 
              specialized corporate diagnostics and national quizzes, discover our signature programs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#pareekshana"
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold transition-colors"
            >
              Pareekshana Spec
            </a>
            <a
              href="#prashnotri"
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold transition-colors"
            >
              Prashnotri Spec
            </a>
          </div>
        </div>

        {/* 4 Interactive Initiative Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {CUCA_INITIATIVES.map((initiative) => {
            const isSelected = selectedId === initiative.id;
            return (
              <div
                key={initiative.id}
                onClick={() => setSelectedId(initiative.id)}
                className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 relative flex flex-col justify-between overflow-hidden border ${
                  isSelected 
                    ? 'bg-zinc-900/90 border-rose-600 shadow-xl shadow-rose-950/40 -translate-y-1.5' 
                    : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-rose-600"></div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                      {initiative.type}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'text-zinc-500'
                    }`}>
                      {initiative.badge}
                    </span>
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-white mb-2">
                    {initiative.name}
                  </h3>
                  
                  <p className="text-xs text-rose-300/90 font-medium mb-3">
                    {initiative.tagline}
                  </p>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                    {initiative.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-zinc-400 group-hover:text-white">
                    {isSelected ? 'Active Overview' : 'View Blueprint'}
                  </span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-rose-500 translate-x-1' : 'text-zinc-600'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Spotlight of Selected Initiative */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedInitiative.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel rounded-3xl p-8 sm:p-10 border border-rose-900/30 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-red-950 text-rose-300 border border-red-800 text-xs font-bold uppercase tracking-wider">
                    {selectedInitiative.badge}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    Initiative Portfolio • CUCA Dept of Commerce
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                  {selectedInitiative.name}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                  {selectedInitiative.description}
                </p>

                {/* Key Highlights */}
                <div className="space-y-2.5 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400">
                    Distinguishing Facets &amp; Rules
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedInitiative.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  {selectedInitiative.id === 'pareekshana' ? (
                    <button
                      onClick={() => onOpenRegistration('pareekshana')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-rose-950/50 hover:opacity-90 transition-opacity"
                    >
                      Register Pareekshana (4-Pax Team)
                    </button>
                  ) : selectedInitiative.id === 'prashnotri' ? (
                    <button
                      onClick={() => onOpenRegistration('prashnotri')}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-rose-950/50 hover:opacity-90 transition-opacity"
                    >
                      Register Prashnotri (2-Pax Duo)
                    </button>
                  ) : (
                    <button
                      onClick={() => onOpenRegistration()}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-rose-950/50 hover:opacity-90 transition-opacity"
                    >
                      Register Delegation
                    </button>
                  )}

                  <a
                    href={selectedInitiative.id === 'pareekshana' ? '#pareekshana' : selectedInitiative.id === 'prashnotri' ? '#prashnotri' : '#live-arena'}
                    className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800 transition-colors"
                  >
                    View Operational Rounds
                  </a>
                </div>
              </div>

              {/* Graphic Preview */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-rose-900/40 shadow-2xl">
                  <img 
                    src={selectedInitiative.image} 
                    alt={selectedInitiative.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-semibold text-white/90">
                      CUCA Official Archives
                    </p>
                    <p className="text-[11px] text-rose-300">
                      Christ (Deemed to be University)
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
