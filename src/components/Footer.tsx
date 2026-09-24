import React from 'react';
import { 
  Instagram, 
  Linkedin, 
  MapPin, 
  Mail, 
  Phone, 
  ArrowUp, 
  ShieldCheck, 
  Heart,
  ChevronRight
} from 'lucide-react';

interface FooterProps {
  onOpenRegistration: (event?: 'pareekshana' | 'prashnotri') => void;
  onOpenSearch?: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegistration, onOpenSearch, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060405] text-zinc-400 border-t border-rose-950/40 relative overflow-hidden">
      {/* Subtle Ambient Red Light in bottom */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Col 1 & 2: Brand & Institution */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-700 to-black p-0.5 shadow-md shadow-rose-950/60">
                <div className="w-full h-full bg-[#09090b] rounded-[10px] flex items-center justify-center border border-rose-500/20">
                  <span className="font-crest font-bold text-rose-500 text-lg">C</span>
                </div>
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-wider text-white">
                  CUCA
                </span>
                <p className="text-[11px] text-zinc-400 font-medium">
                  Christ University Commerce Association
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The premier student-led association under the Department of Commerce, Christ (Deemed to be University), Bengaluru. 
              Fostering excellence through national festivals, corporate simulations, and impactful commerce initiatives.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/cucadoc/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-rose-500 transition-colors"
                aria-label="CUCA Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/christ-university-commerce-association/about/"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-blue-400 transition-colors"
                aria-label="CUCA LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Signature Portfolios */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Signature Portfolios
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#initiatives" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>PRAYAS National Fest</span>
                </a>
              </li>
              <li>
                <a href="#pareekshana" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Pareekshana (4-Pax Format)</span>
                </a>
              </li>
              <li>
                <a href="#prashnotri" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Prashnotri National Quiz (2-Pax)</span>
                </a>
              </li>
              <li>
                <a href="#initiatives" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Commerce Conclave</span>
                </a>
              </li>
              <li>
                <a href="#initiatives" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Rural &amp; Socio-Commerce Drives</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Portals &amp; Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#achievements" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Hall of Laurels &amp; Trophies</span>
                </a>
              </li>
              <li>
                <a href="#live-arena" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Live Arena Leaderboard</span>
                </a>
              </li>
              <li>
                <a href="#live-arena" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Rounds &amp; Venue Schedule</span>
                </a>
              </li>
              <li>
                <a href="#team" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Faculty &amp; Student Team</span>
                </a>
              </li>
              {onOpenSearch && (
                <li>
                  <button 
                    onClick={onOpenSearch} 
                    className="hover:text-rose-400 transition-colors flex items-center gap-1.5 text-left text-zinc-400"
                  >
                    <ChevronRight className="w-3 h-3 text-rose-600" />
                    <span>Search Repository (⌘K)</span>
                  </button>
                </li>
              )}
              {onOpenAdmin && (
                <li>
                  <button 
                    onClick={onOpenAdmin} 
                    className="hover:text-rose-300 transition-colors flex items-center gap-1.5 text-left text-rose-400/90 font-medium"
                  >
                    <ChevronRight className="w-3 h-3 text-rose-600" />
                    <span>Secretariat Admin Desk</span>
                  </button>
                </li>
              )}
              <li>
                <a href="#gallery" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Past Editions &amp; Hall of Fame</span>
                </a>
              </li>
              <li>
                <a href="#sponsors" className="hover:text-rose-400 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-rose-600" />
                  <span>Corporate Patrons</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Registration Call */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Registrations
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Early bird passes for national delegations are open. Reserve your team slot today.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onOpenRegistration('pareekshana')}
                className="w-full py-2 px-3 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-xs font-semibold text-rose-300 transition-colors text-left flex items-center justify-between"
              >
                <span>Pareekshana (4-Pax)</span>
                <span className="text-[10px] text-zinc-400">₹1,200</span>
              </button>
              <button
                onClick={() => onOpenRegistration('prashnotri')}
                className="w-full py-2 px-3 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-xs font-semibold text-rose-300 transition-colors text-left flex items-center justify-between"
              >
                <span>Prashnotri (2-Pax)</span>
                <span className="text-[10px] text-zinc-400">₹600</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Christ University Commerce Association (CUCA). Department of Commerce, Christ (Deemed to be University), Bengaluru.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 flex items-center gap-1.5 transition-colors"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
