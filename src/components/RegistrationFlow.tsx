import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Users, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  QrCode, 
  Printer, 
  Download, 
  Clock, 
  CreditCard, 
  Building2, 
  AlertCircle,
  Sparkles,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ParticipantInfo, RegistrationData } from '../types';

interface RegistrationFlowProps {
  initialEvent?: 'pareekshana' | 'prashnotri';
  onClose?: () => void;
  isModal?: boolean;
}

export const RegistrationFlow: React.FC<RegistrationFlowProps> = ({ 
  initialEvent = 'pareekshana',
  onClose,
  isModal = false
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedEvent, setSelectedEvent] = useState<'pareekshana' | 'prashnotri'>(initialEvent);
  
  // Institution & Team details
  const [teamName, setTeamName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [city, setCity] = useState('');
  const [needsAccommodation, setNeedsAccommodation] = useState(false);

  // Pareekshana requires 4 members; Prashnotri requires 2 members
  const [leader, setLeader] = useState<ParticipantInfo>({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    yearOfStudy: '3rd Year B.Com',
  });

  const [member2, setMember2] = useState<ParticipantInfo>({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    yearOfStudy: '3rd Year B.Com',
  });

  const [member3, setMember3] = useState<ParticipantInfo>({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    yearOfStudy: '2nd Year B.Com',
  });

  const [member4, setMember4] = useState<ParticipantInfo>({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    yearOfStudy: '2nd Year B.Com',
  });

  const [idFileName, setIdFileName] = useState<string>('Delegation_IDs_Combined.pdf');
  const [hasUploadedId, setHasUploadedId] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedPass, setConfirmedPass] = useState<RegistrationData | null>(null);

  // Pricing calculations
  const isEarlyBird = true; // Early bird status
  const pareekshanaPrice = isEarlyBird ? 1200 : 1600; // per 4-pax team
  const prashnotriPrice = isEarlyBird ? 600 : 800;    // per 2-pax team

  const currentPrice = selectedEvent === 'pareekshana' ? pareekshanaPrice : prashnotriPrice;
  const teamSize = selectedEvent === 'pareekshana' ? 4 : 2;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFileName(e.target.files[0].name);
      setHasUploadedId(true);
    }
  };

  const handleCompletePaymentAndRegister = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const membersList = selectedEvent === 'pareekshana' 
        ? [member2, member3, member4] 
        : [member2];

      const passData: RegistrationData = {
        id: `CUCA-2025-${Math.floor(100000 + Math.random() * 900000)}`,
        event: selectedEvent,
        teamName: teamName || (selectedEvent === 'pareekshana' ? 'Apex Commerce Strategists' : 'Quiz Prodigies'),
        collegeName: collegeName || 'St. Xavier’s College',
        city: city || 'Mumbai',
        leader: leader.name ? leader : {
          name: 'Varun Adhitya',
          email: 'varun.adhitya@college.edu',
          phone: '+91 98451 23456',
          studentId: 'ST-COMM-228',
          yearOfStudy: '3rd Year B.Com',
        },
        members: membersList,
        needsAccommodation,
        timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        amountPaid: currentPrice,
        paymentRef: `UPI-TXN-${Date.now().toString().slice(-8)}`,
        status: 'Confirmed',
      };

      setConfirmedPass(passData);
      setCurrentStep(4);

      // Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#be123c', '#ffffff', '#fb7185'],
        });
      } catch (err) {
        // fallback
      }
    }, 1200);
  };

  return (
    <div className={`relative ${isModal ? 'p-0' : 'py-20 max-w-5xl mx-auto px-4'}`}>
      
      {/* Container Card */}
      <div className="glass-panel-crimson rounded-3xl border border-rose-900/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden bg-[#0e090b]/95">
        
        {/* Modal Close Button */}
        {isModal && onClose && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors z-20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Section Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-rose-950/60">
            <div>
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                Official Delegate Onboarding Portal
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-1">
                National Competition Registration
              </h2>
            </div>

            {/* Early bird status badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-700/60 text-xs font-semibold text-rose-300">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span>Early Bird Pricing Active: Save 25%</span>
            </div>
          </div>

          {/* Stepper Bar */}
          <div className="mt-6 grid grid-cols-4 gap-2 text-center text-xs font-semibold">
            {[
              { num: 1, label: 'Select Event & College' },
              { num: 2, label: `Team Details (${teamSize}-Pax)` },
              { num: 3, label: 'Verification & ID' },
              { num: 4, label: 'Pass & Receipt' },
            ].map((s) => (
              <div 
                key={s.num}
                className={`p-2.5 rounded-xl border transition-all ${
                  currentStep === s.num
                    ? 'bg-rose-950 border-rose-600 text-white shadow-md'
                    : currentStep > s.num
                    ? 'bg-zinc-900/80 border-rose-900/40 text-rose-400'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                }`}
              >
                <div className="font-mono text-xs">{s.num}. {s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Event & College Info */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Event Selection Switch */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                1. Select Flagship Initiative
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pareekshana Choice */}
                <div
                  onClick={() => setSelectedEvent('pareekshana')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedEvent === 'pareekshana'
                      ? 'bg-red-950/40 border-rose-500 shadow-xl shadow-rose-950/40'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-red-950 text-rose-300 border border-red-800">
                      4-Member Team
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      ₹{pareekshanaPrice} <span className="text-xs font-normal text-zinc-400">/ team</span>
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Pareekshana '25
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Corporate forensics, audit screening, crisis boardroom defense &amp; M&amp;A valuation crucible.
                  </p>
                  <div className="mt-3 text-[11px] text-zinc-500 flex justify-between">
                    <span>Regular Fee: ₹1,600</span>
                    <span className="text-emerald-400 font-semibold">Early Bird Active</span>
                  </div>
                </div>

                {/* Prashnotri Choice */}
                <div
                  onClick={() => setSelectedEvent('prashnotri')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    selectedEvent === 'prashnotri'
                      ? 'bg-rose-950/40 border-rose-500 shadow-xl shadow-rose-950/40'
                      : 'bg-zinc-950/60 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      2-Member Duo
                    </span>
                    <span className="text-sm font-extrabold text-white">
                      ₹{prashnotriPrice} <span className="text-xs font-normal text-zinc-400">/ team</span>
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    Prashnotri '25
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    National commerce, macroeconomics, capital markets, trivia &amp; rapid-fire buzzer battle.
                  </p>
                  <div className="mt-3 text-[11px] text-zinc-500 flex justify-between">
                    <span>Regular Fee: ₹800</span>
                    <span className="text-emerald-400 font-semibold">Early Bird Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Institution & Team Details Form */}
            <div className="space-y-4 pt-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                2. Institution &amp; Delegation Data
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-zinc-400 mb-1 block">Delegation / Team Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Strategic Arbitrage"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 mb-1 block">College / University Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SRCC, St. Xavier's, Loyola, Christ"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 mb-1 block">City / State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai, New Delhi, Bengaluru"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 cursor-pointer hover:border-zinc-700">
                    <input
                      type="checkbox"
                      checked={needsAccommodation}
                      onChange={(e) => setNeedsAccommodation(e.target.checked)}
                      className="rounded border-zinc-700 text-rose-600 focus:ring-rose-500 w-4 h-4"
                    />
                    <span className="text-xs text-zinc-300">
                      Request Campus Guest House / Accommodation
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Forward Button */}
            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-rose-950/60"
              >
                <span>Continue to Team Roster ({teamSize} Members)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Team Roster (4 Members for Pareekshana, 2 for Prashnotri) */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 text-xs text-rose-300 flex items-center justify-between">
              <span>
                Event: <strong className="text-white uppercase">{selectedEvent}</strong> • Required Team Size: <strong className="text-white">{teamSize} Participants</strong>
              </span>
              <span className="text-[11px] text-zinc-400">All members must be bona-fide college students</span>
            </div>

            {/* Member 1: Leader */}
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Participant 1 (Team Leader &amp; Primary POC)
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">Mandatory</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Leader Name"
                    value={leader.name}
                    onChange={(e) => setLeader({ ...leader, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Official Email *</label>
                  <input
                    type="email"
                    placeholder="leader@college.edu"
                    value={leader.email}
                    onChange={(e) => setLeader({ ...leader, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">WhatsApp Mobile *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={leader.phone}
                    onChange={(e) => setLeader({ ...leader, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* Member 2 */}
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                Participant 2
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Participant 2 Name"
                    value={member2.name}
                    onChange={(e) => setMember2({ ...member2, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Email *</label>
                  <input
                    type="email"
                    placeholder="member2@college.edu"
                    value={member2.email}
                    onChange={(e) => setMember2({ ...member2, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-zinc-400 mb-1 block">Mobile Number *</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43211"
                    value={member2.phone}
                    onChange={(e) => setMember2({ ...member2, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                  />
                </div>
              </div>
            </div>

            {/* If Pareekshana: Members 3 and 4 required! */}
            {selectedEvent === 'pareekshana' && (
              <>
                {/* Member 3 */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                    Participant 3 (Pareekshana Mandate)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Participant 3 Name"
                        value={member3.name}
                        onChange={(e) => setMember3({ ...member3, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Email *</label>
                      <input
                        type="email"
                        placeholder="member3@college.edu"
                        value={member3.email}
                        onChange={(e) => setMember3({ ...member3, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Mobile Number *</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43212"
                        value={member3.phone}
                        onChange={(e) => setMember3({ ...member3, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Member 4 */}
                <div className="p-5 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                    Participant 4 (Pareekshana Mandate)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        placeholder="Participant 4 Name"
                        value={member4.name}
                        onChange={(e) => setMember4({ ...member4, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Email *</label>
                      <input
                        type="email"
                        placeholder="member4@college.edu"
                        value={member4.email}
                        onChange={(e) => setMember4({ ...member4, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-zinc-400 mb-1 block">Mobile Number *</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43213"
                        value={member4.phone}
                        onChange={(e) => setMember4({ ...member4, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Stepper Navigation */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow-lg shadow-rose-950/60"
              >
                <span>Proceed to ID Verification &amp; Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Verification, Document/ID upload & Payment Preview */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Upload Area */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block">
                College ID Proof &amp; Verification Upload
              </label>
              <div className="p-6 rounded-2xl bg-zinc-950/80 border-2 border-dashed border-zinc-800 hover:border-rose-700/60 transition-colors text-center relative cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-white">
                  {hasUploadedId ? `Attached: ${idFileName}` : 'Click or drag & drop combined student IDs (PDF or JPG)'}
                </p>
                <p className="text-[11px] text-zinc-500 mt-1">
                  Upload combined college ID cards of all {teamSize} participants for swift spot verification.
                </p>
              </div>
            </div>

            {/* Fee Breakdown & Order Summary */}
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-3">
              <h3 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
                Registration Fee Invoice Summary
              </h3>

              <div className="divide-y divide-zinc-800/80 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Competition:</span>
                  <span className="font-bold text-white uppercase">{selectedEvent} '25</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Team Size:</span>
                  <span className="text-zinc-200">{teamSize} Participants ({selectedEvent === 'pareekshana' ? '4-Pax Delegation' : '2-Pax Duo'})</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Base Registration Fee:</span>
                  <span className="text-zinc-200">₹{currentPrice} per team</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-zinc-400">Hospitality &amp; Kit Pass:</span>
                  <span className="text-emerald-400 font-semibold">Included (Complimentary)</span>
                </div>
                <div className="py-3 flex justify-between text-sm font-bold">
                  <span className="text-white">Total Amount Due:</span>
                  <span className="text-rose-400 font-mono text-base">₹{currentPrice}.00</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                disabled={isProcessing}
                onClick={handleCompletePaymentAndRegister}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs tracking-wider uppercase flex items-center gap-2 shadow-xl shadow-rose-950/70 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    <span>Processing Gateway...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Authorize Payment &amp; Issue Pass (₹{currentPrice})</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Verifiable Digital Pass & Instant Receipt */}
        {currentStep === 4 && confirmedPass && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Success Banner */}
            <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h3 className="font-bold text-sm text-white">Registration &amp; Delegation Seat Confirmed!</h3>
                <p className="text-xs text-emerald-300/90">
                  Your team pass has been issued and logged into the Department of Commerce portal.
                </p>
              </div>
            </div>

            {/* Printable Digital Delegation Badge / Ticket */}
            <div 
              id="cuca-printable-pass"
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-[#18090d] border border-rose-800/60 shadow-2xl relative overflow-hidden"
            >
              {/* Background watermark */}
              <div className="absolute right-0 top-0 bottom-0 w-48 bg-rose-600/5 blur-2xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center font-crest font-bold text-xl text-white">
                    C
                  </div>
                  <div>
                    <h4 className="font-heading font-extrabold text-lg text-white">
                      CUCA DELEGATE CREDENTIAL
                    </h4>
                    <p className="text-xs text-zinc-400">
                      Christ (Deemed to be University), Bengaluru
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] text-zinc-500 uppercase block">Reference Token</span>
                  <span className="text-sm font-bold text-rose-400 tracking-wider">
                    {confirmedPass.id}
                  </span>
                </div>
              </div>

              {/* Pass Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Event Track</span>
                  <span className="font-bold text-white uppercase text-sm">
                    {confirmedPass.event}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Team Name</span>
                  <span className="font-bold text-white text-sm">
                    {confirmedPass.teamName}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">College / Institution</span>
                  <span className="font-bold text-zinc-200">
                    {confirmedPass.collegeName} ({confirmedPass.city})
                  </span>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Delegation Lead</span>
                  <span className="font-bold text-rose-300">
                    {confirmedPass.leader.name}
                  </span>
                </div>
              </div>

              {/* Roster & QR Code */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
                <div className="space-y-1.5 w-full sm:w-auto">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Verified Roster (Format: {confirmedPass.event === 'pareekshana' ? '4 Members' : '2 Members'}):
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-white font-medium">
                      1. {confirmedPass.leader.name} (Lead)
                    </span>
                    {confirmedPass.members.map((m, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-medium">
                        {idx + 2}. {m.name || `Delegate #${idx + 2}`}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-zinc-500 pt-1">
                    Payment Reference: <strong className="text-zinc-400">{confirmedPass.paymentRef}</strong> • Status: Verified
                  </div>
                </div>

                {/* QR Code graphic */}
                <div className="p-3 bg-white rounded-xl shrink-0 flex flex-col items-center">
                  <QrCode className="w-16 h-16 text-black" />
                  <span className="text-[9px] font-mono text-zinc-800 mt-1 font-bold">SCAN AT REG DESK</span>
                </div>
              </div>
            </div>

            {/* Print & Reset Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-semibold border border-zinc-800 flex items-center gap-2 transition-colors"
              >
                <Printer className="w-4 h-4 text-rose-400" />
                <span>Print / Save Credential (PDF)</span>
              </button>

              <button
                onClick={() => {
                  setCurrentStep(1);
                  setConfirmedPass(null);
                  if (onClose) onClose();
                }}
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors"
              >
                {isModal ? 'Done & Close' : 'Register Another Team'}
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};
