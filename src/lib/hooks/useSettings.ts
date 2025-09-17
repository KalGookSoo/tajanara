'use client';

import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/lib/state/hooks';
import {
  selectSettings,
  selectSoundEnabled,
  setFont,
  setLanguage,
  setSoundEnabled,
  toggleSoundEnabled
} from '@/shared/lib/state/slices/settingsSlice';

export const useSettings = () => {
  const settings = useAppSelector(selectSettings);
  const soundEnabled = useAppSelector(selectSoundEnabled);
  const dispatch = useAppDispatch();

  const updateLanguage = useCallback(
    (lng: 'ko' | 'en') => {
      dispatch(setLanguage(lng));
    },
    [dispatch]
  );

  const updateFont = useCallback(
    (font: string) => {
      dispatch(setFont(font));
    },
    [dispatch]
  );

  const updateSoundEnabled = useCallback(
    (enabled: boolean) => {
      dispatch(setSoundEnabled(enabled));
    },
    [dispatch]
  );

  const toggleSound = useCallback(() => {
    dispatch(toggleSoundEnabled());
  }, [dispatch]);

  const playKeyboardSound = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioCtx();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = 800;
      gainNode.gain.value = 0.1;
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch {
      // noop
    }
  }, [soundEnabled]);

  return {
    settings,
    soundEnabled,
    updateLanguage,
    updateFont,
    updateSoundEnabled,
    toggleSound,
    playKeyboardSound
  };
};
