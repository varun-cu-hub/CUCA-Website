import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Mail, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Bot,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';
import { INITIAL_SUPPORT_QUERIES } from '../data/cucaData';
import { SupportQuery } from '../types';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  isTicketConfirmation?: boolean;
  ticketId?: string;
  showEscalateAction?: boolean;
}

interface ChatbotWidgetProps {
  onOpenAdminPortal?: () => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ 
  onOpenAdminPortal,
  isOpenExternal,
  onCloseExternal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'bot',
      text: 'Greetings from the Christ University Commerce Association (CUCA)! How may I assist your delegation with fest rules, schedules, accommodations, or event guidelines?',
      time: 'Just now',
    },
  ]);
  const [showEscalationForm, setShowEscalationForm] = useState(false);
  const [escalationData, setEscalationData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    category: 'General Delegation Query',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState<SupportQuery | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpenExternal !== undefined) {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showEscalationForm]);

  const quickPrompts = [
    'Pareekshana team format rules?',
    'Is campus accommodation provided?',
    'Can different college students team up?',
    'What is the dress code?',
    'Escalate query to Admin Secretariat',
  ];

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');

    // Process Bot Response
    setTimeout(() => {
      generateBotResponse(text);
    }, 600);
  };

  const generateBotResponse = (queryText: string) => {
    const q = queryText.toLowerCase();

    // Check if asking to escalate
    if (q.includes('escalate') || q.includes('admin') || q.includes('mail') || q.includes('secretariat') || q.includes('contact person')) {
      setEscalationData((prev) => ({ ...prev, question: queryText }));
      setShowEscalationForm(true);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'I have opened the Official Secretariat Escalation Card below. Please provide your delegation details so an executive admin coordinator can review and mail a tailored solution to your inbox.',
          time: 'Just now',
        },
      ]);
      return;
    }

    let reply = '';
    let showEscalate = false;

    if (q.includes('pareekshana') && (q.includes('team') || q.includes('member') || q.includes('size') || q.includes('format'))) {
      reply = 'Pareekshana mandates an elite 4-member delegation format. All 4 participants must be enrolled undergraduate commerce or management students. Cross-specialization within the same college is allowed.';
    } else if (q.includes('prashnotri') && (q.includes('team') || q.includes('member') || q.includes('size') || q.includes('format'))) {
      reply = 'Prashnotri is conducted in a strict 2-member team duo format. It features high-speed written prelims followed by live on-stage buzzer rounds with negative pounces.';
    } else if (q.includes('accommodation') || q.includes('stay') || q.includes('hotel') || q.includes('hostel') || q.includes('guest house')) {
      reply = 'Subsidized campus guest house accommodation is available for outstation teams on a first-come, first-served basis. You can select "Campus Accommodation Required" in the registration portal or request an official early check-in pass via the Admin Desk.';
      showEscalate = true;
    } else if (q.includes('dress code') || q.includes('attire') || q.includes('formal') || q.includes('wear')) {
      reply = 'Western Business Formals are mandatory for all student participants across both event days. Blazers/suits and formal shoes are required during boardroom presentations and valedictory ceremonies.';
    } else if (q.includes('fee') || q.includes('cost') || q.includes('price') || q.includes('pay')) {
      reply = 'Early Bird registration fees are ₹1,200 for Pareekshana (4-member team) and ₹600 for Prashnotri (2-member duo). This includes delegate kits, breakfast, lunch, and entry passes.';
    } else if (q.includes('different college') || q.includes('cross college') || q.includes('mix')) {
      reply = 'All members of a registered team must belong to the same parent collegiate institution. Mixed collegiate teams are not permitted under university championship guidelines.';
    } else if (q.includes('venue') || q.includes('location') || q.includes('campus') || q.includes('address')) {
      reply = 'The festival is hosted at the Central Campus of Christ (Deemed to be University), Hosur Road, Bengaluru, Karnataka 560029. Reporting venue is Audi Block Ground Floor.';
    } else {
      // Query not covered in basic repository
      reply = "I couldn't find a direct resolution for that specific question in our public repository. Would you like to submit an official query to the CUCA Admin Secretariat? Our coordinators will review your query and send an official resolution to your email.";
      showEscalate = true;
      setEscalationData((prev) => ({ ...prev, question: queryText }));
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply,
        time: 'Just now',
        showEscalateAction: showEscalate,
      },
    ]);
  };

  const handleEscalationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!escalationData.name || !escalationData.email || !escalationData.question) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const ticketNum = Math.floor(1000 + Math.random() * 9000);
      const newQuery: SupportQuery = {
        id: `CUCA-QRY-${ticketNum}`,
        delegateName: escalationData.name,
        email: escalationData.email,
        phone: escalationData.phone || '+91 98000 00000',
        college: escalationData.college || 'Delegation Representative',
        category: escalationData.category,
        question: escalationData.question,
        status: 'Pending',
        submittedAt: 'Just now',
      };

      // Save to localStorage so admin page can view & reply
      try {
        const existing = localStorage.getItem('cuca_support_queries');
        const list: SupportQuery[] = existing ? JSON.parse(existing) : INITIAL_SUPPORT_QUERIES;
        const updated = [newQuery, ...list];
        localStorage.setItem('cuca_support_queries', JSON.stringify(updated));
        window.dispatchEvent(new Event('cuca-queries-updated'));
      } catch (err) {
        console.error('Failed saving query to storage:', err);
      }

      setTicketSuccess(newQuery);
      setIsSubmitting(false);
      setShowEscalationForm(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: `Your inquiry has been logged as Ticket #${newQuery.id}! It has been dispatched to the CUCA Admin Secretariat. An administrative coordinator will review your request and mail an official response to ${escalationData.email}.`,
          time: 'Just now',
          isTicketConfirmation: true,
          ticketId: newQuery.id,
        },
      ]);
    }, 800);
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          id="cuca-chatbot-trigger"
          className="relative group p-4 rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-red-800 text-white shadow-2xl shadow-rose-950/80 border border-rose-400/40 flex items-center justify-center cursor-pointer"
          aria-label="Open CUCA Assistance Chatbot"
        >
          <div className="absolute -inset-1 bg-rose-500 rounded-full blur-sm opacity-40 group-hover:opacity-75 transition-opacity" />
          <div className="relative">
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          </div>

          {/* Unread / Assist Badge */}
          {!isOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-600 border-2 border-[#09090b]"></span>
            </span>
          )}
        </motion.button>
      </div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            id="cuca-chatbot-window"
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[600px] bg-[#0c0c0f] border border-rose-900/50 rounded-3xl shadow-2xl shadow-black/80 flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-zinc-950 via-rose-950/40 to-zinc-950 border-b border-rose-900/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-red-900 p-0.5 shadow-md shadow-rose-950/60">
                  <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center border border-rose-500/20">
                    <Bot className="w-4 h-4 text-rose-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#09090b]"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>CUCA Secretariat Assistant</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950/70 border border-rose-700/40 text-rose-300 font-mono">
                      AI Assist
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Christ University Department of Commerce
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {onOpenAdminPortal && (
                  <button
                    onClick={() => {
                      handleClose();
                      onOpenAdminPortal();
                    }}
                    title="Open Secretariat Admin Desk"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs flex items-center gap-1 border border-zinc-800"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-rose-400" />
                    <span className="text-[10px] hidden sm:inline font-medium">Admin Desk</span>
                  </button>
                )}
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs bg-[#09090b]/80">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-lg bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400 flex-shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-br-none shadow-md shadow-rose-950/40'
                        : 'bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-[9px] text-zinc-400 block text-right mt-1 opacity-70">
                      {msg.time}
                    </span>

                    {/* Button to trigger escalation form if query not answered */}
                    {msg.showEscalateAction && !showEscalationForm && (
                      <button
                        onClick={() => setShowEscalationForm(true)}
                        className="mt-2.5 w-full py-2 px-3 rounded-xl bg-rose-950/60 hover:bg-rose-900/70 border border-rose-700/50 text-rose-200 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3 h-3 text-rose-400" />
                        <span>Escalate to Admin & Mail Solution</span>
                      </button>
                    )}

                    {/* Ticket confirmation visual card */}
                    {msg.isTicketConfirmation && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-300 text-[11px] space-y-1">
                        <div className="flex items-center gap-1.5 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Ticket Registered: {msg.ticketId}</span>
                        </div>
                        <p className="text-[10px] text-emerald-400/80">
                          The CUCA Secretariat can now review this and send the official solution via email from the Admin Portal.
                        </p>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-300 flex-shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* In-Chat Escalation Form */}
              {showEscalationForm && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-2xl bg-zinc-950 border border-rose-800/60 shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                    <div className="flex items-center gap-1.5 text-rose-400 font-bold text-xs">
                      <Mail className="w-4 h-4" />
                      <span>Admin Resolution Request</span>
                    </div>
                    <button
                      onClick={() => setShowEscalationForm(false)}
                      className="text-zinc-500 hover:text-zinc-300"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    The admin team will craft a detailed solution and email it directly to your address.
                  </p>

                  <form onSubmit={handleEscalationSubmit} className="space-y-2">
                    <div>
                      <label className="text-[10px] font-semibold text-zinc-400 block mb-1">
                        Delegate / Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={escalationData.name}
                        onChange={(e) => setEscalationData({ ...escalationData, name: e.target.value })}
                        placeholder="e.g. Siddharth Verma"
                        className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-xs outline-none focus:border-rose-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-semibold text-zinc-400 block mb-1">
                          Email (for Solution) *
                        </label>
                        <input
                          type="email"
                          required
                          value={escalationData.email}
                          onChange={(e) => setEscalationData({ ...escalationData, email: e.target.value })}
                          placeholder="delegate@college.edu"
                          className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-xs outline-none focus:border-rose-600"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-zinc-400 block mb-1">
                          College / Institution
                        </label>
                        <input
                          type="text"
                          value={escalationData.college}
                          onChange={(e) => setEscalationData({ ...escalationData, college: e.target.value })}
                          placeholder="e.g. SRCC, St. Xavier's"
                          className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-xs outline-none focus:border-rose-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-zinc-400 block mb-1">
                        Category
                      </label>
                      <select
                        value={escalationData.category}
                        onChange={(e) => setEscalationData({ ...escalationData, category: e.target.value })}
                        className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-300 text-xs outline-none focus:border-rose-600"
                      >
                        <option>Pareekshana Eligibility & Rules</option>
                        <option>Prashnotri Format & Rounds</option>
                        <option>Campus Guest House & Accommodation</option>
                        <option>Fee Invoice / Institutional Reimbursement</option>
                        <option>Special Exemption / Schedule Conflict</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-zinc-400 block mb-1">
                        Your Specific Query *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={escalationData.question}
                        onChange={(e) => setEscalationData({ ...escalationData, question: e.target.value })}
                        placeholder="Detail your request so the Secretariat can resolve it..."
                        className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-white text-xs outline-none focus:border-rose-600 resize-none"
                      />
                    </div>

                    <div className="pt-1 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowEscalationForm(false)}
                        className="w-1/2 py-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-1/2 py-2 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-950/40 hover:brightness-110 flex items-center justify-center gap-1.5"
                      >
                        {isSubmitting ? 'Dispatching...' : 'Dispatch to Admin'}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Carousel */}
            <div className="px-3 py-2 bg-zinc-950 border-t border-zinc-900 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-rose-950/50 hover:border-rose-700/50 text-zinc-400 hover:text-rose-300 border border-zinc-800 text-[10px] whitespace-nowrap transition-colors flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-zinc-950 border-t border-zinc-800/80 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask CUCA Bot or request admin support..."
                className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-xs outline-none focus:border-rose-600 placeholder-zinc-500"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim()}
                className="p-2 rounded-xl bg-rose-600 disabled:bg-zinc-800 text-white disabled:text-zinc-600 transition-colors shadow-md shadow-rose-950/40"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
