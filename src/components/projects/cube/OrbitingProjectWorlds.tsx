import React from 'react';
import { motion } from 'motion/react';
import { ProjectItem } from '../../../data/projectsData';
import { PROJECT_ASSETS } from './projectAssets';

interface OrbitingProjectWorldsProps {
  projects: ProjectItem[];
  currentIndex: number;
  onSelectIndex: (index: number) => void;
  isTransitioning?: boolean;
}

// Fixed desktop orbital positioning slots around center hero screen
const ORBIT_SLOTS = [
  { key: 'top-left', posClass: '-top-6 -left-16 sm:-left-20 lg:-left-24', labelSide: 'bottom' },
  { key: 'bottom-left', posClass: 'top-[52%] -left-20 sm:-left-24 lg:-left-28', labelSide: 'bottom' },
  { key: 'top-right', posClass: '-top-6 -right-16 sm:-right-20 lg:-right-24', labelSide: 'bottom' },
  { key: 'bottom-right', posClass: 'top-[52%] -right-20 sm:-right-24 lg:-right-28', labelSide: 'bottom' },
];

export const OrbitingProjectWorlds: React.FC<OrbitingProjectWorldsProps> = ({
  projects,
  currentIndex,
  onSelectIndex,
  isTransitioning = false,
}) => {
  // Filter out the active project index, leaving the remaining 4 projects to orbit
  const secondaryProjects = projects
    .map((project, originalIndex) => ({ project, originalIndex }))
    .filter((item) => item.originalIndex !== currentIndex);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 hidden lg:block">
      {secondaryProjects.slice(0, 4).map((item, slotIndex) => {
        const slot = ORBIT_SLOTS[slotIndex % ORBIT_SLOTS.length];
        const asset = PROJECT_ASSETS[item.project.id] || PROJECT_ASSETS['swayam-2'];
        const screenshotUrl = asset?.dataUrl || item.project.image;
        const formattedNum = item.project.doorNumber || `0${item.originalIndex + 1}`;

        return (
          <motion.div
            key={item.project.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -4, 0],
            }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              y: { duration: 4 + slotIndex * 0.5, repeat: Infinity, ease: 'easeInOut' },
            }}
            className={`absolute ${slot.posClass} pointer-events-auto flex flex-col items-center group cursor-pointer`}
            onClick={() => !isTransitioning && onSelectIndex(item.originalIndex)}
          >
            {/* Orbiting Connection Arc Node */}
            <div className="relative flex flex-col items-center">
              {/* Floating Thumbnail Frame */}
              <div className="relative w-28 sm:w-32 aspect-[16/10] rounded-lg overflow-hidden border border-cyan-500/40 bg-[#030a1c]/90 p-1 shadow-[0_0_15px_rgba(0,245,255,0.2)] group-hover:border-cyan-300 group-hover:shadow-[0_0_22px_rgba(0,245,255,0.45)] group-hover:scale-105 transition-all duration-300">
                {/* Number Badge Pill */}
                <span className="absolute top-1 left-1 z-20 px-1.5 py-0.2 rounded bg-[#020817]/90 border border-cyan-500/50 text-[9px] font-mono font-bold text-cyan-300">
                  {formattedNum}
                </span>

                {/* Thumbnail Image */}
                <div className="w-full h-full rounded overflow-hidden bg-[#020612] flex items-center justify-center">
                  <img
                    src={screenshotUrl}
                    alt={item.project.title}
                    className="w-full h-full object-cover object-top opacity-85 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>

                {/* Subtle Hover Sweep */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
              </div>

              {/* Orbit Connector Node & Dot */}
              <div className="flex flex-col items-center mt-1">
                <div className="w-2.5 h-2.5 rounded-full border border-cyan-400 bg-cyan-950 flex items-center justify-center shadow-[0_0_8px_#00f5ff]">
                  <div className="w-1 h-1 rounded-full bg-cyan-300 group-hover:bg-white transition-colors" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-slate-300 group-hover:text-cyan-300 transition-colors uppercase mt-0.5 max-w-[120px] truncate text-center">
                  {item.project.shortName || item.project.title}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
