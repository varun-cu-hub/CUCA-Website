import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  Building2, 
  Clock, 
  ExternalLink 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    category: 'General Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative bg-[#09090b] border-t border-zinc-800/80 overflow-hidden">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-950/20 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/70 border border-rose-700/50 text-rose-300 text-xs font-bold tracking-wider uppercase">
            <Mail className="w-3.5 h-3.5" />
            <span>Campus Liaison &amp; Desk</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Connect with <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-white">
              The CUCA Secretariat
            </span>
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base">
            Reach out for event registrations, delegation inquiries, faculty liaison, sponsorship, or media queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Info & Social Presence */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Location Card */}
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/50 flex items-center justify-center text-rose-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-base">Campus Secretariat</h4>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    Department of Commerce, Central Campus <br />
                    Christ (Deemed to be University) <br />
                    Hosur Road, Bhavani Nagar, S.G. Palya <br />
                    Bengaluru, Karnataka 560029, India
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-800 text-xs text-zinc-400 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-500" />
                <span>Office Hours: Mon – Fri (08:30 AM – 04:30 PM IST)</span>
              </div>
            </div>

            {/* Email & Phone Cards */}
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-rose-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">Official Correspondence</h4>
                  <a href="mailto:cuca@commerce.christuniversity.in" className="text-xs text-rose-400 hover:underline">
                    cuca@commerce.christuniversity.in
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-rose-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">Delegation Helpline</h4>
                  <p className="text-xs text-zinc-300">+91 (080) 4012 9100 / Ext. 9625</p>
                </div>
              </div>
            </div>

            {/* Social channels verification */}
            <div className="glass-panel p-6 rounded-2xl border border-zinc-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Official Digital Handles
              </h4>
              
              <div className="space-y-3">
                <a
                  href="https://www.instagram.com/cucadoc/?hl=en"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-rose-900 text-xs text-zinc-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-rose-500" />
                    <span>Instagram: @cucadoc (Department of Commerce)</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-rose-400" />
                </a>

                <a
                  href="https://www.linkedin.com/company/christ-university-commerce-association/about/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-zinc-950/80 border border-zinc-800 hover:border-rose-900 text-xs text-zinc-300 hover:text-white transition-colors group"
                >
                  <div className="flex items-center gap-2.5">
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span>LinkedIn: Christ University Commerce Association</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-blue-400" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl relative">
              
              {formSubmitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-white">
                    Inquiry Dispatched Successfully
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto">
                    Thank you, {formData.name || 'Delegate'}. The CUCA Secretariat and Department Coordinators have received your message and will respond within 24 operational hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', college: '', category: 'General Inquiry', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold border border-zinc-800"
                  >
                    Submit Another Dispatch
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="pb-2">
                    <h3 className="font-heading font-bold text-xl text-white">
                      Dispatch an Inquiry to the Secretariat
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Fill out the form below for event dossiers, accommodation queries, or collaboration.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Varun Adhitya"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">Institutional Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. varun@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">College / Organization *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SRCC, St. Xavier's, Loyola"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-zinc-400 mb-1 block">Inquiry Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-rose-500"
                      >
                        <option>Pareekshana Registration Query</option>
                        <option>Prashnotri Registration Query</option>
                        <option>Accommodation &amp; Campus Hospitality</option>
                        <option>Corporate Partnership &amp; Sponsorship</option>
                        <option>Faculty &amp; Inter-University Liaison</option>
                        <option>General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-zinc-400 mb-1 block">Message &amp; Particulars *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify your inquiry, team size, or questions for the secretariat..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-rose-500"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-rose-950/60 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Dispatch to CUCA Secretariat</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
