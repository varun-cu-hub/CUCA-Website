import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  GraduationCap, 
  Mail, 
  Linkedin, 
  Instagram, 
  ShieldCheck, 
  Award, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { FACULTY_COORDINATORS, STUDENT_CORE_TEAM } from '../data/cucaData';

export const TeamSection: React.FC = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<string>('All');

  const committees = [
    'All',
    'Executive',
    'Pareekshana',
    'Prashnotri',
    'Sponsorship',
    'Marketing',
    'Technology',
    'Hospitality',
  ];

  const filteredStudents = selectedCommittee === 'All'
    ? STUDENT_CORE_TEAM
    : STUDENT_CORE_TEAM.filter((m) => m.committee === selectedCommittee);

  return (
    <section id="team" className="py-24 relative bg-gradient-to-b from-[#09090b] via-[#10080a] to-[#09090b] border-t border-rose-950/40 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-red-950/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-700/50 text-rose-300 text-xs font-bold tracking-wider uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>Leadership &amp; Committees</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            The Minds Behind <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-white">
              The Commerce Association
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base">
            Guided by venerable faculty leadership and driven by a passionate student executive council, 
            CUCA represents the zenith of student-driven commerce organization.
          </p>
        </div>

        {/* 1. Faculty Coordinators Section */}
        <div className="mb-20">
          <div className="flex items-center gap-2.5 mb-8 pb-3 border-b border-zinc-800">
            <GraduationCap className="w-5 h-5 text-rose-400" />
            <h3 className="font-heading font-bold text-xl text-white">
              Faculty Coordinators &amp; Patronage
            </h3>
            <span className="text-xs text-zinc-500 font-medium ml-auto">
              Department of Commerce, Christ University
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FACULTY_COORDINATORS.map((faculty) => (
              <div
                key={faculty.id}
                className="glass-panel p-6 rounded-2xl border border-zinc-800/80 hover:border-rose-900/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-5 border border-zinc-700/60 bg-zinc-950">
                    <img 
                      src={faculty.image} 
                      alt={faculty.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950/90 text-rose-300 border border-rose-800/60 backdrop-blur-sm">
                        {faculty.designation}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-white group-hover:text-rose-300 transition-colors">
                    {faculty.name}
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium mt-1">
                    {faculty.department}
                  </p>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    Specialization: {faculty.specialization}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <a
                    href={`mailto:${faculty.email}`}
                    className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[200px]">{faculty.email}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Student Core Team Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-3 border-b border-zinc-800">
            <div>
              <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-500" />
                Student Core Committee 2025–26
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Executive leaders, Event Heads for Pareekshana &amp; Prashnotri, and Department Directors
              </p>
            </div>

            {/* Committee Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              {committees.map((comm) => (
                <button
                  key={comm}
                  onClick={() => setSelectedCommittee(comm)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCommittee === comm
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-rose-950'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {comm}
                </button>
              ))}
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStudents.map((member) => {
              const isEventHead = member.committee === 'Pareekshana' || member.committee === 'Prashnotri';

              return (
                <div
                  key={member.id}
                  className={`glass-panel p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 ${
                    isEventHead 
                      ? 'border-rose-900/60 bg-zinc-900/70 hover:border-rose-500/80 shadow-lg shadow-rose-950/20' 
                      : 'border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <div>
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4 border border-zinc-800 bg-zinc-950">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                      
                      {/* Department / Event Head Badge */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur-md ${
                          isEventHead
                            ? 'bg-red-950 text-rose-200 border border-red-700'
                            : 'bg-zinc-950/80 text-zinc-300 border border-zinc-700'
                        }`}>
                          {member.committee}
                        </span>
                        {isEventHead && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Flagship Event Head"></span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-base text-white group-hover:text-rose-300 transition-colors">
                        {member.name}
                      </h4>
                      <p className="text-xs font-semibold text-rose-400">
                        {member.role}
                      </p>
                      <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                        "{member.tagline}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 transition-colors"
                      title={member.email}
                    >
                      <Mail className="w-3.5 h-3.5 text-rose-500" />
                      <span className="text-[11px] truncate max-w-[120px]">Contact</span>
                    </a>

                    <div className="flex items-center gap-2">
                      {member.linkedin && (
                        <a 
                          href={member.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-blue-400 transition-colors"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.instagram && (
                        <a 
                          href={member.instagram}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors"
                          aria-label="Instagram Profile"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
