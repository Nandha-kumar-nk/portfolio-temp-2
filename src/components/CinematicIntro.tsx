import React from 'react';
import { SceneNumber } from '../types';
import { DeviceQualityInfo } from '../hooks/useDeviceQuality';
import { CinematicHUD } from './CinematicHUD';
import { CodeHologram } from './CodeHologram';

interface CinematicIntroProps {
  currentScene: SceneNumber;
  progress: number;
  transitionProgress: number;
  isAutoPlay: boolean;
  isAudioOn: boolean;
  quality: DeviceQualityInfo;
  isFadingOut: boolean;
  onToggleAutoPlay: () => void;
  onToggleAudio: () => void;
  onSelectScene: (scene: SceneNumber) => void;
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({
  currentScene,
  progress,
  transitionProgress,
  isAutoPlay,
  isAudioOn,
  quality,
  isFadingOut,
  onToggleAutoPlay,
  onToggleAudio,
  onSelectScene,
  onComplete,
}) => {
  return (
    <div
      id="cinematic-intro-overlay"
      className={`fixed inset-0 w-full h-[100dvh] z-[9999] bg-transparent overflow-hidden select-none transition-opacity duration-1000 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100dvh',
        zIndex: 9999,
      }}
    >
      {/* 1. Floating Code Hologram Fragments (Scene 3) */}
      <CodeHologram currentScene={currentScene} />

      {/* 2. Dedicated Intro HUD Overlay */}
      <CinematicHUD
        currentScene={currentScene}
        transitionProgress={transitionProgress}
        progress={progress}
        isAutoPlay={isAutoPlay}
        isAudioOn={isAudioOn}
        quality={quality}
        onToggleAutoPlay={onToggleAutoPlay}
        onToggleAudio={onToggleAudio}
        onSelectScene={onSelectScene}
        onExplore={onComplete}
        onReplay={() => onSelectScene(1)}
      />
    </div>
  );
};

