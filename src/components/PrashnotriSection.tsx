import React from 'react';
import { motion } from 'motion/react';
import { 
  HelpCircle, 
  Users2, 
  Award, 
  Zap, 
  Flame, 
  ArrowRight, 
  Mail, 
  Sparkles,
  BookOpen,
  Volume2
} from 'lucide-react';
import { STUDENT_CORE_TEAM } from '../data/cucaData';

interface PrashnotriSectionProps {
  onOpenRegistration: (event: 'prashnotri') => void;
}

export const PrashnotriSection: React.FC<PrashnotriSectionProps> = ({ onOpenRegistration }) => {
  const prashnotriHeads = STUDENT_CORE_TEAM.filter((m) => m.committee === 'Prashnotri');

  const quizPhases = [
    {
      phase: 'Phase 1',
      name: 'Written Commerce Gauntlet (Prelims)',
      desc: '35 cryptic and analytical questions across economic doctrines, corporate mergers, tax litigation, and stock market lore. Top 8 teams advance.',
      metric: '35 Questions • 45 Mins',
    },
    {
      phase: 'Phase 2',
      name: 'Visual Grid & Corporate Rebranding',
      desc: 'Deciphering obscure logos, balance sheet abnormalities, forensic transaction footprints, and executive timeline puzzles.',
      metric: 'Direct & Pass Format',
    },
    {
      phase: 'Phase 3',
      name: 'Audio-Visual & Market Buzzer Arena',
      desc: 'Historical IPO audio clips, parliamentary budget excerpts, and ticker simulations. Positive +20 / Negative -10 pounce scoring.',
      metric: 'Buzzer + Pounce Mechanism',
    },
    {
      phase: 'Phase 4',
      name: 'The 60-Second Boardroom Blitz (Finale)',
      desc: 'The ultimate high-speed rapid fire gauntlet where the top 3 duos battle for national commerce supremacy and the winner’s purse.',
      metric: 'High Stakes Sudden Death',
    },
  ];

  return (
    <section id="prashnotri" className="py-24 relative bg-[#09090b] border-t border-zinc-800/80 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-rose-950/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-700/60 text-rose-300 text-xs font-bold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5 text-rose-400" />
              National Commerce &amp; Business Quiz • 2-Member Format
            </div>
            
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Prashnotri <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-white">
                The National Commerce Quiz Battlefield
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              India's premier intellect test for commerce prodigies. Prashnotri is renowned for its intellectual rigor, 
              fiendishly clever questions, and pulse-pounding buzzer rounds.
            </p>
          </div>

          {/* Quick Registration Card */}
          <div className="glass-panel p-5 rounded-2xl border border-rose-900/50 flex flex-col justify-between shrink-0 max-w-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-400">Team Structure</span>
                <span className="text-rose-400 font-bold">Strictly 2 Members (Duo)</span>
              </div>
              <div className="text-xs text-zinc-300 space-y-1">
                <div className="flex justify-between">
                  <span>Early Bird (Duo):</span>
                  <span className="font-bold text-white">₹600</span>
                </div>
                <div className="flex justify-between">
                  <span>Regular Pass (Duo):</span>
                  <span className="text-zinc-400">₹800</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenRegistration('prashnotri')}
              className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-rose-950/60 transition-all flex items-center justify-center gap-2"
            >
              <span>Register 2-Member Duo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Quiz Phases Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quizPhases.map((q) => (
            <div 
              key={q.phase}
              className="p-6 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-rose-900/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40">
                    {q.phase}
                  </span>
                  <span className="text-[11px] text-zinc-500">{q.metric}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2 leading-snug">
                  {q.name}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {q.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-zinc-300">Live Stage Buzzer Setup</span>
              </div>
            </div>
          ))}
        </div>

        {/* Event Heads Contact Strip */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Official Quiz Leadership
              </span>
              <h3 className="font-heading font-bold text-xl text-white">
                Prashnotri Event Heads &amp; Quizmaster Panel
              </h3>
            </div>
            <div className="text-xs text-zinc-400">
              Department of Commerce • Christ University
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prashnotriHeads.map((head) => (
              <div 
                key={head.id} 
                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80"
              >
                <img 
                  src={head.image} 
                  alt={head.name} 
                  className="w-14 h-14 rounded-xl object-cover border border-rose-900/50"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{head.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/50 font-semibold">
                      {head.role}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400">{head.tagline}</p>
                  <a 
                    href={`mailto:${head.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium"
                  >
                    <Mail className="w-3 h-3" />
                    <span>{head.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
