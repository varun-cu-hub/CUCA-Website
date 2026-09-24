import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  ArrowRight, 
  CornerDownLeft, 
  Sparkles, 
  Calendar, 
  Trophy, 
  FileText, 
  Users, 
  MapPin, 
  Ticket, 
  Send,
  History,
  TrendingUp
} from 'lucide-react';
import { SEARCH_REPOSITORY } from '../data/cucaData';
import { SearchResultItem } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegistration: (event?: 'pareekshana' | 'prashnotri') => void;
  onOpenChatbot?: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onOpenRegistration,
  onOpenChatbot,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Popular search queries for Google-like predictive completions
  const popularSuggestions = [
    'Pareekshana 4-member format rules',
    'Prashnotri buzzer rules',
    'Accommodation guest house',
    'SRCC Crossroads champions',
    'Registration early bird discount',
    'Dr. Georgy Kurien HOD',
    'Dress code business formals',
  ];

  // Auto focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Compute matched items and Google-like predictive text
  const { filteredResults, predictiveSuggestions } = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return {
        filteredResults: SEARCH_REPOSITORY.slice(0, 6),
        predictiveSuggestions: popularSuggestions.slice(0, 4),
      };
    }

    // Google-style suggestions
    const suggestions = popularSuggestions.filter(s => s.toLowerCase().includes(trimmed));

    // Full repository matching with relevance scoring
    const results = SEARCH_REPOSITORY.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(trimmed);
      const matchSub = item.subtitle.toLowerCase().includes(trimmed);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(trimmed));
      const matchCat = item.category.toLowerCase().includes(trimmed);
      return matchTitle || matchSub || matchKeywords || matchCat;
    });

    return {
      filteredResults: results,
      predictiveSuggestions: suggestions.length > 0 ? suggestions : [trimmed],
    };
  }, [query]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelectResult = (item: SearchResultItem) => {
    onClose();

    if (item.actionType === 'register_pareekshana') {
      onOpenRegistration('pareekshana');
      return;
    }
    if (item.actionType === 'register_prashnotri') {
      onOpenRegistration('prashnotri');
      return;
    }
    if (item.actionType === 'chat' && onOpenChatbot) {
      onOpenChatbot();
      return;
    }

    // Smooth scroll to target section with a highlight pulse
    if (item.targetSection) {
      setTimeout(() => {
        const target = document.querySelector(item.targetSection);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.classList.add('ring-2', 'ring-rose-500', 'ring-offset-4', 'ring-offset-[#09090b]', 'transition-all', 'duration-500');
          setTimeout(() => {
            target.classList.remove('ring-2', 'ring-rose-500', 'ring-offset-4', 'ring-offset-[#09090b]');
          }, 2400);
        }
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredResults[selectedIndex]) {
        handleSelectResult(filteredResults[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Events':
        return <Calendar className="w-4 h-4 text-rose-400" />;
      case 'Achievements':
        return <Trophy className="w-4 h-4 text-amber-400" />;
      case 'Rules & Formats':
        return <FileText className="w-4 h-4 text-sky-400" />;
      case 'Leadership':
        return <Users className="w-4 h-4 text-purple-400" />;
      case 'Venues & Schedule':
        return <MapPin className="w-4 h-4 text-emerald-400" />;
      case 'Registrations':
        return <Ticket className="w-4 h-4 text-orange-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-rose-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0e0e11] border border-rose-900/40 rounded-2xl sm:rounded-3xl shadow-2xl shadow-rose-950/50 overflow-hidden"
      >
        {/* Search Input Bar (Google Suggestions Style) */}
        <div className="relative p-4 sm:p-5 border-b border-zinc-800/80 flex items-center gap-3 bg-zinc-950/60">
          <Search className="w-5 h-5 text-rose-500 flex-shrink-0 animate-pulse" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search CUCA: events, rules, achievements, faculty, passes..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm sm:text-base outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded border border-zinc-800">
            <span>ESC</span>
          </div>
        </div>

        {/* Google-like instant suggestion chips */}
        <div className="px-4 py-2.5 bg-zinc-900/40 border-b border-zinc-800/50 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1 whitespace-nowrap">
            <TrendingUp className="w-3 h-3 text-rose-400" />
            Suggestions:
          </span>
          {predictiveSuggestions.map((suggestion, idx) => (
            <button
              key={idx}
              onClick={() => setQuery(suggestion)}
              className="px-2.5 py-1 rounded-full bg-zinc-800/80 hover:bg-rose-950/50 hover:text-rose-300 text-zinc-300 border border-zinc-700/60 text-[11px] whitespace-nowrap transition-colors flex items-center gap-1.5"
            >
              <span>{suggestion}</span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 sm:p-3 divide-y divide-zinc-900/60">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-zinc-400 mb-2">
                No matching records found in CUCA repository for "{query}".
              </p>
              <p className="text-xs text-zinc-400 mb-4 max-w-sm mx-auto">
                Can’t find what you need? Our automated chatbot can address custom delegate queries or route them to the admin secretariat.
              </p>
              {onOpenChatbot && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenChatbot();
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Ask CUCA Chatbot
                </button>
              )}
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectResult(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all duration-150 flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-rose-950/40 border border-rose-800/50 shadow-md shadow-rose-950/30 text-white' 
                      : 'hover:bg-zinc-900/70 text-zinc-300'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? 'bg-rose-900/60 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                    }`}>
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded font-medium bg-zinc-800/80 text-zinc-400 border border-zinc-700/50">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1 leading-snug">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {isSelected && (
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-rose-300 bg-rose-900/50 px-2 py-0.5 rounded border border-rose-700/40">
                        <span>Select</span>
                        <CornerDownLeft className="w-2.5 h-2.5" />
                      </span>
                    )}
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-rose-400' : 'text-zinc-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info & shortcut legend */}
        <div className="p-3 px-4 bg-zinc-950 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono">↑↓</span>
              <span>Navigate</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono">↵</span>
              <span>Open</span>
            </span>
          </div>
          <span className="text-zinc-400">
            CUCA Knowledge Index v2.5
          </span>
        </div>
      </motion.div>
    </div>
  );
};
