import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { BookPageContent } from './BookPageContent';
import { BookCoverView } from './BookCoverView';

interface Book3DStructureProps {
  project: ProjectItem;
  chapterIndex: number;
  totalChapters: number;
  direction: 'next' | 'prev';
  isBookOpen: boolean;
  onOpenBook: () => void;
  onFullscreenScreenshot?: () => void;
}

export const Book3DStructure: React.FC<Book3DStructureProps> = ({
  project,
  chapterIndex,
  totalChapters,
  direction,
  isBookOpen,
  onOpenBook,
  onFullscreenScreenshot,
}) => {
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flippingDirection, setFlippingDirection] = useState<'next' | 'prev'>('next');

  // Trigger page flip whenever project or direction changes (if book is open)
  useEffect(() => {
    if (!isBookOpen) return;
    setIsFlipping(true);
    setFlippingDirection(direction);

    const timer = setTimeout(() => {
      setIsFlipping(false);
    }, 750); // 750ms page-turn duration

    return () => clearTimeout(timer);
  }, [project.id, direction, isBookOpen]);

  const isNext = flippingDirection === 'next';

  return (
    <div className="relative w-full max-w-5xl mx-auto my-6 px-2 sm:px-4 perspective-[1800px] select-none">
      {/* Soft Ambient Cosmic Glow behind Book */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-indigo-600/15 rounded-3xl filter blur-3xl opacity-60 pointer-events-none" />

      {/* Floating 3D Book Container */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotateZ: [-0.4, 0.4, -0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full min-h-[580px] sm:min-h-[640px] md:min-h-[680px] rounded-2xl flex items-center justify-center transition-transform duration-700"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateX(8deg) rotateY(-8deg)',
        }}
      >
        {/* 1. BACK COVER (3D slab sitting behind page stack) */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#061329] via-[#020817] to-[#01040a] border-2 border-cyan-500/30 shadow-[0_30px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(0,245,255,0.12)] pointer-events-none"
          style={{
            transform: 'translateZ(-28px)',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* 2. VISIBLE SPINE (Left vertical 3D edge slab) */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[32px] bg-gradient-to-r from-[#020817] via-[#061833] to-[#010612] border-y border-l border-cyan-500/40 rounded-l-lg flex flex-col items-center justify-center text-cyan-400 font-mono text-[10px] tracking-[0.25em] uppercase font-extrabold select-none z-20 pointer-events-none shadow-[inset_0_0_15px_rgba(0,245,255,0.2)]"
          style={{
            transformOrigin: 'left center',
            transform: 'rotateY(-90deg) translateZ(0px)',
          }}
        >
          <div className="rotate-90 whitespace-nowrap opacity-80">
            NANDHAKUMAR UNIVERSE • PROJECTS ARCHIVE
          </div>
        </div>

        {/* 3. PAGE BLOCK STACK THICKNESS (Right edge paper layers) */}
        <div
          className="absolute top-1 bottom-1 right-0 w-[28px] border-y border-r border-cyan-500/30 rounded-r-sm z-10 pointer-events-none shadow-md"
          style={{
            transformOrigin: 'right center',
            transform: 'rotateY(90deg) translateZ(0px)',
            background:
              'repeating-linear-gradient(to bottom, #11223f 0px, #11223f 2px, #061124 2px, #061124 4px)',
          }}
        />

        {/* 4. TOP & BOTTOM PAGE EDGE CAPS */}
        <div
          className="absolute top-0 left-[32px] right-0 h-[28px] border-x border-t border-cyan-500/20 pointer-events-none"
          style={{
            transformOrigin: 'center top',
            transform: 'rotateX(90deg) translateZ(0px)',
            background:
              'repeating-linear-gradient(to right, #11223f 0px, #11223f 2px, #061124 2px, #061124 4px)',
          }}
        />
        <div
          className="absolute bottom-0 left-[32px] right-0 h-[28px] border-x border-b border-cyan-500/20 pointer-events-none"
          style={{
            transformOrigin: 'center bottom',
            transform: 'rotateX(-90deg) translateZ(0px)',
            background:
              'repeating-linear-gradient(to right, #11223f 0px, #11223f 2px, #061124 2px, #061124 4px)',
          }}
        />

        {/* 5. MAIN BOOK BODY (Cover or Open Pages) */}
        {!isBookOpen ? (
          /* CLOSED BOOK COVER STATE */
          <div className="relative w-full h-full z-30">
            <BookCoverView onOpenBook={onOpenBook} />
          </div>
        ) : (
          /* OPEN BOOK STATE WITH REAL 3D PAGE TURN */
          <div
            className="relative w-full h-full rounded-r-2xl overflow-hidden z-30"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Underlying Active Chapter Page */}
            <BookPageContent
              project={project}
              chapterIndex={chapterIndex}
              totalChapters={totalChapters}
              onFullscreenScreenshot={onFullscreenScreenshot}
            />

            {/* 3D TURNING PAGE FLAP ANIMATION */}
            <AnimatePresence>
              {isFlipping && (
                <motion.div
                  key={`flip-${project.id}`}
                  initial={{
                    rotateY: isNext ? 0 : -180,
                    opacity: 1,
                  }}
                  animate={{
                    rotateY: isNext ? -180 : 0,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.75,
                    ease: [0.645, 0.045, 0.355, 1.0], // cubic-bezier page swing
                  }}
                  style={{
                    transformOrigin: 'left center',
                    transformStyle: 'preserve-3d',
                  }}
                  className="absolute inset-0 rounded-r-2xl bg-gradient-to-br from-[#061833] via-[#020a1c] to-[#01050e] border-l-2 border-cyan-400 shadow-[0_0_30px_rgba(0,245,255,0.4)] pointer-events-none z-40 overflow-hidden"
                >
                  {/* Light Sweep Glare Line */}
                  <motion.div
                    initial={{ x: '-100%', opacity: 0.9 }}
                    animate={{ x: '200%', opacity: 0 }}
                    transition={{ duration: 0.75, ease: 'easeOut' }}
                    className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent skew-x-12 pointer-events-none"
                  />

                  {/* Turning Page Shadow Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40 pointer-events-none" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};
