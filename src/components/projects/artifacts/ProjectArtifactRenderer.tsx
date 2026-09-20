import React from 'react';
import { KnowledgeArtifact } from './KnowledgeArtifact';
import { PlaceholderMobilityArtifact } from './PlaceholderMobilityArtifact';
import * as THREE from 'three';

export type ArtifactVisualType = 'knowledge' | 'mobility' | 'ai' | 'document' | 'code';

interface ProjectArtifactRendererProps {
  visualType: ArtifactVisualType;
  transitionProgress: number; // 0 to 1
  burstDirection: number; // 1 for next, -1 for prev
  accentColor?: string;
  screenshotTexture?: THREE.Texture | null;
}

export const ProjectArtifactRenderer: React.FC<ProjectArtifactRendererProps> = ({
  visualType,
  transitionProgress,
  burstDirection,
  accentColor,
  screenshotTexture,
}) => {
  switch (visualType) {
    case 'knowledge':
      return (
        <KnowledgeArtifact
          transitionProgress={transitionProgress}
          burstDirection={burstDirection}
          accentColor={accentColor}
          screenshotTexture={screenshotTexture}
        />
      );

    case 'mobility':
      return (
        <PlaceholderMobilityArtifact
          transitionProgress={transitionProgress}
          burstDirection={burstDirection}
        />
      );

    case 'ai':
    case 'document':
    case 'code':
    default:
      // Fallback renderer mapping
      return (
        <KnowledgeArtifact
          transitionProgress={transitionProgress}
          burstDirection={burstDirection}
          accentColor={accentColor}
          screenshotTexture={screenshotTexture}
        />
      );
  }
};
