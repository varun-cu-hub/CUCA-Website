import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  Clock, 
  Play, 
  CalendarDays, 
  Trophy, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Quote, 
  Radio,
  FileText
} from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/cucaData';

interface PreFestHypeProps {
  onOpenRegistration: (event?: 'pareekshana' | 'prashnotri') => void;
  onOpenVideo: () => void;
}

export const PreFestHype: React.FC<PreFestHypeProps> = ({ onOpenRegistration, onOpenVideo }) => {
  // Target date set for upcoming national fest edition: 42 days, 14 hours ahead
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 38,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const updates = [
    { tag: 'RULEBOOK', text: 'Pareekshana 2025 Case Diagnostics Dossier v1.2 published.', time: '2 hours ago' },
    { tag: 'EARLY BIRD', text: 'First 50 collegiate team passes eligible for 25% subsidy.', time: '1 day ago' },
    { tag: 'JURY REVEAL', text: 'Senior Partners from Big-4 & PE funds confirmed for Grand Finale jury.', time: '3 days ago' },
  ];

  return (
    <section id="pre-fest-hype" className="py-20 relative bg-gradient-to-b from-[#09090b] via-[#12080a] to-[#09090b] border-y border-rose-950/30 overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-rose-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/70 border border-red-700/50 text-rose-300 text-xs font-bold tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-500 animate-pulse" />
            <span>Pre-Fest Hype &amp; Countdown Arena</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            The Countdown to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-white">
              National Battleground
            </span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Colleges across India are preparing their sharpest commerce delegations. The clock is ticking toward the grand convergence.
          </p>
        </div>

        {/* Countdown Timer Display */}
        <div className="max-w-4xl mx-auto glass-panel-crimson rounded-3xl p-6 sm:p-10 border border-rose-800/40 shadow-2xl relative mb-16 overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 text-rose-300 text-[11px] font-semibold border border-rose-800/60">
              <Radio className="w-3 h-3 text-rose-400 animate-ping" />
              Live Fest Countdown
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center my-4">
            {[
              { value: timeLeft.days, label: 'DAYS' },
              { value: timeLeft.hours, label: 'HOURS' },
              { value: timeLeft.minutes, label: 'MINUTES' },
              { value: timeLeft.seconds, label: 'SECONDS' },
            ].map((unit) => (
              <div key={unit.label} className="p-4 sm:p-6 rounded-2xl bg-zinc-950/70 border border-rose-900/30">
                <span className="font-heading font-extrabold text-4xl sm:text-6xl text-white block tracking-tight font-mono">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-bold tracking-widest text-rose-400 uppercase mt-2 block">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-rose-950/60 text-xs sm:text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-rose-400" />
              <span>Reporting Dates: <strong className="text-white">Central Campus, Christ University</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenRegistration('pareekshana')}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors shadow-md shadow-red-900/40"
              >
                Register Pareekshana
              </button>
              <button
                onClick={() => onOpenRegistration('prashnotri')}
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-rose-300 border border-rose-900/50 font-semibold text-xs transition-colors"
              >
                Register Prashnotri
              </button>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Video Trailer Feature + Live Announcement Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Promo Video Feature Card */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800 flex flex-col justify-between relative group overflow-hidden">
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-700/60 shadow-xl mb-6 bg-zinc-950">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80" 
                alt="CUCA National Fest Stage Teaser" 
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              {/* Play Overlay Button */}
              <button
                onClick={onOpenVideo}
                className="absolute inset-0 flex items-center justify-center group/btn"
                aria-label="Play promo teaser video"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-rose-700 p-0.5 shadow-2xl shadow-rose-900/80 group-hover/btn:scale-110 transition-transform">
                  <div className="w-full h-full rounded-full bg-zinc-950/80 flex items-center justify-center text-white backdrop-blur-sm">
                    <Play className="w-8 h-8 ml-1 fill-white" />
                  </div>
                </div>
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  Official Teaser • 4K Experience
                </span>
                <span className="text-zinc-400 font-mono">01:45</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                Audio-Visual Cinematic Showcase
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Relive the Adrenaline, Intellectual Fury &amp; Triumphs
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Watch how hundreds of elite business minds clash in boardroom crises, forensic audits, and buzzer showdowns.
              </p>
            </div>
          </div>

          {/* Real-time Announcements & Updates Feed */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                  <Radio className="w-4 h-4 text-rose-500 animate-pulse" />
                  Event Bulletins &amp; Alerts
                </h3>
                <span className="text-[11px] font-semibold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                  Live Dispatch
                </span>
              </div>

              <div className="space-y-4">
                {updates.map((upd, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-rose-300">
                        {upd.tag}
                      </span>
                      <span className="text-[10px] text-zinc-500">{upd.time}</span>
                    </div>
                    <p className="text-xs text-zinc-300 font-medium leading-snug">
                      {upd.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-800/80">
              <a
                href="#live-arena"
                className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-rose-400" />
                <span>Access Live Fest Scoreboard &amp; Schedules</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>
          </div>

        </div>

        {/* Past Editions Testimonials & Press Mentions */}
        <div className="glass-panel rounded-3xl p-8 border border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-800">
            <div>
              <span className="text-rose-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                Verified Delegations &amp; Juror Accolades
              </span>
              <h3 className="font-heading font-bold text-2xl text-white mt-1">
                Reflections from Past National Champions
              </h3>
            </div>
            
            {/* Press Mention Badges */}
            <div className="flex items-center gap-4 text-xs font-semibold text-zinc-400">
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">The Hindu</span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">Times of India</span>
              <span className="px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800">Mint Daily</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-6 h-6 text-rose-600/40 mb-3" />
                  <p className="text-xs text-zinc-300 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-900">
                  <h4 className="text-xs font-bold text-white">{t.author}</h4>
                  <p className="text-[11px] text-rose-400 font-medium">{t.institution}</p>
                  <span className="text-[10px] text-zinc-500 mt-0.5 block">{t.edition}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
