import React, { Component, ReactNode, Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { ProjectItem } from '../../../../types';
import { ProjectVisual } from './ProjectVisual';

interface GLBLoaderProps {
  url: string;
  project: ProjectItem;
  isSelected?: boolean;
  scale?: number;
}

function GLBLoader({ url, scale = 1 }: GLBLoaderProps) {
  const gltf = useGLTF(url);
  return (
    <primitive
      object={gltf.scene.clone()}
      scale={[scale, scale, scale]}
      dispose={null}
    />
  );
}

interface ErrorBoundaryProps {
  fallback: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class GLBErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    // Gracefully handle model loading failure without broken UI
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export interface GLBProjectVisualProps {
  project: ProjectItem;
  isSelected?: boolean;
  isDimmed?: boolean;
  scale?: number;
}

export const GLBProjectVisual: React.FC<GLBProjectVisualProps> = ({
  project,
  isSelected = false,
  isDimmed = false,
  scale = 1,
}) => {
  // If no visual asset specified, instantly render procedural visual
  if (!project.visualAsset) {
    return (
      <ProjectVisual
        project={project}
        isSelected={isSelected}
        isDimmed={isDimmed}
        scale={scale}
      />
    );
  }

  const fallback = (
    <ProjectVisual
      project={project}
      isSelected={isSelected}
      isDimmed={isDimmed}
      scale={scale}
    />
  );

  return (
    <GLBErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <GLBLoader
          url={project.visualAsset}
          project={project}
          isSelected={isSelected}
          scale={scale}
        />
      </Suspense>
    </GLBErrorBoundary>
  );
};
