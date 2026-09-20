import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChaptersCursorFollowerProps {
  isVisible: boolean;
  text?: string;
}

export const ChaptersCursorFollower: React.FC<ChaptersCursorFollowerProps> = ({
  isVisible,
  text = 'EXPLORE',
}) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check desktop screen and touch capability
    const checkIsDesktop = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsDesktop(window.innerWidth >= 1024 && !hasTouch);
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    if (isDesktop) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', checkIsDesktop);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: pos.x - 36,
            y: pos.y - 36,
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 28,
            mass: 0.2,
          }}
          className="fixed top-0 left-0 w-18 h-18 rounded-full border border-cyan-400/80 bg-cyan-950/80 backdrop-blur-md text-cyan-300 font-mono text-[10px] font-extrabold tracking-widest uppercase flex items-center justify-center pointer-events-none z-50 shadow-[0_0_20px_rgba(0,245,255,0.4)]"
        >
          <span>{text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
