import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  FileSpreadsheet, 
  Briefcase, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  Mail, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { STUDENT_CORE_TEAM } from '../data/cucaData';

interface PareekshanaSectionProps {
  onOpenRegistration: (event: 'pareekshana') => void;
}

export const PareekshanaSection: React.FC<PareekshanaSectionProps> = ({ onOpenRegistration }) => {
  const pareekshanaHeads = STUDENT_CORE_TEAM.filter((m) => m.committee === 'Pareekshana');

  const rounds = [
    {
      round: 'Round 1',
      title: 'Forensic Diagnostic & Screening',
      time: '90 Minutes',
      venue: 'Commerce Computer Lab 3',
      desc: 'Teams are handed audited financial statements of a distressed enterprise to uncover disguised liabilities, off-balance-sheet vehicles, and creative EBITDA manipulation.',
    },
    {
      round: 'Round 2',
      title: 'Crisis Management & Hostile Defense',
      time: '120 Minutes',
      venue: 'Block II Conference Hall',
      desc: 'Simulated high-pressure board meeting responding to sudden activist shareholder intervention, supply chain collapse, and regulatory antitrust scrutiny.',
    },
    {
      round: 'Round 3',
      title: 'Cross-Border M&A & Valuation Modeling',
      time: '120 Minutes',
      venue: 'Sky Lounge Boardroom',
      desc: 'Detailed financial modeling covering DCF, precedent transactions, synergy calculation, and term-sheet negotiation against adversary delegations.',
    },
    {
      round: 'Round 4',
      title: 'Grand Boardroom Defense (Final Pitch)',
      time: 'Live Defense',
      venue: 'Main Auditorium Stage',
      desc: 'Top 3 finalist teams defend their corporate restructuring blueprint before a distinguished panel of Big-4 partners, private equity directors, and academic arbiters.',
    },
  ];

  return (
    <section id="pareekshana" className="py-24 relative bg-gradient-to-b from-[#09090b] via-[#10080a] to-[#09090b] border-t border-rose-950/40 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-950/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-rose-300 text-xs font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
              Flagship Strategic Simulation • 4-Member Format
            </div>
            
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Pareekshana <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-white">
                Corporate Forensics &amp; Valuation Crucible
              </span>
            </h2>

            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              Regarded as India’s most rigorous collegiate business simulation. Pareekshana tests the boundaries of audit intelligence, 
              strategic acumen, corporate governance, and crisis resilience.
            </p>
          </div>

          {/* Quick Registration Card */}
          <div className="glass-panel p-5 rounded-2xl border border-red-900/50 flex flex-col justify-between shrink-0 max-w-xs">
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-400">Team Structure</span>
                <span className="text-rose-400 font-bold">Strictly 4 Members</span>
              </div>
              <div className="text-xs text-zinc-300 space-y-1">
                <div className="flex justify-between">
                  <span>Early Bird (Team):</span>
                  <span className="font-bold text-white">₹1,200</span>
                </div>
                <div className="flex justify-between">
                  <span>Regular Pass (Team):</span>
                  <span className="text-zinc-400">₹1,600</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onOpenRegistration('pareekshana')}
              className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-red-950/60 transition-all flex items-center justify-center gap-2"
            >
              <span>Register 4-Member Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4 Rounds Architectural Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {rounds.map((r, idx) => (
            <div 
              key={r.round}
              className="p-6 rounded-2xl bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-red-900/60 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest px-2 py-0.5 rounded bg-red-950/60 border border-red-800/40">
                    {r.round}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">{r.time}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-white mb-2 leading-snug">
                  {r.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {r.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-1.5">
                <span className="text-zinc-500">Venue:</span>
                <span className="text-zinc-300 font-medium">{r.venue}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Event Heads Contact Strip strictly requested by PDF */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-zinc-800">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                Official Event Leadership
              </span>
              <h3 className="font-heading font-bold text-xl text-white">
                Pareekshana Event Heads &amp; Inquiries
              </h3>
            </div>
            <div className="text-xs text-zinc-400">
              Department of Commerce • Christ University
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pareekshanaHeads.map((head) => (
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
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-rose-300 border border-red-800/50 font-semibold">
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
