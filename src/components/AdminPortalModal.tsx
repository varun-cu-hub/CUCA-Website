import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  X, 
  Mail, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send, 
  Search, 
  Filter, 
  User, 
  Building2, 
  Calendar, 
  ExternalLink,
  Sparkles,
  RefreshCw,
  FileCheck,
  Check,
  ChevronDown
} from 'lucide-react';
import { INITIAL_SUPPORT_QUERIES } from '../data/cucaData';
import { SupportQuery } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [queries, setQueries] = useState<SupportQuery[]>([]);
  const [filterTab, setFilterTab] = useState<'All' | 'Pending' | 'Resolved'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState<SupportQuery | null>(null);

  // Email composer state
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [mailSentSuccess, setMailSentSuccess] = useState(false);

  // Load queries from localStorage
  const loadQueries = () => {
    try {
      const stored = localStorage.getItem('cuca_support_queries');
      if (stored) {
        setQueries(JSON.parse(stored));
      } else {
        setQueries(INITIAL_SUPPORT_QUERIES);
        localStorage.setItem('cuca_support_queries', JSON.stringify(INITIAL_SUPPORT_QUERIES));
      }
    } catch (e) {
      setQueries(INITIAL_SUPPORT_QUERIES);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadQueries();
    }
  }, [isOpen]);

  // Listen for query updates dispatched by the chatbot
  useEffect(() => {
    const handleUpdate = () => {
      loadQueries();
    };
    window.addEventListener('cuca-queries-updated', handleUpdate);
    return () => window.removeEventListener('cuca-queries-updated', handleUpdate);
  }, []);

  // Quick solution templates
  const solutionTemplates = [
    {
      label: 'Campus Accommodation & Early Arrival Approval',
      body: `We have reviewed your request regarding early arrival and campus accommodation.

Your delegation has been provisionally allocated rooms in the Christ University Central Campus Guest House (Block IV). You may report to the Hospitality Desk at Audi Block Ground Floor from 05:00 AM onwards. Breakfast coupons and delegate kits will be distributed upon room check-in.

Please present this confirmation email alongside your bona-fide student identity cards upon arrival at Gate 1 on Hosur Road.`,
    },
    {
      label: 'Team Member Substitution Clearance',
      body: `We have received your substitution request due to university examinations.

Under Section 4.2 of CUCA Inter-Collegiate Regulations, your substitution is hereby APPROVED provided you submit a letter signed by your College Principal or Commerce HOD at the verification desk prior to Round 1 commencement (09:00 AM).

Your revised delegate credentials will be updated in the Live Arena system immediately upon reporting.`,
    },
    {
      label: 'Official GST Tax Invoice & Reimbursement Letter',
      body: `Please find attached our official acknowledgment for registration fee payment.

Our accounts department has generated Tax Invoice #CUCA-INV-8715 under Christ University GSTIN: 29AAAAJ0934P1ZR. An endorsement certificate with our Dean's official seal has been recorded in the central repository and will be handed over to your team leader in physical form during delegate registration.`,
    },
  ];

  // When opening email composer for a query
  const handleOpenEmailComposer = (query: SupportQuery) => {
    setSelectedQuery(query);
    setEmailSubject(`[CUCA Official Resolution] Regarding Query #${query.id} - ${query.category}`);
    setEmailBody(
`Dear ${query.delegateName},

Greetings from the Christ University Commerce Association (CUCA), Department of Commerce, Christ (Deemed to be University), Bengaluru.

Regarding your inquiry (Ticket #${query.id}) regarding "${query.category}":

We have thoroughly reviewed your query regarding:
"${query.question}"

Official Resolution:
We are pleased to inform you that your request has been cleared by the Secretariat. You are fully authorized to proceed with your scheduled participation. Please ensure your team carries valid college photo ID cards and Western Business Formals.

If you require any assistance on campus, please report to the CUCA Executive Helpdesk at the Central Campus Auditorium Block.

Warm regards,
Prof. Xavier V. | Faculty Coordinator, CUCA
Dr. Georgy P. Kurien | Head of Department, Commerce
Christ (Deemed to be University), Hosur Road, Bengaluru - 560029
Email: secretariat.cuca@christuniversity.in | Tel: 080-40129100`
    );
    setMailSentSuccess(false);
  };

  const applyTemplate = (templateBody: string) => {
    if (!selectedQuery) return;
    setEmailBody(
`Dear ${selectedQuery.delegateName},

Greetings from the Christ University Commerce Association (CUCA), Department of Commerce, Christ (Deemed to be University), Bengaluru.

Regarding your inquiry (Ticket #${selectedQuery.id}) regarding "${selectedQuery.category}":

${templateBody}

Warm regards,
Prof. Xavier V. | Faculty Coordinator, CUCA
Dr. Georgy P. Kurien | Head of Department, Commerce
Christ (Deemed to be University), Hosur Road, Bengaluru - 560029
Email: secretariat.cuca@christuniversity.in | Tel: 080-40129100`
    );
  };

  const handleSendEmailResolution = () => {
    if (!selectedQuery) return;
    setIsSending(true);

    setTimeout(() => {
      // Update query in storage to resolved
      const updated = queries.map((q) => {
        if (q.id === selectedQuery.id) {
          return {
            ...q,
            status: 'Resolved' as const,
            resolvedAt: 'Just now',
            solutionNotes: emailBody.slice(0, 180) + '...',
            adminResponder: 'CUCA Executive Secretariat / Prof. Xavier V.',
          };
        }
        return q;
      });

      setQueries(updated);
      localStorage.setItem('cuca_support_queries', JSON.stringify(updated));
      setIsSending(false);
      setMailSentSuccess(true);

      setTimeout(() => {
        setSelectedQuery(null);
        setMailSentSuccess(false);
      }, 1500);
    }, 900);
  };

  // Generate mailto link for native email client
  const generateMailtoLink = () => {
    if (!selectedQuery) return '#';
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    return `mailto:${selectedQuery.email}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  // Filter queries
  const filteredQueries = queries.filter((q) => {
    const matchesTab = filterTab === 'All' ? true : q.status === filterTab;
    const matchesSearch = 
      q.delegateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const pendingCount = queries.filter((q) => q.status === 'Pending').length;
  const resolvedCount = queries.filter((q) => q.status === 'Resolved').length;

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl bg-[#0e0e12] border border-rose-900/50 rounded-3xl shadow-2xl shadow-rose-950/60 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-zinc-950 via-rose-950/40 to-zinc-950 border-b border-rose-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-900 p-0.5 shadow-md shadow-rose-950/60 flex-shrink-0">
              <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center border border-rose-500/20">
                <ShieldCheck className="w-5 h-5 text-rose-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white font-heading tracking-wide">
                  CUCA Secretariat Admin Desk
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 border border-rose-700/50 text-rose-300 font-mono font-semibold">
                  Official Portal
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                Manage unresolved inquiries from the chatbot and email official resolutions to student delegates.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadQueries}
              title="Refresh queries"
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Metric Overview Strip */}
        <div className="grid grid-cols-3 border-b border-zinc-800/80 bg-zinc-950/70 p-4 gap-3 sm:gap-4 text-xs">
          <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-zinc-400 block text-[11px]">Total Raised Queries</span>
              <span className="text-lg font-bold text-white font-mono">{queries.length}</span>
            </div>
            <Mail className="w-5 h-5 text-zinc-500" />
          </div>

          <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-center justify-between">
            <div>
              <span className="text-amber-300 block text-[11px]">Pending Solution Mail</span>
              <span className="text-lg font-bold text-amber-400 font-mono">{pendingCount}</span>
            </div>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between">
            <div>
              <span className="text-emerald-300 block text-[11px]">Mailed & Resolved</span>
              <span className="text-lg font-bold text-emerald-400 font-mono">{resolvedCount}</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 border-b border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-zinc-950/40">
          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            {(['All', 'Pending', 'Resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  filterTab === tab
                    ? 'bg-rose-600 text-white font-semibold shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {tab} ({tab === 'All' ? queries.length : tab === 'Pending' ? pendingCount : resolvedCount})
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, college, email or ticket..."
              className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 outline-none focus:border-rose-600"
            />
          </div>
        </div>

        {/* Query List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {filteredQueries.length === 0 ? (
            <div className="py-16 text-center text-zinc-500">
              <Mail className="w-8 h-8 mx-auto mb-2 text-zinc-600" />
              <p className="text-sm">No queries found matching your filter.</p>
            </div>
          ) : (
            filteredQueries.map((query) => (
              <div
                key={query.id}
                className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/90 hover:border-zinc-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/50 px-2 py-0.5 rounded border border-rose-800/40">
                      {query.id}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                      query.status === 'Resolved'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                        : 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                    }`}>
                      {query.status === 'Resolved' ? '✓ Solution Mailed' : '● Action Required'}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      {query.category}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white leading-snug">
                    "{query.question}"
                  </p>

                  <div className="flex items-center gap-4 text-xs text-zinc-400 flex-wrap">
                    <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                      <User className="w-3.5 h-3.5 text-rose-400" />
                      {query.delegateName}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-zinc-500" />
                      {query.college}
                    </span>
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Mail className="w-3.5 h-3.5 text-zinc-500" />
                      {query.email}
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      {query.submittedAt}
                    </span>
                  </div>

                  {query.solutionNotes && (
                    <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-300 mt-2">
                      <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider block mb-0.5">
                        Mailed Resolution Summary:
                      </span>
                      {query.solutionNotes}
                    </div>
                  )}
                </div>

                <div className="flex md:flex-col items-center md:items-end gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleOpenEmailComposer(query)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      query.status === 'Resolved'
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
                        : 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-rose-950/50 hover:brightness-110'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{query.status === 'Resolved' ? 'Resend / Review Solution' : 'Mail Solution'}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Email Solution Composer Drawer / Modal */}
        <AnimatePresence>
          {selectedQuery && (
            <div 
              className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
              onClick={() => setSelectedQuery(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-2xl bg-zinc-950 border border-rose-900/60 rounded-3xl p-6 shadow-2xl shadow-rose-950/50 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-rose-400 font-bold bg-rose-950/60 px-2.5 py-0.5 rounded border border-rose-800/40">
                      Ticket #{selectedQuery.id}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      Compose Official Resolution Email
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Recipient: <span className="text-white font-medium">{selectedQuery.delegateName}</span> ({selectedQuery.email})
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedQuery(null)}
                    className="p-1.5 text-zinc-400 hover:text-white bg-zinc-900 rounded-full"
                  >
                    ✕
                  </button>
                </div>

                {/* Delegate Query Context Card */}
                <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-zinc-800 text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-semibold mb-0.5">
                    Delegate Inquiry (From Chatbot)
                  </span>
                  <p className="text-zinc-200 font-medium italic">
                    "{selectedQuery.question}"
                  </p>
                </div>

                {/* Quick Solution Templates Picker */}
                <div>
                  <span className="text-[11px] font-semibold text-zinc-400 block mb-1.5">
                    Quick Official Solution Templates:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {solutionTemplates.map((tmpl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => applyTemplate(tmpl.body)}
                        className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-rose-950/50 hover:text-rose-300 text-zinc-300 border border-zinc-800 text-[11px] transition-colors text-left"
                      >
                        {tmpl.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-rose-600"
                  />
                </div>

                {/* Body Field */}
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">
                    Resolution Content (Official Christ University Commerce Association Letterhead)
                  </label>
                  <textarea
                    rows={8}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white outline-none focus:border-rose-600 font-sans leading-relaxed"
                  />
                </div>

                {/* Action Controls */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-800">
                  <a
                    href={generateMailtoLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-zinc-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Local Mail Client (Gmail / Outlook)</span>
                  </a>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSelectedQuery(null)}
                      className="w-1/2 sm:w-auto px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendEmailResolution}
                      disabled={isSending || mailSentSuccess}
                      className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-950/50 hover:brightness-110 flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {mailSentSuccess ? (
                        <>
                          <Check className="w-4 h-4 text-white" />
                          <span>Solution Sent!</span>
                        </>
                      ) : isSending ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Mailing Resolution...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Send Official Email</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
