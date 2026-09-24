/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PreFestHype } from './components/PreFestHype';
import { InitiativesSection } from './components/InitiativesSection';
import { AchievementsSection } from './components/AchievementsSection';
import { PareekshanaSection } from './components/PareekshanaSection';
import { PrashnotriSection } from './components/PrashnotriSection';
import { LivePortal } from './components/LivePortal';
import { TeamSection } from './components/TeamSection';
import { RegistrationFlow } from './components/RegistrationFlow';
import { GallerySection } from './components/GallerySection';
import { SponsorsSection } from './components/SponsorsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { CustomCursor } from './components/CustomCursor';
import { SearchModal } from './components/SearchModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { AdminPortalModal } from './components/AdminPortalModal';

export default function App() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [selectedRegEvent, setSelectedRegEvent] = useState<'pareekshana' | 'prashnotri'>('pareekshana');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminPortalOpen, setIsAdminPortalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // Global scroll progress for the smooth reading progress indicator
  const { scrollYProgress } = useScroll();

  // Keyboard shortcut listener for Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenRegistration = (event: 'pareekshana' | 'prashnotri' = 'pareekshana') => {
    setSelectedRegEvent(event);
    setIsRegModalOpen(true);
  };

  return (
    <div className="bg-[#09090b] text-[#f4f4f5] min-h-screen selection:bg-rose-600 selection:text-white relative">
      {/* 1. Bespoke Custom Cursor Experience */}
      <CustomCursor />

      {/* 2. Top Smooth Navigation Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollYProgress }} 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-400 origin-left z-[9999] pointer-events-none shadow-[0_0_12px_rgba(225,29,72,0.8)]"
      />

      {/* 3. Fixed Navigation Bar */}
      <Navbar 
        onOpenRegistration={handleOpenRegistration} 
        onOpenVideo={() => setIsVideoModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Main Content Sections with Smooth Animated Transitions */}
      <main>
        {/* 1. Hero Landing Banner */}
        <Hero 
          onOpenRegistration={handleOpenRegistration} 
          onOpenVideo={() => setIsVideoModalOpen(true)} 
        />

        {/* 2. Brief About CUCA under Dept of Commerce, Christ University */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AboutSection />
        </motion.div>

        {/* 3. Event / Pre-Fest Hype Section & Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <PreFestHype 
            onOpenRegistration={handleOpenRegistration}
            onOpenVideo={() => setIsVideoModalOpen(true)}
          />
        </motion.div>

        {/* 4. The CUCA Ecosystem & Signature Initiatives (PRAYAS, Pareekshana, Prashnotri, Conclave) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <InitiativesSection 
            onOpenRegistration={handleOpenRegistration}
          />
        </motion.div>

        {/* 5. Clear Section for CUCA Achievements & Hall of Commerce Laurels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <AchievementsSection />
        </motion.div>

        {/* 6. Dedicated Pareekshana Section (4-Member Team Format) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <PareekshanaSection 
            onOpenRegistration={() => handleOpenRegistration('pareekshana')}
          />
        </motion.div>

        {/* 7. Dedicated Prashnotri Section (2-Member Duo Format) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <PrashnotriSection 
            onOpenRegistration={() => handleOpenRegistration('prashnotri')}
          />
        </motion.div>

        {/* 8. During the Fest / Live Experience Portal (Live Scoreboards by Round, Schedules, Dossiers) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <LivePortal />
        </motion.div>

        {/* 9. Registration Hub & Verifiable Pass Generator */}
        <motion.section 
          id="registrations" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="py-20 bg-gradient-to-b from-[#09090b] via-[#10070a] to-[#09090b] border-t border-rose-950/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Immediate Delegate Pass Provisioning
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-1">
              National Registration Portal
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-2">
              Select your track, enter your team roster, upload credentials, and instantly receive your verified QR registration badge.
            </p>
          </div>
          <RegistrationFlow 
            initialEvent={selectedRegEvent}
            isModal={false}
          />
        </motion.section>

        {/* 10. Leadership & Team Page (Faculty Coordinators & Student Core Committees) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <TeamSection />
        </motion.div>

        {/* 11. Past Editions & Retrospective Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <GallerySection />
        </motion.div>

        {/* 12. Corporate Partners & Sponsors Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SponsorsSection />
        </motion.div>

        {/* 13. Campus Secretariat & Contact Desk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <ContactSection />
        </motion.div>
      </main>

      {/* Footer */}
      <Footer 
        onOpenRegistration={handleOpenRegistration} 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={() => setIsAdminPortalOpen(true)}
      />

      {/* Interactive Chatbot with Direct Admin Escalation */}
      <ChatbotWidget 
        onOpenAdminPortal={() => setIsAdminPortalOpen(true)}
        isOpenExternal={isChatbotOpen}
        onCloseExternal={() => setIsChatbotOpen(false)}
      />

      {/* Google Suggestions-Style Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenRegistration={handleOpenRegistration}
        onOpenChatbot={() => {
          setIsSearchOpen(false);
          setIsChatbotOpen(true);
        }}
      />

      {/* Secretariat Admin Portal Modal */}
      <AdminPortalModal 
        isOpen={isAdminPortalOpen}
        onClose={() => setIsAdminPortalOpen(false)}
      />

      {/* Video Trailer Modal */}
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
      />

      {/* Floating Modal for Direct Registrations */}
      <AnimatePresence>
        {isRegModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="relative w-full max-w-4xl my-auto">
              <RegistrationFlow 
                initialEvent={selectedRegEvent}
                isModal={true}
                onClose={() => setIsRegModalOpen(false)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

