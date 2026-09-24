import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  GraduationCap, 
  Lightbulb, 
  Network, 
  Compass, 
  HeartHandshake, 
  Instagram, 
  Linkedin,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      icon: GraduationCap,
      title: 'Scholastic Rigor',
      description: 'Nurturing deep conceptual command over auditing, finance, taxation, corporate laws, and global economics.',
    },
    {
      icon: Building2,
      title: 'Industry Synergy',
      description: 'Bridging classroom principles with real-time CXO discourses, Big-4 dialogues, and market summits.',
    },
    {
      icon: Lightbulb,
      title: 'National Crucible',
      description: 'Hosting benchmark pan-India festivals and elite strategic battlegrounds like Pareekshana and Prashnotri.',
    },
    {
      icon: HeartHandshake,
      title: 'Socio-Commerce Impact',
      description: 'Driving financial inclusion workshops, community outreach, and grassroots commerce empowerment.',
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#09090b]">
      {/* Background accents */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-red-950/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context & Identity */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-950/50 border border-rose-800/40 text-rose-300 text-xs font-semibold tracking-wider uppercase">
              <Compass className="w-3.5 h-3.5" />
              Institutional Heritage
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              The Epicenter of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-rose-600">
                Commerce Leadership
              </span>
            </h2>

            <div className="space-y-4 text-zinc-300 text-base leading-relaxed">
              <p>
                <strong>Christ University Commerce Association (CUCA)</strong> is the apex student-led association operating under the aegis of the 
                <strong> Department of Commerce at Christ (Deemed to be University)</strong>, Bengaluru.
              </p>
              <p className="text-zinc-400 text-sm">
                Established with a vision to transcend textbook boundaries, CUCA serves as a transformative forum for students to engage in 
                high-impact academic summits, inter-collegiate national festivals, specialized corporate simulations, and social initiatives.
              </p>
            </div>

            {/* Social verification chips */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="https://www.instagram.com/cucadoc/?hl=en"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-medium flex items-center gap-2 transition-colors group"
              >
                <Instagram className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                <span>@cucadoc on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>

              <a
                href="https://www.linkedin.com/company/christ-university-commerce-association/about/"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-medium flex items-center gap-2 transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                <span>CUCA on LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </div>

            {/* Trust Quote Card */}
            <div className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 relative">
              <p className="text-xs sm:text-sm text-zinc-300 italic">
                "At the Department of Commerce, we instill not merely professional competence, but an unflinching ethical compass 
                and visionary problem-solving ethos that shapes nation builders."
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-950 border border-rose-800 flex items-center justify-center font-bold text-rose-400 text-xs">
                  CU
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Department of Commerce</h4>
                  <p className="text-[11px] text-zinc-400">Christ (Deemed to be University), Bengaluru</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Operational Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="p-6 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/90 border border-zinc-800/80 hover:border-rose-900/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/40 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 group-hover:bg-rose-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-rose-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
