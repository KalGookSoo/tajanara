'use client';

import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '@/shared/lib/state/hooks';
import { selectSoundEnabled, toggleSoundEnabled } from '@/shared/lib/state/slices/settingsSlice';

export default function MuteButton() {
  const soundEnabled = useAppSelector(selectSoundEnabled);
  const isMuted = !soundEnabled;

  return (
    <button
      onClick={() => toggleSoundEnabled()}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={isMuted ? '음소거 해제' : '음소거'}
    >
      {isMuted ? <SpeakerXMarkIcon className="w-6 h-6" /> : <SpeakerWaveIcon className="w-6 h-6" />}
    </button>
  );
}
