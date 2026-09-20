import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectItem } from '../../../data/projectsData';
import { ProjectScreenshotFrame } from '../ProjectScreenshotFrame';

interface ProjectLensScreenshotProps {
  project: ProjectItem;
  direction: 'forward' | 'backward';
  isFocusing: boolean;
}

export const ProjectLensScreenshot: React.FC<ProjectLensScreenshotProps> = ({
  project,
  direction,
  isFocusing,
}) => {
  const xOffset = direction === 'forward' ? 40 : -40;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden p-1 sm:p-2">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.id}
          initial={{
            opacity: 0,
            scale: 0.92,
            x: xOffset,
            filter: 'blur(12px)',
          }}
          animate={{
            opacity: isFocusing ? 0.4 : 1,
            scale: isFocusing ? 0.95 : 1,
            x: 0,
            filter: isFocusing ? 'blur(8px)' : 'blur(0px)',
          }}
          exit={{
            opacity: 0,
            scale: 0.92,
            x: -xOffset,
            filter: 'blur(12px)',
          }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1], // Cinematic smooth cubic bezier
          }}
          className="w-full h-full flex items-center justify-center"
        >
          <ProjectScreenshotFrame
            project={project}
            isTransitioning={isFocusing}
            className="w-full h-full max-h-[480px] object-contain shadow-[0_0_30px_rgba(0,245,255,0.2)] rounded-xl"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
