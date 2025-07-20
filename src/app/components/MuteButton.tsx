'use client';

import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';
import { useSettingsStore } from '@/app/store/settingsStore';

export default function MuteButton() {
  const { state, toggleSound } = useSettingsStore();
  const isMuted = !state.soundEnabled;

  return (
    <button
      onClick={toggleSound}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={isMuted ? '음소거 해제' : '음소거'}
    >
      {isMuted ? <SpeakerXMarkIcon className="w-6 h-6" /> : <SpeakerWaveIcon className="w-6 h-6" />}
    </button>
  );
}
