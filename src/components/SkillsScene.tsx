import { useState, useEffect } from 'react';
import { DeviceQualityInfo } from '../hooks/useDeviceQuality';
import { SkillNodeData } from './3d/ReactorCore3D';
import { DesktopSkillsLayout } from './skills/DesktopSkillsLayout';
import { MobileSkillsLayout } from './skills/MobileSkillsLayout';
import { TabletSkillsLayout } from './skills/TabletSkillsLayout';
import { SkillsTab } from '../data/skillsData';

export interface SkillsSceneProps {
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateProjects?: () => void;
  onNavigateContact?: () => void;
  onReplaySequence: () => void;
  quality: DeviceQualityInfo;
  isAudioOn: boolean;
  onToggleAudio: () => void;
}

export function SkillsScene({
  onNavigateHome,
  onNavigateAbout,
  onNavigateProjects,
  onNavigateContact,
  onReplaySequence: _onReplaySequence,
  quality: _quality,
  isAudioOn,
  onToggleAudio,
}: SkillsSceneProps) {
  const [selectedTab, setSelectedTab] = useState<SkillsTab>('stack');
  const [selectedSkill, setSelectedSkill] = useState<SkillNodeData | null>(null);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Accurate real-time viewport width tracker for responsive presentation switching
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;
    const handleResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setViewportWidth(window.innerWidth);
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Responsive Breakpoint Rule:
  // < 600px: Dedicated MobileSkillsLayout (Compact interaction: Category Selector -> Compact Reactor -> Single Detail)
  // 600px - 1023px: TabletSkillsLayout (Proportional 2-Column Split, zero overlap)
  // >= 1024px: DesktopSkillsLayout (Preserved approved desktop 3D spatial chamber)
  if (viewportWidth < 600) {
    return (
      <MobileSkillsLayout
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateProjects={onNavigateProjects}
        onNavigateContact={onNavigateContact}
        isAudioOn={isAudioOn}
        onToggleAudio={onToggleAudio}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
        selectedSkill={selectedSkill}
        onSelectSkill={setSelectedSkill}
      />
    );
  }

  if (viewportWidth < 1024) {
    return (
      <TabletSkillsLayout
        onNavigateHome={onNavigateHome}
        onNavigateAbout={onNavigateAbout}
        onNavigateProjects={onNavigateProjects}
        onNavigateContact={onNavigateContact}
        isAudioOn={isAudioOn}
        onToggleAudio={onToggleAudio}
        selectedTab={selectedTab}
        onSelectTab={setSelectedTab}
        selectedSkill={selectedSkill}
        onSelectSkill={setSelectedSkill}
      />
    );
  }

  return (
    <DesktopSkillsLayout
      onNavigateHome={onNavigateHome}
      onNavigateAbout={onNavigateAbout}
      onNavigateProjects={onNavigateProjects}
      onNavigateContact={onNavigateContact}
      isAudioOn={isAudioOn}
      onToggleAudio={onToggleAudio}
      selectedTab={selectedTab}
      onSelectTab={setSelectedTab}
      selectedSkill={selectedSkill}
      onSelectSkill={setSelectedSkill}
      hoveredSkillId={hoveredSkillId}
      onHoverSkill={setHoveredSkillId}
    />
  );
}

export default SkillsScene;
