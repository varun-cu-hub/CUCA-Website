import React from 'react';
import { motion } from 'motion/react';
import { Handshake, Award, Sparkles, ArrowRight, Building, CheckCircle2 } from 'lucide-react';
import { SPONSORS_DATA } from '../data/cucaData';

export const SponsorsSection: React.FC = () => {
  return (
    <section id="sponsors" className="py-20 relative bg-gradient-to-b from-[#09090b] via-[#12080a] to-[#09090b] border-t border-rose-950/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-bold tracking-wider uppercase">
            <Handshake className="w-3.5 h-3.5" />
            Corporate Alliances &amp; Patrons
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Distinguished Corporate Partners
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Proudly supported by leading institutions across management consulting, capital markets, valuation, and media.
          </p>
        </div>

        {/* Sponsor Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {SPONSORS_DATA.map((sp) => (
            <div
              key={sp.name}
              className="p-5 rounded-2xl bg-zinc-950/70 hover:bg-zinc-900 border border-zinc-800/80 hover:border-rose-900/60 transition-all duration-300 flex flex-col justify-between group text-center"
            >
              <div className="mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900 text-rose-300 border border-zinc-800">
                  {sp.tier}
                </span>
              </div>

              <div className="my-2">
                <h3 className="font-heading font-extrabold text-lg text-white group-hover:text-rose-300 transition-colors">
                  {sp.name}
                </h3>
                <p className="text-[11px] text-zinc-500 font-medium mt-1">
                  {sp.category}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-900 text-[10px] text-zinc-600 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-rose-500/60" />
                <span>Verified Partner</span>
              </div>
            </div>
          ))}

          {/* Become a Partner CTA Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 via-zinc-950 to-zinc-950 border border-rose-800/50 flex flex-col justify-between text-center">
            <div className="mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-950 text-rose-300 border border-red-800">
                Partnership Desk
              </span>
            </div>

            <div className="my-2">
              <h3 className="font-heading font-bold text-base text-white">
                Partner with CUCA
              </h3>
              <p className="text-[11px] text-zinc-400 mt-1">
                Engage directly with 6,000+ top commerce leaders and student delegates.
              </p>
            </div>

            <a
              href="#contact"
              className="mt-2 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1"
            >
              <span>Request Brochure</span>
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
