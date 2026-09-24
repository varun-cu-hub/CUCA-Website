import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);

  // Smooth lerp follower position
  const followerPos = useRef({ x: -100, y: -100 });
  const [, setFollowerTick] = useState(0);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touch / mobile)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      setIsEnabled(false);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check target element for custom interactive states
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor]');
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor-text');
        if (customText) {
          setHoverText(customText);
        } else if (interactiveEl.tagName === 'BUTTON' || interactiveEl.getAttribute('role') === 'button') {
          setHoverText(null);
        } else if (interactiveEl.tagName === 'A') {
          setHoverText(null);
        } else {
          setHoverText(null);
        }
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    const onMouseDown = () => {
      setIsClicked(true);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth lerp animation loop for outer ring
    let animationFrameId: number;
    const animate = () => {
      const speed = 0.22;
      followerPos.current.x += (mousePosition.x - followerPos.current.x) * speed;
      followerPos.current.y += (mousePosition.y - followerPos.current.y) * speed;
      setFollowerTick((t) => (t + 1) % 1000);
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition.x, mousePosition.y, isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Precision Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_#e11d48] pointer-events-none transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${mousePosition.x - 4}px, ${mousePosition.y - 4}px, 0) scale(${isClicked ? 0.7 : isHovered ? 1.5 : 1})`,
        }}
      />

      {/* Luxury Trailing Ring & Aperture */}
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none transition-all duration-300 ease-out flex items-center justify-center ${
          isHovered 
            ? 'w-12 h-12 border-rose-400/80 bg-rose-950/20 shadow-[0_0_25px_rgba(225,29,72,0.4)] backdrop-blur-[1px]' 
            : 'w-8 h-8 border-rose-600/40 bg-transparent shadow-[0_0_12px_rgba(225,29,72,0.2)]'
        }`}
        style={{
          transform: `translate3d(${followerPos.current.x - (isHovered ? 24 : 16)}px, ${followerPos.current.y - (isHovered ? 24 : 16)}px, 0) scale(${isClicked ? 0.85 : 1})`,
        }}
      >
        {/* Subtle crosshair notches when hovering */}
        {isHovered && (
          <>
            <div className="absolute top-0 w-1.5 h-[1px] bg-rose-400"></div>
            <div className="absolute bottom-0 w-1.5 h-[1px] bg-rose-400"></div>
            <div className="absolute left-0 h-1.5 w-[1px] bg-rose-400"></div>
            <div className="absolute right-0 h-1.5 w-[1px] bg-rose-400"></div>
          </>
        )}

        {hoverText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-rose-300 uppercase px-1">
            {hoverText}
          </span>
        )}
      </div>

      {/* Click Shockwave Burst */}
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-rose-500/80 pointer-events-none shadow-[0_0_15px_#e11d48]"
            style={{
              left: `${mousePosition.x - 16}px`,
              top: `${mousePosition.y - 16}px`,
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
