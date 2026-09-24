import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Calendar, 
  Search, 
  Filter, 
  RefreshCw, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Download, 
  AlertCircle, 
  FileText,
  Radio,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_LEADERBOARD, FEST_SCHEDULE } from '../data/cucaData';
import { LeaderboardEntry } from '../types';

export const LivePortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'schedule' | 'guidelines'>('leaderboard');
  const [selectedEvent, setSelectedEvent] = useState<'All' | 'Pareekshana' | 'Prashnotri'>('All');
  const [selectedRound, setSelectedRound] = useState<'cumulative' | 'round1' | 'round2' | 'round3'>('cumulative');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [scheduleFilter, setScheduleFilter] = useState<'All' | 'Pareekshana' | 'Prashnotri' | 'General'>('All');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  // Filter leaderboard
  const filteredLeaderboard = leaderboardData.filter((entry) => {
    const matchesEvent = selectedEvent === 'All' || entry.event === selectedEvent;
    const matchesSearch = 
      entry.teamName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.college.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesEvent && matchesSearch;
  }).sort((a, b) => {
    if (selectedRound === 'round1') return b.round1Score - a.round1Score;
    if (selectedRound === 'round2') return b.round2Score - a.round2Score;
    if (selectedRound === 'round3') return b.round3Score - a.round3Score;
    return b.finalScore - a.finalScore;
  });

  const filteredSchedule = FEST_SCHEDULE.filter((item) => {
    if (scheduleFilter === 'All') return true;
    return item.event === scheduleFilter;
  });

  return (
    <section id="live-arena" className="py-24 relative bg-[#09090b] border-t border-rose-950/40 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-red-950/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-700/50 text-rose-300 text-xs font-bold tracking-wider uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
              </span>
              <span>Live Fest Arena &amp; Telemetry</span>
            </div>
            
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              During the Fest: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-white">
                Live Scoreboards &amp; Schedules
              </span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              Monitor collegiate standings by round, track room allocations, verify reporting times, and download official rulebooks.
            </p>
          </div>

          {/* Navigation Pill Switches */}
          <div className="flex items-center p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Live Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'schedule'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Rounds Schedule
            </button>
            <button
              onClick={() => setActiveTab('guidelines')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'guidelines'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Instructions &amp; Dossier
            </button>
          </div>
        </div>

        {/* Tab 1: Live Leaderboard by Round */}
        {activeTab === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Control Bar: Event filter, round filter, search & refresh */}
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              
              {/* Event toggle */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-400 hidden sm:inline">Event:</span>
                {(['All', 'Pareekshana', 'Prashnotri'] as const).map((ev) => (
                  <button
                    key={ev}
                    onClick={() => setSelectedEvent(ev)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      selectedEvent === ev
                        ? 'bg-zinc-100 text-black'
                        : 'bg-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {ev}
                  </button>
                ))}
              </div>

              {/* Round filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-zinc-400 hidden md:inline">Score View:</span>
                <select
                  value={selectedRound}
                  onChange={(e) => setSelectedRound(e.target.value as any)}
                  className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-rose-600"
                >
                  <option value="cumulative">Cumulative Tally</option>
                  <option value="round1">Round 1 Scores</option>
                  <option value="round2">Round 2 Scores</option>
                  <option value="round3">Round 3 Scores</option>
                </select>
              </div>

              {/* Search & Refresh */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-60">
                  <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search team or college..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-600"
                  />
                </div>
                <button
                  onClick={handleRefresh}
                  title="Simulate score update"
                  className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-rose-400' : ''}`} />
                </button>
              </div>

            </div>

            {/* Scoreboard Table */}
            <div className="glass-panel rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-zinc-950/80 border-b border-zinc-800 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                    <tr>
                      <th className="px-5 py-3.5">Rank</th>
                      <th className="px-5 py-3.5">Team &amp; Delegation</th>
                      <th className="px-5 py-3.5">Event</th>
                      <th className="px-5 py-3.5 text-center">R1</th>
                      <th className="px-5 py-3.5 text-center">R2</th>
                      <th className="px-5 py-3.5 text-center">R3</th>
                      <th className="px-5 py-3.5 text-right font-extrabold text-rose-400">Total Points</th>
                      <th className="px-5 py-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {filteredLeaderboard.map((team, idx) => (
                      <tr 
                        key={`${team.teamName}-${team.event}`}
                        className={`hover:bg-zinc-900/50 transition-colors ${
                          idx < 3 ? 'bg-zinc-900/20' : ''
                        }`}
                      >
                        <td className="px-5 py-4 font-mono font-bold">
                          {idx === 0 ? (
                            <span className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 inline-flex items-center justify-center text-xs">
                              1
                            </span>
                          ) : idx === 1 ? (
                            <span className="w-6 h-6 rounded-full bg-zinc-400/20 text-zinc-300 border border-zinc-400/40 inline-flex items-center justify-center text-xs">
                              2
                            </span>
                          ) : idx === 2 ? (
                            <span className="w-6 h-6 rounded-full bg-amber-700/20 text-amber-600 border border-amber-700/40 inline-flex items-center justify-center text-xs">
                              3
                            </span>
                          ) : (
                            <span className="text-zinc-500 pl-2">#{idx + 1}</span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-white text-sm">{team.teamName}</div>
                          <div className="text-xs text-zinc-400 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            <span>{team.college}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            team.event === 'Pareekshana' 
                              ? 'bg-red-950 text-rose-300 border border-red-800/40' 
                              : 'bg-rose-950 text-rose-300 border border-rose-800/40'
                          }`}>
                            {team.event}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-center font-mono text-zinc-300">{team.round1Score}</td>
                        <td className="px-5 py-4 text-center font-mono text-zinc-300">{team.round2Score}</td>
                        <td className="px-5 py-4 text-center font-mono text-zinc-300">{team.round3Score}</td>
                        <td className="px-5 py-4 text-right font-mono font-extrabold text-base text-white">
                          {team.finalScore}
                        </td>
                        <td className="px-5 py-4 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            team.status === 'Qualified'
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50'
                              : team.status === 'Active'
                              ? 'bg-blue-950 text-blue-400 border border-blue-800/50'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {team.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredLeaderboard.length === 0 && (
                <div className="text-center py-12 text-zinc-500 text-xs">
                  No matching teams found for the selected query.
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab 2: Rounds Schedule & Venues */}
        {activeTab === 'schedule' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              {(['All', 'General', 'Pareekshana', 'Prashnotri'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setScheduleFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                    scheduleFilter === cat
                      ? 'bg-rose-600 text-white'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Schedule timeline list */}
            <div className="space-y-4">
              {filteredSchedule.map((item) => (
                <div
                  key={item.id}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 bg-red-950/70 border border-red-800/40 px-2.5 py-0.5 rounded-md">
                        <Clock className="w-3.5 h-3.5" />
                        {item.time}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                        {item.event}
                      </span>
                      <span className="text-xs text-zinc-400 font-medium">
                        {item.round}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="md:text-right shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-800/80 space-y-1">
                    <div className="text-xs text-zinc-400 flex items-center md:justify-end gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      <span className="font-semibold text-zinc-200">{item.venue}</span>
                    </div>
                    <div className="text-[11px] text-zinc-500">
                      POC: {item.coordinator}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab 3: Official Guidelines & Rulebook Dossier */}
        {activeTab === 'guidelines' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Pareekshana Guidelines */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-red-950/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  Pareekshana Official Dossier
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">
                  4-Member Team Guidelines &amp; Protocol
                </h3>
                
                <ul className="space-y-3 text-xs text-zinc-300 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Delegations must report strictly as a <strong>4-member composite unit</strong>. Substitutions mid-event will result in disqualification.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Each team must carry at least two laptops with spreadsheet modeling software (Excel) installed. Internet access may be restricted during forensic screening.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Attire mandate: Strictly Western Formal / Business Formal for all rounds and courtroom presentations.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Valid institutional college identity card is mandatory for campus entry and document verification.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">Document ID: CUCA-PAR-2025.pdf</span>
                <button 
                  onClick={() => alert('Pareekshana 2025 Official Handbook (v1.2) downloaded.')}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-rose-300 text-xs font-semibold border border-zinc-800 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Handbook</span>
                </button>
              </div>
            </div>

            {/* Prashnotri Guidelines */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-rose-950/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Radio className="w-4 h-4 text-rose-500" />
                  Prashnotri Official Dossier
                </div>
                <h3 className="font-heading font-bold text-xl text-white mb-3">
                  2-Member Duo Rules &amp; Scoring Matrix
                </h3>
                
                <ul className="space-y-3 text-xs text-zinc-300 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Delegations must strictly consist of <strong>exactly 2 participants (Duo)</strong> representing the same college or university.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Written prelims will consist of 35 multiple-choice &amp; short-answer commerce questions. Ties will be broken via designated star questions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>Buzzer and pounce rounds feature severe negative markings (-10 points). False buzzer triggers carry penalty.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>The Quizmaster’s decision is final and binding on all matters of answer interpretation and disputes.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">Document ID: CUCA-PRASH-2025.pdf</span>
                <button 
                  onClick={() => alert('Prashnotri 2025 Official Quiz Blueprint downloaded.')}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-rose-300 text-xs font-semibold border border-zinc-800 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Blueprint</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
};
