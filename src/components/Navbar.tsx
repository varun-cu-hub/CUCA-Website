import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, 
  X, 
  Flame, 
  Award, 
  Users, 
  Calendar, 
  PhoneCall, 
  ChevronRight, 
  Sparkles, 
  Trophy,
  ExternalLink,
  Search,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  onOpenRegistration: (event?: 'pareekshana' | 'prashnotri') => void;
  onOpenVideo: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenRegistration, 
  onOpenVideo,
  onOpenSearch,
  onOpenAdmin
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Initiatives', href: '#initiatives' },
    { name: 'Achievements', href: '#achievements', badge: 'Laurels' },
    { name: 'Pareekshana', href: '#pareekshana', badge: '4-Pax' },
    { name: 'Prashnotri', href: '#prashnotri', badge: '2-Pax' },
    { name: 'Live Fest', href: '#live-arena', isLive: true },
    { name: 'Team', href: '#team' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      id="cuca-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-rose-950/40 py-3 shadow-xl shadow-black/50' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Crest */}
          <a 
            href="#" 
            className="flex items-center gap-3 group focus:outline-none"
            id="nav-brand-logo"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 via-red-700 to-black p-0.5 shadow-md shadow-rose-950/60 transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center border border-rose-500/20">
                <span className="font-crest font-bold text-rose-500 text-lg tracking-wider">C</span>
              </div>
              <div className="absolute -inset-0.5 rounded-xl bg-rose-600 opacity-20 blur-sm group-hover:opacity-40 transition-opacity"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg sm:text-xl tracking-wider text-white">
                  CUCA
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded bg-rose-950/70 border border-rose-700/40 text-rose-400">
                  Est. Commerce
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-medium tracking-wide">
                Christ (Deemed to be University), Bengaluru
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" id="nav-desktop-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-1.5 text-xs xl:text-sm font-medium text-zinc-300 hover:text-white rounded-lg transition-colors hover:bg-white/5 flex items-center gap-1.5 group"
              >
                {link.isLive && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                  </span>
                )}
                {link.name}
                {link.badge && (
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 group-hover:border-rose-800 group-hover:text-rose-300">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Search Bar Button */}
            <button
              onClick={onOpenSearch}
              id="nav-search-btn"
              title="Search repository (⌘K or Ctrl+K)"
              className="px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all flex items-center gap-2 group cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-rose-500 group-hover:text-rose-400" />
              <span className="text-zinc-400 group-hover:text-zinc-200">Search</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-zinc-950 text-zinc-400 rounded border border-zinc-800">
                ⌘K
              </kbd>
            </button>

            {/* Admin Desk Trigger */}
            <button
              onClick={onOpenAdmin}
              id="nav-admin-desk-btn"
              title="CUCA Secretariat Admin Desk"
              className="p-2 text-xs font-medium text-zinc-400 hover:text-rose-300 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-rose-900/40 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-rose-500" />
              <span className="hidden xl:inline text-xs">Admin Desk</span>
            </button>

            <button
              onClick={onOpenVideo}
              id="nav-teaser-btn"
              className="px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span className="hidden lg:inline">Teaser</span>
            </button>

            <button
              onClick={() => onOpenRegistration()}
              id="nav-register-btn"
              className="relative group px-4 py-2 text-xs font-semibold text-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg shadow-rose-900/30 hover:shadow-rose-600/40 active:scale-95"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-700 via-rose-600 to-red-800 transition-transform duration-300 group-hover:scale-105"></div>
              <div className="relative flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Register</span>
              </div>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex sm:hidden items-center gap-1.5">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-rose-400"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenRegistration()}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg"
            >
              Register
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle"
              aria-label="Toggle mobile menu"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-rose-900/30 overflow-hidden"
            id="mobile-drawer"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              {/* Quick Search in Mobile Menu */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-left text-xs font-medium text-zinc-300 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-zinc-400">
                  <Search className="w-4 h-4 text-rose-500" />
                  <span>Search CUCA repository & rules...</span>
                </div>
                <kbd className="px-1.5 py-0.5 rounded bg-zinc-950 text-[10px] font-mono text-zinc-500">
                  Search
                </kbd>
              </button>

              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegistration('pareekshana');
                  }}
                  className="p-2.5 rounded-lg bg-red-950/40 border border-red-800/40 text-left text-xs font-semibold text-rose-300 flex items-center justify-between"
                >
                  <span>Pareekshana (4-Pax)</span>
                  <ChevronRight className="w-4 h-4 text-rose-500" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegistration('prashnotri');
                  }}
                  className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/40 text-left text-xs font-semibold text-rose-300 flex items-center justify-between"
                >
                  <span>Prashnotri (2-Pax)</span>
                  <ChevronRight className="w-4 h-4 text-rose-500" />
                </button>
              </div>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white hover:bg-zinc-800/60"
                >
                  <span className="flex items-center gap-2">
                    {link.isLive && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                      </span>
                    )}
                    {link.name}
                  </span>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {link.badge}
                    </span>
                  )}
                </a>
              ))}

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-rose-300 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-rose-500" />
                  CUCA Secretariat Admin Desk
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenVideo();
                  }}
                  className="w-full py-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-rose-500" />
                  Watch Official Fest Trailer
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenRegistration();
                  }}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold text-xs tracking-wider uppercase shadow-lg shadow-rose-900/40"
                >
                  Launch Registration Portal
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
