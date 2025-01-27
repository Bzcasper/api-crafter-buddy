import { useState, useCallback } from 'react';
import type { Platform } from '@/types/content';

interface UsePlatformsProps {
  initialPlatforms: Platform[];
}

export const usePlatforms = ({ initialPlatforms }: UsePlatformsProps) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(initialPlatforms);

  const togglePlatform = useCallback((platformId: string) => {
    setSelectedPlatforms((prev) =>
      prev.map((platform) =>
        platform.id === platformId
          ? { ...platform, isActive: !platform.isActive }
          : platform
      )
    );
  }, []);

  return {
    selectedPlatforms,
    togglePlatform,
  };
};